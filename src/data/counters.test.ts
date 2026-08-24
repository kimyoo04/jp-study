import { describe, expect, it } from 'vitest'
import { DECKS, ROW_OF } from './kana'
import { BASE_COUNTER_ROWS, COUNTERS, COUNTER_ROWS } from './counters'
import { WORDS } from './words'
import { LOANWORDS } from './loanwords'

describe('counters data', () => {
  it('every counter has kana, romaji, and a Korean meaning', () => {
    for (const c of COUNTERS) {
      expect(c.kana.length).toBeGreaterThan(0)
      expect(c.romaji.length).toBeGreaterThan(0)
      expect(c.meaning, `${c.kana} missing meaning`).toBeTruthy()
    }
  })

  it('has no duplicate counters', () => {
    const chars = COUNTERS.map((c) => c.kana)
    expect(new Set(chars).size).toBe(chars.length)
  })

  it('does not collide with words/loanwords kana keys (progress is keyed by kana)', () => {
    const taken = new Set([...WORDS, ...LOANWORDS].map((w) => w.kana))
    for (const c of COUNTERS) {
      expect(taken.has(c.kana), `${c.kana} duplicated in another deck`).toBe(false)
    }
  })

  it('registers counter rows in ROW_OF for distractor grouping', () => {
    // ひとり is in the 〜人 row; its distractors should be other 〜人 readings.
    const row = ROW_OF['ひとり']
    expect(row).toBeDefined()
    expect(row.some((k) => k.kana === 'ふたり')).toBe(true)
    expect(row.some((k) => k.kana === 'ついたち')).toBe(false)
  })

  it('keeps the irregular readings learners must memorize', () => {
    const get = (kana: string) => COUNTERS.find((c) => c.kana === kana)
    expect(get('ついたち')?.meaning).toContain('1일')
    expect(get('はつか')?.meaning).toContain('20일')
    expect(get('はたち')?.meaning).toContain('20')
    expect(get('よじ')?.meaning).toBe('4시')
    expect(get('くじ')?.meaning).toBe('9시')
    expect(get('しがつ')?.meaning).toBe('4월')
  })

  it('is registered as a deck with category labels matching rows', () => {
    const deck = DECKS.find((d) => d.id === 'counters')!
    expect(deck).toBeDefined()
    expect(deck.kind).toBe('words')
    expect(deck.catLabels?.length).toBe(COUNTER_ROWS.length)
  })

  it('has substantial coverage (>= 100 items)', () => {
    expect(COUNTERS.length).toBeGreaterThanOrEqual(100)
  })

  it('doubles the curated core with reviewed counter forms', () => {
    expect(COUNTERS.length).toBe(BASE_COUNTER_ROWS.flat().length * 2)
  })
})
