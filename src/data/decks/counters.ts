// counters 덱 — 지연 로드되는 청크. src/data/decks.ts 의 loadDeck() 만 이 파일을
// 동적 import 한다. 정적으로 import 하면 초기 번들에 다시 묶인다.
import type { Deck } from '../kana'
import { COUNTER_ROWS, COUNTERS } from '../counters'

const COUNTER_CATS = [
  '개수 〜つ', '사람 〜人', '날짜 1〜10일', '날짜 / 기간', '시간 〜時', '분 〜分',
  '장 〜枚', '병/자루 〜本', '잔 〜杯 / 개 〜個', '마리 〜匹', '횟수 〜回', '나이 〜歳', '월 〜月',
]

export const deck: Deck = {
  id: 'counters',
  label: '조수사',
  kind: 'words',
  rows: COUNTER_ROWS,
  kana: COUNTERS,
  catLabels: COUNTER_CATS,
}

export default deck
