import { chromium } from 'playwright-core'
import fs from 'node:fs'
import path from 'node:path'

const font = (file) =>
  `data:font/woff2;base64,${fs.readFileSync(file).toString('base64')}`

const rajdhani = font(
  'node_modules/@fontsource/rajdhani/files/rajdhani-latin-700-normal.woff2'
)
const shareTech = font(
  'node_modules/@fontsource/share-tech-mono/files/share-tech-mono-latin-400-normal.woff2'
)
const silkscreen = font(
  'node_modules/@fontsource/silkscreen/files/silkscreen-latin-400-normal.woff2'
)

const rings = [760, 600, 460, 340, 240]

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @font-face { font-family: 'Rajdhani'; font-weight: 700; src: url('${rajdhani}') format('woff2'); }
  @font-face { font-family: 'Share Tech Mono'; src: url('${shareTech}') format('woff2'); }
  @font-face { font-family: 'Silkscreen'; src: url('${silkscreen}') format('woff2'); }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #080301; color: #ffdfd1; position: relative;
    font-family: 'Share Tech Mono', monospace;
  }
  .glow {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 18% 12%, rgba(255,85,0,.20), transparent 52%),
      radial-gradient(ellipse at 82% 88%, rgba(194,65,0,.18), transparent 56%);
  }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,223,209,.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,223,209,.05) 1px, transparent 1px);
    background-size: 84px 84px;
    mask-image: radial-gradient(ellipse at 35% 45%, #000, transparent 78%);
  }
  .rings { position: absolute; right: -80px; top: 50%; transform: translateY(-50%); opacity: .55; }
  .frame {
    position: absolute; inset: 34px; border: 1px solid rgba(255,223,209,.14);
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 42px 52px;
  }
  .top { display: flex; justify-content: space-between; align-items: flex-start; }
  .mark { display: flex; align-items: center; gap: 14px; }
  .mark-box {
    width: 40px; height: 40px; border: 1px solid rgba(255,85,0,.6);
    display: grid; place-items: center;
  }
  .mark-box span { width: 10px; height: 10px; background: #ff5500; box-shadow: 0 0 12px #ff5500; }
  .mark-word { font-family: 'Rajdhani'; font-weight: 700; font-size: 26px; letter-spacing: .14em; color: #ffdfd1; }
  .meta { text-align: right; font-size: 12px; line-height: 1.9; letter-spacing: .24em; color: rgba(255,223,209,.42); text-transform: uppercase; }
  .mid { position: relative; }
  .kicker { font-size: 13px; letter-spacing: .34em; color: #ff7a3c; text-transform: uppercase; margin-bottom: 16px; }
  h1 {
    font-family: 'Rajdhani'; font-weight: 700; font-size: 148px; line-height: .82;
    letter-spacing: .05em; color: #ffdfd1; text-transform: uppercase;
    text-shadow: 0 0 60px rgba(255,85,0,.22);
  }
  .line2 {
    margin-top: 22px; font-size: 40px; letter-spacing: .12em; color: #ff5500;
    text-transform: uppercase; text-shadow: 0 0 26px rgba(255,85,0,.5);
  }
  .cursor { color: #ffdfd1; }
  .bottom { display: flex; justify-content: space-between; align-items: flex-end; }
  .bottom p { font-size: 12px; letter-spacing: .22em; color: rgba(255,223,209,.5); text-transform: uppercase; line-height: 1.8; }
  .bottom strong { color: #ff7a3c; font-weight: 400; }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="grid"></div>
  <svg class="rings" width="720" height="720" viewBox="0 0 720 720" fill="none">
    ${rings
      .map(
        (size, index) =>
          `<rect x="${360 - size / 2}" y="${360 - size / 2}" width="${size}" height="${size}" stroke="rgba(255,85,0,${
            0.05 + index * 0.03
          })" stroke-width="${index < 2 ? 1.6 : 1}" />`
      )
      .join('')}
    <path d="M0 360H360M360 0V720" stroke="rgba(255,85,0,.10)" />
  </svg>
  <div class="frame">
    <div class="top">
      <div class="mark">
        <div class="mark-box"><span></span></div>
        <div class="mark-word">FEIZEN</div>
      </div>
      <div class="meta">Portfolio / MMXXVI<br />Security &amp; Development</div>
    </div>
    <div class="mid">
      <p class="kicker">Cybersecurity Student</p>
      <h1>FEIZEN</h1>
      <p class="line2">CYBERSECURITY PORTFOLIO<span class="cursor">_</span></p>
    </div>
    <div class="bottom">
      <p><strong>Fernanda Brian Kholish</strong><br />Application Developer</p>
      <p>Security / Development / Systems</p>
    </div>
  </div>
</body>
</html>`

const browser = await chromium.launch({
  executablePath:
    process.env.EDGE_PATH ||
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
})
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
})
await page.setContent(html, { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(300)
await page.screenshot({ path: path.join('public/assets/og-cover.png') })
await browser.close()
console.log('Wrote public/assets/og-cover.png')
