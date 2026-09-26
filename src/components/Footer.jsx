export default function Footer() {
  return (
    <footer>
      <span>
        © 2026{" "}
        <a
          href="https://github.com/veayanya/konversin-frontend"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--ink-soft)", fontWeight: 600, textDecoration: "none" }}
        >
          Konversin
        </a>{" "}
        · PDF · DOCX · PPTX · HTML · EPUB · Dibuat oleh{" "}
        <a
          href="https://github.com/veayanya"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--violet)", fontWeight: 700, textDecoration: "none" }}
        >
          Eva
        </a>
      </span>
      <a
        href="https://instasave-by-eva.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "var(--pink)", fontWeight: 600, textDecoration: "none" }}
      >
        📸 InstaSave by Eva — Pengunduh Video Instagram
      </a>
    </footer>
  );
}
