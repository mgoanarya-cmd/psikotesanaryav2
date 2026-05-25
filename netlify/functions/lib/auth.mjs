// Helper autentikasi: hashing password (PBKDF2) + token sesi (HMAC).
// Tidak butuh library eksternal — semua dari modul `crypto` bawaan Node.

import crypto from "node:crypto";

// Secret untuk menandatangani token. WAJIB diset sebagai environment variable
// AUTH_SECRET di Netlify (string acak panjang). Fallback hanya untuk lokal.
const SECRET = process.env.AUTH_SECRET || "ganti-saya-dengan-secret-acak-panjang";

// ---------- Password (PBKDF2) ----------
export function hashPassword(pw) {
  const salt = crypto.randomBytes(16).toString("hex");
  const iter = 120000;
  const hash = crypto.pbkdf2Sync(pw, salt, iter, 32, "sha256").toString("hex");
  return `pbkdf2$${iter}$${salt}$${hash}`;
}

export function verifyPassword(pw, stored) {
  try {
    const [algo, iterStr, salt, hash] = String(stored).split("$");
    if (algo !== "pbkdf2") return false;
    const iter = parseInt(iterStr, 10);
    const test = crypto.pbkdf2Sync(pw, salt, iter, 32, "sha256").toString("hex");
    const a = Buffer.from(test, "hex"), b = Buffer.from(hash, "hex");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// ---------- Token sesi (stateless, HMAC-SHA256) ----------
export function makeToken(username, hours = 12) {
  const payload = { u: username, exp: Date.now() + hours * 3600 * 1000 };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== "string") return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expect = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  const a = Buffer.from(sig), b = Buffer.from(expect);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString());
    if (!p.exp || p.exp < Date.now()) return null;
    return p;
  } catch {
    return null;
  }
}

// Ambil & verifikasi token dari header Authorization. Return payload atau null.
export function requireAuth(req) {
  const h = req.headers.get("authorization") || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : "";
  return verifyToken(token);
}

// Helper respons JSON konsisten
export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}
