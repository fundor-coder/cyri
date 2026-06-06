const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");

const PORT = Number(process.env.PORT || 5173);
const PUBLIC_ROOT = __dirname;
const DATA_DIR = path.resolve(process.env.CYRI_DATA_DIR || path.join(__dirname, "data"));
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");
const ARTICLES_FILE = path.join(DATA_DIR, "articles.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const DEFAULT_PUBLISH_PASSWORD_HASH =
  "c5adc9b61a9c18a6ad1a7489725c79cfcd3ef6a5980d6eeece1065b51a546336";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 12;
const MAX_JSON_BODY_SIZE = 4 * 1024 * 1024;
const MAX_UPLOAD_SIZE = 2.5 * 1024 * 1024;

const allowedCategories = new Set(["policy", "energy", "biodiversity", "cities", "marine"]);
const allowedImages = new Set(["coral", "marine-debris", "mangrove", "glacier", "solar"]);
const publishSessions = new Map();
const writeQueues = new Map();

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function createError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function sha256(value) {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
}

function currentPublishPasswordHash() {
  if (process.env.CYRI_PUBLISH_PASSWORD_HASH) {
    return process.env.CYRI_PUBLISH_PASSWORD_HASH.trim();
  }

  if (process.env.CYRI_PUBLISH_PASSWORD) {
    return sha256(process.env.CYRI_PUBLISH_PASSWORD);
  }

  return DEFAULT_PUBLISH_PASSWORD_HASH;
}

function timingSafeHexCompare(left, right) {
  if (!/^[a-f0-9]{64}$/i.test(left) || !/^[a-f0-9]{64}$/i.test(right)) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(left, "hex"), Buffer.from(right, "hex"));
}

function cleanupSessions() {
  const now = Date.now();
  for (const [token, session] of publishSessions) {
    if (session.expiresAt <= now) {
      publishSessions.delete(token);
    }
  }
}

function createPublishSession() {
  cleanupSessions();
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  publishSessions.set(token, { expiresAt });
  return { token, expiresAt: new Date(expiresAt).toISOString() };
}

function requirePublishSession(req) {
  cleanupSessions();
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const session = publishSessions.get(token);

  if (!session) {
    throw createError(401, "Publish login required.");
  }
}

async function ensureDataFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  await ensureJsonFile(ARTICLES_FILE, []);
  await ensureJsonFile(MESSAGES_FILE, []);
}

async function ensureJsonFile(filePath, fallback) {
  try {
    await fs.access(filePath);
  } catch {
    await writeJsonFile(filePath, fallback);
  }
}

async function readJsonFile(filePath, fallback) {
  try {
    return await parseJsonArray(filePath);
  } catch {
    try {
      const recovered = await parseJsonArray(`${filePath}.bak`);
      await writeJsonFile(filePath, recovered, false);
      return recovered;
    } catch {
      return fallback;
    }
  }
}

async function parseJsonArray(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error("Stored JSON value must be an array.");
  }
  return parsed;
}

