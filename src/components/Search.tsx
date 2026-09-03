import { useMemo, useState } from 'react'
import { searchItems } from '../lib/search'
import { primeSpeech, speakItem } from '../lib/speak'

interface Props {
  onExit: () => void
}

export function Search({ onExit }: Props) {
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchItems(query), [query])
  const trimmed = query.trim()

  return (
    <main className="screen search">
      {/* 검색창이 시각적 제목 역할을 하므로 h1 은 스크린리더 전용으로 둔다.
          그래도 문서에 h1 은 있어야 한다 — 없으면 제목 탐색이 죽는다. */}
      <h1 className="sr-only">검색</h1>
      <div className="search-top">
        <button className="link" onClick={onExit} aria-label="닫기">
          ✕
        </button>
        <input
          className="search-input"
          type="search"
          inputMode="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="글자 · 로마자 · 뜻 검색"
          aria-label="검색"
        />
      </div>

      {trimmed === '' ? (
        <p className="search-hint">
          히라가나·한자·단어·표현을 한 번에 검색해요.
          <br />
          예: <code>ねこ</code>, <code>neko</code>, <code>고양이</code>, <code>一</code>
        </p>
      ) : results.length === 0 ? (
        <p className="search-hint">
          ‘{trimmed}’에 대한 결과가 없어요.
        </p>
      ) : (
        <>
          <p className="search-count" role="status">
            {results.length}개 결과
          </p>
          <ul className="search-results">
            {results.map((r, i) => {
              const isKanji = r.deckKind === 'kanji'
              return (
                <li key={`${r.deckId}-${r.kana.kana}-${i}`} className="search-row">
                  <div className="search-row-main">
                    <span className="search-kana">{r.kana.kana}</span>
                    <span className="search-romaji">{r.kana.romaji}</span>
                    {r.kana.meaning && <span className="search-meaning">{r.kana.meaning}</span>}
                  </div>
                  <div className="search-row-side">
                    <span className="search-badge">{r.deckLabel}</span>
                    <button
                      className="search-speak"
                      aria-label="발음 듣기"
                      onClick={() => {
                        primeSpeech()
                        speakItem(r.kana, isKanji)
                      }}
                    >
                      🔊
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </main>
  )
}
