// 외래어 (gairaigo) — 카타카나로 쓰는 외래어 단어. 카드는 글자 + romaji + 뜻.
// words.ts와 같은 'words' 종류 덱이라 같은 "뜻 고르기" 퀴즈 엔진을 씀.
import type { Kana } from './kana'

export const LOANWORD_ROWS: Kana[][] = [
  // 음식 / 음료
  [
    { kana: 'コーヒー', romaji: 'koohii', meaning: '커피' },
    { kana: 'ジュース', romaji: 'juusu', meaning: '주스' },
    { kana: 'ビール', romaji: 'biiru', meaning: '맥주' },
    { kana: 'ケーキ', romaji: 'keeki', meaning: '케이크' },
    { kana: 'チーズ', romaji: 'chiizu', meaning: '치즈' },
    { kana: 'アイス', romaji: 'aisu', meaning: '아이스크림' },
    { kana: 'パン', romaji: 'pan', meaning: '빵' },
  ],
  // 장소
  [
    { kana: 'ホテル', romaji: 'hoteru', meaning: '호텔' },
    { kana: 'レストラン', romaji: 'resutoran', meaning: '레스토랑' },
    { kana: 'コンビニ', romaji: 'konbini', meaning: '편의점' },
    { kana: 'バス', romaji: 'basu', meaning: '버스' },
    { kana: 'タクシー', romaji: 'takushii', meaning: '택시' },
    { kana: 'デパート', romaji: 'depaato', meaning: '백화점' },
  ],
  // 기기 / 디지털
  [
    { kana: 'テレビ', romaji: 'terebi', meaning: '텔레비전' },
    { kana: 'カメラ', romaji: 'kamera', meaning: '카메라' },
    { kana: 'パソコン', romaji: 'pasokon', meaning: '컴퓨터 (PC)' },
    { kana: 'スマホ', romaji: 'sumaho', meaning: '스마트폰' },
    { kana: 'メール', romaji: 'meeru', meaning: '이메일' },
    { kana: 'ニュース', romaji: 'nyuusu', meaning: '뉴스' },
  ],
  // 취미 / 스포츠
  [
    { kana: 'サッカー', romaji: 'sakkaa', meaning: '축구' },
    { kana: 'テニス', romaji: 'tenisu', meaning: '테니스' },
    { kana: 'ゲーム', romaji: 'geemu', meaning: '게임' },
    { kana: 'テスト', romaji: 'tesuto', meaning: '시험' },
    { kana: 'スポーツ', romaji: 'supootsu', meaning: '스포츠' },
  ],
  // 의류 / 물건
  [
    { kana: 'シャツ', romaji: 'shatsu', meaning: '셔츠' },
    { kana: 'ズボン', romaji: 'zubon', meaning: '바지' },
    { kana: 'スカート', romaji: 'sukaato', meaning: '치마' },
    { kana: 'ボタン', romaji: 'botan', meaning: '버튼 / 단추' },
    { kana: 'ペン', romaji: 'pen', meaning: '펜' },
    { kana: 'ノート', romaji: 'nooto', meaning: '공책' },
    { kana: 'ドア', romaji: 'doa', meaning: '문' },
    { kana: 'ベッド', romaji: 'beddo', meaning: '침대' },
  ],
]

/** All loanwords flattened in teaching order. */
export const LOANWORDS: Kana[] = LOANWORD_ROWS.flat()
