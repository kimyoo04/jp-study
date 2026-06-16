// JLPT diagnostic report. Leads with where to focus next (or an honest
// "inconclusive" when parts are within a question of each other), then a
// per-part breakdown. Weakness is shown by text + number, never color alone.
// "오답 다시 보기" reveals every missed item with your pick vs the correct answer.

import { useState } from 'react'
import type { JlptLevel, ScoredItem } from '../data/jlpt/types'
import { JLPT_PART_KO, JLPT_PART_LABEL } from '../data/jlpt/types'
import { PART_ORDER, type ExamResult } from '../lib/jlpt'
import { ChoiceGrid } from './ChoiceGrid'

interface Props {
  level: JlptLevel
  result: ExamResult
  items: ScoredItem[]
  answers: (number | null)[]
  durationSec?: number
  onStudyWeak: (part: NonNullable<ExamResult['weakestPart']>) => void
  onRetake: () => void
  onHome: () => void
}

function fmtTime(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}분 ${String(s).padStart(2, '0')}초`
}

export function JlptReport({
  level,
  result,
  items,
  answers,
  durationSec,
  onStudyWeak,
  onRetake,
  onHome,
}: Props) {
  const { partScores, total, weakestPart, inconclusive } = result
  const pct = total.total > 0 ? Math.round((total.correct / total.total) * 100) : 0
  const [reviewing, setReviewing] = useState(false)

  // Items the user missed (wrong pick or left blank) — the teaching moments.
  const wrong = items
    .map((item, i) => ({ item, picked: answers[i] ?? null }))
    .filter(({ item, picked }) => picked !== item.answer)

  if (reviewing) {
    return (
      <main className="screen jlpt-review">
        <div className="lesson-top">
          <button className="link" onClick={() => setReviewing(false)} aria-label="결과로">
            ←
          </button>
          <span className="counter">오답 {wrong.length}</span>
        </div>
        {wrong.map(({ item, picked }) => (
          <section className="card jlpt-review-item" key={item.id}>
            <p className="jlpt-part-tag">{JLPT_PART_KO[item.part]}</p>
            {item.passage && <p className="jlpt-passage">{item.passage}</p>}
            {item.script && <p className="jlpt-script-fallback">🔊 {item.script}</p>}
            <p className="jlpt-prompt">{item.prompt}</p>
            <ChoiceGrid
              options={item.choices.map((text, i) => ({ key: String(i), text }))}
              mode="feedback"
              selectedKey={picked === null ? null : String(picked)}
              correctKey={String(item.answer)}
              onPick={() => {}}
            />
            {picked === null && <p className="jlpt-review-skip">미응답</p>}
          </section>
        ))}
        <button className="btn-primary" onClick={() => setReviewing(false)}>
          결과로 돌아가기
        </button>
      </main>
    )
  }

  return (
    <main className="screen complete">
      <p className="prompt-label">{level} 진단 결과</p>
      <div className="score">
        {total.correct} / {total.total} <span className="jlpt-score-pct">({pct}%)</span>
      </div>
      {durationSec ? <p className="jlpt-duration">소요 시간 {fmtTime(durationSec)}</p> : null}

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
            <p className="jlpt-hero-title">다음에 집중할 곳: {JLPT_PART_KO[weakestPart!]}</p>
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
        {wrong.length > 0 && (
          <button className="btn-ghost" onClick={() => setReviewing(true)}>
            오답 다시 보기 ({wrong.length})
          </button>
        )}
        {!inconclusive && weakestPart && (
          <button className="btn-primary" onClick={() => onStudyWeak(weakestPart)}>
            {JLPT_PART_KO[weakestPart]} 더 공부하기 →
          </button>
        )}
        <button className={inconclusive ? 'btn-primary' : 'btn-ghost'} onClick={onRetake}>
          다시 풀기
        </button>
        <button className="btn-ghost" onClick={onHome}>
          홈으로
        </button>
      </div>
    </main>
  )
}
