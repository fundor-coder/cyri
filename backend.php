<?php
declare(strict_types=1);

const DEFAULT_PUBLISH_PASSWORD_HASH = 'c5adc9b61a9c18a6ad1a7489725c79cfcd3ef6a5980d6eeece1065b51a546336';
const SESSION_DURATION_SECONDS = 43200;
const MAX_BODY_SIZE = 1048576;

$dataDir = __DIR__ . DIRECTORY_SEPARATOR . 'data';
$articlesFile = $dataDir . DIRECTORY_SEPARATOR . 'articles.json';
$messagesFile = $dataDir . DIRECTORY_SEPARATOR . 'messages.json';
$sessionsFile = $dataDir . DIRECTORY_SEPARATOR . 'sessions.json';
$allowedCategories = ['policy', 'energy', 'biodiversity', 'cities', 'marine'];
$allowedImages = ['coral', 'marine-debris', 'mangrove', 'glacier', 'solar'];

function send_json(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function fail(int $statusCode, string $message): void
{
    send_json($statusCode, ['error' => $message]);
}

function ensure_json_file(string $filePath): void
{
    $dir = dirname($filePath);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }

    if (!file_exists($filePath)) {
        file_put_contents($filePath, "[]\n", LOCK_EX);
    }
}

function read_json_file(string $filePath): array
{
    ensure_json_file($filePath);
    $raw = file_get_contents($filePath);
    $parsed = json_decode($raw === false ? '[]' : $raw, true);
    return is_array($parsed) ? $parsed : [];
}

function write_json_file(string $filePath, array $value): void
{
    ensure_json_file($filePath);
    $tmpPath = $filePath . '.' . getmypid() . '.tmp';
    file_put_contents(
        $tmpPath,
        json_encode($value, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n",
        LOCK_EX
    );
    rename($tmpPath, $filePath);
}

function read_request_json(): array
{
    $raw = file_get_contents('php://input', false, null, 0, MAX_BODY_SIZE + 1);
    if ($raw === false || trim($raw) === '') {
        return [];
    }

    if (strlen($raw) > MAX_BODY_SIZE) {
        fail(413, 'Request body is too large.');
    }

    $parsed = json_decode($raw, true);
    if (!is_array($parsed)) {
        fail(400, 'Request body must be valid JSON.');
    }

    return $parsed;
}

function truncate_text(string $value, int $maxLength): string
{
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength);
    }

    return substr($value, 0, $maxLength);
}

function clean_text($value, int $maxLength): string
{
    $text = preg_replace('/\s+/u', ' ', trim((string) ($value ?? '')));
    return truncate_text($text ?? '', $maxLength);
}

function clean_multiline_text($value, int $maxLength): string
{
    $text = str_replace("\r\n", "\n", (string) ($value ?? ''));
    $text = preg_replace("/\n{3,}/", "\n\n", trim($text));
    return truncate_text($text ?? '', $maxLength);
}

function clean_email($value): string
{
    $email = strtolower(clean_text($value, 254));
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        fail(400, 'A valid email address is required.');
    }
    return $email;
}

function route_path(): string
{
    $route = $_GET['route'] ?? null;
    if (is_string($route) && $route !== '') {
        return '/' . ltrim($route, '/');
    }

    $path = parse_url($_SERVER['REQUEST_URI'] ?? '/backend.php/health', PHP_URL_PATH) ?: '/backend.php/health';
    $path = preg_replace('#^.*?/(?:backend\.php|api(?:/index\.php)?)#', '', $path);
    return '/' . ltrim($path ?: '/health', '/');
}

function publish_password_hash(): string
{
    $hash = getenv('CYRI_PUBLISH_PASSWORD_HASH');
    if (is_string($hash) && trim($hash) !== '') {
        return trim($hash);
    }

    $password = getenv('CYRI_PUBLISH_PASSWORD');
    if (is_string($password) && $password !== '') {
        return hash('sha256', $password);
    }

    return DEFAULT_PUBLISH_PASSWORD_HASH;
}

function cleanup_sessions(string $sessionsFile): array
{
    $sessions = read_json_file($sessionsFile);
    $now = time();
    $active = [];

    foreach ($sessions as $session) {
        if (($session['expiresAt'] ?? 0) > $now && is_string($session['token'] ?? null)) {
            $active[] = $session;
        }
    }

    if (count($active) !== count($sessions)) {
        write_json_file($sessionsFile, $active);
    }

    return $active;
}

function create_publish_session(string $sessionsFile): array
{
    $sessions = cleanup_sessions($sessionsFile);
    $token = bin2hex(random_bytes(32));
    $expiresAt = time() + SESSION_DURATION_SECONDS;
    $sessions[] = [
        'token' => $token,
        'expiresAt' => $expiresAt,
    ];
    write_json_file($sessionsFile, $sessions);

    return [
        'token' => $token,
        'expiresAt' => gmdate('c', $expiresAt),
    ];
}

function bearer_token(): string
{
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (!is_string($header) || !preg_match('/^Bearer\s+([a-f0-9]{64})$/i', $header, $matches)) {
        return '';
    }
    return $matches[1];
}

