<?php
declare(strict_types=1);

// Default publish password is stored as a SHA-256 hash, not as plaintext.
const DEFAULT_PUBLISH_PASSWORD_HASH = 'c5adc9b61a9c18a6ad1a7489725c79cfcd3ef6a5980d6eeece1065b51a546336';
const SESSION_DURATION_SECONDS = 43200;
const MAX_BODY_SIZE = 4194304;
const MAX_UPLOAD_SIZE = 2621440;

$configuredDataDir = getenv('CYRI_DATA_DIR');
$dataDir = is_string($configuredDataDir) && trim($configuredDataDir) !== ''
    ? rtrim(trim($configuredDataDir), DIRECTORY_SEPARATOR)
    : __DIR__ . DIRECTORY_SEPARATOR . 'data';
$uploadsDir = $dataDir . DIRECTORY_SEPARATOR . 'uploads';
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

function send_image(string $filePath): void
{
    if (!is_file($filePath)) {
        fail(404, 'Image not found.');
    }

    header('Content-Type: image/jpeg');
    header('Cache-Control: public, max-age=31536000, immutable');
    header('X-Content-Type-Options: nosniff');
    header('Content-Length: ' . filesize($filePath));
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'HEAD') {
        readfile($filePath);
    }
    exit;
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
    $parsed = parse_json_array($filePath);
    if ($parsed !== null) {
        return $parsed;
    }

    $backup = parse_json_array($filePath . '.bak');
    if ($backup !== null) {
        write_json_file($filePath, $backup, false);
        return $backup;
    }

    ensure_json_file($filePath);
    return [];
}

function parse_json_array(string $filePath): ?array
{
    if (!is_file($filePath)) {
        return null;
    }

    $raw = file_get_contents($filePath);
    if ($raw === false) {
        return null;
    }

    $parsed = json_decode($raw, true);
    return is_array($parsed) ? $parsed : null;
}

function write_json_file(string $filePath, array $value, bool $createBackup = true): void
{
    ensure_json_file($filePath);
    $tmpPath = $filePath . '.' . getmypid() . '.tmp';
    $backupPath = $filePath . '.bak';
    $backupTmpPath = $backupPath . '.' . getmypid() . '.tmp';
    $serialized = json_encode(
        $value,
        JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
    ) . "\n";
    $written = file_put_contents($tmpPath, $serialized, LOCK_EX);
    if ($written === false || !rename($tmpPath, $filePath)) {
        @unlink($tmpPath);
        fail(500, 'Stored data could not be written.');
    }

    if ($createBackup) {
        $backupWritten = file_put_contents($backupTmpPath, $serialized, LOCK_EX);
        if ($backupWritten === false || !rename($backupTmpPath, $backupPath)) {
            @unlink($backupTmpPath);
            fail(500, 'Stored data could not be backed up.');
        }
    }
}

function mutate_json_file(string $filePath, callable $mutator)
{
    $dir = dirname($filePath);
    if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        fail(500, 'Storage directory could not be created.');
    }

    $lock = fopen($filePath . '.lock', 'c');
    if ($lock === false || !flock($lock, LOCK_EX)) {
        if (is_resource($lock)) {
            fclose($lock);
        }
        fail(500, 'Stored data could not be locked.');
    }

    try {
        $mutation = $mutator(read_json_file($filePath));
        if (
            !is_array($mutation) ||
            !array_key_exists('value', $mutation) ||
            !is_array($mutation['value'])
        ) {
            fail(500, 'Stored data mutation is invalid.');
        }

        write_json_file($filePath, $mutation['value']);
        return $mutation['result'] ?? null;
    } finally {
        flock($lock, LOCK_UN);
        fclose($lock);
    }
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

