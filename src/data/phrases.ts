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
  // 자기소개 3
  [
    { kana: 'にじゅうごさいです', romaji: 'nijuugosai desu', meaning: '25살이에요', note: '자기소개 3' },
    { kana: 'ソウルしゅっしんです', romaji: 'souru shusshin desu', meaning: '서울 출신이에요', note: '자기소개 3' },
    { kana: 'ひとりぐらしです', romaji: 'hitorigurashi desu', meaning: '혼자 살아요', note: '자기소개 3' },
    { kana: 'きょうだいは ふたりです', romaji: 'kyoudai wa futari desu', meaning: '형제는 둘이에요', note: '자기소개 3' },
    { kana: 'にほんは はじめてです', romaji: 'nihon wa hajimete desu', meaning: '일본은 처음이에요', note: '자기소개 3' },
  ],
  // 음료 주문
  [
    { kana: 'なにに しますか', romaji: 'nani ni shimasu ka', meaning: '뭐로 할래요?', note: '음료 주문' },
    { kana: 'おなじものを ください', romaji: 'onaji mono o kudasai', meaning: '같은 걸로 주세요', note: '음료 주문' },
    { kana: 'あついのを ください', romaji: 'atsui no o kudasai', meaning: '뜨거운 걸로 주세요', note: '음료 주문' },
    { kana: 'つめたいのを ください', romaji: 'tsumetai no o kudasai', meaning: '차가운 걸로 주세요', note: '음료 주문' },
    { kana: 'こおりなしで おねがいします', romaji: 'koori nashi de onegaishimasu', meaning: '얼음 없이 부탁해요', note: '음료 주문' },
  ],
  // 교통 3
  [
    { kana: 'レンタカーを かりたいです', romaji: 'rentakaa o karitai desu', meaning: '렌터카를 빌리고 싶어요', note: '교통 3' },
    { kana: 'じてんしゃを かりられますか', romaji: 'jitensha o kariraremasu ka', meaning: '자전거를 빌릴 수 있나요?', note: '교통 3' },
    { kana: 'ちかい えきは どこですか', romaji: 'chikai eki wa doko desu ka', meaning: '가까운 역은 어디예요?', note: '교통 3' },
    { kana: 'このバスは えきに とまりますか', romaji: 'kono basu wa eki ni tomarimasu ka', meaning: '이 버스는 역에 서나요?', note: '교통 3' },
    { kana: 'いちにちけんは ありますか', romaji: 'ichinichiken wa arimasu ka', meaning: '1일권 있나요?', note: '교통 3' },
  ],
  // 길안내
  [
    { kana: 'つぎの かどを みぎです', romaji: 'tsugi no kado o migi desu', meaning: '다음 모퉁이에서 오른쪽이에요', note: '길안내' },
    { kana: 'ひだりに まがって ください', romaji: 'hidari ni magatte kudasai', meaning: '왼쪽으로 도세요', note: '길안내' },
    { kana: 'しんごうを わたって ください', romaji: 'shingou o watatte kudasai', meaning: '신호등을 건너세요', note: '길안내' },
    { kana: 'すぐ そこです', romaji: 'sugu soko desu', meaning: '바로 거기예요', note: '길안내' },
    { kana: 'あるいて ごふんです', romaji: 'aruite gofun desu', meaning: '걸어서 5분이에요', note: '길안내' },
  ],
  // 병원 접수
  [
    { kana: 'しょしんです', romaji: 'shoshin desu', meaning: '초진이에요', note: '병원 접수' },
    { kana: 'ほけんしょうを もって います', romaji: 'hokenshou o motte imasu', meaning: '보험증 가지고 있어요', note: '병원 접수' },
    { kana: 'ねつが さがりません', romaji: 'netsu ga sagarimasen', meaning: '열이 안 내려요', note: '병원 접수' },
    { kana: 'きのうから ねつが あります', romaji: 'kinou kara netsu ga arimasu', meaning: '어제부터 열이 나요', note: '병원 접수' },
    { kana: 'しょほうせんを ください', romaji: 'shohousen o kudasai', meaning: '처방전을 주세요', note: '병원 접수' },
  ],
  // 약국
  [
    { kana: 'かぜぐすりを ください', romaji: 'kazegusuri o kudasai', meaning: '감기약을 주세요', note: '약국' },
    { kana: 'いたみどめは ありますか', romaji: 'itamidome wa arimasu ka', meaning: '진통제 있나요?', note: '약국' },
    { kana: 'ばんそうこうを ください', romaji: 'bansoukou o kudasai', meaning: '반창고를 주세요', note: '약국' },
    { kana: 'いちにち さんかい のみます', romaji: 'ichinichi sankai nomimasu', meaning: '하루 세 번 먹어요', note: '약국' },
    { kana: 'しょくごに のみます', romaji: 'shokugo ni nomimasu', meaning: '식후에 먹어요', note: '약국' },
  ],
  // 택배 / 우편
  [
    { kana: 'にもつを おくりたいです', romaji: 'nimotsu o okuritai desu', meaning: '짐을 보내고 싶어요', note: '택배 / 우편' },
    { kana: 'いつ とどきますか', romaji: 'itsu todokimasu ka', meaning: '언제 도착해요?', note: '택배 / 우편' },
    { kana: 'そくたつで おねがいします', romaji: 'sokutatsu de onegaishimasu', meaning: '속달로 부탁해요', note: '택배 / 우편' },
    { kana: 'だんボールは ありますか', romaji: 'danbooru wa arimasu ka', meaning: '박스 있나요?', note: '택배 / 우편' },
    { kana: 'じゅうしょを かいて ください', romaji: 'juusho o kaite kudasai', meaning: '주소를 써 주세요', note: '택배 / 우편' },
  ],
  // 식당 문의
  [
    { kana: 'これは たのんで いません', romaji: 'kore wa tanonde imasen', meaning: '이건 안 시켰어요', note: '식당 문의' },
    { kana: 'まだ きません', romaji: 'mada kimasen', meaning: '아직 안 나와요', note: '식당 문의' },
    { kana: 'これを さげて ください', romaji: 'kore o sagete kudasai', meaning: '이거 치워 주세요', note: '식당 문의' },
    { kana: 'スプーンを ください', romaji: 'supuun o kudasai', meaning: '숟가락 주세요', note: '식당 문의' },
    { kana: 'おてふきを ください', romaji: 'otefuki o kudasai', meaning: '물수건 주세요', note: '식당 문의' },
  ],
  // 호텔 3
  [
    { kana: 'ちょうしょくは なんじからですか', romaji: 'choushoku wa nanji kara desu ka', meaning: '조식은 몇 시부터예요?', note: '호텔 3' },
    { kana: 'へやの でんきが つきません', romaji: 'heya no denki ga tsukimasen', meaning: '방 전등이 안 켜져요', note: '호텔 3' },
    { kana: 'おゆが でません', romaji: 'oyu ga demasen', meaning: '뜨거운 물이 안 나와요', note: '호텔 3' },
    { kana: 'タオルを かえて ください', romaji: 'taoru o kaete kudasai', meaning: '수건을 바꿔 주세요', note: '호텔 3' },
    { kana: 'もう ひとはく できますか', romaji: 'mou hitohaku dekimasu ka', meaning: '하룻밤 더 묵을 수 있나요?', note: '호텔 3' },
  ],
  // 데이트 / 약속
  [
    { kana: 'こんど しょくじでも どうですか', romaji: 'kondo shokuji demo dou desu ka', meaning: '다음에 식사라도 어때요?', note: '데이트 / 약속' },
    { kana: 'えいがでも みに いきませんか', romaji: 'eiga demo mi ni ikimasen ka', meaning: '영화라도 보러 가지 않을래요?', note: '데이트 / 약속' },
    { kana: 'どこか いきたい ところは ありますか', romaji: 'dokoka ikitai tokoro wa arimasu ka', meaning: '어디 가고 싶은 데 있어요?', note: '데이트 / 약속' },
    { kana: 'また あいたいです', romaji: 'mata aitai desu', meaning: '또 만나고 싶어요', note: '데이트 / 약속' },
    { kana: 'れんらく まって います', romaji: 'renraku matte imasu', meaning: '연락 기다릴게요', note: '데이트 / 약속' },
  ],
  // 격려 / 위로
  [
    { kana: 'だいじょうぶですよ', romaji: 'daijoubu desu yo', meaning: '괜찮을 거예요', note: '격려 / 위로' },
    { kana: 'むりしないで ください', romaji: 'muri shinaide kudasai', meaning: '무리하지 마세요', note: '격려 / 위로' },
    { kana: 'うまく いきますよ', romaji: 'umaku ikimasu yo', meaning: '잘될 거예요', note: '격려 / 위로' },
    { kana: 'おうえんして います', romaji: 'ouen shite imasu', meaning: '응원하고 있어요', note: '격려 / 위로' },
    { kana: 'きを おとさないで', romaji: 'ki o otosanaide', meaning: '기죽지 마세요', note: '격려 / 위로' },
  ],
  // 점원 응대
  [
    { kana: 'いらっしゃいませ', romaji: 'irasshaimase', meaning: '어서 오세요', note: '점원 응대' },
    { kana: 'しょうしょう おまち ください', romaji: 'shoushou omachi kudasai', meaning: '잠시 기다려 주세요', note: '점원 응대' },
    { kana: 'かしこまりました', romaji: 'kashikomarimashita', meaning: '알겠습니다', note: '점원 응대' },
    { kana: 'ほかに ご ちゅうもんは', romaji: 'hoka ni gochuumon wa', meaning: '다른 주문은요?', note: '점원 응대' },
    { kana: 'ありがとうございました', romaji: 'arigatou gozaimashita', meaning: '감사합니다', note: '점원 응대' },
  ],
  // 가격 / 흥정
  [
    { kana: 'たかいですね', romaji: 'takai desu ne', meaning: '비싸네요', note: '가격 / 흥정' },
    { kana: 'もう すこし やすく なりませんか', romaji: 'mou sukoshi yasuku narimasen ka', meaning: '조금 더 싸게 안 되나요?', note: '가격 / 흥정' },
    { kana: 'よさんは いちまんえんです', romaji: 'yosan wa ichimanen desu', meaning: '예산은 1만 엔이에요', note: '가격 / 흥정' },
    { kana: 'これで おねがいします', romaji: 'kore de onegaishimasu', meaning: '이걸로 부탁해요', note: '가격 / 흥정' },
    { kana: 'やめて おきます', romaji: 'yamete okimasu', meaning: '그만둘게요', note: '가격 / 흥정' },
  ],
  // 부동산
  [
    { kana: 'へやを さがして います', romaji: 'heya o sagashite imasu', meaning: '방을 찾고 있어요', note: '부동산' },
    { kana: 'やちんは いくらですか', romaji: 'yachin wa ikura desu ka', meaning: '월세는 얼마예요?', note: '부동산' },
    { kana: 'えきから ちかいですか', romaji: 'eki kara chikai desu ka', meaning: '역에서 가까워요?', note: '부동산' },
    { kana: 'ないけん できますか', romaji: 'naiken dekimasu ka', meaning: '둘러볼 수 있나요?', note: '부동산' },
    { kana: 'いつ ひっこせますか', romaji: 'itsu hikkosemasu ka', meaning: '언제 이사할 수 있어요?', note: '부동산' },
  ],
  // 미술관 / 박물관
  [
    { kana: 'さつえいは できますか', romaji: 'satsuei wa dekimasu ka', meaning: '촬영은 되나요?', note: '미술관 / 박물관' },
    { kana: 'にゅうじょうは むりょうですか', romaji: 'nyuujou wa muryou desu ka', meaning: '입장은 무료예요?', note: '미술관 / 박물관' },
    { kana: 'おとなが にまいです', romaji: 'otona ga nimai desu', meaning: '어른 두 장이요', note: '미술관 / 박물관' },
    { kana: 'おんせいガイドは ありますか', romaji: 'onsei gaido wa arimasu ka', meaning: '음성 가이드 있나요?', note: '미술관 / 박물관' },
    { kana: 'でぐちは どこですか', romaji: 'deguchi wa doko desu ka', meaning: '출구는 어디예요?', note: '미술관 / 박물관' },
  ],
  // 도서관
  [
    { kana: 'ほんを かりたいです', romaji: 'hon o karitai desu', meaning: '책을 빌리고 싶어요', note: '도서관' },
    { kana: 'かしだしは なんさつまでですか', romaji: 'kashidashi wa nansatsu made desu ka', meaning: '대출은 몇 권까지예요?', note: '도서관' },
    { kana: 'へんきゃくびは いつですか', romaji: 'henkyakubi wa itsu desu ka', meaning: '반납일은 언제예요?', note: '도서관' },
    { kana: 'かいかんじかんは なんじまでですか', romaji: 'kaikan jikan wa nanji made desu ka', meaning: '개관 시간은 몇 시까지예요?', note: '도서관' },
    { kana: 'せきは あいて いますか', romaji: 'seki wa aite imasu ka', meaning: '자리 있나요?', note: '도서관' },
  ],
  // 관공서
  [
    { kana: 'しんせいしたいです', romaji: 'shinsei shitai desu', meaning: '신청하고 싶어요', note: '관공서' },
    { kana: 'しょるいは これで いいですか', romaji: 'shorui wa kore de ii desu ka', meaning: '서류는 이걸로 되나요?', note: '관공서' },
    { kana: 'いんかんは ひつようですか', romaji: 'inkan wa hitsuyou desu ka', meaning: '도장은 필요해요?', note: '관공서' },
    { kana: 'まどぐちは どこですか', romaji: 'madoguchi wa doko desu ka', meaning: '창구는 어디예요?', note: '관공서' },
    { kana: 'なんばんの まどぐちですか', romaji: 'nanban no madoguchi desu ka', meaning: '몇 번 창구예요?', note: '관공서' },
  ],
  // 통신 / 인터넷
  [
    { kana: 'シムカードを かいたいです', romaji: 'shimukaado o kaitai desu', meaning: '심카드를 사고 싶어요', note: '통신 / 인터넷' },
    { kana: 'パスワードを おしえて ください', romaji: 'pasuwaado o oshiete kudasai', meaning: '비밀번호를 알려 주세요', note: '통신 / 인터넷' },
    { kana: 'ネットが つながりません', romaji: 'netto ga tsunagarimasen', meaning: '인터넷이 안 돼요', note: '통신 / 인터넷' },
    { kana: 'でんぱが わるいです', romaji: 'denpa ga warui desu', meaning: '신호가 약해요', note: '통신 / 인터넷' },
    { kana: 'じゅうでんきを かして もらえますか', romaji: 'juudenki o kashite moraemasu ka', meaning: '충전기를 빌려 주실 수 있나요?', note: '통신 / 인터넷' },
  ],
  // 자기소개 4
  [
    { kana: 'かいしゃいんです', romaji: 'kaishain desu', meaning: '회사원이에요', note: '자기소개 4' },
    { kana: 'だいがくせいです', romaji: 'daigakusei desu', meaning: '대학생이에요', note: '자기소개 4' },
    { kana: 'かいしゃで はたらいて います', romaji: 'kaisha de hataraite imasu', meaning: '회사에서 일해요', note: '자기소개 4' },
    { kana: 'にほんごを ならって います', romaji: 'nihongo o naratte imasu', meaning: '일본어를 배우고 있어요', note: '자기소개 4' },
    { kana: 'にほんが だいすきです', romaji: 'nihon ga daisuki desu', meaning: '일본을 아주 좋아해요', note: '자기소개 4' },
  ],
  // 맛집 / 추천
  [
    { kana: 'ここの めいぶつは なんですか', romaji: 'koko no meibutsu wa nan desu ka', meaning: '여기 명물은 뭐예요?', note: '맛집 / 추천' },
    { kana: 'にんきメニューは どれですか', romaji: 'ninki menyuu wa dore desu ka', meaning: '인기 메뉴는 어느 거예요?', note: '맛집 / 추천' },
    { kana: 'すこし まちますか', romaji: 'sukoshi machimasu ka', meaning: '조금 기다리나요?', note: '맛집 / 추천' },
    { kana: 'たべほうだいは ありますか', romaji: 'tabehoudai wa arimasu ka', meaning: '무한리필 있나요?', note: '맛집 / 추천' },
    { kana: 'おなかが すきました', romaji: 'onaka ga sukimashita', meaning: '배가 고파요', note: '맛집 / 추천' },
  ],
  // 날씨 / 계절
  [
    { kana: 'はるに なりましたね', romaji: 'haru ni narimashita ne', meaning: '봄이 됐네요', note: '날씨 / 계절' },
    { kana: 'もみじが きれいです', romaji: 'momiji ga kirei desu', meaning: '단풍이 예뻐요', note: '날씨 / 계절' },
    { kana: 'さくらが さきました', romaji: 'sakura ga sakimashita', meaning: '벚꽃이 피었어요', note: '날씨 / 계절' },
    { kana: 'つゆに はいりました', romaji: 'tsuyu ni hairimashita', meaning: '장마가 시작됐어요', note: '날씨 / 계절' },
    { kana: 'そとは あついです', romaji: 'soto wa atsui desu', meaning: '밖은 더워요', note: '날씨 / 계절' },
  ],
  // 응급
  [
    { kana: 'きぶんが わるく なりました', romaji: 'kibun ga waruku narimashita', meaning: '속이 안 좋아졌어요', note: '응급' },
    { kana: 'けがを しました', romaji: 'kega o shimashita', meaning: '다쳤어요', note: '응급' },
    { kana: 'いきが くるしいです', romaji: 'iki ga kurushii desu', meaning: '숨이 가빠요', note: '응급' },
    { kana: 'びょういんに つれて いって ください', romaji: 'byouin ni tsurete itte kudasai', meaning: '병원에 데려가 주세요', note: '응급' },
    { kana: 'だれか きて ください', romaji: 'dareka kite kudasai', meaning: '누구든 와 주세요', note: '응급' },
  ],
  // 교통 문제
  [
    { kana: 'でんしゃが おくれて います', romaji: 'densha ga okurete imasu', meaning: '전철이 늦어지고 있어요', note: '교통 문제' },
    { kana: 'みちが こんで います', romaji: 'michi ga konde imasu', meaning: '길이 막혀요', note: '교통 문제' },
    { kana: 'どうろが つうこうどめです', romaji: 'douro ga tsuukoudome desu', meaning: '도로가 통행금지예요', note: '교통 문제' },
    { kana: 'バスが きません', romaji: 'basu ga kimasen', meaning: '버스가 안 와요', note: '교통 문제' },
    { kana: 'まちがえて のりました', romaji: 'machigaete norimashita', meaning: '잘못 탔어요', note: '교통 문제' },
  ],
  // 감탄 / 반응
  [
    { kana: 'びっくりしました', romaji: 'bikkuri shimashita', meaning: '깜짝 놀랐어요', note: '감탄 / 반응' },
    { kana: 'うらやましいです', romaji: 'urayamashii desu', meaning: '부러워요', note: '감탄 / 반응' },
    { kana: 'しんじられません', romaji: 'shinjiraremasen', meaning: '믿을 수 없어요', note: '감탄 / 반응' },
    { kana: 'さすがですね', romaji: 'sasuga desu ne', meaning: '역시 대단해요', note: '감탄 / 반응' },
    { kana: 'よかったです', romaji: 'yokatta desu', meaning: '다행이에요', note: '감탄 / 반응' },
  ],
  // 부탁 3
  [
    { kana: 'ちょっと きいても いいですか', romaji: 'chotto kiitemo ii desu ka', meaning: '좀 물어봐도 될까요?', note: '부탁 3' },
    { kana: 'これを もって もらえますか', romaji: 'kore o motte moraemasu ka', meaning: '이걸 들어 주실 수 있나요?', note: '부탁 3' },
    { kana: 'みちを おしえて もらえますか', romaji: 'michi o oshiete moraemasu ka', meaning: '길을 알려 주실 수 있나요?', note: '부탁 3' },
    { kana: 'もう すこし まけて ください', romaji: 'mou sukoshi makete kudasai', meaning: '좀 더 깎아 주세요', note: '부탁 3' },
    { kana: 'かして もらえますか', romaji: 'kashite moraemasu ka', meaning: '빌려 주실 수 있나요?', note: '부탁 3' },
  ],
  // 작별 3
  [
    { kana: 'そろそろ いきます', romaji: 'sorosoro ikimasu', meaning: '슬슬 갈게요', note: '작별 3' },
    { kana: 'また あした', romaji: 'mata ashita', meaning: '내일 봐요', note: '작별 3' },
    { kana: 'きを つけて かえって ください', romaji: 'ki o tsukete kaette kudasai', meaning: '조심히 들어가세요', note: '작별 3' },
    { kana: 'あいに きて ください', romaji: 'ai ni kite kudasai', meaning: '만나러 와 주세요', note: '작별 3' },
    { kana: 'れんらく とりあいましょう', romaji: 'renraku toriaimashou', meaning: '연락 주고받아요', note: '작별 3' },
  ],
  // 일상 행동
  [
    { kana: 'そうじを します', romaji: 'souji o shimasu', meaning: '청소를 해요', note: '일상 행동' },
    { kana: 'せんたくを します', romaji: 'sentaku o shimasu', meaning: '빨래를 해요', note: '일상 행동' },
    { kana: 'ごみを すてます', romaji: 'gomi o sutemasu', meaning: '쓰레기를 버려요', note: '일상 행동' },
    { kana: 'りょうりを つくります', romaji: 'ryouri o tsukurimasu', meaning: '요리를 만들어요', note: '일상 행동' },
    { kana: 'かいものを します', romaji: 'kaimono o shimasu', meaning: '장을 봐요', note: '일상 행동' },
  ],
  // 자기소개 5
  [
    { kana: 'すきな たべものは すしです', romaji: 'sukina tabemono wa sushi desu', meaning: '좋아하는 음식은 초밥이에요', note: '자기소개 5' },
    { kana: 'にがてな たべものは ありません', romaji: 'nigatena tabemono wa arimasen', meaning: '못 먹는 음식은 없어요', note: '자기소개 5' },
    { kana: 'いぬを かって います', romaji: 'inu o katte imasu', meaning: '개를 키워요', note: '자기소개 5' },
    { kana: 'うんどうが しゅみです', romaji: 'undou ga shumi desu', meaning: '운동이 취미예요', note: '자기소개 5' },
    { kana: 'かんこくごも はなせます', romaji: 'kankokugo mo hanasemasu', meaning: '한국어도 할 수 있어요', note: '자기소개 5' },
  ],
  // 음식 선호
  [
    { kana: 'にくは たべません', romaji: 'niku wa tabemasen', meaning: '고기는 안 먹어요', note: '음식 선호' },
    { kana: 'やさいが すきです', romaji: 'yasai ga suki desu', meaning: '채소를 좋아해요', note: '음식 선호' },
    { kana: 'たまごアレルギーです', romaji: 'tamago arerugii desu', meaning: '계란 알레르기예요', note: '음식 선호' },
    { kana: 'からいものは にがてです', romaji: 'karai mono wa nigate desu', meaning: '매운 건 잘 못 먹어요', note: '음식 선호' },
    { kana: 'なまものは たべられません', romaji: 'namamono wa taberaremasen', meaning: '날것은 못 먹어요', note: '음식 선호' },
  ],
  // 교통 예약
  [
    { kana: 'していせきを おねがいします', romaji: 'shiteiseki o onegaishimasu', meaning: '지정석으로 부탁해요', note: '교통 예약' },
    { kana: 'かたみちですか', romaji: 'katamichi desu ka', meaning: '편도예요?', note: '교통 예약' },
    { kana: 'おうふくで おねがいします', romaji: 'oufuku de onegaishimasu', meaning: '왕복으로 부탁해요', note: '교통 예약' },
    { kana: 'まどがわを おねがいします', romaji: 'madogawa o onegaishimasu', meaning: '창가로 부탁해요', note: '교통 예약' },
    { kana: 'なんじの でんしゃが ありますか', romaji: 'nanji no densha ga arimasu ka', meaning: '몇 시 전철이 있어요?', note: '교통 예약' },
  ],
  // 호텔 예약
  [
    { kana: 'へやを よやくしたいです', romaji: 'heya o yoyaku shitai desu', meaning: '방을 예약하고 싶어요', note: '호텔 예약' },
    { kana: 'きんえんの へやが いいです', romaji: 'kinen no heya ga ii desu', meaning: '금연 방이 좋아요', note: '호텔 예약' },
    { kana: 'ふたりべやは ありますか', romaji: 'futaribeya wa arimasu ka', meaning: '트윈룸 있나요?', note: '호텔 예약' },
    { kana: 'いっぱく いくらですか', romaji: 'ippaku ikura desu ka', meaning: '1박 얼마예요?', note: '호텔 예약' },
    { kana: 'ちょうしょくは つきますか', romaji: 'choushoku wa tsukimasu ka', meaning: '조식 포함인가요?', note: '호텔 예약' },
  ],
  // 식당 계산
  [
    { kana: 'おあいそ おねがいします', romaji: 'oaiso onegaishimasu', meaning: '계산 부탁해요', note: '식당 계산' },
    { kana: 'ここで はらえますか', romaji: 'koko de haraemasu ka', meaning: '여기서 계산할 수 있나요?', note: '식당 계산' },
    { kana: 'クレジットカードは つかえますか', romaji: 'kurejittokaado wa tsukaemasu ka', meaning: '신용카드 쓸 수 있나요?', note: '식당 계산' },
    { kana: 'りょうしゅうしょは いりません', romaji: 'ryoushuusho wa irimasen', meaning: '영수증은 필요 없어요', note: '식당 계산' },
    { kana: 'とても まんぞくです', romaji: 'totemo manzoku desu', meaning: '아주 만족해요', note: '식당 계산' },
  ],
  // 환불 / 교환
  [
    { kana: 'へんぴん できますか', romaji: 'henpin dekimasu ka', meaning: '환불 되나요?', note: '환불 / 교환' },
    { kana: 'こうかんしたいです', romaji: 'koukan shitai desu', meaning: '교환하고 싶어요', note: '환불 / 교환' },
    { kana: 'サイズが あいませんでした', romaji: 'saizu ga aimasen deshita', meaning: '사이즈가 안 맞았어요', note: '환불 / 교환' },
    { kana: 'レシートは ここに あります', romaji: 'reshiito wa koko ni arimasu', meaning: '영수증은 여기 있어요', note: '환불 / 교환' },
    { kana: 'ふりょうひんでした', romaji: 'furyouhin deshita', meaning: '불량품이었어요', note: '환불 / 교환' },
  ],
  // 병원 진료
  [
    { kana: 'どこが わるいですか', romaji: 'doko ga warui desu ka', meaning: '어디가 안 좋으세요?', note: '병원 진료' },
    { kana: 'おなかが いたいです', romaji: 'onaka ga itai desu', meaning: '배가 아파요', note: '병원 진료' },
    { kana: 'めまいが します', romaji: 'memai ga shimasu', meaning: '어지러워요', note: '병원 진료' },
    { kana: 'よく ねむれません', romaji: 'yoku nemuremasen', meaning: '잠을 잘 못 자요', note: '병원 진료' },
    { kana: 'アレルギーは ありません', romaji: 'arerugii wa arimasen', meaning: '알레르기는 없어요', note: '병원 진료' },
  ],
  // 운동 / 취미
  [
    { kana: 'まいあさ ジョギングします', romaji: 'maiasa jogingu shimasu', meaning: '매일 아침 조깅해요', note: '운동 / 취미' },
    { kana: 'やまのぼりが すきです', romaji: 'yamanobori ga suki desu', meaning: '등산을 좋아해요', note: '운동 / 취미' },
    { kana: 'しゅうまつ つりに いきます', romaji: 'shuumatsu tsuri ni ikimasu', meaning: '주말에 낚시 가요', note: '운동 / 취미' },
    { kana: 'ヨガを はじめました', romaji: 'yoga o hajimemashita', meaning: '요가를 시작했어요', note: '운동 / 취미' },
    { kana: 'うんどうぶそくです', romaji: 'undoubusoku desu', meaning: '운동 부족이에요', note: '운동 / 취미' },
  ],
  // 업무 / 회의
  [
    { kana: 'しめきりは いつですか', romaji: 'shimekiri wa itsu desu ka', meaning: '마감은 언제예요?', note: '업무 / 회의' },
    { kana: 'しりょうを じゅんびします', romaji: 'shiryou o junbi shimasu', meaning: '자료를 준비할게요', note: '업무 / 회의' },
    { kana: 'かいぎを はじめましょう', romaji: 'kaigi o hajimemashou', meaning: '회의를 시작합시다', note: '업무 / 회의' },
    { kana: 'いけんは ありますか', romaji: 'iken wa arimasu ka', meaning: '의견 있으세요?', note: '업무 / 회의' },
    { kana: 'あとで そうだんしましょう', romaji: 'ato de soudan shimashou', meaning: '나중에 상의합시다', note: '업무 / 회의' },
  ],
  // 사진 / SNS
  [
    { kana: 'いっしょに とりましょう', romaji: 'issho ni torimashou', meaning: '같이 찍어요', note: '사진 / SNS' },
    { kana: 'ここで とりましょう', romaji: 'koko de torimashou', meaning: '여기서 찍어요', note: '사진 / SNS' },
    { kana: 'もう いちまい おねがいします', romaji: 'mou ichimai onegaishimasu', meaning: '한 장 더 부탁해요', note: '사진 / SNS' },
    { kana: 'タグづけしても いいですか', romaji: 'taguzuke shitemo ii desu ka', meaning: '태그해도 될까요?', note: '사진 / SNS' },
    { kana: 'アップしても いいですか', romaji: 'appu shitemo ii desu ka', meaning: '올려도 될까요?', note: '사진 / SNS' },
  ],
  // 날씨 / 외출
  [
    { kana: 'そとは さむいですか', romaji: 'soto wa samui desu ka', meaning: '밖은 추워요?', note: '날씨 / 외출' },
    { kana: 'かさを かりても いいですか', romaji: 'kasa o karitemo ii desu ka', meaning: '우산 빌려도 될까요?', note: '날씨 / 외출' },
    { kana: 'かさが いりますか', romaji: 'kasa ga irimasu ka', meaning: '우산 필요할까요?', note: '날씨 / 외출' },
    { kana: 'ひざしが つよいです', romaji: 'hizashi ga tsuyoi desu', meaning: '햇볕이 강해요', note: '날씨 / 외출' },
    { kana: 'すずしく なりましたね', romaji: 'suzushiku narimashita ne', meaning: '시원해졌네요', note: '날씨 / 외출' },
  ],
  // 칭찬 / 외모
  [
    { kana: 'にあいますね', romaji: 'niaimasu ne', meaning: '잘 어울리네요', note: '칭찬 / 외모' },
    { kana: 'わかく みえますね', romaji: 'wakaku miemasu ne', meaning: '젊어 보이네요', note: '칭찬 / 외모' },
    { kana: 'せが たかいですね', romaji: 'se ga takai desu ne', meaning: '키가 크네요', note: '칭찬 / 외모' },
    { kana: 'えがおが すてきです', romaji: 'egao ga suteki desu', meaning: '미소가 멋져요', note: '칭찬 / 외모' },
    { kana: 'おしゃれですね', romaji: 'oshare desu ne', meaning: '멋쟁이네요', note: '칭찬 / 외모' },
  ],
  // 위로 / 공감
  [
    { kana: 'たいへんでしたね', romaji: 'taihen deshita ne', meaning: '힘들었겠네요', note: '위로 / 공감' },
    { kana: 'それは こまりますね', romaji: 'sore wa komarimasu ne', meaning: '그건 곤란하겠네요', note: '위로 / 공감' },
    { kana: 'わかりますよ', romaji: 'wakarimasu yo', meaning: '이해해요', note: '위로 / 공감' },
    { kana: 'げんき だして', romaji: 'genki dashite', meaning: '기운 내요', note: '위로 / 공감' },
    { kana: 'むりしないでね', romaji: 'muri shinaide ne', meaning: '무리하지 말아요', note: '위로 / 공감' },
  ],
  // 거절 / 사양
  [
    { kana: 'けっこうです', romaji: 'kekkou desu', meaning: '괜찮아요 (사양)', note: '거절 / 사양' },
    { kana: 'いまは いいです', romaji: 'ima wa ii desu', meaning: '지금은 괜찮아요', note: '거절 / 사양' },
    { kana: 'また こんどに します', romaji: 'mata kondo ni shimasu', meaning: '다음에 할게요', note: '거절 / 사양' },
    { kana: 'ちょっと よていが あります', romaji: 'chotto yotei ga arimasu', meaning: '좀 일정이 있어요', note: '거절 / 사양' },
    { kana: 'ごめん、いけません', romaji: 'gomen, ikemasen', meaning: '미안, 못 가요', note: '거절 / 사양' },
  ],
  // 시간 약속
  [
    { kana: 'なんじに しましょうか', romaji: 'nanji ni shimashou ka', meaning: '몇 시로 할까요?', note: '시간 약속' },
    { kana: 'ごじでも いいですか', romaji: 'goji demo ii desu ka', meaning: '5시도 괜찮아요?', note: '시간 약속' },
    { kana: 'えきの まえで', romaji: 'eki no mae de', meaning: '역 앞에서', note: '시간 약속' },
    { kana: 'じかんが あったら れんらくします', romaji: 'jikan ga attara renraku shimasu', meaning: '시간 되면 연락할게요', note: '시간 약속' },
    { kana: 'おくれないで きて ください', romaji: 'okurenaide kite kudasai', meaning: '늦지 말고 와 주세요', note: '시간 약속' },
  ],
  // 배웅
  [
    { kana: 'たのしい じかんでした', romaji: 'tanoshii jikan deshita', meaning: '즐거운 시간이었어요', note: '배웅' },
    { kana: 'おみおくりします', romaji: 'omiokuri shimasu', meaning: '배웅할게요', note: '배웅' },
    { kana: 'えきまで おくります', romaji: 'eki made okurimasu', meaning: '역까지 바래다줄게요', note: '배웅' },
    { kana: 'つきましたら れんらくして', romaji: 'tsukimashitara renraku shite', meaning: '도착하면 연락해요', note: '배웅' },
    { kana: 'また よりましょう', romaji: 'mata yorimashou', meaning: '또 들러요', note: '배웅' },
  ],
  // 주유소 / 차
  [
    { kana: 'まんたんに して ください', romaji: 'mantan ni shite kudasai', meaning: '가득 채워 주세요', note: '주유소 / 차' },
    { kana: 'ガソリンが すくないです', romaji: 'gasorin ga sukunai desu', meaning: '기름이 얼마 없어요', note: '주유소 / 차' },
    { kana: 'ちかくに ガソリンスタンドは ありますか', romaji: 'chikaku ni gasorin sutando wa arimasu ka', meaning: '근처에 주유소 있어요?', note: '주유소 / 차' },
    { kana: 'せんしゃも おねがいします', romaji: 'sensha mo onegai shimasu', meaning: '세차도 부탁해요', note: '주유소 / 차' },
    { kana: 'タイヤの くうきを みて ください', romaji: 'taiya no kuuki o mite kudasai', meaning: '타이어 공기 좀 봐 주세요', note: '주유소 / 차' },
    { kana: 'まんたんで いくらですか', romaji: 'mantan de ikura desu ka', meaning: '가득 채우면 얼마예요?', note: '주유소 / 차' },
    { kana: 'エンジンの ちょうしが へんです', romaji: 'enjin no choushi ga hen desu', meaning: '엔진 상태가 이상해요', note: '주유소 / 차' },
    { kana: 'ちゅうしゃじょうは どこですか', romaji: 'chuushajou wa doko desu ka', meaning: '주차장은 어디예요?', note: '주유소 / 차' },
  ],
  // 편의점 2
  [
    { kana: 'これ あたためますか', romaji: 'kore atatamemasu ka', meaning: '이거 데워 드릴까요?', note: '편의점 2' },
    { kana: 'はい おねがいします', romaji: 'hai onegai shimasu', meaning: '네, 부탁해요', note: '편의점 2' },
    { kana: 'ふくろは ひとつで いいです', romaji: 'fukuro wa hitotsu de ii desu', meaning: '봉투는 하나면 돼요', note: '편의점 2' },
    { kana: 'おはしを つけて ください', romaji: 'ohashi o tsukete kudasai', meaning: '젓가락 넣어 주세요', note: '편의점 2' },
    { kana: 'エーティーエムは どこですか', romaji: 'eetiiemu wa doko desu ka', meaning: 'ATM은 어디예요?', note: '편의점 2' },
    { kana: 'レシートは いりません', romaji: 'reshiito wa irimasen', meaning: '영수증은 필요 없어요', note: '편의점 2' },
    { kana: 'こおりを ついかで おねがいします', romaji: 'koori o tsuika de onegai shimasu', meaning: '얼음 추가로 부탁해요', note: '편의점 2' },
    { kana: 'ポイントカードは ありません', romaji: 'pointo kaado wa arimasen', meaning: '포인트카드 없어요', note: '편의점 2' },
  ],
  // 날씨 예보
  [
    { kana: 'あしたは あめの よほうです', romaji: 'ashita wa ame no yohou desu', meaning: '내일은 비 예보예요', note: '날씨 예보' },
    { kana: 'きょうは かいせいです', romaji: 'kyou wa kaisei desu', meaning: '오늘은 쾌청해요', note: '날씨 예보' },
    { kana: 'ごごから くもりです', romaji: 'gogo kara kumori desu', meaning: '오후부터 흐려요', note: '날씨 예보' },
    { kana: 'たいふうが きて います', romaji: 'taifuu ga kite imasu', meaning: '태풍이 오고 있어요', note: '날씨 예보' },
    { kana: 'きおんが さがります', romaji: 'kion ga sagarimasu', meaning: '기온이 내려가요', note: '날씨 예보' },
    { kana: 'あつさに きを つけて ください', romaji: 'atsusa ni ki o tsukete kudasai', meaning: '더위 조심하세요', note: '날씨 예보' },
    { kana: 'ゆきが ふるかも しれません', romaji: 'yuki ga furu kamo shiremasen', meaning: '눈이 올지도 몰라요', note: '날씨 예보' },
    { kana: 'かさを もって いった ほうが いいです', romaji: 'kasa o motte itta hou ga ii desu', meaning: '우산 가져가는 게 좋아요', note: '날씨 예보' },
  ],
]

/** All conversational phrases flattened in teaching order. */
export const PHRASES: Kana[] = PHRASE_ROWS.flat()
