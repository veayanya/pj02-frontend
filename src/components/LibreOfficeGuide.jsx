import { useState } from "react";

export default function LibreOfficeGuide() {
  const [activeTab, setActiveTab] = useState("windows");

  const platforms = [
    { id: "windows", label: "🪟 Windows", badge: "PC / Laptop Awam" },
    { id: "docker", label: "☁️ Render / Docker", badge: "Cloud Server" },
    { id: "linux", label: "🐧 Ubuntu / Linux", badge: "Linux Desktop / Server" },
    { id: "mac", label: "🍎 macOS", badge: "MacBook / iMac" },
  ];

  return (
    <section className="section" id="tutor-libreoffice">
      <div className="section-heading">
        <span className="eyebrow">PANDUAN INSTALASI MUDAH</span>
        <h2>Instal LibreOffice 26.8 (Siap Pakai Tanpa Ribet)</h2>
        <p className="section-sub">
          LibreOffice adalah aplikasi gratis pengganti Microsoft Office yang digunakan server kami untuk menghasilkan hasil konversi dokumen yang 100% presisi dan rapi.
        </p>
      </div>

      {/* Tabs Pilihan Platform */}
      <div className="tutor-tabs">
        {platforms.map((p) => (
          <button
            key={p.id}
            className={`tutor-tab ${activeTab === p.id ? "tutor-tab-active" : ""}`}
            onClick={() => setActiveTab(p.id)}
          >
            <span>{p.label}</span>
            <small className="tab-chip">{p.badge}</small>
          </button>
        ))}
      </div>

      {/* Konten Per Platform */}
      <div className="tutor-content-card">
        {activeTab === "windows" && (
          <div className="tutor-panel">
            <div className="easy-mode-box">
              <span className="easy-tag">✨ CARA PALING MUDAH (NON-IT / AWAM)</span>
              <h3>Cukup Unduh & Klik Install 2-3 Kali</h3>
              <ol className="easy-steps-list">
                <li>
                  Klik tombol di bawah untuk mengunduh installer resmi LibreOffice 26.8 / versi terbaru:
                  <div style={{ marginTop: "10px" }}>
                    <a
                      href="https://www.libreoffice.org/download/download-libreoffice/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-download-official"
                    >
                      🚀 Unduh LibreOffice Installer (.msi)
                    </a>
                  </div>
                </li>
                <li>Buka file <code>.msi</code> yang sudah terunduh di laptop/PC Anda.</li>
                <li>Klik <strong>Next</strong> → <strong>Install</strong> → <strong>Finish</strong>. Selesai!</li>
              </ol>
              <div className="auto-detect-banner">
                ✅ <strong>Otomatis Terhubung!</strong> Aplikasi Konversin akan langsung mendeteksi LibreOffice di komputer Anda tanpa perlu pengaturan tambahan.
              </div>
            </div>

            <details className="dev-mode-details">
              <summary>💻 Cara Pengembang / Perintah Terminal (Opsional)</summary>
              <p style={{ marginTop: "10px" }}>Jalankan di Windows PowerShell (Administrator):</p>
              <div className="code-block">
                <pre>winget install --id DocumentFoundation.LibreOffice --source winget</pre>
              </div>
            </details>
          </div>
        )}

        {activeTab === "docker" && (
          <div className="tutor-panel">
            <div className="easy-mode-box">
              <span className="easy-tag">☁️ CARA DEPLOY CLOUD (RENDER.COM)</span>
              <h3>Otomatis Terpasang Saat Deploy ke Render</h3>
              <p>
                File <code>Dockerfile</code> bawaan projek Konversin sudah terkonfigurasi untuk mengunduh dan memasang LibreOffice secara otomatis saat Anda menghubungkan repositori ke Render.com.
              </p>
              <div className="auto-detect-banner">
                🎉 <strong>Anda Tidak Perlu Mengetik Koding Apapun!</strong> Cukup buat Web Service baru di Render dan pilih mode <em>Docker</em>.
              </div>
            </div>

            <details className="dev-mode-details">
              <summary>💻 Isi File Dockerfile (Untuk Developer)</summary>
              <div className="code-block" style={{ marginTop: "10px" }}>
                <pre>
{`FROM node:20-slim

# Pasang LibreOffice & Font Dekstop di Docker Container
RUN apt-get update && apt-get install -y --no-install-recommends \\
    libreoffice \\
    fonts-dejavu \\
    && rm -rf /var/lib/apt/lists/*`}
                </pre>
              </div>
            </details>
          </div>
        )}

        {activeTab === "linux" && (
          <div className="tutor-panel">
            <div className="easy-mode-box">
              <span className="easy-tag">🐧 CARA GRAFIS (TANPA TERMINAL)</span>
              <h3>Gunakan App Center / Software Manager</h3>
              <ol className="easy-steps-list">
                <li>Buka aplikasi <strong>Ubuntu Software</strong> / <strong>App Center</strong> di komputer Anda.</li>
                <li>Ketik <strong>"LibreOffice"</strong> di kolom pencarian.</li>
                <li>Klik tombol hijau <strong>Install</strong>. Selesai!</li>
              </ol>
            </div>

            <details className="dev-mode-details">
              <summary>💻 Cara Terminal Ubuntu / Debian (1 Perintah)</summary>
              <div className="code-block" style={{ marginTop: "10px" }}>
                <pre>sudo apt update && sudo apt install libreoffice -y</pre>
              </div>
            </details>
          </div>
        )}

        {activeTab === "mac" && (
          <div className="tutor-panel">
            <div className="easy-mode-box">
              <span className="easy-tag">🍎 CARA MACOS (DRAG & DROP)</span>
              <h3>Unduh & Geser ke Folder Applications</h3>
              <ol className="easy-steps-list">
                <li>
                  Unduh file installer macOS <code>.dmg</code> dari situs resmi:
                  <div style={{ marginTop: "10px" }}>
                    <a
                      href="https://www.libreoffice.org/download/download-libreoffice/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-download-official"
                    >
                      🚀 Unduh LibreOffice Mac (.dmg)
                    </a>
                  </div>
                </li>
                <li>Buka file <code>.dmg</code>, lalu tarik/geser ikon <strong>LibreOffice</strong> ke folder <strong>Applications</strong>.</li>
              </ol>
            </div>

            <details className="dev-mode-details">
              <summary>💻 Cara Terminal Homebrew</summary>
              <div className="code-block" style={{ marginTop: "10px" }}>
                <pre>brew install --cask libreoffice</pre>
              </div>
            </details>
          </div>
        )}
      </div>

      {/* 4 Langkah Tata Cara Penggunaan Sederhana */}
      <div className="tutor-steps-grid">
        <article className="tutor-step-card">
          <div className="step-number">01</div>
          <h3>1. Unduh Aplikasi</h3>
          <p>Klik tombol download di atas untuk mengunduh aplikasi resmi LibreOffice secara gratis.</p>
        </article>

        <article className="tutor-step-card">
          <div className="step-number">02</div>
          <h3>2. Klik Install</h3>
          <p>Buka file installer lalu klik tombol <em>Next / Install</em> hingga selesai seperti aplikasi biasa.</p>
        </article>

        <article className="tutor-step-card">
          <div className="step-number">03</div>
          <h3>3. Otomatis Terhubung</h3>
          <p>Backend Konversin secara otomatis mengenali LibreOffice di laptop/server tanpa koding.</p>
        </article>

        <article className="tutor-step-card">
          <div className="step-number">04</div>
          <h3>4. Siap Konversi!</h3>
          <p>Nikmati hasil konversi PDF, Word, PPTX, HTML, dan EPUB yang 100% presisi dan rapi.</p>
        </article>
      </div>
    </section>
  );
}
