import { describe, expect, it } from 'vitest'
import {
  ALL_ROWS,
  DAKUTEN_ROWS,
  DECKS,
  deckCategories,
  HIRAGANA,
  HIRAGANA_BASE,
  HIRAGANA_ROWS,
  KATAKANA,
  ROW_OF,
  YOON_ROWS,
} from './kana'

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

  it('every kana maps to its own row in ROW_OF', () => {
    for (const k of HIRAGANA) {
      const row = ROW_OF[k.kana]
      expect(row, `missing row for ${k.kana}`).toBeDefined()
      expect(row.some((r) => r.kana === k.kana)).toBe(true)
    }
  })

  it('yoon distractors resolve to other yoon in the same row', () => {
    const row = ROW_OF['きゃ']
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

  it('katakana chars are present in ROW_OF', () => {
    for (const k of KATAKANA) expect(ROW_OF[k.kana]).toBeDefined()
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
  it('exposes all eight decks with the right kinds', () => {
    expect(DECKS.map((d) => d.id)).toEqual([
      'hiragana',
      'katakana',
      'words',
      'loanwords',
      'counters',
      'grammar',
      'phrases',
      'kanji',
    ])
    expect(DECKS[0].kind).toBe('kana')
    expect(DECKS[2].kind).toBe('words')
    expect(DECKS[4].kind).toBe('words')
    expect(DECKS[5].kind).toBe('sentence')
    expect(DECKS[6].kind).toBe('sentence')
    expect(DECKS[7].kind).toBe('kanji')
  })
})
