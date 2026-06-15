// Shared 4-choice option grid. Used by the SRS Lesson (immediate feedback) and
// the JLPT exam (answer-only, no feedback until the report). Presentational and
// string-keyed so callers stay decoupled from their own item types.

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
  onPick: (key: string) => void
}

export function ChoiceGrid({ options, mode, selectedKey, correctKey, onPick }: Props) {
  const feedback = mode === 'feedback'
  return (
    <div className="options">
      {options.map((opt) => {
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
            disabled={feedback}
            onClick={() => onPick(opt.key)}
          >
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
