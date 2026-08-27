// URL ⇄ 화면 매핑.
//
// 화면은 두 종류로 나뉜다:
//
// 1) 주소를 가지는 화면(Location) — 콜드 로드로 복원할 수 있다. URL만 있으면
//    같은 화면이 다시 그려지므로 공유·색인·북마크의 단위가 된다.
// 2) 일시적 화면(레슨·완료·흘려듣기·JLPT 시험/리포트) — 진행 중 상태(출제된
//    문항, 답안, 타이머)가 URL에 담기지 않아 복원이 불가능하다. 이 화면들은
//    자기 부모 Location의 경로를 push 해서 뒤로가기가 부모로 빠지게만 한다.
//
// 그래서 popstate는 항상 "경로 → Location"으로만 해석한다. 일시적 화면으로
// 되돌아가는 경우가 없으니 복원 불가 상태를 만들 수 없다.
import { DECKS, type DeckId } from '../data/kana'

/** Vite의 base('/jp-study/'). 개발 서버에서도 같은 접두사로 서빙된다. */
const BASE = import.meta.env.BASE_URL

export type Location =
  | { screen: 'home'; deckId: DeckId }
  | { screen: 'search' }
  | { screen: 'learn' }
  | { screen: 'learn-reader'; week: number }
  | { screen: 'jlpt-home' }

export const HOME: Location = { screen: 'home', deckId: DECKS[0].id }

/** Location → 절대 경로(base 포함). 홈의 첫 덱은 접미사 없는 루트로 둔다. */
export function pathOf(loc: Location): string {
  switch (loc.screen) {
    case 'home':
      return loc.deckId === DECKS[0].id ? BASE : `${BASE}deck/${loc.deckId}`
    case 'search':
      return `${BASE}search`
    case 'learn':
      return `${BASE}learn`
    case 'learn-reader':
      return `${BASE}learn/week-${loc.week}`
    case 'jlpt-home':
      return `${BASE}jlpt`
  }
}

/** 경로 → Location. 알 수 없는 경로는 홈으로 떨어진다(404.html 부팅 포함). */
export function parsePath(pathname: string): Location {
  const rest = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname.replace(/^\//, '')
  const segments = rest.split('/').filter(Boolean)

  if (segments.length === 0) return HOME

  if (segments[0] === 'deck' && segments[1]) {
    const deck = DECKS.find((d) => d.id === segments[1])
    return deck ? { screen: 'home', deckId: deck.id } : HOME
  }
  if (segments[0] === 'search') return { screen: 'search' }
  if (segments[0] === 'jlpt') return { screen: 'jlpt-home' }
  if (segments[0] === 'learn') {
    if (!segments[1]) return { screen: 'learn' }
    // 주차 존재 여부는 검사하지 않는다 — CURRICULUM 을 여기서 import 하면 71KB
    // 데이터가 초기 번들에 묶여 지연 로딩이 무의미해진다. 없는 주차는 화면
    // (LearnReader)이 목차로 돌려보낸다.
    const week = Number(/^week-(\d+)$/.exec(segments[1])?.[1])
    return Number.isInteger(week) && week >= 1 ? { screen: 'learn-reader', week } : { screen: 'learn' }
  }
  return HOME
}

/** 현재 주소창의 Location. */
export function currentLocation(): Location {
  return parsePath(window.location.pathname)
}
