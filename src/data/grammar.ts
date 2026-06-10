// 문법 / 예문 (N5 기초 패턴). 각 행 = 한 패턴, 그 패턴을 쓰는 예문들.
// 카드는 예문(kana) + romaji + 뜻(meaning) + 패턴 라벨(note). 'sentence' 종류 덱이라
// "예문 → 뜻 고르기" 퀴즈를 쓰되 문장 크기로 렌더한다.
import type { Kana } from './kana'

export const GRAMMAR_ROWS: Kana[][] = [
  // ～は～です : ~은/는 ~입니다
  [
    { kana: 'わたしは がくせいです', romaji: 'watashi wa gakusei desu', meaning: '저는 학생입니다', note: '～は～です (~은/는 ~입니다)' },
    { kana: 'これは ほんです', romaji: 'kore wa hon desu', meaning: '이것은 책입니다', note: '～は～です (~은/는 ~입니다)' },
    { kana: 'かれは せんせいです', romaji: 'kare wa sensei desu', meaning: '그는 선생님입니다', note: '～は～です (~은/는 ~입니다)' },
    { kana: 'わたしは かんこくじんです', romaji: 'watashi wa kankokujin desu', meaning: '저는 한국인입니다', note: '～は～です (~은/는 ~입니다)' },
    { kana: 'あれは くるまです', romaji: 'are wa kuruma desu', meaning: '저것은 자동차입니다', note: '～は～です (~은/는 ~입니다)' },
  ],
  // ～を ～ます : ~을/를 ~합니다
  [
    { kana: 'ごはんを たべます', romaji: 'gohan o tabemasu', meaning: '밥을 먹습니다', note: '～を ～ます (~을/를 ~합니다)' },
    { kana: 'みずを のみます', romaji: 'mizu o nomimasu', meaning: '물을 마십니다', note: '～を ～ます (~을/를 ~합니다)' },
    { kana: 'ほんを よみます', romaji: 'hon o yomimasu', meaning: '책을 읽습니다', note: '～を ～ます (~을/를 ~합니다)' },
    { kana: 'テレビを みます', romaji: 'terebi o mimasu', meaning: '텔레비전을 봅니다', note: '～を ～ます (~을/를 ~합니다)' },
    { kana: 'てがみを かきます', romaji: 'tegami o kakimasu', meaning: '편지를 씁니다', note: '～を ～ます (~을/를 ~합니다)' },
  ],
  // ～が すきです : ~을/를 좋아합니다
  [
    { kana: 'ねこが すきです', romaji: 'neko ga suki desu', meaning: '고양이를 좋아합니다', note: '～が すきです (~을/를 좋아합니다)' },
    { kana: 'コーヒーが すきです', romaji: 'koohii ga suki desu', meaning: '커피를 좋아합니다', note: '～が すきです (~을/를 좋아합니다)' },
    { kana: 'おんがくが すきです', romaji: 'ongaku ga suki desu', meaning: '음악을 좋아합니다', note: '～が すきです (~을/를 좋아합니다)' },
    { kana: 'さかなが すきです', romaji: 'sakana ga suki desu', meaning: '생선을 좋아합니다', note: '～が すきです (~을/를 좋아합니다)' },
  ],
  // ～に いきます : ~에 갑니다
  [
    { kana: 'がっこうに いきます', romaji: 'gakkou ni ikimasu', meaning: '학교에 갑니다', note: '～に いきます (~에 갑니다)' },
    { kana: 'うちに かえります', romaji: 'uchi ni kaerimasu', meaning: '집에 돌아갑니다', note: '～に いきます (~에 갑니다)' },
    { kana: 'とうきょうに いきます', romaji: 'toukyou ni ikimasu', meaning: '도쿄에 갑니다', note: '～に いきます (~에 갑니다)' },
    { kana: 'えきに いきます', romaji: 'eki ni ikimasu', meaning: '역에 갑니다', note: '～に いきます (~에 갑니다)' },
  ],
  // ～ました : ~했습니다 (과거)
  [
    { kana: 'えいがを みました', romaji: 'eiga o mimashita', meaning: '영화를 봤습니다', note: '～ました (~했습니다, 과거)' },
    { kana: 'ともだちに あいました', romaji: 'tomodachi ni aimashita', meaning: '친구를 만났습니다', note: '～ました (~했습니다, 과거)' },
    { kana: 'ほんを かいました', romaji: 'hon o kaimashita', meaning: '책을 샀습니다', note: '～ました (~했습니다, 과거)' },
    { kana: 'はやく おきました', romaji: 'hayaku okimashita', meaning: '일찍 일어났습니다', note: '～ました (~했습니다, 과거)' },
  ],
]

/** All example sentences flattened in teaching order. */
export const GRAMMAR: Kana[] = GRAMMAR_ROWS.flat()
