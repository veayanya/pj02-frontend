# Konversin Frontend

UI Konversin (dulunya "Personal Doc Converter"), dibangun ulang dengan Vite + React,
tampilannya mengikuti gaya visual InstaSave (kartu bulat, gradasi pink→coral,
badge status server, font Sora untuk judul + Inter untuk isi).

Frontend ini murni tampilan — semua proses konversi file dilakukan oleh
**konversin-backend** yang di-deploy terpisah (lihat folder `konversin-backend`).

## Jalankan lokal

```bash
npm install
cp .env.example .env   # lalu isi VITE_API_URL ke backend lokal/Render kamu
npm run dev
```

## Deploy ke Vercel

1. Push folder ini ke repo GitHub sendiri (terpisah dari backend).
2. Import project di Vercel → framework otomatis terdeteksi sebagai **Vite**.
3. Set environment variable `VITE_API_URL` ke URL backend Render kamu, misalnya
   `https://konversin-backend.onrender.com` (tanpa trailing slash).
4. Deploy. Setelah backend & frontend sama-sama live, badge di halaman utama akan
   otomatis berubah dari "Mode landing" menjadi "Backend terhubung".

## Struktur

```
src/
  api.js              # helper fetch ke backend (pakai VITE_API_URL)
  constants.js         # daftar format & mode konversi
  pollAndDownload.js   # polling status job + auto-download hasil
  App.jsx
  components/
    Navbar.jsx
    Hero.jsx
    ModeSelector.jsx
    DropZone.jsx
    JobQueue.jsx
    Steps.jsx
    Footer.jsx
  styles/global.css    # design system (warna, font, komponen)
```
