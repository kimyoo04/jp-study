import { describe, expect, it } from 'vitest'
import { DECKS, ROW_OF, deckCategories } from './kana'
import { BASE_KANJI_ROWS, KANJI, KANJI_ROWS } from './kanji'
import { HIRAGANA } from './kana'

describe('kanji data', () => {
  it('every kanji has a single CJK glyph, reading, and meaning', () => {
    for (const k of KANJI) {
      expect([...k.kana]).toHaveLength(1) // one character
      const cp = k.kana.codePointAt(0)!
      expect(cp).toBeGreaterThanOrEqual(0x4e00) // CJK Unified Ideographs
      expect(cp).toBeLessThanOrEqual(0x9fff)
      expect(k.romaji.length).toBeGreaterThan(0)
      expect(k.meaning, `${k.kana} missing meaning`).toBeTruthy()
    }
  })

  it('has no duplicate kanji and does not collide with kana', () => {
    const chars = KANJI.map((k) => k.kana)
    expect(new Set(chars).size).toBe(chars.length)
    const kanaSet = new Set(HIRAGANA.map((k) => k.kana))
    expect(KANJI.every((k) => !kanaSet.has(k.kana))).toBe(true)
  })

  it('registers kanji in ROW_OF so distractors stay within a theme', () => {
    const row = ROW_OF['一'] // numbers row
    expect(row).toBeDefined()
    expect(row.some((k) => k.kana === '二')).toBe(true)
    expect(row.some((k) => k.kana === '山')).toBe(false)
  })

  it('covers a solid N5 set (>= 80 kanji)', () => {
    expect(KANJI_ROWS.length).toBeGreaterThanOrEqual(10)
    expect(KANJI.length).toBeGreaterThanOrEqual(80)
  })

  it('doubles the curated kanji with unique expansion glyphs', () => {
    expect(KANJI).toHaveLength(BASE_KANJI_ROWS.flat().length * 2)
    const deck = DECKS.find((item) => item.id === 'kanji')!
    expect(deckCategories(deck)).toHaveLength(KANJI_ROWS.length)
  })
})