function require_publish_session(string $sessionsFile): void
{
    $token = bearer_token();
    $sessions = cleanup_sessions($sessionsFile);

    foreach ($sessions as $session) {
        if (hash_equals((string) ($session['token'] ?? ''), $token)) {
            return;
        }
    }

    fail(401, 'Publish login required.');
}

function validate_date($value): string
{
    $date = clean_text($value, 10);
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
        fail(400, 'A valid date is required.');
    }

    [$year, $month, $day] = array_map('intval', explode('-', $date));
    if (!checkdate($month, $day, $year)) {
        fail(400, 'A valid date is required.');
    }

    return $date;
}

function slugify(string $value): string
{
    if (function_exists('iconv')) {
        $value = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $value) ?: $value;
    }

    $value = strtolower($value);
    $value = preg_replace('/[^a-z0-9]+/', '-', $value);
    $value = trim($value ?? '', '-');
    return substr($value !== '' ? $value : 'cyri-article', 0, 70);
}

function create_article_id(string $title, array $articles): string
{
    $slug = slugify($title);
    $id = $slug . '-' . base_convert((string) time(), 10, 36);
    $counter = 2;
    $existing = array_map(function ($article) {
        return $article['id'] ?? '';
    }, $articles);

    while (in_array($id, $existing, true)) {
        $id = $slug . '-' . base_convert((string) time(), 10, 36) . '-' . $counter;
        $counter++;
    }

    return $id;
}

function normalize_article(array $input, array $articles, array $allowedCategories, array $allowedImages): array
{
    $title = is_array($input['title'] ?? null) ? $input['title'] : [];
    $summary = is_array($input['summary'] ?? null) ? $input['summary'] : [];
    $body = is_array($input['body'] ?? null) ? $input['body'] : [];
    $titleDe = clean_text($title['de'] ?? '', 180);
    $titleEn = clean_text(($title['en'] ?? '') ?: $titleDe, 180);
    $summaryDe = clean_text($summary['de'] ?? '', 520);
    $summaryEn = clean_text(($summary['en'] ?? '') ?: $summaryDe, 520);
    $bodyDe = clean_multiline_text($body['de'] ?? '', 20000);
    $bodyEn = clean_multiline_text(($body['en'] ?? '') ?: $bodyDe, 20000);
    $category = clean_text($input['category'] ?? '', 40);
    $imageId = clean_text($input['imageId'] ?? '', 40);

    if ($titleDe === '' || $summaryDe === '' || $bodyDe === '') {
        fail(400, 'German title, summary and article text are required.');
    }

    if (!in_array($category, $allowedCategories, true)) {
        fail(400, 'Unknown article category.');
    }

    if (!in_array($imageId, $allowedImages, true)) {
        fail(400, 'Unknown cover image.');
    }

    return [
        'id' => create_article_id($titleEn ?: $titleDe, $articles),
        'date' => validate_date($input['date'] ?? gmdate('Y-m-d')),
        'category' => $category,
        'imageId' => $imageId,
        'title' => [
            'de' => $titleDe,
            'en' => $titleEn,
        ],
        'summary' => [
            'de' => $summaryDe,
            'en' => $summaryEn,
        ],
        'body' => [
            'de' => $bodyDe,
            'en' => $bodyEn,
        ],
        'createdAt' => gmdate('c'),
    ];
}

function normalize_message(array $input): array
{
    $name = clean_text($input['name'] ?? '', 120);
    $email = clean_email($input['email'] ?? '');
    $message = clean_multiline_text($input['message'] ?? '', 5000);

    if ($name === '' || $message === '') {
        fail(400, 'Name and message are required.');
    }

    return [
        'id' => bin2hex(random_bytes(16)),
        'name' => $name,
        'email' => $email,
        'message' => $message,
        'createdAt' => gmdate('c'),
    ];
}

function sort_articles(array $articles): array
{
    usort($articles, function ($a, $b) {
        return strcmp((string) ($b['date'] ?? ''), (string) ($a['date'] ?? ''));
    });
    return $articles;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    send_json(200, ['ok' => true]);
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$route = route_path();

if ($route === '/health' && $method === 'GET') {
    send_json(200, ['ok' => true]);
}

if ($route === '/articles' && $method === 'GET') {
    send_json(200, ['articles' => sort_articles(read_json_file($articlesFile))]);
}

if ($route === '/auth/publish' && $method === 'POST') {
    $body = read_request_json();
    $passwordHash = hash('sha256', (string) ($body['password'] ?? ''));

    if (!hash_equals(publish_password_hash(), $passwordHash)) {
        fail(401, 'Wrong password.');
    }

    send_json(200, create_publish_session($sessionsFile));
}

if ($route === '/articles' && $method === 'POST') {
    require_publish_session($sessionsFile);
    $body = read_request_json();
    $articles = read_json_file($articlesFile);
    $article = normalize_article($body, $articles, $allowedCategories, $allowedImages);
    array_unshift($articles, $article);
    write_json_file($articlesFile, $articles);
    send_json(201, ['article' => $article]);
}

if ($route === '/contact' && $method === 'POST') {
    $body = read_request_json();
    $messages = read_json_file($messagesFile);
    $message = normalize_message($body);
    array_unshift($messages, $message);
    write_json_file($messagesFile, $messages);
    send_json(201, ['ok' => true]);
}

fail(404, 'API route not found.');
