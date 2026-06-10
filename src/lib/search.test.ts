import { describe, expect, it } from 'vitest'
import { SEARCH_INDEX, searchItems } from './search'

describe('SEARCH_INDEX', () => {
  it('covers every deck item exactly once', () => {
    // Matches the total the Home screen advertises; guards against a deck being
    // dropped from the flatten.
    expect(SEARCH_INDEX.length).toBeGreaterThan(2000)
    const labels = new Set(SEARCH_INDEX.map((e) => e.deckLabel))
    expect(labels.size).toBe(10)
  })
})

describe('searchItems', () => {
  it('returns nothing for an empty or whitespace query', () => {
    expect(searchItems('')).toEqual([])
    expect(searchItems('   ')).toEqual([])
  })

  it('matches romaji case-insensitively', () => {
    const hits = searchItems('Konnichiwa')
    expect(hits.some((e) => e.kana.kana === 'こんにちは')).toBe(true)
  })

  it('matches Korean meaning substrings', () => {
    const hits = searchItems('커피')
    expect(hits.some((e) => e.kana.kana === 'コーヒー')).toBe(true)
  })

  it('matches kana/kanji glyphs directly', () => {
    const hits = searchItems('一')
    expect(hits.some((e) => e.kana.kana === '一' && e.deckKind === 'kanji')).toBe(true)
  })

  it('ranks an exact romaji match above a mere substring match', () => {
    const hits = searchItems('a')
    expect(hits.length).toBeGreaterThan(0)
    // The standalone あ (romaji exactly "a") should outrank words containing "a".
    expect(hits[0].kana.romaji).toBe('a')
  })

  it('respects the result limit', () => {
    expect(searchItems('a', SEARCH_INDEX, 5).length).toBeLessThanOrEqual(5)
  })
})
