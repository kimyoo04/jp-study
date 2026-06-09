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
    { kana: 'ともだち', romaji: 'tomodachi', meaning: '친구' },
    { kana: 'がっこう', romaji: 'gakkou', meaning: '학교' },
    { kana: 'せんせい', romaji: 'sensei', meaning: '선생님' },
    { kana: 'おかね', romaji: 'okane', meaning: '돈' },
    { kana: 'じかん', romaji: 'jikan', meaning: '시간' },
    { kana: 'でんわ', romaji: 'denwa', meaning: '전화' },
    { kana: 'えき', romaji: 'eki', meaning: '역' },
  ],
  // 시간
  [
    { kana: 'きょう', romaji: 'kyou', meaning: '오늘' },
    { kana: 'あした', romaji: 'ashita', meaning: '내일' },
    { kana: 'きのう', romaji: 'kinou', meaning: '어제' },
    { kana: 'いま', romaji: 'ima', meaning: '지금' },
    { kana: 'あさ', romaji: 'asa', meaning: '아침' },
    { kana: 'よる', romaji: 'yoru', meaning: '밤' },
  ],
  // 색깔
  [
    { kana: 'あか', romaji: 'aka', meaning: '빨강' },
    { kana: 'あお', romaji: 'ao', meaning: '파랑' },
    { kana: 'しろ', romaji: 'shiro', meaning: '흰색' },
    { kana: 'くろ', romaji: 'kuro', meaning: '검정' },
    { kana: 'きいろ', romaji: 'kiiro', meaning: '노랑' },
    { kana: 'みどり', romaji: 'midori', meaning: '초록' },
  ],
  // 음식
  [
    { kana: 'ごはん', romaji: 'gohan', meaning: '밥' },
    { kana: 'おちゃ', romaji: 'ocha', meaning: '차 (녹차)' },
    { kana: 'たまご', romaji: 'tamago', meaning: '계란' },
    { kana: 'さかな', romaji: 'sakana', meaning: '생선' },
    { kana: 'にく', romaji: 'niku', meaning: '고기' },
    { kana: 'やさい', romaji: 'yasai', meaning: '채소' },
    { kana: 'くだもの', romaji: 'kudamono', meaning: '과일' },
  ],
  // 동물
  [
    { kana: 'ねこ', romaji: 'neko', meaning: '고양이' },
    { kana: 'いぬ', romaji: 'inu', meaning: '개' },
    { kana: 'とり', romaji: 'tori', meaning: '새' },
    { kana: 'うま', romaji: 'uma', meaning: '말' },
    { kana: 'ぞう', romaji: 'zou', meaning: '코끼리' },
    { kana: 'くま', romaji: 'kuma', meaning: '곰' },
    { kana: 'うさぎ', romaji: 'usagi', meaning: '토끼' },
  ],
  // 가족
  [
    { kana: 'ちち', romaji: 'chichi', meaning: '아버지' },
    { kana: 'はは', romaji: 'haha', meaning: '어머니' },
    { kana: 'あに', romaji: 'ani', meaning: '형 / 오빠' },
    { kana: 'あね', romaji: 'ane', meaning: '누나 / 언니' },
    { kana: 'おとうと', romaji: 'otouto', meaning: '남동생' },
    { kana: 'いもうと', romaji: 'imouto', meaning: '여동생' },
  ],
  // 기초 동사
  [
    { kana: 'たべる', romaji: 'taberu', meaning: '먹다' },
    { kana: 'のむ', romaji: 'nomu', meaning: '마시다' },
    { kana: 'みる', romaji: 'miru', meaning: '보다' },
    { kana: 'いく', romaji: 'iku', meaning: '가다' },
    { kana: 'くる', romaji: 'kuru', meaning: '오다' },
    { kana: 'する', romaji: 'suru', meaning: '하다' },
    { kana: 'よむ', romaji: 'yomu', meaning: '읽다' },
    { kana: 'かく', romaji: 'kaku', meaning: '쓰다' },
  ],
  // 기초 형용사
  [
    { kana: 'おおきい', romaji: 'ookii', meaning: '크다' },
    { kana: 'ちいさい', romaji: 'chiisai', meaning: '작다' },
    { kana: 'あつい', romaji: 'atsui', meaning: '덥다 / 뜨겁다' },
    { kana: 'さむい', romaji: 'samui', meaning: '춥다' },
    { kana: 'たかい', romaji: 'takai', meaning: '비싸다 / 높다' },
    { kana: 'やすい', romaji: 'yasui', meaning: '싸다' },
    { kana: 'おいしい', romaji: 'oishii', meaning: '맛있다' },
    { kana: 'あたらしい', romaji: 'atarashii', meaning: '새롭다' },
  ],
  // 요일
  [
    { kana: 'げつようび', romaji: 'getsuyoubi', meaning: '월요일' },
    { kana: 'かようび', romaji: 'kayoubi', meaning: '화요일' },
    { kana: 'すいようび', romaji: 'suiyoubi', meaning: '수요일' },
    { kana: 'もくようび', romaji: 'mokuyoubi', meaning: '목요일' },
    { kana: 'きんようび', romaji: 'kinyoubi', meaning: '금요일' },
    { kana: 'どようび', romaji: 'doyoubi', meaning: '토요일' },
    { kana: 'にちようび', romaji: 'nichiyoubi', meaning: '일요일' },
  ],
]

/** All words flattened in teaching order. */
export const WORDS: Kana[] = WORD_ROWS.flat()
