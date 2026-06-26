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
  ],
  // 형용사 활용 — い형용사 현재·과거·부정
  [
    { kana: 'にほんごは ◯◯ です', romaji: 'nihongo wa muzukashii desu', meaning: '일본어는 어렵습니다', note: '형용사 활용', answer: 'むずかしい', choices: ['むずかしく', 'むずかしくて', 'むずかしの'] },
    { kana: 'きのうは ◯◯ です', romaji: 'kinou wa samukatta desu', meaning: '어제는 추웠습니다', note: '형용사 활용', answer: 'さむかった', choices: ['さむい', 'さむくて', 'さむくない'] },
    { kana: 'この ほんは ◯◯ ないです', romaji: 'kono hon wa omoshiroku nai desu', meaning: '이 책은 재미없습니다', note: '형용사 활용', answer: 'おもしろく', choices: ['おもしろい', 'おもしろくて', 'おもしろかった'] },
    { kana: 'この りょうりは ◯◯ です', romaji: 'kono ryouri wa oishii desu', meaning: '이 요리는 맛있습니다', note: '형용사 활용', answer: 'おいしい', choices: ['おいしく', 'おいしくて', 'おいしかった'] },
  ],
]

export const CLOZE: Kana[] = CLOZE_ROWS.flat()
