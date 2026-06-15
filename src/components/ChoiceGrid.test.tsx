import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { ChoiceGrid, type Choice } from './ChoiceGrid'

const OPTS: Choice[] = [
  { key: 'a', text: 'Alpha' },
  { key: 'b', text: 'Bravo' },
  { key: 'c', text: 'Charlie' },
  { key: 'd', text: 'Delta' },
]

describe('ChoiceGrid — answer mode', () => {
  it('renders all options, enabled, and fires onPick', () => {
    const onPick = vi.fn()
    render(<ChoiceGrid options={OPTS} mode="answer" selectedKey={null} onPick={onPick} />)
    const btns = screen.getAllByRole('button')
    expect(btns).toHaveLength(4)
    expect(btns.every((b) => !b.hasAttribute('disabled'))).toBe(true)
    fireEvent.click(screen.getByText('Charlie'))
    expect(onPick).toHaveBeenCalledWith('c')
  })

  it('marks the selected option without grading it', () => {
    render(<ChoiceGrid options={OPTS} mode="answer" selectedKey="b" onPick={() => {}} />)
    const selected = screen.getByText('Bravo').closest('button')!
    expect(selected.className).toContain('selected')
    expect(selected.className).not.toContain('correct')
    expect(selected.className).not.toContain('wrong')
    expect(selected).toHaveAttribute('aria-pressed', 'true')
  })
})

describe('ChoiceGrid — feedback mode (Lesson regression)', () => {
  it('shows correct/wrong/dim, marks, and disables all buttons', () => {
    render(
      <ChoiceGrid
        options={OPTS}
        mode="feedback"
        selectedKey="b"
        correctKey="a"
        onPick={() => {}}
      />,
    )
    const correct = screen.getByText('Alpha').closest('button')!
    const wrong = screen.getByText('Bravo').closest('button')!
    const dim = screen.getByText('Charlie').closest('button')!

    expect(correct.className).toContain('correct')
    expect(correct).toHaveAttribute('data-correct', 'true')
    expect(wrong.className).toContain('wrong')
    expect(dim.className).toContain('dim')

    expect(screen.getByText('✓')).toBeInTheDocument()
    expect(screen.getByText('✗')).toBeInTheDocument()

    expect(screen.getAllByRole('button').every((b) => b.hasAttribute('disabled'))).toBe(true)
  })

  it('correct + selected (right answer picked) shows only the check, no ✗', () => {
    render(
      <ChoiceGrid
        options={OPTS}
        mode="feedback"
        selectedKey="a"
        correctKey="a"
        onPick={() => {}}
      />,
    )
    expect(screen.getByText('✓')).toBeInTheDocument()
    expect(screen.queryByText('✗')).not.toBeInTheDocument()
  })
})
