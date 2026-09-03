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
      startedAt={Date.now()}
      voiceReady={true}
      onComplete={onComplete}
      onExit={onExit}
      {...overrides}
    />,
  )
  return { onComplete, onExit }
}

describe('JlptExam flow', () => {
  it('shows the part tag, prompt, and progress counter', () => {
    setup()
    // 파트 이름은 눈에 보이는 태그와 스크린리더용 위치 안내 두 곳에 나온다.
    expect(screen.getByText('문자·어휘 · N5')).toBeInTheDocument()
    expect(screen.getByText('Q-one')).toBeInTheDocument()
    // 화면에 보이는 카운터는 문항 목록 버튼 하나뿐이다(중복 표기 안 함).
    expect(screen.getByRole('button', { name: '문항 목록' })).toHaveTextContent('1/2')
  })

  // 이동은 카드를 통째로 바꾸므로 스크린리더에 위치를 알린다.
  it('announces the current question position to screen readers', () => {
    setup()
    expect(screen.getByRole('status')).toHaveTextContent('1번 문항, 총 2문항, 문자·어휘')
  })

  it('advances to the next item and persists progress', () => {
    setup()
    fireEvent.click(screen.getByText('A'))
    fireEvent.click(screen.getByText('다음'))
    expect(screen.getByText('Q-two')).toBeInTheDocument()
    expect(screen.getByText(/2\/2/)).toBeInTheDocument()
    expect(localStorage.getItem('jp-study:jlpt-inprogress')).toBeTruthy()
  })

  it('warns before submitting with unanswered items, then completes', () => {
    const { onComplete } = setup()
    fireEvent.click(screen.getByText('다음')) // skip item 1, leave unanswered
    fireEvent.click(screen.getByText('제출'))
    expect(screen.getByText(/미응답/)).toBeInTheDocument()
    expect(onComplete).not.toHaveBeenCalled()
    fireEvent.click(screen.getByText('그래도 제출'))
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('jumps to the first unanswered item from the submit warning', () => {
    setup({ initialAnswers: [0, null] })
    fireEvent.click(screen.getByText('다음')) // now on item 2 (the unanswered one)
    fireEvent.click(screen.getByText('이전')) // back to item 1
    expect(screen.getByText('Q-one')).toBeInTheDocument()
    fireEvent.click(screen.getByText('다음'))
    fireEvent.click(screen.getByText('제출'))
    fireEvent.click(screen.getByText('안 푼 문제로 가기'))
    // lands on item 2 (Q-two), the unanswered one, modal closed
    expect(screen.getByText('Q-two')).toBeInTheDocument()
    expect(screen.queryByText(/미응답/)).not.toBeInTheDocument()
  })

  it('navigator opens, shows answered state, and jumps', () => {
    setup({ initialAnswers: [2, null] })
    fireEvent.click(screen.getByRole('button', { name: '문항 목록' }))
    // 2번 is unanswered, 1번 answered — 1번은 현재 문항이기도 하다.
    // (예전엔 삼항이 'current' 에서 끊겨 답한 현재 문항이 미응답처럼 보였다.)
    const cur = screen.getByLabelText('1번, 답함, 현재 문항')
    expect(cur.className).toContain('done')
    expect(cur.className).toContain('current')
    fireEvent.click(screen.getByLabelText('2번, 미응답'))
    expect(screen.getByText('Q-two')).toBeInTheDocument()
  })

  it('tapping the selected choice again deselects it', () => {
    setup()
    const optA = screen.getByText('A').closest('button')!
    fireEvent.click(optA)
    expect(optA.className).toContain('selected')
    fireEvent.click(optA) // tap again -> deselect
    expect(optA.className).not.toContain('selected')
  })

  it('exit asks for confirmation and keeps progress on leave', () => {
    const { onExit } = setup()
    fireEvent.click(screen.getByLabelText('나가기'))
    expect(screen.getByText('나가시겠어요?')).toBeInTheDocument()
    fireEvent.click(screen.getByText('나가기'))
    expect(onExit).toHaveBeenCalledOnce()
  })
})
