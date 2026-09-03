import { useEffect, useMemo, useState } from 'react'
import { clozeFilled, type Deck, type Kana } from '../data/kana'
import type { LessonItem, LessonMode } from '../lib/srs'
import { buildQuestion, isCorrect, pickQType, type Question } from '../lib/quiz'
import { clampIndex } from '../lib/deck'
import { hasJaVoice, primeSpeech, speakItem } from '../lib/speak'
import { playCorrect, playWrong } from '../lib/sound'
import { IntroCard } from './lesson/IntroCard'
import { Quiz } from './lesson/Quiz'
import { ExitConfirm } from './lesson/ExitConfirm'
import { ProgressHeader } from './ProgressHeader'

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

  // Back one step, to review an already-answered step (read-only feedback).
  function goPrev() {
    setIndex((i) => clampIndex(i - 1, steps.length))
  }

  function onExitClick() {
    // Confirm once the user has made any progress (answered or advanced).
    if (index > 0 || phase === 'feedback' || Object.keys(answers).length > 0) setConfirmExit(true)
    else onExit()
  }

  // Keyboard controls mirror the on-screen buttons so the quiz is fully playable
  // from a keyboard: 1–4 pick an option (answer phase), Enter/Space advances
  // (intro 다음 · feedback 계속), ← steps back, R replays audio, Esc exits.
  // Re-binds whenever the branching state changes, so the closures stay fresh.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (confirmExit) {
        if (e.key === 'Escape') setConfirmExit(false)
        return
      }
      if (e.key === 'Escape') {
        onExitClick()
      } else if (e.key === 'ArrowLeft') {
        if (index > 0) {
          e.preventDefault()
          goPrev()
        }
      } else if (
        (e.key === 'r' || e.key === 'R' || e.code === 'KeyR') &&
        (step.question?.qtype === 'listen' || (step.question && phase === 'feedback'))
      ) {
        // Replay on listen questions (where the sound is the prompt) and on any
        // graded step, matching the 🔊 in the feedback panel.
        // Match the physical R key too: a Korean/Japanese IME rewrites e.key
        // (to 'ㄱ' or 'Process'), so key-only matching silently fails.
        e.preventDefault()
        sayCurrent()
      } else if (step.question && phase === 'answer' && /^[1-9]$/.test(e.key)) {
        const opt = step.question.options[Number(e.key) - 1]
        if (opt) {
          e.preventDefault()
          onPick(opt)
        }
      } else if (e.key === 'Enter' || e.key === ' ') {
        if (!step.question) {
          e.preventDefault()
          onIntroNext()
        } else if (phase === 'feedback') {
          e.preventDefault()
          onContinue()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmExit, index, phase, step])

  return (
    <main className="screen lesson">
      {/* 상단 바는 ✕·←·진행바·카운터로 가득해 제목을 시각적으로 넣을 자리가
          없다. 그래도 문서에 h1 은 있어야 한다 — 없으면 제목 탐색이 죽는다. */}
      <h1 className="sr-only">{deck.label} 레슨</h1>
      <ProgressHeader
        index={index}
        total={steps.length}
        onExit={onExitClick}
        onBack={goPrev}
        exitKey="Esc"
        backKey="←"
      />

      {step.question ? (
        <Quiz
          question={step.question}
          card={step.item.kana}
          deckKind={deck.kind}
          koReading={!!deck.koReading}
          canSpeak={hasJaVoice()}
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
