// grammar 덱 — 지연 로드되는 청크. src/data/decks.ts 의 loadDeck() 만 이 파일을
// 동적 import 한다. 정적으로 import 하면 초기 번들에 다시 묶인다.
import type { Deck } from '../kana'
import { GRAMMAR_ROWS, GRAMMAR } from '../grammar'


export const deck: Deck = {
  id: 'grammar',
  label: '문법',
  kind: 'sentence',
  rows: GRAMMAR_ROWS,
  kana: GRAMMAR,
}

export default deck
