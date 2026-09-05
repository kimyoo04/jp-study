import { expect, test } from '@playwright/test'

// Guards the home top-bar markup refactor: search + sfx buttons moved out of
// .home-head into the .home-topbar row. If either button is dropped during a
// future edit, this fails. Safe-area top clearance itself is device-specific
// (env(safe-area-inset-top) = 0 in headless) and is verified by manual QA.
test('home renders search and sfx toggle in the top bar', async ({ page }) => {
  await page.addInitScript(() => localStorage.clear())
  await page.goto('./')

  await expect(page.getByRole('heading', { name: 'にほんご Pocket', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: '검색' })).toBeVisible()
  // sfx toggle label flips with state (끄기/켜기) — match either.
  await expect(page.getByRole('button', { name: /효과음/ })).toBeVisible()
})

test('home offers a GitHub issue link for service feedback', async ({ page }) => {
  await page.goto('./')

  const feedback = page.getByRole('link', { name: /서비스 개선 건의하기/ })
  await expect(feedback).toBeVisible()
  await expect(feedback).toHaveAttribute(
    'href',
    'https://github.com/kimyoo04/jp-study/issues/new?template=feedback.yml',
  )
  await expect(feedback).toHaveAttribute('target', '_blank')
})
