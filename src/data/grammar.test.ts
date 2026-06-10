import { describe, expect, it } from 'vitest'
import { ROW_OF } from './kana'
import { GRAMMAR, GRAMMAR_ROWS } from './grammar'

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

  it('has no duplicate sentences', () => {
    const s = GRAMMAR.map((g) => g.kana)
    expect(new Set(s).size).toBe(s.length)
  })

  it('registers sentences in ROW_OF so distractors stay within a pattern', () => {
    const row = ROW_OF['わたしは がくせいです']
    expect(row).toBeDefined()
    // same ～は～です row, different sentence
    expect(row.some((g) => g.kana === 'これは ほんです')).toBe(true)
    // not a ～を～ます sentence
    expect(row.some((g) => g.kana === 'ごはんを たべます')).toBe(false)
  })
})
