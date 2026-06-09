// Hiragana — gojūon (五十音) order. Each inner array is one row (행),
// reused by both lesson sequencing and distractor selection (same-row first).
export interface Kana {
  kana: string
  romaji: string
}

export const HIRAGANA_ROWS: Kana[][] = [
  [
    { kana: 'あ', romaji: 'a' },
    { kana: 'い', romaji: 'i' },
    { kana: 'う', romaji: 'u' },
    { kana: 'え', romaji: 'e' },
    { kana: 'お', romaji: 'o' },
  ],
  [
    { kana: 'か', romaji: 'ka' },
    { kana: 'き', romaji: 'ki' },
    { kana: 'く', romaji: 'ku' },
    { kana: 'け', romaji: 'ke' },
    { kana: 'こ', romaji: 'ko' },
  ],
  [
    { kana: 'さ', romaji: 'sa' },
    { kana: 'し', romaji: 'shi' },
    { kana: 'す', romaji: 'su' },
    { kana: 'せ', romaji: 'se' },
    { kana: 'そ', romaji: 'so' },
  ],
  [
    { kana: 'た', romaji: 'ta' },
    { kana: 'ち', romaji: 'chi' },
    { kana: 'つ', romaji: 'tsu' },
    { kana: 'て', romaji: 'te' },
    { kana: 'と', romaji: 'to' },
  ],
  [
    { kana: 'な', romaji: 'na' },
    { kana: 'に', romaji: 'ni' },
    { kana: 'ぬ', romaji: 'nu' },
    { kana: 'ね', romaji: 'ne' },
    { kana: 'の', romaji: 'no' },
  ],
  [
    { kana: 'は', romaji: 'ha' },
    { kana: 'ひ', romaji: 'hi' },
    { kana: 'ふ', romaji: 'fu' },
    { kana: 'へ', romaji: 'he' },
    { kana: 'ほ', romaji: 'ho' },
  ],
  [
    { kana: 'ま', romaji: 'ma' },
    { kana: 'み', romaji: 'mi' },
    { kana: 'む', romaji: 'mu' },
    { kana: 'め', romaji: 'me' },
    { kana: 'も', romaji: 'mo' },
  ],
  [
    { kana: 'や', romaji: 'ya' },
    { kana: 'ゆ', romaji: 'yu' },
    { kana: 'よ', romaji: 'yo' },
  ],
  [
    { kana: 'ら', romaji: 'ra' },
    { kana: 'り', romaji: 'ri' },
    { kana: 'る', romaji: 'ru' },
    { kana: 'れ', romaji: 're' },
    { kana: 'ろ', romaji: 'ro' },
  ],
  [
    { kana: 'わ', romaji: 'wa' },
    { kana: 'を', romaji: 'wo' },
    { kana: 'ん', romaji: 'n' },
  ],
]

/** All 46 kana flattened in teaching order. */
export const HIRAGANA: Kana[] = HIRAGANA_ROWS.flat()

/** Row lookup for a given kana char — used by distractor selection. */
export const ROW_OF: Record<string, Kana[]> = (() => {
  const map: Record<string, Kana[]> = {}
  for (const row of HIRAGANA_ROWS) for (const k of row) map[k.kana] = row
  return map
})()
