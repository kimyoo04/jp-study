// View helpers derived from a deck's kind. Shared by the Lesson and ListenPlayer
// screens so the glyph sizing and cloze rendering stay identical between them.
import { clozeFilled, type DeckKind, type Kana } from '../data/kana'

/** CSS class for the main glyph, sized by deck kind (sentence/cloze < word < kana/kanji). */
export function glyphClassFor(kind: DeckKind): string {
  if (kind === 'sentence' || kind === 'cloze') return 'glyph sentence'
  if (kind === 'words') return 'glyph word'
  return 'glyph big'
}

/** The Japanese text shown/read for a card. Cloze cards use the completed sentence. */
export function jpTextFor(item: Kana, kind: DeckKind): string {
  return kind === 'cloze' ? clozeFilled(item) : item.kana
}

/** Clamp a target step index into the valid range [0, length - 1]. */
export function clampIndex(target: number, length: number): number {
  return Math.max(0, Math.min(length - 1, target))
}
