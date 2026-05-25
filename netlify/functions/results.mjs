// GET  /api/results        -> daftar semua hasil kandidat (butuh login HR)
// POST /api/results         -> simpan 1 hasil tes kandidat (publik; dipakai saat tes selesai)
//                              juga mengecek duplikat email / nomor HP
// PUT  /api/results         -> simpan ulang banyak hasil sekaligus (butuh login HR)
//                              dipakai saat KKM/bobot berubah & status dihitung ulang

import { sql, ensureReady, rowToResult } from "./lib/db.mjs";
import { requireAuth, json } from "./lib/auth.mjs";

export default async (req) => {
  await ensureReady();

  // ---- GET: daftar hasil (rahasia, butuh auth) ----
  if (req.method === "GET") {
    if (!requireAuth(req)) return json({ error: "unauthorized" }, 401);
    const rows = await sql`SELECT * FROM results ORDER BY created_at ASC`;
    return json(rows.map(rowToResult));
  }

  // ---- POST: kandidat mengirim hasil (publik) ----
  if (req.method === "POST") {
    let r;
    try { r = await req.json(); } catch { return json({ error: "invalid json" }, 400); }
    if (!r || !r.id || !r.email) return json({ error: "data tidak lengkap" }, 400);

    // Cek duplikat email / nomor HP (server-side, tidak bisa diakali)
    const emailNorm = String(r.email).toLowerCase();
    const phoneNorm = String(r.phone || "").replace(/\D/g, "");
    const dup = await sql`
      SELECT 1 FROM results
      WHERE lower(email) = ${emailNorm}
         OR regexp_replace(coalesce(phone,''), '\\D', '', 'g') = ${phoneNorm}
      LIMIT 1`;
    if (dup.length > 0) return json({ error: "duplicate", message: "Email atau nomor HP sudah pernah dipakai" }, 409);

    await sql`INSERT INTO results
      (id, name, phone, email, position, scores, details, kkm, lolos, insights, raw_answers, start_time, finish_time)
      VALUES (${r.id}, ${r.name}, ${r.phone}, ${r.email}, ${r.position},
              ${JSON.stringify(r.scores || {})}, ${JSON.stringify(r.details || {})}, ${JSON.stringify(r.kkm || {})},
              ${!!r.lolos}, ${JSON.stringify(r.insights || [])}, ${JSON.stringify(r.rawAnswers || {})},
              ${r.startTime || null}, ${r.finishTime || null})
      ON CONFLICT (id) DO NOTHING`;
    return json({ ok: true, id: r.id });
  }

  // ---- PUT: simpan ulang banyak hasil (auth) ----
  if (req.method === "PUT") {
    if (!requireAuth(req)) return json({ error: "unauthorized" }, 401);
    let arr;
    try { arr = await req.json(); } catch { return json({ error: "invalid json" }, 400); }
    if (!Array.isArray(arr)) return json({ error: "expected array" }, 400);

    for (const r of arr) {
      if (!r || !r.id) continue;
      await sql`UPDATE results SET
        scores = ${JSON.stringify(r.scores || {})},
        details = ${JSON.stringify(r.details || {})},
        kkm = ${JSON.stringify(r.kkm || {})},
        lolos = ${!!r.lolos}
        WHERE id = ${r.id}`;
    }
    return json({ ok: true, updated: arr.length });
  }

  return json({ error: "method not allowed" }, 405);
};

export const config = { path: "/api/results" };
