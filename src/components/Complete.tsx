import { useEffect } from 'react'
import { playComplete } from '../lib/sound'

interface Props {
  score: { correct: number; total: number }
  onAgain: () => void
  onHome: () => void
}

export function Complete({ score, onAgain, onHome }: Props) {
  useEffect(() => {
    playComplete()
  }, [])

  const allRight = score.total > 0 && score.correct === score.total
  return (
    <main className="screen complete">
      <div className="celebrate">{allRight ? '🎉' : '✨'}</div>
      <h2>레슨 완료!</h2>
      {score.total > 0 ? (
        <p className="score">
          정답 {score.correct} / {score.total}
        </p>
      ) : (
        <p className="score">새 글자를 배웠어요</p>
      )}
      <button className="btn-primary" onClick={onAgain}>
        한 판 더
      </button>
      <button className="btn-ghost" onClick={onHome}>
        홈으로
      </button>
    </main>
  )
}
