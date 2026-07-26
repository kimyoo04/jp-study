import { useEffect } from 'react'
import type { Kana } from '../data/kana'
import { playComplete } from '../lib/sound'
import { KeyHint } from './KeyHint'
import type { LessonResult } from './Lesson'

interface Props {
  results: LessonResult[]
  wrong: Kana[]
  onReview: () => void
  onAgain: () => void
  onHome: () => void
}

export function Complete({ results, wrong, onReview, onAgain, onHome }: Props) {
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

  return (
    <main className="screen complete">
      <div className="celebrate">{allRight ? '🎉' : '✨'}</div>
      <h2>레슨 완료!</h2>
      {total > 0 ? (
        <p className="score">
          정답 {correct} / {total}
        </p>
      ) : (
        <p className="score">새 글자를 배웠어요</p>
      )}

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
