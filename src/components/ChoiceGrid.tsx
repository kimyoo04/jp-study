// Shared 4-choice option grid. Used by the SRS Lesson (immediate feedback) and
// the JLPT exam (answer-only, no feedback until the report). Presentational and
// string-keyed so callers stay decoupled from their own item types.

import { KeyHint } from './KeyHint'

export interface Choice {
  key: string // stable identity (kana string, or stringified index)
  text: string // what the button shows
}

interface Props {
  options: Choice[]
  /** 'answer': selectable, no grading. 'feedback': graded, disabled. */
  mode: 'answer' | 'feedback'
  selectedKey?: string | null
  /** Required in feedback mode: which option is correct. */
  correctKey?: string
  /** Show a 1–N key-cap on each option (the keyboard pick hint). Opt-in so only
   *  callers that wire number keys (the Lesson quiz) advertise them. */
  showShortcuts?: boolean
  onPick: (key: string) => void
}

export function ChoiceGrid({ options, mode, selectedKey, correctKey, showShortcuts, onPick }: Props) {
  const feedback = mode === 'feedback'
  return (
    <div className="options">
      {options.map((opt, i) => {
        const isSelected = selectedKey === opt.key
        const isAnswer = correctKey === opt.key
        const cls = feedback
          ? isAnswer
            ? 'opt correct'
            : isSelected
              ? 'opt wrong'
              : 'opt dim'
          : isSelected
            ? 'opt selected'
            : 'opt'
        const mark = feedback && isAnswer ? '✓' : feedback && isSelected ? '✗' : null
        return (
          <button
            key={opt.key}
            className={cls}
            data-correct={correctKey !== undefined && isAnswer ? true : undefined}
            aria-pressed={!feedback ? isSelected : undefined}
            aria-keyshortcuts={showShortcuts ? String(i + 1) : undefined}
            disabled={feedback}
            onClick={() => onPick(opt.key)}
          >
            {showShortcuts && !feedback && i < 9 && <KeyHint k={String(i + 1)} />}
            <span className="opt-text">{opt.text}</span>
            {mark && (
              <span className="opt-mark" aria-hidden="true">
                {mark}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
