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
  // 신체
  [
    { kana: 'あたま', romaji: 'atama', meaning: '머리' },
    { kana: 'かお', romaji: 'kao', meaning: '얼굴' },
    { kana: 'みみ', romaji: 'mimi', meaning: '귀' },
    { kana: 'くち', romaji: 'kuchi', meaning: '입' },
    { kana: 'おなか', romaji: 'onaka', meaning: '배' },
    { kana: 'あし', romaji: 'ashi', meaning: '다리 / 발' },
    { kana: 'ゆび', romaji: 'yubi', meaning: '손가락' },
    { kana: 'かみ', romaji: 'kami', meaning: '머리카락' },
  ],
  // 자연 / 날씨
  [
    { kana: 'そら', romaji: 'sora', meaning: '하늘' },
    { kana: 'やま', romaji: 'yama', meaning: '산' },
    { kana: 'かわ', romaji: 'kawa', meaning: '강' },
    { kana: 'うみ', romaji: 'umi', meaning: '바다' },
    { kana: 'あめ', romaji: 'ame', meaning: '비' },
    { kana: 'ゆき', romaji: 'yuki', meaning: '눈(雪)' },
    { kana: 'かぜ', romaji: 'kaze', meaning: '바람' },
    { kana: 'はな', romaji: 'hana', meaning: '꽃' },
  ],
  // 장소
  [
    { kana: 'みせ', romaji: 'mise', meaning: '가게' },
    { kana: 'びょういん', romaji: 'byouin', meaning: '병원' },
    { kana: 'ぎんこう', romaji: 'ginkou', meaning: '은행' },
    { kana: 'こうえん', romaji: 'kouen', meaning: '공원' },
    { kana: 'としょかん', romaji: 'toshokan', meaning: '도서관' },
    { kana: 'くうこう', romaji: 'kuukou', meaning: '공항' },
    { kana: 'へや', romaji: 'heya', meaning: '방' },
    { kana: 'まち', romaji: 'machi', meaning: '마을 / 동네' },
  ],
  // 동사 2
  [
    { kana: 'かう', romaji: 'kau', meaning: '사다' },
    { kana: 'あう', romaji: 'au', meaning: '만나다' },
    { kana: 'まつ', romaji: 'matsu', meaning: '기다리다' },
    { kana: 'はなす', romaji: 'hanasu', meaning: '말하다' },
    { kana: 'きく', romaji: 'kiku', meaning: '듣다 / 묻다' },
    { kana: 'おきる', romaji: 'okiru', meaning: '일어나다' },
    { kana: 'ねる', romaji: 'neru', meaning: '자다' },
    { kana: 'あらう', romaji: 'arau', meaning: '씻다' },
    { kana: 'はたらく', romaji: 'hataraku', meaning: '일하다' },
    { kana: 'やすむ', romaji: 'yasumu', meaning: '쉬다' },
  ],
  // 형용사 2
  [
    { kana: 'いい', romaji: 'ii', meaning: '좋다' },
    { kana: 'わるい', romaji: 'warui', meaning: '나쁘다' },
    { kana: 'ながい', romaji: 'nagai', meaning: '길다' },
    { kana: 'みじかい', romaji: 'mijikai', meaning: '짧다' },
    { kana: 'はやい', romaji: 'hayai', meaning: '빠르다 / 이르다' },
    { kana: 'おそい', romaji: 'osoi', meaning: '느리다 / 늦다' },
    { kana: 'ちかい', romaji: 'chikai', meaning: '가깝다' },
    { kana: 'とおい', romaji: 'tooi', meaning: '멀다' },
  ],
  // 위치
  [
    { kana: 'うえ', romaji: 'ue', meaning: '위' },
    { kana: 'した', romaji: 'shita', meaning: '아래' },
    { kana: 'なか', romaji: 'naka', meaning: '안' },
    { kana: 'そと', romaji: 'soto', meaning: '밖' },
    { kana: 'まえ', romaji: 'mae', meaning: '앞' },
    { kana: 'うしろ', romaji: 'ushiro', meaning: '뒤' },
    { kana: 'みぎ', romaji: 'migi', meaning: '오른쪽' },
    { kana: 'ひだり', romaji: 'hidari', meaning: '왼쪽' },
  ],
  // 물건
  [
    { kana: 'ほん', romaji: 'hon', meaning: '책' },
    { kana: 'くつ', romaji: 'kutsu', meaning: '신발' },
    { kana: 'ふく', romaji: 'fuku', meaning: '옷' },
    { kana: 'とけい', romaji: 'tokei', meaning: '시계' },
    { kana: 'かさ', romaji: 'kasa', meaning: '우산' },
    { kana: 'かぎ', romaji: 'kagi', meaning: '열쇠' },
    { kana: 'つくえ', romaji: 'tsukue', meaning: '책상' },
    { kana: 'いす', romaji: 'isu', meaning: '의자' },
  ],
  // 과일 / 채소
  [
    { kana: 'りんご', romaji: 'ringo', meaning: '사과' },
    { kana: 'みかん', romaji: 'mikan', meaning: '귤' },
    { kana: 'ぶどう', romaji: 'budou', meaning: '포도' },
    { kana: 'いちご', romaji: 'ichigo', meaning: '딸기' },
    { kana: 'すいか', romaji: 'suika', meaning: '수박' },
    { kana: 'もも', romaji: 'momo', meaning: '복숭아' },
    { kana: 'たまねぎ', romaji: 'tamanegi', meaning: '양파' },
    { kana: 'にんじん', romaji: 'ninjin', meaning: '당근' },
  ],
  // 교통
  [
    { kana: 'でんしゃ', romaji: 'densha', meaning: '전철' },
    { kana: 'くるま', romaji: 'kuruma', meaning: '자동차' },
    { kana: 'ひこうき', romaji: 'hikouki', meaning: '비행기' },
    { kana: 'ふね', romaji: 'fune', meaning: '배(船)' },
    { kana: 'じてんしゃ', romaji: 'jitensha', meaning: '자전거' },
    { kana: 'ちかてつ', romaji: 'chikatetsu', meaning: '지하철' },
    { kana: 'みち', romaji: 'michi', meaning: '길' },
    { kana: 'きっぷ', romaji: 'kippu', meaning: '표(승차권)' },
  ],
  // 동사 3
  [
    { kana: 'わかる', romaji: 'wakaru', meaning: '알다 / 이해하다' },
    { kana: 'おしえる', romaji: 'oshieru', meaning: '가르치다' },
    { kana: 'ならう', romaji: 'narau', meaning: '배우다' },
    { kana: 'おぼえる', romaji: 'oboeru', meaning: '외우다' },
    { kana: 'わすれる', romaji: 'wasureru', meaning: '잊다' },
    { kana: 'つくる', romaji: 'tsukuru', meaning: '만들다' },
    { kana: 'あそぶ', romaji: 'asobu', meaning: '놀다' },
    { kana: 'およぐ', romaji: 'oyogu', meaning: '수영하다' },
    { kana: 'はしる', romaji: 'hashiru', meaning: '달리다' },
    { kana: 'あるく', romaji: 'aruku', meaning: '걷다' },
  ],
  // 형용사 3
  [
    { kana: 'ふるい', romaji: 'furui', meaning: '낡다 / 오래되다' },
    { kana: 'むずかしい', romaji: 'muzukashii', meaning: '어렵다' },
    { kana: 'やさしい', romaji: 'yasashii', meaning: '쉽다 / 친절하다' },
    { kana: 'たのしい', romaji: 'tanoshii', meaning: '즐겁다' },
    { kana: 'さびしい', romaji: 'sabishii', meaning: '외롭다' },
    { kana: 'いそがしい', romaji: 'isogashii', meaning: '바쁘다' },
    { kana: 'げんき', romaji: 'genki', meaning: '건강함 / 기운참' },
    { kana: 'ひま', romaji: 'hima', meaning: '한가함' },
  ],
  // 사람
  [
    { kana: 'かぞく', romaji: 'kazoku', meaning: '가족' },
    { kana: 'こども', romaji: 'kodomo', meaning: '아이' },
    { kana: 'おとな', romaji: 'otona', meaning: '어른' },
    { kana: 'おとこ', romaji: 'otoko', meaning: '남자' },
    { kana: 'おんな', romaji: 'onna', meaning: '여자' },
    { kana: 'あかちゃん', romaji: 'akachan', meaning: '아기' },
    { kana: 'がくせい', romaji: 'gakusei', meaning: '학생' },
    { kana: 'かいしゃいん', romaji: 'kaishain', meaning: '회사원' },
  ],
  // 추상 / 생활 2
  [
    { kana: 'しごと', romaji: 'shigoto', meaning: '일 / 직업' },
    { kana: 'べんきょう', romaji: 'benkyou', meaning: '공부' },
    { kana: 'りょこう', romaji: 'ryokou', meaning: '여행' },
    { kana: 'やすみ', romaji: 'yasumi', meaning: '휴일 / 방학' },
    { kana: 'なまえ', romaji: 'namae', meaning: '이름' },
    { kana: 'ことば', romaji: 'kotoba', meaning: '말 / 단어' },
    { kana: 'こえ', romaji: 'koe', meaning: '목소리' },
    { kana: 'いろ', romaji: 'iro', meaning: '색' },
  ],
  // 동사 4
  [
    { kana: 'あける', romaji: 'akeru', meaning: '열다' },
    { kana: 'しめる', romaji: 'shimeru', meaning: '닫다' },
    { kana: 'はじまる', romaji: 'hajimaru', meaning: '시작되다' },
    { kana: 'おわる', romaji: 'owaru', meaning: '끝나다' },
    { kana: 'でる', romaji: 'deru', meaning: '나가다 / 나오다' },
    { kana: 'はいる', romaji: 'hairu', meaning: '들어가다' },
    { kana: 'のる', romaji: 'noru', meaning: '타다' },
    { kana: 'おりる', romaji: 'oriru', meaning: '내리다' },
    { kana: 'とまる', romaji: 'tomaru', meaning: '멈추다' },
    { kana: 'もつ', romaji: 'motsu', meaning: '들다 / 가지다' },
    { kana: 'かえる', romaji: 'kaeru', meaning: '돌아가다' },
    { kana: 'うごく', romaji: 'ugoku', meaning: '움직이다' },
  ],
  // 형용사 4
  [
    { kana: 'うつくしい', romaji: 'utsukushii', meaning: '아름답다' },
    { kana: 'きたない', romaji: 'kitanai', meaning: '더럽다' },
    { kana: 'あかるい', romaji: 'akarui', meaning: '밝다' },
    { kana: 'くらい', romaji: 'kurai', meaning: '어둡다' },
    { kana: 'つよい', romaji: 'tsuyoi', meaning: '강하다' },
    { kana: 'よわい', romaji: 'yowai', meaning: '약하다' },
    { kana: 'おもい', romaji: 'omoi', meaning: '무겁다' },
    { kana: 'かるい', romaji: 'karui', meaning: '가볍다' },
    { kana: 'ひろい', romaji: 'hiroi', meaning: '넓다' },
    { kana: 'せまい', romaji: 'semai', meaning: '좁다' },
  ],
  // 자연 2
  [
    { kana: 'つき', romaji: 'tsuki', meaning: '달' },
    { kana: 'ほし', romaji: 'hoshi', meaning: '별' },
    { kana: 'くも', romaji: 'kumo', meaning: '구름' },
    { kana: 'いし', romaji: 'ishi', meaning: '돌' },
    { kana: 'すな', romaji: 'suna', meaning: '모래' },
    { kana: 'もり', romaji: 'mori', meaning: '숲' },
    { kana: 'みずうみ', romaji: 'mizuumi', meaning: '호수' },
  ],
  // 식재료
  [
    { kana: 'ぎゅうにく', romaji: 'gyuuniku', meaning: '소고기' },
    { kana: 'とりにく', romaji: 'toriniku', meaning: '닭고기' },
    { kana: 'ぶたにく', romaji: 'butaniku', meaning: '돼지고기' },
    { kana: 'しお', romaji: 'shio', meaning: '소금' },
    { kana: 'さとう', romaji: 'satou', meaning: '설탕' },
    { kana: 'こめ', romaji: 'kome', meaning: '쌀' },
    { kana: 'みそ', romaji: 'miso', meaning: '된장' },
    { kana: 'しょうゆ', romaji: 'shouyu', meaning: '간장' },
  ],
  // 집 / 방
  [
    { kana: 'だいどころ', romaji: 'daidokoro', meaning: '부엌' },
    { kana: 'おふろ', romaji: 'ofuro', meaning: '욕실 / 목욕' },
    { kana: 'にわ', romaji: 'niwa', meaning: '정원' },
    { kana: 'まど', romaji: 'mado', meaning: '창문' },
    { kana: 'かべ', romaji: 'kabe', meaning: '벽' },
    { kana: 'ゆか', romaji: 'yuka', meaning: '바닥' },
    { kana: 'かいだん', romaji: 'kaidan', meaning: '계단' },
    { kana: 'げんかん', romaji: 'genkan', meaning: '현관' },
  ],
  // 빈도 / 시간 2
  [
    { kana: 'いつも', romaji: 'itsumo', meaning: '항상' },
    { kana: 'ときどき', romaji: 'tokidoki', meaning: '가끔' },
    { kana: 'たまに', romaji: 'tamani', meaning: '이따금' },
    { kana: 'まいにち', romaji: 'mainichi', meaning: '매일' },
    { kana: 'まいあさ', romaji: 'maiasa', meaning: '매일 아침' },
    { kana: 'らいねん', romaji: 'rainen', meaning: '내년' },
    { kana: 'きょねん', romaji: 'kyonen', meaning: '작년' },
    { kana: 'せんしゅう', romaji: 'senshuu', meaning: '지난주' },
    { kana: 'らいしゅう', romaji: 'raishuu', meaning: '다음주' },
  ],
]

/** All words flattened in teaching order. */
export const WORDS: Kana[] = WORD_ROWS.flat()
