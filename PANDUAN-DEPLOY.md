# Portal Psikotes — Versi Database Online (Netlify DB + Neon)

Semua data (hasil tes, konfigurasi KKM/bobot/divisi/timer, dan akun HR) kini
tersimpan di **database online** — tidak lagi di `localStorage` browser. Artinya
data konsisten di semua perangkat: HR bisa membuka dashboard dari laptop kantor,
rumah, atau HP, dan melihat data yang sama.

---

## Isi Project

```
index.html                      → aplikasi (frontend) — sudah memanggil API, bukan localStorage
netlify.toml                    → konfigurasi Netlify
package.json                    → daftar dependency (driver database)
netlify/functions/
  config.mjs                    → GET/PUT konfigurasi (KKM, bobot, divisi, timer)
  results.mjs                   → GET/POST/PUT hasil kandidat
  login.mjs                     → login HR (mengeluarkan token)
  password.mjs                  → ganti password HR
  lib/
    db.mjs                      → koneksi DB + buat tabel + isi data default
    auth.mjs                    → hashing password + token sesi
    defaults.mjs                → nilai default KKM/bobot/divisi/timer
```

---

## Cara Deploy (langkah demi langkah)

### Langkah 0 — Yang perlu disiapkan
- Akun Netlify (paket **Credit-based** — Netlify DB hanya tersedia di paket ini).
- Node.js terpasang di komputer (untuk menjalankan Netlify CLI).
- Git (opsional tapi disarankan).

### Langkah 1 — Pasang Netlify CLI
Buka terminal, jalankan:
```bash
npm install -g netlify-cli
netlify login
```
`netlify login` akan membuka browser untuk login. Setelah selesai, tutup browser.

### Langkah 2 — Masuk ke folder project & hubungkan ke Netlify
```bash
cd portal-psikotes        # folder hasil ekstrak zip ini
netlify init
```
Ikuti wizard: pilih **"Create & configure a new site"**, pilih tim Anda, beri nama
situs (mis. `portal-psikotes-perusahaan`). Saat ditanya build command & publish
directory, **biarkan kosong / tekan Enter** (situs ini statis, tidak ada build).

### Langkah 3 — Buat database (Netlify DB / Neon)
```bash
netlify db init
```
Perintah ini akan:
- Membuat database Postgres (Neon) dan menautkannya ke situs Anda.
- Menambahkan environment variable `NETLIFY_DATABASE_URL` secara otomatis.

> ⚠️ **Penting:** Database awal bersifat sementara. Dalam **7 hari** Anda harus
> meng-_claim_ database ke akun Neon Anda lewat dashboard Netlify (menu
> *Project → Database*) agar tidak terhapus. Ikuti tombol "Claim database" di sana.

### Langkah 4 — Set secret untuk token login HR
Token sesi HR ditandatangani memakai sebuah secret. Buat string acak panjang dan
set sebagai environment variable `AUTH_SECRET`:
```bash
netlify env:set AUTH_SECRET "GANTI-INI-dengan-teks-acak-minimal-32-karakter-abc123xyz"
```
(Boleh teks acak apa saja, yang penting panjang & rahasia. Jangan dibagikan.)

### Langkah 5 — Deploy
```bash
netlify deploy --prod
```
Tunggu sampai selesai. Netlify akan meng-install dependency (`@netlify/neon`),
mengunggah functions, dan menyajikan `index.html`. Di akhir akan muncul URL situs
Anda (mis. `https://portal-psikotes-perusahaan.netlify.app`).

### Langkah 6 — Inisialisasi otomatis
Saat pertama kali ada permintaan masuk, sistem otomatis:
- Membuat tabel `results`, `config`, `hr_users` (jika belum ada).
- Mengisi konfigurasi default (KKM/bobot/divisi/timer 4 divisi awal).
- Membuat akun HR default: **username `admin` / password `hr2024`**.

Buka URL situs Anda → klik **"Masuk sebagai HR"** → login dengan `admin` / `hr2024`.

### Langkah 7 — WAJIB: ganti password HR
Begitu masuk dashboard, buka menu **🔑 Ganti Password** dan ganti password default
`hr2024` dengan password Anda sendiri. Password baru disimpan **terenkripsi**
(hash PBKDF2) di database — tidak bisa dibaca siapa pun, termasuk Anda; hanya bisa
diganti lagi bila tahu password lama.

---

## Mengubah / deploy ulang nanti
Setiap kali mengubah file, jalankan lagi:
```bash
netlify deploy --prod
```
Atau hubungkan repo Git ke Netlify agar otomatis deploy tiap `git push`.

---

## Catatan keamanan & batasan (baca ini)

1. **Yang dilindungi login HR:** daftar hasil kandidat (data pribadi), pengubahan
   KKM/bobot/divisi/timer, dan ganti password. Tanpa token valid, endpoint ini
   menolak (HTTP 401).

2. **Scoring masih di sisi browser.** Skor PAPI/Kraepelin/Integrity dihitung di
   perangkat kandidat, lalu dikirim ke server. Konsekuensinya: (a) nilai KKM & bobot
   ikut termuat di browser kandidat (bisa dilihat lewat DevTools), dan (b) kandidat
   yang sangat teknis secara teori bisa memanipulasi skornya sendiri lewat console.
   Untuk rekrutmen biasa risiko ini rendah. Jika nanti ingin "anti-curang" penuh,
   langkah berikutnya adalah memindahkan perhitungan skor ke function di server
   (`results.mjs`) — beri tahu bila ingin dibantu.

3. **Cek duplikat email/HP** kini dilakukan di server saat hasil dikirim, jadi tidak
   bisa diakali dari browser.

4. **Backup data:** menu **📥 Export JSON** di dashboard tetap berfungsi untuk
   mengunduh seluruh hasil sebagai cadangan.

---

## Kalau ada yang error

- **Halaman muncul toast "Tidak dapat terhubung ke server data"** → biasanya
  `netlify db init` belum dijalankan, atau deploy belum selesai. Pastikan env
  `NETLIFY_DATABASE_URL` ada di *Project → Environment variables*.
- **Login selalu gagal** → pastikan `AUTH_SECRET` sudah di-set (Langkah 4) lalu
  deploy ulang. Jika mengubah `AUTH_SECRET` setelah login, semua sesi lama jadi
  tidak valid (harus login ulang) — ini normal.
- **Database "hilang" setelah beberapa hari** → kemungkinan belum di-_claim_ ke akun
  Neon dalam 7 hari (Langkah 3).
