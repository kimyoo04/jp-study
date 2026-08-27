import { describe, expect, it } from 'vitest'
import { CURRICULUM } from '../data/curriculum'
import { DECKS } from '../data/kana'
import { HOME, parsePath, pathOf, type Location } from './router'

const BASE = import.meta.env.BASE_URL

// DECKS[0] 항목이 곧 HOME 이므로 따로 넣지 않는다(경로가 겹친다).
const ADDRESSABLE: Location[] = [
  ...DECKS.map((d) => ({ screen: 'home', deckId: d.id }) as Location),
  { screen: 'search' },
  { screen: 'learn' },
  ...CURRICULUM.map((w) => ({ screen: 'learn-reader', week: w.week }) as Location),
  { screen: 'jlpt-home' },
]

describe('pathOf / parsePath', () => {
  it('round-trips every addressable location', () => {
    for (const loc of ADDRESSABLE) {
      expect(parsePath(pathOf(loc))).toEqual(loc)
    }
  })

  it('emits paths under the deploy base', () => {
    for (const loc of ADDRESSABLE) {
      expect(pathOf(loc).startsWith(BASE)).toBe(true)
    }
  })

  it('gives every path a distinct URL', () => {
    const paths = ADDRESSABLE.map(pathOf)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('keeps the first deck on the bare base path', () => {
    expect(pathOf(HOME)).toBe(BASE)
    expect(pathOf({ screen: 'home', deckId: DECKS[0].id })).toBe(BASE)
  })

  it('parses the base path with or without a trailing slash', () => {
    expect(parsePath(BASE)).toEqual(HOME)
    expect(parsePath(BASE.replace(/\/$/, ''))).toEqual(HOME)
  })

  it('falls back to home for unknown paths', () => {
    for (const path of [`${BASE}nope`, `${BASE}deck/`, `${BASE}deck/not-a-deck`, '/elsewhere']) {
      expect(parsePath(path)).toEqual(HOME)
    }
  })

  it('falls back to the curriculum index for an out-of-range week', () => {
    const beyond = Math.max(...CURRICULUM.map((w) => w.week)) + 1
    expect(parsePath(`${BASE}learn/week-${beyond}`)).toEqual({ screen: 'learn' })
    expect(parsePath(`${BASE}learn/week-0`)).toEqual({ screen: 'learn' })
    expect(parsePath(`${BASE}learn/week-abc`)).toEqual({ screen: 'learn' })
  })

  it('gives each curriculum week its own path', () => {
    const paths = CURRICULUM.map((w) => pathOf({ screen: 'learn-reader', week: w.week }))
    expect(new Set(paths).size).toBe(CURRICULUM.length)
  })
})
