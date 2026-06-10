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
  // ～ましょう : ~합시다 (청유)
  [
    { kana: 'いっしょに いきましょう', romaji: 'issho ni ikimashou', meaning: '같이 갑시다', note: '～ましょう (~합시다, 청유)' },
    { kana: 'ごはんを たべましょう', romaji: 'gohan o tabemashou', meaning: '밥을 먹읍시다', note: '～ましょう (~합시다, 청유)' },
    { kana: 'ちょっと やすみましょう', romaji: 'chotto yasumimashou', meaning: '잠깐 쉽시다', note: '～ましょう (~합시다, 청유)' },
    { kana: 'はじめましょう', romaji: 'hajimemashou', meaning: '시작합시다', note: '～ましょう (~합시다, 청유)' },
  ],
  // ～なければ なりません : ~해야 합니다
  [
    { kana: 'べんきょう しなければ なりません', romaji: 'benkyou shinakereba narimasen', meaning: '공부해야 합니다', note: '～なければ なりません (~해야 합니다)' },
    { kana: 'はやく いかなければ なりません', romaji: 'hayaku ikanakereba narimasen', meaning: '빨리 가야 합니다', note: '～なければ なりません (~해야 합니다)' },
    { kana: 'もう ねなければ なりません', romaji: 'mou nenakereba narimasen', meaning: '이제 자야 합니다', note: '～なければ なりません (~해야 합니다)' },
    { kana: 'ここで またなければ なりません', romaji: 'koko de matanakereba narimasen', meaning: '여기서 기다려야 합니다', note: '～なければ なりません (~해야 합니다)' },
  ],
  // ～ことが できます : ~할 수 있습니다
  [
    { kana: 'にほんごが できます', romaji: 'nihongo ga dekimasu', meaning: '일본어를 할 수 있습니다', note: '～ことが できます (~할 수 있습니다)' },
    { kana: 'およぐ ことが できます', romaji: 'oyogu koto ga dekimasu', meaning: '수영할 수 있습니다', note: '～ことが できます (~할 수 있습니다)' },
    { kana: 'うんてんが できます', romaji: 'unten ga dekimasu', meaning: '운전할 수 있습니다', note: '～ことが できます (~할 수 있습니다)' },
    { kana: 'りょうりが できます', romaji: 'ryouri ga dekimasu', meaning: '요리할 수 있습니다', note: '～ことが できます (~할 수 있습니다)' },
  ],
  // ～が ほしいです : ~을 갖고 싶습니다
  [
    { kana: 'あたらしい くるまが ほしいです', romaji: 'atarashii kuruma ga hoshii desu', meaning: '새 차를 갖고 싶습니다', note: '～が ほしいです (~을 갖고 싶습니다)' },
    { kana: 'おかねが ほしいです', romaji: 'okane ga hoshii desu', meaning: '돈을 갖고 싶습니다', note: '～が ほしいです (~을 갖고 싶습니다)' },
    { kana: 'じかんが ほしいです', romaji: 'jikan ga hoshii desu', meaning: '시간을 갖고 싶습니다', note: '～が ほしいです (~을 갖고 싶습니다)' },
    { kana: 'ともだちが ほしいです', romaji: 'tomodachi ga hoshii desu', meaning: '친구를 갖고 싶습니다', note: '～が ほしいです (~을 갖고 싶습니다)' },
  ],
  // ～より ～の ほうが : 비교 (~보다 ~쪽이)
  [
    { kana: 'くるまより でんしゃの ほうが はやいです', romaji: 'kuruma yori densha no hou ga hayai desu', meaning: '자동차보다 전철이 빠릅니다', note: '～より ～の ほうが (비교: ~보다 ~쪽이)' },
    { kana: 'コーヒーより おちゃの ほうが すきです', romaji: 'koohii yori ocha no hou ga suki desu', meaning: '커피보다 차를 좋아합니다', note: '～より ～の ほうが (비교: ~보다 ~쪽이)' },
    { kana: 'なつより ふゆの ほうが すきです', romaji: 'natsu yori fuyu no hou ga suki desu', meaning: '여름보다 겨울을 좋아합니다', note: '～より ～の ほうが (비교: ~보다 ~쪽이)' },
  ],
  // ～ながら : ~하면서
  [
    { kana: 'おんがくを ききながら べんきょうします', romaji: 'ongaku o kikinagara benkyou shimasu', meaning: '음악을 들으면서 공부합니다', note: '～ながら (~하면서)' },
    { kana: 'テレビを みながら たべます', romaji: 'terebi o minagara tabemasu', meaning: '텔레비전을 보면서 먹습니다', note: '～ながら (~하면서)' },
    { kana: 'あるきながら はなします', romaji: 'arukinagara hanashimasu', meaning: '걸으면서 이야기합니다', note: '～ながら (~하면서)' },
  ],
  // ～た ことが あります : ~한 적이 있습니다 (경험)
  [
    { kana: 'にほんに いったことが あります', romaji: 'nihon ni itta koto ga arimasu', meaning: '일본에 간 적이 있습니다', note: '～た ことが あります (~한 적이 있습니다, 경험)' },
    { kana: 'すしを たべたことが あります', romaji: 'sushi o tabeta koto ga arimasu', meaning: '초밥을 먹은 적이 있습니다', note: '～た ことが あります (~한 적이 있습니다, 경험)' },
    { kana: 'ふじさんを みたことが あります', romaji: 'fujisan o mita koto ga arimasu', meaning: '후지산을 본 적이 있습니다', note: '～た ことが あります (~한 적이 있습니다, 경험)' },
  ],
  // ～ほうが いいです : ~하는 편이 좋습니다 (충고)
  [
    { kana: 'やすんだ ほうが いいです', romaji: 'yasunda hou ga ii desu', meaning: '쉬는 편이 좋습니다', note: '～ほうが いいです (~하는 편이 좋습니다, 충고)' },
    { kana: 'びょういんに いった ほうが いいです', romaji: 'byouin ni itta hou ga ii desu', meaning: '병원에 가는 편이 좋습니다', note: '～ほうが いいです (~하는 편이 좋습니다, 충고)' },
    { kana: 'はやく ねた ほうが いいです', romaji: 'hayaku neta hou ga ii desu', meaning: '일찍 자는 편이 좋습니다', note: '～ほうが いいです (~하는 편이 좋습니다, 충고)' },
  ],
  // ～すぎます : 너무 ~합니다
  [
    { kana: 'たべすぎました', romaji: 'tabesugimashita', meaning: '너무 먹었습니다', note: '～すぎます (너무 ~합니다)' },
    { kana: 'たかすぎます', romaji: 'takasugimasu', meaning: '너무 비쌉니다', note: '～すぎます (너무 ~합니다)' },
    { kana: 'のみすぎました', romaji: 'nomisugimashita', meaning: '너무 마셨습니다', note: '～すぎます (너무 ~합니다)' },
  ],
  // ～でしょう : ~일 것입니다 (추측)
  [
    { kana: 'あした あめが ふるでしょう', romaji: 'ashita ame ga furu deshou', meaning: '내일 비가 올 것입니다', note: '～でしょう (~일 것입니다, 추측)' },
    { kana: 'かれは こないでしょう', romaji: 'kare wa konai deshou', meaning: '그는 안 올 것입니다', note: '～でしょう (~일 것입니다, 추측)' },
    { kana: 'あした さむいでしょう', romaji: 'ashita samui deshou', meaning: '내일 추울 것입니다', note: '～でしょう (~일 것입니다, 추측)' },
  ],
  // ～かもしれません : ~일지도 모릅니다
  [
    { kana: 'あめが ふるかもしれません', romaji: 'ame ga furu kamoshiremasen', meaning: '비가 올지도 모릅니다', note: '～かもしれません (~일지도 모릅니다)' },
    { kana: 'おくれるかもしれません', romaji: 'okureru kamoshiremasen', meaning: '늦을지도 모릅니다', note: '～かもしれません (~일지도 모릅니다)' },
    { kana: 'たかいかもしれません', romaji: 'takai kamoshiremasen', meaning: '비쌀지도 모릅니다', note: '～かもしれません (~일지도 모릅니다)' },
  ],
  // ～が じょうずです / へたです : 잘함 / 못함
  [
    { kana: 'かれは えいごが じょうずです', romaji: 'kare wa eigo ga jouzu desu', meaning: '그는 영어를 잘합니다', note: '～が じょうずです / へたです (잘함/못함)' },
    { kana: 'かのじょは りょうりが じょうずです', romaji: 'kanojo wa ryouri ga jouzu desu', meaning: '그녀는 요리를 잘합니다', note: '～が じょうずです / へたです (잘함/못함)' },
    { kana: 'わたしは うたが へたです', romaji: 'watashi wa uta ga heta desu', meaning: '저는 노래를 못합니다', note: '～が じょうずです / へたです (잘함/못함)' },
  ],
  // ～つもりです : ~할 작정입니다
  [
    { kana: 'にほんに いく つもりです', romaji: 'nihon ni iku tsumori desu', meaning: '일본에 갈 작정입니다', note: '～つもりです (~할 작정입니다)' },
    { kana: 'あした やすむ つもりです', romaji: 'ashita yasumu tsumori desu', meaning: '내일 쉴 작정입니다', note: '～つもりです (~할 작정입니다)' },
    { kana: 'べんきょうする つもりです', romaji: 'benkyou suru tsumori desu', meaning: '공부할 작정입니다', note: '～つもりです (~할 작정입니다)' },
  ],
  // ～なります : ~해집니다 / ~가 됩니다
  [
    { kana: 'さむく なります', romaji: 'samuku narimasu', meaning: '추워집니다', note: '～なります (~해집니다 / ~가 됩니다)' },
    { kana: 'げんきに なります', romaji: 'genki ni narimasu', meaning: '건강해집니다', note: '～なります (~해집니다 / ~가 됩니다)' },
    { kana: 'せんせいに なります', romaji: 'sensei ni narimasu', meaning: '선생님이 됩니다', note: '～なります (~해집니다 / ~가 됩니다)' },
  ],
  // ～たら : ~하면 (조건)
  [
    { kana: 'あめが ふったら いきません', romaji: 'ame ga futtara ikimasen', meaning: '비가 오면 안 갑니다', note: '～たら (~하면, 조건)' },
    { kana: 'やすかったら かいます', romaji: 'yasukattara kaimasu', meaning: '싸면 삽니다', note: '～たら (~하면, 조건)' },
    { kana: 'じかんが あったら あいましょう', romaji: 'jikan ga attara aimashou', meaning: '시간이 있으면 만납시다', note: '～たら (~하면, 조건)' },
  ],
  // ～ので : ~때문에 / ~라서
  [
    { kana: 'さむいので コートを きます', romaji: 'samui node kooto o kimasu', meaning: '추워서 코트를 입습니다', note: '～ので (~때문에 / ~라서)' },
    { kana: 'いそがしいので いけません', romaji: 'isogashii node ikemasen', meaning: '바빠서 못 갑니다', note: '～ので (~때문에 / ~라서)' },
    { kana: 'おいしいので すきです', romaji: 'oishii node suki desu', meaning: '맛있어서 좋아합니다', note: '～ので (~때문에 / ~라서)' },
  ],
  // ～のが すきです : ~하는 것을 좋아합니다
  [
    { kana: 'ほんを よむのが すきです', romaji: 'hon o yomu no ga suki desu', meaning: '책 읽는 것을 좋아합니다', note: '～のが すきです (~하는 것을 좋아합니다)' },
    { kana: 'うたを うたうのが すきです', romaji: 'uta o utau no ga suki desu', meaning: '노래 부르는 것을 좋아합니다', note: '～のが すきです (~하는 것을 좋아합니다)' },
    { kana: 'りょうりを つくるのが すきです', romaji: 'ryouri o tsukuru no ga suki desu', meaning: '요리하는 것을 좋아합니다', note: '～のが すきです (~하는 것을 좋아합니다)' },
  ],
  // ～まえに : ~하기 전에
  [
    { kana: 'ねる まえに はを みがきます', romaji: 'neru mae ni ha o migakimasu', meaning: '자기 전에 이를 닦습니다', note: '～まえに (~하기 전에)' },
    { kana: 'たべる まえに てを あらいます', romaji: 'taberu mae ni te o araimasu', meaning: '먹기 전에 손을 씻습니다', note: '～まえに (~하기 전에)' },
    { kana: 'いく まえに でんわします', romaji: 'iku mae ni denwa shimasu', meaning: '가기 전에 전화합니다', note: '～まえに (~하기 전에)' },
  ],
  // ～たり ～たり します : ~하기도 하고 ~하기도 합니다
  [
    { kana: 'ほんを よんだり おんがくを きいたり します', romaji: 'hon o yondari ongaku o kiitari shimasu', meaning: '책을 읽기도 하고 음악을 듣기도 합니다', note: '～たり ～たり します (~하기도 하고)' },
    { kana: 'やすみは ねたり あそんだり します', romaji: 'yasumi wa netari asondari shimasu', meaning: '휴일엔 자기도 하고 놀기도 합니다', note: '～たり ～たり します (~하기도 하고)' },
    { kana: 'わらったり ないたり しました', romaji: 'warattari naitari shimashita', meaning: '웃기도 하고 울기도 했습니다', note: '～たり ～たり します (~하기도 하고)' },
  ],
  // ～ても : ~해도
  [
    { kana: 'あめが ふっても いきます', romaji: 'ame ga futtemo ikimasu', meaning: '비가 와도 갑니다', note: '～ても (~해도)' },
    { kana: 'たかくても かいます', romaji: 'takakutemo kaimasu', meaning: '비싸도 삽니다', note: '～ても (~해도)' },
    { kana: 'いそがしくても てつだいます', romaji: 'isogashikutemo tetsudaimasu', meaning: '바빠도 돕습니다', note: '～ても (~해도)' },
  ],
  // ～ように なります : ~하게 됩니다
  [
    { kana: 'にほんごが はなせるように なりました', romaji: 'nihongo ga hanaseru you ni narimashita', meaning: '일본어를 말할 수 있게 됐습니다', note: '～ように なります (~하게 됩니다)' },
    { kana: 'はやく おきるように なりました', romaji: 'hayaku okiru you ni narimashita', meaning: '일찍 일어나게 됐습니다', note: '～ように なります (~하게 됩니다)' },
    { kana: 'やさいを たべるように なりました', romaji: 'yasai o taberu you ni narimashita', meaning: '채소를 먹게 됐습니다', note: '～ように なります (~하게 됩니다)' },
  ],
  // ～ことに します : ~하기로 합니다
  [
    { kana: 'まいにち はしることに しました', romaji: 'mainichi hashiru koto ni shimashita', meaning: '매일 달리기로 했습니다', note: '～ことに します (~하기로 합니다)' },
    { kana: 'たばこを やめることに しました', romaji: 'tabako o yameru koto ni shimashita', meaning: '담배를 끊기로 했습니다', note: '～ことに します (~하기로 합니다)' },
    { kana: 'にほんに いくことに しました', romaji: 'nihon ni iku koto ni shimashita', meaning: '일본에 가기로 했습니다', note: '～ことに します (~하기로 합니다)' },
  ],
  // ～そうです : ~할 것 같습니다 (양태)
  [
    { kana: 'あめが ふりそうです', romaji: 'ame ga furisou desu', meaning: '비가 올 것 같습니다', note: '～そうです (~할 것 같습니다, 양태)' },
    { kana: 'おいしそうです', romaji: 'oishisou desu', meaning: '맛있어 보입니다', note: '～そうです (~할 것 같습니다, 양태)' },
    { kana: 'たいへんそうです', romaji: 'taihensou desu', meaning: '힘들어 보입니다', note: '～そうです (~할 것 같습니다, 양태)' },
  ],
  // ～ば : ~하면 (가정)
  [
    { kana: 'やすければ かいます', romaji: 'yasukereba kaimasu', meaning: '싸면 삽니다', note: '～ば (~하면, 가정)' },
    { kana: 'いけば わかります', romaji: 'ikeba wakarimasu', meaning: '가면 압니다', note: '～ば (~하면, 가정)' },
    { kana: 'れんしゅうすれば じょうずに なります', romaji: 'renshuu sureba jouzu ni narimasu', meaning: '연습하면 잘하게 됩니다', note: '～ば (~하면, 가정)' },
  ],
  // ～のに : ~인데 (역접)
  [
    { kana: 'べんきょうしたのに できませんでした', romaji: 'benkyou shita noni dekimasen deshita', meaning: '공부했는데 못했습니다', note: '～のに (~인데, 역접)' },
    { kana: 'たかいのに かいました', romaji: 'takai noni kaimashita', meaning: '비싼데 샀습니다', note: '～のに (~인데, 역접)' },
    { kana: 'あめなのに でかけます', romaji: 'ame nanoni dekakemasu', meaning: '비인데 외출합니다', note: '～のに (~인데, 역접)' },
  ],
  // ～なくても いいです : ~하지 않아도 됩니다
  [
    { kana: 'こなくても いいです', romaji: 'konakutemo ii desu', meaning: '안 와도 됩니다', note: '～なくても いいです (~하지 않아도 됩니다)' },
    { kana: 'いそがなくても いいです', romaji: 'isoganakutemo ii desu', meaning: '서두르지 않아도 됩니다', note: '～なくても いいです (~하지 않아도 됩니다)' },
    { kana: 'はらわなくても いいです', romaji: 'harawanakutemo ii desu', meaning: '내지 않아도 됩니다', note: '～なくても いいです (~하지 않아도 됩니다)' },
  ],
  // ～ない ほうが いいです : ~하지 않는 편이 좋습니다
  [
    { kana: 'むりを しない ほうが いいです', romaji: 'muri o shinai hou ga ii desu', meaning: '무리하지 않는 편이 좋습니다', note: '～ない ほうが いいです (~안 하는 편이 좋다)' },
    { kana: 'たばこは すわない ほうが いいです', romaji: 'tabako wa suwanai hou ga ii desu', meaning: '담배는 피우지 않는 편이 좋습니다', note: '～ない ほうが いいです (~안 하는 편이 좋다)' },
    { kana: 'おそく ねない ほうが いいです', romaji: 'osoku nenai hou ga ii desu', meaning: '늦게 자지 않는 편이 좋습니다', note: '～ない ほうが いいです (~안 하는 편이 좋다)' },
  ],
  // ～と : ~하면 (자연 결과)
  [
    { kana: 'はるに なると あたたかく なります', romaji: 'haru ni naru to atatakaku narimasu', meaning: '봄이 되면 따뜻해집니다', note: '～と (~하면, 자연 결과)' },
    { kana: 'ボタンを おすと ドアが あきます', romaji: 'botan o osu to doa ga akimasu', meaning: '버튼을 누르면 문이 열립니다', note: '～と (~하면, 자연 결과)' },
    { kana: 'みぎに まがると えきが あります', romaji: 'migi ni magaru to eki ga arimasu', meaning: '오른쪽으로 돌면 역이 있습니다', note: '～と (~하면, 자연 결과)' },
  ],
  // ～あいだに : ~하는 동안에
  [
    { kana: 'ねている あいだに でんわが ありました', romaji: 'neteiru aida ni denwa ga arimashita', meaning: '자는 동안에 전화가 왔습니다', note: '～あいだに (~하는 동안에)' },
    { kana: 'やすみの あいだに りょこうします', romaji: 'yasumi no aida ni ryokou shimasu', meaning: '휴일 동안에 여행합니다', note: '～あいだに (~하는 동안에)' },
    { kana: 'まっている あいだに ほんを よみます', romaji: 'matteiru aida ni hon o yomimasu', meaning: '기다리는 동안에 책을 읽습니다', note: '～あいだに (~하는 동안에)' },
  ],
  // ～やすい / ～にくい : ~하기 쉽다 / 어렵다
  [
    { kana: 'この ペンは かきやすいです', romaji: 'kono pen wa kakiyasui desu', meaning: '이 펜은 쓰기 쉽습니다', note: '～やすい / ～にくい (~하기 쉽다/어렵다)' },
    { kana: 'この くすりは のみにくいです', romaji: 'kono kusuri wa nominikui desu', meaning: '이 약은 먹기 어렵습니다', note: '～やすい / ～にくい (~하기 쉽다/어렵다)' },
    { kana: 'この みちは あるきやすいです', romaji: 'kono michi wa arukiyasui desu', meaning: '이 길은 걷기 쉽습니다', note: '～やすい / ～にくい (~하기 쉽다/어렵다)' },
  ],
  // ～はじめます : ~하기 시작합니다
  [
    { kana: 'ほんを よみはじめました', romaji: 'hon o yomihajimemashita', meaning: '책을 읽기 시작했습니다', note: '～はじめます (~하기 시작합니다)' },
    { kana: 'あめが ふりはじめました', romaji: 'ame ga furihajimemashita', meaning: '비가 오기 시작했습니다', note: '～はじめます (~하기 시작합니다)' },
    { kana: 'にほんごを ならいはじめました', romaji: 'nihongo o naraihajimemashita', meaning: '일본어를 배우기 시작했습니다', note: '～はじめます (~하기 시작합니다)' },
  ],
  // ～でも : ~라도
  [
    { kana: 'コーヒーでも のみませんか', romaji: 'koohii demo nomimasen ka', meaning: '커피라도 마시지 않을래요?', note: '～でも (~라도)' },
    { kana: 'いつでも いいです', romaji: 'itsudemo ii desu', meaning: '언제라도 좋아요', note: '～でも (~라도)' },
    { kana: 'だれでも できます', romaji: 'daredemo dekimasu', meaning: '누구라도 할 수 있어요', note: '～でも (~라도)' },
  ],
  // ～ましょうか : ~할까요? (제안)
  [
    { kana: 'てつだいましょうか', romaji: 'tetsudaimashou ka', meaning: '도와드릴까요?', note: '～ましょうか (~할까요?, 제안)' },
    { kana: 'まどを あけましょうか', romaji: 'mado o akemashou ka', meaning: '창문을 열까요?', note: '～ましょうか (~할까요?, 제안)' },
    { kana: 'なにを たべましょうか', romaji: 'nani o tabemashou ka', meaning: '뭘 먹을까요?', note: '～ましょうか (~할까요?, 제안)' },
  ],
  // ～て あります : ~되어 있습니다 (상태)
  [
    { kana: 'まどが あけて あります', romaji: 'mado ga akete arimasu', meaning: '창문이 열려 있습니다', note: '～て あります (~되어 있습니다)' },
    { kana: 'かべに えが かけて あります', romaji: 'kabe ni e ga kakete arimasu', meaning: '벽에 그림이 걸려 있습니다', note: '～て あります (~되어 있습니다)' },
    { kana: 'つくえに ほんが おいて あります', romaji: 'tsukue ni hon ga oite arimasu', meaning: '책상에 책이 놓여 있습니다', note: '～て あります (~되어 있습니다)' },
  ],
  // ～て おきます : ~해 둡니다 (준비)
  [
    { kana: 'よやくして おきます', romaji: 'yoyaku shite okimasu', meaning: '예약해 둡니다', note: '～て おきます (~해 둡니다)' },
    { kana: 'かって おきます', romaji: 'katte okimasu', meaning: '사 둡니다', note: '～て おきます (~해 둡니다)' },
    { kana: 'べんきょうして おきます', romaji: 'benkyou shite okimasu', meaning: '공부해 둡니다', note: '～て おきます (~해 둡니다)' },
  ],
  // ～て みます : ~해 봅니다 (시도)
  [
    { kana: 'たべて みます', romaji: 'tabete mimasu', meaning: '먹어 봅니다', note: '～て みます (~해 봅니다)' },
    { kana: 'いって みます', romaji: 'itte mimasu', meaning: '가 봅니다', note: '～て みます (~해 봅니다)' },
    { kana: 'きいて みます', romaji: 'kiite mimasu', meaning: '물어 봅니다', note: '～て みます (~해 봅니다)' },
  ],
  // ～て しまいました : ~해 버렸습니다
  [
    { kana: 'わすれて しまいました', romaji: 'wasurete shimaimashita', meaning: '잊어버렸습니다', note: '～て しまいました (~해 버렸습니다)' },
    { kana: 'おとして しまいました', romaji: 'otoshite shimaimashita', meaning: '떨어뜨려 버렸습니다', note: '～て しまいました (~해 버렸습니다)' },
    { kana: 'たべて しまいました', romaji: 'tabete shimaimashita', meaning: '먹어 버렸습니다', note: '～て しまいました (~해 버렸습니다)' },
  ],
  // ～し ～し : ~하고 ~하고 (나열)
  [
    { kana: 'やすいし おいしいです', romaji: 'yasui shi oishii desu', meaning: '싸고 맛있습니다', note: '～し ～し (~하고 ~하고, 나열)' },
    { kana: 'しずかだし べんりです', romaji: 'shizuka dashi benri desu', meaning: '조용하고 편리합니다', note: '～し ～し (~하고 ~하고, 나열)' },
    { kana: 'あたまも いいし やさしいです', romaji: 'atama mo ii shi yasashii desu', meaning: '머리도 좋고 친절합니다', note: '～し ～し (~하고 ~하고, 나열)' },
  ],
  // ～みたいです : ~인 것 같습니다
  [
    { kana: 'あめが ふるみたいです', romaji: 'ame ga furu mitai desu', meaning: '비가 오는 것 같습니다', note: '～みたいです (~인 것 같습니다)' },
    { kana: 'だれも いないみたいです', romaji: 'daremo inai mitai desu', meaning: '아무도 없는 것 같습니다', note: '～みたいです (~인 것 같습니다)' },
    { kana: 'おいしいみたいです', romaji: 'oishii mitai desu', meaning: '맛있는 것 같습니다', note: '～みたいです (~인 것 같습니다)' },
  ],
  // ～かどうか : ~인지 어떤지
  [
    { kana: 'いくかどうか わかりません', romaji: 'iku ka douka wakarimasen', meaning: '갈지 어떨지 모릅니다', note: '～かどうか (~인지 어떤지)' },
    { kana: 'ただしいかどうか たしかめます', romaji: 'tadashii ka douka tashikamemasu', meaning: '맞는지 확인합니다', note: '～かどうか (~인지 어떤지)' },
    { kana: 'あるかどうか きいて みます', romaji: 'aru ka douka kiite mimasu', meaning: '있는지 물어봅니다', note: '～かどうか (~인지 어떤지)' },
  ],
  // ～と いいです : ~하면 좋겠습니다
  [
    { kana: 'あめが やむと いいですね', romaji: 'ame ga yamu to ii desu ne', meaning: '비가 그치면 좋겠네요', note: '～と いいです (~하면 좋겠습니다)' },
    { kana: 'ごうかくすると いいですね', romaji: 'goukaku suru to ii desu ne', meaning: '합격하면 좋겠네요', note: '～と いいです (~하면 좋겠습니다)' },
    { kana: 'はやく なおると いいですね', romaji: 'hayaku naoru to ii desu ne', meaning: '빨리 나으면 좋겠네요', note: '～と いいです (~하면 좋겠습니다)' },
  ],
  // ～ばかり : ~만 / 막 ~함
  [
    { kana: 'たべて ばかり います', romaji: 'tabete bakari imasu', meaning: '먹기만 합니다', note: '～ばかり (~만 / 막 ~함)' },
    { kana: 'ねて ばかり います', romaji: 'nete bakari imasu', meaning: '자기만 합니다', note: '～ばかり (~만 / 막 ~함)' },
    { kana: 'きた ばかりです', romaji: 'kita bakari desu', meaning: '막 왔습니다', note: '～ばかり (~만 / 막 ~함)' },
  ],
  // ～ところです : 막 ~하려던 / ~하는 중
  [
    { kana: 'いま でかける ところです', romaji: 'ima dekakeru tokoro desu', meaning: '지금 막 나가려던 참입니다', note: '～ところです (막 ~하려던 / 하는 중)' },
    { kana: 'たべている ところです', romaji: 'tabeteiru tokoro desu', meaning: '먹고 있는 중입니다', note: '～ところです (막 ~하려던 / 하는 중)' },
    { kana: 'おわった ところです', romaji: 'owatta tokoro desu', meaning: '막 끝난 참입니다', note: '～ところです (막 ~하려던 / 하는 중)' },
  ],
  // ～ても いいですか : ~해도 될까요?
  [
    { kana: 'ここに すわっても いいですか', romaji: 'koko ni suwattemo ii desu ka', meaning: '여기 앉아도 될까요?', note: '～ても いいですか (~해도 될까요?)' },
    { kana: 'しゃしんを とっても いいですか', romaji: 'shashin o tottemo ii desu ka', meaning: '사진 찍어도 될까요?', note: '～ても いいですか (~해도 될까요?)' },
    { kana: 'はいっても いいですか', romaji: 'haittemo ii desu ka', meaning: '들어가도 될까요?', note: '～ても いいですか (~해도 될까요?)' },
  ],
  // ～なさい : ~하세요 (명령)
  [
    { kana: 'はやく ねなさい', romaji: 'hayaku nenasai', meaning: '빨리 자거라', note: '～なさい (~하세요, 명령)' },
    { kana: 'べんきょうしなさい', romaji: 'benkyou shinasai', meaning: '공부하거라', note: '～なさい (~하세요, 명령)' },
    { kana: 'しずかに しなさい', romaji: 'shizuka ni shinasai', meaning: '조용히 하거라', note: '～なさい (~하세요, 명령)' },
  ],
  // ～は ～が : 주제 + 주어
  [
    { kana: 'ぞうは はなが ながいです', romaji: 'zou wa hana ga nagai desu', meaning: '코끼리는 코가 깁니다', note: '～は ～が (주제 + 주어)' },
    { kana: 'にほんは ふじさんが ゆうめいです', romaji: 'nihon wa fujisan ga yuumei desu', meaning: '일본은 후지산이 유명합니다', note: '～は ～が (주제 + 주어)' },
    { kana: 'わたしは あたまが いたいです', romaji: 'watashi wa atama ga itai desu', meaning: '저는 머리가 아픕니다', note: '～は ～が (주제 + 주어)' },
  ],
]

/** All example sentences flattened in teaching order. */
export const GRAMMAR: Kana[] = GRAMMAR_ROWS.flat()