function validate_publish_at($value): string
{
    $publishAt = clean_text($value, 40);
    if (!preg_match(
        '/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/',
        $publishAt
    )) {
        fail(400, 'A valid publication time is required.');
    }

    try {
        $date = new DateTimeImmutable($publishAt);
    } catch (Throwable $error) {
        fail(400, 'A valid publication time is required.');
    }

    return $date
        ->setTimezone(new DateTimeZone('UTC'))
        ->format('Y-m-d\TH:i:s\Z');
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

function normalize_article(
    array $input,
    array $articles,
    array $allowedCategories,
    array $allowedImages,
    string $uploadsDir
): array
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
    $imageId = clean_text($input['imageId'] ?? '', 80);
    $imageCredit = clean_text($input['imageCredit'] ?? '', 160);

    if ($titleDe === '' || $summaryDe === '' || $bodyDe === '') {
        fail(400, 'German title, summary and article text are required.');
    }

    if (!in_array($category, $allowedCategories, true)) {
        fail(400, 'Unknown article category.');
    }

    $customImage = preg_match('/^upload:([a-f0-9]{32}\.jpg)$/', $imageId, $customImageMatch) === 1;
    if (!in_array($imageId, $allowedImages, true) && !$customImage) {
        fail(400, 'Unknown cover image.');
    }

    if ($customImage && !is_file($uploadsDir . DIRECTORY_SEPARATOR . $customImageMatch[1])) {
        fail(400, 'Uploaded cover image was not found.');
    }

    return [
        'id' => create_article_id($titleEn ?: $titleDe, $articles),
        'date' => validate_date($input['date'] ?? gmdate('Y-m-d')),
        'category' => $category,
        'imageId' => $imageId,
        'imageCredit' => $customImage ? ($imageCredit ?: 'CYRI') : '',
        'publishAt' => validate_publish_at($input['publishAt'] ?? gmdate('c')),
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

function save_uploaded_image(array $input, string $uploadsDir): array
{
    $dataUrl = (string) ($input['dataUrl'] ?? '');
    if (!preg_match('#^data:image/jpeg;base64,([A-Za-z0-9+/]+={0,2})$#', $dataUrl, $matches)) {
        fail(400, 'Uploaded image must be a JPEG.');
    }

    $image = base64_decode($matches[1], true);
    if (
        $image === false ||
        strlen($image) === 0 ||
        strlen($image) > MAX_UPLOAD_SIZE ||
        substr($image, 0, 3) !== "\xFF\xD8\xFF"
    ) {
        fail(400, 'Uploaded image is invalid or too large.');
    }

    if (!is_dir($uploadsDir) && !mkdir($uploadsDir, 0755, true) && !is_dir($uploadsDir)) {
        fail(500, 'Upload directory could not be created.');
    }

    $filename = bin2hex(random_bytes(16)) . '.jpg';
    if (file_put_contents($uploadsDir . DIRECTORY_SEPARATOR . $filename, $image, LOCK_EX) === false) {
        fail(500, 'Uploaded image could not be saved.');
    }

    return [
        'imageId' => 'upload:' . $filename,
        'credit' => clean_text($input['credit'] ?? '', 160) ?: 'CYRI',
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
        return article_publish_timestamp($b) <=> article_publish_timestamp($a);
    });
    return $articles;
}

function article_publish_timestamp(array $article): int
{
    $publishAt = strtotime((string) ($article['publishAt'] ?? ''));
    if ($publishAt !== false) {
        return $publishAt;
    }

    $date = strtotime((string) ($article['date'] ?? ''));
    return $date === false ? 0 : $date;
}

function article_is_published(array $article, ?int $now = null): bool
{
    if (empty($article['publishAt'])) {
        return true;
    }

    $publishAt = strtotime((string) $article['publishAt']);
    return $publishAt !== false && $publishAt <= ($now ?? time());
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
    $articles = array_values(array_filter(read_json_file($articlesFile), 'article_is_published'));
    send_json(200, ['articles' => sort_articles($articles)]);
}

if (preg_match('#^/uploads/([a-f0-9]{32}\.jpg)$#', $route, $uploadMatch) && in_array($method, ['GET', 'HEAD'], true)) {
    send_image($uploadsDir . DIRECTORY_SEPARATOR . $uploadMatch[1]);
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
    $article = mutate_json_file(
        $articlesFile,
        function (array $articles) use ($body, $allowedCategories, $allowedImages, $uploadsDir): array {
            $article = normalize_article(
                $body,
                $articles,
                $allowedCategories,
                $allowedImages,
                $uploadsDir
            );
            array_unshift($articles, $article);
            return [
                'value' => $articles,
                'result' => $article,
            ];
        }
    );
    send_json(201, [
        'article' => $article,
        'scheduled' => !article_is_published($article),
    ]);
}

if ($route === '/uploads' && $method === 'POST') {
    require_publish_session($sessionsFile);
    send_json(201, save_uploaded_image(read_request_json(), $uploadsDir));
}

if ($route === '/contact' && $method === 'POST') {
    $body = read_request_json();
    $message = mutate_json_file(
        $messagesFile,
        function (array $messages) use ($body): array {
            $message = normalize_message($body);
            array_unshift($messages, $message);
            return [
                'value' => $messages,
                'result' => $message,
            ];
        }
    );
    send_json(201, ['ok' => true]);
}

fail(404, 'API route not found.');
