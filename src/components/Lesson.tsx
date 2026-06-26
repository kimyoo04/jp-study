import { useMemo, useState } from 'react'
import { BLANK, clozeFilled, type Deck, type DeckKind, type Kana } from '../data/kana'
import type { LessonItem, LessonMode } from '../lib/srs'
import { buildQuestion, isCorrect, optionText, pickQType, type Question } from '../lib/quiz'
import { hasJaVoice, primeSpeech, speakItem } from '../lib/speak'
import { kanaToHangul } from '../lib/hangul'
import { playCorrect, playWrong } from '../lib/sound'
import { ChoiceGrid } from './ChoiceGrid'

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
  if (kind === 'sentence' || kind === 'cloze') return 'glyph sentence'
  if (kind === 'words') return 'glyph word'
  return 'glyph big'
}

const INTRO_LABEL: Record<DeckKind, string> = {
  kana: '새 글자',
  words: '새 단어',
  sentence: '예문',
  kanji: '새 한자',
  cloze: '예문',
}

// Render a cloze sentence: the BLANK is shown as an empty slot (answer phase) or
// filled with the answer (feedback phase). Split keeps the surrounding text intact.
function ClozeSentence({ card, reveal }: { card: Kana; reveal: boolean }) {
  const [before, after] = card.kana.split(BLANK)
  return (
    <div className="glyph sentence cloze-sentence">
      <span>{before}</span>
      {reveal ? (
        <span className="cloze-fill">{card.answer}</span>
      ) : (
        <span className="cloze-gap" aria-label="빈칸">
          ◯◯
        </span>
      )}
      <span>{after}</span>
    </div>
  )
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
    const ordered = steps.map((_, i) => final[i]).filter(Boolean) as LessonResult[]
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
    if (phase === 'feedback') return
    primeSpeech()
    const correct = isCorrect(step.question!, option)
    setPicks({ ...picks, [index]: option })
    setAnswers({ ...answers, [index]: { kana: step.item.kana, mode: step.item.mode, correct } })
    if (correct) playCorrect()
    else playWrong()
    sayCurrent()
  }

  function onContinue() {
    forward(answers)
  }

  // Free navigation: jump back to review, or skip ahead without answering.
  function goPrev() {
    if (index > 0) setIndex(index - 1)
  }

  function skip() {
    if (!isLast) setIndex(index + 1)
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

      {step.item.mode === 'intro' ? (
        <IntroCard kana={step.item.kana} deck={deck} onSpeak={sayCurrent} onNext={onIntroNext} />
      ) : (
        <Quiz
          question={step.question!}
          card={step.item.kana}
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
  // Cloze intro shows the COMPLETE sentence so the pattern is learned before it
  // gets tested with a blank on later reviews.
  const glyphText = deck.kind === 'cloze' ? clozeFilled(kana) : kana.kana
  return (
    <section className="card intro">
      {(deck.kind === 'sentence' || deck.kind === 'cloze') && kana.note && (
        <div className="pattern">{kana.note}</div>
      )}
      <p className="prompt-label">{INTRO_LABEL[deck.kind]}</p>
      <div className={glyphClassFor(deck.kind)}>{glyphText}</div>
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
        <button className="btn-primary" onClick={onStay} autoFocus>
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
  card,
  deckKind,
  koReading,
  phase,
  picked,
  onReplay,
  onPick,
  onContinue,
}: {
  question: Question
  card: Kana // the lesson item (cloze: the blanked sentence + meaning + note)
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
  const label =
    qtype === 'cloze'
      ? '빈칸에 들어갈 말은?'
      : qtype === 'listen'
        ? deckKind === 'kana'
          ? '소리를 듣고 글자를 고르세요'
          : '소리를 듣고 뜻을 고르세요'
        : qtype === 'meaning'
          ? deckKind === 'kanji'
            ? '이 한자의 뜻은?'
            : deckKind === 'sentence'
              ? '이 문장의 뜻은?'
              : '이 단어의 뜻은?'
          : deckKind === 'kanji'
            ? '이 한자의 읽기는?'
            : '이 글자의 읽기는?'

  return (
    <section className="card quiz">
      {qtype === 'cloze' ? (
        <>
          {card.note && <div className="pattern">{card.note}</div>}
          <p className="prompt-label">{label}</p>
          <ClozeSentence card={card} reveal={phase === 'feedback'} />
          {card.meaning && <div className="meaning">{card.meaning}</div>}
        </>
      ) : qtype === 'listen' ? (
        <>
          <p className="prompt-label">{label}</p>
          <button className="btn-ghost big-audio" onClick={onReplay} aria-label="다시 듣기">
            🔊
          </button>
          {phase === 'feedback' && (
            // Reveal what was heard so the sound gets tied to its glyph.
            <div className={glyphClassFor(deckKind)}>{question.answer.kana}</div>
          )}
        </>
      ) : (
        <>
          <p className="prompt-label">{label}</p>
          <div className={glyphClassFor(deckKind)}>{question.answer.kana}</div>
          {koReading && <div className="ko-reading">{kanaToHangul(question.answer.kana)}</div>}
        </>
      )}

      <ChoiceGrid
        options={question.options.map((opt) => ({
          key: opt.kana,
          text: optionText(opt, qtype, deckKind),
        }))}
        mode={phase === 'feedback' ? 'feedback' : 'answer'}
        selectedKey={picked?.kana ?? null}
        correctKey={question.answer.kana}
        onPick={(key) => {
          const opt = question.options.find((o) => o.kana === key)
          if (opt) onPick(opt)
        }}
      />

      <p className="sr-only" role="status">
        {phase === 'feedback' &&
          (picked?.kana === question.answer.kana
            ? '정답'
            : `오답. 정답은 ${optionText(question.answer, qtype, deckKind)}`)}
      </p>

      {phase === 'feedback' && (
        <button className="btn-primary" onClick={onContinue}>
          계속
        </button>
      )}
    </section>
  )
}
