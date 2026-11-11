import { chromium } from 'playwright-core'
import fs from 'node:fs'
import path from 'node:path'

const font = (file) =>
  `data:font/woff2;base64,${fs.readFileSync(file).toString('base64')}`

const silkscreen = font(
  'node_modules/@fontsource/silkscreen/files/silkscreen-latin-700-normal.woff2'
)
const mono = font(
  'node_modules/@fontsource/share-tech-mono/files/share-tech-mono-latin-400-normal.woff2'
)

const rings = [720, 584, 460, 348, 248]

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @font-face { font-family: 'Silkscreen'; font-weight: 700; src: url('${silkscreen}') format('woff2'); }
  @font-face { font-family: 'Share Tech Mono'; font-weight: 400; src: url('${mono}') format('woff2'); }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #080b0f; color: #e8e5dc; position: relative;
    font-family: 'Share Tech Mono', monospace;
  }
  .glow {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 50% 46%, rgba(134,169,184,.14), transparent 58%),
      radial-gradient(ellipse at 12% 6%, rgba(68,96,112,.18), transparent 50%);
  }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(232,229,220,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(232,229,220,.04) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(ellipse at 50% 45%, #000, transparent 80%);
  }
  .rings { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); opacity: .7; }
  .frame {
    position: absolute; inset: 32px; border: 1px solid rgba(232,229,220,.12);
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 40px 50px;
  }
  .top { display: flex; justify-content: space-between; align-items: flex-start; }
  .mark { display: flex; align-items: center; gap: 14px; }
  .mark-box {
    width: 38px; height: 38px; border: 1px solid rgba(134,169,184,.55);
    display: grid; place-items: center;
  }
  .mark-box span { width: 9px; height: 9px; background: #86a9b8; box-shadow: 0 0 12px #86a9b8; }
  .mark-word { font-family: 'Silkscreen'; font-weight: 700; font-size: 25px; letter-spacing: .16em; color: #e8e5dc; }
  .meta { text-align: right; font-size: 11px; line-height: 1.9; letter-spacing: .22em; color: rgba(232,229,220,.45); text-transform: uppercase; }
  .mid { position: relative; text-align: center; }
  .kicker { font-size: 11px; letter-spacing: .34em; color: #86a9b8; text-transform: uppercase; margin-bottom: 18px; }
  h1 {
    font-family: 'Silkscreen'; font-weight: 700; font-size: 172px; line-height: .8;
    letter-spacing: .1em; text-indent: .1em; color: #e8e5dc; text-transform: uppercase;
    text-shadow: 0 0 70px rgba(134,169,184,.22);
  }
  .line2 {
    margin-top: 26px; font-size: 18px; letter-spacing: .28em; color: rgba(232,229,220,.72);
    text-transform: uppercase;
  }
  .line2 strong { color: #86a9b8; font-weight: 400; }
  .bottom { display: flex; justify-content: space-between; align-items: flex-end; }
  .bottom p { font-size: 11px; letter-spacing: .2em; color: rgba(232,229,220,.5); text-transform: uppercase; line-height: 1.9; }
  .bottom strong { color: #e8e5dc; font-weight: 500; }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="grid"></div>
  <svg class="rings" width="760" height="760" viewBox="0 0 760 760" fill="none">
    ${rings
      .map(
        (size, index) =>
          `<rect x="${380 - size / 2}" y="${380 - size / 2}" width="${size}" height="${size}" stroke="rgba(134,169,184,${
            0.05 + index * 0.028
          })" stroke-width="${index < 2 ? 1.4 : 1}" />`
      )
      .join('')}
    <path d="M0 380H380M380 0V760" stroke="rgba(232,229,220,.06)" />
  </svg>
  <div class="frame">
    <div class="top">
      <div class="mark">
        <div class="mark-box"><span></span></div>
        <div class="mark-word">FEIZEN</div>
      </div>
      <div class="meta">Portfolio / MMXXVI<br />Security &amp; Systems</div>
    </div>
    <div class="mid">
      <p class="kicker">Cybersecurity Student</p>
      <h1>FEIZEN</h1>
      <p class="line2">BUILD. <strong>UNDERSTAND.</strong> SECURE.</p>
    </div>
    <div class="bottom">
      <p><strong>Fernanda Brian Kholish</strong><br />Application Developer</p>
      <p>Security / Systems / Backend</p>
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
