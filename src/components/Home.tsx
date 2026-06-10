import { DECKS, type Deck } from '../data/kana'
import { learnedCountFor, type Progress } from '../lib/srs'

interface Props {
  progress: Progress
  persistent: boolean
  deck: Deck
  onSelectDeck: (d: Deck) => void
  weakCount: number
  onReviewWeak: () => void
  sfx: boolean
  onToggleSfx: () => void
  onStart: () => void
}

export function Home({
  progress,
  persistent,
  deck,
  onSelectDeck,
  weakCount,
  onReviewWeak,
  sfx,
  onToggleSfx,
  onStart,
}: Props) {
  const total = deck.kana.length
  const learned = learnedCountFor(progress, deck.kana)
  const pct = Math.round((learned / total) * 100)

  return (
    <main className="screen home">
      <header className="home-head">
        <button
          className="sfx-toggle"
          onClick={onToggleSfx}
          aria-pressed={sfx}
          aria-label={sfx ? '효과음 끄기' : '효과음 켜기'}
        >
          {sfx ? '🔊' : '🔇'}
        </button>
        <h1 className="logo">にほんご Pocket</h1>
        <p className="tagline">히라가나부터, 한 손으로</p>
      </header>

      {!persistent && (
        <div className="banner" role="status">
          ⚠️ 이 브라우저에선 진도가 저장되지 않아요 (프라이빗 모드일 수 있어요)
        </div>
      )}

      <div className="deck-switch" role="tablist" aria-label="문자 선택">
        {DECKS.map((d) => (
          <button
            key={d.id}
            role="tab"
            aria-selected={d.id === deck.id}
            className={d.id === deck.id ? 'deck-tab active' : 'deck-tab'}
            onClick={() => onSelectDeck(d)}
          >
            {d.label}
          </button>
        ))}
      </div>

      <section className="progress-card">
        <div className="progress-label">
          <span>{deck.label}</span>
          <span>
            {learned} / {total}
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="progress-sub">
          {progress.lessonsDone > 0 ? `레슨 ${progress.lessonsDone}회 완료` : '아직 시작 전'}
        </div>
      </section>

      <button className="btn-primary" onClick={onStart}>
        {learned > 0 ? '오늘의 레슨' : '시작하기'}
      </button>
      {weakCount > 0 && (
        <button className="btn-ghost" onClick={onReviewWeak}>
          약한 것만 복습 ({weakCount})
        </button>
      )}
    </main>
  )
}
