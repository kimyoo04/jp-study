// Pure SRS (spaced repetition) logic — no React, no localStorage, no side effects.
// Scheduling is measured in LESSON COUNT, not wall-clock time (fits a static app
// and keeps every function trivially unit-testable).
//
//   box:  1 ───correct──▶ 2 ───correct──▶ 3 ─▶ 4 ─▶ 5  (interval grows)
//          ▲──────────────wrong──────────────────────┘  (reset to 1)
//
import type { Kana } from '../data/kana'

export interface Card {
  box: number // Leitner box 1..5
  dueLesson: number // becomes due when lessonsDone >= this
  seen: number
  correct: number
}

export interface Progress {
  version: number
  kana: Record<string, Card> // keyed by kana char
  lessonsDone: number
  lastPlayed: string // YYYY-MM-DD
}

export const PROGRESS_VERSION = 1
export const LESSON_SIZE = 6
/** "Learned" for the progress bar = box at or above this. */
export const LEARNED_BOX = 3

/** box -> how many lessons until the card is due again. */
export const INTERVALS: Record<number, number> = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 }

export function emptyProgress(): Progress {
  return { version: PROGRESS_VERSION, kana: {}, lessonsDone: 0, lastPlayed: '' }
}

export function newCard(lessonsDone: number): Card {
  return { box: 1, dueLesson: lessonsDone, seen: 0, correct: 0 }
}

/**
 * Card state after a glyph is shown for the first time (intro card, not graded).
 * Box stays 1; scheduled to come back next lesson. `base` is the lesson count
 * AFTER the current lesson completes.
 */
export function introducedCard(base: number): Card {
  return { box: 1, dueLesson: base + intervalFor(1), seen: 1, correct: 0 }
}

export function nextBox(box: number, correct: boolean): number {
  if (!correct) return 1
  return Math.min(box + 1, 5)
}

export function intervalFor(box: number): number {
  return INTERVALS[Math.min(Math.max(box, 1), 5)]
}

export function isDue(card: Card, lessonsDone: number): boolean {
  return card.dueLesson <= lessonsDone
}

/** Returns an updated card after one answer. Pure — does not mutate input. */
export function applyAnswer(card: Card, correct: boolean, lessonsDone: number): Card {
  const box = nextBox(card.box, correct)
  return {
    box,
    dueLesson: lessonsDone + intervalFor(box),
    seen: card.seen + 1,
    correct: card.correct + (correct ? 1 : 0),
  }
}

export function learnedCount(progress: Progress): number {
  return Object.values(progress.kana).filter((c) => c.box >= LEARNED_BOX).length
}

/** Learned count restricted to a single deck's kana set. */
export function learnedCountFor(progress: Progress, deckKana: Kana[]): number {
  return deckKana.filter((k) => (progress.kana[k.kana]?.box ?? 0) >= LEARNED_BOX).length
}

/**
 * Weakest items in a deck: seen at least once but not yet learned (box < 3),
 * worst first (lowest box, then most misses). Used by the Home "review weak" button.
 */
export function weakItems(progress: Progress, deckKana: Kana[], limit = LESSON_SIZE): Kana[] {
  return deckKana
    .filter((k) => {
      const c = progress.kana[k.kana]
      return c && c.seen > 0 && c.box < LEARNED_BOX
    })
    .sort((a, b) => {
      const ca = progress.kana[a.kana]
      const cb = progress.kana[b.kana]
      if (ca.box !== cb.box) return ca.box - cb.box
      return cb.seen - cb.correct - (ca.seen - ca.correct)
    })
    .slice(0, limit)
}

export type LessonMode = 'intro' | 'quiz'
export interface LessonItem {
  kana: Kana
  mode: LessonMode
}

/**
 * Pick the kana for the next lesson, in this priority:
 *   1. due review cards (already introduced), earliest dueLesson first  -> 'quiz'
 *   2. brand-new kana in teaching order                                  -> 'intro'
 *   3. fallback: if nothing due and nothing new, review lowest-box cards  -> 'quiz'
 * Cold start (no progress) => all 'intro'. Never returns an empty lesson
 * unless there is genuinely no content.
 */
export function selectLessonKana(
  progress: Progress,
  order: Kana[],
  size: number = LESSON_SIZE,
): LessonItem[] {
  const introduced = (k: Kana) => progress.kana[k.kana] !== undefined
  const items: LessonItem[] = []

  // Selection happens BEFORE this lesson completes, so the lesson being built is
  // numbered lessonsDone + 1. A card is due if scheduled at or before that lesson.
  const upcoming = progress.lessonsDone + 1

  const due = order
    .filter((k) => introduced(k) && isDue(progress.kana[k.kana], upcoming))
    .sort((a, b) => progress.kana[a.kana].dueLesson - progress.kana[b.kana].dueLesson)
  for (const k of due) {
    if (items.length >= size) break
    items.push({ kana: k, mode: 'quiz' })
  }

  for (const k of order) {
    if (items.length >= size) break
    if (!introduced(k)) items.push({ kana: k, mode: 'intro' })
  }

  if (items.length === 0) {
    const byBox = order
      .filter(introduced)
      .sort((a, b) => progress.kana[a.kana].box - progress.kana[b.kana].box)
    for (const k of byBox) {
      if (items.length >= size) break
      items.push({ kana: k, mode: 'quiz' })
    }
  }

  return items
}

/**
 * Build one continuous study SESSION (not a fixed 6-card lesson). A session runs
 * from はじめる to completion and spans what used to be several lessons, so the
 * skip controls (≫1/≫5/≫10) have room to move:
 *   1. ALL due review cards, earliest dueLesson first — UNLIMITED ('quiz').
 *      The more reviews are backed up, the longer the session.
 *   2. New cards in teaching order — FENCED at `newCap` ('intro'), so a cold
 *      start (whole new deck) doesn't become a 100-card marathon.
 *   3. Fallback: nothing due and nothing new -> lowest-box reviews, up to newCap.
 * With "reviews unlimited + each item once per session", grabbing the whole queue
 * up front is equivalent to pulling batches on demand (SRS order, no dupes), and
 * simpler — so we resolve the full session at start.
 */
export function selectSessionItems(
  progress: Progress,
  order: Kana[],
  newCap: number = LESSON_SIZE,
): LessonItem[] {
  const introduced = (k: Kana) => progress.kana[k.kana] !== undefined
  const upcoming = progress.lessonsDone + 1
  const items: LessonItem[] = []

  // 1. Every due review, soonest-due first. No cap.
  const due = order
    .filter((k) => introduced(k) && isDue(progress.kana[k.kana], upcoming))
    .sort((a, b) => progress.kana[a.kana].dueLesson - progress.kana[b.kana].dueLesson)
  for (const k of due) items.push({ kana: k, mode: 'quiz' })

  // 2. New introductions, teaching order, fenced at newCap.
  let newCount = 0
  for (const k of order) {
    if (newCount >= newCap) break
    if (!introduced(k)) {
      items.push({ kana: k, mode: 'intro' })
      newCount++
    }
  }

  // 3. Fallback: everything introduced and nothing due -> review weakest first.
  if (items.length === 0) {
    const byBox = order
      .filter(introduced)
      .sort((a, b) => progress.kana[a.kana].box - progress.kana[b.kana].box)
    for (const k of byBox) {
      if (items.length >= newCap) break
      items.push({ kana: k, mode: 'quiz' })
    }
  }

  return items
}
