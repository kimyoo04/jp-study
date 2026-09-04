// Hiragana — gojūon (五十音) order. Each inner array is one row (행),
// reused by both lesson sequencing and distractor selection (same-row first).

export interface Kana {
  kana: string
  // Real-world written form (with kanji), for word/sentence decks whose `kana`
  // is spelled out in hiragana. Shown as the main glyph while `kana` becomes the
  // reading line. Omit when the item is normally written in kana anyway. `kana`
  // stays the hiragana throughout — TTS, hangul, and quiz matching read it.
  written?: string
  romaji: string
  meaning?: string // present for word/sentence decks; absent for kana
  note?: string // grammar pattern label (sentence decks)
  // Cloze decks only: `kana` holds the sentence with a BLANK marker, `answer` is
  // the fragment that fills it, `choices` are the 3 distractor fragments.
  answer?: string
  choices?: string[]
}

export const HIRAGANA_ROWS: Kana[][] = [
  [
    { kana: 'あ', romaji: 'a' },
    { kana: 'い', romaji: 'i' },
    { kana: 'う', romaji: 'u' },
    { kana: 'え', romaji: 'e' },
    { kana: 'お', romaji: 'o' },
  ],
  [
    { kana: 'か', romaji: 'ka' },
    { kana: 'き', romaji: 'ki' },
    { kana: 'く', romaji: 'ku' },
    { kana: 'け', romaji: 'ke' },
    { kana: 'こ', romaji: 'ko' },
  ],
  [
    { kana: 'さ', romaji: 'sa' },
    { kana: 'し', romaji: 'shi' },
    { kana: 'す', romaji: 'su' },
    { kana: 'せ', romaji: 'se' },
    { kana: 'そ', romaji: 'so' },
  ],
  [
    { kana: 'た', romaji: 'ta' },
    { kana: 'ち', romaji: 'chi' },
    { kana: 'つ', romaji: 'tsu' },
    { kana: 'て', romaji: 'te' },
    { kana: 'と', romaji: 'to' },
  ],
  [
    { kana: 'な', romaji: 'na' },
    { kana: 'に', romaji: 'ni' },
    { kana: 'ぬ', romaji: 'nu' },
    { kana: 'ね', romaji: 'ne' },
    { kana: 'の', romaji: 'no' },
  ],
  [
    { kana: 'は', romaji: 'ha' },
    { kana: 'ひ', romaji: 'hi' },
    { kana: 'ふ', romaji: 'fu' },
    { kana: 'へ', romaji: 'he' },
    { kana: 'ほ', romaji: 'ho' },
  ],
  [
    { kana: 'ま', romaji: 'ma' },
    { kana: 'み', romaji: 'mi' },
    { kana: 'む', romaji: 'mu' },
    { kana: 'め', romaji: 'me' },
    { kana: 'も', romaji: 'mo' },
  ],
  [
    { kana: 'や', romaji: 'ya' },
    { kana: 'ゆ', romaji: 'yu' },
    { kana: 'よ', romaji: 'yo' },
  ],
  [
    { kana: 'ら', romaji: 'ra' },
    { kana: 'り', romaji: 'ri' },
    { kana: 'る', romaji: 'ru' },
    { kana: 'れ', romaji: 're' },
    { kana: 'ろ', romaji: 'ro' },
  ],
  [
    { kana: 'わ', romaji: 'wa' },
    { kana: 'を', romaji: 'wo' },
    { kana: 'ん', romaji: 'n' },
  ],
]

// 탁음(゛) / 반탁음(゜) — voiced & semi-voiced. Taught after the base 46.
export const DAKUTEN_ROWS: Kana[][] = [
  [
    { kana: 'が', romaji: 'ga' },
    { kana: 'ぎ', romaji: 'gi' },
    { kana: 'ぐ', romaji: 'gu' },
    { kana: 'げ', romaji: 'ge' },
    { kana: 'ご', romaji: 'go' },
  ],
  [
    { kana: 'ざ', romaji: 'za' },
    { kana: 'じ', romaji: 'ji' },
    { kana: 'ず', romaji: 'zu' },
    { kana: 'ぜ', romaji: 'ze' },
    { kana: 'ぞ', romaji: 'zo' },
  ],
  [
    { kana: 'だ', romaji: 'da' },
    { kana: 'ぢ', romaji: 'ji' },
    { kana: 'づ', romaji: 'zu' },
    { kana: 'で', romaji: 'de' },
    { kana: 'ど', romaji: 'do' },
  ],
  [
    { kana: 'ば', romaji: 'ba' },
    { kana: 'び', romaji: 'bi' },
    { kana: 'ぶ', romaji: 'bu' },
    { kana: 'べ', romaji: 'be' },
    { kana: 'ぼ', romaji: 'bo' },
  ],
  [
    { kana: 'ぱ', romaji: 'pa' },
    { kana: 'ぴ', romaji: 'pi' },
    { kana: 'ぷ', romaji: 'pu' },
    { kana: 'ぺ', romaji: 'pe' },
    { kana: 'ぽ', romaji: 'po' },
  ],
]

