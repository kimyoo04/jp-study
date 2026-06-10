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
  // 공항 / 입국
  [
    { kana: 'かんこうで きました', romaji: 'kankou de kimashita', meaning: '관광으로 왔어요', note: '공항 / 입국' },
    { kana: 'みっか たいざいします', romaji: 'mikka taizai shimasu', meaning: '3일 머물러요', note: '공항 / 입국' },
    { kana: 'にもつは これだけです', romaji: 'nimotsu wa kore dake desu', meaning: '짐은 이것뿐이에요', note: '공항 / 입국' },
    { kana: 'りょうがえは どこですか', romaji: 'ryougae wa doko desu ka', meaning: '환전은 어디예요?', note: '공항 / 입국' },
    { kana: 'のりつぎは どこですか', romaji: 'noritsugi wa doko desu ka', meaning: '환승은 어디예요?', note: '공항 / 입국' },
  ],
  // 호텔 2
  [
    { kana: 'チェックアウトを おねがいします', romaji: 'chekkuauto o onegaishimasu', meaning: '체크아웃 부탁해요', note: '호텔 2' },
    { kana: 'にもつを あずかって もらえますか', romaji: 'nimotsu o azukatte moraemasu ka', meaning: '짐을 맡아 주실 수 있나요?', note: '호텔 2' },
    { kana: 'タクシーを よんで もらえますか', romaji: 'takushii o yonde moraemasu ka', meaning: '택시를 불러 주실 수 있나요?', note: '호텔 2' },
    { kana: 'もうふを もう いちまい ください', romaji: 'moufu o mou ichimai kudasai', meaning: '담요 한 장 더 주세요', note: '호텔 2' },
    { kana: 'へやの かぎを なくしました', romaji: 'heya no kagi o nakushimashita', meaning: '방 열쇠를 잃어버렸어요', note: '호텔 2' },
  ],
  // 식당 주문
  [
    { kana: 'これを ふたつ ください', romaji: 'kore o futatsu kudasai', meaning: '이거 두 개 주세요', note: '식당 주문' },
    { kana: 'とりわけざらを ください', romaji: 'toriwakezara o kudasai', meaning: '앞접시 주세요', note: '식당 주문' },
    { kana: 'おひやを ください', romaji: 'ohiya o kudasai', meaning: '찬물 주세요', note: '식당 주문' },
    { kana: 'かんじょうを おねがいします', romaji: 'kanjou o onegaishimasu', meaning: '계산 부탁해요', note: '식당 주문' },
    { kana: 'すこし からくして ください', romaji: 'sukoshi karaku shite kudasai', meaning: '조금 맵게 해 주세요', note: '식당 주문' },
  ],
  // 음식 맛
  [
    { kana: 'とても おいしいです', romaji: 'totemo oishii desu', meaning: '정말 맛있어요', note: '음식 맛' },
    { kana: 'あまいです', romaji: 'amai desu', meaning: '달아요', note: '음식 맛' },
    { kana: 'からいです', romaji: 'karai desu', meaning: '매워요', note: '음식 맛' },
    { kana: 'ちょうど いいです', romaji: 'choudo ii desu', meaning: '딱 좋아요', note: '음식 맛' },
    { kana: 'すこし しょっぱいです', romaji: 'sukoshi shoppai desu', meaning: '조금 짜요', note: '음식 맛' },
  ],
  // 관광
  [
    { kana: 'にゅうじょうりょうは いくらですか', romaji: 'nyuujouryou wa ikura desu ka', meaning: '입장료는 얼마예요?', note: '관광' },
    { kana: 'ここで しゃしんを とりたいです', romaji: 'koko de shashin o toritai desu', meaning: '여기서 사진 찍고 싶어요', note: '관광' },
    { kana: 'パンフレットは ありますか', romaji: 'panfuretto wa arimasu ka', meaning: '팸플릿 있나요?', note: '관광' },
    { kana: 'なんじに しまりますか', romaji: 'nanji ni shimarimasu ka', meaning: '몇 시에 닫아요?', note: '관광' },
    { kana: 'おすすめの ばしょは どこですか', romaji: 'osusume no basho wa doko desu ka', meaning: '추천 장소는 어디예요?', note: '관광' },
  ],
  // 은행 / 우체국
  [
    { kana: 'こうざを つくりたいです', romaji: 'kouza o tsukuritai desu', meaning: '계좌를 만들고 싶어요', note: '은행 / 우체국' },
    { kana: 'これを かんこくに おくりたいです', romaji: 'kore o kankoku ni okuritai desu', meaning: '이걸 한국에 보내고 싶어요', note: '은행 / 우체국' },
    { kana: 'きってを ください', romaji: 'kitte o kudasai', meaning: '우표 주세요', note: '은행 / 우체국' },
    { kana: 'りょうがえを おねがいします', romaji: 'ryougae o onegaishimasu', meaning: '환전 부탁해요', note: '은행 / 우체국' },
    { kana: 'げんきんを おろしたいです', romaji: 'genkin o oroshitai desu', meaning: '현금을 찾고 싶어요', note: '은행 / 우체국' },
  ],
  // 분실 / 긴급
  [
    { kana: 'さいふを なくしました', romaji: 'saifu o nakushimashita', meaning: '지갑을 잃어버렸어요', note: '분실 / 긴급' },
    { kana: 'けいさつを よんで ください', romaji: 'keisatsu o yonde kudasai', meaning: '경찰을 불러 주세요', note: '분실 / 긴급' },
    { kana: 'たすけて ください', romaji: 'tasukete kudasai', meaning: '도와주세요', note: '분실 / 긴급' },
    { kana: 'きゅうきゅうしゃを よんで ください', romaji: 'kyuukyuusha o yonde kudasai', meaning: '구급차를 불러 주세요', note: '분실 / 긴급' },
    { kana: 'パスポートを なくしました', romaji: 'pasupooto o nakushimashita', meaning: '여권을 잃어버렸어요', note: '분실 / 긴급' },
  ],
  // 약속 / 일정
  [
    { kana: 'なんじに あいましょうか', romaji: 'nanji ni aimashou ka', meaning: '몇 시에 만날까요?', note: '약속 / 일정' },
    { kana: 'えきで まって います', romaji: 'eki de matte imasu', meaning: '역에서 기다릴게요', note: '약속 / 일정' },
    { kana: 'すこし おくれそうです', romaji: 'sukoshi okuresou desu', meaning: '조금 늦을 것 같아요', note: '약속 / 일정' },
    { kana: 'よていを へんこうしても いいですか', romaji: 'yotei o henkou shitemo ii desu ka', meaning: '일정을 바꿔도 될까요?', note: '약속 / 일정' },
    { kana: 'あした あいましょう', romaji: 'ashita aimashou', meaning: '내일 만나요', note: '약속 / 일정' },
  ],
  // 칭찬
  [
    { kana: 'にほんごが じょうずですね', romaji: 'nihongo ga jouzu desu ne', meaning: '일본어 잘하시네요', note: '칭찬' },
    { kana: 'すてきですね', romaji: 'suteki desu ne', meaning: '멋지네요', note: '칭찬' },
    { kana: 'かわいいですね', romaji: 'kawaii desu ne', meaning: '귀엽네요', note: '칭찬' },
    { kana: 'かっこいいですね', romaji: 'kakkoii desu ne', meaning: '멋있네요', note: '칭찬' },
    { kana: 'センスが いいですね', romaji: 'sensu ga ii desu ne', meaning: '센스가 좋네요', note: '칭찬' },
  ],
  // 전화 2
  [
    { kana: 'ただいま でんわに でられません', romaji: 'tadaima denwa ni deraremasen', meaning: '지금 전화를 받을 수 없어요', note: '전화 2' },
    { kana: 'でんごんを おねがいします', romaji: 'dengon o onegaishimasu', meaning: '메시지를 부탁해요', note: '전화 2' },
    { kana: 'こえが とおいです', romaji: 'koe ga tooi desu', meaning: '잘 안 들려요', note: '전화 2' },
    { kana: 'でんわが きれそうです', romaji: 'denwa ga kiresou desu', meaning: '전화가 끊길 것 같아요', note: '전화 2' },
    { kana: 'かけまちがえました', romaji: 'kakemachigaemashita', meaning: '잘못 걸었어요', note: '전화 2' },
  ],
  // 인터넷 / SNS
  [
    { kana: 'れんらくさきを こうかんしませんか', romaji: 'renrakusaki o koukan shimasen ka', meaning: '연락처를 교환하지 않을래요?', note: '인터넷 / SNS' },
    { kana: 'インスタ やって いますか', romaji: 'insuta yatte imasu ka', meaning: '인스타 하세요?', note: '인터넷 / SNS' },
    { kana: 'フォローしても いいですか', romaji: 'foroo shitemo ii desu ka', meaning: '팔로우해도 될까요?', note: '인터넷 / SNS' },
    { kana: 'メッセージを おくります', romaji: 'messeeji o okurimasu', meaning: '메시지를 보낼게요', note: '인터넷 / SNS' },
    { kana: 'きょうの しゃしんを おくります', romaji: 'kyou no shashin o okurimasu', meaning: '오늘 사진 보낼게요', note: '인터넷 / SNS' },
  ],
  // 날씨 2
  [
    { kana: 'きょうは さむいですね', romaji: 'kyou wa samui desu ne', meaning: '오늘은 춥네요', note: '날씨 2' },
    { kana: 'かさを もって いますか', romaji: 'kasa o motte imasu ka', meaning: '우산 가지고 있어요?', note: '날씨 2' },
    { kana: 'ゆきが ふって います', romaji: 'yuki ga futte imasu', meaning: '눈이 오고 있어요', note: '날씨 2' },
    { kana: 'かぜが つよいですね', romaji: 'kaze ga tsuyoi desu ne', meaning: '바람이 세네요', note: '날씨 2' },
    { kana: 'あつくて たまりません', romaji: 'atsukute tamarimasen', meaning: '더워서 못 견디겠어요', note: '날씨 2' },
  ],
  // 가족 / 근황
  [
    { kana: 'かぞくは げんきですか', romaji: 'kazoku wa genki desu ka', meaning: '가족은 잘 지내요?', note: '가족 / 근황' },
    { kana: 'さいきん いそがしいです', romaji: 'saikin isogashii desu', meaning: '요즘 바빠요', note: '가족 / 근황' },
    { kana: 'ひさしぶりですね', romaji: 'hisashiburi desu ne', meaning: '오랜만이네요', note: '가족 / 근황' },
    { kana: 'かわりないですか', romaji: 'kawarinai desu ka', meaning: '별일 없죠?', note: '가족 / 근황' },
    { kana: 'あいたかったです', romaji: 'aitakatta desu', meaning: '보고 싶었어요', note: '가족 / 근황' },
  ],
  // 식당 예약
  [
    { kana: 'よやくを して いません', romaji: 'yoyaku o shite imasen', meaning: '예약 안 했어요', note: '식당 예약' },
    { kana: 'ふたりです', romaji: 'futari desu', meaning: '두 명이에요', note: '식당 예약' },
    { kana: 'まどがわの せきが いいです', romaji: 'madogawa no seki ga ii desu', meaning: '창가 자리가 좋아요', note: '식당 예약' },
    { kana: 'どのくらい まちますか', romaji: 'donokurai machimasu ka', meaning: '얼마나 기다려요?', note: '식당 예약' },
    { kana: 'きんえんせきは ありますか', romaji: 'kinenseki wa arimasu ka', meaning: '금연석 있나요?', note: '식당 예약' },
  ],
  // 술집 / 이자카야
  [
    { kana: 'なまビールを ふたつ ください', romaji: 'namabiiru o futatsu kudasai', meaning: '생맥주 두 잔 주세요', note: '술집 / 이자카야' },
    { kana: 'とりあえず ビールで', romaji: 'toriaezu biiru de', meaning: '일단 맥주로', note: '술집 / 이자카야' },
    { kana: 'おすすめの おさけは なんですか', romaji: 'osusume no osake wa nan desu ka', meaning: '추천 술은 뭐예요?', note: '술집 / 이자카야' },
    { kana: 'もう いっぱい のみませんか', romaji: 'mou ippai nomimasen ka', meaning: '한 잔 더 안 할래요?', note: '술집 / 이자카야' },
    { kana: 'そろそろ かえりましょう', romaji: 'sorosoro kaerimashou', meaning: '슬슬 갑시다', note: '술집 / 이자카야' },
  ],
  // 패스트푸드
  [
    { kana: 'セットで おねがいします', romaji: 'setto de onegaishimasu', meaning: '세트로 부탁해요', note: '패스트푸드' },
    { kana: 'ポテトを おおきいサイズで', romaji: 'poteto o ookii saizu de', meaning: '감자튀김 큰 사이즈로', note: '패스트푸드' },
    { kana: 'ここで たべます', romaji: 'koko de tabemasu', meaning: '여기서 먹을게요', note: '패스트푸드' },
    { kana: 'ケチャップを もらえますか', romaji: 'kechappu o moraemasu ka', meaning: '케첩 받을 수 있나요?', note: '패스트푸드' },
    { kana: 'こおりは すくなめで', romaji: 'koori wa sukuname de', meaning: '얼음은 적게', note: '패스트푸드' },
  ],
  // 옷가게
  [
    { kana: 'しちゃくしつは どこですか', romaji: 'shichakushitsu wa doko desu ka', meaning: '탈의실은 어디예요?', note: '옷가게' },
    { kana: 'もっと ちいさい サイズは ありますか', romaji: 'motto chiisai saizu wa arimasu ka', meaning: '더 작은 사이즈 있나요?', note: '옷가게' },
    { kana: 'ちょっと おおきいです', romaji: 'chotto ookii desu', meaning: '좀 커요', note: '옷가게' },
    { kana: 'ちょうど いい サイズです', romaji: 'choudo ii saizu desu', meaning: '딱 맞는 사이즈예요', note: '옷가게' },
    { kana: 'これ ください', romaji: 'kore kudasai', meaning: '이거 주세요', note: '옷가게' },
  ],
  // 영화 / 공연
  [
    { kana: 'チケットを にまい ください', romaji: 'chiketto o nimai kudasai', meaning: '표 두 장 주세요', note: '영화 / 공연' },
    { kana: 'なんじの かいが ありますか', romaji: 'nanji no kai ga arimasu ka', meaning: '몇 시 회차 있어요?', note: '영화 / 공연' },
    { kana: 'せきは どこですか', romaji: 'seki wa doko desu ka', meaning: '자리는 어디예요?', note: '영화 / 공연' },
    { kana: 'じまくは ありますか', romaji: 'jimaku wa arimasu ka', meaning: '자막 있나요?', note: '영화 / 공연' },
    { kana: 'とても おもしろかったです', romaji: 'totemo omoshirokatta desu', meaning: '정말 재미있었어요', note: '영화 / 공연' },
  ],
  // 운동 / 헬스
  [
    { kana: 'まいにち はしって います', romaji: 'mainichi hashitte imasu', meaning: '매일 달려요', note: '운동 / 헬스' },
    { kana: 'ジムに かよって います', romaji: 'jimu ni kayotte imasu', meaning: '헬스장에 다녀요', note: '운동 / 헬스' },
    { kana: 'すこし つかれました', romaji: 'sukoshi tsukaremashita', meaning: '좀 피곤해요', note: '운동 / 헬스' },
    { kana: 'いっしょに うんどうしませんか', romaji: 'issho ni undou shimasen ka', meaning: '같이 운동하지 않을래요?', note: '운동 / 헬스' },
    { kana: 'がんばって ください', romaji: 'ganbatte kudasai', meaning: '힘내세요', note: '운동 / 헬스' },
  ],
  // 취미 / 관심사
  [
    { kana: 'しゅみは おんがくです', romaji: 'shumi wa ongaku desu', meaning: '취미는 음악이에요', note: '취미 / 관심사' },
    { kana: 'えを かくのが すきです', romaji: 'e o kaku no ga suki desu', meaning: '그림 그리는 걸 좋아해요', note: '취미 / 관심사' },
    { kana: 'りょこうが だいすきです', romaji: 'ryokou ga daisuki desu', meaning: '여행을 아주 좋아해요', note: '취미 / 관심사' },
    { kana: 'どんな おんがくが すきですか', romaji: 'donna ongaku ga suki desu ka', meaning: '어떤 음악 좋아해요?', note: '취미 / 관심사' },
    { kana: 'しゅうまつは なにを しますか', romaji: 'shuumatsu wa nani o shimasu ka', meaning: '주말엔 뭐 해요?', note: '취미 / 관심사' },
  ],
  // 날짜 / 시간
  [
    { kana: 'いま なんじですか', romaji: 'ima nanji desu ka', meaning: '지금 몇 시예요?', note: '날짜 / 시간' },
    { kana: 'きょうは なんにちですか', romaji: 'kyou wa nannichi desu ka', meaning: '오늘 며칠이에요?', note: '날짜 / 시간' },
    { kana: 'なんようびですか', romaji: 'nanyoubi desu ka', meaning: '무슨 요일이에요?', note: '날짜 / 시간' },
    { kana: 'やすみは いつですか', romaji: 'yasumi wa itsu desu ka', meaning: '휴일은 언제예요?', note: '날짜 / 시간' },
    { kana: 'じかんが ありますか', romaji: 'jikan ga arimasu ka', meaning: '시간 있어요?', note: '날짜 / 시간' },
  ],
  // 동의 / 거절
  [
    { kana: 'いいですね', romaji: 'ii desu ne', meaning: '좋아요', note: '동의 / 거절' },
    { kana: 'もちろんです', romaji: 'mochiron desu', meaning: '물론이죠', note: '동의 / 거절' },
    { kana: 'ざんねんですが', romaji: 'zannen desu ga', meaning: '아쉽지만', note: '동의 / 거절' },
    { kana: 'ちょっと むずかしいです', romaji: 'chotto muzukashii desu', meaning: '좀 어려워요', note: '동의 / 거절' },
    { kana: 'かんがえて おきます', romaji: 'kangaete okimasu', meaning: '생각해 둘게요', note: '동의 / 거절' },
  ],
  // 맞장구 2
  [
    { kana: 'たしかに', romaji: 'tashika ni', meaning: '확실히', note: '맞장구 2' },
    { kana: 'それは いいですね', romaji: 'sore wa ii desu ne', meaning: '그거 좋네요', note: '맞장구 2' },
    { kana: 'わかります', romaji: 'wakarimasu', meaning: '이해해요', note: '맞장구 2' },
    { kana: 'そうかもしれません', romaji: 'sou kamoshiremasen', meaning: '그럴지도 몰라요', note: '맞장구 2' },
    { kana: 'まったくです', romaji: 'mattaku desu', meaning: '정말 그래요', note: '맞장구 2' },
  ],
  // 직장 2
  [
    { kana: 'おさきに しつれいします', romaji: 'osaki ni shitsurei shimasu', meaning: '먼저 실례하겠습니다', note: '직장 2' },
    { kana: 'いってらっしゃい', romaji: 'itterasshai', meaning: '다녀오세요', note: '직장 2' },
    { kana: 'がんばって', romaji: 'ganbatte', meaning: '화이팅', note: '직장 2' },
    { kana: 'メールを かくにんして ください', romaji: 'meeru o kakunin shite kudasai', meaning: '메일을 확인해 주세요', note: '직장 2' },
    { kana: 'きょうは ざんぎょうです', romaji: 'kyou wa zangyou desu', meaning: '오늘은 야근이에요', note: '직장 2' },
  ],
  // 여행 계획
  [
    { kana: 'にほんに りょこうに いきます', romaji: 'nihon ni ryokou ni ikimasu', meaning: '일본에 여행 가요', note: '여행 계획' },
    { kana: 'どこが おすすめですか', romaji: 'doko ga osusume desu ka', meaning: '어디가 추천이에요?', note: '여행 계획' },
    { kana: 'いっしゅうかん たいざいします', romaji: 'isshuukan taizai shimasu', meaning: '일주일 머물러요', note: '여행 계획' },
    { kana: 'ホテルを よやくしました', romaji: 'hoteru o yoyaku shimashita', meaning: '호텔을 예약했어요', note: '여행 계획' },
    { kana: 'はやく いきたいです', romaji: 'hayaku ikitai desu', meaning: '빨리 가고 싶어요', note: '여행 계획' },
  ],
  // 수량 / 계산
  [
    { kana: 'ぜんぶで いくらですか', romaji: 'zenbu de ikura desu ka', meaning: '전부 얼마예요?', note: '수량 / 계산' },
    { kana: 'べつべつに できますか', romaji: 'betsubetsu ni dekimasu ka', meaning: '따로따로 되나요?', note: '수량 / 계산' },
    { kana: 'おつりを ください', romaji: 'otsuri o kudasai', meaning: '거스름돈 주세요', note: '수량 / 계산' },
    { kana: 'りょうしゅうしょを ください', romaji: 'ryoushuusho o kudasai', meaning: '영수증을 주세요', note: '수량 / 계산' },
    { kana: 'すこし たりません', romaji: 'sukoshi tarimasen', meaning: '조금 부족해요', note: '수량 / 계산' },
  ],
  // 선물 / 쇼핑
  [
    { kana: 'プレゼントを さがして います', romaji: 'purezento o sagashite imasu', meaning: '선물을 찾고 있어요', note: '선물 / 쇼핑' },
    { kana: 'ラッピングして もらえますか', romaji: 'rappingu shite moraemasu ka', meaning: '포장해 주실 수 있나요?', note: '선물 / 쇼핑' },
    { kana: 'にんきの しょうひんは どれですか', romaji: 'ninki no shouhin wa dore desu ka', meaning: '인기 상품은 어느 거예요?', note: '선물 / 쇼핑' },
    { kana: 'しんせいひんは ありますか', romaji: 'shinseihin wa arimasu ka', meaning: '신상품 있나요?', note: '선물 / 쇼핑' },
    { kana: 'かんこくに はっそう できますか', romaji: 'kankoku ni hassou dekimasu ka', meaning: '한국으로 배송 되나요?', note: '선물 / 쇼핑' },
  ],
]

/** All conversational phrases flattened in teaching order. */
export const PHRASES: Kana[] = PHRASE_ROWS.flat()
