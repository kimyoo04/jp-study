import { DECKS, type Category, type Deck, type Kana } from '../data/kana'
import { learnedCount, learnedCountFor, type Progress } from '../lib/srs'

const TOTAL_ALL = DECKS.reduce((n, d) => n + d.kana.length, 0)

interface Props {
  progress: Progress
  persistent: boolean
  deck: Deck
  onSelectDeck: (d: Deck) => void
  categories: Category[]
  categoryName: string | null
  onSelectCategory: (name: string | null) => void
  scopeKana: Kana[]
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
  categories,
  categoryName,
  onSelectCategory,
  scopeKana,
  weakCount,
  onReviewWeak,
  sfx,
  onToggleSfx,
  onStart,
}: Props) {
  const total = scopeKana.length
  const learned = learnedCountFor(progress, scopeKana)
  const pct = Math.round((learned / total) * 100)
  const learnedAll = learnedCount(progress)
  const scopeLabel = categoryName ?? deck.label

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
        <p className="overall">
          전체 <strong>{learnedAll}</strong> / {TOTAL_ALL} 익힘
        </p>
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

      <label className="cat-select">
        <span className="cat-select-label">카테고리</span>
        <select
          value={categoryName ?? ''}
          onChange={(e) => onSelectCategory(e.target.value || null)}
        >
          <option value="">전체 ({deck.kana.length})</option>
          {categories.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name} ({c.kana.length})
            </option>
          ))}
        </select>
      </label>

      <section className="progress-card">
        <div className="progress-label">
          <span>{scopeLabel}</span>
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
