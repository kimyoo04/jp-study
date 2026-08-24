import { describe, expect, it } from 'vitest'
import { DECKS, ROW_OF } from './kana'
import { BASE_MIMETIC_ROWS, MIMETICS, MIMETIC_ROWS } from './mimetic'
import { WORDS } from './words'
import { LOANWORDS } from './loanwords'
import { COUNTERS } from './counters'

describe('mimetic data', () => {
  it('every item has kana, romaji, and a Korean meaning', () => {
    for (const m of MIMETICS) {
      expect(m.kana.length).toBeGreaterThan(0)
      expect(m.romaji.length).toBeGreaterThan(0)
      expect(m.meaning, `${m.kana} missing meaning`).toBeTruthy()
    }
  })

  it('has no duplicate items', () => {
    const chars = MIMETICS.map((m) => m.kana)
    expect(new Set(chars).size).toBe(chars.length)
  })

  it('does not collide with words/loanwords/counters kana keys', () => {
    const taken = new Set([...WORDS, ...LOANWORDS, ...COUNTERS].map((w) => w.kana))
    for (const m of MIMETICS) {
      expect(taken.has(m.kana), `${m.kana} duplicated in another deck`).toBe(false)
    }
  })

  it('registers rows in ROW_OF for distractor grouping', () => {
    // どきどき is in the 감정 row; distractors should be other feelings.
    const row = ROW_OF['どきどき']
    expect(row).toBeDefined()
    expect(row.some((k) => k.kana === 'わくわく')).toBe(true)
    expect(row.some((k) => k.kana === 'もちもち')).toBe(false)
  })

  it('is registered as a deck with category labels matching rows', () => {
    const deck = DECKS.find((d) => d.id === 'mimetic')!
    expect(deck).toBeDefined()
    expect(deck.kind).toBe('words')
    expect(deck.catLabels?.length).toBe(MIMETIC_ROWS.length)
  })

  it('has substantial coverage (>= 50 items)', () => {
    expect(MIMETICS.length).toBeGreaterThanOrEqual(50)
  })

  it('doubles the curated core with unique mimetic expressions', () => {
    expect(MIMETICS.length).toBe(BASE_MIMETIC_ROWS.flat().length * 2)
  })
})
