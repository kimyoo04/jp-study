import { useEffect, useRef } from 'react'
import { DECKS, type Category, type Deck, type Kana } from '../data/kana'
import {
  learnedCount,
  learnedCountFor,
  learningCount,
  learningCountFor,
  type Progress,
} from '../lib/srs'

const TOTAL_ALL = DECKS.reduce((n, d) => n + d.kana.length, 0)

const BASE = import.meta.env.BASE_URL

// 학습 콘텐츠를 마지막으로 검토한 날. 덱·커리큘럼을 손볼 때 같이 올린다.
const CONTENT_REVIEWED = '2026-08-28'

interface Props {
  progress: Progress
  persistent: boolean
  updateReady: boolean
  onApplyUpdate: () => void
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
  listen: boolean
  onToggleListen: () => void
  listenAvailable: boolean
  onSearch: () => void
  onStart: () => void
  onListen: () => void
  onJlpt: () => void
  onLearn: () => void
}

export function Home({
  progress,
  persistent,
  updateReady,
  onApplyUpdate,
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
  listen,
  onToggleListen,
  listenAvailable,
  onSearch,
  onStart,
  onListen,
  onJlpt,
  onLearn,
}: Props) {
  const total = scopeKana.length
  const learned = learnedCountFor(progress, scopeKana)
  // 배우는 중(box 1–2)과 익힘(box 3+)을 따로 센다. 익힘만 보여주면 카드가 box 3에
  // 닿기까지 레슨 3회쯤 걸려서, 한 판을 다 푼 사람에게도 "0 / n" 이 뜬다.
  const learning = learningCountFor(progress, scopeKana)
  const pct = Math.round((learned / total) * 100)
  const learningPct = Math.round((learning / total) * 100)
  const learnedAll = learnedCount(progress)
  const learningAll = learningCount(progress)
  const seenAll = learnedAll + learningAll
  const scopeLabel = categoryName ?? deck.label

  // 활성 탭을 보이는 곳으로 끌어온다. 덱 URL 은 공유·색인 대상인데(사이트맵
  // 27개), 스크롤러가 왼쪽에 고정돼 있어 /deck/cloze 같은 딥링크로 들어오면
  // 선택된 탭이 화면 밖에 있고 "아무 탭도 선택 안 된" 상태로 보였다.
  const activeTabRef = useRef<HTMLButtonElement>(null)
  // 화살표로 옮겼을 때만 포커스를 따라 보낸다. roving tabindex 라서 선택이
  // 바뀌면 이전 탭은 tabIndex=-1 이 되는데, 포커스가 거기 남으면 사용자는
  // 탭 위젯 안에서 키보드로 오갈 수 없게 된다. 반대로 딥링크·클릭으로
  // 들어온 경우엔 포커스를 훔치지 않는다.
  const focusActiveTab = useRef(false)
  useEffect(() => {
    activeTabRef.current?.scrollIntoView({ inline: 'center', block: 'nearest' })
    if (focusActiveTab.current) {
      activeTabRef.current?.focus()
      focusActiveTab.current = false
    }
  }, [deck.id])

  // role="tablist" 를 붙였으면 화살표로 움직여야 한다 — 스크린리더 사용자는
  // 탭 위젯에서 그 동작을 기대한다. Home/End 도 함께 받는다.
  function onTabKey(e: React.KeyboardEvent<HTMLDivElement>) {
    const i = DECKS.findIndex((d) => d.id === deck.id)
    let next = -1
    if (e.key === 'ArrowRight') next = (i + 1) % DECKS.length
    else if (e.key === 'ArrowLeft') next = (i - 1 + DECKS.length) % DECKS.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = DECKS.length - 1
    else return
    e.preventDefault()
    focusActiveTab.current = true
    onSelectDeck(DECKS[next])
  }

  return (
    <main className="screen home">
      <div className="home-topbar">
        <button className="search-btn" onClick={onSearch} aria-label="검색">
          🔍
        </button>
        <button
          className="sfx-toggle"
          onClick={onToggleSfx}
          aria-pressed={sfx}
          aria-label={sfx ? '효과음 끄기' : '효과음 켜기'}
        >
          {sfx ? '🔊' : '🔇'}
        </button>
      </div>

      <header className="home-head">
        <h1 className="logo">にほんご Pocket</h1>
        <p className="tagline">히라가나부터, 한 손으로</p>
        <p className="overall">
          {seenAll > 0 ? (
            <>
              만난 글자 <strong>{seenAll}</strong> / {TOTAL_ALL} · 익힘{' '}
              <strong>{learnedAll}</strong>
            </>
          ) : (
            <>전체 {TOTAL_ALL.toLocaleString()}문항</>
          )}
        </p>
      </header>

      {!persistent && (
        <div className="banner" role="status">
          ⚠️ 이 브라우저에선 진도가 저장되지 않아요 (프라이빗 모드일 수 있어요)
        </div>
      )}

      {updateReady && (
        <button className="banner update" onClick={onApplyUpdate}>
          ✨ 새 버전이 있어요 — 눌러서 업데이트
        </button>
      )}

      <div className="deck-switch" role="tablist" aria-label="덱 선택" onKeyDown={onTabKey}>
        {DECKS.map((d) => {
          const selected = d.id === deck.id
          return (
            <button
              key={d.id}
              ref={selected ? activeTabRef : undefined}
              role="tab"
              id={`deck-tab-${d.id}`}
              aria-selected={selected}
              aria-controls="deck-panel"
              // 탭 위젯의 관례: 선택된 탭만 탭 순서에 남고, 나머지는 화살표로 간다.
              tabIndex={selected ? 0 : -1}
              className={selected ? 'deck-tab active' : 'deck-tab'}
              onClick={() => onSelectDeck(d)}
            >
              {d.label}
            </button>
          )
        })}
      </div>

      {/* role="tab" 이 가리키는 실제 패널. 덱을 고르면 이 아래 내용이 바뀐다. */}
      <div id="deck-panel" role="tabpanel" aria-labelledby={`deck-tab-${deck.id}`}>
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
            {learned + learning} / {total}
          </span>
        </div>
        <div
          className="progress-bar"
          role="img"
          aria-label={`${scopeLabel} ${total}개 중 익힘 ${learned}개, 배우는 중 ${learning}개`}
        >
          <div className="progress-fill" style={{ width: `${pct}%` }} />
          <div className="progress-fill learning" style={{ width: `${learningPct}%` }} />
        </div>
        {/* 두 칸을 색으로만 구분하지 않는다 — 칸마다 이름과 수를 붙인다. */}
        <ul className="progress-legend" aria-hidden="true">
          <li className="legend-learned">익힘 {learned}</li>
          <li className="legend-learning">배우는 중 {learning}</li>
        </ul>
        <div className="progress-sub">
          {progress.lessonsDone > 0 ? `레슨 ${progress.lessonsDone}회 완료` : '아직 시작 전'}
        </div>
      </section>
      </div>

      <div className="home-actions">
        <button
          className={listen ? 'mode-toggle on' : 'mode-toggle'}
          onClick={onToggleListen}
          disabled={!listenAvailable}
          aria-pressed={listen}
        >
          <span className="mode-toggle-text">
            🎧 듣고 풀기
            {!listenAvailable && <small> (이 기기는 음성 미지원)</small>}
          </span>
          <span className="mode-toggle-state">{listen ? '켜짐' : '꺼짐'}</span>
        </button>

        <button className="btn-primary" onClick={onStart}>
          {/* 만난 적이 있으면 "오늘의 레슨". 예전엔 `learned > 0` 이라, 레슨을
              끝내고 돌아와도 box 3 에 닿기 전까지 계속 "시작하기" 였다. */}
          {learned + learning > 0 ? '오늘의 레슨' : '시작하기'}
        </button>

        <div className="home-tiles">
          <button className="tile" onClick={onListen} disabled={!listenAvailable}>
            <span className="tile-title">🎧 흘려듣기</span>
            <span className="tile-sub">{total}개</span>
          </button>
          {weakCount > 0 && (
            <button className="tile" onClick={onReviewWeak}>
              <span className="tile-title">🔁 복습할 것</span>
              <span className="tile-sub">{weakCount}개</span>
            </button>
          )}
        </div>

        <button className="tile tile-wide" onClick={onLearn}>
          <span className="tile-title">📖 개념 학습</span>
          <span className="tile-sub">12주 커리큘럼</span>
        </button>

        <button className="tile tile-wide" onClick={onJlpt}>
          <span className="tile-title">📋 JLPT 모의고사</span>
          <span className="tile-sub">듣기·독해 미니 모의고사로 실력 체크</span>
        </button>
      </div>

      {/* 이 앱이 무엇이고 콘텐츠를 누가 언제 손봤는지 밝힌다. 학습 콘텐츠는
          신뢰성 판단이 붙는 분야라(구글 QRG) 저자·검토 시점이 없으면 근거가
          없다. 읽는 사람에게도 필요한 정보다. */}
      <footer className="home-about">
        <h2>にほんご Pocket 은 어떤 앱인가요</h2>
        <p>
          한국어 화자가 일본어를 혼자 시작할 때 필요한 순서대로 짜인 학습 앱입니다. 히라가나·카타카나
          104자에서 시작해 단어·외래어·조수사·의태어·문법·회화·경어·한자·빈칸 채우기까지 총{' '}
          <strong>{TOTAL_ALL.toLocaleString()}개</strong> 문항을 간격 반복(SRS)으로 익힙니다.
          문항은 출제 간격이 정답률에 따라 벌어지고, 틀린 것만 따로 모아 복습합니다.
        </p>
        <p>
          설치 없이 브라우저에서 쓰고, 한 번 열어 두면 오프라인에서도 학습이 이어집니다. 학습
          기록은 이 기기에만 저장되며 서버로 전송되지 않습니다. 계정도 광고도 없습니다.
        </p>
        <ul className="home-about-links">
          <li>
            <a href={`${BASE}guide/`}>일본어 12주 학습 커리큘럼 읽기</a>
          </li>
          <li>
            <a href={`${BASE}grammar-patterns.html`}>회화 문법 패턴 56개 정리</a>
          </li>
          <li>
            <a href="https://github.com/kimyoo04/jp-study">만든 사람 · 소스 코드 (GitHub)</a>
          </li>
        </ul>
        <p className="home-about-meta">
          제작·콘텐츠 검수 <strong>kimyoo04</strong> · 학습 콘텐츠 최종 검토{' '}
          <time dateTime={CONTENT_REVIEWED}>{CONTENT_REVIEWED}</time>
        </p>
      </footer>
    </main>
  )
}
