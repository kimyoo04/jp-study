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

  it('hides the study button and shows the inconclusive message when ambiguous', () => {
    render_({ ...base, weakestPart: null, inconclusive: true })
    expect(screen.queryByText(/더 공부하기/)).not.toBeInTheDocument()
    expect(screen.getByText(/약점이 아직 안 좁혀졌어요/)).toBeInTheDocument()
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
