// Koneksi database + pembuatan tabel & seed default (idempoten).
// Memakai @netlify/neon yang otomatis membaca env NETLIFY_DATABASE_URL.

import { neon } from "@netlify/neon";
import { defaultConfig, HR_DEFAULT_USER, HR_DEFAULT_PASS } from "./defaults.mjs";
import { hashPassword } from "./auth.mjs";

export const sql = neon(); // memakai NETLIFY_DATABASE_URL dari environment

let _ready = null;

// Pastikan skema ada & data default ter-seed. Dipanggil di awal tiap function.
// Hanya benar-benar berjalan sekali per cold start (di-cache via _ready).
export function ensureReady() {
  if (_ready) return _ready;
  _ready = (async () => {
    await sql`CREATE TABLE IF NOT EXISTS results (
      id           TEXT PRIMARY KEY,
      name         TEXT,
      phone        TEXT,
      email        TEXT,
      position     TEXT,
      scores       JSONB,
      details      JSONB,
      kkm          JSONB,
      lolos        BOOLEAN,
      insights     JSONB,
      raw_answers  JSONB,
      start_time   TIMESTAMPTZ,
      finish_time  TIMESTAMPTZ,
      created_at   TIMESTAMPTZ DEFAULT now()
    )`;
    await sql`CREATE TABLE IF NOT EXISTS config (
      key        TEXT PRIMARY KEY,
      value      JSONB,
      updated_at TIMESTAMPTZ DEFAULT now()
    )`;
    await sql`CREATE TABLE IF NOT EXISTS hr_users (
      username      TEXT PRIMARY KEY,
      password_hash TEXT NOT NULL,
      created_at    TIMESTAMPTZ DEFAULT now()
    )`;

    // Seed config jika kosong
    const cfg = await sql`SELECT key FROM config`;
    if (cfg.length === 0) {
      const def = defaultConfig();
      for (const [key, value] of Object.entries(def)) {
        await sql`INSERT INTO config (key, value) VALUES (${key}, ${JSON.stringify(value)})
                  ON CONFLICT (key) DO NOTHING`;
      }
    }

    // Seed akun HR default jika belum ada akun sama sekali
    const users = await sql`SELECT username FROM hr_users`;
    if (users.length === 0) {
      await sql`INSERT INTO hr_users (username, password_hash)
                VALUES (${HR_DEFAULT_USER}, ${hashPassword(HR_DEFAULT_PASS)})
                ON CONFLICT (username) DO NOTHING`;
    }
  })();
  return _ready;
}

// Ubah baris DB (snake_case) menjadi objek hasil (camelCase) yang dipakai client.
export function rowToResult(r) {
  return {
    id: r.id,
    name: r.name,
    phone: r.phone,
    email: r.email,
    position: r.position,
    scores: r.scores,
    details: r.details,
    kkm: r.kkm,
    lolos: r.lolos,
    insights: r.insights,
    rawAnswers: r.raw_answers,
    startTime: r.start_time,
    finishTime: r.finish_time
  };
}
