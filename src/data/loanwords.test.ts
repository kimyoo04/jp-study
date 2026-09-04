import { describe, expect, it } from 'vitest'
import { rowMapOf } from './kana'
import { BASE_LOANWORD_ROWS, LOANWORDS, LOANWORD_ROWS } from './loanwords'
import { WORDS } from './words'

describe('loanwords data', () => {
  it('every loanword has kana, romaji, and a Korean meaning', () => {
    for (const w of LOANWORDS) {
      expect(w.kana.length).toBeGreaterThan(0)
      expect(w.romaji.length).toBeGreaterThan(0)
      expect(w.meaning, `${w.kana} missing meaning`).toBeTruthy()
    }
  })

  it('is written in katakana (no hiragana)', () => {
    const hasHiragana = (s: string) => [...s].some((c) => c >= 'ぁ' && c <= 'ゖ')
    for (const w of LOANWORDS) {
      expect(hasHiragana(w.kana), `${w.kana} contains hiragana`).toBe(false)
    }
  })

  it('has no duplicate loanwords and does not collide with the native deck', () => {
    const chars = LOANWORDS.map((w) => w.kana)
    expect(new Set(chars).size).toBe(chars.length)
    const native = new Set(WORDS.map((w) => w.kana))
    expect(LOANWORDS.every((w) => !native.has(w.kana))).toBe(true)
  })

  it('registers loanword rows in the deck row map for same-row distractors', () => {
    const row = rowMapOf(LOANWORD_ROWS)['コーヒー'] // food/drink row
    expect(row).toBeDefined()
    expect(row.some((k) => k.kana === 'ジュース')).toBe(true)
    expect(row.some((k) => k.kana === 'ホテル')).toBe(false)
  })

  it('has a few rows of vocabulary', () => {
    expect(LOANWORD_ROWS.length).toBeGreaterThanOrEqual(5)
    expect(LOANWORDS.length).toBeGreaterThanOrEqual(25)
  })

  it('doubles the curated core with unique expansion cards', () => {
    const base = BASE_LOANWORD_ROWS.flat()
    expect(LOANWORDS.length).toBe(base.length * 2)
    expect(new Set(LOANWORDS.map((word) => word.kana)).size).toBe(LOANWORDS.length)
  })
})
