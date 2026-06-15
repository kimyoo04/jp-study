// JLPT diagnostic report. Leads with where to focus next (or an honest
// "inconclusive" when parts are within a question of each other), then a
// per-part breakdown. Weakness is shown by text + number, never color alone.

import type { JlptLevel } from '../data/jlpt/types'
import { JLPT_PART_KO, JLPT_PART_LABEL } from '../data/jlpt/types'
import { PART_ORDER, type ExamResult } from '../lib/jlpt'

interface Props {
  level: JlptLevel
  result: ExamResult
  onRetake: () => void
  onHome: () => void
}

export function JlptReport({ level, result, onRetake, onHome }: Props) {
  const { partScores, total, weakestPart, inconclusive } = result
  const pct = total.total > 0 ? Math.round((total.correct / total.total) * 100) : 0

  return (
    <main className="screen complete">
      <p className="prompt-label">{level} 진단 결과</p>
      <div className="score">
        {total.correct} / {total.total} <span className="jlpt-score-pct">({pct}%)</span>
      </div>

      <div className="card jlpt-hero">
        {inconclusive ? (
          <>
            <p className="jlpt-hero-title">약점이 아직 안 좁혀졌어요</p>
            <p className="jlpt-hero-sub">
              파트별 점수가 비슷해요. 더 풀어보면 어디가 약한지 또렷해져요.
            </p>
          </>
        ) : (
          <>
            <p className="jlpt-hero-title">
              다음에 집중할 곳: {JLPT_PART_KO[weakestPart!]}
            </p>
            <p className="jlpt-hero-sub">
              {JLPT_PART_LABEL[weakestPart!]} 정답률이 가장 낮아요. 여기서 시작해요.
            </p>
          </>
        )}
      </div>

      <div className="jlpt-bars">
        {PART_ORDER.filter((p) => partScores[p].total > 0).map((p) => {
          const s = partScores[p]
          const partPct = Math.round((s.correct / s.total) * 100)
          const weak = !inconclusive && p === weakestPart
          return (
            <div className="jlpt-bar-row" key={p}>
              <span className="jlpt-bar-label">
                {JLPT_PART_KO[p]}
                {weak && <span className="jlpt-bar-weak"> · 약점</span>}
              </span>
              <div className="progress-bar slim">
                <div
                  className={`progress-fill${weak ? ' weak' : ''}`}
                  style={{ width: `${partPct}%` }}
                />
              </div>
              <span className="jlpt-bar-val">
                {s.correct}/{s.total}
              </span>
            </div>
          )
        })}
      </div>

      <div className="complete-actions">
        <button className="btn-primary" onClick={onRetake}>
          다시 풀기
        </button>
        <button className="btn-ghost" onClick={onHome}>
          홈으로
        </button>
      </div>
    </main>
  )
}
