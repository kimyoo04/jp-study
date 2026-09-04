// JLPT question model — a discriminated union, separate from the SRS Kana model.
// Level tag lives on every question so N4/N3/N2 are pure data additions later.
//
// NOTE: VocabQ.kind 'kanji-reading' (漢字読み) is distinct from JlptPart 'reading'
// (読解). Same English word, two concepts — keep them apart.

export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2'

/**
 * 화면에 보이는 순서(쉬운 것부터). 제목·설명·정적 본문이 모두 이 배열을 읽으므로
 * 레벨을 늘리면 메타데이터가 따라온다.
 *
 * types.ts 에 두는 이유: meta.ts 가 이걸 import 하는데, index.ts 에서 가져오면
 * JLPT_POOL(문항 4레벨 분량)이 초기 번들에 묶인다.
 */
export const JLPT_LEVELS: JlptLevel[] = ['N5', 'N4', 'N3', 'N2']
export type JlptPart = 'vocab' | 'grammar' | 'reading' | 'listening'

export const JLPT_PART_LABEL: Record<JlptPart, string> = {
  vocab: '文字・語彙',
  grammar: '文法',
  reading: '読解',
  listening: '聴解',
}

export const JLPT_PART_KO: Record<JlptPart, string> = {
  vocab: '문자·어휘',
  grammar: '문법',
  reading: '독해',
  listening: '청해',
}

interface Base {
  id: string
  level: JlptLevel
  part: JlptPart
}

// 文字・語彙: 漢字読み, 表記, 文脈規定, 言い換え — all "one line + 4 choices".
export interface VocabQ extends Base {
  part: 'vocab'
  kind: 'kanji-reading' | 'orthography' | 'context' | 'paraphrase'
  prompt: string // sentence/word, may contain an underlined or ___ blank
  choices: string[] // 4 options
  answer: number // index into choices
}

// 文法: 文法形式判断 (cloze) and 文の組み立て (ordering, MVP = pick the ★ filler).
export interface GrammarQ extends Base {
  part: 'grammar'
  kind: 'cloze' | 'ordering'
  prompt: string // cloze: sentence with ___; ordering: sentence with ★ marker
  segments?: string[] // ordering only: scrambled fragments shown for context
  choices: string[] // 4 options (cloze answer, or candidate ★ fillers)
  answer: number // index into choices (ordering too — keyed to choices, not segments)
}

// 読解: one passage, one or more sub-questions. Each sub-question is one scored item.
export interface ReadingQ extends Base {
  part: 'reading'
  passage: string
  questions: { prompt: string; choices: string[]; answer: number }[]
}

// 聴解: a script read aloud via ja-JP TTS (text fallback when no voice).
export interface ListeningQ extends Base {
  part: 'listening'
  script: string
  prompt: string
  choices: string[]
  answer: number
}

export type JlptQuestion = VocabQ | GrammarQ | ReadingQ | ListeningQ

// Flattened unit the exam runner, scorer, and progress bar all operate on.
// One ScoredItem == one graded question (reading sub-questions become separate items).
export interface ScoredItem {
  id: string // unique per scored item
  part: JlptPart
  prompt: string
  choices: string[]
  answer: number // index into choices
  passage?: string // present for reading items
  script?: string // present for listening items
  segments?: string[] // present for ordering items
}
