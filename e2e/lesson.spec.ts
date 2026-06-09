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
