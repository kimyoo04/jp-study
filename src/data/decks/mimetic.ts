// mimetic 덱 — 지연 로드되는 청크. src/data/decks.ts 의 loadDeck() 만 이 파일을
// 동적 import 한다. 정적으로 import 하면 초기 번들에 다시 묶인다.
import type { Deck } from '../kana'
import { MIMETIC_ROWS, MIMETICS } from '../mimetic'

const MIMETIC_CATS = [
  '감정 1', '감정 2', '몸 상태', '날씨 / 공기', '음식 식감', '말 / 표정',
  '동작 / 태도', '상태 / 모양', '움직임 / 일상',
]

export const deck: Deck = {
  id: 'mimetic',
  label: '의태어',
  kind: 'words',
  rows: MIMETIC_ROWS,
  kana: MIMETICS,
  catLabels: MIMETIC_CATS,
}

export default deck
