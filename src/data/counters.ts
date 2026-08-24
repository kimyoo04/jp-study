// 조수사 — 숫자 세기. 읽기가 불규칙해서 통째로 외워야 하는 고빈도 표현만 모았다.
// 행 = 조수사 하나(또는 묶음). 같은 행이 오답 후보가 되어 ひとり/ふたり처럼
// 헷갈리는 읽기끼리 비교하며 연습하게 된다.
import type { Kana } from './kana'
import { COUNTER_EXPANSION_ROWS } from './counters-expanded'

export const BASE_COUNTER_ROWS: Kana[][] = [
  // 개수 〜つ
  [
    { kana: 'ひとつ', written: '一つ', romaji: 'hitotsu', meaning: '하나 (1개)' },
    { kana: 'ふたつ', written: '二つ', romaji: 'futatsu', meaning: '둘 (2개)' },
    { kana: 'みっつ', written: '三つ', romaji: 'mittsu', meaning: '셋 (3개)' },
    { kana: 'よっつ', written: '四つ', romaji: 'yottsu', meaning: '넷 (4개)' },
    { kana: 'いつつ', written: '五つ', romaji: 'itsutsu', meaning: '다섯 (5개)' },
    { kana: 'むっつ', written: '六つ', romaji: 'muttsu', meaning: '여섯 (6개)' },
    { kana: 'ななつ', written: '七つ', romaji: 'nanatsu', meaning: '일곱 (7개)' },
    { kana: 'やっつ', written: '八つ', romaji: 'yattsu', meaning: '여덟 (8개)' },
    { kana: 'ここのつ', written: '九つ', romaji: 'kokonotsu', meaning: '아홉 (9개)' },
    { kana: 'とお', written: '十', romaji: 'too', meaning: '열 (10개)' },
  ],
  // 사람 〜人
  [
    { kana: 'ひとり', written: '一人', romaji: 'hitori', meaning: '한 명 (1人)' },
    { kana: 'ふたり', written: '二人', romaji: 'futari', meaning: '두 명 (2人)' },
    { kana: 'さんにん', written: '三人', romaji: 'sannin', meaning: '세 명 (3人)' },
    { kana: 'よにん', written: '四人', romaji: 'yonin', meaning: '네 명 (4人)' },
    { kana: 'ごにん', written: '五人', romaji: 'gonin', meaning: '다섯 명 (5人)' },
    { kana: 'ろくにん', written: '六人', romaji: 'rokunin', meaning: '여섯 명 (6人)' },
    { kana: 'しちにん', written: '七人', romaji: 'shichinin', meaning: '일곱 명 (7人)' },
    { kana: 'はちにん', written: '八人', romaji: 'hachinin', meaning: '여덟 명 (8人)' },
    { kana: 'きゅうにん', written: '九人', romaji: 'kyuunin', meaning: '아홉 명 (9人)' },
    { kana: 'なんにん', written: '何人', romaji: 'nannin', meaning: '몇 명' },
  ],
  // 날짜 1〜10일
  [
    { kana: 'ついたち', written: '一日', romaji: 'tsuitachi', meaning: '1일 (초하루)' },
    { kana: 'ふつか', written: '二日', romaji: 'futsuka', meaning: '2일' },
    { kana: 'みっか', written: '三日', romaji: 'mikka', meaning: '3일' },
    { kana: 'よっか', written: '四日', romaji: 'yokka', meaning: '4일' },
    { kana: 'いつか', written: '五日', romaji: 'itsuka', meaning: '5일' },
    { kana: 'むいか', written: '六日', romaji: 'muika', meaning: '6일' },
    { kana: 'なのか', written: '七日', romaji: 'nanoka', meaning: '7일' },
    { kana: 'ようか', written: '八日', romaji: 'youka', meaning: '8일' },
    { kana: 'ここのか', written: '九日', romaji: 'kokonoka', meaning: '9일' },
    { kana: 'とおか', written: '十日', romaji: 'tooka', meaning: '10일' },
  ],
  // 날짜 응용 / 기간
  [
    { kana: 'じゅうよっか', written: '十四日', romaji: 'juuyokka', meaning: '14일' },
    { kana: 'はつか', written: '二十日', romaji: 'hatsuka', meaning: '20일' },
    { kana: 'にじゅうよっか', written: '二十四日', romaji: 'nijuuyokka', meaning: '24일' },
    { kana: 'なんにち', written: '何日', romaji: 'nannichi', meaning: '며칠' },
    { kana: 'いっしゅうかん', written: '一週間', romaji: 'isshuukan', meaning: '일주일 (1週間)' },
    { kana: 'いっかげつ', written: '一か月', romaji: 'ikkagetsu', meaning: '한 달 (1か月)' },
    { kana: 'はんとし', written: '半年', romaji: 'hantoshi', meaning: '반년' },
    { kana: 'いちねん', written: '一年', romaji: 'ichinen', meaning: '1년' },
  ],
  // 시간 〜時
  [
    { kana: 'いちじ', written: '一時', romaji: 'ichiji', meaning: '1시' },
    { kana: 'よじ', written: '四時', romaji: 'yoji', meaning: '4시' },
    { kana: 'ごじ', written: '五時', romaji: 'goji', meaning: '5시' },
    { kana: 'しちじ', written: '七時', romaji: 'shichiji', meaning: '7시' },
    { kana: 'はちじ', written: '八時', romaji: 'hachiji', meaning: '8시' },
    { kana: 'くじ', written: '九時', romaji: 'kuji', meaning: '9시' },
    { kana: 'じゅういちじ', written: '十一時', romaji: 'juuichiji', meaning: '11시' },
    { kana: 'じゅうにじ', written: '十二時', romaji: 'juuniji', meaning: '12시' },
    { kana: 'なんじ', written: '何時', romaji: 'nanji', meaning: '몇 시' },
  ],
  // 분 〜分
  [
    { kana: 'いっぷん', written: '一分', romaji: 'ippun', meaning: '1분' },
    { kana: 'にふん', written: '二分', romaji: 'nifun', meaning: '2분' },
    { kana: 'さんぷん', written: '三分', romaji: 'sanpun', meaning: '3분' },
    { kana: 'よんぷん', written: '四分', romaji: 'yonpun', meaning: '4분' },
    { kana: 'ごふん', written: '五分', romaji: 'gofun', meaning: '5분' },
    { kana: 'ろっぷん', written: '六分', romaji: 'roppun', meaning: '6분' },
    { kana: 'ななふん', written: '七分', romaji: 'nanafun', meaning: '7분' },
    { kana: 'はっぷん', written: '八分', romaji: 'happun', meaning: '8분' },
    { kana: 'じゅっぷん', written: '十分', romaji: 'juppun', meaning: '10분' },
    { kana: 'なんぷん', written: '何分', romaji: 'nanpun', meaning: '몇 분' },
  ],
  // 장 〜枚 (얇은 것)
  [
    { kana: 'いちまい', written: '一枚', romaji: 'ichimai', meaning: '한 장 (1枚)' },
    { kana: 'にまい', written: '二枚', romaji: 'nimai', meaning: '두 장 (2枚)' },
    { kana: 'さんまい', written: '三枚', romaji: 'sanmai', meaning: '세 장 (3枚)' },
    { kana: 'ごまい', written: '五枚', romaji: 'gomai', meaning: '다섯 장 (5枚)' },
    { kana: 'じゅうまい', written: '十枚', romaji: 'juumai', meaning: '열 장 (10枚)' },
    { kana: 'なんまい', written: '何枚', romaji: 'nanmai', meaning: '몇 장' },
  ],
  // 자루·병 〜本 (긴 것)
  [
    { kana: 'いっぽん', written: '一本', romaji: 'ippon', meaning: '한 병/자루 (1本)' },
    { kana: 'にほん', written: '二本', romaji: 'nihon', meaning: '두 병/자루 (2本)' },
    { kana: 'さんぼん', written: '三本', romaji: 'sanbon', meaning: '세 병/자루 (3本)' },
    { kana: 'ごほん', written: '五本', romaji: 'gohon', meaning: '다섯 병/자루 (5本)' },
    { kana: 'ろっぽん', written: '六本', romaji: 'roppon', meaning: '여섯 병/자루 (6本)' },
    { kana: 'なんぼん', written: '何本', romaji: 'nanbon', meaning: '몇 병/자루' },
  ],
  // 잔 〜杯 / 개 〜個
  [
    { kana: 'いっぱい', written: '一杯', romaji: 'ippai', meaning: '한 잔 (1杯) / 가득' },
    { kana: 'にはい', written: '二杯', romaji: 'nihai', meaning: '두 잔 (2杯)' },
    { kana: 'さんばい', written: '三杯', romaji: 'sanbai', meaning: '세 잔 (3杯)' },
    { kana: 'なんばい', written: '何杯', romaji: 'nanbai', meaning: '몇 잔' },
    { kana: 'いっこ', written: '一個', romaji: 'ikko', meaning: '한 개 (1個)' },
    { kana: 'にこ', written: '二個', romaji: 'niko', meaning: '두 개 (2個)' },
    { kana: 'さんこ', written: '三個', romaji: 'sanko', meaning: '세 개 (3個)' },
    { kana: 'ごこ', written: '五個', romaji: 'goko', meaning: '다섯 개 (5個)' },
    { kana: 'なんこ', written: '何個', romaji: 'nanko', meaning: '몇 개' },
  ],
  // 마리 〜匹 (작은 동물)
  [
    { kana: 'いっぴき', written: '一匹', romaji: 'ippiki', meaning: '한 마리 (1匹)' },
    { kana: 'にひき', written: '二匹', romaji: 'nihiki', meaning: '두 마리 (2匹)' },
    { kana: 'さんびき', written: '三匹', romaji: 'sanbiki', meaning: '세 마리 (3匹)' },
    { kana: 'ろっぴき', written: '六匹', romaji: 'roppiki', meaning: '여섯 마리 (6匹)' },
    { kana: 'なんびき', written: '何匹', romaji: 'nanbiki', meaning: '몇 마리' },
  ],
  // 횟수 〜回
  [
    { kana: 'いっかい', written: '一回', romaji: 'ikkai', meaning: '한 번 (1回)' },
    { kana: 'にかい', written: '二回', romaji: 'nikai', meaning: '두 번 (2回)' },
    { kana: 'さんかい', written: '三回', romaji: 'sankai', meaning: '세 번 (3回)' },
    { kana: 'よんかい', written: '四回', romaji: 'yonkai', meaning: '네 번 (4回)' },
    { kana: 'ごかい', written: '五回', romaji: 'gokai', meaning: '다섯 번 (5回)' },
    { kana: 'なんかい', written: '何回', romaji: 'nankai', meaning: '몇 번' },
  ],
  // 나이 〜歳
  [
    { kana: 'いっさい', written: '一歳', romaji: 'issai', meaning: '한 살 (1歳)' },
    { kana: 'にさい', written: '二歳', romaji: 'nisai', meaning: '두 살 (2歳)' },
    { kana: 'はっさい', written: '八歳', romaji: 'hassai', meaning: '여덟 살 (8歳)' },
    { kana: 'じゅっさい', written: '十歳', romaji: 'jussai', meaning: '열 살 (10歳)' },
    { kana: 'はたち', written: '二十歳', romaji: 'hatachi', meaning: '스무 살 (20歳)' },
    { kana: 'なんさい', written: '何歳', romaji: 'nansai', meaning: '몇 살' },
    { kana: 'おいくつ', romaji: 'oikutsu', meaning: '연세가 어떻게 되세요 (정중)' },
  ],
  // 월 〜月
  [
    { kana: 'いちがつ', written: '一月', romaji: 'ichigatsu', meaning: '1월' },
    { kana: 'しがつ', written: '四月', romaji: 'shigatsu', meaning: '4월' },
    { kana: 'しちがつ', written: '七月', romaji: 'shichigatsu', meaning: '7월' },
    { kana: 'くがつ', written: '九月', romaji: 'kugatsu', meaning: '9월' },
    { kana: 'じゅうがつ', written: '十月', romaji: 'juugatsu', meaning: '10월' },
    { kana: 'じゅうにがつ', written: '十二月', romaji: 'juunigatsu', meaning: '12월' },
    { kana: 'なんがつ', written: '何月', romaji: 'nangatsu', meaning: '몇 월' },
  ],
]

export const COUNTER_ROWS: Kana[][] = BASE_COUNTER_ROWS.map((row, i) => [
  ...row,
  ...COUNTER_EXPANSION_ROWS[i],
])

/** All counters flattened in teaching order. */
export const COUNTERS: Kana[] = COUNTER_ROWS.flat()
