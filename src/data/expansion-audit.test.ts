import { describe, expect, it } from 'vitest'
import { DECKS, deckCategories } from './kana'
import { BASE_WORD_ROWS, WORDS } from './words'
import { BASE_LOANWORD_ROWS, LOANWORDS } from './loanwords'
import { BASE_COUNTER_ROWS, COUNTERS } from './counters'
import { BASE_MIMETIC_ROWS, MIMETICS } from './mimetic'
import { BASE_GRAMMAR_ROWS, GRAMMAR } from './grammar'
import { BASE_PHRASE_ROWS, PHRASES } from './phrases'
import { BASE_KEIGO_ROWS, KEIGO } from './keigo'
import { BASE_KANJI_ROWS, KANJI } from './kanji'
import { BASE_CLOZE_ROWS, CLOZE } from './cloze'

const targets = [
  ['words', BASE_WORD_ROWS.flat(), WORDS],
  ['loanwords', BASE_LOANWORD_ROWS.flat(), LOANWORDS],
  ['counters', BASE_COUNTER_ROWS.flat(), COUNTERS],
  ['mimetic', BASE_MIMETIC_ROWS.flat(), MIMETICS],
  ['grammar', BASE_GRAMMAR_ROWS.flat(), GRAMMAR],
  ['phrases', BASE_PHRASE_ROWS.flat(), PHRASES],
  ['keigo', BASE_KEIGO_ROWS.flat(), KEIGO],
  ['kanji', BASE_KANJI_ROWS.flat(), KANJI],
  ['cloze', BASE_CLOZE_ROWS.flat(), CLOZE],
] as const

const key = (value: string) => value.normalize('NFKC').replace(/[\s、。！？!?「」]/g, '')

describe('nine-deck expansion audit', () => {
  it('makes every extensible deck exactly twice its curated size', () => {
    for (const [id, base, expanded] of targets) {
      expect(expanded.length, `${id} exact 2x`).toBe(base.length * 2)
    }
  })

  it('has no duplicate normalized Japanese key inside any target deck', () => {
    for (const [id, , items] of targets) {
      const keys = items.map((item) => key(item.kana))
      expect(new Set(keys).size, `${id} duplicate Japanese key`).toBe(keys.length)
    }
  })

  it('keeps required fields and enough same-category distractors', () => {
    for (const [id, , items] of targets) {
      const deck = DECKS.find((candidate) => candidate.id === id)!
      expect(deck).toBeDefined()
      expect(deck.rows.flat()).toEqual(items)
      const categories = deckCategories(deck)
      expect(categories.reduce((count, category) => count + category.kana.length, 0)).toBe(items.length)
      expect(categories.every((category) => category.name.length > 0)).toBe(true)
      if (deck.kind !== 'sentence') expect(categories).toHaveLength(deck.rows.length)
      for (const row of deck.rows) expect(row.length, `${id} row distractors`).toBeGreaterThanOrEqual(4)
      for (const item of items) {
        expect(item.kana, `${id} kana`).toBeTruthy()
        expect(item.romaji, `${id}:${item.kana} reading`).toBeTruthy()
        if (id !== 'kanji') expect(item.meaning, `${id}:${item.kana} meaning`).toBeTruthy()
        if (deck.kind === 'sentence' || deck.kind === 'cloze') {
          expect(item.note, `${id}:${item.kana} category`).toBeTruthy()
        }
        if (deck.kind === 'cloze') {
          expect(item.answer, `${id}:${item.kana} answer`).toBeTruthy()
          expect(item.choices).toHaveLength(3)
          expect(new Set(item.choices).size).toBe(3)
          expect(item.choices).not.toContain(item.answer)
        }
      }
    }
  })
})
