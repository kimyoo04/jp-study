import { type Deck, type DeckKind, type Kana } from '../../data/kana'
import { glyphClassFor, jpTextFor } from '../../lib/deck'
import { kanaToHangul } from '../../lib/hangul'
import { primeSpeech } from '../../lib/speak'

const INTRO_LABEL: Record<DeckKind, string> = {
  kana: '새 글자',
  words: '새 단어',
  sentence: '예문',
  kanji: '새 한자',
  cloze: '예문',
}

export function IntroCard({
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
  const glyphText = jpTextFor(kana, deck.kind)
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
        aria-keyshortcuts="R"
      >
        🔊 발음 듣기
        <span className="kbd" aria-hidden="true">
          R
        </span>
      </button>
      <button className="btn-primary" onClick={onNext} aria-keyshortcuts="Enter">
        다음
        <span className="kbd" aria-hidden="true">
          ⏎
        </span>
      </button>
    </section>
  )
}
