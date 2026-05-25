// POST /api/login  -> { username, password }
// Mengembalikan { token, username } jika benar, atau 401.

import { sql, ensureReady } from "./lib/db.mjs";
import { verifyPassword, makeToken, json } from "./lib/auth.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);
  await ensureReady();

  let body;
  try { body = await req.json(); } catch { return json({ error: "invalid json" }, 400); }
  const username = (body && body.username || "").trim();
  const password = (body && body.password) || "";
  if (!username || !password) return json({ error: "lengkapi username & password" }, 400);

  const rows = await sql`SELECT username, password_hash FROM hr_users WHERE username = ${username} LIMIT 1`;
  if (rows.length === 0 || !verifyPassword(password, rows[0].password_hash)) {
    return json({ error: "Username atau password salah" }, 401);
  }
  return json({ token: makeToken(username), username });
};

export const config = { path: "/api/login" };
