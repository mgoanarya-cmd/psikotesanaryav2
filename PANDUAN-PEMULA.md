# 🚀 Panduan Online-kan Portal Psikotes — Versi Ramah Pemula

Halo! Panduan ini dibuat untuk kamu yang **belum pernah** meng-online-kan website
sama sekali. Tidak apa-apa kalau istilahnya terdengar asing — kita jalan pelan-pelan,
satu langkah satu waktu. Tidak ada yang akan rusak kalau kamu salah klik. 🙂

> ⏱️ **Perkiraan waktu:** sekitar 30–45 menit untuk pertama kali. Wajar kalau terasa
> lama di awal — ini cuma sekali setup. Setelahnya, update jauh lebih cepat.

---

## 🧭 Bayangkan dulu gambaran besarnya

Sebelum mulai, pahami 4 "pemain" dalam cerita ini lewat perumpamaan sederhana:

| Istilah | Anggap saja seperti… | Tugasnya di sini |
|---|---|---|
| **GitHub** | Lemari arsip online tempat menyimpan file program | Menyimpan file aplikasimu |
| **Netlify** | Penyewaan "toko" di internet | Menjalankan & menampilkan aplikasimu ke publik |
| **Netlify DB (database)** | Buku besar / gudang data | Menyimpan hasil tes, KKM, divisi, akun HR |
| **Environment variable** | Brankas berisi kunci rahasia | Menyimpan kata sandi sistem dengan aman |

Alurnya: **File-mu disimpan di GitHub → Netlify mengambilnya & menjalankannya →
data tersimpan di Netlify DB.** Begitu online, HR bisa membukanya dari HP atau laptop
mana pun, dan datanya selalu sama. Itulah yang kamu inginkan.

> 💡 **Kenapa tidak "seret folder saja ke Netlify"?** Cara seret-lepas itu ada, tapi
> **tidak cocok** untuk aplikasi ini. Aplikasimu punya bagian "mesin di belakang
> layar" (yang menghubungkan ke database) yang butuh dipasang dulu otomatis —
> dan itu hanya terjadi lewat jalur GitHub di bawah. Kalau pakai seret-lepas, situs
> tampak jadi tapi login HR & simpan data diam-diam tidak berfungsi. Jadi ikuti
> jalur GitHub ya.

---

## ✅ Yang perlu disiapkan dulu

1. **Alamat email aktif** (untuk daftar akun).
2. **File project** — folder hasil ekstrak `portal-psikotes-online.zip`.
   Ekstrak dulu (klik kanan → Extract / Ekstrak). Di dalamnya ada `index.html`,
   `package.json`, folder `netlify`, dan lain-lain. Biarkan apa adanya, jangan
   diubah susunannya.
3. **Kartu kredit / debit** — Netlify DB ada di paket berbayar (Credit-based). Tenang,
   ada saldo/kredit gratis untuk mulai, dan kamu bisa pantau pemakaiannya. Tanpa
   database, fitur "data tersimpan online" tidak bisa jalan.

---

# BAGIAN 1 — Simpan file di GitHub (tanpa aplikasi apa pun, cukup browser)

### Langkah 1.1 — Buat akun GitHub
1. Buka **https://github.com** → klik **Sign up**.
2. Isi email, buat password, pilih username (mis. `hrd-perusahaanku`).
3. Verifikasi email kalau diminta. Selesai.

> ✅ **Tanda berhasil:** kamu masuk ke halaman GitHub dengan namamu di pojok kanan atas.

### Langkah 1.2 — Buat "repository" (tempat menaruh file)
1. Klik tombol **+** di pojok kanan atas → **New repository**.
2. **Repository name:** ketik `portal-psikotes`.
3. Pilih **Public** atau **Private** (Private = hanya kamu yang bisa lihat; disarankan).
4. Jangan centang apa pun yang lain. Klik **Create repository**.

> ✅ **Tanda berhasil:** muncul halaman repo kosong dengan tulisan "Quick setup".

### Langkah 1.3 — Unggah file aplikasimu
1. Di halaman repo tadi, cari tulisan **"uploading an existing file"** lalu klik.
   (Atau klik tombol **Add file → Upload files**.)
2. **Buka folder hasil ekstrak tadi di komputermu.** Pilih **semua isinya**
   (file `index.html`, `package.json`, `netlify.toml`, folder `netlify`, dll),
   lalu **seret semuanya** ke area unggah di halaman GitHub.
   - 📌 **Penting:** ikut sertakan folder **`netlify`** beserta isinya. Kalau folder
     tidak ikut terseret, coba buka folder `netlify` dan unggah bertahap, atau pakai
     tombol **Add file → Upload files** beberapa kali. Susunan folder harus tetap.
