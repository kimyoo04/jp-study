import { describe, expect, it } from 'vitest'
import { rowMapOf } from './kana'
import { BASE_GRAMMAR_ROWS, GRAMMAR, GRAMMAR_ROWS } from './grammar'

describe('grammar data', () => {
  it('every example has a sentence, romaji, meaning, and pattern note', () => {
    for (const g of GRAMMAR) {
      expect(g.kana.length).toBeGreaterThan(0)
      expect(g.romaji.length).toBeGreaterThan(0)
      expect(g.meaning, `${g.kana} missing meaning`).toBeTruthy()
      expect(g.note, `${g.kana} missing pattern note`).toBeTruthy()
    }
  })

  it('all sentences in a row share the same pattern note', () => {
    for (const row of GRAMMAR_ROWS) {
      const notes = new Set(row.map((g) => g.note))
      expect(notes.size).toBe(1)
    }
  })

  it('has no duplicate sentences, even modulo spacing', () => {
    // 'ほんを よんでいます' vs 'ほんを よんで います' are the same card twice.
    const s = GRAMMAR.map((g) => g.kana.replace(/[ 、]/g, ''))
    expect(new Set(s).size).toBe(s.length)
  })

  it('covers a solid set of patterns (>= 10 patterns, >= 40 sentences)', () => {
    expect(GRAMMAR_ROWS.length).toBeGreaterThanOrEqual(10)
    expect(GRAMMAR.length).toBeGreaterThanOrEqual(40)
  })

  it('doubles the curated examples without changing the pattern rows', () => {
    expect(GRAMMAR).toHaveLength(BASE_GRAMMAR_ROWS.flat().length * 2)
    expect(GRAMMAR_ROWS).toHaveLength(BASE_GRAMMAR_ROWS.length)
  })

  it('registers sentences in the deck row map so distractors stay within a pattern', () => {
    const row = rowMapOf(GRAMMAR_ROWS)['わたしは がくせいです']
    expect(row).toBeDefined()
    // same ～は～です row, different sentence
    expect(row.some((g) => g.kana === 'これは ほんです')).toBe(true)
    // not a ～を～ます sentence
    expect(row.some((g) => g.kana === 'ごはんを たべます')).toBe(false)
  })
})
