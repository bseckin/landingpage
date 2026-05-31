// Generates public/og-image.png — the 1200×630 social link-preview card
// (Open Graph / Twitter). Renders an HTML template with the real brand fonts
// (Sora / Manrope, read from node_modules/@fontsource and embedded as base64,
// so no network is needed) to a pixel-exact PNG via headless Chrome.
//
// Regenerate after a copy/design change:  node scripts/generate-og.mjs
//
// No new npm dependency: uses Node built-ins + the already-installed Chrome.

import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'public', 'og-image.png');

const CHROME =
    process.env.CHROME_PATH ||
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const fontBase64 = (pkg, file) =>
    readFileSync(join(root, 'node_modules', '@fontsource', pkg, 'files', file)).toString('base64');

const sora800 = fontBase64('sora', 'sora-latin-800-normal.woff2');
const sora700 = fontBase64('sora', 'sora-latin-700-normal.woff2');
const manrope600 = fontBase64('manrope', 'manrope-latin-600-normal.woff2');
const manrope500 = fontBase64('manrope', 'manrope-latin-500-normal.woff2');

const face = (family, weight, b64) =>
    `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};` +
    `src:url(data:font/woff2;base64,${b64}) format('woff2');}`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
${face('Sora', 800, sora800)}
${face('Sora', 700, sora700)}
${face('Manrope', 600, manrope600)}
${face('Manrope', 500, manrope500)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1200px;height:630px}
.card{width:1200px;height:630px;position:relative;overflow:hidden;
  background:
    radial-gradient(1100px 560px at 88% -12%, rgba(79,70,229,.24), transparent 60%),
    radial-gradient(820px 460px at 4% 118%, rgba(45,212,191,.15), transparent 55%),
    #0f172a;
  font-family:'Manrope',system-ui,sans-serif;color:#f8fafc;
  padding:74px 80px;display:flex;flex-direction:column;justify-content:space-between}
.card::after{content:'';position:absolute;left:0;top:0;bottom:0;width:6px;
  background:linear-gradient(180deg,#2dd4bf,#4f46e5)}
.top{display:flex;align-items:center;gap:18px}
.mark{width:60px;height:60px;border-radius:14px;background:#0b1220;
  border:1px solid rgba(148,163,184,.18);display:flex;align-items:center;justify-content:center;
  font-family:'Sora';font-weight:800;font-size:30px;letter-spacing:-1px}
.mark .b{color:#f8fafc}.mark .s{color:#2dd4bf}
.brandname{font-family:'Sora';font-weight:700;font-size:24px;letter-spacing:-.5px}
.kicker{font-family:'Manrope';font-weight:600;font-size:18px;letter-spacing:3px;
  text-transform:uppercase;color:#5eead4;margin-bottom:20px}
.headline{font-family:'Sora';font-weight:800;font-size:78px;line-height:1.02;
  letter-spacing:-2px;color:#f8fafc}
.headline .accent{color:#2dd4bf}
.sub{font-family:'Manrope';font-weight:500;font-size:27px;line-height:1.45;
  color:#cbd5e1;max-width:900px;margin-top:24px}
.foot{display:flex;align-items:center;gap:13px;font-family:'Manrope';font-weight:600;
  font-size:21px;color:#94a3b8}
.foot .dot{width:7px;height:7px;border-radius:50%;background:#2dd4bf}
.foot .domain{color:#e2e8f0}
</style></head><body>
<div class="card">
  <div class="top">
    <div class="mark"><span class="b">B</span><span class="s">S</span></div>
    <div class="brandname">Berkay Seckin</div>
  </div>
  <div>
    <div class="kicker">Prozessautomatisierung · Wien</div>
    <div class="headline">Keine Anfrage<br>geht verloren.</div>
    <div class="sub">Eingehende Anfragen automatisch erfasst — in Sekunden bei der richtigen Person.</div>
  </div>
  <div class="foot"><span class="dot"></span><span class="domain">berkayseckin.at</span> · Kostenlose Prozess-Diagnose</div>
</div>
</body></html>`;

const tmpHtml = join(tmpdir(), `og-${Date.now()}.html`);
writeFileSync(tmpHtml, html);

if (existsSync(OUT)) unlinkSync(OUT);

try {
    execFileSync(
        CHROME,
        [
            '--headless=new',
            '--disable-gpu',
            '--hide-scrollbars',
            '--force-device-scale-factor=1',
            '--default-background-color=0f172aff',
            '--window-size=1200,630',
            `--screenshot=${OUT}`,
            `file://${tmpHtml}`,
        ],
        { stdio: 'ignore' },
    );
} finally {
    if (existsSync(tmpHtml)) unlinkSync(tmpHtml);
}

if (!existsSync(OUT)) {
    console.error('FAILED: Chrome did not produce', OUT);
    process.exit(1);
}
console.log('Wrote', OUT);
