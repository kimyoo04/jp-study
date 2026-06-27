import { type DeckKind, type Kana } from '../../data/kana'
import { glyphClassFor } from '../../lib/deck'
import { kanaToHangul } from '../../lib/hangul'
import { optionText, type Question } from '../../lib/quiz'
import { ChoiceGrid } from '../ChoiceGrid'
import { ClozeSentence } from './ClozeSentence'

export function Quiz({
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
