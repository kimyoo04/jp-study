// Cross-deck search. Matching is a plain substring scan over kana / romaji /
// meaning / note — ~2.5k entries, so a linear pass per keystroke is well under a
// millisecond.
//
// 검색은 본질적으로 전 덱을 봐야 한다. 그래서 인덱스는 모듈 로드 시점이 아니라
// 검색 화면이 열릴 때 만든다 — 덱 데이터가 지연 로드(data/decks.ts)이고,
// 예전처럼 모듈 최상단에서 만들면 검색을 안 쓰는 사람도 6,040문항을 다 받는다.
import { DECK_META, loadDeck } from '../data/decks'
import type { DeckKind, Kana } from '../data/kana'

export interface SearchEntry {
  kana: Kana
  deckLabel: string
  deckKind: DeckKind
  deckId: string
}

let indexPromise: Promise<SearchEntry[]> | null = null

/**
 * 검색 인덱스. 처음 호출할 때 모든 덱을 받아 한 번 만들고 그 뒤로는 재사용한다.
 *
 * cloze 덱은 뺀다 — 빈칸이 뚫린 퀴즈 문장('ごはん◯◯ たべます')이라 사전 항목이
 * 아니다.
 */
export function loadSearchIndex(): Promise<SearchEntry[]> {
  indexPromise ??= Promise.all(
    DECK_META.filter((m) => m.kind !== 'cloze').map((m) => loadDeck(m.id)),
  ).then((decks) =>
    decks.flatMap((d) =>
      d.kana.map((k) => ({ kana: k, deckLabel: d.label, deckKind: d.kind, deckId: d.id })),
    ),
  )
  return indexPromise
}

/**
 * Rank matches: exact field match first, then prefix, then substring; among
 * equal kinds, earlier fields (kana > romaji > meaning > note) win. Empty query
 * returns nothing. `limit` caps the list so a one-letter query stays snappy.
 */
export function searchItems(query: string, index: SearchEntry[], limit = 60): SearchEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const scored: { entry: SearchEntry; score: number }[] = []
  for (const entry of index) {
    const { kana, romaji, meaning, note } = entry.kana
    const fields = [kana, romaji, meaning ?? '', note ?? '']
    let best = Infinity
    for (let f = 0; f < fields.length; f++) {
      const field = fields[f].toLowerCase()
      if (!field) continue
      const at = field.indexOf(q)
      if (at === -1) continue
      const kind = field === q ? 0 : at === 0 ? 100 : 200
      const score = kind + f
      if (score < best) best = score
    }
    if (best !== Infinity) scored.push({ entry, score: best })
  }

  scored.sort((a, b) => a.score - b.score)
  return scored.slice(0, limit).map((s) => s.entry)
}
