// Hiragana — gojūon (五十音) order. Each inner array is one row (행),
// reused by both lesson sequencing and distractor selection (same-row first).
import { WORD_ROWS, WORDS } from './words'
import { LOANWORD_ROWS, LOANWORDS } from './loanwords'
import { COUNTER_ROWS, COUNTERS } from './counters'
import { MIMETIC_ROWS, MIMETICS } from './mimetic'
import { KEIGO_ROWS, KEIGO } from './keigo'
import { GRAMMAR_ROWS, GRAMMAR } from './grammar'
import { PHRASE_ROWS, PHRASES } from './phrases'
import { KANJI_ROWS, KANJI } from './kanji'
import { KANJI_EXPANSION_CATS } from './kanji-expanded'
import { CLOZE_ROWS, CLOZE } from './cloze'

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

/** Row lookup for a given kana char (all scripts + words) — used by distractor selection. */
export const ROW_OF: Record<string, Kana[]> = (() => {
  const map: Record<string, Kana[]> = {}
  for (const row of [
    ...ALL_ROWS,
    ...KATAKANA_ROWS,
    ...WORD_ROWS,
    ...LOANWORD_ROWS,
    ...COUNTER_ROWS,
    ...MIMETIC_ROWS,
    ...KEIGO_ROWS,
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

// Theme/category label per row for the row-based decks (1:1 with their rows).
const BASE_WORD_CATS = [
  '인사말', '숫자', '생활', '시간', '색깔', '음식', '동물', '가족', '동사', '형용사',
  '요일', '신체', '자연 / 날씨', '장소', '동사 2', '형용사 2', '위치', '물건', '과일 / 채소',
  '교통', '동사 3', '형용사 3', '사람', '추상 / 생활 2', '동사 4', '형용사 4', '자연 2',
  '식재료', '집 / 방', '빈도 / 시간 2', '동사 5', '동사 6', '맛 / 형용사 5', 'な형용사',
  '마음 / 몸', '의문사', '부사', '직업 / 사람 2', '학교 / 공부', '동물 2', 'する 동사',
  '감정 형용사', '색 / 모양', '시간 / 날짜', '방향 / 위치 2', '식사 / 음식 4', '동사 7',
  'な형용사 / 형용사 7', '추상 / 분야', '사물 2', '동사 8', '형용사 8', '신체 3', '자연 3 / 날씨',
  '추상 2', '장소 3', '부사 2', '접속사', '동사 9', '색 형용사', '일본 요리', '생활 동작 2',
  '수량 / 정도', '동사 10', 'な형용사 2', '추상 3', '건강 / 몸', '도구 / 사물 3', '가족 / 관계 2',
  '동작 / 감정 동사', '위치 / 이동', '시간 3 / 시대',
  '동사 13', '동사 14', '형용사 / 상태 6', '추상 / 생활 4',
]
const WORD_CATS = [
  ...BASE_WORD_CATS,
  ...Array.from({ length: WORD_ROWS.length - BASE_WORD_CATS.length }, (_, i) => `JLPT 확장 ${i + 1}`),
]
const BASE_LOANWORD_CATS = [
  '음식 / 음료', '장소', '기기 / 디지털', '취미 / 스포츠', '의류 / 물건', '음식 2', '나라',
  '취미 / 스포츠 2', '생활 물건', '현대 / IT', '의류 2', '음식 / 음료 3', '나라 2', '스포츠 3',
  '직장 / 학교', '색 / 추상', '음식 2', '가전 / 기기 2', '장소 2', '직업 / 사람', '취미 / 일상 2',
  '음식 3', 'IT / 통신 2', '패션 / 뷰티', '교통 / 여행', '비즈니스 / 추상', '식당 / 메뉴',
  '가전 / 생활 2', '스포츠 / 취미 4', '음악 / 엔터', '추상 2', '음식 4', '패션 2', '직장 2',
  '여행 2', '감정 / 추상 3', '음식 5', '기기 3', '장소 3', '뷰티 / 패션 3', '추상 / 일 3',
  '자동차 / 교통 3',
  '디저트 / 간식 3', 'IT / 통신 3', '단위 / 수량', '생활용품 3', '쇼핑 / 패션 4',
]
const LOANWORD_CATS = [
  ...BASE_LOANWORD_CATS,
  ...Array.from(
    { length: LOANWORD_ROWS.length - BASE_LOANWORD_CATS.length },
    (_, i) => `JLPT 외래어 확장 ${i + 1}`,
  ),
]
const COUNTER_CATS = [
  '개수 〜つ', '사람 〜人', '날짜 1〜10일', '날짜 / 기간', '시간 〜時', '분 〜分',
  '장 〜枚', '병/자루 〜本', '잔 〜杯 / 개 〜個', '마리 〜匹', '횟수 〜回', '나이 〜歳', '월 〜月',
]
const MIMETIC_CATS = [
  '감정 1', '감정 2', '몸 상태', '날씨 / 공기', '음식 식감', '말 / 표정',
  '동작 / 태도', '상태 / 모양', '움직임 / 일상',
]
const KANJI_CATS = [
  '숫자 1', '숫자 2 / 돈', '요일 / 시간', '사람 / 크기', '위치', '방위 / 자연', '신체 / 기본',
  '동사 1', '동사 2 / 생활', '형용사 / 정도', '명사 1', '명사 2', '시간 / 날짜 2', '가족',
  '동사 3', '동사 4', '형용사 / 상태', '형용사 2 / 날씨', '장소 / 행정', '자연 2', '동사 5',
  '동사 6', '신체 / 건강 2', '음식 2', '색 / 형용 3', '추상 명사', '사회 / 일', '학교 / 공부 2',
  '동사 7', '동사 8', '감정', '유무 / 형용 4', '수량 / 순서', '방향 / 위치 2', '추상 2',
  '물건 / 의류 2', '날씨 / 계절 2', '동물', '식재료 2', '신체 3', '동작 3', '성격 / 성질',
  '장소 / 시설', '추상 3', '학교 / 공부 3', '직업 / 산업', '돈 / 경제', '교통 / 이동 2',
  '신체 / 건강 3', '감정 2', '동작 4', '시간 / 순서 2', '지리', '자연 3', '물질 / 재료', '동작 5',
  '요리 동작', '사회 / 법', '사고 / 판단', '감각 2', '사람 / 관계 2', '시간 / 빈도 3', '상태 / 마무리',
  '추상 / 사물 4', '동사 11', '동사 12', '상태 / 형용 5', '사회 / 일 2',
  ...KANJI_EXPANSION_CATS,
]

export const DECKS: Deck[] = [
  { id: 'hiragana', label: 'ひらがな', labelLang: 'ja', kind: 'kana', rows: ALL_ROWS, kana: HIRAGANA },
  { id: 'katakana', label: 'カタカナ', labelLang: 'ja', kind: 'kana', rows: KATAKANA_ROWS, kana: KATAKANA },
  { id: 'words', label: '단어', kind: 'words', rows: WORD_ROWS, kana: WORDS, catLabels: WORD_CATS },
  { id: 'loanwords', label: '외래어', kind: 'words', rows: LOANWORD_ROWS, kana: LOANWORDS, catLabels: LOANWORD_CATS },
  { id: 'counters', label: '조수사', kind: 'words', rows: COUNTER_ROWS, kana: COUNTERS, catLabels: COUNTER_CATS },
  { id: 'mimetic', label: '의태어', kind: 'words', rows: MIMETIC_ROWS, kana: MIMETICS, catLabels: MIMETIC_CATS },
  { id: 'grammar', label: '문법', kind: 'sentence', rows: GRAMMAR_ROWS, kana: GRAMMAR },
  { id: 'phrases', label: '회화', kind: 'sentence', rows: PHRASE_ROWS, kana: PHRASES, koReading: true },
  { id: 'keigo', label: '경어', kind: 'sentence', rows: KEIGO_ROWS, kana: KEIGO, koReading: true },
  { id: 'kanji', label: '한자', kind: 'kanji', rows: KANJI_ROWS, kana: KANJI, catLabels: KANJI_CATS },
  { id: 'cloze', label: '빈칸', kind: 'cloze', rows: CLOZE_ROWS, kana: CLOZE },
]

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
