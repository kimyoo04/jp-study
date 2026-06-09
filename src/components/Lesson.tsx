import { useMemo, useState } from 'react'
import type { DeckKind, Kana } from '../data/kana'
import type { LessonItem, LessonMode } from '../lib/srs'
import { buildQuestion, isCorrect, type Question, type QType } from '../lib/quiz'
import { hasJaVoice, primeSpeech, speak } from '../lib/speak'
import { playCorrect, playWrong } from '../lib/sound'

export interface LessonResult {
  kana: Kana
  mode: LessonMode
  correct: boolean
}

interface Props {
  items: LessonItem[]
  pool: Kana[] // distractor pool for the active deck
  deckKind: DeckKind
  onComplete: (results: LessonResult[]) => void
  onExit: () => void
}

interface Step {
  item: LessonItem
  question?: Question
}

export function Lesson({ items, pool, deckKind, onComplete, onExit }: Props) {
  // Assign question types up front. Word decks quiz on meaning; kana decks
  // round-robin read/listen (dropping listen when no voice is available).
  const steps = useMemo<Step[]>(() => {
    const voice = hasJaVoice()
    let quizN = 0
    return items.map((item) => {
      if (item.mode === 'intro') return { item }
      let qtype: QType
      if (deckKind === 'words') qtype = 'meaning'
      else qtype = !voice ? 'read' : quizN++ % 2 === 0 ? 'read' : 'listen'
      return { item, question: buildQuestion(item.kana, qtype, pool) }
    })
  }, [items, pool, deckKind])

  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'answer' | 'feedback'>('answer')
  const [picked, setPicked] = useState<Kana | null>(null)
  const [results, setResults] = useState<LessonResult[]>([])

  const step = steps[index]
  const isWord = deckKind === 'words'
  const progressPct = Math.round((index / steps.length) * 100)

  function record(correct: boolean): LessonResult[] {
    return [...results, { kana: step.item.kana, mode: step.item.mode, correct }]
  }

  function advance(next: LessonResult[]) {
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
    advance(record(isCorrect(step.question!, picked!)))
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
          <p className="prompt-label">{isWord ? '새 단어' : '새 글자'}</p>
          <div className={isWord ? 'glyph word' : 'glyph big'}>{step.item.kana.kana}</div>
          <div className="romaji">{step.item.kana.romaji}</div>
          {isWord && step.item.kana.meaning && (
            <div className="meaning">{step.item.kana.meaning}</div>
          )}
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
          isWord={isWord}
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
  isWord,
  phase,
  picked,
  onPick,
  onContinue,
}: {
  question: Question
  isWord: boolean
  phase: 'answer' | 'feedback'
  picked: Kana | null
  onPick: (k: Kana) => void
  onContinue: () => void
}) {
  const { qtype } = question
  const label =
    qtype === 'listen'
      ? '소리를 듣고 글자를 고르세요'
      : qtype === 'meaning'
        ? '이 단어의 뜻은?'
        : '이 글자의 읽기는?'

  return (
    <section className="card quiz">
      {qtype === 'listen' ? (
        <>
          <p className="prompt-label">{label}</p>
          <button className="btn-ghost big-audio" onClick={() => speak(question.answer.kana)}>
            🔊
          </button>
        </>
      ) : (
        <>
          <p className="prompt-label">{label}</p>
          <div className={isWord ? 'glyph word' : 'glyph big'}>{question.answer.kana}</div>
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
          const text =
            qtype === 'listen' ? opt.kana : qtype === 'meaning' ? opt.meaning : opt.romaji
          return (
            <button
              key={opt.kana}
              className={cls}
              data-correct={isAnswer || undefined}
              disabled={phase === 'feedback'}
              onClick={() => onPick(opt)}
            >
              {text}
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
