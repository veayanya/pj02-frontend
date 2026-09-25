import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const api = axios.create({
  baseURL: API_URL,
});

/**
 * Menjalankan satu tool PDF di backend.
 * @param {string} tool - slug tool, mis. "compress"
 * @param {Object} params
 * @param {File[]} [params.files]
 * @param {string} [params.sourceUrl]
 * @param {Object} [params.options]
 * @returns {Promise<{isJson: boolean, data: any, filename?: string}>}
 */
export async function runPdfTool(tool, { files = [], sourceUrl, options = {} } = {}) {
  const form = new FormData();
  files.forEach((file) => form.append("files", file));
  if (sourceUrl) form.append("sourceUrl", sourceUrl);
  form.append("options", JSON.stringify(options));

  const response = await api.post(`/api/pdf/${tool}`, form, {
    responseType: "arraybuffer",
    headers: { "Content-Type": "multipart/form-data" },
  });

  const contentType = response.headers["content-type"] || "";

  if (contentType.includes("application/json")) {
    const text = new TextDecoder("utf-8").decode(response.data);
    return { isJson: true, data: JSON.parse(text) };
  }

  const disposition = response.headers["content-disposition"] || "";
  const match = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(disposition);
  const filename = match ? decodeURIComponent(match[1]) : `${tool}-output`;

  const blob = new Blob([response.data], { type: contentType || "application/octet-stream" });
  return { isJson: false, data: blob, filename };
}
