import { expect, test } from '@playwright/test'

// Core loop: Home -> first (cold-start) lesson is all intro cards ->
// finish -> Complete -> Home shows progress.
test('complete a cold-start lesson and persist progress', async ({ page }) => {
  await page.addInitScript(() => localStorage.clear())
  await page.goto('./')

  await expect(page.getByRole('heading', { name: 'にほんご Pocket' })).toBeVisible()
  await page.getByRole('button', { name: '시작하기' }).click()

  // 6 intro cards -> click 다음 six times.
  for (let i = 0; i < 6; i++) {
    await expect(page.getByText('새 글자')).toBeVisible()
    await page.getByRole('button', { name: '다음' }).click()
  }

  await expect(page.getByRole('heading', { name: '레슨 완료!' })).toBeVisible()
  await page.getByRole('button', { name: '홈으로' }).click()

  await expect(page.getByText('레슨 1회 완료')).toBeVisible()
})

test('sound toggle flips state and persists across reload', async ({ page }) => {
  // Fresh Playwright context already starts with empty storage; no clear needed
  // (clearing on every load would also wipe state on reload and break this test).
  await page.goto('./')

  const toggle = page.getByRole('button', { name: '효과음 끄기' }) // on by default -> label says "끄기"
  await expect(toggle).toBeVisible()
  await toggle.click()

  // Now off -> label flips to "켜기".
  const toggleOff = page.getByRole('button', { name: '효과음 켜기' })
  await expect(toggleOff).toBeVisible()

  await page.reload()
  await expect(page.getByRole('button', { name: '효과음 켜기' })).toBeVisible()
})

test('katakana deck teaches katakana glyphs', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('tab', { name: 'カタカナ' }).click()
  await expect(page.getByRole('tab', { name: 'カタカナ' })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await page.getByRole('button', { name: '시작하기' }).click()

  // First katakana intro card should show ア (not あ).
  await expect(page.getByText('새 글자')).toBeVisible()
  await expect(page.locator('.glyph.big')).toHaveText('ア')
})

test('words deck teaches words with meanings', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('tab', { name: '단어' }).click()
  await page.getByRole('button', { name: '시작하기' }).click()
  await expect(page.getByText('새 단어')).toBeVisible()
  await expect(page.locator('.glyph.word')).toHaveText('こんにちは')
})

test('loanwords deck teaches katakana loanwords', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('tab', { name: '외래어' }).click()
  await page.getByRole('button', { name: '시작하기' }).click()
  await expect(page.getByText('새 단어')).toBeVisible()
  await expect(page.locator('.glyph.word')).toHaveText('コーヒー')
})

test('grammar deck teaches example sentences with a pattern', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('tab', { name: '문법' }).click()
  await page.getByRole('button', { name: '시작하기' }).click()
  await expect(page.getByText('예문')).toBeVisible()
  await expect(page.locator('.pattern')).toContainText('～は～です')
  await expect(page.locator('.glyph.sentence')).toHaveText('わたしは がくせいです')
})

test('home shows "review weak" after missing items, scoped to seen-not-learned', async ({
  page,
}) => {
  await page.goto('./')
  await page.getByRole('button', { name: '시작하기' }).click()
  for (let i = 0; i < 6; i++) await page.getByRole('button', { name: '다음' }).click()
  await page.getByRole('button', { name: '한 판 더' }).click()
  // Miss the first, get the rest right.
  await page.locator('.opt:not([data-correct])').first().click()
  await page.getByRole('button', { name: '계속' }).click()
  for (let i = 0; i < 5; i++) {
    await page.locator('button[data-correct="true"]').first().click()
    await page.getByRole('button', { name: '계속' }).click()
  }
  await page.getByRole('button', { name: '홈으로' }).click()
  // The missed glyph is now weak -> Home offers a weak-review button.
  await expect(page.getByRole('button', { name: /약한 것만 복습/ })).toBeVisible()
})

test('complete screen shows review button after a wrong answer', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button', { name: '시작하기' }).click()
  for (let i = 0; i < 6; i++) await page.getByRole('button', { name: '다음' }).click()
  // Start lesson 2 from the Complete screen — the 6 are now due as quizzes.
  await page.getByRole('button', { name: '한 판 더' }).click()
  // Answer the first one WRONG, the rest correct.
  await page.locator('.opt:not([data-correct])').first().click()
  await page.getByRole('button', { name: '계속' }).click()
  for (let i = 0; i < 5; i++) {
    await page.locator('button[data-correct="true"]').first().click()
    await page.getByRole('button', { name: '계속' }).click()
  }
  // Complete: chips + review button for the 1 miss.
  await expect(page.getByText('레슨 완료!')).toBeVisible()
  const review = page.getByRole('button', { name: /틀린 것만 복습/ })
  await expect(review).toBeVisible()
  await review.click()
  // Review lesson contains exactly the missed item.
  await expect(page.locator('.counter')).toHaveText('1/1')
})

test('second lesson quizzes introduced glyphs and grades the pick', async ({ page }) => {
  await page.addInitScript(() => localStorage.clear())
  await page.goto('./')
  await page.getByRole('button', { name: '시작하기' }).click()
  for (let i = 0; i < 6; i++) {
    await page.getByRole('button', { name: '다음' }).click()
  }
  // From Complete, start another lesson — now the 6 are due as quizzes.
  await page.getByRole('button', { name: '한 판 더' }).click()

  await expect(page.getByText('이 글자의 읽기는?').or(page.getByText('소리를 듣고 글자를 고르세요'))).toBeVisible()
  // Pick the correct option (marked for test reliability).
  await page.locator('button[data-correct="true"]').first().click()
  await expect(page.getByRole('button', { name: '계속' })).toBeVisible()
})
