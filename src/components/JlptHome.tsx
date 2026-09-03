// JLPT mode entry. Lists levels (only those with content are playable; the rest
// show "준비 중"). Offers resume when an in-progress exam exists for that level.

import type { JlptLevel } from '../data/jlpt/types'
import { JLPT_LEVELS, JLPT_POOL } from '../data/jlpt'
import { hasContent, loadProgress } from '../lib/jlpt'

interface Props {
  voiceReady: boolean
  onStart: (level: JlptLevel) => void
  onResume: () => void
  onExit: () => void
}

export function JlptHome({ voiceReady, onStart, onResume, onExit }: Props) {
  const inProgress = loadProgress()

  return (
    <main className="screen">
      <div className="lesson-top">
        <button className="link" onClick={onExit} aria-label="뒤로">
          ✕
        </button>
        {/* 예전엔 화면 제목이 `.counter`(13px muted, 우측정렬 tabular-nums)였다 —
            페이지에서 가장 작은 글자가 페이지 이름이고, h1 이 아예 없었다. */}
        <h1 className="screen-title">JLPT 모의고사</h1>
      </div>

      <p className="prompt-label">레벨을 고르세요</p>

      {!voiceReady && (
        <p className="banner">이 기기는 일본어 음성이 없어 청해가 스크립트(텍스트)로 진행돼요.</p>
      )}

      <div className="jlpt-levels">
        {JLPT_LEVELS.map((level) => {
          const ready = hasContent(level, JLPT_POOL)
          const resumable = ready && inProgress?.level === level
          return (
            <div className="card jlpt-level" key={level}>
              <span className="jlpt-level-name">{level}</span>
              {!ready ? (
                <span className="jlpt-level-soon">준비 중</span>
              ) : resumable ? (
                <div className="jlpt-level-actions">
                  <button className="jlpt-level-btn" onClick={onResume}>
                    이어서 ({inProgress.idx + 1}/{inProgress.items.length})
                  </button>
                  <button className="jlpt-level-btn ghost" onClick={() => onStart(level)}>
                    처음부터
                  </button>
                </div>
              ) : (
                <button className="jlpt-level-btn" onClick={() => onStart(level)}>
                  시작
                </button>
              )}
            </div>
          )
        })}
      </div>
    </main>
  )
}
