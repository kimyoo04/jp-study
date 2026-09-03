import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import type { ExamResult } from '../lib/jlpt'
import type { ScoredItem } from '../data/jlpt/types'
import { JlptReport } from './JlptReport'

afterEach(cleanup)

const base = {
  partScores: {
    vocab: { correct: 1, total: 8 },
    grammar: { correct: 6, total: 8 },
    reading: { correct: 3, total: 4 },
    listening: { correct: 5, total: 8 },
  },
  total: { correct: 15, total: 28 },
}

const ITEMS: ScoredItem[] = [
  { id: 'a', part: 'vocab', prompt: 'Q-one', choices: ['正', 'W1', 'W2', 'W3'], answer: 0 },
  { id: 'b', part: 'grammar', prompt: 'Q-two', choices: ['X', '正', 'Y', 'Z'], answer: 1 },
]

function render_(
  result: ExamResult,
  answers: (number | null)[] = [0, 1],
  onStudyWeak = vi.fn(),
) {
  render(
    <JlptReport
      level="N5"
      result={result}
      items={ITEMS}
      answers={answers}
      onStudyWeak={onStudyWeak}
      onRetake={() => {}}
      onHome={() => {}}
    />,
  )
  return onStudyWeak
}

describe('JlptReport', () => {
  it('shows a study-the-weak-part button and fires the callback when decisive', () => {
    const onStudyWeak = render_({ ...base, weakestPart: 'vocab', inconclusive: false })
    const btn = screen.getByRole('button', { name: /문자·어휘 더 공부하기/ })
    fireEvent.click(btn)
    expect(onStudyWeak).toHaveBeenCalledWith('vocab')
  })

  // 판정이 애매해도 공부하러 갈 곳은 남긴다 — 예전에는 이 분기에서 학습 CTA가
  // 사라지고 "다시 풀기"(방금 틀린 28문항 재응시)가 주 버튼이 됐다.
  it('still offers a study button when ambiguous, without calling it a weakness', () => {
    const onStudyWeak = render_({ ...base, weakestPart: null, inconclusive: true })
    expect(screen.getByText(/약점이 아직 안 좁혀졌어요/)).toBeInTheDocument()
    const btn = screen.getByRole('button', { name: /더 공부하기/ })
    fireEvent.click(btn)
    expect(onStudyWeak).toHaveBeenCalled()
    // 약점 단정은 하지 않는다: 파트 막대에 "· 약점" 표시가 붙지 않아야 한다.
    expect(screen.queryByText(/· 약점/)).not.toBeInTheDocument()
  })

  it('leads with the score and a pass-mark reference, not the verdict', () => {
    render_({ ...base, weakestPart: 'vocab', inconclusive: false })
    expect(screen.getByText(/합격선은 약 44%/)).toBeInTheDocument()
    // 주 버튼은 오답 복습이다 — 다시 풀기가 아니다.
    expect(screen.getByRole('button', { name: /다시 풀기/ })).toHaveClass('btn-ghost')
  })

  it('offers review only when there are wrong answers, and reveals the correct one', () => {
    // answers: item a wrong (picked 1, correct 0), item b correct (picked 1)
    render_({ ...base, weakestPart: 'vocab', inconclusive: false }, [1, 1])
    const reviewBtn = screen.getByRole('button', { name: /오답 다시 보기 \(1\)/ })
    fireEvent.click(reviewBtn)
    // review shows the wrong item with its correct answer marked
    expect(screen.getByText('Q-one')).toBeInTheDocument()
    expect(screen.queryByText('Q-two')).not.toBeInTheDocument() // b was correct, not shown
    expect(screen.getByText('✓')).toBeInTheDocument()
  })

  it('marks an unanswered item as 미응답 in review', () => {
    render_({ ...base, weakestPart: 'vocab', inconclusive: false }, [null, 1])
    fireEvent.click(screen.getByRole('button', { name: /오답 다시 보기 \(1\)/ }))
    expect(screen.getByText('미응답')).toBeInTheDocument()
  })

  it('shows no review button on a perfect score', () => {
    render_({ ...base, weakestPart: null, inconclusive: true }, [0, 1])
    expect(screen.queryByText(/오답 다시 보기/)).not.toBeInTheDocument()
  })
})
