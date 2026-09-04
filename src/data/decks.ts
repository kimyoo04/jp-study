// 덱 레지스트리 — "어떤 덱이 있는가"(동기 메타)와 "그 덱 데이터를 어떻게
// 불러오는가"(비동기)를 분리한다.
//
// 왜: 예전에는 kana.ts 가 11개 덱 데이터를 전부 정적 import 해서 DECKS 배열을
// 즉시 만들었다. 그래서 홈에서 ひらがな 104자만 보는 사람도 6,040문항 전체
// (엔트리 996KB / gzip 265KB)를 받아야 했다. 덱 데이터는 화면에 필요할 때만
// 온다.
//
// 메타는 동기로 남긴다 — 탭 이름·문항 수·라우팅·<title>·정적 사이트맵 생성이
// 데이터 없이 이 정보만으로 돌아가야 한다.
import {
  ALL_ROWS,
  HIRAGANA,
  KATAKANA,
  KATAKANA_ROWS,
  type Deck,
  type DeckId,
  type DeckKind,
} from './kana'

export interface DeckMeta {
  id: DeckId
  label: string
  /** 'ja' when `label` is Japanese (ひらがな·カタカナ). 나머지 덱 이름은 한국어다. */
  labelLang?: 'ja'
  kind: DeckKind
  /** 레슨에서 일본어 아래 한국어 발음 표기를 보여줄지 */
  koReading?: boolean
  /**
   * 문항 수. 데이터를 안 받은 상태에서도 탭·제목·설명에 쓰이므로 상수로 둔다.
   * 실제 payload 길이와 어긋나면 decks.test.ts 가 실패한다.
   */
  count: number
}

/** 가나 두 덱은 payload 가 kana.ts(초기 번들)에 있으므로 즉시 만든다. */
const HIRAGANA_DECK: Deck = {
  id: 'hiragana',
  label: 'ひらがな',
  labelLang: 'ja',
  kind: 'kana',
  rows: ALL_ROWS,
  kana: HIRAGANA,
}
const KATAKANA_DECK: Deck = {
  id: 'katakana',
  label: 'カタカナ',
  labelLang: 'ja',
  kind: 'kana',
  rows: KATAKANA_ROWS,
  kana: KATAKANA,
}

/** 화면에 보이는 순서. 첫 덱은 루트 주소(/)를 갖는다(lib/router.ts). */
export const DECK_META: DeckMeta[] = [
  { id: 'hiragana', label: 'ひらがな', labelLang: 'ja', kind: 'kana', count: 104 },
  { id: 'katakana', label: 'カタカナ', labelLang: 'ja', kind: 'kana', count: 104 },
  { id: 'words', label: '단어', kind: 'words', count: 1216 },
  { id: 'loanwords', label: '외래어', kind: 'words', count: 698 },
  { id: 'counters', label: '조수사', kind: 'words', count: 206 },
  { id: 'mimetic', label: '의태어', kind: 'words', count: 110 },
  { id: 'grammar', label: '문법', kind: 'sentence', count: 960 },
  { id: 'phrases', label: '회화', kind: 'sentence', koReading: true, count: 1048 },
  { id: 'keigo', label: '경어', kind: 'sentence', koReading: true, count: 74 },
  { id: 'kanji', label: '한자', kind: 'kanji', count: 1080 },
  { id: 'cloze', label: '빈칸', kind: 'cloze', count: 440 },
]

export const TOTAL_ITEMS = DECK_META.reduce((n, d) => n + d.count, 0)

export function metaOf(id: DeckId): DeckMeta {
  const meta = DECK_META.find((d) => d.id === id)
  if (!meta) throw new Error(`metaOf: 모르는 덱 ${id}`)
  return meta
}

/**
 * 덱별 동적 import. 리터럴 경로를 그대로 써야 Rollup 이 청크를 나눈다 —
 * `import(\`./decks/${id}.ts\`)` 처럼 변수를 넣으면 디렉터리 전체를 한 청크로
 * 묶거나(설정에 따라) 전부 초기 번들에 남긴다.
 */
const LOADERS: Record<Exclude<DeckId, 'hiragana' | 'katakana'>, () => Promise<{ deck: Deck }>> = {
  words: () => import('./decks/words'),
  loanwords: () => import('./decks/loanwords'),
  counters: () => import('./decks/counters'),
  mimetic: () => import('./decks/mimetic'),
  grammar: () => import('./decks/grammar'),
  phrases: () => import('./decks/phrases'),
  keigo: () => import('./decks/keigo'),
  kanji: () => import('./decks/kanji'),
  cloze: () => import('./decks/cloze'),
}

const cache = new Map<DeckId, Deck>([
  ['hiragana', HIRAGANA_DECK],
  ['katakana', KATAKANA_DECK],
])
const inflight = new Map<DeckId, Promise<Deck>>()

/** 이미 받아둔 덱. 있으면 로딩 상태 없이 바로 그릴 수 있다. */
export function loadedDeck(id: DeckId): Deck | undefined {
  return cache.get(id)
}

/**
 * 덱 데이터. 같은 덱을 동시에 여러 번 요청해도 fetch 는 한 번이다.
 *
 * 실패는 캐시하지 않지만, **같은 세션에서 재시도해도 성공하지 않는다** — 브라우저
 * 모듈 맵이 실패한 module script fetch 를 URL 단위로 기억하기 때문에 같은
 * `import()` 는 즉시 같은 거부를 돌려준다. 그래서 호출자는 "다시 시도"를
 * 페이지 새로고침으로 제공해야 한다(components/Home.tsx 의 덱 로드 오류 상태).
 */
export function loadDeck(id: DeckId): Promise<Deck> {
  const hit = cache.get(id)
  if (hit) return Promise.resolve(hit)

  const running = inflight.get(id)
  if (running) return running

  const load = LOADERS[id as keyof typeof LOADERS]
  if (!load) return Promise.reject(new Error(`loadDeck: 모르는 덱 ${id}`))

  const p = load()
    .then((m) => {
      cache.set(id, m.deck)
      inflight.delete(id)
      return m.deck
    })
    .catch((e: unknown) => {
      inflight.delete(id)
      throw e
    })
  inflight.set(id, p)
  return p
}

/** 모든 덱. 검색 인덱스처럼 본질적으로 전 덱을 봐야 하는 곳에서 쓴다. */
export function loadAllDecks(): Promise<Deck[]> {
  return Promise.all(DECK_META.map((m) => loadDeck(m.id)))
}

/**
 * 첫 페인트 뒤 유휴 시간에 나머지 덱을 미리 받아둔다.
 *
 * 초기 로드에서 빼는 것이 목적이었지, 덱 전환을 느리게 만드는 게 목적이 아니다.
 * 실제 사용에서는 사용자가 탭을 누를 때쯤 이미 캐시에 있다. 실패는 무시한다 —
 * 프리페치는 최선 노력이고, 진짜 필요할 때 loadDeck 이 다시 시도한다.
 */
export function prefetchDecks(): void {
  const ids = DECK_META.map((d) => d.id).filter((id) => !cache.has(id))
  const next = () => {
    const id = ids.shift()
    if (!id) return
    void loadDeck(id)
      .catch(() => {})
      .then(schedule)
  }
  const schedule = () => {
    if (ids.length === 0) return
    if (typeof requestIdleCallback === 'function') requestIdleCallback(next, { timeout: 3000 })
    else setTimeout(next, 300)
  }
  schedule()
}
