import { describe, expect, it } from 'vitest'
import { rowMapOf } from './kana'
import { BASE_WORD_ROWS, WORDS, WORD_ROWS } from './words'

describe('words data', () => {
  it('every word has kana, romaji, and a Korean meaning', () => {
    for (const w of WORDS) {
      expect(w.kana.length).toBeGreaterThan(0)
      expect(w.romaji.length).toBeGreaterThan(0)
      expect(w.meaning, `${w.kana} missing meaning`).toBeTruthy()
    }
  })

  it('has no duplicate words', () => {
    const chars = WORDS.map((w) => w.kana)
    expect(new Set(chars).size).toBe(chars.length)
  })

  it('registers word rows in the deck row map for distractor grouping', () => {
    // いち is in the numbers row; its distractors should be other numbers.
    const row = rowMapOf(WORD_ROWS)['いち']
    expect(row).toBeDefined()
    expect(row.some((k) => k.kana === 'に')).toBe(true)
    expect(row.some((k) => k.kana === 'こんにちは')).toBe(false)
  })

  it('groups into themed rows with numbers intact', () => {
    expect(WORD_ROWS.length).toBeGreaterThanOrEqual(11)
    expect(WORD_ROWS[1].map((w) => w.meaning)).toEqual([
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    ])
  })

  it('has a substantial vocabulary (>= 180 words)', () => {
    expect(WORDS.length).toBeGreaterThanOrEqual(180)
  })

  it('doubles the curated core with unique expansion cards', () => {
    const base = BASE_WORD_ROWS.flat()
    expect(WORDS.length).toBe(base.length * 2)
    expect(new Set(WORDS.map((word) => word.kana)).size).toBe(WORDS.length)
  })
})
