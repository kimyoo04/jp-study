// 조수사 — 숫자 세기. 읽기가 불규칙해서 통째로 외워야 하는 고빈도 표현만 모았다.
// 행 = 조수사 하나(또는 묶음). 같은 행이 오답 후보가 되어 ひとり/ふたり처럼
// 헷갈리는 읽기끼리 비교하며 연습하게 된다.
import type { Kana } from './kana'

export const COUNTER_ROWS: Kana[][] = [
  // 개수 〜つ
  [
    { kana: 'ひとつ', romaji: 'hitotsu', meaning: '하나 (1개)' },
    { kana: 'ふたつ', romaji: 'futatsu', meaning: '둘 (2개)' },
    { kana: 'みっつ', romaji: 'mittsu', meaning: '셋 (3개)' },
    { kana: 'よっつ', romaji: 'yottsu', meaning: '넷 (4개)' },
    { kana: 'いつつ', romaji: 'itsutsu', meaning: '다섯 (5개)' },
    { kana: 'むっつ', romaji: 'muttsu', meaning: '여섯 (6개)' },
    { kana: 'ななつ', romaji: 'nanatsu', meaning: '일곱 (7개)' },
    { kana: 'やっつ', romaji: 'yattsu', meaning: '여덟 (8개)' },
    { kana: 'ここのつ', romaji: 'kokonotsu', meaning: '아홉 (9개)' },
    { kana: 'とお', romaji: 'too', meaning: '열 (10개)' },
  ],
  // 사람 〜人
  [
    { kana: 'ひとり', romaji: 'hitori', meaning: '한 명 (1人)' },
    { kana: 'ふたり', romaji: 'futari', meaning: '두 명 (2人)' },
    { kana: 'さんにん', romaji: 'sannin', meaning: '세 명 (3人)' },
    { kana: 'よにん', romaji: 'yonin', meaning: '네 명 (4人)' },
    { kana: 'ごにん', romaji: 'gonin', meaning: '다섯 명 (5人)' },
    { kana: 'ろくにん', romaji: 'rokunin', meaning: '여섯 명 (6人)' },
    { kana: 'しちにん', romaji: 'shichinin', meaning: '일곱 명 (7人)' },
    { kana: 'はちにん', romaji: 'hachinin', meaning: '여덟 명 (8人)' },
    { kana: 'きゅうにん', romaji: 'kyuunin', meaning: '아홉 명 (9人)' },
    { kana: 'なんにん', romaji: 'nannin', meaning: '몇 명' },
  ],
  // 날짜 1〜10일
  [
    { kana: 'ついたち', romaji: 'tsuitachi', meaning: '1일 (초하루)' },
    { kana: 'ふつか', romaji: 'futsuka', meaning: '2일' },
    { kana: 'みっか', romaji: 'mikka', meaning: '3일' },
    { kana: 'よっか', romaji: 'yokka', meaning: '4일' },
    { kana: 'いつか', romaji: 'itsuka', meaning: '5일' },
    { kana: 'むいか', romaji: 'muika', meaning: '6일' },
    { kana: 'なのか', romaji: 'nanoka', meaning: '7일' },
    { kana: 'ようか', romaji: 'youka', meaning: '8일' },
    { kana: 'ここのか', romaji: 'kokonoka', meaning: '9일' },
    { kana: 'とおか', romaji: 'tooka', meaning: '10일' },
  ],
  // 날짜 응용 / 기간
  [
    { kana: 'じゅうよっか', romaji: 'juuyokka', meaning: '14일' },
    { kana: 'はつか', romaji: 'hatsuka', meaning: '20일' },
    { kana: 'にじゅうよっか', romaji: 'nijuuyokka', meaning: '24일' },
    { kana: 'なんにち', romaji: 'nannichi', meaning: '며칠' },
    { kana: 'いっしゅうかん', romaji: 'isshuukan', meaning: '일주일 (1週間)' },
    { kana: 'いっかげつ', romaji: 'ikkagetsu', meaning: '한 달 (1か月)' },
    { kana: 'はんとし', romaji: 'hantoshi', meaning: '반년' },
    { kana: 'いちねん', romaji: 'ichinen', meaning: '1년' },
  ],
  // 시간 〜時
  [
    { kana: 'いちじ', romaji: 'ichiji', meaning: '1시' },
    { kana: 'にじ', romaji: 'niji', meaning: '2시' },
    { kana: 'よじ', romaji: 'yoji', meaning: '4시' },
    { kana: 'ごじ', romaji: 'goji', meaning: '5시' },
    { kana: 'しちじ', romaji: 'shichiji', meaning: '7시' },
    { kana: 'くじ', romaji: 'kuji', meaning: '9시' },
    { kana: 'じゅういちじ', romaji: 'juuichiji', meaning: '11시' },
    { kana: 'じゅうにじ', romaji: 'juuniji', meaning: '12시' },
    { kana: 'なんじ', romaji: 'nanji', meaning: '몇 시' },
  ],
  // 분 〜分
  [
    { kana: 'いっぷん', romaji: 'ippun', meaning: '1분' },
    { kana: 'にふん', romaji: 'nifun', meaning: '2분' },
    { kana: 'さんぷん', romaji: 'sanpun', meaning: '3분' },
    { kana: 'よんぷん', romaji: 'yonpun', meaning: '4분' },
    { kana: 'ごふん', romaji: 'gofun', meaning: '5분' },
    { kana: 'ろっぷん', romaji: 'roppun', meaning: '6분' },
    { kana: 'ななふん', romaji: 'nanafun', meaning: '7분' },
    { kana: 'はっぷん', romaji: 'happun', meaning: '8분' },
    { kana: 'じゅっぷん', romaji: 'juppun', meaning: '10분' },
    { kana: 'なんぷん', romaji: 'nanpun', meaning: '몇 분' },
  ],
  // 장 〜枚 (얇은 것)
  [
    { kana: 'いちまい', romaji: 'ichimai', meaning: '한 장 (1枚)' },
    { kana: 'にまい', romaji: 'nimai', meaning: '두 장 (2枚)' },
    { kana: 'さんまい', romaji: 'sanmai', meaning: '세 장 (3枚)' },
    { kana: 'ごまい', romaji: 'gomai', meaning: '다섯 장 (5枚)' },
    { kana: 'じゅうまい', romaji: 'juumai', meaning: '열 장 (10枚)' },
    { kana: 'なんまい', romaji: 'nanmai', meaning: '몇 장' },
  ],
  // 자루·병 〜本 (긴 것)
  [
    { kana: 'いっぽん', romaji: 'ippon', meaning: '한 병/자루 (1本)' },
    { kana: 'にほん', romaji: 'nihon', meaning: '두 병/자루 (2本)' },
    { kana: 'さんぼん', romaji: 'sanbon', meaning: '세 병/자루 (3本)' },
    { kana: 'ごほん', romaji: 'gohon', meaning: '다섯 병/자루 (5本)' },
    { kana: 'ろっぽん', romaji: 'roppon', meaning: '여섯 병/자루 (6本)' },
    { kana: 'なんぼん', romaji: 'nanbon', meaning: '몇 병/자루' },
  ],
  // 잔 〜杯 / 개 〜個
  [
    { kana: 'いっぱい', romaji: 'ippai', meaning: '한 잔 (1杯)' },
    { kana: 'にはい', romaji: 'nihai', meaning: '두 잔 (2杯)' },
    { kana: 'さんばい', romaji: 'sanbai', meaning: '세 잔 (3杯)' },
    { kana: 'なんばい', romaji: 'nanbai', meaning: '몇 잔' },
    { kana: 'いっこ', romaji: 'ikko', meaning: '한 개 (1個)' },
    { kana: 'にこ', romaji: 'niko', meaning: '두 개 (2個)' },
    { kana: 'さんこ', romaji: 'sanko', meaning: '세 개 (3個)' },
    { kana: 'ごこ', romaji: 'goko', meaning: '다섯 개 (5個)' },
    { kana: 'なんこ', romaji: 'nanko', meaning: '몇 개' },
  ],
  // 마리 〜匹 (작은 동물)
  [
    { kana: 'いっぴき', romaji: 'ippiki', meaning: '한 마리 (1匹)' },
    { kana: 'にひき', romaji: 'nihiki', meaning: '두 마리 (2匹)' },
    { kana: 'さんびき', romaji: 'sanbiki', meaning: '세 마리 (3匹)' },
    { kana: 'ろっぴき', romaji: 'roppiki', meaning: '여섯 마리 (6匹)' },
    { kana: 'なんびき', romaji: 'nanbiki', meaning: '몇 마리' },
  ],
  // 횟수 〜回
  [
    { kana: 'いっかい', romaji: 'ikkai', meaning: '한 번 (1回)' },
    { kana: 'にかい', romaji: 'nikai', meaning: '두 번 (2回)' },
    { kana: 'さんかい', romaji: 'sankai', meaning: '세 번 (3回)' },
    { kana: 'よんかい', romaji: 'yonkai', meaning: '네 번 (4回)' },
    { kana: 'ごかい', romaji: 'gokai', meaning: '다섯 번 (5回)' },
    { kana: 'なんかい', romaji: 'nankai', meaning: '몇 번' },
  ],
  // 나이 〜歳
  [
    { kana: 'いっさい', romaji: 'issai', meaning: '한 살 (1歳)' },
    { kana: 'にさい', romaji: 'nisai', meaning: '두 살 (2歳)' },
    { kana: 'はっさい', romaji: 'hassai', meaning: '여덟 살 (8歳)' },
    { kana: 'じゅっさい', romaji: 'jussai', meaning: '열 살 (10歳)' },
    { kana: 'はたち', romaji: 'hatachi', meaning: '스무 살 (20歳)' },
    { kana: 'なんさい', romaji: 'nansai', meaning: '몇 살' },
    { kana: 'おいくつ', romaji: 'oikutsu', meaning: '연세가 어떻게 되세요 (정중)' },
  ],
  // 월 〜月
  [
    { kana: 'いちがつ', romaji: 'ichigatsu', meaning: '1월' },
    { kana: 'しがつ', romaji: 'shigatsu', meaning: '4월' },
    { kana: 'しちがつ', romaji: 'shichigatsu', meaning: '7월' },
    { kana: 'くがつ', romaji: 'kugatsu', meaning: '9월' },
    { kana: 'じゅうがつ', romaji: 'juugatsu', meaning: '10월' },
    { kana: 'じゅうにがつ', romaji: 'juunigatsu', meaning: '12월' },
    { kana: 'なんがつ', romaji: 'nangatsu', meaning: '몇 월' },
  ],
]

/** All counters flattened in teaching order. */
export const COUNTERS: Kana[] = COUNTER_ROWS.flat()