3. Tunggu sampai semua file muncul di daftar (ada bar progress).
4. Scroll ke bawah, klik tombol hijau **Commit changes**.

> ✅ **Tanda berhasil:** halaman repo kini menampilkan daftar file kamu —
> `index.html`, `netlify/`, `package.json`, dan seterusnya.

---

# BAGIAN 2 — Hubungkan ke Netlify & online-kan

### Langkah 2.1 — Buat akun Netlify
1. Buka **https://www.netlify.com** → klik **Sign up**.
2. Pilih **Sign up with GitHub** (paling gampang — pakai akun GitHub yang barusan).
3. Izinkan/Authorize saat diminta.

> ✅ **Tanda berhasil:** kamu masuk ke dashboard Netlify.

### Langkah 2.2 — Hubungkan repo & deploy
1. Klik **Add new project** (atau "Add new site") → **Import an existing project**.
2. Pilih **GitHub**. Kalau diminta izin, klik **Authorize / Install**.
3. Cari dan pilih repo **`portal-psikotes`**.
4. Muncul halaman pengaturan build. **Biarkan kosong** bagian "Build command" dan
   "Publish directory" (aplikasi ini tidak butuh build). Klik **Deploy**.
5. Tunggu beberapa menit. Netlify sedang memasang "mesin belakang layar" otomatis.
   - 📌 Build pertama agak lama karena memasang semua komponen — ini normal.

> ✅ **Tanda berhasil:** status berubah jadi **"Published"** dan muncul alamat situs,
> mis. `https://portal-psikotes-xxxx.netlify.app`. Coba buka — halaman depan portal
> akan tampil. (Login HR belum bisa sampai database dibuat di Bagian 3.)

---

# BAGIAN 3 — Buat database online

### Langkah 3.1 — Aktifkan database
1. Di dashboard Netlify, masuk ke project **portal-psikotes**.
2. Cari menu **Database** (biasanya di bilah kiri, atau di bawah menu **Project
   configuration** / **Data & storage**).
3. Klik tombol untuk **membuat / mengaktifkan database** (mis. "Add database" atau
   "Get started"). Netlify akan membuat database Postgres otomatis.
   - Ini juga otomatis menambahkan "kunci koneksi" (`NETLIFY_DATABASE_URL`) ke
     project-mu. Kamu tidak perlu menyalin apa pun secara manual.

> ✅ **Tanda berhasil:** muncul keterangan database aktif untuk project-mu.

> ⚠️ **SANGAT PENTING — jangan lewatkan:** database awal bersifat **sementara**.
> Kamu **harus meng-"claim" (mengklaim) database dalam 7 hari** lewat tombol
> **Claim database** di halaman Database, kalau tidak **semua data terhapus
> otomatis**. Set pengingat di HP-mu sekarang juga. ⏰

---

# BAGIAN 4 — Pasang "kunci rahasia" untuk keamanan login

Login HR diamankan oleh sebuah kunci rahasia. Kita pasang sekarang.

### Langkah 4.1 — Tambah environment variable
1. Di project Netlify, buka **Project configuration → Environment variables**
   (atau **Site settings → Environment variables**).
2. Klik **Add a variable** → **Add a single variable**.
3. **Key:** ketik persis → `AUTH_SECRET`
4. **Value:** ketik teks acak yang panjang & rahasia, minimal 32 karakter.
   Contoh (buat versi acakmu sendiri, jangan pakai contoh ini):
   `kunci-rahasia-hrd-9f3kd02jfLmZ81xQ-aman-2026`
5. Simpan (**Create variable** / **Save**).

> 🔒 Kunci ini tidak perlu kamu hafal. Cukup pastikan tersimpan dan jangan dibagikan.

### Langkah 4.2 — Deploy ulang agar pengaturan baru terpakai
1. Buka menu **Deploys** di project-mu.
2. Klik **Trigger deploy → Deploy site** (atau **Clear cache and deploy site**).
3. Tunggu sampai status **Published** lagi.

> ✅ **Tanda berhasil:** ada deploy baru berstatus "Published" dengan waktu terbaru.

---

# BAGIAN 5 — Coba & amankan

