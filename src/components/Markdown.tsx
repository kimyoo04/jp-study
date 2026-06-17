import { type ReactNode } from 'react'

// 최소 마크다운 렌더러 — 의존성 없이 우리가 작성하는 커리큘럼 문법만 지원한다.
// 지원: # ## ### 제목 · 단락 · - 목록 · > 인용(콜아웃) · --- 구분선 ·
//       | 표 | (헤더+구분행) · 인라인 **굵게** 와 `코드`.
// 일본어 학습 콘텐츠를 토큰 색·간격에 맞춰 보여주는 게 목적이라, 범용 파서가
// 아니라 우리가 쓰는 부분집합만 안전하게 처리한다.

interface Props {
  source: string
}

// ---- 인라인: **굵게**, `코드` ----
function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  // **bold** 와 `code` 를 한 번에 토큰화. 가장 단순한 교대 매칭.
  const re = /(\*\*([^*]+)\*\*|`([^`]+)`)/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    if (m[2] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-b${i}`}>{m[2]}</strong>)
    } else if (m[3] !== undefined) {
      nodes.push(<code key={`${keyPrefix}-c${i}`}>{m[3]}</code>)
    }
    last = m.index + m[0].length
    i++
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

function splitRow(line: string): string[] {
  // | a | b | c | → ['a','b','c']  (양끝 파이프 제거 후 분리)
  return line
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map((c) => c.trim())
}

export function Markdown({ source }: Props) {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    // 빈 줄
    if (trimmed === '') {
      i++
      continue
    }

    // 구분선
    if (/^---+$/.test(trimmed)) {
      blocks.push(<hr key={key++} className="md-hr" />)
      i++
      continue
    }

    // 제목
    const h = /^(#{1,3})\s+(.*)$/.exec(trimmed)
    if (h) {
      const level = h[1].length
      const content = inline(h[2], `h${key}`)
      if (level === 1) blocks.push(<h2 key={key++} className="md-h1">{content}</h2>)
      else if (level === 2) blocks.push(<h3 key={key++} className="md-h2">{content}</h3>)
      else blocks.push(<h4 key={key++} className="md-h3">{content}</h4>)
      i++
      continue
    }

    // 표: 헤더행 + |---| 구분행 으로 시작
    if (trimmed.startsWith('|') && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i + 1]) && lines[i + 1].includes('-')) {
      const header = splitRow(trimmed)
      i += 2 // 헤더 + 구분행 건너뜀
      const rows: string[][] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(splitRow(lines[i].trim()))
        i++
      }
      blocks.push(
        <div key={key++} className="md-table-wrap">
          <table className="md-table">
            <thead>
              <tr>
                {header.map((c, ci) => (
                  <th key={ci}>{inline(c, `th${key}-${ci}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((c, ci) => (
                    <td key={ci}>{inline(c, `td${key}-${ri}-${ci}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      )
      continue
    }

    // 인용(콜아웃)
    if (trimmed.startsWith('>')) {
      const buf: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        buf.push(lines[i].trim().replace(/^>\s?/, ''))
        i++
      }
      blocks.push(
        <blockquote key={key++} className="md-callout">
          {buf.map((b, bi) => (
            <p key={bi}>{inline(b, `q${key}-${bi}`)}</p>
          ))}
        </blockquote>,
      )
      continue
    }

    // 목록 (- 항목, 연속 줄)
    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''))
        i++
      }
      blocks.push(
        <ul key={key++} className="md-list">
          {items.map((it, ii) => (
            <li key={ii}>{inline(it, `li${key}-${ii}`)}</li>
          ))}
        </ul>,
      )
      continue
    }

    // 단락 (다음 빈 줄/블록 시작 전까지 합침)
    const para: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,3})\s+/.test(lines[i].trim()) &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith('>') &&
      !lines[i].trim().startsWith('|') &&
      !/^---+$/.test(lines[i].trim())
    ) {
      para.push(lines[i].trim())
      i++
    }
    blocks.push(
      <p key={key++} className="md-p">
        {inline(para.join(' '), `p${key}`)}
      </p>,
    )
  }

  return <div className="md">{blocks}</div>
}
