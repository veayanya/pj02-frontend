import { useState } from "react";

export default function LibreOfficeGuide() {
  const [activeTab, setActiveTab] = useState("docker");

  const platforms = [
    { id: "docker", label: "☁️ Render / Docker", badge: "Server Production" },
    { id: "windows", label: "🪟 Windows", badge: "PC / Laptop" },
    { id: "linux", label: "🐧 Ubuntu / Linux", badge: "Linux Server" },
    { id: "mac", label: "🍎 macOS", badge: "Apple Silicon / Intel" },
  ];

  return (
    <section className="section" id="tutor-libreoffice">
      <div className="section-heading">
        <span className="eyebrow">TUTORIAL INSTALASI SERVER</span>
        <h2>Instal LibreOffice 26.8 untuk Konversi Sempurna</h2>
        <p className="section-sub">
          LibreOffice digunakan sebagai mesin konversi utama untuk menghasilkan tata letak, font, margin, dan gambar yang 100% presisi.
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
        {activeTab === "docker" && (
          <div className="tutor-panel">
            <h3>Panduan Deploy di Render / Docker Container</h3>
            <p>Tambahkan <code>libreoffice</code> ke dalam file <code>Dockerfile</code> backend Anda agar Render dapat mengeksekusi konversi secara native.</p>
            <div className="code-block">
              <pre>
{`# File: konversin-backend/Dockerfile
FROM node:20-slim

# Pasang LibreOffice 26.8 / versi terbaru dari apt
RUN apt-get update && apt-get install -y --no-install-recommends \\
    libreoffice \\
    fonts-dejavu \\
    && rm -rf /var/lib/apt/lists/*`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === "windows" && (
          <div className="tutor-panel">
            <h3>Panduan Instalasi di Windows</h3>
            <p>Jalankan perintah WinGet di PowerShell (Administrator) atau unduh installer resmi MSI:</p>
            <div className="code-block">
              <pre>
{`# Jalankan di Windows PowerShell:
winget install --id DocumentFoundation.LibreOffice --source winget`}
              </pre>
            </div>
            <p style={{ marginTop: "12px", fontSize: "13px" }}>
              💡 <em>Lokasi instalasi default (otomatis dideteksi backend):</em><br />
              <code>C:\\Program Files\\LibreOffice\\program\\soffice.exe</code>
            </p>
          </div>
        )}

        {activeTab === "linux" && (
          <div className="tutor-panel">
            <h3>Panduan Instalasi di Ubuntu / Debian Linux</h3>
            <p>Pasang LibreOffice versi terbaru dari PPA resmi atau repositori bawaan:</p>
            <div className="code-block">
              <pre>
{`# Tambahkan PPA resmi LibreOffice untuk mendapatkan versi terbaru:
sudo add-apt-repository ppa:libreoffice/ppa -y
sudo apt update
sudo apt install libreoffice -y`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === "mac" && (
          <div className="tutor-panel">
            <h3>Panduan Instalasi di macOS</h3>
            <p>Gunakan Homebrew Cask untuk menginstal LibreOffice dengan satu baris perintah:</p>
            <div className="code-block">
              <pre>
{`# Jalankan di Terminal macOS:
brew install --cask libreoffice`}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* 4 Langkah Tata Cara Penggunaan & Pengaktifan */}
      <div className="tutor-steps-grid">
        <article className="tutor-step-card">
          <div className="step-number">01</div>
          <h3>Unduh & Pasang</h3>
          <p>Pasang LibreOffice di komputer Anda atau di container server Render menggunakan petunjuk di atas.</p>
        </article>

        <article className="tutor-step-card">
          <div className="step-number">02</div>
          <h3>Verifikasi CLI</h3>
          <p>Buka terminal dan ketik <code>soffice --version</code> atau <code>libreoffice --version</code> untuk memastikan perintah tersedia.</p>
        </article>

        <article className="tutor-step-card">
          <div className="step-number">03</div>
          <h3>Deteksi Otomatis</h3>
          <p>Backend Konversin akan otomatis mendeteksi keberadaan LibreOffice Native saat server dinyalakan.</p>
        </article>

        <article className="tutor-step-card">
          <div className="step-number">04</div>
          <h3>Siap Dikonversi!</h3>
          <p>Konversi dokumen Word, PDF, PPTX, HTML, dan EPUB kini diproses dengan kualitas presisi tinggi.</p>
        </article>
      </div>
    </section>
  );
}
