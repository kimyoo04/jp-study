import { useMemo, useState } from 'react'
import { clozeFilled, type Deck, type Kana } from '../data/kana'
import type { LessonItem, LessonMode } from '../lib/srs'
import { buildQuestion, isCorrect, pickQType, type Question } from '../lib/quiz'
import { clampIndex } from '../lib/deck'
import { hasJaVoice, primeSpeech, speakItem } from '../lib/speak'
import { playCorrect, playWrong } from '../lib/sound'
import { IntroCard } from './lesson/IntroCard'
import { Quiz } from './lesson/Quiz'
import { ExitConfirm } from './lesson/ExitConfirm'

export interface LessonResult {
  kana: Kana
  mode: LessonMode
  correct: boolean
}

interface Props {
  items: LessonItem[]
  pool: Kana[] // distractor pool for the active deck
  deck: Deck
  listenMode: boolean // user toggle: audio-prompt every quiz
  onComplete: (results: LessonResult[]) => void
  onExit: () => void
}

interface Step {
  item: LessonItem
  question?: Question
}

export function Lesson({ items, pool, deck, listenMode, onComplete, onExit }: Props) {
  // Assign question types up front. Listen mode forces audio prompts on every
  // deck; otherwise word decks quiz on meaning and kana decks round-robin
  // read/listen (dropping listen when no voice is available).
  const steps = useMemo<Step[]>(() => {
    const voice = hasJaVoice()
    let quizN = 0
    return items.map((item) => {
      if (item.mode === 'intro') return { item }
      const qtype = pickQType(deck.kind, listenMode, voice, quizN++)
      return { item, question: buildQuestion(item.kana, qtype, deck.kind, pool) }
    })
  }, [items, pool, deck.kind, listenMode])

  const [index, setIndex] = useState(0)
  // Answers are keyed by step index (not appended) so the user can move back and
  // forth without losing what they already did on each step.
  const [answers, setAnswers] = useState<Record<number, LessonResult>>({})
  const [picks, setPicks] = useState<Record<number, Kana>>({})
  const [confirmExit, setConfirmExit] = useState(false)

  const step = steps[index]
  const answered = answers[index] !== undefined
  const phase: 'answer' | 'feedback' = answered ? 'feedback' : 'answer'
  const picked = picks[index] ?? null
  const isLast = index + 1 >= steps.length
  const progressPct = Math.round((index / steps.length) * 100)

  function finish(final: Record<number, LessonResult>) {
    // Emit results in step order, skipping steps the user never completed.
    const ordered = steps.map((_, i) => final[i]).filter((r): r is LessonResult => r !== undefined)
    onComplete(ordered)
  }

  // Move forward: complete the lesson on the last step, otherwise step ahead.
  function forward(updated: Record<number, LessonResult>) {
    if (isLast) finish(updated)
    else setIndex(index + 1)
  }

  function sayCurrent() {
    // Cloze sentences read the completed form, not the blanked one.
    if (deck.kind === 'cloze') {
      speakItem({ kana: clozeFilled(step.item.kana), romaji: step.item.kana.romaji }, false)
      return
    }
    speakItem(step.item.kana, deck.kind === 'kanji')
  }

  function onIntroNext() {
    primeSpeech()
    sayCurrent()
    const updated = answered
      ? answers
      : { ...answers, [index]: { kana: step.item.kana, mode: step.item.mode, correct: true } }
    setAnswers(updated)
    forward(updated)
  }

  function onPick(option: Kana) {
    if (phase === 'feedback' || !step.question) return
    primeSpeech()
    const correct = isCorrect(step.question, option)
    setPicks({ ...picks, [index]: option })
    setAnswers({ ...answers, [index]: { kana: step.item.kana, mode: step.item.mode, correct } })
    if (correct) playCorrect()
    else playWrong()
    sayCurrent()
  }

  function onContinue() {
    forward(answers)
  }

  // Free navigation: jump back to review already-solved steps, or skip ahead
  // without answering. Clamped to the lesson bounds so multi-step jumps near an
  // edge land on the first/last step instead of overshooting.
  function jump(delta: number) {
    setIndex((i) => clampIndex(i + delta, steps.length))
  }

  function goPrev() {
    jump(-1)
  }

  function skip() {
    jump(1)
  }

  function onExitClick() {
    // Confirm once the user has made any progress (answered or advanced).
    if (index > 0 || phase === 'feedback' || Object.keys(answers).length > 0) setConfirmExit(true)
    else onExit()
  }

  return (
    <main className="screen lesson">
      <div className="lesson-top">
        <button className="link" onClick={onExitClick} aria-label="나가기">
          ✕
        </button>
        <button className="link nav-arrow" onClick={goPrev} disabled={index === 0} aria-label="이전 단계">
          ‹
        </button>
        <div className="progress-bar slim">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="counter">
          {index + 1}/{steps.length}
        </span>
        <button className="link nav-arrow" onClick={skip} disabled={isLast} aria-label="건너뛰기">
          ›
        </button>
      </div>

      {steps.length > 5 && (
        <div className="lesson-skip">
          {steps.length > 10 && (
            <button
              className="listen-jump"
              onClick={() => jump(-10)}
              disabled={index === 0}
              aria-label="10단계 뒤로"
            >
              «10
            </button>
          )}
          <button
            className="listen-jump"
            onClick={() => jump(-5)}
            disabled={index === 0}
            aria-label="5단계 뒤로"
          >
            «5
          </button>
          <button
            className="listen-jump"
            onClick={() => jump(5)}
            disabled={isLast}
            aria-label="5단계 건너뛰기"
          >
            5»
          </button>
          {steps.length > 10 && (
            <button
              className="listen-jump"
              onClick={() => jump(10)}
              disabled={isLast}
              aria-label="10단계 건너뛰기"
            >
              10»
            </button>
          )}
        </div>
      )}

      {step.question ? (
        <Quiz
          question={step.question}
          card={step.item.kana}
          deckKind={deck.kind}
          koReading={!!deck.koReading}
          phase={phase}
          picked={picked}
          onReplay={sayCurrent}
          onPick={onPick}
          onContinue={onContinue}
        />
      ) : (
        <IntroCard kana={step.item.kana} deck={deck} onSpeak={sayCurrent} onNext={onIntroNext} />
      )}

      {confirmExit && <ExitConfirm onStay={() => setConfirmExit(false)} onLeave={onExit} />}
    </main>
  )
}
