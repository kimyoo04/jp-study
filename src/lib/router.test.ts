import { describe, expect, it } from 'vitest'
import { CURRICULUM } from '../data/curriculum'
import { DECK_META } from '../data/decks'
import { HOME, indexedPath, parsePath, pathOf, type Location } from './router'

const BASE = import.meta.env.BASE_URL

// DECK_META[0] 항목이 곧 HOME 이므로 따로 넣지 않는다(경로가 겹친다).
const ADDRESSABLE: Location[] = [
  ...DECK_META.map((d) => ({ screen: 'home', deckId: d.id }) as Location),
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
    expect(pathOf({ screen: 'home', deckId: DECK_META[0].id })).toBe(BASE)
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

  it('rejects a week that is not a positive integer', () => {
    for (const bad of ['week-0', 'week-abc', 'week--1', 'week-']) {
      expect(parsePath(`${BASE}learn/${bad}`)).toEqual({ screen: 'learn' })
    }
  })

  it('accepts an out-of-range week without loading the curriculum', () => {
    // 라우터는 주차 존재 여부를 검사하지 않는다 — CURRICULUM 을 import 하면
    // 71KB 가 초기 번들에 묶인다. 목차로 돌려보내는 건 LearnReader 의 일이고
    // e2e(routing.spec.ts)가 그 동작을 확인한다.
    const beyond = Math.max(...CURRICULUM.map((w) => w.week)) + 1
    expect(parsePath(`${BASE}learn/week-${beyond}`)).toEqual({
      screen: 'learn-reader',
      week: beyond,
    })
  })

  it('gives each curriculum week its own path', () => {
    const paths = CURRICULUM.map((w) => pathOf({ screen: 'learn-reader', week: w.week }))
    expect(new Set(paths).size).toBe(CURRICULUM.length)
  })

  it('gives every indexed path a trailing slash', () => {
    // GitHub Pages 는 <경로>/index.html 을 슬래시 없는 주소로 요청하면 301 을
    // 준다. canonical·사이트맵이 그 슬래시 없는 형태를 쓰면 "리다이렉트되는
    // 주소"를 색인 대표로 선언하는 셈이 된다.
    for (const loc of ADDRESSABLE) {
      expect(indexedPath(loc)).toMatch(/\/$/)
    }
  })

  it('keeps the indexed path parseable back to the same screen', () => {
    for (const loc of ADDRESSABLE) {
      expect(parsePath(indexedPath(loc))).toEqual(loc)
    }
  })
})
