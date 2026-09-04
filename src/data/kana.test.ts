import { beforeAll, describe, expect, it } from 'vitest'
import { DECK_META, loadAllDecks } from './decks'
import {
  ALL_ROWS,
  DAKUTEN_ROWS,
  deckCategories,
  HIRAGANA,
  HIRAGANA_BASE,
  HIRAGANA_ROWS,
  KANA_ROW_OF,
  KATAKANA,
  YOON_ROWS,
  type Deck,
} from './kana'

// 덱 데이터는 지연 로드다(decks.ts) — 전 덱을 훑는 테스트는 먼저 받는다.
let DECKS: Deck[]
beforeAll(async () => {
  DECKS = await loadAllDecks()
})

describe('kana data', () => {
  it('has the expected counts (base 46, dakuten 25, yoon 33)', () => {
    expect(HIRAGANA_BASE).toHaveLength(46)
    expect(DAKUTEN_ROWS.flat()).toHaveLength(25)
    expect(YOON_ROWS.flat()).toHaveLength(33)
    expect(HIRAGANA).toHaveLength(104)
  })

  it('teaches base first, then dakuten, then yoon', () => {
    expect(HIRAGANA[0].kana).toBe('あ')
    expect(HIRAGANA[46].kana).toBe('が') // first dakuten
    expect(HIRAGANA[71].kana).toBe('きゃ') // first yoon
  })

  it('every kana maps to its own row in the kana row map', () => {
    for (const k of HIRAGANA) {
      const row = KANA_ROW_OF[k.kana]
      expect(row, `missing row for ${k.kana}`).toBeDefined()
      expect(row.some((r) => r.kana === k.kana)).toBe(true)
    }
  })

  it('yoon distractors resolve to other yoon in the same row', () => {
    const row = KANA_ROW_OF['きゃ']
    expect(row.map((k) => k.kana)).toEqual(['きゃ', 'きゅ', 'きょ'])
  })

  it('has no duplicate kana characters', () => {
    const chars = HIRAGANA.map((k) => k.kana)
    expect(new Set(chars).size).toBe(chars.length)
  })

  it('ALL_ROWS is the concatenation of the three groups', () => {
    expect(ALL_ROWS).toHaveLength(
      HIRAGANA_ROWS.length + DAKUTEN_ROWS.length + YOON_ROWS.length,
    )
  })
})

describe('katakana (derived from hiragana)', () => {
  it('mirrors hiragana count and romaji, with distinct chars', () => {
    expect(KATAKANA).toHaveLength(HIRAGANA.length) // 104
    expect(KATAKANA.map((k) => k.romaji)).toEqual(HIRAGANA.map((k) => k.romaji))
    // No char overlap between scripts.
    const hira = new Set(HIRAGANA.map((k) => k.kana))
    expect(KATAKANA.every((k) => !hira.has(k.kana))).toBe(true)
  })

  it('maps the right glyphs via the +0x60 offset', () => {
    const a = KATAKANA.find((k) => k.romaji === 'a')!
    expect(a.kana).toBe('ア')
    const kya = KATAKANA.find((k) => k.romaji === 'kya')!
    expect(kya.kana).toBe('キャ')
  })

  it('katakana chars are present in the kana row map', () => {
    for (const k of KATAKANA) expect(KANA_ROW_OF[k.kana]).toBeDefined()
  })
})

describe('deckCategories', () => {
  it('row-based decks have one category per row, covering all kana, unique names', () => {
    for (const deck of DECKS.filter((d) => d.kind !== 'sentence')) {
      const cats = deckCategories(deck)
      expect(cats.length).toBe(deck.rows.length)
      expect(cats.reduce((n, c) => n + c.kana.length, 0)).toBe(deck.kana.length)
      expect(new Set(cats.map((c) => c.name)).size).toBe(cats.length) // names deduped
    }
  })

  it('row-based catLabels (when present) line up 1:1 with rows', () => {
    for (const deck of DECKS) {
      if (deck.catLabels) expect(deck.catLabels.length).toBe(deck.rows.length)
    }
  })

  it('kana deck categories are labeled by their gojūon row', () => {
    const cats = deckCategories(DECKS[0]) // hiragana
    expect(cats[0].name).toBe('あ행')
    expect(cats[0].kana.map((k) => k.kana)).toEqual(['あ', 'い', 'う', 'え', 'お'])
  })

  it('sentence decks group by note (pattern/situation), covering all items', () => {
    const grammar = DECKS.find((d) => d.id === 'grammar')!
    const cats = deckCategories(grammar)
    expect(cats.reduce((n, c) => n + c.kana.length, 0)).toBe(grammar.kana.length)
    // every item in a category shares that category's note
    for (const c of cats) expect(c.kana.every((k) => k.note === c.name)).toBe(true)
  })
})

describe('decks', () => {
  it('exposes all eleven decks with the right kinds', () => {
    // 메타는 동기다 — 데이터 없이도 탭·라우팅·<title>이 이걸로 돌아간다.
    expect(DECK_META.map((d) => d.id)).toEqual([
      'hiragana',
      'katakana',
      'words',
      'loanwords',
      'counters',
      'mimetic',
      'grammar',
      'phrases',
      'keigo',
      'kanji',
      'cloze',
    ])
    const kinds = Object.fromEntries(DECK_META.map((d) => [d.id, d.kind]))
    expect(kinds).toEqual({
      hiragana: 'kana',
      katakana: 'kana',
      words: 'words',
      loanwords: 'words',
      counters: 'words',
      mimetic: 'words',
      grammar: 'sentence',
      phrases: 'sentence',
      keigo: 'sentence',
      kanji: 'kanji',
      cloze: 'cloze',
    })
  })

  it('keeps catLabels 1:1 with rows on every row-labeled deck', () => {
    // catLabels pair with rows by index, so a drifting array silently
    // mislabels every category after the gap.
    for (const d of DECKS.filter((d) => d.catLabels)) {
      expect(d.catLabels!.length, `${d.id} catLabels/rows`).toBe(d.rows.length)
    }
  })

  it('flattens rows into the deck kana in teaching order', () => {
    for (const d of DECKS) {
      expect(d.kana.length, `${d.id} kana/rows`).toBe(d.rows.flat().length)
    }
  })

  it('keeps DECK_META counts in sync with the loaded payloads', () => {
    // count 는 손으로 쓴 상수다(데이터 없이도 탭·설명에 쓰이므로). 덱 항목을
    // 늘리고 여기를 안 고치면 화면이 틀린 수를 말한다 → 여기서 잡는다.
    for (const meta of DECK_META) {
      const deck = DECKS.find((d) => d.id === meta.id)!
      expect(deck.kana.length, `${meta.id} count`).toBe(meta.count)
    }
  })

  it('agrees with DECK_META on labels and kinds', () => {
    for (const meta of DECK_META) {
      const deck = DECKS.find((d) => d.id === meta.id)!
      expect(deck.label, `${meta.id} label`).toBe(meta.label)
      expect(deck.kind, `${meta.id} kind`).toBe(meta.kind)
      expect(deck.labelLang, `${meta.id} labelLang`).toBe(meta.labelLang)
      expect(deck.koReading, `${meta.id} koReading`).toBe(meta.koReading)
    }
  })
})
