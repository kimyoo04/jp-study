import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import type { ScoredItem } from '../data/jlpt/types'
import { JlptExam } from './JlptExam'

const ITEMS: ScoredItem[] = [
  { id: 'a', part: 'vocab', prompt: 'Q-one', choices: ['A', 'B', 'C', 'D'], answer: 0 },
  { id: 'b', part: 'grammar', prompt: 'Q-two', choices: ['A', 'B', 'C', 'D'], answer: 1 },
]

afterEach(() => {
  cleanup()
  localStorage.clear()
})

function setup(overrides: Partial<Parameters<typeof JlptExam>[0]> = {}) {
  const onComplete = vi.fn()
  const onExit = vi.fn()
  render(
    <JlptExam
      level="N5"
      items={ITEMS}
      initialAnswers={[null, null]}
      initialIdx={0}
      voiceReady={true}
      onComplete={onComplete}
      onExit={onExit}
      {...overrides}
    />,
  )
  return { onComplete, onExit }
}

describe('JlptExam flow', () => {
  it('shows the part tag and the current prompt', () => {
    setup()
    expect(screen.getByText(/문자·어휘/)).toBeInTheDocument()
    expect(screen.getByText('Q-one')).toBeInTheDocument()
    expect(screen.getByText('1/2')).toBeInTheDocument()
  })

  it('advances to the next item and persists progress', () => {
    setup()
    fireEvent.click(screen.getByText('A'))
    fireEvent.click(screen.getByText('다음'))
    expect(screen.getByText('Q-two')).toBeInTheDocument()
    expect(screen.getByText('2/2')).toBeInTheDocument()
    expect(localStorage.getItem('jp-study:jlpt-inprogress')).toBeTruthy()
  })

  it('warns before submitting with unanswered items, then completes', () => {
    const { onComplete } = setup()
    fireEvent.click(screen.getByText('다음')) // skip item 1, leave unanswered
    fireEvent.click(screen.getByText('제출'))
    // warning modal appears, not yet complete
    expect(screen.getByText(/미응답/)).toBeInTheDocument()
    expect(onComplete).not.toHaveBeenCalled()
    // confirm submit
    fireEvent.click(screen.getByText('제출', { selector: '.btn-ghost' }))
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('exit asks for confirmation and keeps progress on leave', () => {
    const { onExit } = setup()
    fireEvent.click(screen.getByLabelText('나가기'))
    expect(screen.getByText('나가시겠어요?')).toBeInTheDocument()
    fireEvent.click(screen.getByText('나가기'))
    expect(onExit).toHaveBeenCalledOnce()
  })
})
