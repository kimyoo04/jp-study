import { useEffect, useMemo, useState } from 'react'
import { loadSearchIndex, searchItems, type SearchEntry } from '../lib/search'
import { primeSpeech, speakItem } from '../lib/speak'

interface Props {
  onExit: () => void
}

export function Search({ onExit }: Props) {
  const [query, setQuery] = useState('')
  // 인덱스는 전 덱을 필요로 한다(lib/search.ts). 화면이 열릴 때 받는다 —
  // 덱 데이터는 지연 로드이고, 대개 프리페치가 이미 끝나 있어 즉시 해결된다.
  const [index, setIndex] = useState<SearchEntry[] | null>(null)
  useEffect(() => {
    let live = true
    void loadSearchIndex().then((i) => {
      if (live) setIndex(i)
    })
    return () => {
      live = false
    }
  }, [])
  const results = useMemo(() => (index ? searchItems(query, index) : []), [query, index])
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
      ) : index === null ? (
        // 인덱스가 아직 안 왔다 — "결과 없음"으로 말하면 거짓이 된다.
        <p className="search-hint" role="status">
          검색 준비 중…
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
                    <span className="search-kana" lang="ja">
                      {r.kana.kana}
                    </span>
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
