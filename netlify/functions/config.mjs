// GET  /api/config  -> seluruh konfigurasi (publik; dibutuhkan halaman kandidat)
// PUT  /api/config  -> simpan sebagian/seluruh konfigurasi (butuh login HR)
//                       body: { kkm?, papi_weights?, divisions?, ... } (key -> value)

import { sql, ensureReady } from "./lib/db.mjs";
import { requireAuth, json } from "./lib/auth.mjs";

export default async (req) => {
  await ensureReady();

  if (req.method === "GET") {
    const rows = await sql`SELECT key, value FROM config`;
    const out = {};
    for (const row of rows) out[row.key] = row.value;
    return json(out);
  }

  if (req.method === "PUT") {
    if (!requireAuth(req)) return json({ error: "unauthorized" }, 401);
    let body;
    try { body = await req.json(); } catch { return json({ error: "invalid json" }, 400); }
    if (!body || typeof body !== "object") return json({ error: "invalid body" }, 400);

    const allowed = ["timer", "kkm", "papi_weights", "divisions", "division_meta", "div_kkm_default", "div_w_default"];
    for (const [key, value] of Object.entries(body)) {
      if (!allowed.includes(key)) continue;
      await sql`INSERT INTO config (key, value, updated_at) VALUES (${key}, ${JSON.stringify(value)}, now())
                ON CONFLICT (key) DO UPDATE SET value = ${JSON.stringify(value)}, updated_at = now()`;
    }
    return json({ ok: true });
  }

  return json({ error: "method not allowed" }, 405);
};

export const config = { path: "/api/config" };
