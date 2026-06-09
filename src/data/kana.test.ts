import { describe, expect, it } from 'vitest'
import {
  ALL_ROWS,
  DAKUTEN_ROWS,
  HIRAGANA,
  HIRAGANA_BASE,
  HIRAGANA_ROWS,
  ROW_OF,
  YOON_ROWS,
} from './kana'

describe('kana data', () => {
  it('has the expected counts (base 46, dakuten 25, yoon 33)', () => {
    expect(HIRAGANA_BASE).toHaveLength(46)
    expect(DAKUTEN_ROWS.flat()).toHaveLength(25)
    expect(YOON_ROWS.flat()).toHaveLength(33)
    expect(HIRAGANA).toHaveLength(104)
  })

  it('teaches base first, then dakuten, then yoon', () => {
    expect(HIRAGANA[0].kana).toBe('あ')
    expect(HIRAGANA[46].kana).toBe('が') // first dakuten
    expect(HIRAGANA[71].kana).toBe('きゃ') // first yoon
  })

  it('every kana maps to its own row in ROW_OF', () => {
    for (const k of HIRAGANA) {
      const row = ROW_OF[k.kana]
      expect(row, `missing row for ${k.kana}`).toBeDefined()
      expect(row.some((r) => r.kana === k.kana)).toBe(true)
    }
  })

  it('yoon distractors resolve to other yoon in the same row', () => {
    const row = ROW_OF['きゃ']
    expect(row.map((k) => k.kana)).toEqual(['きゃ', 'きゅ', 'きょ'])
  })

  it('has no duplicate kana characters', () => {
    const chars = HIRAGANA.map((k) => k.kana)
    expect(new Set(chars).size).toBe(chars.length)
  })

  it('ALL_ROWS is the concatenation of the three groups', () => {
    expect(ALL_ROWS).toHaveLength(
      HIRAGANA_ROWS.length + DAKUTEN_ROWS.length + YOON_ROWS.length,
    )
  })
})