async function writeJsonFile(filePath, value, createBackup = true) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.${process.pid}.tmp`;
  const backupPath = `${filePath}.bak`;
  const backupTmpPath = `${backupPath}.${process.pid}.tmp`;
  const serialized = `${JSON.stringify(value, null, 2)}\n`;

  try {
    await fs.writeFile(tmpPath, serialized, "utf8");
    await fs.rename(tmpPath, filePath);
    if (createBackup) {
      await fs.writeFile(backupTmpPath, serialized, "utf8");
      await fs.rename(backupTmpPath, backupPath);
    }
  } finally {
    await fs.rm(tmpPath, { force: true });
    await fs.rm(backupTmpPath, { force: true });
  }
}

function serializeFileWrite(filePath, task) {
  const previous = writeQueues.get(filePath) || Promise.resolve();
  const operation = previous.then(task, task);
  const tail = operation.catch(() => {});
  writeQueues.set(filePath, tail);
  tail.finally(() => {
    if (writeQueues.get(filePath) === tail) {
      writeQueues.delete(filePath);
    }
  });
  return operation;
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

function sendError(res, error) {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? "Internal server error." : error.message;
  sendJson(res, statusCode, { error: message });
}

async function readRequestJson(req) {
  let size = 0;
  let raw = "";

  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_JSON_BODY_SIZE) {
      throw createError(413, "Request body is too large.");
    }
    raw += chunk;
  }

  if (!raw.trim()) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    throw createError(400, "Request body must be valid JSON.");
  }
}

function cleanText(value, maxLength) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.slice(0, maxLength);
}

function cleanMultilineText(value, maxLength) {
  const text = String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return text.slice(0, maxLength);
}

function cleanEmail(value) {
  const email = cleanText(value, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError(400, "A valid email address is required.");
  }
  return email;
}

function validateDate(value) {
  const date = cleanText(value, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw createError(400, "A valid date is required.");
  }

  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    throw createError(400, "A valid date is required.");
  }

  return date;
}

function validatePublishAt(value) {
  const publishAt = cleanText(value, 40);
  const timestamp = Date.parse(publishAt);
  if (!publishAt || Number.isNaN(timestamp)) {
    throw createError(400, "A valid publication time is required.");
  }

  return new Date(timestamp).toISOString();
}

function slugify(value) {
  return cleanText(value, 120)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);
}

function createArticleId(title, existingArticles) {
  const slug = slugify(title) || "cyri-article";
  let id = `${slug}-${Date.now().toString(36)}`;
  let counter = 2;

  while (existingArticles.some((article) => article.id === id)) {
    id = `${slug}-${Date.now().toString(36)}-${counter}`;
    counter += 1;
  }

  return id;
}

async function normalizeArticle(input, existingArticles) {
  const titleDe = cleanText(input?.title?.de, 180);
  const titleEn = cleanText(input?.title?.en || titleDe, 180);
  const summaryDe = cleanText(input?.summary?.de, 520);
  const summaryEn = cleanText(input?.summary?.en || summaryDe, 520);
  const bodyDe = cleanMultilineText(input?.body?.de, 20000);
  const bodyEn = cleanMultilineText(input?.body?.en || bodyDe, 20000);
  const category = cleanText(input?.category, 40);
  const imageId = cleanText(input?.imageId, 80);
  const imageCredit = cleanText(input?.imageCredit, 160);

  if (!titleDe || !summaryDe || !bodyDe) {
    throw createError(400, "German title, summary and article text are required.");
  }

  if (!allowedCategories.has(category)) {
    throw createError(400, "Unknown article category.");
  }

  const customImageMatch = imageId.match(/^upload:([a-f0-9]{32}\.jpg)$/);
  if (!allowedImages.has(imageId) && !customImageMatch) {
    throw createError(400, "Unknown cover image.");
  }

  if (customImageMatch) {
    try {
      await fs.access(path.join(UPLOADS_DIR, customImageMatch[1]));
    } catch {
      throw createError(400, "Uploaded cover image was not found.");
    }
  }

  return {
    id: createArticleId(titleEn || titleDe, existingArticles),
    date: validateDate(input?.date || new Date().toISOString().slice(0, 10)),
    category,
    imageId,
    imageCredit: customImageMatch ? imageCredit || "CYRI" : "",
    publishAt: validatePublishAt(input?.publishAt || new Date().toISOString()),
    title: {
      de: titleDe,
      en: titleEn,
    },
    summary: {
      de: summaryDe,
      en: summaryEn,
    },
    body: {
      de: bodyDe,
      en: bodyEn,
    },
    createdAt: new Date().toISOString(),
  };
}

async function saveUploadedImage(input) {
  const dataUrl = String(input?.dataUrl || "");
  const match = dataUrl.match(/^data:image\/jpeg;base64,([A-Za-z0-9+/]+={0,2})$/);
  if (!match) {
    throw createError(400, "Uploaded image must be a JPEG.");
  }

  const image = Buffer.from(match[1], "base64");
  if (
    image.length === 0 ||
    image.length > MAX_UPLOAD_SIZE ||
    image[0] !== 0xff ||
    image[1] !== 0xd8 ||
    image[2] !== 0xff
  ) {
    throw createError(400, "Uploaded image is invalid or too large.");
  }

  const filename = `${crypto.randomBytes(16).toString("hex")}.jpg`;
  await fs.writeFile(path.join(UPLOADS_DIR, filename), image, { flag: "wx" });

  return {
    imageId: `upload:${filename}`,
    credit: cleanText(input?.credit, 160) || "CYRI",
  };
}

function normalizeMessage(input) {
  const name = cleanText(input?.name, 120);
  const email = cleanEmail(input?.email);
  const message = cleanMultilineText(input?.message, 5000);

  if (!name || !message) {
    throw createError(400, "Name and message are required.");
  }

  return {
    id: crypto.randomUUID(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };
}

function sortArticlesByDate(articles) {
  return [...articles].sort((a, b) => articlePublishTime(b) - articlePublishTime(a));
}

function articlePublishTime(article) {
  const publishAt = Date.parse(String(article?.publishAt || ""));
  if (!Number.isNaN(publishAt)) return publishAt;

  const date = Date.parse(`${article?.date || ""}T12:00:00Z`);
  return Number.isNaN(date) ? 0 : date;
}

function isArticlePublished(article, now = Date.now()) {
  if (!article?.publishAt) return true;
  const publishAt = Date.parse(String(article.publishAt));
  return !Number.isNaN(publishAt) && publishAt <= now;
}

function normalizeApiPath(url) {
  if (url.pathname !== "/backend.php") {
    return;
  }

  const route = url.searchParams.get("route") || "/health";
  url.pathname = `/api/${route.replace(/^\/+/, "")}`;
}

async function handleApi(req, res, url) {
  if (url.pathname === "/api/health" && req.method === "GET") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (url.pathname === "/api/articles" && req.method === "GET") {
    const articles = await readJsonFile(ARTICLES_FILE, []);
    sendJson(res, 200, {
      articles: sortArticlesByDate(articles.filter((article) => isArticlePublished(article))),
    });
    return;
  }

  if (url.pathname === "/api/auth/publish" && req.method === "POST") {
    const body = await readRequestJson(req);
    const passwordHash = sha256(String(body.password || ""));

    if (!timingSafeHexCompare(passwordHash, currentPublishPasswordHash())) {
      throw createError(401, "Wrong password.");
    }

    sendJson(res, 200, createPublishSession());
    return;
  }

  if (url.pathname === "/api/articles" && req.method === "POST") {
    requirePublishSession(req);
    const body = await readRequestJson(req);
    const article = await serializeFileWrite(ARTICLES_FILE, async () => {
      const articles = await readJsonFile(ARTICLES_FILE, []);
      const nextArticle = await normalizeArticle(body, articles);
      await writeJsonFile(ARTICLES_FILE, [nextArticle, ...articles]);
      return nextArticle;
    });
    sendJson(res, 201, {
      article,
      scheduled: !isArticlePublished(article),
    });
    return;
  }

  if (url.pathname === "/api/uploads" && req.method === "POST") {
    requirePublishSession(req);
    const body = await readRequestJson(req);
    sendJson(res, 201, await saveUploadedImage(body));
    return;
  }

  if (url.pathname === "/api/contact" && req.method === "POST") {
    const body = await readRequestJson(req);
    const message = await serializeFileWrite(MESSAGES_FILE, async () => {
      const messages = await readJsonFile(MESSAGES_FILE, []);
      const nextMessage = normalizeMessage(body);
      await writeJsonFile(MESSAGES_FILE, [nextMessage, ...messages]);
      return nextMessage;
    });
    sendJson(res, 201, { ok: true });
    return;
  }

  sendJson(res, 404, { error: "API route not found." });
}

async function handleStatic(req, res, url) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    throw createError(405, "Method not allowed.");
  }

  const requestPath = decodeURIComponent(url.pathname);
  const uploadMatch = requestPath.match(/^\/uploads\/([a-f0-9]{32}\.jpg)$/);
  if (uploadMatch) {
    try {
      const data = await fs.readFile(path.join(UPLOADS_DIR, uploadMatch[1]));
      res.writeHead(200, {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      });
      res.end(req.method === "HEAD" ? undefined : data);
    } catch {
      throw createError(404, "Image not found.");
    }
    return;
  }

  const allowed =
    requestPath === "/" ||
    requestPath === "/index.html" ||
    requestPath === "/app.js" ||
    requestPath === "/styles.css" ||
    requestPath.startsWith("/assets/");

  if (!allowed) {
    throw createError(404, "Not found.");
  }

  const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
  const filePath = path.resolve(PUBLIC_ROOT, relativePath);

  if (!filePath.startsWith(PUBLIC_ROOT + path.sep)) {
    throw createError(403, "Forbidden.");
  }

  const data = await fs.readFile(filePath);
  const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
  res.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control": contentType.startsWith("text/html") ? "no-store" : "public, max-age=3600",
  });

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  res.end(data);
}

async function handleRequest(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    normalizeApiPath(url);

    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
      return;
    }

    await handleStatic(req, res, url);
  } catch (error) {
    sendError(res, error);
  }
}

async function start() {
  await ensureDataFiles();
  const server = http.createServer(handleRequest);
  server.listen(PORT, () => {
    console.log(`CYRI backend running at http://localhost:${PORT}/`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
