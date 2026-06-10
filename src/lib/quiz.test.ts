import { describe, expect, it } from 'vitest'
import { HIRAGANA, ROW_OF } from '../data/kana'
import { buildQuestion, isCorrect, pickDistractors, pickQType } from './quiz'

// Deterministic rng for stable assertions.
function seeded(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

const A = { kana: 'あ', romaji: 'a' }

describe('pickDistractors', () => {
  it('never includes the answer and respects count', () => {
    const d = pickDistractors(A, 3, HIRAGANA, seeded(1))
    expect(d).toHaveLength(3)
    expect(d.some((k) => k.kana === 'あ')).toBe(false)
    expect(new Set(d.map((k) => k.kana)).size).toBe(3) // no dups
  })

  it('prefers same-row distractors first', () => {
    // あ row is [あいうえお]; with count 2 both should come from that row.
    const d = pickDistractors(A, 2, HIRAGANA, seeded(7))
    const rowKana = ROW_OF['あ'].map((k) => k.kana)
    expect(d.every((k) => rowKana.includes(k.kana))).toBe(true)
  })

  it('falls back to other rows when same row is exhausted', () => {
    // Row has 4 non-answer members; asking for 6 forces global fill.
    const d = pickDistractors(A, 6, HIRAGANA, seeded(3))
    expect(d).toHaveLength(6)
    const rowKana = ROW_OF['あ'].map((k) => k.kana)
    expect(d.some((k) => !rowKana.includes(k.kana))).toBe(true)
  })
})

describe('buildQuestion', () => {
  it('produces 4 options including the answer', () => {
    const q = buildQuestion(A, 'read', HIRAGANA, seeded(2))
    expect(q.options).toHaveLength(4)
    expect(q.options.some((o) => o.kana === 'あ')).toBe(true)
  })

  it('isCorrect matches only the answer', () => {
    const q = buildQuestion(A, 'listen', HIRAGANA, seeded(5))
    expect(isCorrect(q, A)).toBe(true)
    const wrong = q.options.find((o) => o.kana !== 'あ')!
    expect(isCorrect(q, wrong)).toBe(false)
  })
})

describe('pickQType', () => {
  it('listen mode forces listen on every deck when a voice exists', () => {
    expect(pickQType('kana', true, true, 0)).toBe('listen')
    expect(pickQType('words', true, true, 0)).toBe('listen')
    expect(pickQType('kanji', true, true, 3)).toBe('listen')
    expect(pickQType('sentence', true, true, 1)).toBe('listen')
  })

  it('listen mode falls back to normal types when no voice is available', () => {
    expect(pickQType('kana', true, false, 0)).toBe('read')
    expect(pickQType('words', true, false, 0)).toBe('meaning')
    expect(pickQType('kanji', true, false, 0)).toBe('meaning')
  })

  it('without listen mode, word decks always quiz on meaning', () => {
    expect(pickQType('words', false, true, 0)).toBe('meaning')
    expect(pickQType('sentence', false, true, 5)).toBe('meaning')
    expect(pickQType('kanji', false, false, 0)).toBe('meaning')
  })

  it('without listen mode, kana decks round-robin read/listen and drop listen with no voice', () => {
    expect(pickQType('kana', false, true, 0)).toBe('read')
    expect(pickQType('kana', false, true, 1)).toBe('listen')
    expect(pickQType('kana', false, false, 1)).toBe('read')
  })
})
