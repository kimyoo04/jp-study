// JLPT exam runner. One item at a time, no feedback until the report. Answers
// autosave to localStorage every pick so a refresh or app kill can resume.
// Shows the current part section, warns on unanswered items before submit.

import { useState } from 'react'
import type { JlptLevel, ScoredItem } from '../data/jlpt/types'
import { JLPT_PART_KO } from '../data/jlpt/types'
import { saveProgress } from '../lib/jlpt'
import { JlptQuestionView } from './JlptQuestionView'

interface Props {
  level: JlptLevel
  items: ScoredItem[]
  initialAnswers: (number | null)[]
  initialIdx: number
  voiceReady: boolean
  onComplete: (items: ScoredItem[], answers: (number | null)[]) => void
  onExit: () => void
}

export function JlptExam({
  level,
  items,
  initialAnswers,
  initialIdx,
  voiceReady,
  onComplete,
  onExit,
}: Props) {
  const [idx, setIdx] = useState(initialIdx)
  const [answers, setAnswers] = useState<(number | null)[]>(initialAnswers)
  const [confirmExit, setConfirmExit] = useState(false)
  const [confirmSubmit, setConfirmSubmit] = useState(false)

  const item = items[idx]
  const isLast = idx === items.length - 1
  const progressPct = Math.round((idx / items.length) * 100)
  const unanswered = answers.filter((a) => a === null).length

  function persist(next: (number | null)[], nextIdx: number) {
    saveProgress({ level, items, answers: next, idx: nextIdx })
  }

  function pick(choice: number) {
    const next = answers.slice()
    next[idx] = choice
    setAnswers(next)
    persist(next, idx)
  }

  function go(nextIdx: number) {
    setIdx(nextIdx)
    persist(answers, nextIdx)
  }

  function submit() {
    if (unanswered > 0 && !confirmSubmit) {
      setConfirmSubmit(true)
      return
    }
    onComplete(items, answers)
  }

  return (
    <main className="screen lesson">
      <div className="lesson-top">
        <button className="link" onClick={() => setConfirmExit(true)} aria-label="나가기">
          ✕
        </button>
        <div className="progress-bar slim">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="counter">
          {idx + 1}/{items.length}
        </span>
      </div>

      <p className="jlpt-part-tag">
        {JLPT_PART_KO[item.part]} · {level}
      </p>

      <JlptQuestionView
        item={item}
        selected={answers[idx]}
        voiceReady={voiceReady}
        onPick={pick}
      />

      <div className="jlpt-nav">
        <button className="btn-ghost" onClick={() => go(idx - 1)} disabled={idx === 0}>
          이전
        </button>
        {isLast ? (
          <button className="btn-primary" onClick={submit}>
            제출
          </button>
        ) : (
          <button className="btn-primary" onClick={() => go(idx + 1)}>
            다음
          </button>
        )}
      </div>

      {confirmExit && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <p className="modal-title">나가시겠어요?</p>
            <p className="modal-body">진행 상황은 저장돼요. 나중에 이어서 풀 수 있어요.</p>
            <button className="btn-primary" onClick={() => setConfirmExit(false)} autoFocus>
              계속하기
            </button>
            <button className="btn-ghost" onClick={onExit}>
              나가기
            </button>
          </div>
        </div>
      )}

      {confirmSubmit && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <p className="modal-title">제출할까요?</p>
            <p className="modal-body">
              미응답 {unanswered}문항이 있어요. 안 푼 문제는 오답 처리돼요.
            </p>
            <button className="btn-primary" onClick={() => setConfirmSubmit(false)} autoFocus>
              더 풀기
            </button>
            <button className="btn-ghost" onClick={() => onComplete(items, answers)}>
              제출
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
