import { describe, expect, it } from 'vitest'
import { JLPT_POOL, JLPT_LEVELS } from './index'
import type { JlptLevel, JlptQuestion } from './types'
import { buildExam, EXAM_PLAN, EXAM_READING_PASSAGES, hasContent } from '../../lib/jlpt'
import { seeded } from '../../lib/rng'

// Validates the whole bank (every level) plus per-level exam composition.

describe('JLPT bank integrity', () => {
  it('has globally unique ids', () => {
    const ids = JLPT_POOL.map((q) => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every question is tagged with a known level', () => {
    for (const q of JLPT_POOL) expect(JLPT_LEVELS).toContain(q.level)
  })

  // checkLength guards against a "cheap tell" (one choice far longer than the
  // others) — only meaningful for short vocab/grammar/listening options. Reading
  // answers are full phrases that legitimately vary in length, so skip it there.
  const check = (choices: string[], where: string, checkLength: boolean) => {
    expect(choices, `${where}: expected 4 choices`).toHaveLength(4)
    expect(choices.every((c) => c.trim().length > 0), `${where}: blank choice`).toBe(true)
    expect(new Set(choices).size, `${where}: duplicate choice`).toBe(choices.length)
    if (checkLength) {
      const lens = choices.map((c) => c.length)
      expect(Math.max(...lens) - Math.min(...lens), `${where}: length outlier`).toBeLessThan(10)
    }
  }

  it('every choice list is 4 distinct, non-blank options (short parts also length-balanced)', () => {
    for (const q of JLPT_POOL) {
      if (q.part === 'reading') q.questions.forEach((s, i) => check(s.choices, `${q.id}-${i}`, false))
      else check(q.choices, q.id, true)
    }
  })

  it('every answer index is in range', () => {
    for (const q of JLPT_POOL) {
      if (q.part === 'reading') {
        q.questions.forEach((s, i) => {
          expect(s.answer, `${q.id}-${i}`).toBeGreaterThanOrEqual(0)
          expect(s.answer, `${q.id}-${i}`).toBeLessThan(s.choices.length)
        })
      } else {
        expect(q.answer, q.id).toBeGreaterThanOrEqual(0)
        expect(q.answer, q.id).toBeLessThan(q.choices.length)
      }
    }
  })

  it('ordering questions carry segments matching their choices', () => {
    const ordering = JLPT_POOL.filter(
      (q): q is Extract<JlptQuestion, { part: 'grammar' }> =>
        q.part === 'grammar' && q.kind === 'ordering',
    )
    expect(ordering.length).toBeGreaterThanOrEqual(2)
    for (const q of ordering) {
      expect(q.segments, q.id).toBeDefined()
      expect([...(q.segments ?? [])].sort()).toEqual([...q.choices].sort())
    }
  })
})

describe('exam composition per level', () => {
  const playable = JLPT_LEVELS.filter((l) => hasContent(l, JLPT_POOL))

  it('all four levels have content', () => {
    expect(playable).toEqual(expect.arrayContaining(['N5', 'N4', 'N3', 'N2']))
  })

  for (const level of ['N5', 'N4', 'N3', 'N2'] as JlptLevel[]) {
    it(`${level} exam samples the planned counts (8/8/4/8 = 28)`, () => {
      const exam = buildExam(level, JLPT_POOL, seeded(7))
      const count = (p: string) => exam.filter((i) => i.part === p).length
      expect(count('vocab')).toBe(EXAM_PLAN.vocab)
      expect(count('grammar')).toBe(EXAM_PLAN.grammar)
      expect(count('listening')).toBe(EXAM_PLAN.listening)
      // reading: drawn from exactly EXAM_READING_PASSAGES passages
      const passages = new Set(
        exam.filter((i) => i.part === 'reading').map((i) => i.id.replace(/-\d+$/, '')),
      )
      expect(passages.size).toBe(EXAM_READING_PASSAGES)
      expect(exam).toHaveLength(28)
    })

    it(`${level} bank is larger than one exam (retakes vary)`, () => {
      const a = buildExam(level, JLPT_POOL, seeded(1)).map((i) => i.id)
      const b = buildExam(level, JLPT_POOL, seeded(99)).map((i) => i.id)
      expect(a).not.toEqual(b)
    })
  }
})
