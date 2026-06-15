import { describe, expect, it } from 'vitest'
import { N5_QUESTIONS } from './n5'
import { flatten } from '../../lib/jlpt'

describe('N5 question bank', () => {
  it('every question is tagged N5', () => {
    for (const q of N5_QUESTIONS) expect(q.level).toBe('N5')
  })

  it('has unique ids', () => {
    const ids = N5_QUESTIONS.map((q) => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every choice list has 4 plausible options with no blanks or duplicates', () => {
    const check = (choices: string[], where: string) => {
      expect(choices, `${where}: expected 4 choices`).toHaveLength(4)
      expect(choices.every((c) => c.trim().length > 0), `${where}: blank choice`).toBe(true)
      expect(new Set(choices).size, `${where}: duplicate choice`).toBe(choices.length)
      // length sanity: no choice wildly longer than the others (cheap-tell guard)
      const lens = choices.map((c) => c.length)
      expect(Math.max(...lens) - Math.min(...lens), `${where}: length outlier`).toBeLessThan(10)
    }
    for (const q of N5_QUESTIONS) {
      if (q.part === 'reading') {
        q.questions.forEach((sub, i) => check(sub.choices, `${q.id}-${i}`))
      } else {
        check(q.choices, q.id)
      }
    }
  })

  it('every answer index is in range', () => {
    for (const q of N5_QUESTIONS) {
      if (q.part === 'reading') {
        q.questions.forEach((sub, i) => {
          expect(sub.answer, `${q.id}-${i}`).toBeGreaterThanOrEqual(0)
          expect(sub.answer, `${q.id}-${i}`).toBeLessThan(sub.choices.length)
        })
      } else {
        expect(q.answer, q.id).toBeGreaterThanOrEqual(0)
        expect(q.answer, q.id).toBeLessThan(q.choices.length)
      }
    }
  })

  it('ordering questions carry segments matching their choices', () => {
    const ordering = N5_QUESTIONS.filter(
      (q) => q.part === 'grammar' && q.kind === 'ordering',
    )
    expect(ordering.length).toBeGreaterThanOrEqual(1)
    for (const q of ordering) {
      if (q.part !== 'grammar') continue
      expect(q.segments, q.id).toBeDefined()
      expect([...(q.segments ?? [])].sort()).toEqual([...q.choices].sort())
    }
  })

  it('flattens to the diagnostic size with all four parts (8/8/4/8 = 28)', () => {
    const items = flatten(N5_QUESTIONS)
    const count = (p: string) => items.filter((i) => i.part === p).length
    expect(count('vocab')).toBe(8)
    expect(count('grammar')).toBe(8)
    expect(count('reading')).toBe(4)
    expect(count('listening')).toBe(8)
    expect(items).toHaveLength(28)
  })
})
