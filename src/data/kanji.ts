// 한자 (漢字) — N5 기초 한자. 카드는 한자(kana) + 읽기(romaji, 히라가나) + 뜻(meaning).
// 'kanji' 종류 덱이라 "한자 → 뜻 고르기" 퀴즈를 쓰되 단일 글자를 크게 렌더한다.
// 한자는 CJK 영역이라 가나/단어 키와 충돌하지 않는다.
import type { Kana } from './kana'

export const KANJI_ROWS: Kana[][] = [
  // 숫자 1
  [
    { kana: '一', romaji: 'いち', meaning: '하나 / 1' },
    { kana: '二', romaji: 'に', meaning: '둘 / 2' },
    { kana: '三', romaji: 'さん', meaning: '셋 / 3' },
    { kana: '四', romaji: 'し・よん', meaning: '넷 / 4' },
    { kana: '五', romaji: 'ご', meaning: '다섯 / 5' },
    { kana: '六', romaji: 'ろく', meaning: '여섯 / 6' },
    { kana: '七', romaji: 'しち・なな', meaning: '일곱 / 7' },
    { kana: '八', romaji: 'はち', meaning: '여덟 / 8' },
  ],
  // 숫자 2 / 돈
  [
    { kana: '九', romaji: 'きゅう・く', meaning: '아홉 / 9' },
    { kana: '十', romaji: 'じゅう', meaning: '열 / 10' },
    { kana: '百', romaji: 'ひゃく', meaning: '백 / 100' },
    { kana: '千', romaji: 'せん', meaning: '천 / 1000' },
    { kana: '万', romaji: 'まん', meaning: '만 / 10000' },
    { kana: '円', romaji: 'えん', meaning: '엔 / 원' },
    { kana: '日', romaji: 'にち・ひ', meaning: '날 / 해' },
    { kana: '月', romaji: 'げつ・つき', meaning: '달 / 월' },
  ],
  // 요일 / 시간
  [
    { kana: '火', romaji: 'か・ひ', meaning: '불' },
    { kana: '水', romaji: 'すい・みず', meaning: '물' },
    { kana: '木', romaji: 'もく・き', meaning: '나무' },
    { kana: '金', romaji: 'きん・かね', meaning: '금 / 돈' },
    { kana: '土', romaji: 'ど・つち', meaning: '흙 / 토' },
    { kana: '年', romaji: 'ねん・とし', meaning: '해 / 년' },
    { kana: '時', romaji: 'じ・とき', meaning: '때 / 시' },
    { kana: '今', romaji: 'いま・こん', meaning: '지금 / 이제' },
  ],
  // 사람 / 크기
  [
    { kana: '人', romaji: 'ひと・じん', meaning: '사람' },
    { kana: '男', romaji: 'おとこ・だん', meaning: '남자' },
    { kana: '女', romaji: 'おんな・じょ', meaning: '여자' },
    { kana: '子', romaji: 'こ・し', meaning: '아이' },
    { kana: '大', romaji: 'だい・おお', meaning: '크다' },
    { kana: '小', romaji: 'しょう・ちい', meaning: '작다' },
    { kana: '中', romaji: 'ちゅう・なか', meaning: '가운데 / 안' },
    { kana: '半', romaji: 'はん', meaning: '반 / 절반' },
  ],
  // 위치
  [
    { kana: '上', romaji: 'うえ・じょう', meaning: '위' },
    { kana: '下', romaji: 'した・か', meaning: '아래' },
    { kana: '左', romaji: 'ひだり', meaning: '왼쪽' },
    { kana: '右', romaji: 'みぎ', meaning: '오른쪽' },
    { kana: '前', romaji: 'まえ・ぜん', meaning: '앞' },
    { kana: '後', romaji: 'うし・ご', meaning: '뒤 / 후' },
    { kana: '内', romaji: 'うち・ない', meaning: '안 / 내부' },
    { kana: '外', romaji: 'そと・がい', meaning: '밖' },
  ],
  // 방위 / 자연
  [
    { kana: '東', romaji: 'ひがし・とう', meaning: '동쪽' },
    { kana: '西', romaji: 'にし・せい', meaning: '서쪽' },
    { kana: '南', romaji: 'みなみ・なん', meaning: '남쪽' },
    { kana: '北', romaji: 'きた・ほく', meaning: '북쪽' },
    { kana: '山', romaji: 'やま・さん', meaning: '산' },
    { kana: '川', romaji: 'かわ', meaning: '강 / 내' },
    { kana: '田', romaji: 'た・でん', meaning: '논 / 밭' },
    { kana: '空', romaji: 'そら・くう', meaning: '하늘 / 비다' },
  ],
  // 신체 / 기본
  [
    { kana: '口', romaji: 'くち・こう', meaning: '입' },
    { kana: '目', romaji: 'め・もく', meaning: '눈' },
    { kana: '耳', romaji: 'みみ', meaning: '귀' },
    { kana: '手', romaji: 'て・しゅ', meaning: '손' },
    { kana: '足', romaji: 'あし・そく', meaning: '발 / 다리' },
    { kana: '力', romaji: 'ちから・りょく', meaning: '힘' },
    { kana: '心', romaji: 'こころ・しん', meaning: '마음' },
    { kana: '名', romaji: 'な・めい', meaning: '이름' },
  ],
  // 동사 1
  [
    { kana: '行', romaji: 'い-く・こう', meaning: '가다' },
    { kana: '来', romaji: 'く-る・らい', meaning: '오다' },
    { kana: '見', romaji: 'み-る・けん', meaning: '보다' },
    { kana: '聞', romaji: 'き-く・ぶん', meaning: '듣다 / 묻다' },
    { kana: '食', romaji: 'た-べる・しょく', meaning: '먹다' },
    { kana: '飲', romaji: 'の-む・いん', meaning: '마시다' },
    { kana: '書', romaji: 'か-く・しょ', meaning: '쓰다' },
    { kana: '読', romaji: 'よ-む・どく', meaning: '읽다' },
  ],
  // 동사 2 / 생활
  [
    { kana: '話', romaji: 'はな-す・わ', meaning: '말하다 / 이야기' },
    { kana: '買', romaji: 'か-う・ばい', meaning: '사다' },
    { kana: '立', romaji: 'た-つ・りつ', meaning: '서다' },
    { kana: '出', romaji: 'で-る・しゅつ', meaning: '나가다 / 내다' },
    { kana: '入', romaji: 'はい-る・にゅう', meaning: '들어가다' },
    { kana: '休', romaji: 'やす-む・きゅう', meaning: '쉬다' },
    { kana: '会', romaji: 'あ-う・かい', meaning: '만나다 / 모임' },
    { kana: '言', romaji: 'い-う・げん', meaning: '말하다' },
  ],
  // 형용사 / 정도
  [
    { kana: '高', romaji: 'たか-い・こう', meaning: '높다 / 비싸다' },
    { kana: '安', romaji: 'やす-い・あん', meaning: '싸다 / 편안하다' },
    { kana: '新', romaji: 'あたら-しい・しん', meaning: '새롭다' },
    { kana: '古', romaji: 'ふる-い・こ', meaning: '낡다 / 오래되다' },
    { kana: '長', romaji: 'なが-い・ちょう', meaning: '길다 / 우두머리' },
    { kana: '多', romaji: 'おお-い・た', meaning: '많다' },
    { kana: '少', romaji: 'すく-ない・しょう', meaning: '적다' },
    { kana: '早', romaji: 'はや-い・そう', meaning: '이르다 / 빠르다' },
  ],
  // 명사 1 (학교 / 사회)
  [
    { kana: '国', romaji: 'くに・こく', meaning: '나라' },
    { kana: '学', romaji: 'がく・まな', meaning: '배움 / 학문' },
    { kana: '校', romaji: 'こう', meaning: '학교' },
    { kana: '先', romaji: 'せん・さき', meaning: '먼저 / 앞' },
    { kana: '生', romaji: 'せい・い', meaning: '삶 / 날것' },
    { kana: '語', romaji: 'ご・かた', meaning: '말 / 언어' },
    { kana: '本', romaji: 'ほん・もと', meaning: '책 / 근본' },
    { kana: '車', romaji: 'くるま・しゃ', meaning: '자동차 / 수레' },
  ],
  // 명사 2 (생활)
  [
    { kana: '店', romaji: 'みせ・てん', meaning: '가게' },
    { kana: '駅', romaji: 'えき', meaning: '역' },
    { kana: '道', romaji: 'みち・どう', meaning: '길' },
    { kana: '雨', romaji: 'あめ・う', meaning: '비' },
    { kana: '天', romaji: 'てん', meaning: '하늘 / 날씨' },
    { kana: '気', romaji: 'き・け', meaning: '기운 / 공기' },
    { kana: '電', romaji: 'でん', meaning: '전기' },
    { kana: '文', romaji: 'ぶん・もん', meaning: '글 / 문장' },
  ],
]

/** All N5 kanji flattened in teaching order. */
export const KANJI: Kana[] = KANJI_ROWS.flat()
