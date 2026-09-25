// URL dasar backend Konversin (di-deploy terpisah di Render).
// Atur VITE_API_URL di file .env / pengaturan project Vercel.
const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${p}`;
}

export async function apiFetch(path, options) {
  const res = await fetch(apiUrl(path), options);
  if (!res.ok) {
    let message = `Permintaan gagal (${res.status})`;
    try {
      const data = await res.json();
      message = data.error || message;
    } catch {
      // abaikan — bukan JSON
    }
    throw new Error(message);
  }
  return res.json();
}

export async function apiPostForm(path, formData) {
  const res = await fetch(apiUrl(path), { method: "POST", body: formData });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Permintaan gagal");
  return data;
}
