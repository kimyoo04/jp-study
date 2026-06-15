import { describe, expect, it } from 'vitest'
import { seeded, shuffle } from './rng'

describe('rng', () => {
  it('shuffle returns a permutation, not a mutation', () => {
    const input = [1, 2, 3, 4, 5]
    const out = shuffle(input, seeded(1))
    expect(out).toHaveLength(5)
    expect([...out].sort((a, b) => a - b)).toEqual(input)
    expect(input).toEqual([1, 2, 3, 4, 5]) // original untouched
  })

  it('is deterministic for a given seed', () => {
    const a = shuffle([1, 2, 3, 4, 5, 6], seeded(42))
    const b = shuffle([1, 2, 3, 4, 5, 6], seeded(42))
    expect(a).toEqual(b)
  })

  it('different seeds generally differ', () => {
    const a = shuffle([1, 2, 3, 4, 5, 6, 7, 8], seeded(1))
    const b = shuffle([1, 2, 3, 4, 5, 6, 7, 8], seeded(2))
    expect(a).not.toEqual(b)
  })
})
