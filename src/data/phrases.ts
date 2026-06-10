// 회화 — 상황별 일상 회화 문장. 카드는 문장(kana) + romaji + 뜻(meaning) + 상황(note).
// 문법 덱과 같은 'sentence' 종류라 "문장 → 뜻 고르기" 엔진을 재사용한다.
// note 자리에는 문법 패턴 대신 상황(인사/식당 등)을 표시한다.
import type { Kana } from './kana'

export const PHRASE_ROWS: Kana[][] = [
  // 인사 / 첫 만남
  [
    { kana: 'はじめまして', romaji: 'hajimemashite', meaning: '처음 뵙겠습니다', note: '인사 / 첫 만남' },
    { kana: 'よろしく おねがいします', romaji: 'yoroshiku onegaishimasu', meaning: '잘 부탁합니다', note: '인사 / 첫 만남' },
    { kana: 'おげんきですか', romaji: 'ogenki desu ka', meaning: '잘 지내세요?', note: '인사 / 첫 만남' },
    { kana: 'おなまえは なんですか', romaji: 'onamae wa nan desu ka', meaning: '이름이 뭐예요?', note: '인사 / 첫 만남' },
    { kana: 'おひさしぶりです', romaji: 'ohisashiburi desu', meaning: '오랜만이에요', note: '인사 / 첫 만남' },
  ],
  // 식당 / 쇼핑
  [
    { kana: 'メニューを ください', romaji: 'menyuu o kudasai', meaning: '메뉴를 주세요', note: '식당 / 쇼핑' },
    { kana: 'おすすめは なんですか', romaji: 'osusume wa nan desu ka', meaning: '추천 메뉴는 뭐예요?', note: '식당 / 쇼핑' },
    { kana: 'いくらですか', romaji: 'ikura desu ka', meaning: '얼마예요?', note: '식당 / 쇼핑' },
    { kana: 'おかいけい おねがいします', romaji: 'okaikei onegaishimasu', meaning: '계산해 주세요', note: '식당 / 쇼핑' },
    { kana: 'カードで はらえますか', romaji: 'kaado de haraemasu ka', meaning: '카드로 낼 수 있나요?', note: '식당 / 쇼핑' },
  ],
  // 길찾기 / 교통
  [
    { kana: 'えきは どこですか', romaji: 'eki wa doko desu ka', meaning: '역은 어디예요?', note: '길찾기 / 교통' },
    { kana: 'みちに まよいました', romaji: 'michi ni mayoimashita', meaning: '길을 잃었어요', note: '길찾기 / 교통' },
    { kana: 'ここから とおいですか', romaji: 'koko kara tooi desu ka', meaning: '여기서 멀어요?', note: '길찾기 / 교통' },
    { kana: 'まっすぐ いって ください', romaji: 'massugu itte kudasai', meaning: '곧장 가세요', note: '길찾기 / 교통' },
    { kana: 'タクシーを よんで ください', romaji: 'takushii o yonde kudasai', meaning: '택시를 불러 주세요', note: '길찾기 / 교통' },
  ],
  // 부탁 / 양해
  [
    { kana: 'ちょっと いいですか', romaji: 'chotto ii desu ka', meaning: '잠깐 괜찮아요?', note: '부탁 / 양해' },
    { kana: 'てつだって ください', romaji: 'tetsudatte kudasai', meaning: '도와주세요', note: '부탁 / 양해' },
    { kana: 'もう いちど おねがいします', romaji: 'mou ichido onegaishimasu', meaning: '다시 한 번 부탁해요', note: '부탁 / 양해' },
    { kana: 'ゆっくり はなして ください', romaji: 'yukkuri hanashite kudasai', meaning: '천천히 말해 주세요', note: '부탁 / 양해' },
    { kana: 'すみません、おくれます', romaji: 'sumimasen, okuremasu', meaning: '죄송해요, 늦어요', note: '부탁 / 양해' },
  ],
  // 감정 / 맞장구
  [
    { kana: 'だいじょうぶです', romaji: 'daijoubu desu', meaning: '괜찮아요', note: '감정 / 맞장구' },
    { kana: 'ほんとうですか', romaji: 'hontou desu ka', meaning: '정말요?', note: '감정 / 맞장구' },
    { kana: 'よかったですね', romaji: 'yokatta desu ne', meaning: '잘됐네요', note: '감정 / 맞장구' },
    { kana: 'たのしかったです', romaji: 'tanoshikatta desu', meaning: '즐거웠어요', note: '감정 / 맞장구' },
    { kana: 'ざんねんですね', romaji: 'zannen desu ne', meaning: '아쉽네요', note: '감정 / 맞장구' },
  ],
  // 일상 인사말
  [
    { kana: 'おはようございます', romaji: 'ohayou gozaimasu', meaning: '좋은 아침이에요', note: '일상 인사말' },
    { kana: 'いってきます', romaji: 'ittekimasu', meaning: '다녀오겠습니다', note: '일상 인사말' },
    { kana: 'ただいま', romaji: 'tadaima', meaning: '다녀왔습니다', note: '일상 인사말' },
    { kana: 'おつかれさまです', romaji: 'otsukaresama desu', meaning: '수고하셨어요', note: '일상 인사말' },
    { kana: 'いただきます', romaji: 'itadakimasu', meaning: '잘 먹겠습니다', note: '일상 인사말' },
  ],
  // 전화
  [
    { kana: 'もしもし', romaji: 'moshimoshi', meaning: '여보세요', note: '전화' },
    { kana: 'いま いいですか', romaji: 'ima ii desu ka', meaning: '지금 괜찮으세요?', note: '전화' },
    { kana: 'あとで かけなおします', romaji: 'ato de kakenaoshimasu', meaning: '나중에 다시 걸게요', note: '전화' },
    { kana: 'また れんらくします', romaji: 'mata renraku shimasu', meaning: '또 연락할게요', note: '전화' },
    { kana: 'でんわ ばんごうを おしえてください', romaji: 'denwa bangou o oshiete kudasai', meaning: '전화번호를 알려 주세요', note: '전화' },
  ],
  // 병원 / 몸 상태
  [
    { kana: 'あたまが いたいです', romaji: 'atama ga itai desu', meaning: '머리가 아파요', note: '병원 / 몸 상태' },
    { kana: 'ねつが あります', romaji: 'netsu ga arimasu', meaning: '열이 있어요', note: '병원 / 몸 상태' },
    { kana: 'きぶんが わるいです', romaji: 'kibun ga warui desu', meaning: '속이 안 좋아요', note: '병원 / 몸 상태' },
    { kana: 'くすりを ください', romaji: 'kusuri o kudasai', meaning: '약을 주세요', note: '병원 / 몸 상태' },
    { kana: 'おだいじに', romaji: 'odaiji ni', meaning: '몸조리 잘하세요', note: '병원 / 몸 상태' },
  ],
  // 약속 / 제안
  [
    { kana: 'いつが いいですか', romaji: 'itsu ga ii desu ka', meaning: '언제가 좋아요?', note: '약속 / 제안' },
    { kana: 'どこで あいましょうか', romaji: 'doko de aimashou ka', meaning: '어디서 만날까요?', note: '약속 / 제안' },
    { kana: 'いっしょに たべませんか', romaji: 'issho ni tabemasen ka', meaning: '같이 먹지 않을래요?', note: '약속 / 제안' },
    { kana: 'たのしみに しています', romaji: 'tanoshimi ni shiteimasu', meaning: '기대하고 있어요', note: '약속 / 제안' },
    { kana: 'また こんど', romaji: 'mata kondo', meaning: '다음에 또', note: '약속 / 제안' },
  ],
  // 사과 / 축하
  [
    { kana: 'ごめんなさい', romaji: 'gomennasai', meaning: '미안해요', note: '사과 / 축하' },
    { kana: 'きを つけて', romaji: 'ki o tsukete', meaning: '조심하세요', note: '사과 / 축하' },
    { kana: 'おめでとうございます', romaji: 'omedetou gozaimasu', meaning: '축하해요', note: '사과 / 축하' },
    { kana: 'たすかりました', romaji: 'tasukarimashita', meaning: '도움이 됐어요', note: '사과 / 축하' },
    { kana: 'きにしないで', romaji: 'ki ni shinaide', meaning: '신경 쓰지 마세요', note: '사과 / 축하' },
  ],
  // 호텔 / 숙박
  [
    { kana: 'チェックインを おねがいします', romaji: 'chekkuin o onegaishimasu', meaning: '체크인 부탁합니다', note: '호텔 / 숙박' },
    { kana: 'よやくして います', romaji: 'yoyaku shiteimasu', meaning: '예약했어요', note: '호텔 / 숙박' },
    { kana: 'ねっとは つかえますか', romaji: 'netto wa tsukaemasu ka', meaning: '인터넷 되나요?', note: '호텔 / 숙박' },
    { kana: 'なんじまでですか', romaji: 'nanji made desu ka', meaning: '몇 시까지예요?', note: '호텔 / 숙박' },
    { kana: 'へやを かえて ください', romaji: 'heya o kaete kudasai', meaning: '방을 바꿔 주세요', note: '호텔 / 숙박' },
  ],
  // 쇼핑 2
  [
    { kana: 'しちゃくしても いいですか', romaji: 'shichaku shitemo ii desu ka', meaning: '입어 봐도 될까요?', note: '쇼핑 2' },
    { kana: 'ほかの いろは ありますか', romaji: 'hoka no iro wa arimasu ka', meaning: '다른 색 있어요?', note: '쇼핑 2' },
    { kana: 'もっと やすいのは ありますか', romaji: 'motto yasui no wa arimasu ka', meaning: '더 싼 거 있어요?', note: '쇼핑 2' },
    { kana: 'これに します', romaji: 'kore ni shimasu', meaning: '이걸로 할게요', note: '쇼핑 2' },
    { kana: 'ふくろを ください', romaji: 'fukuro o kudasai', meaning: '봉투 주세요', note: '쇼핑 2' },
  ],
  // 식당 2
  [
    { kana: 'よやくを したいです', romaji: 'yoyaku o shitai desu', meaning: '예약하고 싶어요', note: '식당 2' },
    { kana: 'おすすめは どれですか', romaji: 'osusume wa dore desu ka', meaning: '추천은 어느 거예요?', note: '식당 2' },
    { kana: 'べつべつで おねがいします', romaji: 'betsubetsu de onegaishimasu', meaning: '따로따로 계산해 주세요', note: '식당 2' },
    { kana: 'ごちそうさまでした', romaji: 'gochisousama deshita', meaning: '잘 먹었습니다', note: '식당 2' },
    { kana: 'おかわり ください', romaji: 'okawari kudasai', meaning: '리필 주세요', note: '식당 2' },
  ],
  // 리액션
  [
    { kana: 'すごいですね', romaji: 'sugoi desu ne', meaning: '대단하네요', note: '리액션' },
    { kana: 'なるほど', romaji: 'naruhodo', meaning: '그렇군요', note: '리액션' },
    { kana: 'そうですね', romaji: 'sou desu ne', meaning: '그렇네요', note: '리액션' },
    { kana: 'わかりました', romaji: 'wakarimashita', meaning: '알겠습니다', note: '리액션' },
    { kana: 'しらなかったです', romaji: 'shiranakatta desu', meaning: '몰랐어요', note: '리액션' },
  ],
  // 자기소개 2
  [
    { kana: 'しゅみは なんですか', romaji: 'shumi wa nan desu ka', meaning: '취미가 뭐예요?', note: '자기소개 2' },
    { kana: 'しごとは なんですか', romaji: 'shigoto wa nan desu ka', meaning: '직업이 뭐예요?', note: '자기소개 2' },
    { kana: 'かんこくから きました', romaji: 'kankoku kara kimashita', meaning: '한국에서 왔어요', note: '자기소개 2' },
    { kana: 'にほんごを べんきょうして います', romaji: 'nihongo o benkyou shiteimasu', meaning: '일본어를 공부하고 있어요', note: '자기소개 2' },
    { kana: 'えいがが すきです', romaji: 'eiga ga suki desu', meaning: '영화를 좋아해요', note: '자기소개 2' },
  ],
  // 날씨 / 잡담
  [
    { kana: 'いい てんきですね', romaji: 'ii tenki desu ne', meaning: '날씨 좋네요', note: '날씨 / 잡담' },
    { kana: 'あついですね', romaji: 'atsui desu ne', meaning: '덥네요', note: '날씨 / 잡담' },
    { kana: 'さむく なりましたね', romaji: 'samuku narimashita ne', meaning: '추워졌네요', note: '날씨 / 잡담' },
    { kana: 'あめが ふりそうですね', romaji: 'ame ga furisou desu ne', meaning: '비가 올 것 같네요', note: '날씨 / 잡담' },
    { kana: 'はるが すきです', romaji: 'haru ga suki desu', meaning: '봄을 좋아해요', note: '날씨 / 잡담' },
  ],
  // 작별 / 안부
  [
    { kana: 'また あいましょう', romaji: 'mata aimashou', meaning: '또 만나요', note: '작별 / 안부' },
    { kana: 'げんきでね', romaji: 'genki de ne', meaning: '잘 지내요', note: '작별 / 안부' },
    { kana: 'よい いちにちを', romaji: 'yoi ichinichi o', meaning: '좋은 하루 보내세요', note: '작별 / 안부' },
    { kana: 'おやすみなさい', romaji: 'oyasuminasai', meaning: '안녕히 주무세요', note: '작별 / 안부' },
    { kana: 'おせわに なりました', romaji: 'osewa ni narimashita', meaning: '신세 많이 졌어요', note: '작별 / 안부' },
  ],
  // 도움 요청
  [
    { kana: 'おてつだいします', romaji: 'otetsudai shimasu', meaning: '도와드릴게요', note: '도움 요청' },
    { kana: 'だいじょうぶですか', romaji: 'daijoubu desu ka', meaning: '괜찮으세요?', note: '도움 요청' },
    { kana: 'みちを おしえて ください', romaji: 'michi o oshiete kudasai', meaning: '길을 알려 주세요', note: '도움 요청' },
    { kana: 'ちずを みせて ください', romaji: 'chizu o misete kudasai', meaning: '지도를 보여 주세요', note: '도움 요청' },
    { kana: 'ほんとうに ありがとう', romaji: 'hontou ni arigatou', meaning: '정말 고마워요', note: '도움 요청' },
  ],
  // 카페
  [
    { kana: 'アイスコーヒーを おねがいします', romaji: 'aisukoohii o onegaishimasu', meaning: '아이스커피 부탁해요', note: '카페' },
    { kana: 'ここで のみます', romaji: 'koko de nomimasu', meaning: '여기서 마실게요', note: '카페' },
    { kana: 'もちかえりで おねがいします', romaji: 'mochikaeri de onegaishimasu', meaning: '테이크아웃으로 부탁해요', note: '카페' },
    { kana: 'ミルクを いれて ください', romaji: 'miruku o irete kudasai', meaning: '우유를 넣어 주세요', note: '카페' },
    { kana: 'さとうは いりません', romaji: 'satou wa irimasen', meaning: '설탕은 필요 없어요', note: '카페' },
  ],
  // 편의점
  [
    { kana: 'ふくろは いりません', romaji: 'fukuro wa irimasen', meaning: '봉투는 필요 없어요', note: '편의점' },
    { kana: 'あたためて ください', romaji: 'atatamete kudasai', meaning: '데워 주세요', note: '편의점' },
    { kana: 'げんきんで はらいます', romaji: 'genkin de haraimasu', meaning: '현금으로 낼게요', note: '편의점' },
    { kana: 'はしを つけて ください', romaji: 'hashi o tsukete kudasai', meaning: '젓가락 넣어 주세요', note: '편의점' },
    { kana: 'レシートを ください', romaji: 'reshiito o kudasai', meaning: '영수증 주세요', note: '편의점' },
  ],
  // 택시
  [
    { kana: 'くうこうまで おねがいします', romaji: 'kuukou made onegaishimasu', meaning: '공항까지 부탁해요', note: '택시' },
    { kana: 'ここで とめて ください', romaji: 'koko de tomete kudasai', meaning: '여기서 세워 주세요', note: '택시' },
    { kana: 'どのくらい かかりますか', romaji: 'donokurai kakarimasu ka', meaning: '얼마나 걸려요?', note: '택시' },
    { kana: 'いそいで もらえますか', romaji: 'isoide moraemasu ka', meaning: '서둘러 주실 수 있나요?', note: '택시' },
    { kana: 'おつりは けっこうです', romaji: 'otsuri wa kekkou desu', meaning: '거스름돈은 됐어요', note: '택시' },
  ],
  // 전철 / 버스
  [
    { kana: 'このでんしゃは とうきょうに いきますか', romaji: 'kono densha wa toukyou ni ikimasu ka', meaning: '이 전철은 도쿄에 가나요?', note: '전철 / 버스' },
    { kana: 'つぎは どこですか', romaji: 'tsugi wa doko desu ka', meaning: '다음은 어디예요?', note: '전철 / 버스' },
    { kana: 'どこで のりかえますか', romaji: 'doko de norikaemasu ka', meaning: '어디서 갈아타요?', note: '전철 / 버스' },
    { kana: 'このせきは あいて いますか', romaji: 'kono seki wa aite imasu ka', meaning: '이 자리 비었나요?', note: '전철 / 버스' },
    { kana: 'ひとつ まえの えきです', romaji: 'hitotsu mae no eki desu', meaning: '한 정거장 앞 역이에요', note: '전철 / 버스' },
  ],
  // 길 묻기 2
  [
    { kana: 'トイレは どこですか', romaji: 'toire wa doko desu ka', meaning: '화장실은 어디예요?', note: '길 묻기 2' },
    { kana: 'ちかくに コンビニは ありますか', romaji: 'chikaku ni konbini wa arimasu ka', meaning: '근처에 편의점 있나요?', note: '길 묻기 2' },
    { kana: 'えきまで どう いきますか', romaji: 'eki made dou ikimasu ka', meaning: '역까지 어떻게 가요?', note: '길 묻기 2' },
    { kana: 'あるいて いけますか', romaji: 'aruite ikemasu ka', meaning: '걸어서 갈 수 있나요?', note: '길 묻기 2' },
    { kana: 'ちずを かいて もらえますか', romaji: 'chizu o kaite moraemasu ka', meaning: '지도를 그려 주실 수 있나요?', note: '길 묻기 2' },
  ],
  // 쇼핑 3
  [
    { kana: 'これは いくらですか', romaji: 'kore wa ikura desu ka', meaning: '이건 얼마예요?', note: '쇼핑 3' },
    { kana: 'まけて もらえますか', romaji: 'makete moraemasu ka', meaning: '깎아 주실 수 있나요?', note: '쇼핑 3' },
    { kana: 'もっと おおきいのは ありますか', romaji: 'motto ookii no wa arimasu ka', meaning: '더 큰 거 있나요?', note: '쇼핑 3' },
    { kana: 'これを みても いいですか', romaji: 'kore o mitemo ii desu ka', meaning: '이거 봐도 되나요?', note: '쇼핑 3' },
    { kana: 'プレゼントようです', romaji: 'purezento you desu', meaning: '선물용이에요', note: '쇼핑 3' },
  ],
  // 병원 / 약국
  [
    { kana: 'のどが いたいです', romaji: 'nodo ga itai desu', meaning: '목이 아파요', note: '병원 / 약국' },
    { kana: 'せきが でます', romaji: 'seki ga demasu', meaning: '기침이 나요', note: '병원 / 약국' },
    { kana: 'かぜを ひきました', romaji: 'kaze o hikimashita', meaning: '감기 걸렸어요', note: '병원 / 약국' },
    { kana: 'この くすりは いちにち なんかいですか', romaji: 'kono kusuri wa ichinichi nankai desu ka', meaning: '이 약은 하루 몇 번이에요?', note: '병원 / 약국' },
    { kana: 'アレルギーが あります', romaji: 'arerugii ga arimasu', meaning: '알레르기가 있어요', note: '병원 / 약국' },
  ],
  // 미용실
  [
    { kana: 'すこし みじかく して ください', romaji: 'sukoshi mijikaku shite kudasai', meaning: '조금 짧게 해 주세요', note: '미용실' },
    { kana: 'まえがみを そろえて ください', romaji: 'maegami o soroete kudasai', meaning: '앞머리를 다듬어 주세요', note: '미용실' },
    { kana: 'パーマを かけたいです', romaji: 'paama o kaketai desu', meaning: '파마하고 싶어요', note: '미용실' },
    { kana: 'いまの かんじで おねがいします', romaji: 'ima no kanji de onegaishimasu', meaning: '지금 느낌으로 부탁해요', note: '미용실' },
    { kana: 'かみを そめたいです', romaji: 'kami o sometai desu', meaning: '염색하고 싶어요', note: '미용실' },
  ],
  // 직장 / 회의
  [
    { kana: 'おつかれさまでした', romaji: 'otsukaresama deshita', meaning: '수고하셨습니다', note: '직장 / 회의' },
    { kana: 'かいぎは なんじからですか', romaji: 'kaigi wa nanji kara desu ka', meaning: '회의는 몇 시부터예요?', note: '직장 / 회의' },
    { kana: 'しりょうを おくります', romaji: 'shiryou o okurimasu', meaning: '자료를 보낼게요', note: '직장 / 회의' },
    { kana: 'かくにんして ください', romaji: 'kakunin shite kudasai', meaning: '확인해 주세요', note: '직장 / 회의' },
    { kana: 'すこし おくれます', romaji: 'sukoshi okuremasu', meaning: '조금 늦어요', note: '직장 / 회의' },
  ],
  // 학교 / 수업
  [
    { kana: 'しつもんが あります', romaji: 'shitsumon ga arimasu', meaning: '질문이 있어요', note: '학교 / 수업' },
    { kana: 'もう いちど せつめいして ください', romaji: 'mou ichido setsumei shite kudasai', meaning: '한 번 더 설명해 주세요', note: '학교 / 수업' },
    { kana: 'しゅくだいは なんですか', romaji: 'shukudai wa nan desu ka', meaning: '숙제는 뭐예요?', note: '학교 / 수업' },
    { kana: 'いっしょに べんきょうしませんか', romaji: 'issho ni benkyou shimasen ka', meaning: '같이 공부하지 않을래요?', note: '학교 / 수업' },
    { kana: 'ノートを みせて もらえますか', romaji: 'nooto o misete moraemasu ka', meaning: '노트 보여 주실 수 있나요?', note: '학교 / 수업' },
  ],
  // 감정 / 생각
  [
    { kana: 'うれしいです', romaji: 'ureshii desu', meaning: '기뻐요', note: '감정 / 생각' },
    { kana: 'かなしいです', romaji: 'kanashii desu', meaning: '슬퍼요', note: '감정 / 생각' },
    { kana: 'たのしみです', romaji: 'tanoshimi desu', meaning: '기대돼요', note: '감정 / 생각' },
    { kana: 'しんぱいです', romaji: 'shinpai desu', meaning: '걱정이에요', note: '감정 / 생각' },
    { kana: 'どう おもいますか', romaji: 'dou omoimasu ka', meaning: '어떻게 생각해요?', note: '감정 / 생각' },
  ],
  // 부탁 / 허락
  [
    { kana: 'おねがいが あります', romaji: 'onegai ga arimasu', meaning: '부탁이 있어요', note: '부탁 / 허락' },
    { kana: 'すこし まって もらえますか', romaji: 'sukoshi matte moraemasu ka', meaning: '잠깐 기다려 주실 수 있나요?', note: '부탁 / 허락' },
    { kana: 'しゃしんを とって もらえますか', romaji: 'shashin o totte moraemasu ka', meaning: '사진 찍어 주실 수 있나요?', note: '부탁 / 허락' },
    { kana: 'となりに すわっても いいですか', romaji: 'tonari ni suwattemo ii desu ka', meaning: '옆에 앉아도 되나요?', note: '부탁 / 허락' },
    { kana: 'ペンを かりても いいですか', romaji: 'pen o karitemo ii desu ka', meaning: '펜을 빌려도 되나요?', note: '부탁 / 허락' },
  ],
]

/** All conversational phrases flattened in teaching order. */
export const PHRASES: Kana[] = PHRASE_ROWS.flat()
