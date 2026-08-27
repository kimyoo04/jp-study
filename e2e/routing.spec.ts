import { expect, test } from '@playwright/test'

// URL 라우팅 계약:
//  - 주소 있는 화면은 딥링크로 열린다(GitHub Pages 미스 → 404.html 부팅 포함).
//  - 일시적 화면(레슨 등)은 부모 경로를 쌓아 뒤로가기로 부모로 빠진다.
//  - 화면마다 title·canonical 이 갱신된다.

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.clear())
})

test('deck tabs get their own URL without piling up history', async ({ page }) => {
  await page.goto('./')
  await expect(page).toHaveURL(/\/jp-study\/$/)

  await page.getByRole('tab', { name: '한자' }).click()
  await expect(page).toHaveURL(/\/jp-study\/deck\/kanji$/)

  await page.getByRole('tab', { name: '문법' }).click()
  await expect(page).toHaveURL(/\/jp-study\/deck\/grammar$/)

  // 탭 전환은 replaceState — 뒤로가기가 탭 사이를 되짚지 않는다.
  await page.goBack()
  await expect(page).not.toHaveURL(/\/deck\/kanji$/)
})

test('deep link opens the deck it names', async ({ page }) => {
  await page.goto('./deck/keigo')
  await expect(page.getByRole('tab', { name: '경어', selected: true })).toBeVisible()
  await expect(page).toHaveTitle(/경어/)
})

test('unknown paths boot the app on home and normalise the URL', async ({ page }) => {
  await page.goto('./no/such/page')
  await expect(page.getByRole('heading', { name: 'にほんご Pocket' })).toBeVisible()
  await expect(page).toHaveURL(/\/jp-study\/$/)
})

test('curriculum week is addressable and canonical points at the static guide', async ({ page }) => {
  await page.goto('./learn/week-3')
  await expect(page).toHaveTitle(/3주차/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://kimyoo04.github.io/jp-study/guide/week-3/',
  )
})

test('curriculum index and JLPT home are addressable', async ({ page }) => {
  await page.goto('./learn')
  await expect(page).toHaveTitle(/12주/)

  await page.goto('./jlpt')
  await expect(page).toHaveTitle(/JLPT/)
})

test('back button exits a lesson to the deck it started from', async ({ page }) => {
  await page.goto('./deck/words')
  await page.getByRole('button', { name: '시작하기' }).click()

  // 레슨은 부모(덱) 경로를 쌓기만 한다 — 주소는 그대로.
  await expect(page).toHaveURL(/\/jp-study\/deck\/words$/)

  await page.goBack()
  await expect(page.getByRole('tab', { name: '단어', selected: true })).toBeVisible()
  await expect(page).toHaveURL(/\/jp-study\/deck\/words$/)
})

test('search screen is addressable and exits back to home', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button', { name: '검색' }).click()
  await expect(page).toHaveURL(/\/jp-study\/search$/)

  await page.goBack()
  await expect(page).toHaveURL(/\/jp-study\/$/)
  await expect(page.getByRole('heading', { name: 'にほんご Pocket' })).toBeVisible()
})

test('every screen sets a description and canonical', async ({ page }) => {
  for (const path of ['./', './deck/kanji', './learn', './jlpt', './search']) {
    await page.goto(path)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /.{50,}/,
    )
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /^https:\/\/kimyoo04\.github\.io\/jp-study\//,
    )
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-image/)
  }
})
