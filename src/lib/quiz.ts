// Pure question construction. Distractors come from the same gojūon row first
// (more confusable -> better practice), then fill from the rest. No side effects;
// randomness is injected so tests are deterministic.
import type { Kana } from '../data/kana'
import { HIRAGANA, ROW_OF } from '../data/kana'

export type QType = 'read' | 'listen' | 'meaning'

export interface Question {
  qtype: QType
  answer: Kana
  options: Kana[] // includes the answer; render romaji (read) or kana (listen)
}

type Rng = () => number

function shuffle<T>(arr: T[], rng: Rng): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Pick `count` distractors for `answer`: same row first, then global fill. */
export function pickDistractors(
  answer: Kana,
  count: number,
  pool: Kana[] = HIRAGANA,
  rng: Rng = Math.random,
): Kana[] {
  const sameRow = (ROW_OF[answer.kana] ?? []).filter((k) => k.kana !== answer.kana)
  const others = pool.filter(
    (k) => k.kana !== answer.kana && !sameRow.some((s) => s.kana === k.kana),
  )
  const ordered = [...shuffle(sameRow, rng), ...shuffle(others, rng)]
  return ordered.slice(0, count)
}

export function buildQuestion(
  answer: Kana,
  qtype: QType,
  pool: Kana[] = HIRAGANA,
  rng: Rng = Math.random,
  optionCount = 4,
): Question {
  const distractors = pickDistractors(answer, optionCount - 1, pool, rng)
  const options = shuffle([answer, ...distractors], rng)
  return { qtype, answer, options }
}

export function isCorrect(q: Question, picked: Kana): boolean {
  return picked.kana === q.answer.kana
}
