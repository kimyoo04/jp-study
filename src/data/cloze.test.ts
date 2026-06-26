import { describe, expect, it } from 'vitest'
import { CLOZE, CLOZE_ROWS } from './cloze'
import { BLANK, clozeFilled } from './kana'

describe('cloze deck data', () => {
  it('flattens rows into CLOZE', () => {
    expect(CLOZE).toEqual(CLOZE_ROWS.flat())
    expect(CLOZE.length).toBeGreaterThan(20)
  })

  it('every card has a single blank, an answer, and exactly 3 distinct distractors', () => {
    for (const c of CLOZE) {
      const marks = c.kana.split(BLANK).length - 1
      expect(marks, `one blank in "${c.kana}"`).toBe(1)
      expect(c.answer, `answer for "${c.kana}"`).toBeTruthy()
      expect(c.choices, `choices for "${c.kana}"`).toHaveLength(3)
      // No distractor equals the answer, and distractors are unique.
      expect(c.choices!.includes(c.answer!), `answer not among choices in "${c.kana}"`).toBe(false)
      expect(new Set(c.choices).size, `distinct choices in "${c.kana}"`).toBe(3)
    }
  })

  it('every card has a Korean meaning and a grammar-point note', () => {
    for (const c of CLOZE) {
      expect(c.meaning, `meaning for "${c.kana}"`).toBeTruthy()
      expect(c.note, `note for "${c.kana}"`).toBeTruthy()
    }
  })

  it('clozeFilled replaces the blank with the answer', () => {
    for (const c of CLOZE) {
      const filled = clozeFilled(c)
      expect(filled).not.toContain(BLANK)
      expect(filled).toContain(c.answer!)
    }
  })
})
