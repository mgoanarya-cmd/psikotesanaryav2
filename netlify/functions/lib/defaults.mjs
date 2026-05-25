// Nilai default — dipakai untuk mengisi (seed) database saat pertama kali kosong.
// Harus konsisten dengan default di sisi client (index.html).

export const TIMER_DEFAULT = { papi: 1800, kraepelin: 480, integrity: 900 };

export const KKM_DEFAULT = {
  "Cashier":       { papi: 55, kraepelin: 60, integrity: 65, total: 62 },
  "Driver":        { papi: 50, kraepelin: 55, integrity: 68, total: 60 },
  "Inventory Man": { papi: 55, kraepelin: 65, integrity: 65, total: 63 },
  "Telemarketing": { papi: 60, kraepelin: 50, integrity: 60, total: 60 }
};

export const PAPI_WEIGHTS_DEFAULT = {
  "Cashier":       { detail: 2.5, conformity: 2, restraint: 2, organized: 2, finish: 1.5, structure: 1 },
  "Driver":        { conformity: 2.5, restraint: 2.5, finish: 2, adaptable: 1.5, structure: 1 },
  "Inventory Man": { detail: 3, organized: 3, conformity: 2, finish: 2, structure: 1.5 },
  "Telemarketing": { social: 3, achievement: 2.5, leadership: 2, nurture: 1.5, recognition: 1, adaptable: 1 }
};

export const DIVISIONS_DEFAULT = ["Cashier", "Driver", "Inventory Man", "Telemarketing"];

export const DIVISION_META_DEFAULT = {
  "Cashier":       { icon: "💰", bg: "rgba(24,95,165,.12)",  border: "rgba(24,95,165,.35)",  text: "#185FA5" },
  "Driver":        { icon: "🚗", bg: "rgba(15,110,86,.12)",  border: "rgba(15,110,86,.35)",  text: "#0F6E56" },
  "Inventory Man": { icon: "📦", bg: "rgba(133,79,11,.12)",  border: "rgba(133,79,11,.35)",  text: "#854F0B" },
  "Telemarketing": { icon: "📞", bg: "rgba(153,53,86,.12)",  border: "rgba(153,53,86,.35)",  text: "#993556" }
};

// Akun HR default. WAJIB diganti setelah deploy lewat menu "Ganti Password".
export const HR_DEFAULT_USER = "admin";
export const HR_DEFAULT_PASS = "hr2024";

// Konfigurasi awal yang disimpan di tabel `config` (key -> value JSON)
export function defaultConfig() {
  return {
    timer:           TIMER_DEFAULT,
    kkm:             KKM_DEFAULT,
    papi_weights:    PAPI_WEIGHTS_DEFAULT,
    divisions:       DIVISIONS_DEFAULT,
    division_meta:   DIVISION_META_DEFAULT,
    div_kkm_default: KKM_DEFAULT,
    div_w_default:   PAPI_WEIGHTS_DEFAULT
  };
}
