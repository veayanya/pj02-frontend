export default function Hero({ serverMode, tools, children }) {
  return (
    <section className="hero" id="top">
      {serverMode === "live" && (
        <div className="badge">
          <span className="badge-dot" />
          Backend terhubung
          {tools && (
            <>
              {" "}
              ·{" "}
              <code style={{ fontSize: 11, color: "var(--violet)", background: "none" }}>
                {Object.values(tools).filter((t) => t.isNative).length}/{Object.keys(tools).length} engine native
              </code>
            </>
          )}
        </div>
      )}
      {serverMode === "landing" && (
        <div className="badge badge-offline">
          <span className="badge-dot" />
          Mode landing — backend belum terhubung
        </div>
      )}

      <h1>
        Konversi dokumen,
        <br />
        <span className="grad">tanpa ribet.</span>
      </h1>
      <p className="subtitle">
        Ubah PDF, Word, PowerPoint, HTML, dan EPUB langsung dari browser. Cepat, rapi, dan hasilnya siap pakai.
      </p>

      <a
        href="https://ig-save-by-eva.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="ig-banner-link"
      >
        <span className="ig-banner-badge">REKOMENDASI</span>
        <span>📸 Butuh pengunduh video Instagram? Buka <strong>IG Save by Eva</strong> &rarr;</span>
      </a>

      {children}

      <div className="supported">
        <span>Didukung:</span>
        <span className="chip">PDF</span>
        <span className="chip">DOCX</span>
        <span className="chip">PPTX</span>
        <span className="chip">HTML</span>
        <span className="chip">EPUB</span>
      </div>
    </section>
  );
}
