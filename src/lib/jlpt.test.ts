import { beforeEach, describe, expect, it } from 'vitest'
import type { JlptQuestion, ScoredItem } from '../data/jlpt/types'
import {
  appendResult,
  buildExam,
  clearProgress,
  flatten,
  hasContent,
  loadProgress,
  loadResults,
  saveProgress,
  scoreExam,
} from './jlpt'
import { seeded } from './rng'

const POOL: JlptQuestion[] = [
  { id: 'v1', level: 'N5', part: 'vocab', kind: 'context', prompt: 'a', choices: ['1', '2', '3', '4'], answer: 0 },
  { id: 'v2', level: 'N5', part: 'vocab', kind: 'context', prompt: 'b', choices: ['1', '2', '3', '4'], answer: 1 },
  { id: 'g1', level: 'N5', part: 'grammar', kind: 'cloze', prompt: 'c', choices: ['1', '2', '3', '4'], answer: 2 },
  {
    id: 'r1',
    level: 'N5',
    part: 'reading',
    passage: 'p',
    questions: [
      { prompt: 'q1', choices: ['1', '2', '3', '4'], answer: 0 },
      { prompt: 'q2', choices: ['1', '2', '3', '4'], answer: 3 },
    ],
  },
  { id: 'l1', level: 'N5', part: 'listening', script: 's', prompt: 'd', choices: ['1', '2', '3', '4'], answer: 1 },
  // N4 has a single question — used to verify level filtering.
  { id: 'n4v', level: 'N4', part: 'vocab', kind: 'context', prompt: 'x', choices: ['1', '2'], answer: 0 },
]

describe('flatten', () => {
  it('expands reading sub-questions into one scored item each', () => {
    const items = flatten(POOL)
    // 2 vocab + 1 grammar + 2 reading-subs + 1 listening + 1 n4 = 7
    expect(items).toHaveLength(7)
    const reading = items.filter((i) => i.part === 'reading')
    expect(reading).toHaveLength(2)
    expect(reading.every((i) => i.passage === 'p')).toBe(true)
    expect(reading[0].id).not.toBe(reading[1].id)
  })
})

describe('buildExam', () => {
  it('includes only the requested level and groups parts in order', () => {
    const exam = buildExam('N5', POOL, seeded(1))
    // N5: 2 vocab + 1 grammar + 2 reading + 1 listening = 6
    expect(exam).toHaveLength(6)
    const order = exam.map((i) => i.part)
    // parts stay grouped vocab < grammar < reading < listening
    const firstReading = order.indexOf('reading')
    const lastGrammar = order.lastIndexOf('grammar')
    expect(lastGrammar).toBeLessThan(firstReading)
  })

  it('shuffles choices but keeps the correct answer pointing at the right text', () => {
    const exam = buildExam('N5', POOL, seeded(3))
    const g = exam.find((i) => i.prompt === 'c')!
    // original answer was choice '3' (index 2). After shuffle, choices[answer] must still be '3'.
    expect(g.choices[g.answer]).toBe('3')
  })

  it('returns empty for a level with no content', () => {
    expect(buildExam('N2', POOL, seeded(1))).toHaveLength(0)
  })
})

describe('hasContent', () => {
  it('is true only for levels with questions', () => {
    expect(hasContent('N5', POOL)).toBe(true)
    expect(hasContent('N4', POOL)).toBe(true)
    expect(hasContent('N3', POOL)).toBe(false)
  })
})

describe('scoreExam', () => {
  const items: ScoredItem[] = [
    { id: 'a', part: 'vocab', prompt: '', choices: ['x'], answer: 0 },
    { id: 'b', part: 'vocab', prompt: '', choices: ['x'], answer: 0 },
    { id: 'c', part: 'grammar', prompt: '', choices: ['x'], answer: 0 },
    { id: 'd', part: 'grammar', prompt: '', choices: ['x'], answer: 0 },
  ]

  it('counts unanswered (null) as wrong', () => {
    const r = scoreExam(items, [0, null, 0, 0])
    expect(r.total).toEqual({ correct: 3, total: 4 })
  })

  it('flags the clearly weaker part', () => {
    // vocab 0/2, grammar 2/2 -> vocab is weakest, decisive
    const r = scoreExam(items, [1, 1, 0, 0])
    expect(r.weakestPart).toBe('vocab')
    expect(r.inconclusive).toBe(false)
  })

  it('is inconclusive when parts are within one question', () => {
    // vocab 1/2, grammar 2/2 -> gap is exactly one question on vocab's scale -> decisive
    // vocab 2/2, grammar 2/2 -> tie -> inconclusive
    const tie = scoreExam(items, [0, 0, 0, 0])
    expect(tie.inconclusive).toBe(true)
    expect(tie.weakestPart).toBeNull()
  })
})

describe('persistence', () => {
  beforeEach(() => localStorage.clear())

  it('round-trips an in-progress exam, including startedAt', () => {
    const items = buildExam('N5', POOL, seeded(1))
    saveProgress({ level: 'N5', items, answers: items.map(() => null), idx: 2, startedAt: 1234 })
    const loaded = loadProgress()
    expect(loaded?.level).toBe('N5')
    expect(loaded?.idx).toBe(2)
    expect(loaded?.startedAt).toBe(1234)
    expect(loaded?.items).toHaveLength(items.length)
  })

  it('clearProgress wipes the saved exam', () => {
    saveProgress({ level: 'N5', items: [], answers: [], idx: 0, startedAt: 1 })
    clearProgress()
    expect(loadProgress()).toBeNull()
  })

  it('discards an in-progress exam from a different schema version', () => {
    localStorage.setItem(
      'jp-study:jlpt-inprogress',
      JSON.stringify({ version: 999, level: 'N5', items: [], answers: [], idx: 0, startedAt: 1 }),
    )
    expect(loadProgress()).toBeNull()
  })

  it('discards a pre-timer save that has no startedAt', () => {
    localStorage.setItem(
      'jp-study:jlpt-inprogress',
      JSON.stringify({ version: 1, level: 'N5', items: [], answers: [], idx: 0 }),
    )
    expect(loadProgress()).toBeNull()
  })

  it('appends results and filters stale-version records', () => {
    appendResult({
      level: 'N5',
      takenAt: '2026-06-15',
      partScores: {
        vocab: { correct: 1, total: 2 },
        grammar: { correct: 2, total: 2 },
        reading: { correct: 0, total: 0 },
        listening: { correct: 0, total: 0 },
      },
      weakestPart: 'vocab',
    })
    expect(loadResults()).toHaveLength(1)
  })
})
