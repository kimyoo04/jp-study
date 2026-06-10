// 가나 → 한국어 발음 표기 변환. 회화 덱에서 일본어 문장 아래에
// 한국어로 읽는 법을 보여주기 위해 사용한다.
// 표기 규칙(국내 일본어 교재 관례, 발음 동화 반영):
//   っ → 뒤 자음에 동화: か행 앞 ㄱ받침(がっこう → 각코우),
//        ぱ/ば행 앞 ㅂ받침(いっぱい → 입파이), 그 외 ㅅ받침(ちょっと → 촛토)
//   ん → 뒤 자음에 동화: ま/ば/ぱ행 앞 ㅁ받침(さんぽ → 삼포),
//        か/が행 앞 ㅇ받침(げんき → 겡키), 그 외 ㄴ받침(みんな → 민나)
//   ー → 장음 부호 '-' 유지 (メニュー → 메뉴-)

const DIGRAPHS: Record<string, string> = {
  きゃ: '캬', きゅ: '큐', きょ: '쿄',
  ぎゃ: '갸', ぎゅ: '규', ぎょ: '교',
  しゃ: '샤', しゅ: '슈', しょ: '쇼',
  じゃ: '자', じゅ: '주', じょ: '조',
  ちゃ: '차', ちゅ: '추', ちょ: '초',
  ぢゃ: '자', ぢゅ: '주', ぢょ: '조',
  にゃ: '냐', にゅ: '뉴', にょ: '뇨',
  ひゃ: '햐', ひゅ: '휴', ひょ: '효',
  びゃ: '뱌', びゅ: '뷰', びょ: '뵤',
  ぴゃ: '퍄', ぴゅ: '퓨', ぴょ: '표',
  みゃ: '먀', みゅ: '뮤', みょ: '묘',
  りゃ: '랴', りゅ: '류', りょ: '료',
  // 가타카나 확장음 (히라가나로 정규화된 형태)
  てぃ: '티', でぃ: '디', でゅ: '듀', とぅ: '투', どぅ: '두',
  うぃ: '위', うぇ: '웨', うぉ: '워',
  ふぁ: '파', ふぃ: '피', ふぇ: '페', ふぉ: '포', ふゅ: '퓨',
  しぇ: '셰', じぇ: '제', ちぇ: '체', つぁ: '차', つぇ: '체', つぉ: '초',
}

const SINGLES: Record<string, string> = {
  あ: '아', い: '이', う: '우', え: '에', お: '오',
  か: '카', き: '키', く: '쿠', け: '케', こ: '코',
  が: '가', ぎ: '기', ぐ: '구', げ: '게', ご: '고',
  さ: '사', し: '시', す: '스', せ: '세', そ: '소',
  ざ: '자', じ: '지', ず: '즈', ぜ: '제', ぞ: '조',
  た: '타', ち: '치', つ: '츠', て: '테', と: '토',
  だ: '다', ぢ: '지', づ: '즈', で: '데', ど: '도',
  な: '나', に: '니', ぬ: '누', ね: '네', の: '노',
  は: '하', ひ: '히', ふ: '후', へ: '헤', ほ: '호',
  ば: '바', び: '비', ぶ: '부', べ: '베', ぼ: '보',
  ぱ: '파', ぴ: '피', ぷ: '푸', ぺ: '페', ぽ: '포',
  ま: '마', み: '미', む: '무', め: '메', も: '모',
  や: '야', ゆ: '유', よ: '요',
  ら: '라', り: '리', る: '루', れ: '레', ろ: '로',
  わ: '와', を: '오', ゔ: '부',
  // 단독으로 나온 작은 글자는 모음으로 처리
  ぁ: '아', ぃ: '이', ぅ: '우', ぇ: '에', ぉ: '오',
  ゃ: '야', ゅ: '유', ょ: '요',
}

const HANGUL_BASE = 0xac00
const JONG_GIYEOK = 1 // ㄱ
const JONG_NIEUN = 4 // ㄴ
const JONG_MIEUM = 16 // ㅁ
const JONG_BIEUP = 17 // ㅂ
const JONG_SIOS = 19 // ㅅ
const JONG_IEUNG = 21 // ㅇ

// 뒤 글자의 첫 자음에 따라 받침이 동화된다 (디그래프도 첫 글자만 보면 됨).
const K_ROW = 'かきくけこがぎぐげご'
const PB_ROW = 'ぱぴぷぺぽばびぶべぼ'
const M_ROW = 'まみむめも'

// ん의 받침: ま/ば/ぱ행 앞 ㅁ, か/が행 앞 ㅇ, 그 외(어말 포함) ㄴ
function nasalJong(next: string | undefined): number {
  if (!next) return JONG_NIEUN
  if (M_ROW.includes(next) || PB_ROW.includes(next)) return JONG_MIEUM
  if (K_ROW.includes(next)) return JONG_IEUNG
  return JONG_NIEUN
}

// っ의 받침: か/が행 앞 ㄱ, ぱ/ば행 앞 ㅂ, 그 외 ㅅ
function sokuonJong(next: string | undefined): number {
  if (!next) return JONG_SIOS
  if (K_ROW.includes(next)) return JONG_GIYEOK
  if (PB_ROW.includes(next)) return JONG_BIEUP
  return JONG_SIOS
}

// 받침 없는 한글 음절에 받침을 붙인다. 붙일 수 없으면 대체 글자를 출력한다.
function attachJong(out: string[], jong: number, fallback: string) {
  const last = out.length > 0 ? out[out.length - 1] : ''
  const code = last.charCodeAt(0) - HANGUL_BASE
  if (last && code >= 0 && code <= 11171 && code % 28 === 0) {
    out[out.length - 1] = String.fromCharCode(last.charCodeAt(0) + jong)
  } else {
    out.push(fallback)
  }
}

// 가타카나(ァ..ヶ)를 히라가나로 정규화. ー는 그대로 둔다.
function toHiragana(ch: string): string {
  const code = ch.charCodeAt(0)
  if (code >= 0x30a1 && code <= 0x30f6) return String.fromCharCode(code - 0x60)
  return ch
}

export function kanaToHangul(text: string): string {
  const out: string[] = []
  const chars = [...text].map(toHiragana)
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i]
    const pair = ch + (chars[i + 1] ?? '')
    if (DIGRAPHS[pair]) {
      out.push(DIGRAPHS[pair])
      i++
    } else if (ch === 'っ') {
      attachJong(out, sokuonJong(chars[i + 1]), '읏')
    } else if (ch === 'ん') {
      attachJong(out, nasalJong(chars[i + 1]), '응')
    } else if (ch === 'ー') {
      out.push('-')
    } else if (SINGLES[ch]) {
      out.push(SINGLES[ch])
    } else if (ch === '、') {
      out.push(', ')
    } else if (ch === '。') {
      out.push('.')
    } else {
      out.push(ch) // 공백·문장부호 등은 그대로
    }
  }
  return out.join('')
}