// 요음 — contracted sounds (consonant + small ゃ/ゅ/ょ). Taught last.
export const YOON_ROWS: Kana[][] = [
  [
    { kana: 'きゃ', romaji: 'kya' },
    { kana: 'きゅ', romaji: 'kyu' },
    { kana: 'きょ', romaji: 'kyo' },
  ],
  [
    { kana: 'しゃ', romaji: 'sha' },
    { kana: 'しゅ', romaji: 'shu' },
    { kana: 'しょ', romaji: 'sho' },
  ],
  [
    { kana: 'ちゃ', romaji: 'cha' },
    { kana: 'ちゅ', romaji: 'chu' },
    { kana: 'ちょ', romaji: 'cho' },
  ],
  [
    { kana: 'にゃ', romaji: 'nya' },
    { kana: 'にゅ', romaji: 'nyu' },
    { kana: 'にょ', romaji: 'nyo' },
  ],
  [
    { kana: 'ひゃ', romaji: 'hya' },
    { kana: 'ひゅ', romaji: 'hyu' },
    { kana: 'ひょ', romaji: 'hyo' },
  ],
  [
    { kana: 'みゃ', romaji: 'mya' },
    { kana: 'みゅ', romaji: 'myu' },
    { kana: 'みょ', romaji: 'myo' },
  ],
  [
    { kana: 'りゃ', romaji: 'rya' },
    { kana: 'りゅ', romaji: 'ryu' },
    { kana: 'りょ', romaji: 'ryo' },
  ],
  [
    { kana: 'ぎゃ', romaji: 'gya' },
    { kana: 'ぎゅ', romaji: 'gyu' },
    { kana: 'ぎょ', romaji: 'gyo' },
  ],
  [
    { kana: 'じゃ', romaji: 'ja' },
    { kana: 'じゅ', romaji: 'ju' },
    { kana: 'じょ', romaji: 'jo' },
  ],
  [
    { kana: 'びゃ', romaji: 'bya' },
    { kana: 'びゅ', romaji: 'byu' },
    { kana: 'びょ', romaji: 'byo' },
  ],
  [
    { kana: 'ぴゃ', romaji: 'pya' },
    { kana: 'ぴゅ', romaji: 'pyu' },
    { kana: 'ぴょ', romaji: 'pyo' },
  ],
]

/** Every row across all groups, in teaching order. */
export const ALL_ROWS: Kana[][] = [...HIRAGANA_ROWS, ...DAKUTEN_ROWS, ...YOON_ROWS]

/** All hiragana (base + dakuten + yoon) flattened in teaching order. */
export const HIRAGANA: Kana[] = ALL_ROWS.flat()

/** Base 46 only — kept for callers that need the core set. */
export const HIRAGANA_BASE: Kana[] = HIRAGANA_ROWS.flat()

// Katakana is structurally identical to hiragana, so we derive it by the fixed
// Unicode offset (hiragana + 0x60) instead of re-typing 104 entries. Same rows,
// same romaji — single source of truth.
function toKatakana(s: string): string {
  return [...s].map((c) => String.fromCodePoint(c.codePointAt(0)! + 0x60)).join('')
}

export const KATAKANA_ROWS: Kana[][] = ALL_ROWS.map((row) =>
  row.map((k) => ({ kana: toKatakana(k.kana), romaji: k.romaji })),
)

/** All katakana (base + dakuten + yoon) flattened in teaching order. */
export const KATAKANA: Kana[] = KATAKANA_ROWS.flat()

/**
 * 행(row) 조회 맵. 오답 선택지를 "같은 행 먼저"로 뽑는 데 쓴다(lib/quiz.ts).
 *
 * 예전에는 모든 덱의 행을 한 맵에 합쳐 뒀다 — 그래서 kana.ts 가 11개 덱 데이터를
 * 전부 정적 import 해야 했고, 초기 번들이 996KB 가 됐다. 실제로는 오답을 뽑을 때
 * 정답이 항상 "활성 덱" 소속이므로 덱별 맵이면 충분하다.
 * (부수 효과로 덱 간에 같은 문자가 있을 때 마지막 덱이 이기던 문제도 없어진다.)
 */
