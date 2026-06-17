import { describe, expect, it } from 'vitest'
import { CURRICULUM } from './curriculum'

describe('curriculum', () => {
  it('has 12 weeks numbered 1..12 in order', () => {
    expect(CURRICULUM).toHaveLength(12)
    CURRICULUM.forEach((w, i) => {
      expect(w.week).toBe(i + 1)
    })
  })

  it('every week has the required fields and at least one page', () => {
    for (const w of CURRICULUM) {
      expect(w.id).toBeTruthy()
      expect(w.title).toBeTruthy()
      expect(w.subtitle).toBeTruthy()
      expect(w.goal).toBeTruthy()
      expect(w.pages.length).toBeGreaterThan(0)
    }
  })

  it('every page has a title and non-empty body', () => {
    for (const w of CURRICULUM) {
      for (const p of w.pages) {
        expect(p.id).toBeTruthy()
        expect(p.title).toBeTruthy()
        expect(p.body.trim().length).toBeGreaterThan(0)
      }
    }
  })

  it('week ids and page ids are globally unique', () => {
    const weekIds = CURRICULUM.map((w) => w.id)
    expect(new Set(weekIds).size).toBe(weekIds.length)

    const pageIds = CURRICULUM.flatMap((w) => w.pages.map((p) => p.id))
    expect(new Set(pageIds).size).toBe(pageIds.length)
  })

  it('every markdown table block has a separator row under its header', () => {
    // 표는 헤더 다음 줄이 |---| 구분행이어야 Markdown 컴포넌트가 표로 렌더한다.
    // 표 안의 모든 행은 열 개수가 헤더와 같아야 깨지지 않는다.
    const cols = (line: string) =>
      line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').length
    for (const w of CURRICULUM) {
      for (const p of w.pages) {
        const lines = p.body.split('\n')
        for (let i = 0; i < lines.length; i++) {
          const next = lines[i + 1]?.trim() ?? ''
          const isSeparator = next.includes('-') && /^\|?[\s:|-]+\|?$/.test(next)
          if (lines[i].trim().startsWith('|') && isSeparator) {
            // 헤더를 찾았다 → 헤더·구분행·데이터행의 열 수가 모두 일치해야 한다.
            const headerCols = cols(lines[i])
            expect(cols(next)).toBe(headerCols)
            let r = i + 2
            while (r < lines.length && lines[r].trim().startsWith('|')) {
              expect(cols(lines[r])).toBe(headerCols)
              r++
            }
          }
        }
      }
    }
  })
})
