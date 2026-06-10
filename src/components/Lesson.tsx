import { useMemo, useState } from 'react'
import type { Deck, DeckKind, Kana } from '../data/kana'
import type { LessonItem, LessonMode } from '../lib/srs'
import { buildQuestion, isCorrect, pickQType, type Question } from '../lib/quiz'
import { hasJaVoice, primeSpeech, speakItem } from '../lib/speak'
import { kanaToHangul } from '../lib/hangul'
import { playCorrect, playWrong } from '../lib/sound'

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

function glyphClassFor(kind: DeckKind): string {
  if (kind === 'sentence') return 'glyph sentence'
  if (kind === 'words') return 'glyph word'
  return 'glyph big'
}

const INTRO_LABEL: Record<DeckKind, string> = {
  kana: '새 글자',
  words: '새 단어',
  sentence: '예문',
  kanji: '새 한자',
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
      return { item, question: buildQuestion(item.kana, qtype, pool) }
    })
  }, [items, pool, deck.kind, listenMode])

  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'answer' | 'feedback'>('answer')
  const [picked, setPicked] = useState<Kana | null>(null)
  const [results, setResults] = useState<LessonResult[]>([])
  const [confirmExit, setConfirmExit] = useState(false)

  const step = steps[index]
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

  function sayCurrent() {
    speakItem(step.item.kana, deck.kind === 'kanji')
  }

  function onIntroNext() {
    primeSpeech()
    sayCurrent()
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
    sayCurrent()
  }

  function onContinue() {
    advance(record(isCorrect(step.question!, picked!)))
  }

  function onExitClick() {
    // Confirm once the user has made any progress (answered or advanced).
    if (index > 0 || phase === 'feedback' || results.length > 0) setConfirmExit(true)
    else onExit()
  }

  return (
    <main className="screen lesson">
      <div className="lesson-top">
        <button className="link" onClick={onExitClick} aria-label="나가기">
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
        <IntroCard kana={step.item.kana} deck={deck} onSpeak={sayCurrent} onNext={onIntroNext} />
      ) : (
        <Quiz
          question={step.question!}
          deckKind={deck.kind}
          koReading={!!deck.koReading}
          phase={phase}
          picked={picked}
          onReplay={sayCurrent}
          onPick={onPick}
          onContinue={onContinue}
        />
      )}

      {confirmExit && <ExitConfirm onStay={() => setConfirmExit(false)} onLeave={onExit} />}
    </main>
  )
}

function IntroCard({
  kana,
  deck,
  onSpeak,
  onNext,
}: {
  kana: Kana
  deck: Deck
  onSpeak: () => void
  onNext: () => void
}) {
  return (
    <section className="card intro">
      {deck.kind === 'sentence' && kana.note && <div className="pattern">{kana.note}</div>}
      <p className="prompt-label">{INTRO_LABEL[deck.kind]}</p>
      <div className={glyphClassFor(deck.kind)}>{kana.kana}</div>
      {deck.koReading && <div className="ko-reading">{kanaToHangul(kana.kana)}</div>}
      <div className="romaji">{kana.romaji}</div>
      {kana.meaning && deck.kind !== 'kana' && <div className="meaning">{kana.meaning}</div>}
      <button
        className="btn-ghost"
        onClick={() => {
          primeSpeech()
          onSpeak()
        }}
      >
        🔊 발음 듣기
      </button>
      <button className="btn-primary" onClick={onNext}>
        다음
      </button>
    </section>
  )
}

function ExitConfirm({ onStay, onLeave }: { onStay: () => void; onLeave: () => void }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <p className="modal-title">나가시겠어요?</p>
        <p className="modal-body">나가면 이번 레슨 진도가 사라져요.</p>
        <button className="btn-primary" onClick={onStay}>
          계속하기
        </button>
        <button className="btn-ghost" onClick={onLeave}>
          나가기
        </button>
      </div>
    </div>
  )
}

function Quiz({
  question,
  deckKind,
  koReading,
  phase,
  picked,
  onReplay,
  onPick,
  onContinue,
}: {
  question: Question
  deckKind: DeckKind
  koReading: boolean
  phase: 'answer' | 'feedback'
  picked: Kana | null
  onReplay: () => void
  onPick: (k: Kana) => void
  onContinue: () => void
}) {
  const { qtype } = question
  // In listen mode kana decks still pick the glyph; word/kanji/sentence decks
  // pick the Korean meaning (you only have the sound to go on).
  const listenPickGlyph = deckKind === 'kana'
  const label =
    qtype === 'listen'
      ? listenPickGlyph
        ? '소리를 듣고 글자를 고르세요'
        : '소리를 듣고 뜻을 고르세요'
      : qtype === 'meaning'
        ? deckKind === 'kanji'
          ? '이 한자의 뜻은?'
          : deckKind === 'sentence'
            ? '이 문장의 뜻은?'
            : '이 단어의 뜻은?'
        : '이 글자의 읽기는?'

  return (
    <section className="card quiz">
      {qtype === 'listen' ? (
        <>
          <p className="prompt-label">{label}</p>
          <button className="btn-ghost big-audio" onClick={onReplay}>
            🔊
          </button>
        </>
      ) : (
        <>
          <p className="prompt-label">{label}</p>
          <div className={glyphClassFor(deckKind)}>{question.answer.kana}</div>
          {koReading && <div className="ko-reading">{kanaToHangul(question.answer.kana)}</div>}
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
            qtype === 'listen'
              ? listenPickGlyph
                ? opt.kana
                : opt.meaning
              : qtype === 'meaning'
                ? opt.meaning
                : opt.romaji
          const mark =
            phase === 'feedback' && isAnswer
              ? '✓'
              : phase === 'feedback' && isPicked
                ? '✗'
                : null
          return (
            <button
              key={opt.kana}
              className={cls}
              data-correct={isAnswer || undefined}
              disabled={phase === 'feedback'}
              onClick={() => onPick(opt)}
            >
              <span className="opt-text">{text}</span>
              {mark && (
                <span className="opt-mark" aria-hidden="true">
                  {mark}
                </span>
              )}
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
