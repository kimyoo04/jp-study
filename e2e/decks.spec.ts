import { expect, test } from '@playwright/test'

// 덱 데이터는 지연 로드된다(src/data/decks.ts): 엔트리 번들에는 가나 두 덱만
// 있고 나머지 9개는 덱별 청크다. 계약:
//  - 히라가나(엔트리 포함)는 첫 페인트에 바로 학습 가능하다.
//  - 지연 덱은 탭·딥링크 어느 쪽으로 와도 로드된다.
//  - 데이터가 오기 전에도 이름·문항 수는 메타로 보인다(빈 화면이 아니다).
//  - 청크를 못 받으면 영원히 기다리지 않고 복구 수단을 준다.

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.clear())
})

test('hiragana is playable even if every deck chunk is unavailable', async ({ page }) => {
  // 프리페치는 첫 페인트 뒤 유휴 시간에 나머지 덱을 받는다 — 그래서 "청크를
  // 아예 안 받는다"로는 검증할 수 없다. 검증할 성질은 "히라가나는 어떤 덱
  // 청크에도 의존하지 않는다" 다 → 전부 막고 학습이 되는지 본다.
  await page.route(
    /\/assets\/(words|kanji|grammar|phrases|cloze|keigo|counters|mimetic|loanwords)-[^/]*\.js$/,
    (route) => route.abort(),
  )
  await page.goto('./')

  const start = page.getByRole('button', { name: '시작하기' })
  await expect(start).toBeEnabled()
  await expect(page.locator('.cat-select select')).toBeEnabled()
  await expect(page.locator('.progress-label')).toContainText('104')

  // 실제로 레슨이 시작된다(문항이 엔트리에 있다).
  await start.click()
  await expect(page.getByText('새 글자')).toBeVisible()
})

test('shows the deck name and item count before its data arrives', async ({ page }) => {
  // 청크를 붙잡아 두고 로딩 상태를 관찰한다.
  let release = () => {}
  const held = new Promise<void>((res) => (release = res))
  await page.route('**/assets/kanji-*.js', async (route) => {
    await held
    await route.continue()
  })

  await page.goto('./')
  await page.getByRole('tab', { name: '한자' }).click()

  // 빈 화면이 아니다: 이름·문항 수·제목이 메타로 이미 채워진다.
  await expect(page.locator('.cat-select select')).toBeDisabled()
  await expect(page.locator('.cat-select select option').first()).toHaveText('전체 (1080)')
  await expect(page.locator('.progress-label')).toContainText('1080')
  await expect(page).toHaveTitle(/한자 1080개 연습/)
  await expect(page.getByRole('button', { name: '불러오는 중…' })).toBeDisabled()

  release()
  await expect(page.getByRole('button', { name: '시작하기' })).toBeEnabled()
  // 카테고리는 데이터가 와야 채워진다.
  expect(await page.locator('.cat-select select option').count()).toBeGreaterThan(1)
})

test('a deep link into a lazy deck loads it', async ({ page }) => {
  await page.goto('./deck/grammar')
  await expect(page.getByRole('tab', { name: '문법', selected: true })).toBeVisible()
  await expect(page.getByRole('button', { name: /시작하기|오늘의 레슨/ })).toBeEnabled()
  await expect(page).toHaveTitle(/문법 960개 연습/)
})

test('offers a way out when a deck chunk fails to load', async ({ page }) => {
  // 브라우저는 실패한 module script 요청을 URL 단위로 기억한다 → 같은 세션에서
  // 재시도는 성공하지 않는다. 그래서 "불러오는 중"에 갇히지 않고 새로고침을 준다.
  let fail = true
  await page.route('**/assets/cloze-*.js', (route) =>
    fail ? route.abort() : route.continue(),
  )

  await page.goto('./')
  await page.getByRole('tab', { name: '빈칸' }).click()
  const retry = page.getByRole('button', { name: /빈칸 덱을 못 받았어요/ })
  await expect(retry).toBeEnabled()

  fail = false
  await retry.click()
  await expect(page.getByRole('tab', { name: '빈칸', selected: true })).toBeVisible()
  await expect(page.getByRole('button', { name: /시작하기|오늘의 레슨/ })).toBeEnabled()
})

test('search covers every deck, loading them on demand', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button', { name: '검색' }).click()
  await page.getByLabel('검색').fill('커피')
  // 인덱스는 전 덱을 받아야 만들어진다 — 외래어 덱 항목이 나오면 성공.
  await expect(page.locator('.search-row').first()).toContainText('コーヒー')
})
