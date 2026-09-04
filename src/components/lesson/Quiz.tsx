import { type DeckKind, type Kana } from '../../data/kana'
import { displayTextFor, glyphClassFor } from '../../lib/deck'
import { kanaToHangul } from '../../lib/hangul'
import { optionLang, optionText, type Question } from '../../lib/quiz'
import { ChoiceGrid } from '../ChoiceGrid'
import { KeyHint } from '../KeyHint'
import { ClozeSentence } from './ClozeSentence'

export function Quiz({
  question,
  card,
  deckKind,
  koReading,
  canSpeak,
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
  canSpeak: boolean // 이 기기에 일본어 음성이 있는지 — 없으면 🔊를 걸지 않는다
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

  const isRight = picked?.kana === question.answer.kana
  // 정답의 읽기. 가나 덱에서 보기는 로마자로 나오는데, 이 앱을 쓰는 사람의
  // 모국어는 한국어다 — 틀린 직후가 한글 읽기를 붙여줄 유일한 순간이다.
  const hangul = kanaToHangul(question.answer.kana)
  const showMeaning = qtype !== 'meaning' && !!question.answer.meaning

  return (
    <section className="card quiz">
      {/* 프롬프트 영역이 남는 높이를 다 먹는다. 피드백에서 늘어나는 내용은 이
          안에서 흡수되므로 아래 보기 격자는 제자리에 머문다. */}
      <div className="quiz-prompt">
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
          <button
            className="btn-ghost big-audio"
            onClick={onReplay}
            aria-label="다시 듣기"
            aria-keyshortcuts="R"
          >
            🔊<KeyHint k="R" />
          </button>
          {phase === 'feedback' && (
            // Reveal what was heard so the sound gets tied to its glyph.
            <>
              <div className={glyphClassFor(deckKind)} lang="ja">
                {displayTextFor(question.answer, deckKind)}
              </div>
              {question.answer.written && (
                <div className="kana-reading" lang="ja">
                  {question.answer.kana}
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <p className="prompt-label">{label}</p>
          <div className={glyphClassFor(deckKind)} lang="ja">
            {displayTextFor(question.answer, deckKind)}
          </div>
          {question.answer.written && (
            <div className="kana-reading" lang="ja">
              {question.answer.kana}
            </div>
          )}
          {koReading && <div className="ko-reading">{kanaToHangul(question.answer.kana)}</div>}
        </>
      )}

      {/* 오답이든 정답이든, 채점된 뒤에는 항상 "무엇이 정답이고 어떻게 읽는지"를
          말한다. 예전에는 색칠된 타일 두 개와 계속 버튼뿐이라, 주의가 가장
          높은 순간에 앱이 아무것도 가르치지 않았다. */}
      {phase === 'feedback' && (
        <div className={isRight ? 'quiz-answer' : 'quiz-answer missed'}>
          <p className="quiz-answer-head">
            {isRight ? '✓ 정답' : '✗ 정답은'}{' '}
            <strong lang="ja">{displayTextFor(question.answer, deckKind)}</strong>
          </p>
          <p className="quiz-answer-reading">
            <span className="answer-hangul">{hangul}</span>
            <span className="answer-romaji">{question.answer.romaji}</span>
          </p>
          {showMeaning && <p className="quiz-answer-meaning">{question.answer.meaning}</p>}
          {canSpeak && (
            <button
              className="btn-ghost answer-replay"
              onClick={onReplay}
              aria-label="정답 다시 듣기"
              aria-keyshortcuts="R"
            >
              🔊 다시 듣기<KeyHint k="R" />
            </button>
          )}
        </div>
      )}
      </div>

      <ChoiceGrid
        options={question.options.map((opt) => ({
          key: opt.kana,
          text: optionText(opt, qtype, deckKind),
          lang: optionLang(qtype, deckKind),
        }))}
        mode={phase === 'feedback' ? 'feedback' : 'answer'}
        selectedKey={picked?.kana ?? null}
        correctKey={question.answer.kana}
        showShortcuts
        onPick={(key) => {
          const opt = question.options.find((o) => o.kana === key)
          if (opt) onPick(opt)
        }}
      />

      <p className="sr-only" role="status">
        {phase === 'feedback' &&
          (isRight
            ? `정답. ${hangul}`
            : `오답. 정답은 ${optionText(question.answer, qtype, deckKind)}, 읽기 ${hangul}`)}
      </p>

      {/* 계속 버튼 자리는 답하기 전에도 비워둔다 — 버튼이 새로 나타나며 위
          보기 격자를 37px 밀어 올리면, 방금 누른 자리에 다른 버튼이 들어온다. */}
      <div className="quiz-continue">
        {phase === 'feedback' && (
          <button className="btn-primary" onClick={onContinue} aria-keyshortcuts="Enter">
            계속<KeyHint k="Enter" />
          </button>
        )}
      </div>
    </section>
  )
}
