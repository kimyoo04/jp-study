// loanwords 덱 — 지연 로드되는 청크. src/data/decks.ts 의 loadDeck() 만 이 파일을
// 동적 import 한다. 정적으로 import 하면 초기 번들에 다시 묶인다.
import type { Deck } from '../kana'
import { LOANWORD_ROWS, LOANWORDS } from '../loanwords'

const BASE_LOANWORD_CATS = [
  '음식 / 음료', '장소', '기기 / 디지털', '취미 / 스포츠', '의류 / 물건', '음식 2', '나라',
  '취미 / 스포츠 2', '생활 물건', '현대 / IT', '의류 2', '음식 / 음료 3', '나라 2', '스포츠 3',
  '직장 / 학교', '색 / 추상', '음식 2', '가전 / 기기 2', '장소 2', '직업 / 사람', '취미 / 일상 2',
  '음식 3', 'IT / 통신 2', '패션 / 뷰티', '교통 / 여행', '비즈니스 / 추상', '식당 / 메뉴',
  '가전 / 생활 2', '스포츠 / 취미 4', '음악 / 엔터', '추상 2', '음식 4', '패션 2', '직장 2',
  '여행 2', '감정 / 추상 3', '음식 5', '기기 3', '장소 3', '뷰티 / 패션 3', '추상 / 일 3',
  '자동차 / 교통 3',
  '디저트 / 간식 3', 'IT / 통신 3', '단위 / 수량', '생활용품 3', '쇼핑 / 패션 4',
]
const LOANWORD_CATS = [
  ...BASE_LOANWORD_CATS,
  ...Array.from(
    { length: LOANWORD_ROWS.length - BASE_LOANWORD_CATS.length },
    (_, i) => `JLPT 외래어 확장 ${i + 1}`,
  ),
]

export const deck: Deck = {
  id: 'loanwords',
  label: '외래어',
  kind: 'words',
  rows: LOANWORD_ROWS,
  kana: LOANWORDS,
  catLabels: LOANWORD_CATS,
}

export default deck
