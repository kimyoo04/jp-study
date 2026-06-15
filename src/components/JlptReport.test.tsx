import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import type { ExamResult } from '../lib/jlpt'
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

function render_(result: ExamResult, onStudyWeak = vi.fn()) {
  render(
    <JlptReport
      level="N5"
      result={result}
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
})
