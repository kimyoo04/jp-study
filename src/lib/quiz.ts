// Pure question construction. Distractors come from the same gojūon row first
// (more confusable -> better practice), then fill from the rest. No side effects;
// randomness is injected so tests are deterministic.
import type { DeckKind, Kana } from '../data/kana'
import { HIRAGANA, ROW_OF } from '../data/kana'
import { shuffle, type Rng } from './rng'

export type QType = 'read' | 'listen' | 'meaning' | 'cloze'

/**
 * Decide a quiz step's type. Listen mode (user toggle) forces audio prompts on
 * every deck when a voice exists. Otherwise word/sentence decks quiz on meaning,
 * kanji round-robins meaning/read (음독·훈독 암기), and kana decks round-robin
 * read/listen, dropping listen when no voice is available.
 */
export function pickQType(
  deckKind: DeckKind,
  listenMode: boolean,
  hasVoice: boolean,
  quizIndex: number,
): QType {
  if (deckKind === 'cloze') return 'cloze'
  if (listenMode && hasVoice) return 'listen'
  if (deckKind === 'kanji') return quizIndex % 2 === 0 ? 'meaning' : 'read'
  if (deckKind !== 'kana') return 'meaning'
  if (!hasVoice) return 'read'
  return quizIndex % 2 === 0 ? 'read' : 'listen'
}

export interface Question {
  qtype: QType
  answer: Kana
  options: Kana[] // includes the answer; render via optionText()
}

/**
 * The text an option renders for this question type. Also the identity used to
 * keep options apart: two kana can share a romaji (じ/ぢ -> "ji") or a Korean
 * meaning (かく/にがい -> "쓰다"), and showing the same text twice makes one
 * "correct-looking" option silently wrong.
 */
export function optionText(opt: Kana, qtype: QType, deckKind: DeckKind): string {
  if (qtype === 'cloze') return opt.kana // cloze options are bare fragments
  if (qtype === 'read') return opt.romaji
  if (qtype === 'meaning') return opt.meaning ?? ''
  // listen: kana decks pick the glyph; other decks pick the meaning.
  return deckKind === 'kana' ? opt.kana : (opt.meaning ?? '')
}

/**
 * 보기 텍스트의 언어. optionText 와 같은 분기를 따른다 — 여기서 갈라지면
 * 화면이 일본어 보기를 한국어로 표시(읽기)하게 된다.
 */
export function optionLang(qtype: QType, deckKind: DeckKind): 'ja' | undefined {
  if (qtype === 'cloze') return 'ja'
  if (qtype === 'read' || qtype === 'meaning') return undefined
  return deckKind === 'kana' ? 'ja' : undefined
}

/**
 * Pick `count` distractors for `answer`: same row first, then global fill.
 * `textOf` is the displayed text — candidates that would render identically to
 * the answer (or to an already-picked distractor) are skipped.
 */
export function pickDistractors(
  answer: Kana,
  count: number,
  pool: Kana[] = HIRAGANA,
  rng: Rng = Math.random,
  textOf: (k: Kana) => string = (k) => k.kana,
): Kana[] {
  const sameRow = (ROW_OF[answer.kana] ?? []).filter((k) => k.kana !== answer.kana)
  const others = pool.filter(
    (k) => k.kana !== answer.kana && !sameRow.some((s) => s.kana === k.kana),
  )
  const ordered = [...shuffle(sameRow, rng), ...shuffle(others, rng)]

  const seenTexts = new Set([textOf(answer)])
  const picked: Kana[] = []
  for (const k of ordered) {
    if (picked.length >= count) break
    const text = textOf(k)
    if (seenTexts.has(text)) continue
    seenTexts.add(text)
    picked.push(k)
  }
  return picked
}

export function buildQuestion(
  answer: Kana,
  qtype: QType,
  deckKind: DeckKind = 'kana',
  pool: Kana[] = HIRAGANA,
  rng: Rng = Math.random,
  optionCount = 4,
): Question {
  // Cloze cards carry their own answer fragment + fixed distractors, so options
  // come from the card itself rather than a shared pool. The answer option's
  // `kana` is the fragment (used by isCorrect/optionText); the sentence prompt is
  // rendered from the original card by the caller.
  if (qtype === 'cloze') {
    const correct: Kana = { kana: answer.answer ?? '', romaji: answer.romaji }
    const distractors: Kana[] = (answer.choices ?? []).map((c) => ({ kana: c, romaji: '' }))
    return { qtype, answer: correct, options: shuffle([correct, ...distractors], rng) }
  }
  const textOf = (k: Kana) => optionText(k, qtype, deckKind)
  const distractors = pickDistractors(answer, optionCount - 1, pool, rng, textOf)
  const options = shuffle([answer, ...distractors], rng)
  return { qtype, answer, options }
}

export function isCorrect(q: Question, picked: Kana): boolean {
  return picked.kana === q.answer.kana
}
