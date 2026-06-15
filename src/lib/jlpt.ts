// JLPT exam engine: flatten questions into scored items, assemble an exam,
// score it into per-part results, and persist in-progress + history to
// localStorage. Pure/deterministic where it matters (rng injected for tests).

import type {
  JlptLevel,
  JlptPart,
  JlptQuestion,
  ScoredItem,
} from '../data/jlpt/types'
import { shuffle, type Rng } from './rng'
import { loadJson, saveJson } from './storage'

// Canonical part order — exam runs sections in this order (matches real JLPT).
export const PART_ORDER: JlptPart[] = ['vocab', 'grammar', 'reading', 'listening']

/**
 * Expand questions into one ScoredItem per graded question. Reading passages
 * fan out into one item per sub-question (each sub-question is scored), every
 * other part is one item. Without this, "question index" and "scored item"
 * drift apart and the progress bar / scoring break.
 */
export function flatten(questions: JlptQuestion[]): ScoredItem[] {
  const items: ScoredItem[] = []
  for (const q of questions) {
    if (q.part === 'reading') {
      q.questions.forEach((sub, i) => {
        items.push({
          id: `${q.id}-${i}`,
          part: 'reading',
          prompt: sub.prompt,
          choices: sub.choices,
          answer: sub.answer,
          passage: q.passage,
        })
      })
    } else if (q.part === 'listening') {
      items.push({
        id: q.id,
        part: 'listening',
        prompt: q.prompt,
        choices: q.choices,
        answer: q.answer,
        script: q.script,
      })
    } else {
      // vocab | grammar
      items.push({
        id: q.id,
        part: q.part,
        prompt: q.prompt,
        choices: q.choices,
        answer: q.answer,
        segments: q.part === 'grammar' ? q.segments : undefined,
      })
    }
  }
  return items
}

/** Shuffle one item's choices, remapping the answer index to the new position. */
function shuffleChoices(item: ScoredItem, rng: Rng): ScoredItem {
  const order = shuffle(
    item.choices.map((_, i) => i),
    rng,
  )
  const choices = order.map((i) => item.choices[i])
  const answer = order.indexOf(item.answer)
  return { ...item, choices, answer }
}

/**
 * Build an exam for `level`: keep parts grouped in PART_ORDER (so the section
 * label is meaningful), shuffle item order *within* each part, and shuffle each
 * item's choices so retakes don't test answer-position memory.
 */
export function buildExam(
  level: JlptLevel,
  pool: JlptQuestion[],
  rng: Rng = Math.random,
): ScoredItem[] {
  const forLevel = pool.filter((q) => q.level === level)
  const all = flatten(forLevel)
  const out: ScoredItem[] = []
  for (const part of PART_ORDER) {
    const inPart = shuffle(
      all.filter((it) => it.part === part),
      rng,
    )
    for (const it of inPart) out.push(shuffleChoices(it, rng))
  }
  return out
}

/** Whether `level` has any content yet (drives the "준비 중" disabled state). */
export function hasContent(level: JlptLevel, pool: JlptQuestion[]): boolean {
  return pool.some((q) => q.level === level)
}

export type PartScore = { correct: number; total: number }

export interface ExamResult {
  partScores: Record<JlptPart, PartScore>
  total: PartScore
  /** null when the weakest part can't be told apart from the next (inconclusive). */
  weakestPart: JlptPart | null
  inconclusive: boolean
}

/**
 * Score answers (null = unanswered = wrong). Per-part percent decides the weak
 * area. If the two weakest parts are within one question's worth of each other,
 * the result is inconclusive — better than a confidently wrong weakness label.
 */
export function scoreExam(items: ScoredItem[], answers: (number | null)[]): ExamResult {
  const partScores = {} as Record<JlptPart, PartScore>
  for (const part of PART_ORDER) partScores[part] = { correct: 0, total: 0 }

  items.forEach((item, i) => {
    const s = partScores[item.part]
    s.total += 1
    if (answers[i] === item.answer) s.correct += 1
  })

  const total: PartScore = { correct: 0, total: 0 }
  for (const part of PART_ORDER) {
    total.correct += partScores[part].correct
    total.total += partScores[part].total
  }

  // Rank parts that actually have questions by percent (asc), tie-break by fewer raw correct.
  const ranked = PART_ORDER.filter((p) => partScores[p].total > 0)
    .map((p) => ({
      part: p,
      pct: partScores[p].correct / partScores[p].total,
      correct: partScores[p].correct,
      one: 1 / partScores[p].total, // one question's worth, on this part's scale
    }))
    .sort((a, b) => a.pct - b.pct || a.correct - b.correct)

  let weakestPart: JlptPart | null = null
  let inconclusive = true
  if (ranked.length === 1) {
    weakestPart = ranked[0].part
    inconclusive = false
  } else if (ranked.length > 1) {
    const [first, second] = ranked
    // Decisive only if the weakest is at least one full question worse than the next.
    if (second.pct - first.pct >= first.one - 1e-9) {
      weakestPart = first.part
      inconclusive = false
    }
  }

  return { partScores, total, weakestPart, inconclusive }
}

// ---- Persistence -----------------------------------------------------------

const RESULTS_KEY = 'jp-study:jlpt-results'
const PROGRESS_KEY = 'jp-study:jlpt-inprogress'
const SCHEMA_VERSION = 1

export interface JlptResult {
  version: number
  level: JlptLevel
  takenAt: string // ISO date
  partScores: Record<JlptPart, PartScore>
  weakestPart: JlptPart | null
}

export interface InProgress {
  version: number
  level: JlptLevel
  items: ScoredItem[]
  answers: (number | null)[]
  idx: number
}

/** Saved exam history, newest last. Drops records from an older schema. */
export function loadResults(): JlptResult[] {
  const raw = loadJson<JlptResult[]>(RESULTS_KEY)
  if (!raw) return []
  return raw.filter((r) => r.version === SCHEMA_VERSION)
}

export function appendResult(result: Omit<JlptResult, 'version'>): void {
  const all = loadResults()
  all.push({ ...result, version: SCHEMA_VERSION })
  saveJson(RESULTS_KEY, all)
}

export function saveProgress(p: Omit<InProgress, 'version'>): void {
  saveJson(PROGRESS_KEY, { ...p, version: SCHEMA_VERSION })
}

/** Resume an in-progress exam, or null if none / stale schema / corrupt. */
export function loadProgress(): InProgress | null {
  const raw = loadJson<InProgress>(PROGRESS_KEY)
  if (!raw || raw.version !== SCHEMA_VERSION) return null
  if (!Array.isArray(raw.items) || !Array.isArray(raw.answers)) return null
  return raw
}

export function clearProgress(): void {
  saveJson(PROGRESS_KEY, null)
}
