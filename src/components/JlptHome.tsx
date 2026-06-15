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
        <span className="counter">JLPT 모의고사</span>
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
              <div className="jlpt-level-head">
                <span className="jlpt-level-name">{level}</span>
                {!ready && <span className="jlpt-level-soon">준비 중</span>}
              </div>
              {ready ? (
                resumable ? (
                  <div className="jlpt-level-actions">
                    <button className="btn-primary" onClick={onResume}>
                      이어서 풀기 ({inProgress.idx + 1}/{inProgress.items.length})
                    </button>
                    <button className="btn-ghost" onClick={() => onStart(level)}>
                      처음부터
                    </button>
                  </div>
                ) : (
                  <button className="btn-primary" onClick={() => onStart(level)}>
                    미니 모의고사 시작
                  </button>
                )
              ) : (
                <button className="btn-ghost" disabled>
                  곧 추가돼요
                </button>
              )}
            </div>
          )
        })}
      </div>
    </main>
  )
}
