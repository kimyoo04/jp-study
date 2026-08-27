import { CURRICULUM } from '../data/curriculum'

interface Props {
  onOpenWeek: (week: number) => void
  onExit: () => void
}

// 커리큘럼 홈 — 8주 학습 개념을 주차 카드로 보여준다.
export function Learn({ onOpenWeek, onExit }: Props) {
  return (
    <main className="screen learn">
      <div className="learn-top">
        <button className="link" onClick={onExit} aria-label="닫기">
          ✕
        </button>
        <h1 className="learn-title">개념 학습</h1>
      </div>
      <p className="learn-intro">
        12주 커리큘럼 — N5 기초(1~8주)부터 N4 핵심 문형(9~12주)까지. 카드를 눌러 시작하세요.
      </p>

      <ul className="learn-weeks">
        {CURRICULUM.map((w) => (
          <li key={w.id}>
            <button className="learn-week-card" onClick={() => onOpenWeek(w.week)}>
              <div className="learn-week-head">
                <span className="learn-week-no">{w.week}주차</span>
                <span className="learn-week-count">{w.pages.length}페이지</span>
              </div>
              <span className="learn-week-name">{w.title}</span>
              <span className="learn-week-sub">{w.subtitle}</span>
              <span className="learn-week-goal">🎯 {w.goal}</span>
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
