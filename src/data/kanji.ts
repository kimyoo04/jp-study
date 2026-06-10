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
  // 시간 / 날짜 2
  [
    { kana: '週', romaji: 'しゅう', meaning: '주(週)' },
    { kana: '曜', romaji: 'よう', meaning: '요일' },
    { kana: '朝', romaji: 'あさ・ちょう', meaning: '아침' },
    { kana: '昼', romaji: 'ひる・ちゅう', meaning: '낮 / 점심' },
    { kana: '夜', romaji: 'よる・や', meaning: '밤' },
    { kana: '毎', romaji: 'まい', meaning: '매 / 매번' },
    { kana: '何', romaji: 'なに・なん', meaning: '무엇' },
    { kana: '間', romaji: 'あいだ・かん', meaning: '사이 / 간' },
  ],
  // 가족
  [
    { kana: '父', romaji: 'ちち・ふ', meaning: '아버지' },
    { kana: '母', romaji: 'はは・ぼ', meaning: '어머니' },
    { kana: '兄', romaji: 'あに・きょう', meaning: '형 / 오빠' },
    { kana: '弟', romaji: 'おとうと・てい', meaning: '남동생' },
    { kana: '姉', romaji: 'あね・し', meaning: '누나 / 언니' },
    { kana: '妹', romaji: 'いもうと・まい', meaning: '여동생' },
    { kana: '友', romaji: 'とも・ゆう', meaning: '친구' },
    { kana: '家', romaji: 'いえ・か', meaning: '집' },
  ],
  // 동사 3
  [
    { kana: '待', romaji: 'ま-つ・たい', meaning: '기다리다' },
    { kana: '持', romaji: 'も-つ・じ', meaning: '들다 / 가지다' },
    { kana: '使', romaji: 'つか-う・し', meaning: '쓰다 / 사용하다' },
    { kana: '作', romaji: 'つく-る・さく', meaning: '만들다' },
    { kana: '思', romaji: 'おも-う・し', meaning: '생각하다' },
    { kana: '知', romaji: 'し-る・ち', meaning: '알다' },
    { kana: '教', romaji: 'おし-える・きょう', meaning: '가르치다' },
    { kana: '習', romaji: 'なら-う・しゅう', meaning: '익히다 / 배우다' },
  ],
  // 동사 4
  [
    { kana: '始', romaji: 'はじ-める・し', meaning: '시작하다' },
    { kana: '終', romaji: 'お-わる・しゅう', meaning: '끝나다' },
    { kana: '帰', romaji: 'かえ-る・き', meaning: '돌아가다' },
    { kana: '送', romaji: 'おく-る・そう', meaning: '보내다' },
    { kana: '受', romaji: 'う-ける・じゅ', meaning: '받다' },
    { kana: '取', romaji: 'と-る・しゅ', meaning: '취하다 / 잡다' },
    { kana: '貸', romaji: 'か-す・たい', meaning: '빌려주다' },
    { kana: '借', romaji: 'か-りる・しゃく', meaning: '빌리다' },
  ],
  // 형용사 / 상태
  [
    { kana: '楽', romaji: 'たの-しい・がく', meaning: '즐겁다 / 음악' },
    { kana: '悲', romaji: 'かな-しい・ひ', meaning: '슬프다' },
    { kana: '痛', romaji: 'いた-い・つう', meaning: '아프다' },
    { kana: '強', romaji: 'つよ-い・きょう', meaning: '강하다' },
    { kana: '弱', romaji: 'よわ-い・じゃく', meaning: '약하다' },
    { kana: '重', romaji: 'おも-い・じゅう', meaning: '무겁다' },
    { kana: '軽', romaji: 'かる-い・けい', meaning: '가볍다' },
    { kana: '暑', romaji: 'あつ-い・しょ', meaning: '덥다' },
  ],
  // 형용사 2 / 날씨
  [
    { kana: '寒', romaji: 'さむ-い・かん', meaning: '춥다' },
    { kana: '暖', romaji: 'あたた-かい・だん', meaning: '따뜻하다' },
    { kana: '涼', romaji: 'すず-しい・りょう', meaning: '시원하다' },
    { kana: '明', romaji: 'あか-るい・めい', meaning: '밝다' },
    { kana: '暗', romaji: 'くら-い・あん', meaning: '어둡다' },
    { kana: '広', romaji: 'ひろ-い・こう', meaning: '넓다' },
    { kana: '狭', romaji: 'せま-い・きょう', meaning: '좁다' },
    { kana: '速', romaji: 'はや-い・そく', meaning: '빠르다' },
  ],
  // 장소 / 행정
  [
    { kana: '町', romaji: 'まち・ちょう', meaning: '동네 / 마을' },
    { kana: '村', romaji: 'むら・そん', meaning: '마을 / 촌' },
    { kana: '市', romaji: 'し', meaning: '시 / 시장' },
    { kana: '県', romaji: 'けん', meaning: '현(행정구역)' },
    { kana: '都', romaji: 'と・みやこ', meaning: '도시 / 수도' },
    { kana: '京', romaji: 'きょう', meaning: '수도 / 교토' },
    { kana: '部', romaji: 'ぶ', meaning: '부분 / 부서' },
    { kana: '屋', romaji: 'や・おく', meaning: '가게 / 지붕' },
  ],
  // 자연 2
  [
    { kana: '海', romaji: 'うみ・かい', meaning: '바다' },
    { kana: '林', romaji: 'はやし・りん', meaning: '수풀' },
    { kana: '森', romaji: 'もり・しん', meaning: '숲' },
    { kana: '石', romaji: 'いし・せき', meaning: '돌' },
    { kana: '池', romaji: 'いけ・ち', meaning: '연못' },
    { kana: '花', romaji: 'はな・か', meaning: '꽃' },
    { kana: '草', romaji: 'くさ・そう', meaning: '풀' },
    { kana: '風', romaji: 'かぜ・ふう', meaning: '바람' },
  ],
  // 동사 5
  [
    { kana: '開', romaji: 'あ-ける・かい', meaning: '열다' },
    { kana: '閉', romaji: 'し-める・へい', meaning: '닫다' },
    { kana: '切', romaji: 'き-る・せつ', meaning: '자르다' },
    { kana: '押', romaji: 'お-す・おう', meaning: '밀다 / 누르다' },
    { kana: '引', romaji: 'ひ-く・いん', meaning: '당기다' },
    { kana: '動', romaji: 'うご-く・どう', meaning: '움직이다' },
    { kana: '止', romaji: 'と-まる・し', meaning: '멈추다' },
    { kana: '通', romaji: 'とお-る・つう', meaning: '통하다 / 다니다' },
  ],
  // 동사 6 (이동)
  [
    { kana: '走', romaji: 'はし-る・そう', meaning: '달리다' },
    { kana: '歩', romaji: 'ある-く・ほ', meaning: '걷다' },
    { kana: '泳', romaji: 'およ-ぐ・えい', meaning: '헤엄치다' },
    { kana: '飛', romaji: 'と-ぶ・ひ', meaning: '날다' },
    { kana: '乗', romaji: 'の-る・じょう', meaning: '타다' },
    { kana: '降', romaji: 'お-りる・こう', meaning: '내리다' },
    { kana: '着', romaji: 'き-る・ちゃく', meaning: '입다 / 도착하다' },
    { kana: '渡', romaji: 'わた-る・と', meaning: '건너다' },
  ],
  // 신체 / 건강 2
  [
    { kana: '体', romaji: 'からだ・たい', meaning: '몸' },
    { kana: '頭', romaji: 'あたま・とう', meaning: '머리' },
    { kana: '顔', romaji: 'かお・がん', meaning: '얼굴' },
    { kana: '首', romaji: 'くび・しゅ', meaning: '목' },
    { kana: '歯', romaji: 'は・し', meaning: '이(齒)' },
    { kana: '血', romaji: 'ち・けつ', meaning: '피' },
    { kana: '病', romaji: 'びょう・やまい', meaning: '병' },
    { kana: '医', romaji: 'い', meaning: '의사 / 의술' },
  ],
  // 음식 2
  [
    { kana: '茶', romaji: 'ちゃ・さ', meaning: '차(茶)' },
    { kana: '米', romaji: 'こめ・べい', meaning: '쌀' },
    { kana: '肉', romaji: 'にく', meaning: '고기' },
    { kana: '魚', romaji: 'さかな・ぎょ', meaning: '생선' },
    { kana: '野', romaji: 'の・や', meaning: '들 / 야채' },
    { kana: '菜', romaji: 'な・さい', meaning: '나물 / 채소' },
    { kana: '卵', romaji: 'たまご・らん', meaning: '알 / 계란' },
    { kana: '味', romaji: 'あじ・み', meaning: '맛' },
  ],
  // 색 / 형용 3
  [
    { kana: '白', romaji: 'しろ・はく', meaning: '흰색' },
    { kana: '黒', romaji: 'くろ・こく', meaning: '검정' },
    { kana: '赤', romaji: 'あか・せき', meaning: '빨강' },
    { kana: '青', romaji: 'あお・せい', meaning: '파랑' },
    { kana: '色', romaji: 'いろ・しょく', meaning: '색' },
    { kana: '太', romaji: 'ふと-い・たい', meaning: '굵다' },
    { kana: '細', romaji: 'ほそ-い・さい', meaning: '가늘다' },
    { kana: '丸', romaji: 'まる・がん', meaning: '둥글다 / 원' },
  ],
  // 추상 명사
  [
    { kana: '物', romaji: 'もの・ぶつ', meaning: '물건' },
    { kana: '事', romaji: 'こと・じ', meaning: '일 / 것' },
    { kana: '所', romaji: 'ところ・しょ', meaning: '곳 / 장소' },
    { kana: '者', romaji: 'もの・しゃ', meaning: '사람 / 자' },
    { kana: '方', romaji: 'ほう・かた', meaning: '쪽 / 분' },
    { kana: '形', romaji: 'かたち・けい', meaning: '모양' },
    { kana: '数', romaji: 'かず・すう', meaning: '수' },
    { kana: '計', romaji: 'はか-る・けい', meaning: '세다 / 계획' },
  ],
  // 사회 / 일
  [
    { kana: '仕', romaji: 'し・つか', meaning: '섬기다 / 일' },
    { kana: '働', romaji: 'はたら-く・どう', meaning: '일하다' },
    { kana: '業', romaji: 'ぎょう・わざ', meaning: '업 / 일' },
    { kana: '員', romaji: 'いん', meaning: '인원 / 직원' },
    { kana: '社', romaji: 'しゃ・やしろ', meaning: '회사 / 신사' },
    { kana: '銀', romaji: 'ぎん', meaning: '은(銀)' },
    { kana: '場', romaji: 'ば・じょう', meaning: '장소' },
    { kana: '院', romaji: 'いん', meaning: '원(기관)' },
  ],
  // 학교 / 공부 2
  [
    { kana: '字', romaji: 'じ', meaning: '글자' },
    { kana: '紙', romaji: 'かみ・し', meaning: '종이' },
    { kana: '絵', romaji: 'え・かい', meaning: '그림' },
    { kana: '歌', romaji: 'うた・か', meaning: '노래' },
    { kana: '答', romaji: 'こた-える・とう', meaning: '답' },
    { kana: '問', romaji: 'と-う・もん', meaning: '묻다 / 문제' },
    { kana: '題', romaji: 'だい', meaning: '제목 / 문제' },
    { kana: '試', romaji: 'ため-す・し', meaning: '시험 / 시도' },
  ],
  // 동사 7
  [
    { kana: '起', romaji: 'お-きる・き', meaning: '일어나다' },
    { kana: '寝', romaji: 'ね-る・しん', meaning: '자다' },
    { kana: '洗', romaji: 'あら-う・せん', meaning: '씻다' },
    { kana: '消', romaji: 'け-す・しょう', meaning: '끄다 / 지우다' },
    { kana: '点', romaji: 'てん', meaning: '점 / 켜다' },
    { kana: '直', romaji: 'なお-す・ちょく', meaning: '고치다 / 곧다' },
    { kana: '落', romaji: 'お-ちる・らく', meaning: '떨어지다' },
    { kana: '投', romaji: 'な-げる・とう', meaning: '던지다' },
  ],
  // 동사 8
  [
    { kana: '拾', romaji: 'ひろ-う・しゅう', meaning: '줍다' },
    { kana: '探', romaji: 'さが-す・たん', meaning: '찾다' },
    { kana: '忘', romaji: 'わす-れる・ぼう', meaning: '잊다' },
    { kana: '覚', romaji: 'おぼ-える・かく', meaning: '외우다 / 깨다' },
    { kana: '守', romaji: 'まも-る・しゅ', meaning: '지키다' },
    { kana: '助', romaji: 'たす-ける・じょ', meaning: '돕다' },
    { kana: '配', romaji: 'くば-る・はい', meaning: '나누다 / 배달' },
    { kana: '集', romaji: 'あつ-める・しゅう', meaning: '모으다' },
  ],
  // 감정
  [
    { kana: '好', romaji: 'す-き・こう', meaning: '좋아하다' },
    { kana: '嫌', romaji: 'きら-い・けん', meaning: '싫어하다' },
    { kana: '怒', romaji: 'おこ-る・ど', meaning: '화내다' },
    { kana: '笑', romaji: 'わら-う・しょう', meaning: '웃다' },
    { kana: '泣', romaji: 'な-く・きゅう', meaning: '울다' },
    { kana: '困', romaji: 'こま-る・こん', meaning: '곤란하다' },
    { kana: '願', romaji: 'ねが-う・がん', meaning: '바라다' },
    { kana: '急', romaji: 'いそ-ぐ・きゅう', meaning: '서두르다 / 급하다' },
  ],
  // 유무 / 형용 4
  [
    { kana: '便', romaji: 'べん・びん', meaning: '편리 / 우편' },
    { kana: '利', romaji: 'り', meaning: '이롭다 / 이익' },
    { kana: '不', romaji: 'ふ・ぶ', meaning: '아니다 (부정)' },
    { kana: '無', romaji: 'む・な-い', meaning: '없다' },
    { kana: '有', romaji: 'ゆう・あ-る', meaning: '있다' },
    { kana: '同', romaji: 'おな-じ・どう', meaning: '같다' },
    { kana: '違', romaji: 'ちが-う・い', meaning: '다르다 / 틀리다' },
    { kana: '別', romaji: 'べつ', meaning: '다르다 / 별도' },
  ],
  // 수량 / 순서
  [
    { kana: '全', romaji: 'ぜん・まった-く', meaning: '전부' },
    { kana: '各', romaji: 'かく', meaning: '각각' },
    { kana: '両', romaji: 'りょう', meaning: '둘 / 양쪽' },
    { kana: '第', romaji: 'だい', meaning: '제(순서)' },
    { kana: '号', romaji: 'ごう', meaning: '번호' },
    { kana: '回', romaji: 'かい・まわ-る', meaning: '번 / 돌다' },
    { kana: '度', romaji: 'ど・たび', meaning: '번 / 도' },
    { kana: '倍', romaji: 'ばい', meaning: '배(곱)' },
  ],
  // 방향 / 위치 2
  [
    { kana: '近', romaji: 'ちか-い・きん', meaning: '가깝다' },
    { kana: '遠', romaji: 'とお-い・えん', meaning: '멀다' },
    { kana: '向', romaji: 'む-く・こう', meaning: '향하다' },
    { kana: '横', romaji: 'よこ・おう', meaning: '옆 / 가로' },
    { kana: '隣', romaji: 'となり・りん', meaning: '이웃 / 옆' },
    { kana: '角', romaji: 'かど・かく', meaning: '모서리 / 뿔' },
    { kana: '辺', romaji: 'へん・あた-り', meaning: '근처 / 변' },
    { kana: '表', romaji: 'おもて・ひょう', meaning: '겉 / 표' },
  ],
  // 추상 2
  [
    { kana: '意', romaji: 'い', meaning: '뜻 / 의미' },
    { kana: '理', romaji: 'り', meaning: '이치 / 이유' },
    { kana: '由', romaji: 'ゆう・よし', meaning: '말미암다 / 이유' },
    { kana: '注', romaji: 'そそ-ぐ・ちゅう', meaning: '붓다 / 주의' },
    { kana: '進', romaji: 'すす-む・しん', meaning: '나아가다' },
    { kana: '決', romaji: 'き-める・けつ', meaning: '정하다' },
    { kana: '定', romaji: 'さだ-める・てい', meaning: '정하다' },
    { kana: '用', romaji: 'よう・もち-いる', meaning: '쓰다 / 용도' },
  ],
  // 물건 / 의류 2
  [
    { kana: '服', romaji: 'ふく', meaning: '옷' },
    { kana: '帽', romaji: 'ぼう', meaning: '모자' },
    { kana: '靴', romaji: 'くつ・か', meaning: '신발' },
    { kana: '傘', romaji: 'かさ・さん', meaning: '우산' },
    { kana: '鏡', romaji: 'かがみ・きょう', meaning: '거울' },
    { kana: '窓', romaji: 'まど・そう', meaning: '창문' },
    { kana: '門', romaji: 'もん・かど', meaning: '문' },
    { kana: '戸', romaji: 'と・こ', meaning: '문 / 집' },
  ],
]

/** All N5 kanji flattened in teaching order. */
export const KANJI: Kana[] = KANJI_ROWS.flat()
