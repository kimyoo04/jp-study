// Hiragana — gojūon (五十音) order. Each inner array is one row (행),
// reused by both lesson sequencing and distractor selection (same-row first).
import { WORD_ROWS, WORDS } from './words'
import { LOANWORD_ROWS, LOANWORDS } from './loanwords'
import { GRAMMAR_ROWS, GRAMMAR } from './grammar'
import { PHRASE_ROWS, PHRASES } from './phrases'
import { KANJI_ROWS, KANJI } from './kanji'

export interface Kana {
  kana: string
  romaji: string
  meaning?: string // present for word/sentence decks; absent for kana
  note?: string // grammar pattern label (sentence decks)
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

/** Row lookup for a given kana char (all scripts + words) — used by distractor selection. */
export const ROW_OF: Record<string, Kana[]> = (() => {
  const map: Record<string, Kana[]> = {}
  for (const row of [
    ...ALL_ROWS,
    ...KATAKANA_ROWS,
    ...WORD_ROWS,
    ...LOANWORD_ROWS,
    ...GRAMMAR_ROWS,
    ...PHRASE_ROWS,
    ...KANJI_ROWS,
  ])
    for (const k of row) map[k.kana] = row
  return map
})()

// ---- Decks ----------------------------------------------------------------
export type DeckId =
  | 'hiragana'
  | 'katakana'
  | 'words'
  | 'loanwords'
  | 'grammar'
  | 'phrases'
  | 'kanji'
// 'kana' -> quiz reads romaji; 'words'/'sentence'/'kanji' -> quiz reads meaning.
// 'sentence' renders smaller + shows the grammar pattern; 'kanji' renders one big glyph.
export type DeckKind = 'kana' | 'words' | 'sentence' | 'kanji'

export interface Deck {
  id: DeckId
  label: string
  kind: DeckKind
  rows: Kana[][]
  kana: Kana[] // teaching order; also the distractor pool for this deck
}

export const DECKS: Deck[] = [
  { id: 'hiragana', label: 'ひらがな', kind: 'kana', rows: ALL_ROWS, kana: HIRAGANA },
  { id: 'katakana', label: 'カタカナ', kind: 'kana', rows: KATAKANA_ROWS, kana: KATAKANA },
  { id: 'words', label: '단어', kind: 'words', rows: WORD_ROWS, kana: WORDS },
  { id: 'loanwords', label: '외래어', kind: 'words', rows: LOANWORD_ROWS, kana: LOANWORDS },
  { id: 'grammar', label: '문법', kind: 'sentence', rows: GRAMMAR_ROWS, kana: GRAMMAR },
  { id: 'phrases', label: '회화', kind: 'sentence', rows: PHRASE_ROWS, kana: PHRASES },
  { id: 'kanji', label: '한자', kind: 'kanji', rows: KANJI_ROWS, kana: KANJI },
]
