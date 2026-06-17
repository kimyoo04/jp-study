import { useEffect, useRef, useState } from 'react'
import type { CurriculumWeek } from '../data/curriculum'
import { Markdown } from './Markdown'

interface Props {
  week: CurriculumWeek
  onExit: () => void
}

// 한 주차의 개념 페이지를 마크다운 뷰어로 한 장씩 넘겨 읽는다.
export function LearnReader({ week, onExit }: Props) {
  const [idx, setIdx] = useState(0)
  const page = week.pages[idx]
  const total = week.pages.length
  const isFirst = idx === 0
  const isLast = idx === total - 1
  const pct = Math.round(((idx + 1) / total) * 100)

  // 페이지를 넘기면 본문 맨 위로 스크롤(읽던 위치가 남지 않도록).
  const bodyRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 })
  }, [idx])

  return (
    <main className="screen reader">
      <div className="reader-top">
        <button className="link" onClick={onExit} aria-label="목록으로">
          ✕
        </button>
        <div className="reader-head-text">
          <span className="reader-week">{week.week}주차 · {week.title}</span>
          <span className="reader-page-no">
            {idx + 1} / {total}
          </span>
        </div>
      </div>

      <div className="progress-bar slim" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="reader-body" ref={bodyRef}>
        <Markdown source={page.body} />
      </div>

      <nav className="reader-nav" aria-label="페이지 이동">
        <button className="btn-ghost" onClick={() => setIdx((i) => i - 1)} disabled={isFirst}>
          ← 이전
        </button>
        {isLast ? (
          <button className="btn-primary" onClick={onExit}>
            완료
          </button>
        ) : (
          <button className="btn-primary" onClick={() => setIdx((i) => i + 1)}>
            다음 →
          </button>
        )}
      </nav>
    </main>
  )
}
