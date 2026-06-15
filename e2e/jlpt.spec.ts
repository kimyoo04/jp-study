import { expect, test } from '@playwright/test'

// Happy path: Home -> JLPT -> start N5 -> answer all 28 items -> report.
test('run a full N5 diagnostic and see the report', async ({ page }) => {
  await page.addInitScript(() => localStorage.clear())
  await page.goto('./')

  await page.getByRole('button', { name: 'JLPT 모의고사' }).click()
  await expect(page.getByText('레벨을 고르세요')).toBeVisible()

  // N4/N3/N2 have no content yet -> shown as "준비 중".
  await expect(page.getByText('준비 중').first()).toBeVisible()

  await page.getByRole('button', { name: '미니 모의고사 시작' }).click()

  // 28 scored items: pick the first choice each, advance, submit on the last.
  await expect(page.getByText('1/28')).toBeVisible()
  for (let i = 0; i < 28; i++) {
    await page.locator('.opt').first().click()
    const next = page.getByRole('button', { name: '다음' })
    if (await next.isVisible()) {
      await next.click()
    } else {
      await page.getByRole('button', { name: '제출' }).click()
    }
  }

  // Report screen.
  await expect(page.getByText(/진단 결과/)).toBeVisible()
  await expect(page.locator('.score')).toContainText('/ 28')
})

test('exam progress resumes after reload', async ({ page }) => {
  // No addInitScript(clear) here: it runs on every load, including reload, which
  // would wipe the saved progress this test is checking. Fresh context is empty.
  await page.goto('./')
  await page.getByRole('button', { name: 'JLPT 모의고사' }).click()
  await page.getByRole('button', { name: '미니 모의고사 시작' }).click()

  // Answer a couple, advance, then reload mid-exam.
  await page.locator('.opt').first().click()
  await page.getByRole('button', { name: '다음' }).click()
  await expect(page.getByText('2/28')).toBeVisible()

  await page.reload()
  await page.getByRole('button', { name: 'JLPT 모의고사' }).click()
  // Home offers to resume where we left off.
  await expect(page.getByRole('button', { name: /이어서 풀기/ })).toBeVisible()
})
