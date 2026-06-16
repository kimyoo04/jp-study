// Renders one JLPT scored item in answer mode (no grading — the exam reveals
// results only at the report). Layout branches on part: listening plays TTS
// (with a text fallback when no ja voice), reading shows a passage, grammar
// ordering shows the scrambled fragments.

import type { ScoredItem } from '../data/jlpt/types'
import { primeSpeech, speak } from '../lib/speak'
import { ChoiceGrid } from './ChoiceGrid'

interface Props {
  item: ScoredItem
  selected: number | null
  voiceReady: boolean
  onPick: (index: number) => void
}

export function JlptQuestionView({ item, selected, voiceReady, onPick }: Props) {
  const choices = item.choices.map((text, i) => ({ key: String(i), text }))
  const grid = (
    <ChoiceGrid
      options={choices}
      mode="answer"
      selectedKey={selected === null ? null : String(selected)}
      onPick={(key) => onPick(Number(key))}
    />
  )

  if (item.part === 'listening') {
    return (
      <section className="card quiz jlpt-q">
        <p className="prompt-label">{item.prompt}</p>
        <button
          className="btn-ghost big-audio"
          onClick={() => {
            primeSpeech()
            if (item.script) speak(item.script)
          }}
          aria-label="듣기"
        >
          🔊 듣기
        </button>
        {voiceReady ? (
          <p className="jlpt-audio-hint">탭하면 다시 들을 수 있어요</p>
        ) : (
          // No ja voice on this device: show the script as text so the item is
          // still answerable (the report flags that listening ran without audio).
          item.script && <p className="jlpt-script-fallback">{item.script}</p>
        )}
        {grid}
      </section>
    )
  }

  if (item.part === 'reading') {
    return (
      <section className="card quiz jlpt-q">
        {item.passage && <p className="jlpt-passage">{item.passage}</p>}
        <p className="prompt-label">{item.prompt}</p>
        {grid}
      </section>
    )
  }

  // vocab | grammar (cloze or ordering)
  return (
    <section className="card quiz jlpt-q">
      <p className="jlpt-prompt">{item.prompt}</p>
      {item.segments && (
        <div className="jlpt-segments" aria-label="문장 조각">
          {item.segments.map((seg, i) => (
            <span className="chip" key={i}>
              {seg}
            </span>
          ))}
        </div>
      )}
      {grid}
    </section>
  )
}
