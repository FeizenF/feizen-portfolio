import { chromium } from 'playwright-core'
import fs from 'node:fs'
import path from 'node:path'

const OUT = path.resolve('tmp/screens')
fs.mkdirSync(OUT, { recursive: true })

const executablePath =
  process.env.EDGE_PATH ||
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const base = process.env.BASE_URL || 'http://127.0.0.1:4173/'

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
]

const failures = []
const notes = []

function check(condition, message) {
  if (!condition) failures.push(message)
}

const browser = await chromium.launch({ executablePath, headless: true })

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()
  const errors = []

  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto(base, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1800)

  const metrics = await page.evaluate(() => {
    const sections = ['hero', 'about', 'projects', 'expertise', 'contact']
    const found = sections.map((id) => Boolean(document.getElementById(id)))
    const hero = document.querySelector('.crt-stage')?.getBoundingClientRect()
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      sections: found,
      hero: hero
        ? { top: hero.top, bottom: hero.bottom, left: hero.left, right: hero.right }
        : null,
      reduced: getComputedStyle(document.documentElement).scrollBehavior,
      form: Boolean(document.querySelector('.contact-form')),
      navLinks: document.querySelectorAll('.nav-link').length,
    }
  })

  check(
    metrics.scrollWidth <= metrics.innerWidth + 1,
    `${viewport.name}: horizontal overflow ${metrics.scrollWidth} > ${metrics.innerWidth}`
  )
  check(metrics.sections.every(Boolean), `${viewport.name}: missing a section`)
  check(metrics.form, `${viewport.name}: contact form missing`)
  check(
    metrics.hero && metrics.hero.left >= -2 && metrics.hero.right <= viewport.width + 2,
    `${viewport.name}: CRT stage outside viewport (${JSON.stringify(metrics.hero)})`
  )

  if (viewport.width > 900) {
    check(metrics.navLinks === 4, `${viewport.name}: expected 4 desktop nav links`)
  }

  check(
    errors.length === 0,
    `${viewport.name}: console errors -> ${errors.join(' | ')}`
  )

  await page.screenshot({
    path: path.join(OUT, `${viewport.name}-hero.png`),
  })
  await page.screenshot({
    path: path.join(OUT, `${viewport.name}-full.png`),
    fullPage: true,
    animations: 'disabled',
  })

  if (viewport.name === 'desktop' || viewport.name === 'mobile') {
    // Navigation active state
    await page.click('a.nav-link[href="#projects"]').catch(() => {})
    await page.waitForTimeout(900)
    const active = await page.evaluate(
      () => document.querySelector('.nav-link.is-active')?.getAttribute('href')
    )
    if (viewport.width > 900) {
      check(active === '#projects', `nav active state failed (${active})`)
    }

    // Back to hero
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(600)
  }

  if (viewport.name === 'mobile') {
    await page.click('.nav-toggle')
    await page.waitForTimeout(500)
    const open = await page.getAttribute('#mobile-menu', 'data-open')
    check(open === 'true', 'mobile menu did not open')
    await page.screenshot({ path: path.join(OUT, 'mobile-menu.png') })
    await page.click('.nav-toggle')
    await page.waitForTimeout(400)
    const closed = await page.getAttribute('#mobile-menu', 'data-open')
    check(closed === 'false', 'mobile menu did not close')

    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
    await page.click('.contact-form button[type="submit"]')
    await page.waitForTimeout(400)
    const errorCount = await page.locator('.form-error').count()
    check(errorCount >= 4, `form validation did not report errors (${errorCount})`)
    await page.screenshot({ path: path.join(OUT, 'mobile-form-errors.png') })

    await page.fill('#field-name', 'Test User')
    await page.fill('#field-email', 'test@example.com')
    await page.fill('#field-subject', 'Hello')
    await page.fill('#field-message', 'This is a validation smoke test message.')
    await page.click('.contact-form button[type="submit"]')
    await page.waitForTimeout(400)
    const tone = await page.getAttribute('.form-status', 'data-tone')
    check(Boolean(tone), 'form status not shown after valid submit')
    await page.screenshot({ path: path.join(OUT, 'mobile-form-status.png') })
  }

  notes.push(
    `${viewport.name}: ${metrics.scrollWidth}px wide, nav ${metrics.navLinks}, sections ${metrics.sections.filter(Boolean).length}/5`
  )

  await context.close()
}

// Reduced motion pass
const reduced = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  reducedMotion: 'reduce',
})
const reducedPage = await reduced.newPage()
await reducedPage.goto(base, { waitUntil: 'networkidle' })
await reducedPage.waitForTimeout(700)
const bootVisible = await reducedPage.evaluate(
  () => Boolean(document.querySelector('.boot'))
)
check(!bootVisible, 'reduced motion: boot screen still rendered')
await reducedPage.screenshot({ path: path.join(OUT, 'reduced-hero.png') })
await reduced.close()

await browser.close()

console.log(notes.join('\n'))
if (failures.length) {
  console.error('\nFAILURES')
  failures.forEach((failure) => console.error(` - ${failure}`))
  process.exit(1)
}
console.log('\nAll checks passed.')
