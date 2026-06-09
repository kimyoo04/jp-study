import { useMemo, useState } from 'react'
import type { Kana } from '../data/kana'
import type { LessonItem } from '../lib/srs'
import { buildQuestion, isCorrect, type Question, type QType } from '../lib/quiz'
import { hasJaVoice, primeSpeech, speak } from '../lib/speak'
import { playCorrect, playWrong } from '../lib/sound'

interface Props {
  items: LessonItem[]
  pool: Kana[] // distractor pool for the active deck
  onComplete: (
    results: { kana: string; mode: LessonItem['mode']; correct: boolean }[],
  ) => void
  onExit: () => void
}

interface Step {
  item: LessonItem
  question?: Question
}

export function Lesson({ items, pool, onComplete, onExit }: Props) {
  // Assign question types up front (round-robin read/listen; drop listen if no voice).
  const steps = useMemo<Step[]>(() => {
    const voice = hasJaVoice()
    let quizN = 0
    return items.map((item) => {
      if (item.mode === 'intro') return { item }
      const qtype: QType = !voice ? 'read' : quizN++ % 2 === 0 ? 'read' : 'listen'
      return { item, question: buildQuestion(item.kana, qtype, pool) }
    })
  }, [items, pool])

  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'answer' | 'feedback'>('answer')
  const [picked, setPicked] = useState<Kana | null>(null)
  const [results, setResults] = useState<
    { kana: string; mode: LessonItem['mode']; correct: boolean }[]
  >([])

  const step = steps[index]
  const progressPct = Math.round((index / steps.length) * 100)

  function record(correct: boolean) {
    return [...results, { kana: step.item.kana.kana, mode: step.item.mode, correct }]
  }

  function advance(next: typeof results) {
    if (index + 1 >= steps.length) {
      onComplete(next)
      return
    }
    setResults(next)
    setIndex(index + 1)
    setPhase('answer')
    setPicked(null)
  }

  function onIntroNext() {
    primeSpeech()
    speak(step.item.kana.kana)
    advance(record(true))
  }

  function onPick(option: Kana) {
    if (phase === 'feedback') return
    primeSpeech()
    const correct = isCorrect(step.question!, option)
    setPicked(option)
    setPhase('feedback')
    if (correct) playCorrect()
    else playWrong()
    speak(step.item.kana.kana)
  }

  function onContinue() {
    const correct = isCorrect(step.question!, picked!)
    advance(record(correct))
  }

  return (
    <main className="screen lesson">
      <div className="lesson-top">
        <button className="link" onClick={onExit} aria-label="나가기">
          ✕
        </button>
        <div className="progress-bar slim">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="counter">
          {index + 1}/{steps.length}
        </span>
      </div>

      {step.item.mode === 'intro' ? (
        <section className="card intro">
          <p className="prompt-label">새 글자</p>
          <div className="glyph big">{step.item.kana.kana}</div>
          <div className="romaji">{step.item.kana.romaji}</div>
          <button
            className="btn-ghost"
            onClick={() => {
              primeSpeech()
              speak(step.item.kana.kana)
            }}
          >
            🔊 발음 듣기
          </button>
          <button className="btn-primary" onClick={onIntroNext}>
            다음
          </button>
        </section>
      ) : (
        <Quiz
          question={step.question!}
          phase={phase}
          picked={picked}
          onPick={onPick}
          onContinue={onContinue}
        />
      )}
    </main>
  )
}

function Quiz({
  question,
  phase,
  picked,
  onPick,
  onContinue,
}: {
  question: Question
  phase: 'answer' | 'feedback'
  picked: Kana | null
  onPick: (k: Kana) => void
  onContinue: () => void
}) {
  const listen = question.qtype === 'listen'
  return (
    <section className="card quiz">
      {listen ? (
        <>
          <p className="prompt-label">소리를 듣고 글자를 고르세요</p>
          <button className="btn-ghost big-audio" onClick={() => speak(question.answer.kana)}>
            🔊
          </button>
        </>
      ) : (
        <>
          <p className="prompt-label">이 글자의 읽기는?</p>
          <div className="glyph big">{question.answer.kana}</div>
        </>
      )}

      <div className="options">
        {question.options.map((opt) => {
          const isAnswer = opt.kana === question.answer.kana
          const isPicked = picked?.kana === opt.kana
          const cls =
            phase === 'feedback'
              ? isAnswer
                ? 'opt correct'
                : isPicked
                  ? 'opt wrong'
                  : 'opt dim'
              : 'opt'
          return (
            <button
              key={opt.kana}
              className={cls}
              data-correct={isAnswer || undefined}
              disabled={phase === 'feedback'}
              onClick={() => onPick(opt)}
            >
              {listen ? opt.kana : opt.romaji}
            </button>
          )
        })}
      </div>

      {phase === 'feedback' && (
        <button className="btn-primary" onClick={onContinue}>
          계속
        </button>
      )}
    </section>
  )
}