### Langkah 5.1 — Login pertama
1. Buka alamat situsmu (`https://....netlify.app`).
2. Klik **Masuk sebagai HR**.
3. Login dengan akun bawaan:
   - **Username:** `admin`
   - **Password:** `hr2024`

> ✅ **Tanda berhasil:** dashboard HR terbuka. 🎉 Selamat — aplikasimu sudah online
> dengan data terpusat! Kalau gagal, lihat bagian "Kalau ada masalah" di bawah.

### Langkah 5.2 — WAJIB: ganti password bawaan
Password `hr2024` itu umum dan tidak aman. **Ganti sekarang:**
1. Di dashboard, buka menu **🔑 Ganti Password**.
2. Password lama: `hr2024`. Isi password baru (minimal 6 karakter), konfirmasi, simpan.

> 🔒 Password baru disimpan dalam bentuk teracak (terenkripsi) di database — tidak
> bisa dibaca siapa pun, bahkan olehmu. Jadi **catat baik-baik** password barumu.

### Langkah 5.3 — Tes singkat keseluruhan
- Buka situs di **HP** (bukan laptop yang tadi), login HR → datanya harus sama persis.
  Itu bukti "konsisten antar perangkat" sudah tercapai. ✅
- Coba satu kali alur kandidat: isi pendaftaran → kerjakan tes → selesai. Lalu cek di
  dashboard HR, kandidat itu harus muncul.

---

# 🔄 Cara update aplikasi nanti

Kalau suatu saat ada perubahan file (`index.html` dll):
1. Buka repo di GitHub → **Add file → Upload files** → seret file baru (menimpa yang lama)
   → **Commit changes**.
2. Netlify otomatis mendeteksi dan men-deploy ulang dalam 1–2 menit. Tidak perlu
   menyentuh apa pun lagi.

---

# 🆘 Kalau ada masalah (dan solusinya, bahasa sederhana)

**"Masuk sebagai HR → selalu gagal / Username atau password salah"**
→ Biasanya `AUTH_SECRET` belum dipasang atau belum deploy ulang. Ulangi **Bagian 4**.
Kalau baru pertama kali dan belum pernah ganti password, pastikan pakai `admin` /
`hr2024` persis (huruf kecil semua).

**Muncul notifikasi merah "Tidak dapat terhubung ke server data"**
→ Database belum dibuat atau belum aktif. Ulangi **Bagian 3**. Pastikan menu Database
menunjukkan database aktif.

**Halaman depan tampil, tapi dropdown "Posisi" kosong saat daftar**
→ Sama seperti di atas — database belum siap. Selesaikan Bagian 3, lalu refresh halaman.

**Data tiba-tiba hilang setelah beberapa hari**
→ Kemungkinan besar database belum di-**claim** dalam 7 hari (lihat peringatan di
Bagian 3). Sayangnya data yang sudah terhapus tidak bisa dikembalikan. Mulai lagi dan
segera claim. (Karena itu: rajin **Export JSON** sebagai cadangan — ada tombolnya di
dashboard.)

**Mau lihat pesan error teknis (untuk minta bantuan)**
→ Di Netlify, buka project → menu **Functions** → klik nama function (mis. `login`)
→ ada **Logs**. Salin pesan error di sana saat minta bantuan.

---

# 📖 Kamus istilah singkat

- **Deploy:** proses menerbitkan aplikasi supaya bisa diakses online.
- **Repository (repo):** folder project-mu yang tersimpan di GitHub.
- **Commit:** menyimpan/mengunggah perubahan ke GitHub.
- **Build:** proses Netlify menyiapkan aplikasi sebelum online.
- **Published:** status saat aplikasi sudah live & bisa dibuka publik.
- **Environment variable:** tempat menyimpan kunci/kata sandi sistem secara aman.
- **Claim database:** mengklaim kepemilikan database supaya permanen (tidak terhapus).

---

# 🙋 Jalur alternatif (kalau kamu sedikit lebih berani): pakai terminal

Kalau kamu nyaman mengetik perintah, jalur terminal lebih ringkas (database & kunci
diatur otomatis). Ringkasnya: pasang Node.js → `npm install -g netlify-cli` →
`netlify login` → `netlify init` → `netlify db init` →
`netlify env:set AUTH_SECRET "teks-acak-panjang"` → `netlify deploy --prod`.
Detail lengkapnya ada di file **`PANDUAN-DEPLOY.md`** (panduan teknis) di dalam project.

---

Selamat mencoba! Pelan-pelan saja, ikuti checklist ✅ di tiap langkah. Kamu pasti bisa. 💪
