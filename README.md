# Konversin — Frontend (Vue 3 + Vite)

UI untuk 24 tool PDF (merge, split, compress, watermark, rotate, protect, unlock,
repair, PDF↔JPG, image→PDF, office→PDF, html→PDF, PDF/A, OCR, extract text,
markdown, translate, summarize, form detect, edit & sign). Semua pemrosesan file
dilakukan oleh backend terpisah (Node/Express) yang memanggil API pemrosesan PDF — frontend
ini tidak pernah menyimpan API key.

Deploy target: **Vercel**.

## 1. Jalankan lokal

```bash
cp .env.example .env
# isi VITE_API_URL dengan URL backend (lokal atau Render)
npm install
npm run dev
# jalan di http://localhost:5173
```

Pastikan backend (repo terpisah) sudah jalan dan `CORS_ORIGIN` di backend mengizinkan
origin frontend ini.

## 2. Deploy ke Vercel

1. Push repo ini ke Git (GitHub/GitLab/dst).
2. Di Vercel: **Add New → Project**, import repo ini.
3. Framework preset: **Vite** (biasanya terdeteksi otomatis).
4. Set environment variable:
   - `VITE_API_URL` → URL backend Render kamu, mis.
     `https://konversin-backend.onrender.com`
5. Deploy. `vercel.json` sudah menangani SPA routing (semua path → `index.html`).
6. Setelah dapat domain Vercel, update `CORS_ORIGIN` di backend Render dengan domain
   ini lalu redeploy backend.

## Struktur

```
src/
  config/tools.js   metadata form tiap tool (field, label, default, pilihan)
  api/client.js      pemanggil backend via axios (multipart/form-data)
  views/Home.vue     grid semua tool
  views/ToolView.vue form dinamis + hasil (download file / tampilkan JSON)
vercel.json
```
