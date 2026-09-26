export default function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="#top">
        <div className="brand-icon">📄</div>
        <span>Konversin</span>
      </a>
      <nav>
        <a href="#cara-pakai">Cara Pakai</a>
        <a href="#tutor-libreoffice">Instal LibreOffice</a>
        <a
          href="https://github.com/veayanya/konversin-frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://instasave-by-eva.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-ig-btn"
        >
          📸 Unduh Video IG
        </a>
      </nav>
    </header>
  );
}
