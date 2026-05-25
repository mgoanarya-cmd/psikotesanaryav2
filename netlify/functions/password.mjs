// POST /api/password -> { oldPassword, newPassword }  (butuh login HR)
// Mengganti password akun yang sedang login (username diambil dari token).

import { sql, ensureReady } from "./lib/db.mjs";
import { requireAuth, verifyPassword, hashPassword, json } from "./lib/auth.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);
  await ensureReady();

  const auth = requireAuth(req);
  if (!auth) return json({ error: "unauthorized" }, 401);

  let body;
  try { body = await req.json(); } catch { return json({ error: "invalid json" }, 400); }
  const oldPassword = (body && body.oldPassword) || "";
  const newPassword = (body && body.newPassword) || "";
  if (!oldPassword || !newPassword) return json({ error: "lengkapi semua field" }, 400);
  if (newPassword.length < 6) return json({ error: "Password baru minimal 6 karakter" }, 400);

  const rows = await sql`SELECT password_hash FROM hr_users WHERE username = ${auth.u} LIMIT 1`;
  if (rows.length === 0 || !verifyPassword(oldPassword, rows[0].password_hash)) {
    return json({ error: "Password lama tidak sesuai" }, 400);
  }
  await sql`UPDATE hr_users SET password_hash = ${hashPassword(newPassword)} WHERE username = ${auth.u}`;
  return json({ ok: true });
};

export const config = { path: "/api/password" };
