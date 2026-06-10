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
  // ～たいです : ~하고 싶습니다
  [
    { kana: 'みずを のみたいです', romaji: 'mizu o nomitai desu', meaning: '물을 마시고 싶습니다', note: '～たいです (~하고 싶습니다)' },
    { kana: 'にほんに いきたいです', romaji: 'nihon ni ikitai desu', meaning: '일본에 가고 싶습니다', note: '～たいです (~하고 싶습니다)' },
    { kana: 'すしを たべたいです', romaji: 'sushi o tabetai desu', meaning: '초밥을 먹고 싶습니다', note: '～たいです (~하고 싶습니다)' },
    { kana: 'やすみたいです', romaji: 'yasumitai desu', meaning: '쉬고 싶습니다', note: '～たいです (~하고 싶습니다)' },
  ],
  // ～ませんか : ~하지 않겠습니까? (권유)
  [
    { kana: 'いっしょに いきませんか', romaji: 'issho ni ikimasen ka', meaning: '같이 가지 않겠습니까?', note: '～ませんか (~하지 않겠습니까?, 권유)' },
    { kana: 'コーヒーを のみませんか', romaji: 'koohii o nomimasen ka', meaning: '커피를 마시지 않겠습니까?', note: '～ませんか (~하지 않겠습니까?, 권유)' },
    { kana: 'えいがを みませんか', romaji: 'eiga o mimasen ka', meaning: '영화를 보지 않겠습니까?', note: '～ませんか (~하지 않겠습니까?, 권유)' },
    { kana: 'ごはんを たべませんか', romaji: 'gohan o tabemasen ka', meaning: '밥을 먹지 않겠습니까?', note: '～ませんか (~하지 않겠습니까?, 권유)' },
  ],
  // ～が あります / います : ~이(가) 있습니다 (존재)
  [
    { kana: 'へやに ねこが います', romaji: 'heya ni neko ga imasu', meaning: '방에 고양이가 있습니다', note: '～が あります / います (~이 있습니다)' },
    { kana: 'こうえんに ひとが います', romaji: 'kouen ni hito ga imasu', meaning: '공원에 사람이 있습니다', note: '～が あります / います (~이 있습니다)' },
    { kana: 'つくえに ほんが あります', romaji: 'tsukue ni hon ga arimasu', meaning: '책상에 책이 있습니다', note: '～が あります / います (~이 있습니다)' },
    { kana: 'かばんに おかねが あります', romaji: 'kaban ni okane ga arimasu', meaning: '가방에 돈이 있습니다', note: '～が あります / います (~이 있습니다)' },
  ],
  // ～ください : ~해 주세요 / ~주세요
  [
    { kana: 'みずを ください', romaji: 'mizu o kudasai', meaning: '물을 주세요', note: '～ください (~해 주세요)' },
    { kana: 'これを ください', romaji: 'kore o kudasai', meaning: '이것을 주세요', note: '～ください (~해 주세요)' },
    { kana: 'ちょっと まって ください', romaji: 'chotto matte kudasai', meaning: '잠깐 기다려 주세요', note: '～ください (~해 주세요)' },
    { kana: 'みて ください', romaji: 'mite kudasai', meaning: '봐 주세요', note: '～ください (~해 주세요)' },
  ],
  // ～から ～まで : ~부터 ~까지
  [
    { kana: 'くじから ごじまで', romaji: 'kuji kara goji made', meaning: '9시부터 5시까지', note: '～から ～まで (~부터 ~까지)' },
    { kana: 'うちから えきまで', romaji: 'uchi kara eki made', meaning: '집에서 역까지', note: '～から ～まで (~부터 ~까지)' },
    { kana: 'あさから よるまで', romaji: 'asa kara yoru made', meaning: '아침부터 밤까지', note: '～から ～まで (~부터 ~까지)' },
    { kana: 'げつようびから きんようびまで', romaji: 'getsuyoubi kara kinyoubi made', meaning: '월요일부터 금요일까지', note: '～から ～まで (~부터 ~까지)' },
  ],
  // ～と おもいます : ~라고 생각합니다
  [
    { kana: 'いいと おもいます', romaji: 'ii to omoimasu', meaning: '좋다고 생각합니다', note: '～と おもいます (~라고 생각합니다)' },
    { kana: 'あした くると おもいます', romaji: 'ashita kuru to omoimasu', meaning: '내일 올 거라고 생각합니다', note: '～と おもいます (~라고 생각합니다)' },
    { kana: 'たかいと おもいます', romaji: 'takai to omoimasu', meaning: '비싸다고 생각합니다', note: '～と おもいます (~라고 생각합니다)' },
  ],
  // い형용사 긍정 : ～いです
  [
    { kana: 'この いえは おおきいです', romaji: 'kono ie wa ookii desu', meaning: '이 집은 큽니다', note: 'い형용사 ～いです (긍정)' },
    { kana: 'この ほんは おもしろいです', romaji: 'kono hon wa omoshiroi desu', meaning: '이 책은 재미있습니다', note: 'い형용사 ～いです (긍정)' },
    { kana: 'きょうは あついです', romaji: 'kyou wa atsui desu', meaning: '오늘은 덥습니다', note: 'い형용사 ～いです (긍정)' },
    { kana: 'ラーメンは おいしいです', romaji: 'raamen wa oishii desu', meaning: '라멘은 맛있습니다', note: 'い형용사 ～いです (긍정)' },
  ],
  // い형용사 부정 : ～くないです
  [
    { kana: 'この いえは おおきくないです', romaji: 'kono ie wa ookikunai desu', meaning: '이 집은 크지 않습니다', note: 'い형용사 ～くないです (부정)' },
    { kana: 'きょうは さむくないです', romaji: 'kyou wa samukunai desu', meaning: '오늘은 춥지 않습니다', note: 'い형용사 ～くないです (부정)' },
    { kana: 'この ほんは たかくないです', romaji: 'kono hon wa takakunai desu', meaning: '이 책은 비싸지 않습니다', note: 'い형용사 ～くないです (부정)' },
    { kana: 'テストは むずかしくないです', romaji: 'tesuto wa muzukashikunai desu', meaning: '시험은 어렵지 않습니다', note: 'い형용사 ～くないです (부정)' },
  ],
  // い형용사 과거 : ～かったです
  [
    { kana: 'えいがは たのしかったです', romaji: 'eiga wa tanoshikatta desu', meaning: '영화는 즐거웠습니다', note: 'い형용사 ～かったです (과거)' },
    { kana: 'きのうは さむかったです', romaji: 'kinou wa samukatta desu', meaning: '어제는 추웠습니다', note: 'い형용사 ～かったです (과거)' },
    { kana: 'りょこうは よかったです', romaji: 'ryokou wa yokatta desu', meaning: '여행은 좋았습니다', note: 'い형용사 ～かったです (과거)' },
    { kana: 'テストは むずかしかったです', romaji: 'tesuto wa muzukashikatta desu', meaning: '시험은 어려웠습니다', note: 'い형용사 ～かったです (과거)' },
  ],
  // な형용사 : ～です
  [
    { kana: 'この まちは しずかです', romaji: 'kono machi wa shizuka desu', meaning: '이 동네는 조용합니다', note: 'な형용사 ～です' },
    { kana: 'かのじょは きれいです', romaji: 'kanojo wa kirei desu', meaning: '그녀는 예쁩니다', note: 'な형용사 ～です' },
    { kana: 'にほんごは かんたんです', romaji: 'nihongo wa kantan desu', meaning: '일본어는 간단합니다', note: 'な형용사 ～です' },
    { kana: 'この みせは ゆうめいです', romaji: 'kono mise wa yuumei desu', meaning: '이 가게는 유명합니다', note: 'な형용사 ～です' },
  ],
  // 명사 부정 : ～では ありません
  [
    { kana: 'わたしは がくせいでは ありません', romaji: 'watashi wa gakusei dewa arimasen', meaning: '저는 학생이 아닙니다', note: '명사 부정 ～では ありません' },
    { kana: 'これは ほんでは ありません', romaji: 'kore wa hon dewa arimasen', meaning: '이것은 책이 아닙니다', note: '명사 부정 ～では ありません' },
    { kana: 'かれは せんせいでは ありません', romaji: 'kare wa sensei dewa arimasen', meaning: '그는 선생님이 아닙니다', note: '명사 부정 ～では ありません' },
    { kana: 'あれは くるまでは ありません', romaji: 'are wa kuruma dewa arimasen', meaning: '저것은 자동차가 아닙니다', note: '명사 부정 ～では ありません' },
  ],
  // 동사 부정 : ～ません
  [
    { kana: 'きょうは いきません', romaji: 'kyou wa ikimasen', meaning: '오늘은 안 갑니다', note: '동사 부정 ～ません' },
    { kana: 'おさけを のみません', romaji: 'osake o nomimasen', meaning: '술을 마시지 않습니다', note: '동사 부정 ～ません' },
    { kana: 'テレビを みません', romaji: 'terebi o mimasen', meaning: '텔레비전을 안 봅니다', note: '동사 부정 ～ません' },
    { kana: 'にくを たべません', romaji: 'niku o tabemasen', meaning: '고기를 먹지 않습니다', note: '동사 부정 ～ません' },
  ],
  // て형 : ～ています (진행 / 상태)
  [
    { kana: 'いま ごはんを たべています', romaji: 'ima gohan o tabeteimasu', meaning: '지금 밥을 먹고 있습니다', note: '～ています (~하고 있습니다, 진행/상태)' },
    { kana: 'テレビを みています', romaji: 'terebi o miteimasu', meaning: '텔레비전을 보고 있습니다', note: '～ています (~하고 있습니다, 진행/상태)' },
    { kana: 'ともだちを まっています', romaji: 'tomodachi o matteimasu', meaning: '친구를 기다리고 있습니다', note: '～ています (~하고 있습니다, 진행/상태)' },
    { kana: 'ほんを よんでいます', romaji: 'hon o yondeimasu', meaning: '책을 읽고 있습니다', note: '～ています (~하고 있습니다, 진행/상태)' },
  ],
  // て형 : ～ても いいです (허가)
  [
    { kana: 'ここに すわっても いいです', romaji: 'koko ni suwattemo ii desu', meaning: '여기 앉아도 됩니다', note: '～ても いいです (~해도 됩니다, 허가)' },
    { kana: 'しゃしんを とっても いいです', romaji: 'shashin o tottemo ii desu', meaning: '사진을 찍어도 됩니다', note: '～ても いいです (~해도 됩니다, 허가)' },
    { kana: 'みずを のんでも いいです', romaji: 'mizu o nondemo ii desu', meaning: '물을 마셔도 됩니다', note: '～ても いいです (~해도 됩니다, 허가)' },
    { kana: 'かえっても いいです', romaji: 'kaettemo ii desu', meaning: '돌아가도 됩니다', note: '～ても いいです (~해도 됩니다, 허가)' },
  ],
  // て형 : ～ては いけません (금지)
  [
    { kana: 'ここで たばこを すっては いけません', romaji: 'koko de tabako o suttewa ikemasen', meaning: '여기서 담배를 피우면 안 됩니다', note: '～ては いけません (~하면 안 됩니다, 금지)' },
    { kana: 'ここに はいっては いけません', romaji: 'koko ni haittewa ikemasen', meaning: '여기 들어가면 안 됩니다', note: '～ては いけません (~하면 안 됩니다, 금지)' },
    { kana: 'しゃしんを とっては いけません', romaji: 'shashin o tottewa ikemasen', meaning: '사진을 찍으면 안 됩니다', note: '～ては いけません (~하면 안 됩니다, 금지)' },
    { kana: 'ここで はしっては いけません', romaji: 'koko de hashittewa ikemasen', meaning: '여기서 뛰면 안 됩니다', note: '～ては いけません (~하면 안 됩니다, 금지)' },
  ],
  // て형 : ～てから (~하고 나서)
  [
    { kana: 'ごはんを たべてから べんきょうします', romaji: 'gohan o tabetekara benkyou shimasu', meaning: '밥을 먹고 나서 공부합니다', note: '～てから (~하고 나서)' },
    { kana: 'てを あらってから たべます', romaji: 'te o arattekara tabemasu', meaning: '손을 씻고 나서 먹습니다', note: '～てから (~하고 나서)' },
    { kana: 'しごとが おわってから かえります', romaji: 'shigoto ga owattekara kaerimasu', meaning: '일이 끝나고 나서 돌아갑니다', note: '～てから (~하고 나서)' },
  ],
  // 조사 : ～で (수단 / 장소)
  [
    { kana: 'バスで がっこうに いきます', romaji: 'basu de gakkou ni ikimasu', meaning: '버스로 학교에 갑니다', note: '조사 ～で (수단·장소)' },
    { kana: 'はしで たべます', romaji: 'hashi de tabemasu', meaning: '젓가락으로 먹습니다', note: '조사 ～で (수단·장소)' },
    { kana: 'としょかんで べんきょうします', romaji: 'toshokan de benkyou shimasu', meaning: '도서관에서 공부합니다', note: '조사 ～で (수단·장소)' },
    { kana: 'にほんごで はなします', romaji: 'nihongo de hanashimasu', meaning: '일본어로 말합니다', note: '조사 ～で (수단·장소)' },
  ],
  // 조사 : ～と (동반 / 열거)
  [
    { kana: 'ともだちと いきます', romaji: 'tomodachi to ikimasu', meaning: '친구와 갑니다', note: '조사 ～と (동반·열거)' },
    { kana: 'パンと たまごを たべます', romaji: 'pan to tamago o tabemasu', meaning: '빵과 계란을 먹습니다', note: '조사 ～と (동반·열거)' },
    { kana: 'かぞくと りょこうします', romaji: 'kazoku to ryokou shimasu', meaning: '가족과 여행합니다', note: '조사 ～と (동반·열거)' },
  ],
  // 조사 : ～も (~도)
  [
    { kana: 'わたしも がくせいです', romaji: 'watashi mo gakusei desu', meaning: '저도 학생입니다', note: '조사 ～も (~도)' },
    { kana: 'これも ください', romaji: 'kore mo kudasai', meaning: '이것도 주세요', note: '조사 ～も (~도)' },
    { kana: 'コーヒーも のみます', romaji: 'koohii mo nomimasu', meaning: '커피도 마십니다', note: '조사 ～も (~도)' },
  ],
]

/** All example sentences flattened in teaching order. */
export const GRAMMAR: Kana[] = GRAMMAR_ROWS.flat()
