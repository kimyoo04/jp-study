// 빈칸 채우기 (穴埋め) — 문장에서 빠진 조각을 객관식으로 고르는 덱.
// 카드의 kana 필드는 BLANK('◯◯') 마커가 들어간 문장이고, answer가 정답 조각,
// choices가 오답 3개다. 'cloze' 종류 덱이라 Lesson이 "문장 → 빈칸 고르기" 퀴즈를
// 쓴다. romaji/meaning은 정답을 채운 완성 문장 기준. note는 문법 포인트(카테고리).
import type { Kana } from './kana'

export const CLOZE_ROWS: Kana[][] = [
  // 조사 を — 목적어 표시
  [
    { kana: 'ごはん◯◯ たべます', romaji: 'gohan o tabemasu', meaning: '밥을 먹습니다', note: '조사 を (을/를)', answer: 'を', choices: ['に', 'で', 'と'] },
    { kana: 'ほん◯◯ よみます', romaji: 'hon o yomimasu', meaning: '책을 읽습니다', note: '조사 を (을/를)', answer: 'を', choices: ['が', 'に', 'へ'] },
    { kana: 'みず◯◯ のみます', romaji: 'mizu o nomimasu', meaning: '물을 마십니다', note: '조사 を (을/를)', answer: 'を', choices: ['は', 'で', 'から'] },
    { kana: 'えいが◯◯ みます', romaji: 'eiga o mimasu', meaning: '영화를 봅니다', note: '조사 を (을/를)', answer: 'を', choices: ['が', 'に', 'も'] },
    { kana: 'てがみ◯◯ かきます', romaji: 'tegami o kakimasu', meaning: '편지를 씁니다', note: '조사 を (을/를)', answer: 'を', choices: ['へ', 'で', 'と'] },
  ],
  // 조사 に — 시간·도착점·상대
  [
    { kana: 'がっこう◯◯ いきます', romaji: 'gakkou ni ikimasu', meaning: '학교에 갑니다', note: '조사 に (에)', answer: 'に', choices: ['を', 'で', 'から'] },
    { kana: 'しちじ◯◯ おきます', romaji: 'shichiji ni okimasu', meaning: '7시에 일어납니다', note: '조사 に (에)', answer: 'に', choices: ['を', 'で', 'と'] },
    { kana: 'いす◯◯ すわります', romaji: 'isu ni suwarimasu', meaning: '의자에 앉습니다', note: '조사 に (에)', answer: 'に', choices: ['を', 'で', 'から'] },
    { kana: 'ともだち◯◯ あいます', romaji: 'tomodachi ni aimasu', meaning: '친구를 만납니다', note: '조사 に (에)', answer: 'に', choices: ['を', 'で', 'が'] },
    { kana: 'うち◯◯ かえります', romaji: 'uchi ni kaerimasu', meaning: '집에 돌아갑니다', note: '조사 に (에)', answer: 'に', choices: ['を', 'で', 'まで'] },
  ],
  // 조사 で — 수단·장소
  [
    { kana: 'でんしゃ◯◯ いきます', romaji: 'densha de ikimasu', meaning: '전철로 갑니다', note: '조사 で (로/에서)', answer: 'で', choices: ['に', 'を', 'へ'] },
    { kana: 'としょかん◯◯ べんきょうします', romaji: 'toshokan de benkyou shimasu', meaning: '도서관에서 공부합니다', note: '조사 で (로/에서)', answer: 'で', choices: ['に', 'を', 'から'] },
    { kana: 'はし◯◯ たべます', romaji: 'hashi de tabemasu', meaning: '젓가락으로 먹습니다', note: '조사 で (로/에서)', answer: 'で', choices: ['を', 'に', 'と'] },
    { kana: 'にほんご◯◯ はなします', romaji: 'nihongo de hanashimasu', meaning: '일본어로 이야기합니다', note: '조사 で (로/에서)', answer: 'で', choices: ['を', 'に', 'が'] },
    { kana: 'ペン◯◯ かきます', romaji: 'pen de kakimasu', meaning: '펜으로 씁니다', note: '조사 で (로/에서)', answer: 'で', choices: ['を', 'に', 'へ'] },
  ],
  // 조사 へ / から / まで — 방향·범위
  [
    { kana: 'とうきょう◯◯ いきます', romaji: 'toukyou e ikimasu', meaning: '도쿄로 갑니다', note: '조사 へ·から·まで', answer: 'へ', choices: ['で', 'を', 'まで'] },
    { kana: 'くじ◯◯ はたらきます', romaji: 'kuji kara hatarakimasu', meaning: '9시부터 일합니다', note: '조사 へ·から·まで', answer: 'から', choices: ['まで', 'に', 'で'] },
    { kana: 'えき◯◯ あるきます', romaji: 'eki made arukimasu', meaning: '역까지 걷습니다', note: '조사 へ·から·まで', answer: 'まで', choices: ['から', 'に', 'へ'] },
    { kana: 'かいしゃ◯◯ ちかいです', romaji: 'kaisha kara chikai desu', meaning: '회사에서 가깝습니다', note: '조사 へ·から·まで', answer: 'から', choices: ['まで', 'を', 'に'] },
    { kana: 'くうこう◯◯ バスで いきます', romaji: 'kuukou made basu de ikimasu', meaning: '공항까지 버스로 갑니다', note: '조사 へ·から·まで', answer: 'まで', choices: ['から', 'へ', 'を'] },
  ],
  // 조사 は / も / と — 주제·또한·과
  [
    { kana: 'わたし◯◯ がくせいです', romaji: 'watashi wa gakusei desu', meaning: '저는 학생입니다', note: '조사 は·も·と', answer: 'は', choices: ['が', 'を', 'に'] },
    { kana: 'これ◯◯ ほんです', romaji: 'kore wa hon desu', meaning: '이것은 책입니다', note: '조사 は·も·と', answer: 'は', choices: ['も', 'を', 'で'] },
    { kana: 'かれ◯◯ いきます', romaji: 'kare mo ikimasu', meaning: '그도 갑니다', note: '조사 は·も·と', answer: 'も', choices: ['は', 'を', 'に'] },
    { kana: 'ともだち◯◯ いきます', romaji: 'tomodachi to ikimasu', meaning: '친구와 갑니다', note: '조사 は·も·と', answer: 'と', choices: ['に', 'を', 'も'] },
    { kana: 'パン◯◯ たまごを たべます', romaji: 'pan to tamago o tabemasu', meaning: '빵과 계란을 먹습니다', note: '조사 は·も·と', answer: 'と', choices: ['も', 'を', 'に'] },
  ],
  // 동사 활용 — て형(부탁)·과거·미래
  [
    { kana: 'ドアを ◯◯ ください', romaji: 'doa o akete kudasai', meaning: '문을 열어 주세요', note: '동사 활용', answer: 'あけて', choices: ['あけます', 'あけた', 'あけない'] },
    { kana: 'なまえを ◯◯ ください', romaji: 'namae o kaite kudasai', meaning: '이름을 써 주세요', note: '동사 활용', answer: 'かいて', choices: ['かきます', 'かいた', 'かかない'] },
    { kana: 'ちょっと ◯◯ ください', romaji: 'chotto matte kudasai', meaning: '잠깐 기다려 주세요', note: '동사 활용', answer: 'まって', choices: ['まちます', 'まった', 'またない'] },
    { kana: 'きのう ともだちに ◯◯', romaji: 'kinou tomodachi ni aimashita', meaning: '어제 친구를 만났습니다', note: '동사 활용', answer: 'あいました', choices: ['あいます', 'あって', 'あわない'] },
    { kana: 'あした がっこうへ ◯◯', romaji: 'ashita gakkou e ikimasu', meaning: '내일 학교에 갑니다', note: '동사 활용', answer: 'いきます', choices: ['いって', 'いった', 'いかない'] },
  ],
  // 정중체 — 부정·과거 ます/ません/ました
  [
    { kana: 'きょうは がっこうへ ◯◯', romaji: 'kyou wa gakkou e ikimasen', meaning: '오늘은 학교에 안 갑니다', note: '정중체 (ます/ません)', answer: 'いきません', choices: ['いきます', 'いきました', 'いって'] },
    { kana: 'まいあさ コーヒーを ◯◯', romaji: 'maiasa koohii o nomimasu', meaning: '매일 아침 커피를 마십니다', note: '정중체 (ます/ません)', answer: 'のみます', choices: ['のみません', 'のんで', 'のみました'] },
    { kana: 'せんしゅう えいがを ◯◯', romaji: 'senshuu eiga o mimashita', meaning: '지난주 영화를 봤습니다', note: '정중체 (ます/ません)', answer: 'みました', choices: ['みます', 'みません', 'みて'] },
    { kana: 'おさけは ◯◯', romaji: 'osake wa nomimasen', meaning: '술은 안 마십니다', note: '정중체 (ます/ません)', answer: 'のみません', choices: ['のみます', 'のんで', 'のみました'] },
    { kana: 'きのうは あめが ◯◯', romaji: 'kinou wa ame ga furimashita', meaning: '어제는 비가 내렸습니다', note: '정중체 (ます/ません)', answer: 'ふりました', choices: ['ふります', 'ふりません', 'ふって'] },
  ],
  // 형용사 활용 — い형용사 현재·과거·부정
  [
    { kana: 'にほんごは ◯◯ です', romaji: 'nihongo wa muzukashii desu', meaning: '일본어는 어렵습니다', note: '형용사 활용', answer: 'むずかしい', choices: ['むずかしく', 'むずかしくて', 'むずかしの'] },
    { kana: 'きのうは ◯◯ です', romaji: 'kinou wa samukatta desu', meaning: '어제는 추웠습니다', note: '형용사 활용', answer: 'さむかった', choices: ['さむい', 'さむくて', 'さむくない'] },
    { kana: 'この ほんは ◯◯ ないです', romaji: 'kono hon wa omoshiroku nai desu', meaning: '이 책은 재미없습니다', note: '형용사 활용', answer: 'おもしろく', choices: ['おもしろい', 'おもしろくて', 'おもしろかった'] },
    { kana: 'この りょうりは ◯◯ です', romaji: 'kono ryouri wa oishii desu', meaning: '이 요리는 맛있습니다', note: '형용사 활용', answer: 'おいしい', choices: ['おいしく', 'おいしくて', 'おいしかった'] },
    { kana: 'へやが ◯◯ なりました', romaji: 'heya ga hiroku narimashita', meaning: '방이 넓어졌습니다', note: '형용사 활용', answer: 'ひろく', choices: ['ひろい', 'ひろくて', 'ひろかった'] },
  ],
  // 조사 が — 주어·대상(좋아함/잘함/원함)
  [
    { kana: 'にわに ねこ◯◯ います', romaji: 'niwa ni neko ga imasu', meaning: '마당에 고양이가 있습니다', note: '조사 が', answer: 'が', choices: ['を', 'は', 'に'] },
    { kana: 'わたしは すし◯◯ すきです', romaji: 'watashi wa sushi ga suki desu', meaning: '저는 초밥을 좋아합니다', note: '조사 が', answer: 'が', choices: ['を', 'に', 'へ'] },
    { kana: 'にほんご◯◯ じょうずです', romaji: 'nihongo ga jouzu desu', meaning: '일본어를 잘합니다', note: '조사 が', answer: 'が', choices: ['を', 'は', 'で'] },
    { kana: 'あたらしい くるま◯◯ ほしいです', romaji: 'atarashii kuruma ga hoshii desu', meaning: '새 차를 갖고 싶습니다', note: '조사 が', answer: 'が', choices: ['を', 'に', 'も'] },
    { kana: 'おかね◯◯ ありません', romaji: 'okane ga arimasen', meaning: '돈이 없습니다', note: '조사 が', answer: 'が', choices: ['を', 'は', 'で'] },
  ],
  // 조사 の — 소유·명사 연결
  [
    { kana: 'これは わたし◯◯ ほんです', romaji: 'kore wa watashi no hon desu', meaning: '이것은 제 책입니다', note: '조사 の', answer: 'の', choices: ['は', 'を', 'が'] },
    { kana: 'にほんご◯◯ せんせいです', romaji: 'nihongo no sensei desu', meaning: '일본어 선생님입니다', note: '조사 の', answer: 'の', choices: ['を', 'に', 'で'] },
    { kana: 'つくえの うえ◯◯ ほんが あります', romaji: 'tsukue no ue ni hon ga arimasu', meaning: '책상 위에 책이 있습니다', note: '조사 の', answer: 'に', choices: ['の', 'を', 'が'] },
    { kana: 'これは だれ◯◯ かさですか', romaji: 'kore wa dare no kasa desu ka', meaning: '이것은 누구의 우산입니까', note: '조사 の', answer: 'の', choices: ['が', 'を', 'は'] },
    { kana: 'くるま◯◯ かぎを なくしました', romaji: 'kuruma no kagi o nakushimashita', meaning: '자동차 열쇠를 잃어버렸습니다', note: '조사 の', answer: 'の', choices: ['を', 'に', 'で'] },
  ],
  // 종조사 — か·ね·よ·や
  [
    { kana: 'これは いくらです◯◯', romaji: 'kore wa ikura desu ka', meaning: '이것은 얼마입니까', note: '종조사 (か·ね·よ)', answer: 'か', choices: ['ね', 'よ', 'の'] },
    { kana: 'いい てんき です◯◯', romaji: 'ii tenki desu ne', meaning: '날씨가 좋네요', note: '종조사 (か·ね·よ)', answer: 'ね', choices: ['か', 'よ', 'の'] },
    { kana: 'この えいがは おもしろいです◯◯', romaji: 'kono eiga wa omoshiroi desu yo', meaning: '이 영화는 재미있어요', note: '종조사 (か·ね·よ)', answer: 'よ', choices: ['か', 'ね', 'を'] },
    { kana: 'パン◯◯ たまごを かいます', romaji: 'pan ya tamago o kaimasu', meaning: '빵이랑 계란 등을 삽니다', note: '종조사 (か·ね·よ)', answer: 'や', choices: ['か', 'ね', 'よ'] },
    { kana: 'コーヒー◯◯ こうちゃ、どちらが いいですか', romaji: 'koohii ka koucha, dochira ga ii desu ka', meaning: '커피랑 홍차, 어느 쪽이 좋습니까', note: '종조사 (か·ね·よ)', answer: 'か', choices: ['ね', 'よ', 'の'] },
  ],
  // な형용사 활용 — 현재·과거·연결
  [
    { kana: 'ここは ◯◯ です', romaji: 'koko wa shizuka desu', meaning: '여기는 조용합니다', note: 'な형용사 활용', answer: 'しずか', choices: ['しずかな', 'しずかで', 'しずかだった'] },
    { kana: 'まちは ◯◯ でした', romaji: 'machi wa nigiyaka deshita', meaning: '거리는 번화했습니다', note: 'な형용사 활용', answer: 'にぎやか', choices: ['にぎやかな', 'にぎやかで', 'にぎやかに'] },
    { kana: '◯◯ まちが すきです', romaji: 'kirei na machi ga suki desu', meaning: '깨끗한 거리를 좋아합니다', note: 'な형용사 활용', answer: 'きれいな', choices: ['きれい', 'きれいで', 'きれいに'] },
    { kana: 'へやを ◯◯ しました', romaji: 'heya o kirei ni shimashita', meaning: '방을 깨끗하게 했습니다', note: 'な형용사 활용', answer: 'きれいに', choices: ['きれい', 'きれいな', 'きれいで'] },
    { kana: 'この みせは ◯◯ ありません', romaji: 'kono mise wa yuumei dewa arimasen', meaning: '이 가게는 유명하지 않습니다', note: 'な형용사 활용', answer: 'ゆうめいでは', choices: ['ゆうめい', 'ゆうめいな', 'ゆうめいで'] },
  ],
  // 동사 ない형 — 부정·금지·의무
  [
    { kana: 'ここで しゃしんを ◯◯ ください', romaji: 'koko de shashin o toranaide kudasai', meaning: '여기서 사진을 찍지 마세요', note: '동사 ない형', answer: 'とらないで', choices: ['とって', 'とります', 'とった'] },
    { kana: 'あした ◯◯ ければ なりません', romaji: 'ashita hatarakanakereba narimasen', meaning: '내일 일해야 합니다', note: '동사 ない형', answer: 'はたらかな', choices: ['はたらき', 'はたらいて', 'はたらく'] },
    { kana: 'くすりを ◯◯ ても いいです', romaji: 'kusuri o nomanakute mo ii desu', meaning: '약을 안 먹어도 됩니다', note: '동사 ない형', answer: 'のまなく', choices: ['のんで', 'のみ', 'のまない'] },
    { kana: 'まだ なにも ◯◯', romaji: 'mada nani mo tabenai', meaning: '아직 아무것도 안 먹는다', note: '동사 ない형', answer: 'たべない', choices: ['たべる', 'たべて', 'たべた'] },
    { kana: 'しんぱい ◯◯ で ください', romaji: 'shinpai shinaide kudasai', meaning: '걱정하지 마세요', note: '동사 ない형', answer: 'しない', choices: ['します', 'して', 'した'] },
  ],
  // ～たい·ほしい — 희망 표현
  [
    { kana: 'みずが ◯◯ です', romaji: 'mizu ga nomitai desu', meaning: '물이 마시고 싶습니다', note: '희망 (～たい)', answer: 'のみたい', choices: ['のみます', 'のんで', 'のむ'] },
    { kana: 'にほんへ ◯◯ です', romaji: 'nihon e ikitai desu', meaning: '일본에 가고 싶습니다', note: '희망 (～たい)', answer: 'いきたい', choices: ['いきます', 'いって', 'いく'] },
    { kana: 'なにも ◯◯ ないです', romaji: 'nani mo kaitaku nai desu', meaning: '아무것도 사고 싶지 않습니다', note: '희망 (～たい)', answer: 'かいたく', choices: ['かいたい', 'かって', 'かいます'] },
    { kana: 'あたらしい かばんが ◯◯ です', romaji: 'atarashii kaban ga hoshii desu', meaning: '새 가방을 갖고 싶습니다', note: '희망 (～たい)', answer: 'ほしい', choices: ['ほしく', 'ほしくて', 'ほしかった'] },
    { kana: 'きゅうけいが ◯◯ です', romaji: 'kyuukei ga shitai desu', meaning: '휴식을 하고 싶습니다', note: '희망 (～たい)', answer: 'したい', choices: ['します', 'して', 'する'] },
  ],
  // 권유·제안 — ～ましょう / ～ませんか
  [
    { kana: 'いっしょに ひるごはんを ◯◯', romaji: 'issho ni hirugohan o tabemasenka', meaning: '같이 점심 먹지 않을래요', note: '권유 (～ましょう/ませんか)', answer: 'たべませんか', choices: ['たべます', 'たべました', 'たべて'] },
    { kana: 'そろそろ ◯◯', romaji: 'sorosoro ikimashou', meaning: '슬슬 갑시다', note: '권유 (～ましょう/ませんか)', answer: 'いきましょう', choices: ['いきます', 'いきました', 'いって'] },
    { kana: 'ちょっと ◯◯', romaji: 'chotto yasumimashou', meaning: '잠깐 쉽시다', note: '권유 (～ましょう/ませんか)', answer: 'やすみましょう', choices: ['やすみます', 'やすんで', 'やすみました'] },
    { kana: 'えいがを ◯◯', romaji: 'eiga o mimasenka', meaning: '영화를 보지 않을래요', note: '권유 (～ましょう/ませんか)', answer: 'みませんか', choices: ['みます', 'みました', 'みて'] },
    { kana: 'コーヒーでも ◯◯', romaji: 'koohii demo nomimasenka', meaning: '커피라도 마시지 않을래요', note: '권유 (～ましょう/ませんか)', answer: 'のみませんか', choices: ['のみます', 'のんで', 'のみました'] },
  ],
  // 진행·상태 — ～ています
  [
    { kana: 'いま ごはんを ◯◯ います', romaji: 'ima gohan o tabete imasu', meaning: '지금 밥을 먹고 있습니다', note: '진행·상태 (～ています)', answer: 'たべて', choices: ['たべ', 'たべた', 'たべない'] },
    { kana: 'あめが ◯◯ います', romaji: 'ame ga futte imasu', meaning: '비가 내리고 있습니다', note: '진행·상태 (～ています)', answer: 'ふって', choices: ['ふり', 'ふった', 'ふらない'] },
    { kana: 'ちちは ぎんこうで ◯◯ います', romaji: 'chichi wa ginkou de hataraite imasu', meaning: '아버지는 은행에서 일하고 있습니다', note: '진행·상태 (～ています)', answer: 'はたらいて', choices: ['はたらき', 'はたらいた', 'はたらく'] },
    { kana: 'まどが ◯◯ います', romaji: 'mado ga aite imasu', meaning: '창문이 열려 있습니다', note: '진행·상태 (～ています)', answer: 'あいて', choices: ['あき', 'あいた', 'あかない'] },
    { kana: 'なにを ◯◯ いますか', romaji: 'nani o shite imasu ka', meaning: '무엇을 하고 있습니까', note: '진행·상태 (～ています)', answer: 'して', choices: ['し', 'した', 'しない'] },
  ],
  // 허가·금지 — ～てもいい / ～てはいけない
  [
    { kana: 'ここで しゃしんを ◯◯ いいですか', romaji: 'koko de shashin o totte mo ii desu ka', meaning: '여기서 사진을 찍어도 됩니까', note: '허가·금지 (～てもいい)', answer: 'とっても', choices: ['とって', 'とります', 'とった'] },
    { kana: 'この みずを ◯◯ いいです', romaji: 'kono mizu o nonde mo ii desu', meaning: '이 물을 마셔도 됩니다', note: '허가·금지 (～てもいい)', answer: 'のんでも', choices: ['のんで', 'のみます', 'のんだ'] },
    { kana: 'ここに ◯◯ いけません', romaji: 'koko ni haitte wa ikemasen', meaning: '여기에 들어가면 안 됩니다', note: '허가·금지 (～てもいい)', answer: 'はいっては', choices: ['はいって', 'はいります', 'はいった'] },
    { kana: 'たばこを ◯◯ いけません', romaji: 'tabako o sutte wa ikemasen', meaning: '담배를 피우면 안 됩니다', note: '허가·금지 (～てもいい)', answer: 'すっては', choices: ['すって', 'すいます', 'すった'] },
    { kana: 'もう ◯◯ いいですよ', romaji: 'mou kaette mo ii desu yo', meaning: '이제 돌아가도 됩니다', note: '허가·금지 (～てもいい)', answer: 'かえっても', choices: ['かえって', 'かえります', 'かえった'] },
  ],
  // 이유 — ～から / ～ので
  [
    { kana: 'さむい ◯◯ まどを しめます', romaji: 'samui kara mado o shimemasu', meaning: '추워서 창문을 닫습니다', note: '이유 (～から/ので)', answer: 'から', choices: ['ので', 'のに', 'まで'] },
    { kana: 'びょうき ◯◯ やすみました', romaji: 'byouki na node yasumimashita', meaning: '아파서 쉬었습니다', note: '이유 (～から/ので)', answer: 'なので', choices: ['だから', 'から', 'ので'] },
    { kana: 'じかんが ない ◯◯ いそぎます', romaji: 'jikan ga nai node isogimasu', meaning: '시간이 없어서 서두릅니다', note: '이유 (～から/ので)', answer: 'ので', choices: ['から', 'のに', 'まで'] },
    { kana: 'やすい ◯◯ たくさん かいました', romaji: 'yasui kara takusan kaimashita', meaning: '싸서 많이 샀습니다', note: '이유 (～から/ので)', answer: 'から', choices: ['ので', 'のに', 'まで'] },
    { kana: 'あめ ◯◯ しあいは ちゅうしです', romaji: 'ame na node shiai wa chuushi desu', meaning: '비라서 시합은 중지입니다', note: '이유 (～から/ので)', answer: 'なので', choices: ['だから', 'から', 'ので'] },
  ],
  // 시간 절 — まえに / あとで / とき
  [
    { kana: 'ねる ◯◯ はを みがきます', romaji: 'neru mae ni ha o migakimasu', meaning: '자기 전에 이를 닦습니다', note: '시간 절 (まえに/あとで/とき)', answer: 'まえに', choices: ['あとで', 'とき', 'まで'] },
    { kana: 'しごとの ◯◯ のみに いきます', romaji: 'shigoto no ato de nomi ni ikimasu', meaning: '일 후에 마시러 갑니다', note: '시간 절 (まえに/あとで/とき)', answer: 'あとで', choices: ['まえに', 'とき', 'まで'] },
    { kana: 'こどもの ◯◯ ここに すんで いました', romaji: 'kodomo no toki koko ni sunde imashita', meaning: '어릴 때 여기 살았습니다', note: '시간 절 (まえに/あとで/とき)', answer: 'とき', choices: ['まえに', 'あとで', 'まで'] },
    { kana: 'しょくじの ◯◯ てを あらいます', romaji: 'shokuji no mae ni te o araimasu', meaning: '식사 전에 손을 씻습니다', note: '시간 절 (まえに/あとで/とき)', answer: 'まえに', choices: ['あとで', 'とき', 'まで'] },
    { kana: 'べんきょうした ◯◯ あそびます', romaji: 'benkyou shita ato de asobimasu', meaning: '공부한 후에 놉니다', note: '시간 절 (まえに/あとで/とき)', answer: 'あとで', choices: ['まえに', 'とき', 'まで'] },
  ],
  // 비교 — ～より / ～ほうが / いちばん
  [
    { kana: 'でんしゃは バス◯◯ はやいです', romaji: 'densha wa basu yori hayai desu', meaning: '전철은 버스보다 빠릅니다', note: '비교 (より/ほうが)', answer: 'より', choices: ['ほうが', 'のほう', 'まで'] },
    { kana: 'コーヒーの ◯◯ すきです', romaji: 'koohii no hou ga suki desu', meaning: '커피 쪽을 좋아합니다', note: '비교 (より/ほうが)', answer: 'ほうが', choices: ['より', 'まで', 'から'] },
    { kana: 'やさいの なかで トマトが ◯◯ すきです', romaji: 'yasai no naka de tomato ga ichiban suki desu', meaning: '채소 중에서 토마토를 가장 좋아합니다', note: '비교 (より/ほうが)', answer: 'いちばん', choices: ['もっと', 'より', 'ほうが'] },
    { kana: 'きょうは きのう◯◯ さむいです', romaji: 'kyou wa kinou yori samui desu', meaning: '오늘은 어제보다 춥습니다', note: '비교 (より/ほうが)', answer: 'より', choices: ['ほうが', 'まで', 'から'] },
    { kana: 'でんわより メールの ◯◯ べんりです', romaji: 'denwa yori meeru no hou ga benri desu', meaning: '전화보다 메일 쪽이 편리합니다', note: '비교 (より/ほうが)', answer: 'ほうが', choices: ['より', 'まで', 'から'] },
  ],
  // 조건·가정 — ～たら / ～と / ～ば
  [
    { kana: 'やすみに ◯◯ うみへ いきます', romaji: 'yasumi ni nattara umi e ikimasu', meaning: '휴가가 되면 바다에 갑니다', note: '조건 (たら/と/ば)', answer: 'なったら', choices: ['なると', 'なれば', 'なって'] },
    { kana: 'はるに ◯◯ さくらが さきます', romaji: 'haru ni naru to sakura ga sakimasu', meaning: '봄이 되면 벚꽃이 핍니다', note: '조건 (たら/と/ば)', answer: 'なると', choices: ['なったら', 'なれば', 'なって'] },
    { kana: 'やすけ◯◯ かいます', romaji: 'yasukereba kaimasu', meaning: '싸면 삽니다', note: '조건 (たら/と/ば)', answer: 'れば', choices: ['かったら', 'いと', 'くて'] },
    { kana: 'みぎに ◯◯ えきが あります', romaji: 'migi ni magaru to eki ga arimasu', meaning: '오른쪽으로 돌면 역이 있습니다', note: '조건 (たら/と/ば)', answer: 'まがると', choices: ['まがったら', 'まがれば', 'まがって'] },
    { kana: 'もし あめが ◯◯ いきません', romaji: 'moshi ame ga futtara ikimasen', meaning: '만약 비가 오면 안 갑니다', note: '조건 (たら/と/ば)', answer: 'ふったら', choices: ['ふると', 'ふれば', 'ふって'] },
  ],
  // 수수 동사 — あげる / もらう / くれる
  [
    { kana: 'ともだちに ほんを ◯◯', romaji: 'tomodachi ni hon o agemashita', meaning: '친구에게 책을 주었습니다', note: '수수 동사 (あげる/もらう/くれる)', answer: 'あげました', choices: ['もらいました', 'くれました', 'かりました'] },
    { kana: 'せんせいに じしょを ◯◯', romaji: 'sensei ni jisho o moraimashita', meaning: '선생님께 사전을 받았습니다', note: '수수 동사 (あげる/もらう/くれる)', answer: 'もらいました', choices: ['あげました', 'くれました', 'かしました'] },
    { kana: 'あには わたしに とけいを ◯◯', romaji: 'ani wa watashi ni tokei o kuremashita', meaning: '형이 나에게 시계를 주었습니다', note: '수수 동사 (あげる/もらう/くれる)', answer: 'くれました', choices: ['あげました', 'もらいました', 'かりました'] },
    { kana: 'はなに みずを ◯◯', romaji: 'hana ni mizu o agemashita', meaning: '꽃에 물을 주었습니다', note: '수수 동사 (あげる/もらう/くれる)', answer: 'あげました', choices: ['もらいました', 'くれました', 'かしました'] },
    { kana: 'ちちに おかねを ◯◯', romaji: 'chichi ni okane o moraimashita', meaning: '아버지께 돈을 받았습니다', note: '수수 동사 (あげる/もらう/くれる)', answer: 'もらいました', choices: ['あげました', 'くれました', 'かしました'] },
  ],
  // 가능형 — ～(ら)れる / できる
  [
    { kana: 'にほんごが ◯◯', romaji: 'nihongo ga hanasemasu', meaning: '일본어를 말할 수 있습니다', note: '가능형 (～れる/できる)', answer: 'はなせます', choices: ['はなします', 'はなして', 'はなした'] },
    { kana: 'かんじが ◯◯ ません', romaji: 'kanji ga yomemasen', meaning: '한자를 읽을 수 없습니다', note: '가능형 (～れる/できる)', answer: 'よめ', choices: ['よみ', 'よんで', 'よむ'] },
    { kana: 'あした ◯◯ ますか', romaji: 'ashita koraremasu ka', meaning: '내일 올 수 있습니까', note: '가능형 (～れる/できる)', answer: 'こられ', choices: ['きて', 'きます', 'くる'] },
    { kana: 'りょうりが ◯◯', romaji: 'ryouri ga dekimasu', meaning: '요리를 할 수 있습니다', note: '가능형 (～れる/できる)', answer: 'できます', choices: ['します', 'して', 'なります'] },
    { kana: 'さしみが ◯◯ ません', romaji: 'sashimi ga taberaremasen', meaning: '회를 먹을 수 없습니다', note: '가능형 (～れる/できる)', answer: 'たべられ', choices: ['たべ', 'たべて', 'たべる'] },
  ],
  // 추측 — ～でしょう / ～かもしれません
  [
    { kana: 'あした は はれる ◯◯', romaji: 'ashita wa hareru deshou', meaning: '내일은 맑겠지요', note: '추측 (でしょう/かもしれません)', answer: 'でしょう', choices: ['です', 'ました', 'ません'] },
    { kana: 'かれは こない ◯◯', romaji: 'kare wa konai kamoshiremasen', meaning: '그는 안 올지도 모릅니다', note: '추측 (でしょう/かもしれません)', answer: 'かもしれません', choices: ['でしょう', 'ました', 'ください'] },
    { kana: 'この もんだいは むずかしい ◯◯', romaji: 'kono mondai wa muzukashii deshou', meaning: '이 문제는 어렵겠지요', note: '추측 (でしょう/かもしれません)', answer: 'でしょう', choices: ['です', 'ました', 'ません'] },
    { kana: 'みちが こんで いる ◯◯', romaji: 'michi ga konde iru kamoshiremasen', meaning: '길이 막힐지도 모릅니다', note: '추측 (でしょう/かもしれません)', answer: 'かもしれません', choices: ['でしょう', 'ください', 'ました'] },
    { kana: 'あの ひとは せんせい ◯◯', romaji: 'ano hito wa sensei deshou', meaning: '저 사람은 선생님이겠지요', note: '추측 (でしょう/かもしれません)', answer: 'でしょう', choices: ['です', 'ました', 'ません'] },
  ],
  // 자·타동사 짝 — あく/あける·きまる/きめる
  [
    { kana: 'ドアが ◯◯', romaji: 'doa ga akimashita', meaning: '문이 열렸습니다', note: '자·타동사 짝', answer: 'あきました', choices: ['あけました', 'あけます', 'あいて'] },
    { kana: 'わたしが ドアを ◯◯', romaji: 'watashi ga doa o akemashita', meaning: '제가 문을 열었습니다', note: '자·타동사 짝', answer: 'あけました', choices: ['あきました', 'あきます', 'あいて'] },
    { kana: 'でんきが ◯◯', romaji: 'denki ga tsukimashita', meaning: '불이 켜졌습니다', note: '자·타동사 짝', answer: 'つきました', choices: ['つけました', 'つけます', 'つけて'] },
    { kana: 'よていが ◯◯', romaji: 'yotei ga kimarimashita', meaning: '예정이 정해졌습니다', note: '자·타동사 짝', answer: 'きまりました', choices: ['きめました', 'きめます', 'きめて'] },
    { kana: 'さいふが ◯◯', romaji: 'saifu ga ochimashita', meaning: '지갑이 떨어졌습니다', note: '자·타동사 짝', answer: 'おちました', choices: ['おとしました', 'おとします', 'おとして'] },
  ],
  // 양태 — ～そうです (보임)
  [
    { kana: 'この ケーキは ◯◯ そうです', romaji: 'kono keeki wa oishisou desu', meaning: '이 케이크는 맛있어 보입니다', note: '양태 (～そうです)', answer: 'おいし', choices: ['おいしい', 'おいしくて', 'おいしく'] },
    { kana: 'いまにも あめが ◯◯ そうです', romaji: 'imanimo ame ga furisou desu', meaning: '당장이라도 비가 올 것 같습니다', note: '양태 (～そうです)', answer: 'ふり', choices: ['ふる', 'ふって', 'ふった'] },
    { kana: 'この もんだいは ◯◯ そうです', romaji: 'kono mondai wa muzukashisou desu', meaning: '이 문제는 어려워 보입니다', note: '양태 (～そうです)', answer: 'むずかし', choices: ['むずかしい', 'むずかしく', 'むずかしくて'] },
    { kana: 'かれは げんき ◯◯ です', romaji: 'kare wa genki sou desu', meaning: '그는 건강해 보입니다', note: '양태 (～そうです)', answer: 'そう', choices: ['な', 'だ', 'に'] },
    { kana: 'ボタンが ◯◯ そうです', romaji: 'botan ga toresou desu', meaning: '단추가 떨어질 것 같습니다', note: '양태 (～そうです)', answer: 'とれ', choices: ['とれる', 'とれて', 'とれた'] },
  ],
  // 전문·추정 — ～ようです / ～らしい / ～そうだ(들음)
  [
    { kana: 'てんきよほうに よると あした あめ ◯◯ です', romaji: 'tenki yohou ni yoru to ashita ame da sou desu', meaning: '일기예보에 따르면 내일 비라고 합니다', note: '전문·추정 (ようだ/らしい/そうだ)', answer: 'だそう', choices: ['そう', 'よう', 'らしい'] },
    { kana: 'だれか きた ◯◯ です', romaji: 'dareka kita you desu', meaning: '누군가 온 것 같습니다', note: '전문·추정 (ようだ/らしい/そうだ)', answer: 'よう', choices: ['そう', 'らしい', 'みたい'] },
    { kana: 'かれは もう かえった ◯◯', romaji: 'kare wa mou kaetta rashii', meaning: '그는 이미 돌아간 모양입니다', note: '전문·추정 (ようだ/らしい/そうだ)', answer: 'らしい', choices: ['そう', 'よう', 'だろう'] },
    { kana: 'この みせは ゆうめい ◯◯ です', romaji: 'kono mise wa yuumei na you desu', meaning: '이 가게는 유명한 것 같습니다', note: '전문·추정 (ようだ/らしい/そうだ)', answer: 'なよう', choices: ['そう', 'だそう', 'らしく'] },
    { kana: 'にもつが おもい ◯◯ です', romaji: 'nimotsu ga omoi mitai desu', meaning: '짐이 무거운 것 같습니다', note: '전문·추정 (ようだ/らしい/そうだ)', answer: 'みたい', choices: ['そう', 'だそう', 'らしく'] },
  ],
  // 수동 — ～(ら)れる
  [
    { kana: 'せんせいに ◯◯', romaji: 'sensei ni homeraremashita', meaning: '선생님께 칭찬받았습니다', note: '수동 (～られる)', answer: 'ほめられました', choices: ['ほめました', 'ほめます', 'ほめて'] },
    { kana: 'あめに ◯◯', romaji: 'ame ni furaremashita', meaning: '비를 맞았습니다', note: '수동 (～られる)', answer: 'ふられました', choices: ['ふりました', 'ふります', 'ふって'] },
    { kana: 'ともだちに わらわ ◯◯', romaji: 'tomodachi ni warawaremashita', meaning: '친구에게 비웃음당했습니다', note: '수동 (～られる)', answer: 'れました', choices: ['いました', 'います', 'って'] },
    { kana: 'この ビルは きょねん ◯◯', romaji: 'kono biru wa kyonen tateraremashita', meaning: '이 빌딩은 작년에 지어졌습니다', note: '수동 (～られる)', answer: 'たてられました', choices: ['たてました', 'たてます', 'たてて'] },
    { kana: 'でんしゃで あしを ◯◯', romaji: 'densha de ashi o fumaremashita', meaning: '전철에서 발을 밟혔습니다', note: '수동 (～られる)', answer: 'ふまれました', choices: ['ふみました', 'ふみます', 'ふんで'] },
  ],
  // 사역 — ～(さ)せる
  [
    { kana: 'こどもに やさいを ◯◯', romaji: 'kodomo ni yasai o tabesasemashita', meaning: '아이에게 채소를 먹게 했습니다', note: '사역 (～させる)', answer: 'たべさせました', choices: ['たべました', 'たべられました', 'たべて'] },
    { kana: 'がくせいを ◯◯', romaji: 'gakusei o matasemashita', meaning: '학생을 기다리게 했습니다', note: '사역 (～させる)', answer: 'またせました', choices: ['まちました', 'またれました', 'まって'] },
    { kana: 'むすこに へやを そうじ ◯◯', romaji: 'musuko ni heya o souji sasemashita', meaning: '아들에게 방을 청소시켰습니다', note: '사역 (～させる)', answer: 'させました', choices: ['しました', 'されました', 'して'] },
    { kana: 'せんせいは がくせいに ほんを ◯◯', romaji: 'sensei wa gakusei ni hon o yomasemashita', meaning: '선생님은 학생에게 책을 읽게 했습니다', note: '사역 (～させる)', answer: 'よませました', choices: ['よみました', 'よまれました', 'よんで'] },
    { kana: 'ちょっと ◯◯ ください', romaji: 'chotto kangaesasete kudasai', meaning: '잠깐 생각하게 해 주세요', note: '사역 (～させる)', answer: 'かんがえさせて', choices: ['かんがえて', 'かんがえられて', 'かんがえます'] },
  ],
  // 의무·당위 — ～なければ / ～べき / ～はず
  [
    { kana: 'やくそくは まもら ◯◯ なりません', romaji: 'yakusoku wa mamoranakereba narimasen', meaning: '약속은 지켜야 합니다', note: '의무·당위 (なければ/べき/はず)', answer: 'なければ', choices: ['なくて', 'ないと', 'なくても'] },
    { kana: 'がくせいは べんきょうする ◯◯ です', romaji: 'gakusei wa benkyou suru beki desu', meaning: '학생은 공부해야 합니다', note: '의무·당위 (なければ/べき/はず)', answer: 'べき', choices: ['はず', 'よう', 'そう'] },
    { kana: 'かれは もう つく ◯◯ です', romaji: 'kare wa mou tsuku hazu desu', meaning: '그는 이미 도착했을 겁니다', note: '의무·당위 (なければ/べき/はず)', answer: 'はず', choices: ['べき', 'よう', 'そう'] },
    { kana: 'はやく ◯◯ と まにあいません', romaji: 'hayaku ikanai to maniaimasen', meaning: '빨리 가지 않으면 늦습니다', note: '의무·당위 (なければ/べき/はず)', answer: 'いかない', choices: ['いく', 'いって', 'いった'] },
    { kana: 'こたえは これで いい ◯◯ です', romaji: 'kotae wa kore de ii hazu desu', meaning: '답은 이것으로 맞을 겁니다', note: '의무·당위 (なければ/べき/はず)', answer: 'はず', choices: ['べき', 'よう', 'そう'] },
  ],
  // 목적 — ～ために / ～ように
  [
    { kana: 'にほんで はたらく ◯◯ にほんごを べんきょうします', romaji: 'nihon de hataraku tame ni nihongo o benkyou shimasu', meaning: '일본에서 일하기 위해 일본어를 공부합니다', note: '목적 (ために/ように)', answer: 'ために', choices: ['ように', 'ので', 'のに'] },
    { kana: 'わすれない ◯◯ メモします', romaji: 'wasurenai you ni memo shimasu', meaning: '잊지 않도록 메모합니다', note: '목적 (ために/ように)', answer: 'ように', choices: ['ために', 'ので', 'から'] },
    { kana: 'けんこうの ◯◯ まいにち あるきます', romaji: 'kenkou no tame ni mainichi arukimasu', meaning: '건강을 위해 매일 걷습니다', note: '목적 (ために/ように)', answer: 'ために', choices: ['ように', 'ので', 'のに'] },
    { kana: 'みんなが きこえる ◯◯ おおきな こえで はなします', romaji: 'minna ga kikoeru you ni ookina koe de hanashimasu', meaning: '모두가 들리도록 큰 소리로 말합니다', note: '목적 (ために/ように)', answer: 'ように', choices: ['ために', 'ので', 'から'] },
    { kana: 'にほんごが はなせる ◯◯ なりました', romaji: 'nihongo ga hanaseru you ni narimashita', meaning: '일본어를 말할 수 있게 되었습니다', note: '목적 (ために/ように)', answer: 'ように', choices: ['ために', 'ので', 'こと'] },
  ],
  // 경험·열거 — ～たことがある / ～たり
  [
    { kana: 'にほんへ いった ◯◯ あります', romaji: 'nihon e itta koto ga arimasu', meaning: '일본에 간 적이 있습니다', note: '경험·열거 (たことがある/たり)', answer: 'ことが', choices: ['ように', 'ために', 'はずが'] },
    { kana: 'すしを たべた ◯◯ ありません', romaji: 'sushi o tabeta koto ga arimasen', meaning: '초밥을 먹은 적이 없습니다', note: '경험·열거 (たことがある/たり)', answer: 'ことが', choices: ['ように', 'ために', 'はずが'] },
    { kana: 'にちようびは ほんを よん ◯◯ ねたり します', romaji: 'nichiyoubi wa hon o yondari netari shimasu', meaning: '일요일은 책을 읽거나 자거나 합니다', note: '경험·열거 (たことがある/たり)', answer: 'だり', choices: ['でから', 'では', 'でも'] },
    { kana: 'やすみは そうじを し ◯◯ せんたくを したり します', romaji: 'yasumi wa souji o shitari sentaku o shitari shimasu', meaning: '쉬는 날은 청소하거나 빨래하거나 합니다', note: '경험·열거 (たことがある/たり)', answer: 'たり', choices: ['てから', 'ては', 'ても'] },
    { kana: 'ふじさんに のぼった ◯◯ あります', romaji: 'fujisan ni nobotta koto ga arimasu', meaning: '후지산에 오른 적이 있습니다', note: '경험·열거 (たことがある/たり)', answer: 'ことが', choices: ['ように', 'ために', 'はずが'] },
  ],
  // 정도·기준 — ～ながら / ～すぎる / ～ほど
  [
    { kana: 'おんがくを ◯◯ べんきょうします', romaji: 'ongaku o kikinagara benkyou shimasu', meaning: '음악을 들으면서 공부합니다', note: '정도·기준 (ながら/すぎる/ほど)', answer: 'ききながら', choices: ['きいて', 'ききます', 'きいた'] },
    { kana: 'たべ ◯◯ おなかが いたいです', romaji: 'tabesugite onaka ga itai desu', meaning: '너무 많이 먹어서 배가 아픕니다', note: '정도·기준 (ながら/すぎる/ほど)', answer: 'すぎて', choices: ['ながら', 'たり', 'ても'] },
    { kana: 'この もんだいは こども ◯◯ かんたんです', romaji: 'kono mondai wa kodomo demo dekiru hodo kantan desu', meaning: '이 문제는 아이도 풀 만큼 쉽습니다', note: '정도·기준 (ながら/すぎる/ほど)', answer: 'でもできるほど', choices: ['でもできるまで', 'でもできるから', 'でもできるので'] },
    { kana: 'テレビを み ◯◯ ごはんを たべます', romaji: 'terebi o minagara gohan o tabemasu', meaning: 'TV를 보면서 밥을 먹습니다', note: '정도·기준 (ながら/すぎる/ほど)', answer: 'ながら', choices: ['すぎて', 'たり', 'ても'] },
    { kana: 'この くつは ちいさ ◯◯ ます', romaji: 'kono kutsu wa chiisasugimasu', meaning: '이 신발은 너무 작습니다', note: '정도·기준 (ながら/すぎる/ほど)', answer: 'すぎ', choices: ['ながら', 'たり', 'ても'] },
  ],
  // 역접 — ～のに / ～ても / ～けれども
  [
    { kana: 'べんきょうした ◯◯ てんが わるかったです', romaji: 'benkyou shita noni ten ga warukatta desu', meaning: '공부했는데 점수가 나빴습니다', note: '역접 (のに/ても/けれども)', answer: 'のに', choices: ['ので', 'から', 'なら'] },
    { kana: 'あめが ふって ◯◯ いきます', romaji: 'ame ga futte mo ikimasu', meaning: '비가 와도 갑니다', note: '역접 (のに/ても/けれども)', answer: 'も', choices: ['から', 'ので', 'のに'] },
    { kana: 'たかい ◯◯ あまり よくないです', romaji: 'takai keredomo amari yokunai desu', meaning: '비싸지만 별로 좋지 않습니다', note: '역접 (のに/ても/けれども)', answer: 'けれども', choices: ['ので', 'から', 'なら'] },
    { kana: 'くすりを のんだ ◯◯ なおりません', romaji: 'kusuri o nonda noni naorimasen', meaning: '약을 먹었는데 낫지 않습니다', note: '역접 (のに/ても/けれども)', answer: 'のに', choices: ['ので', 'から', 'なら'] },
    { kana: 'いくら さがして ◯◯ みつかりません', romaji: 'ikura sagashite mo mitsukarimasen', meaning: '아무리 찾아도 발견되지 않습니다', note: '역접 (のに/ても/けれども)', answer: 'も', choices: ['から', 'ので', 'のに'] },
  ],
  // 조건 가정 — ～なら / ～ば～ほど
  [
    { kana: 'にほんへ いく ◯◯ きょうとが いいです', romaji: 'nihon e iku nara kyouto ga ii desu', meaning: '일본에 간다면 교토가 좋습니다', note: '조건 가정 (なら/ば～ほど)', answer: 'なら', choices: ['たら', 'と', 'ば'] },
    { kana: 'やすい ◯◯ かいたいです', romaji: 'yasui nara kaitai desu', meaning: '싸다면 사고 싶습니다', note: '조건 가정 (なら/ば～ほど)', answer: 'なら', choices: ['たら', 'と', 'ば'] },
    { kana: 'れんしゅうすれ ◯◯ するほど じょうずに なります', romaji: 'renshuu sureba suru hodo jouzu ni narimasu', meaning: '연습하면 할수록 능숙해집니다', note: '조건 가정 (なら/ば～ほど)', answer: 'ば', choices: ['たら', 'と', 'なら'] },
    { kana: 'たべもの ◯◯ にほんりょうりが すきです', romaji: 'tabemono nara nihon ryouri ga suki desu', meaning: '음식이라면 일본 요리를 좋아합니다', note: '조건 가정 (なら/ば～ほど)', answer: 'なら', choices: ['たら', 'と', 'ば'] },
    { kana: 'よめ ◯◯ よむほど おもしろいです', romaji: 'yomeba yomu hodo omoshiroi desu', meaning: '읽으면 읽을수록 재미있습니다', note: '조건 가정 (なら/ば～ほど)', answer: 'ば', choices: ['たら', 'と', 'なら'] },
  ],
  // 명사 수식·명사화 — ～の / ～こと
  [
    { kana: 'えを かく ◯◯ が すきです', romaji: 'e o kaku no ga suki desu', meaning: '그림 그리는 것을 좋아합니다', note: '명사화 (の/こと)', answer: 'の', choices: ['こと', 'もの', 'ところ'] },
    { kana: 'わたしの しゅみは りょうりを する ◯◯ です', romaji: 'watashi no shumi wa ryouri o suru koto desu', meaning: '제 취미는 요리하는 것입니다', note: '명사화 (の/こと)', answer: 'こと', choices: ['の', 'もの', 'ところ'] },
    { kana: 'かれが くる ◯◯ を しって いますか', romaji: 'kare ga kuru no o shitte imasu ka', meaning: '그가 오는 것을 알고 있습니까', note: '명사화 (の/こと)', answer: 'の', choices: ['こと', 'もの', 'ほう'] },
    { kana: 'はやく おきる ◯◯ が たいせつです', romaji: 'hayaku okiru koto ga taisetsu desu', meaning: '일찍 일어나는 것이 중요합니다', note: '명사화 (の/こと)', answer: 'こと', choices: ['の', 'もの', 'ところ'] },
    { kana: 'いま ごはんを たべて いる ◯◯ です', romaji: 'ima gohan o tabete iru tokoro desu', meaning: '지금 막 밥을 먹고 있는 참입니다', note: '명사화 (の/こと)', answer: 'ところ', choices: ['こと', 'もの', 'の'] },
  ],
  // 경어 — 존경어·겸양어 빈칸
  [
    { kana: 'せんせいが ◯◯', romaji: 'sensei ga irasshaimasu', meaning: '선생님이 계십니다', note: '경어 (존경·겸양)', answer: 'いらっしゃいます', choices: ['います', 'おります', 'まいります'] },
    { kana: 'わたしが あした ◯◯', romaji: 'watashi ga ashita mairimasu', meaning: '제가 내일 가겠습니다', note: '경어 (존경·겸양)', answer: 'まいります', choices: ['いらっしゃいます', 'いきます', 'おいでです'] },
    { kana: 'しゃちょうは なんと ◯◯ ましたか', romaji: 'shachou wa nanto osshaimashita ka', meaning: '사장님은 뭐라고 말씀하셨습니까', note: '경어 (존경·겸양)', answer: 'おっしゃい', choices: ['もうし', 'いい', 'はなし'] },
    { kana: 'わたしが かばんを ◯◯ します', romaji: 'watashi ga kaban o omochi shimasu', meaning: '제가 가방을 들어 드리겠습니다', note: '경어 (존경·겸양)', answer: 'おもち', choices: ['おもた', 'もって', 'もち'] },
    { kana: 'どうぞ ◯◯ ください', romaji: 'douzo meshiagatte kudasai', meaning: '부디 드십시오', note: '경어 (존경·겸양)', answer: 'めしあがって', choices: ['いただいて', 'たべて', 'のんで'] },
  ],
  // 의문사 호응 — か / も / でも
  [
    { kana: 'だれ ◯◯ いません', romaji: 'dare mo imasen', meaning: '아무도 없습니다', note: '의문사 호응 (か/も/でも)', answer: 'も', choices: ['か', 'でも', 'が'] },
    { kana: 'なに ◯◯ たべたいです', romaji: 'nanika tabetai desu', meaning: '뭔가 먹고 싶습니다', note: '의문사 호응 (か/も/でも)', answer: 'か', choices: ['も', 'でも', 'が'] },
    { kana: 'いつ ◯◯ いいですよ', romaji: 'itsu demo ii desu yo', meaning: '언제든지 좋습니다', note: '의문사 호응 (か/も/でも)', answer: 'でも', choices: ['か', 'も', 'が'] },
    { kana: 'どこ ◯◯ いきませんでした', romaji: 'doko mo ikimasen deshita', meaning: '아무 데도 가지 않았습니다', note: '의문사 호응 (か/も/でも)', answer: 'も', choices: ['か', 'でも', 'へ'] },
    { kana: 'だれ ◯◯ できる かんたんな しごとです', romaji: 'dare demo dekiru kantan na shigoto desu', meaning: '누구나 할 수 있는 간단한 일입니다', note: '의문사 호응 (か/も/でも)', answer: 'でも', choices: ['か', 'も', 'が'] },
  ],
  // 부사 호응 — まだ / もう / ぜんぜん / きっと
  [
    { kana: 'しゅくだいは ◯◯ おわって いません', romaji: 'shukudai wa mada owatte imasen', meaning: '숙제는 아직 끝나지 않았습니다', note: '부사 호응 (まだ/もう/ぜんぜん)', answer: 'まだ', choices: ['もう', 'きっと', 'ぜんぜん'] },
    { kana: 'ひるごはんは ◯◯ たべました', romaji: 'hirugohan wa mou tabemashita', meaning: '점심은 이미 먹었습니다', note: '부사 호응 (まだ/もう/ぜんぜん)', answer: 'もう', choices: ['まだ', 'きっと', 'ぜんぜん'] },
    { kana: 'おさけは ◯◯ のみません', romaji: 'osake wa zenzen nomimasen', meaning: '술은 전혀 마시지 않습니다', note: '부사 호응 (まだ/もう/ぜんぜん)', answer: 'ぜんぜん', choices: ['もう', 'まだ', 'きっと'] },
    { kana: 'かれは ◯◯ くるでしょう', romaji: 'kare wa kitto kuru deshou', meaning: '그는 분명히 올 겁니다', note: '부사 호응 (まだ/もう/ぜんぜん)', answer: 'きっと', choices: ['まだ', 'もう', 'ぜんぜん'] },
    { kana: '◯◯ たべて いません。 はやく つくって ください', romaji: 'mada tabete imasen. hayaku tsukutte kudasai', meaning: '아직 안 먹었습니다. 빨리 만들어 주세요', note: '부사 호응 (まだ/もう/ぜんぜん)', answer: 'まだ', choices: ['もう', 'きっと', 'ぜんぜん'] },
  ],
  // 보조동사 て형 — ～てから / ～ておく / ～てしまう / ～てみる
  [
    { kana: 'てを あらって ◯◯ ごはんを たべます', romaji: 'te o aratte kara gohan o tabemasu', meaning: '손을 씻고 나서 밥을 먹습니다', note: '보조동사 て형 (てから/ておく/てしまう/てみる)', answer: 'から', choices: ['まで', 'あと', 'ので'] },
    { kana: 'りょこうの まえに きっぷを かって ◯◯ ます', romaji: 'ryokou no mae ni kippu o katte okimasu', meaning: '여행 전에 표를 사 둡니다', note: '보조동사 て형 (てから/ておく/てしまう/てみる)', answer: 'おき', choices: ['しまい', 'み', 'いき'] },
    { kana: 'しゅくだいを ぜんぶ やって ◯◯ ました', romaji: 'shukudai o zenbu yatte shimaimashita', meaning: '숙제를 전부 해 버렸습니다', note: '보조동사 て형 (てから/ておく/てしまう/てみる)', answer: 'しまい', choices: ['おき', 'み', 'いき'] },
    { kana: 'あたらしい りょうりを つくって ◯◯ ました', romaji: 'atarashii ryouri o tsukutte mimashita', meaning: '새 요리를 만들어 봤습니다', note: '보조동사 て형 (てから/ておく/てしまう/てみる)', answer: 'み', choices: ['おき', 'しまい', 'いき'] },
    { kana: 'でんわ ばんごうを わすれて ◯◯ ました', romaji: 'denwa bangou o wasurete shimaimashita', meaning: '전화번호를 잊어버렸습니다', note: '보조동사 て형 (てから/ておく/てしまう/てみる)', answer: 'しまい', choices: ['おき', 'み', 'いき'] },
  ],
  // 의도·예정 — ～つもり / ～よてい / ～(よ)う
  [
    { kana: 'らいねん にほんへ いく ◯◯ です', romaji: 'rainen nihon e iku tsumori desu', meaning: '내년에 일본에 갈 생각입니다', note: '의도·예정 (つもり/よてい)', answer: 'つもり', choices: ['よてい', 'はず', 'よう'] },
    { kana: 'かいぎは さんじから の ◯◯ です', romaji: 'kaigi wa sanji kara no yotei desu', meaning: '회의는 3시부터 예정입니다', note: '의도·예정 (つもり/よてい)', answer: 'よてい', choices: ['つもり', 'はず', 'よう'] },
    { kana: 'こんばんは はやく ◯◯ と おもいます', romaji: 'konban wa hayaku neyou to omoimasu', meaning: '오늘 밤은 일찍 자려고 합니다', note: '의도·예정 (つもり/よてい)', answer: 'ねよう', choices: ['ねる', 'ねた', 'ねて'] },
    { kana: 'たばこを やめる ◯◯ です', romaji: 'tabako o yameru tsumori desu', meaning: '담배를 끊을 생각입니다', note: '의도·예정 (つもり/よてい)', answer: 'つもり', choices: ['よてい', 'はず', 'こと'] },
    { kana: 'いっしょに ◯◯', romaji: 'issho ni kaerou', meaning: '같이 돌아가자', note: '의도·예정 (つもり/よてい)', answer: 'かえろう', choices: ['かえる', 'かえった', 'かえって'] },
  ],
  // 난이 — ～やすい / ～にくい
  [
    { kana: 'この ペンは かき ◯◯ です', romaji: 'kono pen wa kakiyasui desu', meaning: '이 펜은 쓰기 쉽습니다', note: '난이 (やすい/にくい)', answer: 'やすい', choices: ['にくい', 'たい', 'すぎ'] },
    { kana: 'この にくは かたくて たべ ◯◯ です', romaji: 'kono niku wa katakute tabenikui desu', meaning: '이 고기는 질겨서 먹기 어렵습니다', note: '난이 (やすい/にくい)', answer: 'にくい', choices: ['やすい', 'たい', 'すぎ'] },
    { kana: 'せんせいの せつめいは わかり ◯◯ です', romaji: 'sensei no setsumei wa wakariyasui desu', meaning: '선생님의 설명은 이해하기 쉽습니다', note: '난이 (やすい/にくい)', answer: 'やすい', choices: ['にくい', 'たい', 'すぎ'] },
    { kana: 'この くすりは のみ ◯◯ です', romaji: 'kono kusuri wa nominikui desu', meaning: '이 약은 먹기 어렵습니다', note: '난이 (やすい/にくい)', answer: 'にくい', choices: ['やすい', 'たい', 'すぎ'] },
    { kana: 'この みちは ひろくて あるき ◯◯ です', romaji: 'kono michi wa hirokute arukiyasui desu', meaning: '이 길은 넓어서 걷기 편합니다', note: '난이 (やすい/にくい)', answer: 'やすい', choices: ['にくい', 'たい', 'すぎ'] },
  ],
  // 한정 — ～だけ / ～しか / ～ばかり
  [
    { kana: 'ひとつ ◯◯ ください', romaji: 'hitotsu dake kudasai', meaning: '하나만 주세요', note: '한정 (だけ/しか/ばかり)', answer: 'だけ', choices: ['しか', 'ばかり', 'まで'] },
    { kana: 'せんえん ◯◯ ありません', romaji: 'sen-en shika arimasen', meaning: '천 엔밖에 없습니다', note: '한정 (だけ/しか/ばかり)', answer: 'しか', choices: ['だけ', 'ばかり', 'まで'] },
    { kana: 'いもうとは あそんで ◯◯ います', romaji: 'imouto wa asonde bakari imasu', meaning: '여동생은 놀기만 합니다', note: '한정 (だけ/しか/ばかり)', answer: 'ばかり', choices: ['だけ', 'しか', 'まで'] },
    { kana: 'にほんごは すこし ◯◯ はなせます', romaji: 'nihongo wa sukoshi dake hanasemasu', meaning: '일본어는 조금만 말할 수 있습니다', note: '한정 (だけ/しか/ばかり)', answer: 'だけ', choices: ['しか', 'ばかり', 'まで'] },
    { kana: 'にちようび ◯◯ やすみです', romaji: 'nichiyoubi shika yasumi dewa arimasen', meaning: '일요일밖에 쉬는 날이 없습니다', note: '한정 (だけ/しか/ばかり)', answer: 'しか', choices: ['だけ', 'ばかり', 'まで'] },
  ],
  // 조언·비교판단 — ～たほうがいい / ～ないほうがいい
  [
    { kana: 'はやく ねた ◯◯ いいですよ', romaji: 'hayaku neta hou ga ii desu yo', meaning: '일찍 자는 편이 좋습니다', note: '조언 (たほうがいい)', answer: 'ほうが', choices: ['ことが', 'ように', 'ためが'] },
    { kana: 'むりを し ◯◯ ほうが いいです', romaji: 'muri o shinai hou ga ii desu', meaning: '무리하지 않는 편이 좋습니다', note: '조언 (たほうがいい)', answer: 'ない', choices: ['た', 'て', 'る'] },
    { kana: 'やさいを たくさん たべた ◯◯ いいです', romaji: 'yasai o takusan tabeta hou ga ii desu', meaning: '채소를 많이 먹는 편이 좋습니다', note: '조언 (たほうがいい)', answer: 'ほうが', choices: ['ことが', 'ように', 'ためが'] },
    { kana: 'あぶないから さわら ◯◯ ほうが いいです', romaji: 'abunai kara sawaranai hou ga ii desu', meaning: '위험하니까 만지지 않는 편이 좋습니다', note: '조언 (たほうがいい)', answer: 'ない', choices: ['た', 'て', 'る'] },
    { kana: 'いしゃに いった ◯◯ いいですよ', romaji: 'isha ni itta hou ga ii desu yo', meaning: '의사에게 가는 편이 좋습니다', note: '조언 (たほうがいい)', answer: 'ほうが', choices: ['ことが', 'ように', 'ためが'] },
  ],
]

export const CLOZE: Kana[] = CLOZE_ROWS.flat()
