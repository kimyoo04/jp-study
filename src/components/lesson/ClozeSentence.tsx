import { BLANK, type Kana } from '../../data/kana'

// Render a cloze sentence: the BLANK is shown as an empty slot (answer phase) or
// filled with the answer (feedback phase). Split keeps the surrounding text intact.
export function ClozeSentence({ card, reveal }: { card: Kana; reveal: boolean }) {
  const [before, after] = card.kana.split(BLANK)
  return (
    <div className="glyph sentence cloze-sentence">
      <span>{before}</span>
      {reveal ? (
        <span className="cloze-fill">{card.answer}</span>
      ) : (
        <span className="cloze-gap" aria-label="빈칸">
          ◯◯
        </span>
      )}
      <span>{after}</span>
    </div>
  )
}
