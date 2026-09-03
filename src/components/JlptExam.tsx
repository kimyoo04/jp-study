// JLPT exam runner. One item at a time, no feedback until the report. Answers
// autosave to localStorage every pick so a refresh or app kill can resume.
// Shows the current part section, a count-up timer, a question navigator (jump
// to any item, see answered/unanswered), and warns on unanswered before submit.

import { useEffect, useState } from 'react'
import type { JlptLevel, ScoredItem } from '../data/jlpt/types'
import { JLPT_PART_KO } from '../data/jlpt/types'
import { saveProgress } from '../lib/jlpt'
import { JlptQuestionView } from './JlptQuestionView'
import { Modal } from './Modal'

interface Props {
  level: JlptLevel
  items: ScoredItem[]
  initialAnswers: (number | null)[]
  initialIdx: number
  startedAt: number
  voiceReady: boolean
  onComplete: (items: ScoredItem[], answers: (number | null)[]) => void
  onExit: () => void
}

function fmtTime(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function JlptExam({
  level,
  items,
  initialAnswers,
  initialIdx,
  startedAt,
  voiceReady,
  onComplete,
  onExit,
}: Props) {
  const [idx, setIdx] = useState(initialIdx)
  const [answers, setAnswers] = useState<(number | null)[]>(initialAnswers)
  const [confirmExit, setConfirmExit] = useState(false)
  const [confirmSubmit, setConfirmSubmit] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [elapsed, setElapsed] = useState(() =>
    startedAt ? Math.floor((Date.now() - startedAt) / 1000) : 0,
  )

  // Count-up timer, derived from startedAt so it stays correct across resume.
  useEffect(() => {
    if (!startedAt) return
    const tick = () => setElapsed(Math.floor((Date.now() - startedAt) / 1000))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [startedAt])

  const item = items[idx]
  const isLast = idx === items.length - 1
  const progressPct = Math.round((idx / items.length) * 100)
  const unanswered = answers.filter((a) => a === null).length

  function persist(next: (number | null)[], nextIdx: number) {
    saveProgress({ level, items, answers: next, idx: nextIdx, startedAt })
  }

  function pick(choice: number) {
    const next = answers.slice()
    // Tapping the already-selected choice deselects it (lets you undo a guess).
    next[idx] = answers[idx] === choice ? null : choice
    setAnswers(next)
    persist(next, idx)
  }

  function go(nextIdx: number) {
    setIdx(nextIdx)
    setNavOpen(false)
    persist(answers, nextIdx)
  }

  function gotoFirstUnanswered() {
    const first = answers.findIndex((a) => a === null)
    if (first >= 0) {
      setConfirmSubmit(false)
      go(first)
    }
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
      <h1 className="sr-only">{level} 모의고사</h1>
      <div className="lesson-top">
        <button className="link" onClick={() => setConfirmExit(true)} aria-label="나가기">
          ✕
        </button>
        <div className="progress-bar slim">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="jlpt-timer" aria-label="경과 시간">
          {fmtTime(elapsed)}
        </span>
        <button
          className="jlpt-nav-toggle"
          onClick={() => setNavOpen(true)}
          aria-label="문항 목록"
        >
          ▦ {idx + 1}/{items.length}
        </button>
      </div>

      <p className="jlpt-part-tag">
        {JLPT_PART_KO[item.part]} · {level}
      </p>

      {/* 이전/다음·문항 목록으로 이동하면 카드가 통째로 바뀌는데 아무 알림이
          없었다. 화면에는 이미 `▦ n/총`(문항 목록 버튼)이 있으니 시각적으로
          또 적지 않고, 스크린리더에만 위치를 읽어준다. 보기 선택 자체는
          ChoiceGrid 의 aria-pressed 가 알려준다. */}
      <p className="sr-only" role="status">
        {idx + 1}번 문항, 총 {items.length}문항, {JLPT_PART_KO[item.part]}
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

      {navOpen && (
        <Modal
          title="문항 목록"
          className="jlpt-nav-modal"
          onClose={() => setNavOpen(false)}
          closeOnBackdrop
        >
          <p className="modal-body">
            답함 {answers.length - unanswered} · 미응답 {unanswered}
          </p>
          <div className="jlpt-nav-grid">
            {items.map((_, i) => {
              // 현재 문항이면서 답한 상태를 둘 다 표시한다. 예전엔 삼항이
              // 'current' 에서 끊겨 답한 현재 문항이 미응답처럼 보였고
              // `.jlpt-nav-cell.done.current` 는 죽은 CSS 였다.
              const answered = answers[i] !== null
              const cls = [
                'jlpt-nav-cell',
                answered ? 'done' : 'todo',
                i === idx ? 'current' : '',
              ]
                .filter(Boolean)
                .join(' ')
              return (
                <button
                  key={i}
                  className={cls}
                  onClick={() => go(i)}
                  aria-current={i === idx ? 'true' : undefined}
                  aria-label={`${i + 1}번${answered ? ', 답함' : ', 미응답'}${i === idx ? ', 현재 문항' : ''}`}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
          <button className="btn-ghost" onClick={() => setNavOpen(false)}>
            닫기
          </button>
        </Modal>
      )}

      {confirmExit && (
        <Modal title="나가시겠어요?" onClose={() => setConfirmExit(false)}>
          <p className="modal-body">진행 상황은 저장돼요. 나중에 이어서 풀 수 있어요.</p>
          <button className="btn-primary" onClick={() => setConfirmExit(false)} autoFocus>
            계속하기
          </button>
          <button className="btn-ghost" onClick={onExit}>
            나가기
          </button>
        </Modal>
      )}

      {confirmSubmit && (
        <Modal title="제출할까요?" onClose={() => setConfirmSubmit(false)}>
          <p className="modal-body">
            미응답 {unanswered}문항이 있어요. 안 푼 문제는 오답 처리돼요.
          </p>
          <button className="btn-primary" onClick={gotoFirstUnanswered} autoFocus>
            안 푼 문제로 가기
          </button>
          <button className="btn-ghost" onClick={() => onComplete(items, answers)}>
            그래도 제출
          </button>
          <button className="btn-ghost" onClick={() => setConfirmSubmit(false)}>
            취소
          </button>
        </Modal>
      )}
    </main>
  )
}
