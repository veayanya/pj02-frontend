import { apiUrl } from "./api.js";

export async function pollAndDownload(jobId, onUpdate, originalFileName = "", targetExt = "") {
  const poll = async () => {
    const res = await fetch(apiUrl(`/api/convert?id=${jobId}`));

    const contentType = res.headers.get("Content-Type") || "";

    if (res.ok && !contentType.includes("application/json")) {
      // File sudah siap — mulai unduh
      const blob = await res.blob();
      const disposition = res.headers.get("Content-Disposition") ?? "";
      
      let filename = "";

      // 1. Coba match filename*=UTF-8''... (RFC 5987)
      const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
      if (utf8Match?.[1]) {
        try {
          filename = decodeURIComponent(utf8Match[1]);
        } catch {}
      }

      // 2. Coba match filename="..."
      if (!filename) {
        const match = disposition.match(/filename="([^"]+)"/i) || disposition.match(/filename=([^;]+)/i);
        if (match?.[1]) {
          const raw = match[1].replace(/^"|"$/g, "").trim();
          try {
            filename = decodeURIComponent(raw);
          } catch {
            filename = raw;
          }
        }
      }

      // 3. Fallback jika header Content-Disposition disaring CORS: rakit dari nama file asli yang diunggah
      if (!filename && originalFileName) {
        const lastDot = originalFileName.lastIndexOf(".");
        const base = lastDot > 0 ? originalFileName.substring(0, lastDot) : originalFileName;
        const ext = targetExt ? targetExt.toLowerCase() : "pdf";
        filename = `${base}.${ext}`;
      }

      if (!filename) {
        filename = `hasil_konversi.${targetExt ? targetExt.toLowerCase() : "pdf"}`;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      onUpdate("done");
      return;
    }

    const data = await res.json();

    if (!res.ok || data.status === "error") {
      onUpdate("error", data.error ?? "Konversi gagal");
      return;
    }

    if (data.status === "queued" || data.status === "processing") {
      onUpdate(data.status);
      await new Promise((r) => setTimeout(r, 1500));
      return poll();
    }

    onUpdate("done");
  };

  return poll();
}
