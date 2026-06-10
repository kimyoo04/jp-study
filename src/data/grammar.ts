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
  // ～と いいます : ~라고 합니다
  [
    { kana: 'これは にほんごで なんと いいますか', romaji: 'kore wa nihongo de nanto iimasu ka', meaning: '이건 일본어로 뭐라고 해요?', note: '～と いいます (~라고 합니다)' },
    { kana: 'わたしは キムと いいます', romaji: 'watashi wa kimu to iimasu', meaning: '저는 김이라고 합니다', note: '～と いいます (~라고 합니다)' },
    { kana: 'これは すしと いいます', romaji: 'kore wa sushi to iimasu', meaning: '이건 스시라고 합니다', note: '～と いいます (~라고 합니다)' },
  ],
  // ～ませんでした : ~하지 않았습니다 (과거 부정)
  [
    { kana: 'きのうは いきませんでした', romaji: 'kinou wa ikimasen deshita', meaning: '어제는 안 갔습니다', note: '～ませんでした (~하지 않았습니다)' },
    { kana: 'なにも たべませんでした', romaji: 'nanimo tabemasen deshita', meaning: '아무것도 안 먹었습니다', note: '～ませんでした (~하지 않았습니다)' },
    { kana: 'ぜんぜん わかりませんでした', romaji: 'zenzen wakarimasen deshita', meaning: '전혀 몰랐습니다', note: '～ませんでした (~하지 않았습니다)' },
  ],
  // ～ても かまいません : ~해도 상관없습니다
  [
    { kana: 'すこし おくれても かまいません', romaji: 'sukoshi okuretemo kamaimasen', meaning: '조금 늦어도 괜찮습니다', note: '～ても かまいません (~해도 상관없습니다)' },
    { kana: 'ここに すわっても かまいません', romaji: 'koko ni suwattemo kamaimasen', meaning: '여기 앉아도 됩니다', note: '～ても かまいません (~해도 상관없습니다)' },
    { kana: 'やすんでも かまいません', romaji: 'yasundemo kamaimasen', meaning: '쉬어도 됩니다', note: '～ても かまいません (~해도 상관없습니다)' },
  ],
  // ～ことが あります : 가끔 ~할 때가 있습니다
  [
    { kana: 'ときどき おそく なる ことが あります', romaji: 'tokidoki osoku naru koto ga arimasu', meaning: '가끔 늦을 때가 있습니다', note: '～ことが あります (가끔 ~할 때가 있다)' },
    { kana: 'たまに さけを のむ ことが あります', romaji: 'tamani sake o nomu koto ga arimasu', meaning: '가끔 술을 마실 때가 있습니다', note: '～ことが あります (가끔 ~할 때가 있다)' },
    { kana: 'あめが ふる ことが あります', romaji: 'ame ga furu koto ga arimasu', meaning: '비가 올 때가 있습니다', note: '～ことが あります (가끔 ~할 때가 있다)' },
  ],
  // ～と おなじです : ~와 같습니다
  [
    { kana: 'これは あれと おなじです', romaji: 'kore wa are to onaji desu', meaning: '이것은 저것과 같습니다', note: '～と おなじです (~와 같습니다)' },
    { kana: 'わたしのと おなじです', romaji: 'watashi no to onaji desu', meaning: '제 것과 같습니다', note: '～と おなじです (~와 같습니다)' },
    { kana: 'いみは おなじです', romaji: 'imi wa onaji desu', meaning: '뜻은 같습니다', note: '～と おなじです (~와 같습니다)' },
  ],
  // ～によって : ~에 따라
  [
    { kana: 'ひとに よって ちがいます', romaji: 'hito ni yotte chigaimasu', meaning: '사람에 따라 다릅니다', note: '～によって (~에 따라)' },
    { kana: 'てんきに よって きめます', romaji: 'tenki ni yotte kimemasu', meaning: '날씨에 따라 정합니다', note: '～によって (~에 따라)' },
    { kana: 'ばあいに よって ちがいます', romaji: 'baai ni yotte chigaimasu', meaning: '경우에 따라 다릅니다', note: '～によって (~에 따라)' },
  ],
  // ～ために : ~을 위해
  [
    { kana: 'けんこうの ために はしります', romaji: 'kenkou no tame ni hashirimasu', meaning: '건강을 위해 달립니다', note: '～ために (~을 위해)' },
    { kana: 'しけんの ために べんきょうします', romaji: 'shiken no tame ni benkyou shimasu', meaning: '시험을 위해 공부합니다', note: '～ために (~을 위해)' },
    { kana: 'かぞくの ために はたらきます', romaji: 'kazoku no tame ni hatarakimasu', meaning: '가족을 위해 일합니다', note: '～ために (~을 위해)' },
  ],
  // ～は ～です (추가 예문)
  [
    { kana: 'きょうは げつようびです', romaji: 'kyou wa getsuyoubi desu', meaning: '오늘은 월요일입니다', note: '～は～です (~은/는 ~입니다)' },
    { kana: 'ここは えきです', romaji: 'koko wa eki desu', meaning: '여기는 역입니다', note: '～は～です (~은/는 ~입니다)' },
    { kana: 'あれは やまです', romaji: 'are wa yama desu', meaning: '저것은 산입니다', note: '～は～です (~은/는 ~입니다)' },
  ],
  // ～を ～ます (추가 예문)
  [
    { kana: 'やさいを かいます', romaji: 'yasai o kaimasu', meaning: '채소를 삽니다', note: '～を ～ます (~을/를 ~합니다)' },
    { kana: 'おんがくを ききます', romaji: 'ongaku o kikimasu', meaning: '음악을 듣습니다', note: '～を ～ます (~을/를 ~합니다)' },
    { kana: 'しゃしんを とります', romaji: 'shashin o torimasu', meaning: '사진을 찍습니다', note: '～を ～ます (~을/를 ~합니다)' },
  ],
  // ～たいです (추가 예문)
  [
    { kana: 'コーヒーが のみたいです', romaji: 'koohii ga nomitai desu', meaning: '커피를 마시고 싶습니다', note: '～たいです (~하고 싶습니다)' },
    { kana: 'えいがが みたいです', romaji: 'eiga ga mitai desu', meaning: '영화를 보고 싶습니다', note: '～たいです (~하고 싶습니다)' },
    { kana: 'はやく かえりたいです', romaji: 'hayaku kaeritai desu', meaning: '빨리 돌아가고 싶습니다', note: '～たいです (~하고 싶습니다)' },
  ],
  // ～ています (추가 예문)
  [
    { kana: 'いま べんきょうして います', romaji: 'ima benkyou shiteimasu', meaning: '지금 공부하고 있습니다', note: '～ています (~하고 있습니다, 진행/상태)' },
    { kana: 'あめが ふって います', romaji: 'ame ga futteimasu', meaning: '비가 오고 있습니다', note: '～ています (~하고 있습니다, 진행/상태)' },
    { kana: 'おんがくを きいて います', romaji: 'ongaku o kiiteimasu', meaning: '음악을 듣고 있습니다', note: '～ています (~하고 있습니다, 진행/상태)' },
  ],
  // ～ば ～ほど : ~할수록
  [
    { kana: 'れんしゅうすれば するほど じょうずに なります', romaji: 'renshuu sureba suru hodo jouzu ni narimasu', meaning: '연습할수록 잘하게 됩니다', note: '～ば ～ほど (~할수록)' },
    { kana: 'たかければ たかいほど いいです', romaji: 'takakereba takai hodo ii desu', meaning: '비쌀수록 좋습니다', note: '～ば ～ほど (~할수록)' },
    { kana: 'みれば みるほど すきに なります', romaji: 'mireba miru hodo suki ni narimasu', meaning: '볼수록 좋아집니다', note: '～ば ～ほど (~할수록)' },
  ],
  // ～た まま : ~한 채
  [
    { kana: 'まどを あけた まま でかけました', romaji: 'mado o aketa mama dekakemashita', meaning: '창문을 연 채 나갔습니다', note: '～た まま (~한 채)' },
    { kana: 'くつを はいた まま はいりました', romaji: 'kutsu o haita mama hairimashita', meaning: '신발을 신은 채 들어갔습니다', note: '～た まま (~한 채)' },
    { kana: 'テレビを つけた まま ねました', romaji: 'terebi o tsuketa mama nemashita', meaning: '텔레비전을 켠 채 잤습니다', note: '～た まま (~한 채)' },
  ],
  // ～ように します : ~하도록 합니다
  [
    { kana: 'まいにち はやく ねるように します', romaji: 'mainichi hayaku neru you ni shimasu', meaning: '매일 일찍 자도록 합니다', note: '～ように します (~하도록 합니다)' },
    { kana: 'やさいを たべるように します', romaji: 'yasai o taberu you ni shimasu', meaning: '채소를 먹도록 합니다', note: '～ように します (~하도록 합니다)' },
    { kana: 'わすれないように します', romaji: 'wasurenai you ni shimasu', meaning: '잊지 않도록 합니다', note: '～ように します (~하도록 합니다)' },
  ],
  // ～ことが できません : ~할 수 없습니다
  [
    { kana: 'およぐ ことが できません', romaji: 'oyogu koto ga dekimasen', meaning: '수영할 수 없습니다', note: '～ことが できません (~할 수 없습니다)' },
    { kana: 'かんじを よむ ことが できません', romaji: 'kanji o yomu koto ga dekimasen', meaning: '한자를 읽을 수 없습니다', note: '～ことが できません (~할 수 없습니다)' },
    { kana: 'うんてんする ことが できません', romaji: 'unten suru koto ga dekimasen', meaning: '운전할 수 없습니다', note: '～ことが できません (~할 수 없습니다)' },
  ],
  // ～たがって います : ~하고 싶어합니다 (제3자)
  [
    { kana: 'いもうとは にほんに いきたがって います', romaji: 'imouto wa nihon ni ikitagatte imasu', meaning: '여동생은 일본에 가고 싶어합니다', note: '～たがって います (~하고 싶어합니다)' },
    { kana: 'こどもが あそびたがって います', romaji: 'kodomo ga asobitagatte imasu', meaning: '아이가 놀고 싶어합니다', note: '～たがって います (~하고 싶어합니다)' },
    { kana: 'かれは くるまを かいたがって います', romaji: 'kare wa kuruma o kaitagatte imasu', meaning: '그는 차를 사고 싶어합니다', note: '～たがって います (~하고 싶어합니다)' },
  ],
  // ～らしい : ~답다
  [
    { kana: 'かれは おとこらしいです', romaji: 'kare wa otokorashii desu', meaning: '그는 남자답습니다', note: '～らしい (~답다)' },
    { kana: 'はるらしい てんきです', romaji: 'haru rashii tenki desu', meaning: '봄다운 날씨입니다', note: '～らしい (~답다)' },
    { kana: 'がくせいらしく べんきょうします', romaji: 'gakusei rashiku benkyou shimasu', meaning: '학생답게 공부합니다', note: '～らしい (~답다)' },
  ],
  // ～が すきです (추가 예문)
  [
    { kana: 'りょこうが すきです', romaji: 'ryokou ga suki desu', meaning: '여행을 좋아합니다', note: '～が すきです (~을/를 좋아합니다)' },
    { kana: 'やまが すきです', romaji: 'yama ga suki desu', meaning: '산을 좋아합니다', note: '～が すきです (~을/를 좋아합니다)' },
    { kana: 'いぬが すきです', romaji: 'inu ga suki desu', meaning: '개를 좋아합니다', note: '～が すきです (~을/를 좋아합니다)' },
  ],
  // ～が あります / います (추가 예문)
  [
    { kana: 'にわに きが あります', romaji: 'niwa ni ki ga arimasu', meaning: '정원에 나무가 있습니다', note: '～が あります / います (~이 있습니다)' },
    { kana: 'きょうしつに がくせいが います', romaji: 'kyoushitsu ni gakusei ga imasu', meaning: '교실에 학생이 있습니다', note: '～が あります / います (~이 있습니다)' },
    { kana: 'いえの まえに くるまが あります', romaji: 'ie no mae ni kuruma ga arimasu', meaning: '집 앞에 차가 있습니다', note: '～が あります / います (~이 있습니다)' },
  ],
  // ～ください (추가 예문)
  [
    { kana: 'しゃしんを とって ください', romaji: 'shashin o totte kudasai', meaning: '사진을 찍어 주세요', note: '～ください (~해 주세요)' },
    { kana: 'ここに かいて ください', romaji: 'koko ni kaite kudasai', meaning: '여기에 써 주세요', note: '～ください (~해 주세요)' },
    { kana: 'もう いちど いって ください', romaji: 'mou ichido itte kudasai', meaning: '다시 한 번 말해 주세요', note: '～ください (~해 주세요)' },
  ],
  // ～に いきます (추가 예문)
  [
    { kana: 'としょかんに いきます', romaji: 'toshokan ni ikimasu', meaning: '도서관에 갑니다', note: '～に いきます (~에 갑니다)' },
    { kana: 'こうえんに いきます', romaji: 'kouen ni ikimasu', meaning: '공원에 갑니다', note: '～に いきます (~에 갑니다)' },
    { kana: 'かいものに いきます', romaji: 'kaimono ni ikimasu', meaning: '쇼핑하러 갑니다', note: '～に いきます (~에 갑니다)' },
  ],
  // ～ました (추가 예문)
  [
    { kana: 'にほんに いきました', romaji: 'nihon ni ikimashita', meaning: '일본에 갔습니다', note: '～ました (~했습니다, 과거)' },
    { kana: 'てがみを かきました', romaji: 'tegami o kakimashita', meaning: '편지를 썼습니다', note: '～ました (~했습니다, 과거)' },
    { kana: 'ともだちと あそびました', romaji: 'tomodachi to asobimashita', meaning: '친구와 놀았습니다', note: '～ました (~했습니다, 과거)' },
  ],
  // ～たいです (추가 예문 2)
  [
    { kana: 'りょこうに いきたいです', romaji: 'ryokou ni ikitai desu', meaning: '여행 가고 싶습니다', note: '～たいです (~하고 싶습니다)' },
    { kana: 'すしが たべたいです', romaji: 'sushi ga tabetai desu', meaning: '초밥을 먹고 싶습니다', note: '～たいです (~하고 싶습니다)' },
    { kana: 'ともだちに あいたいです', romaji: 'tomodachi ni aitai desu', meaning: '친구를 만나고 싶습니다', note: '～たいです (~하고 싶습니다)' },
  ],
  // ～ても いいです (추가 예문)
  [
    { kana: 'たべても いいです', romaji: 'tabetemo ii desu', meaning: '먹어도 됩니다', note: '～ても いいです (~해도 됩니다, 허가)' },
    { kana: 'みても いいです', romaji: 'mitemo ii desu', meaning: '봐도 됩니다', note: '～ても いいです (~해도 됩니다, 허가)' },
    { kana: 'つかっても いいです', romaji: 'tsukattemo ii desu', meaning: '써도 됩니다', note: '～ても いいです (~해도 됩니다, 허가)' },
  ],
  // ～なければ なりません (추가 예문)
  [
    { kana: 'いえに かえらなければ なりません', romaji: 'ie ni kaeranakereba narimasen', meaning: '집에 가야 합니다', note: '～なければ なりません (~해야 합니다)' },
    { kana: 'くすりを のまなければ なりません', romaji: 'kusuri o nomanakereba narimasen', meaning: '약을 먹어야 합니다', note: '～なければ なりません (~해야 합니다)' },
    { kana: 'もっと れんしゅうしなければ なりません', romaji: 'motto renshuu shinakereba narimasen', meaning: '더 연습해야 합니다', note: '～なければ なりません (~해야 합니다)' },
  ],
  // ～と おもいます (추가 예문)
  [
    { kana: 'たぶん くると おもいます', romaji: 'tabun kuru to omoimasu', meaning: '아마 올 거라고 생각합니다', note: '～と おもいます (~라고 생각합니다)' },
    { kana: 'むずかしいと おもいます', romaji: 'muzukashii to omoimasu', meaning: '어렵다고 생각합니다', note: '～と おもいます (~라고 생각합니다)' },
    { kana: 'おいしいと おもいます', romaji: 'oishii to omoimasu', meaning: '맛있다고 생각합니다', note: '～と おもいます (~라고 생각합니다)' },
  ],
  // ～と おもって います : ~하려고 합니다 (의도)
  [
    { kana: 'らいねん にほんに いこうと おもって います', romaji: 'rainen nihon ni ikou to omotte imasu', meaning: '내년에 일본에 가려고 합니다', note: '～と おもって います (~하려고 합니다)' },
    { kana: 'くるまを かおうと おもって います', romaji: 'kuruma o kaou to omotte imasu', meaning: '차를 사려고 합니다', note: '～と おもって います (~하려고 합니다)' },
    { kana: 'しゅうまつは やすもうと おもって います', romaji: 'shuumatsu wa yasumou to omotte imasu', meaning: '주말엔 쉬려고 합니다', note: '～と おもって います (~하려고 합니다)' },
  ],
  // ～か ～か : A인지 B인지
  [
    { kana: 'いくか いかないか まよって います', romaji: 'iku ka ikanai ka mayotte imasu', meaning: '갈지 안 갈지 망설입니다', note: '～か ～か (A인지 B인지)' },
    { kana: 'あめか ゆきか わかりません', romaji: 'ame ka yuki ka wakarimasen', meaning: '비인지 눈인지 모릅니다', note: '～か ～か (A인지 B인지)' },
    { kana: 'いくか やめるか きめて ください', romaji: 'iku ka yameru ka kimete kudasai', meaning: '갈지 말지 정해 주세요', note: '～か ～か (A인지 B인지)' },
  ],
  // ～について : ~에 대해
  [
    { kana: 'にほんの ぶんかに ついて はなします', romaji: 'nihon no bunka ni tsuite hanashimasu', meaning: '일본 문화에 대해 이야기합니다', note: '～について (~에 대해)' },
    { kana: 'この もんだいに ついて かんがえます', romaji: 'kono mondai ni tsuite kangaemasu', meaning: '이 문제에 대해 생각합니다', note: '～について (~에 대해)' },
    { kana: 'れきしに ついて しらべます', romaji: 'rekishi ni tsuite shirabemasu', meaning: '역사에 대해 조사합니다', note: '～について (~에 대해)' },
  ],
  // ～そうに : ~한 듯이
  [
    { kana: 'うれしそうに わらいました', romaji: 'ureshisou ni waraimashita', meaning: '기쁜 듯이 웃었습니다', note: '～そうに (~한 듯이)' },
    { kana: 'さむそうに しています', romaji: 'samusou ni shiteimasu', meaning: '추운 듯이 있습니다', note: '～そうに (~한 듯이)' },
    { kana: 'たのしそうに あそんで います', romaji: 'tanoshisou ni asonde imasu', meaning: '즐거운 듯이 놀고 있습니다', note: '～そうに (~한 듯이)' },
  ],
  // ～ば よかった : ~할 걸 그랬다
  [
    { kana: 'もっと べんきょうすれば よかったです', romaji: 'motto benkyou sureba yokatta desu', meaning: '더 공부할 걸 그랬습니다', note: '～ば よかった (~할 걸 그랬다)' },
    { kana: 'はやく いけば よかったです', romaji: 'hayaku ikeba yokatta desu', meaning: '빨리 갈 걸 그랬습니다', note: '～ば よかった (~할 걸 그랬다)' },
    { kana: 'かえば よかったです', romaji: 'kaeba yokatta desu', meaning: '살 걸 그랬습니다', note: '～ば よかった (~할 걸 그랬다)' },
  ],
  // ～を ～ます (추가 예문 2)
  [
    { kana: 'ジュースを のみます', romaji: 'juusu o nomimasu', meaning: '주스를 마십니다', note: '～を ～ます (~을/를 ~합니다)' },
    { kana: 'ごはんを つくります', romaji: 'gohan o tsukurimasu', meaning: '밥을 짓습니다', note: '～を ～ます (~을/를 ~합니다)' },
    { kana: 'しんぶんを よみます', romaji: 'shinbun o yomimasu', meaning: '신문을 읽습니다', note: '～を ～ます (~을/를 ~합니다)' },
  ],
  // ～ています (추가 예문 2)
  [
    { kana: 'ともだちを まって います', romaji: 'tomodachi o matte imasu', meaning: '친구를 기다리고 있습니다', note: '～ています (~하고 있습니다, 진행/상태)' },
    { kana: 'しごとを して います', romaji: 'shigoto o shite imasu', meaning: '일을 하고 있습니다', note: '～ています (~하고 있습니다, 진행/상태)' },
    { kana: 'ほんを よんで います', romaji: 'hon o yonde imasu', meaning: '책을 읽고 있습니다', note: '～ています (~하고 있습니다, 진행/상태)' },
  ],
  // ～てから (추가 예문)
  [
    { kana: 'かおを あらってから でかけます', romaji: 'kao o aratte kara dekakemasu', meaning: '세수하고 나서 나갑니다', note: '～てから (~하고 나서)' },
    { kana: 'ごはんを たべてから くすりを のみます', romaji: 'gohan o tabete kara kusuri o nomimasu', meaning: '밥을 먹고 나서 약을 먹습니다', note: '～てから (~하고 나서)' },
    { kana: 'しゅくだいを してから あそびます', romaji: 'shukudai o shite kara asobimasu', meaning: '숙제하고 나서 놉니다', note: '～てから (~하고 나서)' },
  ],
  // ～たり ～たり (추가 예문)
  [
    { kana: 'およいだり はしったり します', romaji: 'oyoidari hashittari shimasu', meaning: '수영하거나 달리거나 합니다', note: '～たり ～たり します (~하기도 하고)' },
    { kana: 'えいがを みたり ほんを よんだり します', romaji: 'eiga o mitari hon o yondari shimasu', meaning: '영화를 보거나 책을 읽거나 합니다', note: '～たり ～たり します (~하기도 하고)' },
    { kana: 'そうじしたり せんたくしたり します', romaji: 'souji shitari sentaku shitari shimasu', meaning: '청소하거나 세탁하거나 합니다', note: '～たり ～たり します (~하기도 하고)' },
  ],
  // ～ながら (추가 예문)
  [
    { kana: 'ごはんを たべながら テレビを みます', romaji: 'gohan o tabenagara terebi o mimasu', meaning: '밥을 먹으면서 텔레비전을 봅니다', note: '～ながら (~하면서)' },
    { kana: 'コーヒーを のみながら はなします', romaji: 'koohii o nominagara hanashimasu', meaning: '커피를 마시면서 이야기합니다', note: '～ながら (~하면서)' },
    { kana: 'うたを うたいながら あるきます', romaji: 'uta o utainagara arukimasu', meaning: '노래 부르면서 걷습니다', note: '～ながら (~하면서)' },
  ],
  // ～ましょう (추가 예문)
  [
    { kana: 'いっしょに たべましょう', romaji: 'issho ni tabemashou', meaning: '같이 먹읍시다', note: '～ましょう (~합시다, 청유)' },
    { kana: 'こうえんで あそびましょう', romaji: 'kouen de asobimashou', meaning: '공원에서 놉시다', note: '～ましょう (~합시다, 청유)' },
    { kana: 'えいがを みましょう', romaji: 'eiga o mimashou', meaning: '영화를 봅시다', note: '～ましょう (~합시다, 청유)' },
  ],
  // ～ませんか (추가 예문)
  [
    { kana: 'おちゃを のみませんか', romaji: 'ocha o nomimasen ka', meaning: '차를 마시지 않을래요?', note: '～ませんか (~하지 않겠습니까?, 권유)' },
    { kana: 'こうえんに いきませんか', romaji: 'kouen ni ikimasen ka', meaning: '공원에 가지 않을래요?', note: '～ませんか (~하지 않겠습니까?, 권유)' },
    { kana: 'てんぷらを たべませんか', romaji: 'tenpura o tabemasen ka', meaning: '튀김을 먹지 않을래요?', note: '～ませんか (~하지 않겠습니까?, 권유)' },
  ],
  // ～ことが できます (추가 예문)
  [
    { kana: 'ピアノが できます', romaji: 'piano ga dekimasu', meaning: '피아노를 칠 수 있습니다', note: '～ことが できます (~할 수 있습니다)' },
    { kana: 'えいごが できます', romaji: 'eigo ga dekimasu', meaning: '영어를 할 수 있습니다', note: '～ことが できます (~할 수 있습니다)' },
    { kana: 'すいえいが できます', romaji: 'suiei ga dekimasu', meaning: '수영을 할 수 있습니다', note: '～ことが できます (~할 수 있습니다)' },
  ],
  // ～ので (추가 예문)
  [
    { kana: 'つかれたので やすみます', romaji: 'tsukareta node yasumimasu', meaning: '피곤해서 쉽니다', note: '～ので (~때문에 / ~라서)' },
    { kana: 'やすいので かいます', romaji: 'yasui node kaimasu', meaning: '싸서 삽니다', note: '～ので (~때문에 / ~라서)' },
    { kana: 'あぶないので やめます', romaji: 'abunai node yamemasu', meaning: '위험해서 그만둡니다', note: '～ので (~때문에 / ~라서)' },
  ],
  // ～たら (추가 예문)
  [
    { kana: 'にほんに いったら すしを たべます', romaji: 'nihon ni ittara sushi o tabemasu', meaning: '일본에 가면 초밥을 먹습니다', note: '～たら (~하면, 조건)' },
    { kana: 'おかねが あったら かいます', romaji: 'okane ga attara kaimasu', meaning: '돈이 있으면 삽니다', note: '～たら (~하면, 조건)' },
    { kana: 'あめが やんだら でかけます', romaji: 'ame ga yandara dekakemasu', meaning: '비가 그치면 나갑니다', note: '～たら (~하면, 조건)' },
  ],
  // ～と ～と どちらが : 둘 중 어느 쪽이
  [
    { kana: 'コーヒーと おちゃと どちらが すきですか', romaji: 'koohii to ocha to dochira ga suki desu ka', meaning: '커피와 차 중 어느 쪽이 좋아요?', note: '～と ～と どちらが (둘 중 어느 쪽)' },
    { kana: 'でんしゃと バスと どちらが はやいですか', romaji: 'densha to basu to dochira ga hayai desu ka', meaning: '전철과 버스 중 어느 쪽이 빨라요?', note: '～と ～と どちらが (둘 중 어느 쪽)' },
    { kana: 'なつと ふゆと どちらが すきですか', romaji: 'natsu to fuyu to dochira ga suki desu ka', meaning: '여름과 겨울 중 어느 쪽이 좋아요?', note: '～と ～と どちらが (둘 중 어느 쪽)' },
  ],
  // ～で いちばん : ~에서 가장
  [
    { kana: 'クラスで いちばん せが たかいです', romaji: 'kurasu de ichiban se ga takai desu', meaning: '반에서 가장 키가 큽니다', note: '～で いちばん (~에서 가장)' },
    { kana: 'にほんで いちばん たかい やまです', romaji: 'nihon de ichiban takai yama desu', meaning: '일본에서 가장 높은 산입니다', note: '～で いちばん (~에서 가장)' },
    { kana: 'せかいで いちばん ひろい うみです', romaji: 'sekai de ichiban hiroi umi desu', meaning: '세계에서 가장 넓은 바다입니다', note: '～で いちばん (~에서 가장)' },
  ],
  // ～かた : ~하는 법
  [
    { kana: 'つかいかたを おしえて ください', romaji: 'tsukaikata o oshiete kudasai', meaning: '사용법을 알려 주세요', note: '～かた (~하는 법)' },
    { kana: 'よみかたが わかりません', romaji: 'yomikata ga wakarimasen', meaning: '읽는 법을 모릅니다', note: '～かた (~하는 법)' },
    { kana: 'つくりかたを ならいます', romaji: 'tsukurikata o naraimasu', meaning: '만드는 법을 배웁니다', note: '～かた (~하는 법)' },
  ],
  // ～すぎて : 너무 ~해서
  [
    { kana: 'たべすぎて おなかが いたいです', romaji: 'tabesugite onaka ga itai desu', meaning: '너무 먹어서 배가 아픕니다', note: '～すぎて (너무 ~해서)' },
    { kana: 'たかすぎて かえません', romaji: 'takasugite kaemasen', meaning: '너무 비싸서 못 삽니다', note: '～すぎて (너무 ~해서)' },
    { kana: 'つかれすぎて ねむれません', romaji: 'tsukaresugite nemuremasen', meaning: '너무 피곤해서 잠을 못 잡니다', note: '～すぎて (너무 ~해서)' },
  ],
  // ～なくちゃ : ~해야 해 (구어)
  [
    { kana: 'もう いかなくちゃ', romaji: 'mou ikanakucha', meaning: '이제 가야 해', note: '～なくちゃ (~해야 해, 구어)' },
    { kana: 'べんきょうしなくちゃ', romaji: 'benkyou shinakucha', meaning: '공부해야 해', note: '～なくちゃ (~해야 해, 구어)' },
    { kana: 'はやく ねなくちゃ', romaji: 'hayaku nenakucha', meaning: '빨리 자야 해', note: '～なくちゃ (~해야 해, 구어)' },
  ],
  // ～みたいに : ~처럼
  [
    { kana: 'とりみたいに とびたいです', romaji: 'tori mitai ni tobitai desu', meaning: '새처럼 날고 싶습니다', note: '～みたいに (~처럼)' },
    { kana: 'こどもみたいに あそびます', romaji: 'kodomo mitai ni asobimasu', meaning: '아이처럼 놉니다', note: '～みたいに (~처럼)' },
    { kana: 'プロみたいに じょうずです', romaji: 'puro mitai ni jouzu desu', meaning: '프로처럼 잘합니다', note: '～みたいに (~처럼)' },
  ],
  // 의문사 + ても : ~해도
  [
    { kana: 'なにを たべても おいしいです', romaji: 'nani o tabetemo oishii desu', meaning: '뭘 먹어도 맛있습니다', note: '의문사 + ても (~해도)' },
    { kana: 'だれが きても だいじょうぶです', romaji: 'dare ga kitemo daijoubu desu', meaning: '누가 와도 괜찮습니다', note: '의문사 + ても (~해도)' },
    { kana: 'どこに いっても ひとが おおいです', romaji: 'doko ni ittemo hito ga ooi desu', meaning: '어디 가도 사람이 많습니다', note: '의문사 + ても (~해도)' },
  ],
  // ～た あとで : ~한 후에
  [
    { kana: 'ごはんを たべた あとで さんぽします', romaji: 'gohan o tabeta ato de sanpo shimasu', meaning: '밥을 먹은 후에 산책합니다', note: '～た あとで (~한 후에)' },
    { kana: 'しごとが おわった あとで のみに いきます', romaji: 'shigoto ga owatta ato de nomi ni ikimasu', meaning: '일이 끝난 후에 마시러 갑니다', note: '～た あとで (~한 후에)' },
    { kana: 'べんきょうした あとで やすみます', romaji: 'benkyou shita ato de yasumimasu', meaning: '공부한 후에 쉽니다', note: '～た あとで (~한 후에)' },
  ],
  // ～は ～です (추가 예문 2)
  [
    { kana: 'かれは いしゃです', romaji: 'kare wa isha desu', meaning: '그는 의사입니다', note: '～は～です (~은/는 ~입니다)' },
    { kana: 'これは わたしの かさです', romaji: 'kore wa watashi no kasa desu', meaning: '이것은 제 우산입니다', note: '～は～です (~은/는 ~입니다)' },
    { kana: 'きょうは いい てんきです', romaji: 'kyou wa ii tenki desu', meaning: '오늘은 좋은 날씨입니다', note: '～は～です (~은/는 ~입니다)' },
  ],
  // ～に いきます (추가 예문 2)
  [
    { kana: 'えいがかんに いきます', romaji: 'eigakan ni ikimasu', meaning: '영화관에 갑니다', note: '～に いきます (~에 갑니다)' },
    { kana: 'びょういんに いきます', romaji: 'byouin ni ikimasu', meaning: '병원에 갑니다', note: '～に いきます (~에 갑니다)' },
    { kana: 'ともだちの いえに いきます', romaji: 'tomodachi no ie ni ikimasu', meaning: '친구 집에 갑니다', note: '～に いきます (~에 갑니다)' },
  ],
  // ～が あります / います (추가 예문 2)
  [
    { kana: 'つくえの うえに とけいが あります', romaji: 'tsukue no ue ni tokei ga arimasu', meaning: '책상 위에 시계가 있습니다', note: '～が あります / います (~이 있습니다)' },
    { kana: 'こうえんに こどもが います', romaji: 'kouen ni kodomo ga imasu', meaning: '공원에 아이가 있습니다', note: '～が あります / います (~이 있습니다)' },
    { kana: 'れいぞうこに たまごが あります', romaji: 'reizouko ni tamago ga arimasu', meaning: '냉장고에 계란이 있습니다', note: '～が あります / います (~이 있습니다)' },
  ],
  // ～ください (추가 예문 2)
  [
    { kana: 'でんわして ください', romaji: 'denwa shite kudasai', meaning: '전화해 주세요', note: '～ください (~해 주세요)' },
    { kana: 'まどを あけて ください', romaji: 'mado o akete kudasai', meaning: '창문을 열어 주세요', note: '～ください (~해 주세요)' },
    { kana: 'ここで まって ください', romaji: 'koko de matte kudasai', meaning: '여기서 기다려 주세요', note: '～ください (~해 주세요)' },
  ],
  // ～ています (추가 예문 3)
  [
    { kana: 'でんわを して います', romaji: 'denwa o shite imasu', meaning: '전화를 하고 있습니다', note: '～ています (~하고 있습니다, 진행/상태)' },
    { kana: 'ごはんを たべて います', romaji: 'gohan o tabete imasu', meaning: '밥을 먹고 있습니다', note: '～ています (~하고 있습니다, 진행/상태)' },
    { kana: 'こうえんで あそんで います', romaji: 'kouen de asonde imasu', meaning: '공원에서 놀고 있습니다', note: '～ています (~하고 있습니다, 진행/상태)' },
  ],
  // ～たいです (추가 예문 3)
  [
    { kana: 'おんせんに いきたいです', romaji: 'onsen ni ikitai desu', meaning: '온천에 가고 싶습니다', note: '～たいです (~하고 싶습니다)' },
    { kana: 'あたらしい くつが かいたいです', romaji: 'atarashii kutsu ga kaitai desu', meaning: '새 신발을 사고 싶습니다', note: '～たいです (~하고 싶습니다)' },
    { kana: 'ゆっくり やすみたいです', romaji: 'yukkuri yasumitai desu', meaning: '푹 쉬고 싶습니다', note: '～たいです (~하고 싶습니다)' },
  ],
  // ～ました (추가 예문 2)
  [
    { kana: 'パーティーに いきました', romaji: 'paatii ni ikimashita', meaning: '파티에 갔습니다', note: '～ました (~했습니다, 과거)' },
    { kana: 'プレゼントを もらいました', romaji: 'purezento o moraimashita', meaning: '선물을 받았습니다', note: '～ました (~했습니다, 과거)' },
    { kana: 'あたらしい くるまを かいました', romaji: 'atarashii kuruma o kaimashita', meaning: '새 차를 샀습니다', note: '～ました (~했습니다, 과거)' },
  ],
  // ～から ～まで (추가 예문)
  [
    { kana: 'えきから いえまで あるきます', romaji: 'eki kara ie made arukimasu', meaning: '역에서 집까지 걷습니다', note: '～から ～まで (~부터 ~까지)' },
    { kana: 'くじから じゅうじまで べんきょうします', romaji: 'kuji kara juuji made benkyou shimasu', meaning: '9시부터 10시까지 공부합니다', note: '～から ～まで (~부터 ~까지)' },
    { kana: 'はるから なつまで', romaji: 'haru kara natsu made', meaning: '봄부터 여름까지', note: '～から ～まで (~부터 ~까지)' },
  ],
  // ～たことが ありません : ~한 적이 없습니다
  [
    { kana: 'すしを たべたことが ありません', romaji: 'sushi o tabeta koto ga arimasen', meaning: '초밥을 먹은 적이 없습니다', note: '～たことが ありません (~한 적이 없다)' },
    { kana: 'にほんに いったことが ありません', romaji: 'nihon ni itta koto ga arimasen', meaning: '일본에 간 적이 없습니다', note: '～たことが ありません (~한 적이 없다)' },
    { kana: 'かんじを かいたことが ありません', romaji: 'kanji o kaita koto ga arimasen', meaning: '한자를 쓴 적이 없습니다', note: '～たことが ありません (~한 적이 없다)' },
  ],
  // ～でしょうか : ~일까요?
  [
    { kana: 'あした あめでしょうか', romaji: 'ashita ame deshou ka', meaning: '내일 비일까요?', note: '～でしょうか (~일까요?)' },
    { kana: 'これで いいでしょうか', romaji: 'kore de ii deshou ka', meaning: '이걸로 될까요?', note: '～でしょうか (~일까요?)' },
    { kana: 'かれは くるでしょうか', romaji: 'kare wa kuru deshou ka', meaning: '그가 올까요?', note: '～でしょうか (~일까요?)' },
  ],
  // ～ように : ~하도록
  [
    { kana: 'わすれないように メモします', romaji: 'wasurenai you ni memo shimasu', meaning: '잊지 않도록 메모합니다', note: '～ように (~하도록)' },
    { kana: 'かぜを ひかないように きを つけます', romaji: 'kaze o hikanai you ni ki o tsukemasu', meaning: '감기 걸리지 않도록 조심합니다', note: '～ように (~하도록)' },
    { kana: 'みんなに きこえるように はなします', romaji: 'minna ni kikoeru you ni hanashimasu', meaning: '모두에게 들리도록 말합니다', note: '～ように (~하도록)' },
  ],
  // ～って : ~래 (인용, 구어)
  [
    { kana: 'あした くるって', romaji: 'ashita kuru tte', meaning: '내일 온대', note: '～って (~래, 구어 인용)' },
    { kana: 'たかいって', romaji: 'takai tte', meaning: '비싸대', note: '～って (~래, 구어 인용)' },
    { kana: 'だいじょうぶって', romaji: 'daijoubu tte', meaning: '괜찮대', note: '～って (~래, 구어 인용)' },
  ],
  // ～じゃない : ~아니야 (반말 부정)
  [
    { kana: 'がくせいじゃない', romaji: 'gakusei janai', meaning: '학생이 아니야', note: '～じゃない (~아니야, 반말 부정)' },
    { kana: 'たかくない', romaji: 'takakunai', meaning: '비싸지 않아', note: '～じゃない (~아니야, 반말 부정)' },
    { kana: 'すきじゃない', romaji: 'suki janai', meaning: '좋아하지 않아', note: '～じゃない (~아니야, 반말 부정)' },
  ],
  // ～が すきです (추가 예문 2)
  [
    { kana: 'スポーツが すきです', romaji: 'supootsu ga suki desu', meaning: '스포츠를 좋아합니다', note: '～が すきです (~을/를 좋아합니다)' },
    { kana: 'あきが すきです', romaji: 'aki ga suki desu', meaning: '가을을 좋아합니다', note: '～が すきです (~을/를 좋아합니다)' },
    { kana: 'ケーキが すきです', romaji: 'keeki ga suki desu', meaning: '케이크를 좋아합니다', note: '～が すきです (~을/를 좋아합니다)' },
  ],
  // ～が あります / います (추가 예문 3)
  [
    { kana: 'かばんに ほんが あります', romaji: 'kaban ni hon ga arimasu', meaning: '가방에 책이 있습니다', note: '～が あります / います (~이 있습니다)' },
    { kana: 'いえに ねこが います', romaji: 'ie ni neko ga imasu', meaning: '집에 고양이가 있습니다', note: '～が あります / います (~이 있습니다)' },
    { kana: 'テーブルに はなが あります', romaji: 'teeburu ni hana ga arimasu', meaning: '테이블에 꽃이 있습니다', note: '～が あります / います (~이 있습니다)' },
  ],
  // ～ましょう (추가 예문 2)
  [
    { kana: 'コーヒーを のみましょう', romaji: 'koohii o nomimashou', meaning: '커피를 마십시다', note: '～ましょう (~합시다, 청유)' },
    { kana: 'さんぽしましょう', romaji: 'sanpo shimashou', meaning: '산책합시다', note: '～ましょう (~합시다, 청유)' },
    { kana: 'がんばりましょう', romaji: 'ganbarimashou', meaning: '힘냅시다', note: '～ましょう (~합시다, 청유)' },
  ],
  // ～ませんか (추가 예문 2)
  [
    { kana: 'いっしょに かえりませんか', romaji: 'issho ni kaerimasen ka', meaning: '같이 돌아가지 않을래요?', note: '～ませんか (~하지 않겠습니까?, 권유)' },
    { kana: 'おちゃでも のみませんか', romaji: 'ocha demo nomimasen ka', meaning: '차라도 마시지 않을래요?', note: '～ませんか (~하지 않겠습니까?, 권유)' },
    { kana: 'あそびに いきませんか', romaji: 'asobi ni ikimasen ka', meaning: '놀러 가지 않을래요?', note: '～ませんか (~하지 않겠습니까?, 권유)' },
  ],
  // ～ています (추가 예문 4)
  [
    { kana: 'かれを しって います', romaji: 'kare o shitte imasu', meaning: '그를 알고 있습니다', note: '～ています (~하고 있습니다, 진행/상태)' },
    { kana: 'めがねを かけて います', romaji: 'megane o kakete imasu', meaning: '안경을 쓰고 있습니다', note: '～ています (~하고 있습니다, 진행/상태)' },
    { kana: 'いえに すんで います', romaji: 'ie ni sunde imasu', meaning: '집에 살고 있습니다', note: '～ています (~하고 있습니다, 진행/상태)' },
  ],
  // ～ください (추가 예문 3)
  [
    { kana: 'みせて ください', romaji: 'misete kudasai', meaning: '보여 주세요', note: '～ください (~해 주세요)' },
    { kana: 'おしえて ください', romaji: 'oshiete kudasai', meaning: '알려 주세요', note: '～ください (~해 주세요)' },
    { kana: 'すわって ください', romaji: 'suwatte kudasai', meaning: '앉아 주세요', note: '～ください (~해 주세요)' },
  ],
  // ～たいです (추가 예문 4)
  [
    { kana: 'なにが たべたいですか', romaji: 'nani ga tabetai desu ka', meaning: '뭘 먹고 싶어요?', note: '～たいです (~하고 싶습니다)' },
    { kana: 'どこに いきたいですか', romaji: 'doko ni ikitai desu ka', meaning: '어디 가고 싶어요?', note: '～たいです (~하고 싶습니다)' },
    { kana: 'うみが みたいです', romaji: 'umi ga mitai desu', meaning: '바다를 보고 싶습니다', note: '～たいです (~하고 싶습니다)' },
  ],
  // ～ました (추가 예문 3)
  [
    { kana: 'きのう えいがを みました', romaji: 'kinou eiga o mimashita', meaning: '어제 영화를 봤습니다', note: '～ました (~했습니다, 과거)' },
    { kana: 'レストランで ごはんを たべました', romaji: 'resutoran de gohan o tabemashita', meaning: '레스토랑에서 밥을 먹었습니다', note: '～ました (~했습니다, 과거)' },
    { kana: 'こうえんを さんぽしました', romaji: 'kouen o sanpo shimashita', meaning: '공원을 산책했습니다', note: '～ました (~했습니다, 과거)' },
  ],
  // ～たり ～たり (추가 예문 2)
  [
    { kana: 'ほんを よんだり えを かいたり します', romaji: 'hon o yondari e o kaitari shimasu', meaning: '책을 읽거나 그림을 그리거나 합니다', note: '～たり ～たり します (~하기도 하고)' },
    { kana: 'あめが ふったり やんだり します', romaji: 'ame ga futtari yandari shimasu', meaning: '비가 오락가락합니다', note: '～たり ～たり します (~하기도 하고)' },
    { kana: 'わらったり おこったり します', romaji: 'warattari okottari shimasu', meaning: '웃거나 화내거나 합니다', note: '～たり ～たり します (~하기도 하고)' },
  ],
  // ～ので (추가 예문 2)
  [
    { kana: 'あめなので いえに います', romaji: 'ame nanode ie ni imasu', meaning: '비라서 집에 있습니다', note: '～ので (~때문에 / ~라서)' },
    { kana: 'むずかしいので きらいです', romaji: 'muzukashii node kirai desu', meaning: '어려워서 싫습니다', note: '～ので (~때문에 / ~라서)' },
    { kana: 'しずかなので すきです', romaji: 'shizuka nanode suki desu', meaning: '조용해서 좋습니다', note: '～ので (~때문에 / ~라서)' },
  ],
  // ～と おもいます (추가 예문 2)
  [
    { kana: 'きれいだと おもいます', romaji: 'kirei dato omoimasu', meaning: '예쁘다고 생각합니다', note: '～と おもいます (~라고 생각합니다)' },
    { kana: 'べんりだと おもいます', romaji: 'benri dato omoimasu', meaning: '편리하다고 생각합니다', note: '～と おもいます (~라고 생각합니다)' },
    { kana: 'たのしいと おもいます', romaji: 'tanoshii to omoimasu', meaning: '즐겁다고 생각합니다', note: '～と おもいます (~라고 생각합니다)' },
    { kana: 'それは ちがうと おもいます', romaji: 'sore wa chigau to omoimasu', meaning: '그건 다르다고 생각합니다', note: '～と おもいます (~라고 생각합니다)' },
  ],
  // ～ばあいは : ~경우에는
  [
    { kana: 'あめの ばあいは ちゅうしします', romaji: 'ame no baai wa chuushi shimasu', meaning: '비가 올 경우에는 중지합니다', note: '～ばあいは (~경우에는)' },
    { kana: 'おくれる ばあいは でんわして ください', romaji: 'okureru baai wa denwa shite kudasai', meaning: '늦을 경우에는 전화해 주세요', note: '～ばあいは (~경우에는)' },
    { kana: 'わからない ばあいは きいて ください', romaji: 'wakaranai baai wa kiite kudasai', meaning: '모를 경우에는 물어봐 주세요', note: '～ばあいは (~경우에는)' },
    { kana: 'じかんが ない ばあいは あしたでも いいです', romaji: 'jikan ga nai baai wa ashita demo ii desu', meaning: '시간이 없을 경우에는 내일이라도 됩니다', note: '～ばあいは (~경우에는)' },
    { kana: 'みちが こむ ばあいは でんしゃが はやいです', romaji: 'michi ga komu baai wa densha ga hayai desu', meaning: '길이 막힐 경우에는 전철이 빠릅니다', note: '～ばあいは (~경우에는)' },
    { kana: 'よやくが いっぱいの ばあいは また きます', romaji: 'yoyaku ga ippai no baai wa mata kimasu', meaning: '예약이 다 찼을 경우에는 다시 옵니다', note: '～ばあいは (~경우에는)' },
    { kana: 'もんだいが ある ばあいは れんらくして ください', romaji: 'mondai ga aru baai wa renraku shite kudasai', meaning: '문제가 있을 경우에는 연락해 주세요', note: '～ばあいは (~경우에는)' },
    { kana: 'やすみの ばあいは メールします', romaji: 'yasumi no baai wa meeru shimasu', meaning: '쉬는 경우에는 메일하겠습니다', note: '～ばあいは (~경우에는)' },
  ],
  // ～たびに : ~할 때마다
  [
    { kana: 'この うたを きく たびに かのじょを おもいだします', romaji: 'kono uta o kiku tabi ni kanojo o omoidashimasu', meaning: '이 노래를 들을 때마다 그녀를 떠올립니다', note: '～たびに (~할 때마다)' },
    { kana: 'はるが くる たびに さくらを みます', romaji: 'haru ga kuru tabi ni sakura o mimasu', meaning: '봄이 올 때마다 벚꽃을 봅니다', note: '～たびに (~할 때마다)' },
    { kana: 'かれに あう たびに げんきに なります', romaji: 'kare ni au tabi ni genki ni narimasu', meaning: '그를 만날 때마다 기운이 납니다', note: '～たびに (~할 때마다)' },
    { kana: 'りょこうの たびに しゃしんを とります', romaji: 'ryokou no tabi ni shashin o torimasu', meaning: '여행할 때마다 사진을 찍습니다', note: '～たびに (~할 때마다)' },
    { kana: 'この みせに くる たびに おなじ ものを たのみます', romaji: 'kono mise ni kuru tabi ni onaji mono o tanomimasu', meaning: '이 가게에 올 때마다 같은 걸 주문합니다', note: '～たびに (~할 때마다)' },
    { kana: 'しけんの たびに きんちょうします', romaji: 'shiken no tabi ni kinchou shimasu', meaning: '시험 때마다 긴장합니다', note: '～たびに (~할 때마다)' },
    { kana: 'かれに あう たびに しんせつだと おもいます', romaji: 'kare ni au tabi ni shinsetsu da to omoimasu', meaning: '그를 만날 때마다 친절하다고 생각합니다', note: '～たびに (~할 때마다)' },
    { kana: 'あきの たびに この まちを おもいだします', romaji: 'aki no tabi ni kono machi o omoidashimasu', meaning: '가을마다 이 동네를 떠올립니다', note: '～たびに (~할 때마다)' },
  ],
  // ～おかげで : ~덕분에
  [
    { kana: 'あなたの おかげで せいこうしました', romaji: 'anata no okage de seikou shimashita', meaning: '당신 덕분에 성공했습니다', note: '～おかげで (~덕분에)' },
    { kana: 'せんせいの おかげで ごうかくしました', romaji: 'sensei no okage de goukaku shimashita', meaning: '선생님 덕분에 합격했습니다', note: '～おかげで (~덕분에)' },
    { kana: 'ともだちの おかげで たのしかったです', romaji: 'tomodachi no okage de tanoshikatta desu', meaning: '친구 덕분에 즐거웠습니다', note: '～おかげで (~덕분에)' },
    { kana: 'くすりの おかげで よく なりました', romaji: 'kusuri no okage de yoku narimashita', meaning: '약 덕분에 나았습니다', note: '～おかげで (~덕분에)' },
    { kana: 'てんきの おかげで いい しゃしんが とれました', romaji: 'tenki no okage de ii shashin ga toremashita', meaning: '날씨 덕분에 좋은 사진을 찍었습니다', note: '～おかげで (~덕분에)' },
    { kana: 'みんなの おかげで おわりました', romaji: 'minna no okage de owarimashita', meaning: '모두 덕분에 끝났습니다', note: '～おかげで (~덕분에)' },
    { kana: 'ちずの おかげで まよいませんでした', romaji: 'chizu no okage de mayoimasen deshita', meaning: '지도 덕분에 헤매지 않았습니다', note: '～おかげで (~덕분에)' },
    { kana: 'れんしゅうの おかげで じょうずに なりました', romaji: 'renshuu no okage de jouzu ni narimashita', meaning: '연습 덕분에 능숙해졌습니다', note: '～おかげで (~덕분에)' },
  ],
]

/** All example sentences flattened in teaching order. */
export const GRAMMAR: Kana[] = GRAMMAR_ROWS.flat()
