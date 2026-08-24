import { describe, expect, it } from 'vitest'
import { DECKS, deckCategories } from './kana'
import { BASE_KEIGO_ROWS, KEIGO, KEIGO_ROWS } from './keigo'
import { PHRASES } from './phrases'
import { GRAMMAR } from './grammar'

describe('keigo data', () => {
  it('every expression has kana, romaji, meaning, and a category note', () => {
    for (const k of KEIGO) {
      expect(k.kana.length).toBeGreaterThan(0)
      expect(k.romaji.length).toBeGreaterThan(0)
      expect(k.meaning, `${k.kana} missing meaning`).toBeTruthy()
      expect(k.note, `${k.kana} missing note`).toBeTruthy()
    }
  })

  it('has no duplicate expressions', () => {
    const chars = KEIGO.map((k) => k.kana)
    expect(new Set(chars).size).toBe(chars.length)
  })

  it('does not collide with phrases/grammar kana keys', () => {
    const taken = new Set([...PHRASES, ...GRAMMAR].map((p) => p.kana))
    for (const k of KEIGO) {
      expect(taken.has(k.kana), `${k.kana} duplicated in another deck`).toBe(false)
    }
  })

  it('is registered as a sentence deck grouped by note categories', () => {
    const deck = DECKS.find((d) => d.id === 'keigo')!
    expect(deck).toBeDefined()
    expect(deck.kind).toBe('sentence')
    const cats = deckCategories(deck)
    expect(cats.length).toBe(KEIGO_ROWS.length)
    expect(cats.map((c) => c.name)).toContain('존경어 (상대 높임)')
  })

  it('teaches the core sonkeigo/kenjougo pairs', () => {
    const get = (kana: string) => KEIGO.find((k) => k.kana === kana)
    expect(get('いらっしゃいます')).toBeDefined() // 존경
    expect(get('まいります')).toBeDefined() // 겸양
    expect(get('おっしゃいます')).toBeDefined()
    expect(get('もうします')).toBeDefined()
  })

  it('doubles the curated expressions without changing category rows', () => {
    expect(KEIGO).toHaveLength(BASE_KEIGO_ROWS.flat().length * 2)
    expect(KEIGO_ROWS).toHaveLength(BASE_KEIGO_ROWS.length)
  })
})
