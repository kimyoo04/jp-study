// 경어 — 존경어/겸양어 동사형 + 가게·직장에서 실제로 듣는 정중 표현.
// 문법·회화 덱과 같은 'sentence' 종류. note 자리에 경어 분류를 표시한다.
// 회화 덱에 이미 있는 문장(いらっしゃいませ 등)과 중복되지 않게 구성.
import type { Kana } from './kana'
import { KEIGO_EXPANSION_ROWS } from './keigo-expanded'

export const BASE_KEIGO_ROWS: Kana[][] = [
  // 존경어 (상대 높임)
  [
    { kana: 'いらっしゃいます', romaji: 'irasshaimasu', meaning: '가십니다 / 오십니다 / 계십니다', note: '존경어 (상대 높임)' },
    { kana: 'おっしゃいます', romaji: 'osshaimasu', meaning: '말씀하십니다', note: '존경어 (상대 높임)' },
    { kana: 'めしあがります', written: '召し上がります', romaji: 'meshiagarimasu', meaning: '드십니다', note: '존경어 (상대 높임)' },
    { kana: 'ごらんに なります', written: 'ご覧になります', romaji: 'goran ni narimasu', meaning: '보십니다', note: '존경어 (상대 높임)' },
    { kana: 'なさいます', romaji: 'nasaimasu', meaning: '하십니다', note: '존경어 (상대 높임)' },
    { kana: 'おやすみに なります', written: 'お休みになります', romaji: 'oyasumi ni narimasu', meaning: '주무십니다', note: '존경어 (상대 높임)' },
    { kana: 'ごぞんじですか', written: 'ご存じですか', romaji: 'gozonji desu ka', meaning: '알고 계세요?', note: '존경어 (상대 높임)' },
  ],
  // 겸양어 (나를 낮춤)
  [
    { kana: 'まいります', written: '参ります', romaji: 'mairimasu', meaning: '갑니다 / 옵니다 (겸양)', note: '겸양어 (나를 낮춤)' },
    { kana: 'もうします', written: '申します', romaji: 'moushimasu', meaning: '말합니다 (겸양)', note: '겸양어 (나를 낮춤)' },
    { kana: 'いたします', romaji: 'itashimasu', meaning: '합니다 (겸양)', note: '겸양어 (나를 낮춤)' },
    { kana: 'おります', romaji: 'orimasu', meaning: '있습니다 (겸양)', note: '겸양어 (나를 낮춤)' },
    { kana: 'はいけんします', written: '拝見します', romaji: 'haiken shimasu', meaning: '봅니다 (겸양)', note: '겸양어 (나를 낮춤)' },
    { kana: 'うかがいます', written: '伺います', romaji: 'ukagaimasu', meaning: '여쭙니다 / 찾아뵙니다', note: '겸양어 (나를 낮춤)' },
    { kana: 'ぞんじません', written: '存じません', romaji: 'zonjimasen', meaning: '모릅니다 (겸양)', note: '겸양어 (나를 낮춤)' },
  ],
  // 비즈니스 인사
  [
    { kana: 'キムと もうします', written: 'キムと申します', romaji: 'kimu to moushimasu', meaning: '김이라고 합니다', note: '비즈니스 인사' },
    { kana: 'おせわに なって おります', written: 'お世話になっております', romaji: 'osewa ni natte orimasu', meaning: '신세 지고 있습니다', note: '비즈니스 인사' },
    { kana: 'しょうち しました', written: '承知しました', romaji: 'shouchi shimashita', meaning: '알겠습니다 (격식)', note: '비즈니스 인사' },
    { kana: 'よろしく おねがいいたします', written: 'よろしくお願いいたします', romaji: 'yoroshiku onegai itashimasu', meaning: '잘 부탁드립니다 (격식)', note: '비즈니스 인사' },
    { kana: 'おてすうですが', written: 'お手数ですが', romaji: 'otesuu desu ga', meaning: '번거로우시겠지만', note: '비즈니스 인사' },
    { kana: 'おさきに どうぞ', written: 'お先にどうぞ', romaji: 'osaki ni douzo', meaning: '먼저 하세요 / 먼저 가세요', note: '비즈니스 인사' },
  ],
  // 가게에서 듣는 말
  [
    { kana: 'ごちゅうもんは おきまりですか', written: 'ご注文はお決まりですか', romaji: 'gochuumon wa okimari desu ka', meaning: '주문 정하셨어요?', note: '가게에서 듣는 말' },
    { kana: 'てんないで おめしあがりですか', written: '店内でお召し上がりですか', romaji: 'tennai de omeshiagari desu ka', meaning: '매장에서 드시나요?', note: '가게에서 듣는 말' },
    { kana: 'おもちかえりですか', written: 'お持ち帰りですか', romaji: 'omochikaeri desu ka', meaning: '포장이세요?', note: '가게에서 듣는 말' },
    { kana: 'ふくろは ごりようですか', written: '袋はご利用ですか', romaji: 'fukuro wa goriyou desu ka', meaning: '봉투 필요하세요?', note: '가게에서 듣는 말' },
    { kana: 'ポイントカードは おもちですか', written: 'ポイントカードはお持ちですか', romaji: 'pointo kaado wa omochi desu ka', meaning: '포인트카드 있으세요?', note: '가게에서 듣는 말' },
    { kana: 'おまたせしました', written: 'お待たせしました', romaji: 'omatase shimashita', meaning: '오래 기다리셨습니다', note: '가게에서 듣는 말' },
  ],
  // 정중한 안내
  [
    { kana: 'おかけください', written: 'お掛けください', romaji: 'okake kudasai', meaning: '앉으세요 (정중)', note: '정중한 안내' },
    { kana: 'おはいりください', written: 'お入りください', romaji: 'ohairi kudasai', meaning: '들어오세요 (정중)', note: '정중한 안내' },
    { kana: 'ごじゆうに どうぞ', written: 'ご自由にどうぞ', romaji: 'gojiyuu ni douzo', meaning: '자유롭게 이용하세요', note: '정중한 안내' },
    { kana: 'ごえんりょなく どうぞ', written: 'ご遠慮なくどうぞ', romaji: 'goenryo naku douzo', meaning: '사양 말고 드세요', note: '정중한 안내' },
    { kana: 'ごゆっくり どうぞ', romaji: 'goyukkuri douzo', meaning: '편히 계세요 / 천천히 즐기세요', note: '정중한 안내' },
    { kana: 'すこし おまち いただけますか', written: '少しお待ちいただけますか', romaji: 'sukoshi omachi itadakemasu ka', meaning: '잠시 기다려 주시겠어요?', note: '정중한 안내' },
  ],
  // 정중한 질문 / 응답
  [
    { kana: 'どちらさまですか', written: 'どちら様ですか', romaji: 'dochirasama desu ka', meaning: '누구신가요? (정중)', note: '정중한 질문 / 응답' },
    { kana: 'いかがですか', romaji: 'ikaga desu ka', meaning: '어떠세요? (정중)', note: '정중한 질문 / 응답' },
    { kana: 'こちらこそ', romaji: 'kochirakoso', meaning: '저야말로', note: '정중한 질문 / 응답' },
    { kana: 'おかげさまで', romaji: 'okagesama de', meaning: '덕분에요', note: '정중한 질문 / 응답' },
    { kana: 'とんでもないです', romaji: 'tondemonai desu', meaning: '별말씀을요', note: '정중한 질문 / 응답' },
  ],
]

const keigoExpansionByNote = new Map<string, Kana[]>()
for (const item of KEIGO_EXPANSION_ROWS.flat()) {
  const bucket = keigoExpansionByNote.get(item.note ?? '') ?? []
  bucket.push(item)
  keigoExpansionByNote.set(item.note ?? '', bucket)
}

/** Original and expanded expressions stay grouped by keigo category. */
export const KEIGO_ROWS: Kana[][] = BASE_KEIGO_ROWS.map((row) => {
  const bucket = keigoExpansionByNote.get(row[0]?.note ?? '') ?? []
  return [...row, ...bucket.splice(0, row.length)]
})

/** All keigo expressions flattened in teaching order. */
export const KEIGO: Kana[] = KEIGO_ROWS.flat()
