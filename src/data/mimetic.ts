// 의태어·의성어 — 실회화·드라마 고빈도 표현만. 행 = 주제(오답 후보 그룹).
// 단어 덱과 같은 'words' 종류라 "단어 → 뜻 고르기" 엔진을 재사용한다.
import type { Kana } from './kana'

export const MIMETIC_ROWS: Kana[][] = [
  // 감정 1
  [
    { kana: 'どきどき', romaji: 'dokidoki', meaning: '두근두근 (긴장/설렘)' },
    { kana: 'わくわく', romaji: 'wakuwaku', meaning: '두근두근 (기대)' },
    { kana: 'いらいら', romaji: 'iraira', meaning: '짜증남' },
    { kana: 'びっくり', romaji: 'bikkuri', meaning: '깜짝 놀람' },
    { kana: 'ほっと', romaji: 'hotto', meaning: '안심하는 모양' },
    { kana: 'うきうき', romaji: 'ukiuki', meaning: '신나서 들뜸' },
  ],
  // 감정 2
  [
    { kana: 'はらはら', romaji: 'harahara', meaning: '조마조마' },
    { kana: 'もやもや', romaji: 'moyamoya', meaning: '찜찜함 / 답답함' },
    { kana: 'すっきり', romaji: 'sukkiri', meaning: '개운함' },
    { kana: 'ぼんやり', romaji: 'bonyari', meaning: '멍하니' },
    { kana: 'がっかり', romaji: 'gakkari', meaning: '실망함' },
    { kana: 'のんびり', romaji: 'nonbiri', meaning: '느긋하게' },
  ],
  // 몸 상태
  [
    { kana: 'ぺこぺこ', romaji: 'pekopeko', meaning: '배가 몹시 고픔' },
    { kana: 'くたくた', romaji: 'kutakuta', meaning: '녹초가 됨' },
    { kana: 'ふらふら', romaji: 'furafura', meaning: '어질어질 / 휘청휘청' },
    { kana: 'ぐっすり', romaji: 'gussuri', meaning: '푹 (잠든 모양)' },
    { kana: 'うとうと', romaji: 'utouto', meaning: '꾸벅꾸벅 (졸음)' },
    { kana: 'ずきずき', romaji: 'zukizuki', meaning: '욱신욱신' },
  ],
  // 날씨 / 공기
  [
    { kana: 'ざあざあ', romaji: 'zaazaa', meaning: '쏴아 (비가 세차게)' },
    { kana: 'ぱらぱら', romaji: 'parapara', meaning: '후두둑 (비가 조금)' },
    { kana: 'ぴかぴか', romaji: 'pikapika', meaning: '반짝반짝 (광택/새것)' },
    { kana: 'じめじめ', romaji: 'jimejime', meaning: '눅눅함 / 습함' },
    { kana: 'むしむし', romaji: 'mushimushi', meaning: '후텁지근함' },
    { kana: 'ひんやり', romaji: 'hinyari', meaning: '서늘함' },
  ],
  // 음식 식감
  [
    { kana: 'もちもち', romaji: 'mochimochi', meaning: '쫄깃쫄깃' },
    { kana: 'さくさく', romaji: 'sakusaku', meaning: '바삭바삭' },
    { kana: 'ぱりぱり', romaji: 'paripari', meaning: '파삭파삭 (얇고 바삭)' },
    { kana: 'とろとろ', romaji: 'torotoro', meaning: '사르르 녹는 / 걸쭉한' },
    { kana: 'ぷりぷり', romaji: 'puripuri', meaning: '탱글탱글' },
    { kana: 'あつあつ', romaji: 'atsuatsu', meaning: '뜨끈뜨끈' },
  ],
  // 말 / 표정
  [
    { kana: 'ぺらぺら', romaji: 'perapera', meaning: '술술 (외국어 유창)' },
    { kana: 'はきはき', romaji: 'hakihaki', meaning: '또박또박 (시원시원한 말투)' },
    { kana: 'にこにこ', romaji: 'nikoniko', meaning: '생글생글' },
    { kana: 'にやにや', romaji: 'niyaniya', meaning: '히죽히죽' },
    { kana: 'こそこそ', romaji: 'kosokoso', meaning: '몰래 / 살금살금' },
    { kana: 'ぶつぶつ', romaji: 'butsubutsu', meaning: '중얼중얼 / 투덜투덜' },
  ],
  // 동작 / 태도
  [
    { kana: 'ゆっくり', romaji: 'yukkuri', meaning: '천천히 / 푹' },
    { kana: 'そろそろ', romaji: 'sorosoro', meaning: '슬슬' },
    { kana: 'だんだん', romaji: 'dandan', meaning: '점점' },
    { kana: 'どんどん', romaji: 'dondon', meaning: '척척 / 계속해서' },
    { kana: 'しっかり', romaji: 'shikkari', meaning: '단단히 / 확실히' },
    { kana: 'ちゃんと', romaji: 'chanto', meaning: '제대로' },
    { kana: 'きちんと', romaji: 'kichinto', meaning: '깔끔하게 / 어김없이' },
  ],
  // 상태 / 모양
  [
    { kana: 'ぴったり', romaji: 'pittari', meaning: '딱 맞음' },
    { kana: 'そっくり', romaji: 'sokkuri', meaning: '꼭 닮음' },
    { kana: 'ばらばら', romaji: 'barabara', meaning: '뿔뿔이 / 제각각' },
    { kana: 'めちゃくちゃ', romaji: 'mechakucha', meaning: '엉망진창 / 엄청' },
    { kana: 'きらきら', romaji: 'kirakira', meaning: '반짝반짝 (빛남)' },
    { kana: 'がらがら', romaji: 'garagara', meaning: '텅텅 빔' },
  ],
  // 움직임 / 일상
  [
    { kana: 'ごろごろ', romaji: 'gorogoro', meaning: '빈둥빈둥 / 데굴데굴' },
    { kana: 'ぐるぐる', romaji: 'guruguru', meaning: '빙글빙글' },
    { kana: 'ばたばた', romaji: 'batabata', meaning: '허둥지둥 / 정신없음' },
    { kana: 'ぎりぎり', romaji: 'girigiri', meaning: '아슬아슬 / 빠듯함' },
    { kana: 'うろうろ', romaji: 'urouro', meaning: '어슬렁어슬렁 / 서성거림' },
    { kana: 'こつこつ', romaji: 'kotsukotsu', meaning: '꾸준히' },
  ],
]

/** All mimetic words flattened in teaching order. */
export const MIMETICS: Kana[] = MIMETIC_ROWS.flat()
