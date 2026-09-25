import { apiUrl } from "./api.js";

export async function pollAndDownload(jobId, onUpdate) {
  const poll = async () => {
    const res = await fetch(apiUrl(`/api/convert?id=${jobId}`));

    if (res.ok && res.headers.get("Content-Type") !== "application/json") {
      // File sudah siap — mulai unduh
      const blob = await res.blob();
      const disposition = res.headers.get("Content-Disposition") ?? "";
      const match = disposition.match(/filename="?([^"]+)"?/);
      const filename = match?.[1] ?? "output";

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
