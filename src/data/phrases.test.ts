import { describe, expect, it } from 'vitest'
import { rowMapOf } from './kana'
import { BASE_PHRASE_ROWS, PHRASES, PHRASE_ROWS } from './phrases'
import { GRAMMAR } from './grammar'

describe('phrases data', () => {
  it('every phrase has a sentence, romaji, meaning, and situation note', () => {
    for (const p of PHRASES) {
      expect(p.kana.length).toBeGreaterThan(0)
      expect(p.romaji.length).toBeGreaterThan(0)
      expect(p.meaning, `${p.kana} missing meaning`).toBeTruthy()
      expect(p.note, `${p.kana} missing situation`).toBeTruthy()
    }
  })

  it('all phrases in a row share the same situation note', () => {
    for (const row of PHRASE_ROWS) {
      expect(new Set(row.map((p) => p.note)).size).toBe(1)
    }
  })

  it('has no duplicate phrases and does not collide with grammar sentences', () => {
    const s = PHRASES.map((p) => p.kana)
    expect(new Set(s).size).toBe(s.length)
    const grammar = new Set(GRAMMAR.map((g) => g.kana))
    const collisions = PHRASES.filter((p) => grammar.has(p.kana)).map((p) => p.kana)
    expect(collisions).toEqual([])
  })

  it('registers phrases in the deck row map so distractors stay within a situation', () => {
    const row = rowMapOf(PHRASE_ROWS)['はじめまして']
    expect(row).toBeDefined()
    expect(row.some((p) => p.kana === 'おげんきですか')).toBe(true) // same 인사 row
    expect(row.some((p) => p.kana === 'いくらですか')).toBe(false) // different row
  })

  it('has a few situations of phrases', () => {
    expect(PHRASE_ROWS.length).toBeGreaterThanOrEqual(5)
    expect(PHRASES.length).toBeGreaterThanOrEqual(25)
  })

  it('doubles the curated phrases without changing situation rows', () => {
    expect(PHRASES).toHaveLength(BASE_PHRASE_ROWS.flat().length * 2)
    expect(PHRASE_ROWS).toHaveLength(BASE_PHRASE_ROWS.length)
  })
})
