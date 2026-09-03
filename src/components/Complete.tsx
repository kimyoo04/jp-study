import { useEffect } from 'react'
import { DECKS, type Kana } from '../data/kana'
import { playComplete } from '../lib/sound'
import { learnedCountFor, learningCountFor, type Progress } from '../lib/srs'
import { KeyHint } from './KeyHint'
import type { LessonResult } from './Lesson'

const TOTAL_ALL = DECKS.reduce((n, d) => n + d.kana.length, 0)

interface Props {
  results: LessonResult[]
  wrong: Kana[]
  /** 이번 레슨이 반영된 진도. 끝 화면에서 델타를 말하기 위해 필요하다. */
  progress: Progress
  scopeKana: Kana[]
  scopeLabel: string
  onReview: () => void
  onAgain: () => void
  onHome: () => void
}

export function Complete({
  results,
  wrong,
  progress,
  scopeKana,
  scopeLabel,
  onReview,
  onAgain,
  onHome,
}: Props) {
  useEffect(() => {
    playComplete()
  }, [])

  // Enter starts another round. Skip when a button is focused so its native
  // activation (e.g. tabbing to 홈으로 then Enter) wins instead of double-firing.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Enter') return
      if (document.activeElement instanceof HTMLButtonElement) return
      e.preventDefault()
      onAgain()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onAgain])

  const graded = results.filter((r) => r.mode === 'quiz')
  const correct = graded.filter((r) => r.correct).length
  const total = graded.length
  const allRight = total > 0 && correct === total

  // Unique glyphs touched this lesson, in order.
  const studied: Kana[] = []
  const seen = new Set<string>()
  for (const r of results) {
    if (!seen.has(r.kana.kana)) {
      seen.add(r.kana.kana)
      studied.push(r.kana)
    }
  }
  const wrongSet = new Set(wrong.map((k) => k.kana))

  // 이 화면은 레슨의 끝점이다 — 무엇이 얼마나 늘었는지 말하지 않으면 사용자는
  // 홈으로 돌아가 스스로 숫자를 찾아 비교해야 한다(직전 값은 기억에만 있다).
  const introduced = results.filter((r) => r.mode === 'intro').length
  const scopeSeen = learnedCountFor(progress, scopeKana) + learningCountFor(progress, scopeKana)
  const seenAll = Object.values(progress.kana).filter((c) => c.seen > 0).length

  return (
    <main className="screen complete">
      <div className="celebrate">{allRight ? '🎉' : '✨'}</div>
      <h1 className="complete-title">{scopeLabel} 레슨 완료!</h1>
      {total > 0 ? (
        <p className="score">
          정답 {correct} / {total}
        </p>
      ) : (
        <p className="score">새 글자를 배웠어요</p>
      )}

      {/* 화면이 통째로 바뀌는 지점이라 결과를 한 번 읽어준다(측정: 알림 없음). */}
      <p className="complete-delta" role="status">
        {introduced > 0 && (
          <>
            <strong>{introduced}자</strong> 새로 만남 ·{' '}
          </>
        )}
        {scopeLabel} {scopeSeen} / {scopeKana.length} · 전체 {seenAll} / {TOTAL_ALL}
      </p>

      <div className="chips" aria-label="이번에 배운 글자">
        {studied.map((k) => (
          <span key={k.kana} className={wrongSet.has(k.kana) ? 'chip miss' : 'chip'}>
            {/* Cloze items show the answer fragment; a full blanked sentence won't fit a chip. */}
            {k.answer ?? k.kana}
          </span>
        ))}
      </div>

      <div className="complete-actions">
        {wrong.length > 0 && (
          <button className="btn-primary" onClick={onReview}>
            틀린 것만 복습 ({wrong.length})
          </button>
        )}
        <button
          className={wrong.length > 0 ? 'btn-ghost' : 'btn-primary'}
          onClick={onAgain}
          aria-keyshortcuts="Enter"
        >
          한 판 더<KeyHint k="Enter" />
        </button>
        <button className="btn-ghost" onClick={onHome}>
          홈으로
        </button>
      </div>
    </main>
  )
}
