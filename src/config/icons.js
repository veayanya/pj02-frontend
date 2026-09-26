// Ikon SVG berwarna untuk tiap tool (menggantikan emoji).
// Setiap ikon: kotak latar warna + garis putih (gaya duotone), warna
// mengikuti palet brand Konversin (pink, coral, kuning, violet, hijau).

const PALETTE = ["#ff3d77", "#ff9257", "#ffc845", "#6c5dd3", "#2fbd76"];

function wrap(bg, inner) {
  return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="7" fill="${bg}"/>
    <g fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${inner}</g>
  </svg>`;
}

const RAW_ICONS = {
  merge: `<rect x="4" y="4" width="9" height="12" rx="1.5"/><rect x="9" y="8" width="9" height="12" rx="1.5"/>`,
  split: `<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><path d="M8 8l10 10M8 16L18 6"/>`,
  splitsmart: `<rect x="5" y="7" width="14" height="10" rx="2"/><circle cx="9" cy="12" r="1.2" fill="#fff" stroke="none"/><circle cx="15" cy="12" r="1.2" fill="#fff" stroke="none"/><path d="M12 7V4"/><circle cx="12" cy="3" r="1" fill="#fff" stroke="none"/>`,
  compress: `<path d="M9 4v5H4"/><path d="M15 4v5h5"/><path d="M9 20v-5H4"/><path d="M15 20v-5h5"/>`,
  rotate: `<path d="M4.5 12a7.5 7.5 0 1 1 2.8 5.9"/><path d="M4 16.5V20h3.5"/>`,
  watermark: `<path d="M12 3s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11z"/>`,
  pagenumber: `<rect x="6" y="3" width="12" height="18" rx="1.5"/><text x="12" y="16" font-size="7" fill="#fff" stroke="none" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700">12</text>`,
  unlock: `<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/>`,
  protect: `<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>`,
  repair: `<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2z"/>`,
  pdfjpg: `<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.4" fill="#fff" stroke="none"/><path d="M5 17l5-5 3 3 3-4 4 6"/>`,
  imagepdf: `<path d="M4 8h3l1.5-2h7L17 8h3v10H4z"/><circle cx="12" cy="13" r="3"/>`,
  officepdf: `<rect x="6" y="3" width="12" height="18" rx="1.5"/><path d="M9 8h6M9 12h6M9 16h4"/>`,
  htmlpdf: `<circle cx="12" cy="12" r="8"/><path d="M4 12h16"/><path d="M12 4c2.5 3 2.5 13 0 16M12 4c-2.5 3-2.5 13 0 16"/>`,
  pdfa: `<rect x="4" y="4" width="16" height="5" rx="1"/><rect x="5" y="9" width="14" height="11" rx="1"/><path d="M10 13.5h4"/>`,
  validatepdfa: `<path d="M12 3l2.3 1.2 2.6-.1.9 2.5 2.1 1.5-.8 2.5.8 2.5-2.1 1.5-.9 2.5-2.6-.1L12 21l-2.3-1.2-2.6.1-.9-2.5-2.1-1.5.8-2.5-.8-2.5 2.1-1.5.9-2.5 2.6.1z"/><path d="M9 12l2 2 4-4"/>`,
  pdfocr: `<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-5-5"/>`,
  extract: `<rect x="6" y="4" width="12" height="17" rx="1.5"/><rect x="9" y="2.3" width="6" height="3" rx="1"/><path d="M9 11h6M9 15h6"/>`,
  pdfmarkdown: `<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M8 15V9l2 3 2-3v6M15 9v6"/>`,
  translate: `<path d="M5 5h9v6H9l-3 3v-3H5z"/><path d="M13 12h6v6h-3l-2 2v-2h-1z"/>`,
  summarize: `<rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M9 9h6M9 12h6M9 15h3"/>`,
  formsdetect: `<rect x="5" y="4" width="14" height="16" rx="1.5"/><rect x="8" y="8" width="2" height="2" fill="#fff" stroke="none"/><path d="M12 9h4"/><rect x="8" y="13" width="2" height="2" fill="#fff" stroke="none"/><path d="M12 14h4"/>`,
  editpdf: `<path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"/><path d="M14 7l3 3"/>`,
  sign: `<path d="M4 18c2-4 4-4 5-1s3 3 4-1 3-4 5 0"/><path d="M5 21h14"/>`,
};

const KEYS = Object.keys(RAW_ICONS);

export const TOOL_ICONS = KEYS.reduce((acc, key, i) => {
  const bg = PALETTE[i % PALETTE.length];
  acc[key] = wrap(bg, RAW_ICONS[key]);
  return acc;
}, {});

export function getToolIcon(key) {
  return TOOL_ICONS[key] || wrap(PALETTE[0], `<rect x="6" y="3" width="12" height="18" rx="1.5"/>`);
}
