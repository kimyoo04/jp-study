import { describe, expect, it } from 'vitest'
import { HIRAGANA, ROW_OF } from '../data/kana'
import { buildQuestion, isCorrect, pickDistractors } from './quiz'

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
