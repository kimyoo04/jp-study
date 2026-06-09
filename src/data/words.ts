// 기초 단어 / 인사말 (N5 수준). 카드는 글자(kana) + romaji + 뜻(meaning).
// 행 구조는 가나와 동일하게 재사용 — 레슨 묶음과 같은 행 distractor에 쓰임.
import type { Kana } from './kana'

export const WORD_ROWS: Kana[][] = [
  // 인사말
  [
    { kana: 'こんにちは', romaji: 'konnichiwa', meaning: '안녕하세요 (낮)' },
    { kana: 'おはよう', romaji: 'ohayou', meaning: '안녕 (아침)' },
    { kana: 'こんばんは', romaji: 'konbanwa', meaning: '안녕하세요 (밤)' },
    { kana: 'ありがとう', romaji: 'arigatou', meaning: '고마워요' },
    { kana: 'すみません', romaji: 'sumimasen', meaning: '실례합니다' },
    { kana: 'さようなら', romaji: 'sayounara', meaning: '안녕히 가세요' },
    { kana: 'はい', romaji: 'hai', meaning: '네' },
    { kana: 'いいえ', romaji: 'iie', meaning: '아니요' },
  ],
  // 숫자
  [
    { kana: 'いち', romaji: 'ichi', meaning: '1' },
    { kana: 'に', romaji: 'ni', meaning: '2' },
    { kana: 'さん', romaji: 'san', meaning: '3' },
    { kana: 'よん', romaji: 'yon', meaning: '4' },
    { kana: 'ご', romaji: 'go', meaning: '5' },
    { kana: 'ろく', romaji: 'roku', meaning: '6' },
    { kana: 'なな', romaji: 'nana', meaning: '7' },
    { kana: 'はち', romaji: 'hachi', meaning: '8' },
    { kana: 'きゅう', romaji: 'kyuu', meaning: '9' },
    { kana: 'じゅう', romaji: 'juu', meaning: '10' },
  ],
  // 생활 단어
  [
    { kana: 'みず', romaji: 'mizu', meaning: '물' },
    { kana: 'ひと', romaji: 'hito', meaning: '사람' },
    { kana: 'いえ', romaji: 'ie', meaning: '집' },
    { kana: 'ねこ', romaji: 'neko', meaning: '고양이' },
    { kana: 'いぬ', romaji: 'inu', meaning: '개' },
    { kana: 'ともだち', romaji: 'tomodachi', meaning: '친구' },
    { kana: 'がっこう', romaji: 'gakkou', meaning: '학교' },
    { kana: 'せんせい', romaji: 'sensei', meaning: '선생님' },
    { kana: 'おかね', romaji: 'okane', meaning: '돈' },
    { kana: 'じかん', romaji: 'jikan', meaning: '시간' },
  ],
  // 시간
  [
    { kana: 'きょう', romaji: 'kyou', meaning: '오늘' },
    { kana: 'あした', romaji: 'ashita', meaning: '내일' },
    { kana: 'きのう', romaji: 'kinou', meaning: '어제' },
  ],
]

/** All words flattened in teaching order. */
export const WORDS: Kana[] = WORD_ROWS.flat()
