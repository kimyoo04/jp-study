import { beforeAll, describe, expect, it } from 'vitest'
import { DECK_META, TOTAL_ITEMS } from '../data/decks'
import { loadSearchIndex, searchItems, type SearchEntry } from './search'

// 인덱스는 전 덱을 지연 로드해서 만든다 — 테스트도 한 번 받아 공유한다.
let SEARCH_INDEX: SearchEntry[]
beforeAll(async () => {
  SEARCH_INDEX = await loadSearchIndex()
})

describe('loadSearchIndex', () => {
  it('covers every non-cloze deck item exactly once', () => {
    const expected = DECK_META.filter((m) => m.kind !== 'cloze').reduce((n, m) => n + m.count, 0)
    expect(SEARCH_INDEX).toHaveLength(expected)
    expect(new Set(SEARCH_INDEX.map((e) => e.deckLabel)).size).toBe(DECK_META.length - 1)
  })

  it('leaves cloze cards out (blanked quiz prompts, not dictionary entries)', () => {
    expect(SEARCH_INDEX.some((e) => e.deckKind === 'cloze')).toBe(false)
    expect(SEARCH_INDEX.length).toBeLessThan(TOTAL_ITEMS)
  })

  it('returns the same array on repeat calls (built once)', async () => {
    expect(await loadSearchIndex()).toBe(SEARCH_INDEX)
  })
})

describe('searchItems', () => {
  it('returns nothing for an empty or whitespace query', () => {
    expect(searchItems('', SEARCH_INDEX)).toEqual([])
    expect(searchItems('   ', SEARCH_INDEX)).toEqual([])
  })

  it('matches romaji case-insensitively', () => {
    const hits = searchItems('Konnichiwa', SEARCH_INDEX)
    expect(hits.some((e) => e.kana.kana === 'こんにちは')).toBe(true)
  })

  it('matches Korean meaning substrings', () => {
    const hits = searchItems('커피', SEARCH_INDEX)
    expect(hits.some((e) => e.kana.kana === 'コーヒー')).toBe(true)
  })

  it('matches kana/kanji glyphs directly', () => {
    const hits = searchItems('一', SEARCH_INDEX)
    expect(hits.some((e) => e.kana.kana === '一' && e.deckKind === 'kanji')).toBe(true)
  })

  it('ranks an exact romaji match above a mere substring match', () => {
    const hits = searchItems('a', SEARCH_INDEX)
    expect(hits.length).toBeGreaterThan(0)
    // The standalone あ (romaji exactly "a") should outrank words containing "a".
    expect(hits[0].kana.romaji).toBe('a')
  })

  it('respects the result limit', () => {
    expect(searchItems('a', SEARCH_INDEX, 5).length).toBeLessThanOrEqual(5)
  })
})
