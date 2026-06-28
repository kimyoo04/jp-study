import { describe, expect, it } from 'vitest'
import { HIRAGANA } from '../data/kana'
import {
  applyAnswer,
  emptyProgress,
  intervalFor,
  introducedCard,
  isDue,
  learnedCount,
  learnedCountFor,
  weakItems,
  newCard,
  nextBox,
  selectLessonKana,
  type Progress,
} from './srs'

describe('nextBox', () => {
  it('advances on correct, capped at 5', () => {
    expect(nextBox(1, true)).toBe(2)
    expect(nextBox(4, true)).toBe(5)
    expect(nextBox(5, true)).toBe(5)
  })
  it('resets to 1 on wrong', () => {
    expect(nextBox(4, false)).toBe(1)
    expect(nextBox(1, false)).toBe(1)
  })
})

describe('intervalFor', () => {
  it('maps boxes 1..5 to 1/2/4/8/16', () => {
    expect([1, 2, 3, 4, 5].map(intervalFor)).toEqual([1, 2, 4, 8, 16])
  })
  it('clamps out-of-range boxes', () => {
    expect(intervalFor(0)).toBe(1)
    expect(intervalFor(9)).toBe(16)
  })
})

describe('isDue', () => {
  it('is due when dueLesson <= lessonsDone', () => {
    expect(isDue({ box: 1, dueLesson: 3, seen: 1, correct: 0 }, 3)).toBe(true)
    expect(isDue({ box: 1, dueLesson: 4, seen: 1, correct: 0 }, 3)).toBe(false)
  })
})

describe('applyAnswer', () => {
  it('on correct: bumps box, schedules by new interval, counts seen+correct', () => {
    const card = newCard(0)
    const next = applyAnswer(card, true, 1) // base = 1, box 1->2, interval 2
    expect(next).toEqual({ box: 2, dueLesson: 3, seen: 1, correct: 1 })
  })
  it('on wrong: resets box to 1, due next lesson, seen++ but not correct', () => {
    const card = { box: 4, dueLesson: 10, seen: 5, correct: 4 }
    const next = applyAnswer(card, false, 7) // box->1, interval 1
    expect(next).toEqual({ box: 1, dueLesson: 8, seen: 6, correct: 4 })
  })
  it('does not mutate the input card', () => {
    const card = newCard(0)
    applyAnswer(card, true, 1)
    expect(card).toEqual({ box: 1, dueLesson: 0, seen: 0, correct: 0 })
  })
})

describe('introducedCard', () => {
  it('keeps box 1 and schedules for next lesson', () => {
    expect(introducedCard(2)).toEqual({ box: 1, dueLesson: 3, seen: 1, correct: 0 })
  })
})

describe('learnedCount', () => {
  it('counts only cards at box >= 3', () => {
    const p = emptyProgress()
    p.kana = {
      あ: { box: 3, dueLesson: 0, seen: 4, correct: 3 },
      い: { box: 5, dueLesson: 0, seen: 9, correct: 9 },
      う: { box: 2, dueLesson: 0, seen: 2, correct: 1 },
    }
    expect(learnedCount(p)).toBe(2)
  })

  it('weakItems returns seen-but-not-learned, worst first', () => {
    const p = emptyProgress()
    p.kana = {
      あ: { box: 3, dueLesson: 0, seen: 5, correct: 5 }, // learned -> excluded
      い: { box: 2, dueLesson: 0, seen: 4, correct: 3 }, // weak
      う: { box: 1, dueLesson: 0, seen: 4, correct: 1 }, // weaker (lower box)
      え: { box: 1, dueLesson: 0, seen: 0, correct: 0 }, // never seen -> excluded
    }
    const deck = [
      { kana: 'あ', romaji: 'a' },
      { kana: 'い', romaji: 'i' },
      { kana: 'う', romaji: 'u' },
      { kana: 'え', romaji: 'e' },
    ]
    const weak = weakItems(p, deck)
    expect(weak.map((k) => k.kana)).toEqual(['う', 'い']) // lowest box first
  })

  it('learnedCountFor restricts to the given deck', () => {
    const p = emptyProgress()
    p.kana = {
      あ: { box: 3, dueLesson: 0, seen: 4, correct: 3 }, // hiragana, learned
      ア: { box: 4, dueLesson: 0, seen: 5, correct: 5 }, // katakana, learned
      イ: { box: 1, dueLesson: 0, seen: 1, correct: 0 }, // katakana, not yet
    }
    expect(learnedCountFor(p, [{ kana: 'あ', romaji: 'a' }])).toBe(1)
    expect(
      learnedCountFor(p, [
        { kana: 'ア', romaji: 'a' },
        { kana: 'イ', romaji: 'i' },
      ]),
    ).toBe(1)
  })
})

describe('selectLessonKana', () => {
  it('cold start: all intro, in teaching order, capped at size', () => {
    const items = selectLessonKana(emptyProgress(), HIRAGANA, 6)
    expect(items).toHaveLength(6)
    expect(items.every((i) => i.mode === 'intro')).toBe(true)
    expect(items.map((i) => i.kana.kana)).toEqual(['あ', 'い', 'う', 'え', 'お', 'か'])
  })

  it('prioritizes due review cards (quiz) before new glyphs (intro)', () => {
    const p: Progress = {
      ...emptyProgress(),
      lessonsDone: 5,
      kana: {
        あ: { box: 2, dueLesson: 4, seen: 2, correct: 2 }, // due (4 <= 5)
        い: { box: 3, dueLesson: 99, seen: 3, correct: 3 }, // not due
      },
    }
    const items = selectLessonKana(p, HIRAGANA, 6)
    expect(items[0]).toEqual({ kana: { kana: 'あ', romaji: 'a' }, mode: 'quiz' })
    // remaining filled with new glyphs (skipping あ/い which are introduced)
    const newOnes = items.slice(1)
    expect(newOnes.every((i) => i.mode === 'intro')).toBe(true)
    expect(newOnes.map((i) => i.kana.kana)).toEqual(['う', 'え', 'お', 'か', 'き'])
  })

  it('REGRESSION: a glyph introduced last lesson is due (quiz) the very next lesson', () => {
    // Lesson 1 introduced あ via introducedCard(base=1); lessonsDone is now 1.
    const p: Progress = {
      ...emptyProgress(),
      lessonsDone: 1,
      kana: { あ: introducedCard(1) }, // dueLesson = 1 + interval(1) = 2
    }
    const items = selectLessonKana(p, HIRAGANA, 6)
    // Upcoming lesson is #2, so あ (dueLesson 2) must appear as a quiz, not be skipped.
    expect(items[0]).toEqual({ kana: { kana: 'あ', romaji: 'a' }, mode: 'quiz' })
  })

  it('fallback: nothing due and nothing new -> review lowest box first', () => {
    // Introduce ALL kana, none due.
    const kana: Progress['kana'] = {}
    for (const k of HIRAGANA) kana[k.kana] = { box: 3, dueLesson: 999, seen: 5, correct: 5 }
    kana['ん'] = { box: 1, dueLesson: 999, seen: 1, correct: 0 } // lowest box
    const p: Progress = { ...emptyProgress(), lessonsDone: 10, kana }
    const items = selectLessonKana(p, HIRAGANA, 6)
    expect(items).toHaveLength(6)
    expect(items[0].kana.kana).toBe('ん')
    expect(items.every((i) => i.mode === 'quiz')).toBe(true)
  })
})
