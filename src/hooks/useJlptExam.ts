// JLPT mock-exam flow state, separate from the SRS lesson loop. Owns the exam
// data + scoring/persistence; the App keeps the screen transitions so each
// action returns whether it succeeded (empty pool / no saved exam → false).
import { useState } from 'react'
import { JLPT_POOL } from '../data/jlpt'
import type { JlptLevel, ScoredItem } from '../data/jlpt/types'
import {
  appendResult,
  buildExam,
  clearProgress,
  loadProgress,
  scoreExam,
  type ExamResult,
} from '../lib/jlpt'

export function useJlptExam() {
  const [level, setLevel] = useState<JlptLevel>('N5')
  const [items, setItems] = useState<ScoredItem[]>([])
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [idx, setIdx] = useState(0)
  const [startedAt, setStartedAt] = useState(0)
  const [result, setResult] = useState<ExamResult | null>(null)
  const [durationSec, setDurationSec] = useState(0)

  // Build and start a fresh exam. Returns false (and changes nothing) when the
  // pool can't fill an exam for this level.
  function start(forLevel: JlptLevel): boolean {
    const exam = buildExam(forLevel, JLPT_POOL)
    if (exam.length === 0) return false
    clearProgress()
    setLevel(forLevel)
    setItems(exam)
    setAnswers(exam.map(() => null))
    setIdx(0)
    setStartedAt(Date.now())
    return true
  }

  // Resume a previously saved (in-progress) exam. Returns false when none saved.
  function resume(): boolean {
    const saved = loadProgress()
    if (!saved) return false
    setLevel(saved.level)
    setItems(saved.items)
    setAnswers(saved.answers)
    setIdx(saved.idx)
    setStartedAt(saved.startedAt)
    return true
  }

  // Score + persist a completed exam, exposing the result for the report screen.
  function finish(examItems: ScoredItem[], examAnswers: (number | null)[]) {
    const scored = scoreExam(examItems, examAnswers)
    const secs = startedAt ? Math.round((Date.now() - startedAt) / 1000) : 0
    appendResult({
      level,
      takenAt: new Date().toISOString(),
      partScores: scored.partScores,
      weakestPart: scored.weakestPart,
      durationSec: secs,
    })
    clearProgress()
    setItems(examItems)
    setAnswers(examAnswers)
    setResult(scored)
    setDurationSec(secs)
  }

  return { level, items, answers, idx, startedAt, result, durationSec, start, resume, finish }
}
