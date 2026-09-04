// keigo 덱 — 지연 로드되는 청크. src/data/decks.ts 의 loadDeck() 만 이 파일을
// 동적 import 한다. 정적으로 import 하면 초기 번들에 다시 묶인다.
import type { Deck } from '../kana'
import { KEIGO_ROWS, KEIGO } from '../keigo'


export const deck: Deck = {
  id: 'keigo',
  label: '경어',
  kind: 'sentence',
  rows: KEIGO_ROWS,
  kana: KEIGO,
  koReading: true,
}

export default deck