export function rowMapOf(rows: Kana[][]): Record<string, Kana[]> {
  const map: Record<string, Kana[]> = {}
  for (const row of rows) for (const k of row) map[k.kana] = row
  return map
}

/** 가나 두 덱의 행 맵. 초기 번들에 남는 유일한 덱 데이터다. */
export const KANA_ROW_OF: Record<string, Kana[]> = rowMapOf([...ALL_ROWS, ...KATAKANA_ROWS])

// 덱별 행 맵을 한 번만 만들어 재사용한다. 덱 객체는 모듈 스코프에 하나뿐이라
// (data/decks.ts 의 캐시) WeakMap 키로 안정적이다.
const rowMaps = new WeakMap<Deck, Record<string, Kana[]>>()

/** 이 덱의 행 맵. 오답 선택지를 "같은 행 먼저"로 뽑는 데 쓴다(lib/quiz.ts). */
export function deckRowOf(deck: Deck): Record<string, Kana[]> {
  let map = rowMaps.get(deck)
  if (!map) {
    map = rowMapOf(deck.rows)
    rowMaps.set(deck, map)
  }
  return map
}

// ---- Deck model -----------------------------------------------------------
// 덱 "정의"(어떤 덱이 있고 어떻게 불러오는지)는 ./decks.ts 에 있다. 여기에는
// 모델과, 초기 번들에 남는 가나 두 덱의 데이터만 둔다.
export type DeckId =
  | 'hiragana'
  | 'katakana'
  | 'words'
  | 'loanwords'
  | 'counters'
  | 'mimetic'
  | 'grammar'
  | 'phrases'
  | 'keigo'
  | 'kanji'
  | 'cloze'
// 'kana' -> quiz reads romaji; 'words'/'sentence'/'kanji' -> quiz reads meaning.
// 'sentence' renders smaller + shows the grammar pattern; 'kanji' renders one big glyph.
export type DeckKind = 'kana' | 'words' | 'sentence' | 'kanji' | 'cloze'

/** Marker inside a cloze card's `kana` sentence where the answer fragment goes. */
export const BLANK = '◯◯'

/** Fill a cloze card's blank with its answer to get the complete sentence. */
export function clozeFilled(card: Kana): string {
  return card.answer ? card.kana.replace(BLANK, card.answer) : card.kana
}

export interface Deck {
  id: DeckId
  label: string
  /** 'ja' when `label` is Japanese (ひらがな·カタカナ). 나머지 덱 이름은 한국어다.
   *  문서가 lang="ko" 라서, 표시하지 않으면 스크린 리더가 일본어 덱 이름을
   *  한국어 음성으로 읽는다. */
  labelLang?: 'ja'
  kind: DeckKind
  rows: Kana[][]
  kana: Kana[] // teaching order; also the distractor pool for this deck
  catLabels?: string[] // category name per row (row-based decks); 1:1 with rows
  koReading?: boolean // 레슨에서 일본어 아래 한국어 발음 표기를 보여줄지
}

export interface Category {
  name: string
  kana: Kana[]
}



/**
 * Categories a deck can be filtered to.
 * - sentence decks (grammar/phrases): grouped by `note` (pattern/situation).
 * - kana decks: one per gojūon row, labeled by its first glyph.
 * - words/loanwords/kanji: one per row, labeled by catLabels (deduped on collision).
 */
export function deckCategories(deck: Deck): Category[] {
  if (deck.kind === 'sentence' || deck.kind === 'cloze') {
    const order: string[] = []
    const map = new Map<string, Kana[]>()
    for (const k of deck.kana) {
      const note = k.note ?? '기타'
      if (!map.has(note)) {
        map.set(note, [])
        order.push(note)
      }
      map.get(note)!.push(k)
    }
    return order.map((name) => ({ name, kana: map.get(name)! }))
  }
  const seen = new Map<string, number>()
  return deck.rows.map((row, i) => {
    let name = deck.kind === 'kana' ? `${row[0].kana}행` : (deck.catLabels?.[i] ?? `${i + 1}`)
    const n = seen.get(name) ?? 0
    seen.set(name, n + 1)
    if (n > 0) name = `${name} (${n + 1})`
    return { name, kana: row }
  })
}
