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

test('listen-mode toggle is present on Home', async ({ page }) => {
  // The toggle gates on a Japanese TTS voice. Headless Chromium ships none, so
  // here it renders disabled — assert it exists either way. The qtype logic it
  // drives is covered by the pickQType unit tests.
  await page.goto('./')
  await expect(page.getByRole('button', { name: /듣고 풀기/ })).toBeVisible()
})

test('search finds items across decks by romaji, meaning, and glyph', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button', { name: '검색' }).click()

  const input = page.getByRole('searchbox', { name: '검색' })
  await expect(input).toBeVisible()

  // Romaji match.
  await input.fill('konnichiwa')
  await expect(page.locator('.search-row', { hasText: 'こんにちは' }).first()).toBeVisible()

  // Korean meaning match (a different deck).
  await input.fill('커피')
  await expect(page.locator('.search-row', { hasText: 'コーヒー' }).first()).toBeVisible()

  // Kanji glyph match.
  await input.fill('一')
  await expect(page.locator('.search-row', { hasText: '一' }).first()).toBeVisible()

  // No-results state.
  await input.fill('zzzzz')
  await expect(page.getByText(/결과가 없어요/)).toBeVisible()

  // Close returns Home.
  await page.getByRole('button', { name: '닫기' }).click()
  await expect(page.getByRole('heading', { name: 'にほんご Pocket' })).toBeVisible()
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

test('category selection scopes the deck to one theme', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('tab', { name: '한자' }).click()
  // Whole deck first.
  await expect(page.locator('.progress-label')).toContainText('/ 540')
  // Pick the "숫자 1" category (8 kanji).
  await page.locator('.cat-select select').selectOption('숫자 1')
  await expect(page.locator('.progress-label')).toContainText('/ 8')
  // Lessons are now drawn from that category only (starts at 一).
  await page.getByRole('button', { name: '시작하기' }).click()
  await expect(page.locator('.glyph.big')).toHaveText('一')
})

test('kanji deck teaches a kanji with reading and meaning', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('tab', { name: '한자' }).click()
  await page.getByRole('button', { name: '시작하기' }).click()
  await expect(page.getByText('새 한자')).toBeVisible()
  await expect(page.locator('.glyph.big')).toHaveText('一')
})

test('phrases deck teaches everyday sentences with a situation', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('tab', { name: '회화' }).click()
  await page.getByRole('button', { name: '시작하기' }).click()
  await expect(page.getByText('예문')).toBeVisible()
  await expect(page.locator('.pattern')).toContainText('인사')
  await expect(page.locator('.glyph.sentence')).toHaveText('はじめまして')
  // 회화 덱은 일본어 바로 아래에 한국어 발음 표기를 보여준다.
  await expect(page.locator('.ko-reading')).toHaveText('하지메마시테')
})

test('home shows "review weak" after missing items, scoped to seen-not-learned', async ({
  page,
}) => {
  await page.goto('./')
  await page.getByRole('button', { name: '시작하기' }).click()
  for (let i = 0; i < 6; i++) await page.getByRole('button', { name: '다음' }).click()
  await page.getByRole('button', { name: '한 판 더' }).click()
  // Lesson 2 = the 6 now-due reviews (quizzes). Miss the first, get the rest right.
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

test('quiz feedback shows check/cross marks and exit asks to confirm', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button', { name: '시작하기' }).click()
  for (let i = 0; i < 6; i++) await page.getByRole('button', { name: '다음' }).click()
  await page.getByRole('button', { name: '한 판 더' }).click()

  // Pick the correct answer -> it gets a ✓ mark (color + icon, not color alone).
  await page.locator('button[data-correct="true"]').first().click()
  await expect(page.locator('.opt.correct .opt-mark')).toHaveText('✓')

  // Exiting mid-lesson now asks for confirmation. The ✕ has aria-label 나가기.
  await page.getByRole('button', { name: '나가기' }).click()
  await expect(page.getByText('나가면 이번 레슨 진도가 사라져요.')).toBeVisible()
  await page.getByRole('button', { name: '계속하기' }).click()
  await expect(page.getByText('나가면 이번 레슨 진도가 사라져요.')).toBeHidden()
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
