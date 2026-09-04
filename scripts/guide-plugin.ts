// 12주 커리큘럼을 정적 HTML로 굽는 Vite 플러그인.
//
// 왜 필요한가: 앱은 CSR이라 JS를 실행하지 않는 크롤러(GPTBot·ClaudeBot·
// PerplexityBot 등)에게 <div id="root"></div> 빈 문서로 보인다. 커리큘럼 본문은
// 이 사이트에서 가장 실질적인 콘텐츠인데 그대로면 색인·인용 대상이 아니다.
//
// 본문 렌더링은 앱의 Markdown 컴포넌트를 그대로 renderToStaticMarkup 한다.
// 파서를 두 벌 두지 않으므로 앱 화면과 정적 페이지의 마크업이 벌어질 수 없다.
//
// 앱 라우트 /learn/week-N 은 canonical 로 여기(/guide/week-N/)를 가리킨다.
//
// 같은 플러그인이 두 가지를 더 쓴다:
//
// 1) 앱 라우트별 정적 HTML. GitHub Pages 는 404.html 을 HTTP 404 상태로 서빙하므로
//    /deck/kanji 같은 경로가 SPA fallback 으로 화면은 떠도 상태 코드가 404 다 →
//    색인되지 않고 사이트맵도 오류가 난다. 각 경로에 index.html 사본을 두면
//    200 으로 응답한다. 사본의 head 는 lib/meta.ts 의 그 라우트 값으로 바꿔
//    끼워서, JS 를 실행하지 않는 크롤러도 올바른 title·canonical 을 본다.
//
// 2) sitemap.xml. 색인 대상 URL 목록이 여기서 결정되고 SSR 로 DECKS·CURRICULUM 을
//    이미 읽고 있기 때문이다.
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer, type Plugin, type ResolvedConfig } from 'vite'

const ORIGIN = 'https://kimyoo04.github.io'
const BASE = '/jp-study/'

interface CurriculumPage {
  id: string
  title: string
  body: string
}
interface CurriculumWeek {
  id: string
  week: number
  title: string
  subtitle: string
  goal: string
  pages: CurriculumPage[]
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * 정적 문서용 스타일. 앱 번들과 무관하게 JS 없이 그대로 읽히도록 인라인한다.
 *
 * 콜아웃은 측면 띠를 쓰지 않는다 — 면과 1px 윤곽으로 구분하고 강조는 첫 줄
 * (.md-callout strong)이 맡는다. 앱 쪽(styles.css)에서 같은 결정을 내렸는데
 * (커밋 58f5c42) 이 사본만 남아 있어서, 같은 Markdown 이 두 곳에서 다르게
 * 보이고 있었다.
 */
const STYLE = `
:root{--paper:#f7f3e9;--ink:#25231f;--muted:#716d64;--line:#ddd6c7;--red:#dc5a46;--blue:#365f74;--white:#fffdf7}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);line-height:1.7;
  font-family:-apple-system,BlinkMacSystemFont,"Noto Sans KR","Noto Sans JP",sans-serif}
a{color:var(--blue)}
header.doc{padding:56px max(24px,calc((100vw - 760px)/2)) 28px;border-bottom:1px solid var(--line);
  background:linear-gradient(135deg,#fffaf0,#f3ead8)}
.eyebrow{font-size:12px;font-weight:800;letter-spacing:.18em;color:var(--red);text-transform:uppercase}
h1{margin:8px 0 10px;font-size:clamp(28px,5vw,46px);line-height:1.15;letter-spacing:-.03em}
.lead{margin:0;color:var(--muted);font-size:17px}
.goal{margin:18px 0 0;padding:14px 16px;background:var(--white);border:1px solid var(--line);border-radius:12px;font-size:15px}
.goal strong{color:var(--red)}
main{max-width:760px;margin:auto;padding:36px 24px 72px}
.appcta{display:inline-block;margin:0 0 28px;padding:12px 18px;background:var(--ink);color:var(--white);
  border-radius:999px;text-decoration:none;font-weight:700;font-size:15px}
section.page{margin:0 0 44px}
section.page > h2.page-title{margin:0 0 4px;font-size:13px;font-weight:800;letter-spacing:.12em;
  text-transform:uppercase;color:var(--muted)}
.md-h1{margin:10px 0 12px;font-size:26px;line-height:1.25;letter-spacing:-.02em}
.md-h2{margin:30px 0 10px;font-size:20px}
.md-h3{margin:22px 0 8px;font-size:17px}
.md-p{margin:0 0 14px}
.md-list{margin:0 0 16px;padding-left:22px}
.md-list li{margin:0 0 6px}
.md-hr{margin:28px 0;border:0;border-top:1px solid var(--line)}
.md-callout{margin:0 0 16px;padding:14px 16px;background:#f0ebe0;
  border:1px solid color-mix(in srgb,var(--blue) 30%,var(--paper));border-radius:10px}
.md-callout strong{color:var(--blue)}
.md-callout p{margin:0 0 6px}.md-callout p:last-child{margin:0}
.md-table-wrap{overflow-x:auto;margin:0 0 18px}
.md-table{width:100%;border-collapse:collapse;font-size:15px;background:var(--white)}
.md-table th,.md-table td{border:1px solid var(--line);padding:9px 12px;text-align:left}
.md-table th{background:#f0ebe0;font-weight:700}
code{background:#ece5d7;padding:2px 6px;border-radius:5px;font-size:.92em;
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
nav.weeks{max-width:760px;margin:auto;padding:0 24px 72px;display:grid;gap:10px}
nav.weeks a{display:block;padding:16px 18px;background:var(--white);border:1px solid var(--line);
  border-radius:14px;text-decoration:none;color:var(--ink)}
nav.weeks a .n{font:800 12px ui-monospace,monospace;color:var(--red);letter-spacing:.1em}
nav.weeks a .t{display:block;font-size:18px;font-weight:750;margin:3px 0 2px}
nav.weeks a .s{display:block;color:var(--muted);font-size:14px}
.pager{display:flex;justify-content:space-between;gap:12px;border-top:1px solid var(--line);padding-top:22px}
.pager a{text-decoration:none;font-weight:700}
footer.doc{max-width:760px;margin:auto;padding:0 24px 56px;color:var(--muted);font-size:13px}
@media print{.appcta,.pager{display:none}header.doc{padding-top:20px}}
`

function shell(opts: {
  title: string
  description: string
  canonical: string
  jsonLd: object
  body: string
}): string {
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(opts.title)}</title>
<meta name="description" content="${esc(opts.description)}" />
<link rel="canonical" href="${esc(opts.canonical)}" />
<link rel="icon" type="image/svg+xml" href="${BASE}favicon.svg" />
<meta name="theme-color" content="#f7f3e9" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="にほんご Pocket" />
<meta property="og:locale" content="ko_KR" />
<meta property="og:title" content="${esc(opts.title)}" />
<meta property="og:description" content="${esc(opts.description)}" />
<meta property="og:url" content="${esc(opts.canonical)}" />
<meta property="og:image" content="${ORIGIN}${BASE}og-image.jpg" />
<meta property="og:image:type" content="image/jpeg" />
<meta name="twitter:card" content="summary_large_image" />
<style>${STYLE}</style>
<script type="application/ld+json">${JSON.stringify(opts.jsonLd)}</script>
</head>
<body>
${opts.body}
</body>
</html>
`
}

function weekPage(week: CurriculumWeek, rendered: string[], all: CurriculumWeek[]): string {
  const url = `${ORIGIN}${BASE}guide/week-${week.week}/`
  const prev = all.find((w) => w.week === week.week - 1)
  const next = all.find((w) => w.week === week.week + 1)

  const sections = week.pages
    .map((page, i) => {
      // 대부분의 페이지는 본문 첫 '# 제목'이 page.title 과 같다 — 두 번 찍지 않는다.
      const bodyHeading = /^#\s+(.*)$/m.exec(page.body)?.[1]?.trim()
      const eyebrow =
        bodyHeading === page.title ? '' : `<h2 class="page-title">${esc(page.title)}</h2>`
      return `<section class="page">${eyebrow}${rendered[i]}</section>`
    })
    .join('\n')

  const body = `<header class="doc">
  <div class="eyebrow">일본어 12주 커리큘럼 · ${week.week}주차</div>
  <h1>${esc(week.title)}</h1>
  <p class="lead">${esc(week.subtitle)}</p>
  <p class="goal"><strong>이번 주 목표</strong> · ${esc(week.goal)}</p>
</header>
<main>
  <a class="appcta" href="${BASE}learn/week-${week.week}">앱에서 이 주차 학습하기 →</a>
${sections}
  <div class="pager">
    ${prev ? `<a href="../week-${prev.week}/">← ${prev.week}주차: ${esc(prev.title)}</a>` : '<span></span>'}
    ${next ? `<a href="../week-${next.week}/">${next.week}주차: ${esc(next.title)} →</a>` : '<span></span>'}
  </div>
</main>
<footer class="doc"><a href="../">12주 커리큘럼 전체 목차</a> · <a href="${BASE}">にほんご Pocket 앱</a></footer>`

  return shell({
    title: `${week.week}주차: ${week.title} — 일본어 12주 학습 커리큘럼`,
    description: `${week.subtitle}. 이번 주 목표: ${week.goal}`,
    canonical: url,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: `${week.week}주차: ${week.title}`,
      description: week.subtitle,
      url,
      inLanguage: 'ko',
      teaches: week.goal,
      learningResourceType: 'lesson',
      educationalLevel: week.week <= 8 ? 'JLPT N5' : 'JLPT N4',
      timeRequired: 'P1W',
      position: week.week,
      isAccessibleForFree: true,
      isPartOf: {
        '@type': 'Course',
        name: '일본어 12주 학습 커리큘럼',
        url: `${ORIGIN}${BASE}guide/`,
      },
    },
    body,
  })
}

function indexPage(all: CurriculumWeek[]): string {
  const url = `${ORIGIN}${BASE}guide/`
  const links = all
    .map(
      (w) =>
        `<a href="week-${w.week}/"><span class="n">WEEK ${String(w.week).padStart(2, '0')}</span>` +
        `<span class="t">${esc(w.title)}</span><span class="s">${esc(w.subtitle)}</span></a>`,
    )
    .join('\n')

  const body = `<header class="doc">
  <div class="eyebrow">Japanese in 12 weeks</div>
  <h1>일본어 12주 학습 커리큘럼</h1>
  <p class="lead">1~8주 N5 기초 한 바퀴, 9~12주 N4 핵심 문형. 주차별 개념을 읽고 바로 퀴즈로 넘어갑니다.</p>
  <p class="goal"><strong>읽는 순서</strong> · 주차 본문을 먼저 읽고, 같은 주차를 앱에서 퀴즈로 반복하세요.</p>
</header>
<main><a class="appcta" href="${BASE}">にほんご Pocket 앱 열기 →</a></main>
<nav class="weeks">
${links}
</nav>
<footer class="doc"><a href="${BASE}grammar-patterns.html">회화 문법 패턴 56개</a> · <a href="${BASE}">앱으로 학습하기</a></footer>`

  return shell({
    title: '일본어 12주 학습 커리큘럼 — N5 기초부터 N4 문형까지',
    description:
      '일본어 독학 12주 커리큘럼. 1~8주 N5 기초(발음·조사·동사 활용·형용사), 9~12주 N4 핵심 문형. 주차별 개념 설명과 예문을 정리했습니다.',
    canonical: url,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: '일본어 12주 학습 커리큘럼',
      description: '1~8주 N5 기초 한 바퀴, 9~12주 N4 핵심 문형으로 확장하는 일본어 독학 커리큘럼.',
      url,
      inLanguage: 'ko',
      teaches: 'Japanese language (JLPT N5 to N4)',
      isAccessibleForFree: true,
      provider: { '@type': 'Organization', name: 'にほんご Pocket', url: `${ORIGIN}${BASE}` },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'P12W',
      },
      numberOfCredits: all.length,
    },
    body,
  })
}

interface SitemapEntry {
  /** 슬래시로 끝나는 최종 주소 — 리다이렉트되지 않는 형태여야 한다. */
  path: string
  /** 이 주소의 내용을 만드는 소스 파일들. lastmod 를 여기서 뽑는다. */
  sources: string[]
}

/**
 * 마지막 실질 변경일(W3C date). 내용을 만드는 소스의 git 커밋 날짜를 쓴다.
 *
 * 빌드 시각(new Date())을 쓰면 배포마다 27개 URL 전부가 "방금 바뀜"이라고
 * 주장한다. 구글은 검증되지 않는 lastmod 를 무시하므로, 그건 값이 있으나
 * 없는 것과 같다. git 을 못 쓰는 환경(tarball 배포 등)에서는 거짓말 대신
 * 태그를 생략한다 — lastmod 없는 사이트맵은 완전히 정상이다.
 */
function lastmodOf(root: string, sources: string[]): string | null {
  if (sources.length === 0) return null
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...sources], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null
  } catch {
    return null
  }
}

/**
 * 덱 페이지의 내용을 만드는 소스. 문항 데이터(src/data/<id>.ts)와 덱 정의
 * (src/data/decks/<id>.ts — 이름·카테고리 라벨) 둘 다 페이지에 나타난다.
 * 가나 두 덱은 문항이 kana.ts 에, 정의가 decks.ts 에 있다.
 */
function deckSources(id: string): string[] {
  if (id === 'hiragana' || id === 'katakana') return ['src/data/kana.ts', 'src/data/decks.ts']
  return [`src/data/${id}.ts`, `src/data/${id}-expanded.ts`, `src/data/decks/${id}.ts`]
}

/**
 * 사이트맵에 넣을 주소.
 * 넣는 기준: JS 없이도 내용이 있거나, 콜드 로드로 같은 화면이 복원되는 주소.
 * 빼는 것:
 *  - /search        검색 UI. 색인할 내용이 없다.
 *  - /learn         canonical 이 /guide/ 를 가리킨다(meta.ts) → 색인 대표가 아니다.
 *  - /learn/week-N  canonical 이 /guide/week-N/ 을 가리킨다(중복).
 *  - 카테고리        URL로 노출하지 않는다. 300개가 넘고 전부 얇은 페이지가 된다.
 *
 * priority·changefreq 는 넣지 않는다. 구글이 무시하는 값이라 파일만 키운다.
 */
function sitemapXml(root: string, guidePaths: string[], deckIds: string[]): string {
  const entries: SitemapEntry[] = [
    { path: BASE, sources: ['src/components/Home.tsx', 'src/data/decks.ts'] },
    { path: `${BASE}grammar-patterns.html`, sources: ['public/grammar-patterns.html'] },
    ...guidePaths.map((path) => ({ path, sources: ['src/data/curriculum.ts'] })),
    { path: `${BASE}jlpt/`, sources: ['src/data/jlpt'] },
    // 첫 덱은 루트와 같은 주소(pathOf 참고) — 중복을 피해 건너뛴다.
    ...deckIds.slice(1).map((id) => ({
      path: `${BASE}deck/${id}/`,
      sources: deckSources(id),
    })),
  ]

  const urls = entries
    .map((e) => {
      const lastmod = lastmodOf(root, e.sources)
      return (
        `  <url>\n` +
        `    <loc>${ORIGIN}${e.path}</loc>\n` +
        (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '') +
        `  </url>`
      )
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

interface PageMeta {
  title: string
  description: string
  canonical: string
}

interface DeckMeta {
  id: string
  label: string
  count: number
}

/**
 * JS 로드 전에 보이는 본문의 스타일. 앱 팔레트(styles.css)와 같은 색을 쓰되
 * 값을 인라인으로 복사한다 — 이 블록은 앱 CSS 가 도착하기 전에도 읽혀야 한다.
 * #root 안에 들어가므로 React 가 마운트할 때 style 태그까지 함께 사라진다.
 */
const PRE_APP_STYLE = `
.pre-app{max-width:680px;margin:0 auto;padding:28px 20px 64px;
  font-family:-apple-system,BlinkMacSystemFont,"Noto Sans KR","Noto Sans JP",sans-serif;
  color:#f4f4ff;line-height:1.7}
.pre-app h1{margin:0 0 14px;font-size:clamp(24px,6vw,34px);line-height:1.2;letter-spacing:-.02em}
.pre-app h2{margin:32px 0 10px;font-size:18px;color:#a78bff}
.pre-app p{margin:0 0 14px}
.pre-app ul{margin:0 0 18px;padding-left:20px}
.pre-app li{margin:0 0 6px}
.pre-app h3{margin:22px 0 8px;font-size:15px;color:#cdbfff;font-weight:700}
.pre-app a{color:#a78bff}
.pre-app .note{color:#a4a6c8;font-size:14px}
.pre-app .tbl{overflow-x:auto;margin:0 0 18px}
.pre-app table{border-collapse:collapse;font-size:14px;width:100%}
.pre-app th,.pre-app td{border:1px solid #2b2b48;padding:6px 10px;text-align:left;vertical-align:top}
.pre-app th{background:#1a1a30;font-weight:700;color:#cdbfff}
`

/**
 * JS 를 실행하지 않는 크롤러(GPTBot·ClaudeBot·PerplexityBot·CCBot)에게 보이는
 * 본문.
 *
 * 왜 필요한가: 라우트별 사본은 여태 head 만 갈아끼웠다 → body 는 빈
 * `<div id="root"></div>` 였다. 렌더링하지 않는 크롤러에게 이 사이트의 홈은
 * title 태그와 JSON-LD 뿐이었고, 인용할 문장이 하나도 없었다.
 *
 * #root 안에 넣는다. createRoot().render() 가 컨테이너의 기존 자식을 지우므로
 * 앱이 뜨면 자동으로 교체된다 — 중복 노출도, 지우는 코드도 필요 없다.
 * 부수 효과로 느린 회선에서 흰 화면 대신 이 글이 먼저 보인다.
 */
function staticBody(inner: string): string {
  return `<div class="pre-app"><style>${PRE_APP_STYLE}</style>\n${inner}\n</div>`
}

/**
 * 정적 본문에 싣는 문항 수 상한.
 *
 * 왜 상한을 두는가: 덱 하나가 1,216문항이라 전부 실으면 프리렌더 HTML 이
 * 수백 KB 가 된다. 이 블록의 목적은 덱을 통째로 복제하는 것이 아니라, JS 를
 * 실행하지 않는 크롤러에게 "이 페이지가 실제로 무엇을 담고 있는지" 보여줄
 * 표본을 주는 것이다. 표본은 카테고리 순서(= 앱의 학습 순서)대로 앞에서 자른다
 * — 무작위로 뽑으면 배포마다 내용이 흔들려 lastmod 와 어긋난다.
 *
 * 가나 덱은 예외로 전량 싣는다. 104자 표는 그 자체가 완결된 참고 자료이고,
 * 잘라 놓으면 오히려 쓸모가 없다.
 */
const SAMPLE_LIMIT = 80

interface KanaItem {
  kana: string
  written?: string
  romaji: string
  meaning?: string
  answer?: string
}
interface DeckData {
  id: string
  label: string
  kind: 'kana' | 'words' | 'sentence' | 'kanji' | 'cloze'
  kana: KanaItem[]
}
interface DeckCategory {
  name: string
  kana: KanaItem[]
}

interface Column {
  head: string
  /** 셀 값. 빈 문자열이면 빈 칸으로 둔다. */
  cell: (k: KanaItem) => string
  /** 일본어 칸 — 문서가 lang="ko" 라서 표시하지 않으면 스크린 리더가 한국어로 읽는다. */
  ja?: boolean
}

/**
 * 덱 종류별 표 열.
 *
 * `written` 은 한자 표기, `kana` 는 그 읽기다(kana.ts 의 Kana 참고). 한자 덱만
 * 규칙이 다르다 — 글자가 `kana` 에, 음·훈 읽기가 `romaji` 에 들어 있다.
 */
function columnsFor(kind: DeckData['kind'], items: KanaItem[], filled: (k: KanaItem) => string): Column[] {
  switch (kind) {
    case 'kana':
      return [
        { head: '글자', cell: (k) => k.kana, ja: true },
        { head: '로마자', cell: (k) => k.romaji },
      ]
    case 'kanji':
      return [
        { head: '한자', cell: (k) => k.kana, ja: true },
        { head: '읽기', cell: (k) => k.romaji, ja: true },
        { head: '뜻', cell: (k) => k.meaning ?? '' },
      ]
    case 'cloze':
      return [
        { head: '문장', cell: filled, ja: true },
        { head: '답', cell: (k) => k.answer ?? '', ja: true },
        { head: '뜻', cell: (k) => k.meaning ?? '' },
      ]
    default: {
      // words·sentence. 읽기 열은 한자 표기가 하나라도 있을 때만 만든다 —
      // 전부 가나로 쓰는 덱(의태어·경어 일부)에서는 일본어 열과 같은 값이 된다.
      const hasWritten = items.some((k) => k.written)
      return [
        { head: '일본어', cell: (k) => k.written ?? k.kana, ja: true },
        ...(hasWritten
          ? [{ head: '읽기', cell: (k: KanaItem) => (k.written ? k.kana : ''), ja: true }]
          : []),
        { head: '로마자', cell: (k) => k.romaji },
        { head: '뜻', cell: (k) => k.meaning ?? '' },
      ]
    }
  }
}

function sampleTable(items: KanaItem[], cols: Column[]): string {
  const head = cols.map((c) => `<th>${esc(c.head)}</th>`).join('')
  const rows = items
    .map((k) => {
      const tds = cols
        .map((c) => {
          const v = c.cell(k)
          if (!v) return '<td></td>'
          return `<td>${c.ja ? `<span lang="ja">${esc(v)}</span>` : esc(v)}</td>`
        })
        .join('')
      return `<tr>${tds}</tr>`
    })
    .join('\n')
  return `<div class="tbl"><table><thead><tr>${head}</tr></thead>\n<tbody>\n${rows}\n</tbody></table></div>`
}

/**
 * 덱 문항을 실제로 담은 정적 블록.
 *
 * 여태 덱 페이지의 프리렌더 본문은 소개 세 문장과 다른 덱 링크가 전부였다 →
 * 11개 페이지가 서로 거의 같은 글이었고, 6,040문항 중 HTML 에 드러난 항목은
 * 0개였다. 크롤러와 AI 검색이 인용할 실체가 없었다는 뜻이다.
 *
 * 카테고리를 h3 로 쪼개는 이유도 같다. 표 하나에 80줄을 몰아넣으면 문서에
 * 경계가 없어서 부분 인용이 어렵다.
 */
function deckSampleHtml(
  deck: DeckData,
  categories: DeckCategory[],
  filled: (k: KanaItem) => string,
): string {
  const total = deck.kana.length
  const limit = deck.kind === 'kana' ? total : SAMPLE_LIMIT

  const groups: DeckCategory[] = []
  let shown = 0
  for (const cat of categories) {
    if (shown >= limit) break
    const items = cat.kana.slice(0, limit - shown)
    if (items.length === 0) continue
    groups.push({ name: cat.name, kana: items })
    shown += items.length
  }
  if (shown === 0) return ''

  const cols = columnsFor(deck.kind, groups.flatMap((g) => g.kana), filled)
  const all = shown >= total
  const label = esc(deck.label)

  // 가나 덱은 행(あ행·か행…)이 카테고리라 h3 로 쪼개면 5줄짜리 표 21개가 된다.
  // 오십음도는 한 장일 때 참고 자료로 쓸모가 있으므로 그대로 붙인다.
  const body =
    deck.kind === 'kana'
      ? sampleTable(
          groups.flatMap((g) => g.kana),
          cols,
        )
      : groups
          .map((g) => `<h3>${esc(g.name)}</h3>\n${sampleTable(g.kana, cols)}`)
          .join('\n')

  const heading = all
    ? `<h2>일본어 <span lang="ja">${label}</span> ${total}개 전체 목록</h2>`
    : `<h2>일본어 <span lang="ja">${label}</span> 목록 — ${total}개 중 ${shown}개</h2>`
  const lead = all
    ? `<p>이 덱의 ${total}개를 학습 순서대로 모두 실었습니다. 아래 표를 먼저 훑고, 앱에서 같은 항목을 4지선다로 반복하면 됩니다.</p>`
    : `<p>전체 ${total}개 가운데 앞선 ${shown}개를 학습 순서대로 실었습니다. 나머지는 앱에서 이어집니다 — 표를 먼저 훑고 같은 항목을 4지선다로 반복하는 순서가 가장 빠릅니다.</p>`

  return `${heading}\n${lead}\n${body}`
}

/** 덱 목록. 첫 덱은 루트 자신이므로 주소가 BASE 다(router.pathOf 와 같은 규칙). */
function deckListHtml(decks: DeckMeta[]): string {
  const items = decks
    .map((d, i) => {
      const href = i === 0 ? BASE : `${BASE}deck/${d.id}/`
      return `<li><a href="${href}"><span lang="ja">${esc(d.label)}</span> ${d.count}개</a></li>`
    })
    .join('\n')
  return `<ul>\n${items}\n</ul>`
}

function weekListHtml(all: CurriculumWeek[]): string {
  const items = all
    .map(
      (w) =>
        `<li><a href="${BASE}guide/week-${w.week}/">${w.week}주차: ${esc(w.title)}</a>` +
        ` — ${esc(w.subtitle)}</li>`,
    )
    .join('\n')
  return `<ul>\n${items}\n</ul>`
}

const BYLINE = (reviewed: string) =>
  `<p class="note">제작·콘텐츠 검수 <strong>kimyoo04</strong> · 학습 콘텐츠 최종 검토 ` +
  `<time datetime="${reviewed}">${reviewed}</time></p>`

/** 홈(루트)의 정적 본문. 화면의 .home-about 문구와 같은 내용을 담는다. */
function homeBody(
  decks: DeckMeta[],
  all: CurriculumWeek[],
  reviewed: string,
  sample: string,
): string {
  const total = decks.reduce((n, d) => n + d.count, 0).toLocaleString('en-US')
  return staticBody(
    `<h1>にほんご Pocket — 폰으로 하는 일본어 독학</h1>
<p>한국어 화자가 일본어를 혼자 시작할 때 필요한 순서대로 짜인 학습 앱입니다.
<span lang="ja">ひらがな</span>·<span lang="ja">カタカナ</span> 104자에서 시작해
단어·외래어·조수사·의태어·문법·회화·경어·한자·빈칸 채우기까지 총 <strong>${total}개</strong>
문항을 간격 반복(SRS)으로 익힙니다. 문항은 출제 간격이 정답률에 따라 벌어지고,
틀린 것만 따로 모아 복습합니다.</p>
<p>설치 없이 브라우저에서 쓰고, 한 번 열어 두면 오프라인에서도 학습이 이어집니다.
학습 기록은 이 기기에만 저장되며 서버로 전송되지 않습니다. 계정도 광고도 없습니다.</p>
<h2>무엇을 배우나요</h2>
${deckListHtml(decks)}
${sample}
<h2>일본어 12주 학습 커리큘럼</h2>
<p>1~8주 N5 기초 한 바퀴, 9~12주 N4 핵심 문형. 주차별 개념을 읽고 바로 퀴즈로 넘어갑니다.</p>
${weekListHtml(all)}
<h2>더 보기</h2>
<ul>
<li><a href="${BASE}guide/">일본어 12주 학습 커리큘럼 전체 목차</a></li>
<li><a href="${BASE}grammar-patterns.html">회화 문법 패턴 56개 정리</a></li>
<li><a href="${BASE}jlpt/">JLPT N5·N4 미니 모의고사</a></li>
<li><a href="https://github.com/kimyoo04/jp-study">만든 사람 · 소스 코드 (GitHub)</a></li>
</ul>
${BYLINE(reviewed)}`,
  )
}

/** 덱 화면의 정적 본문. */
function deckBody(deck: DeckMeta, decks: DeckMeta[], reviewed: string, sample: string): string {
  return staticBody(
    `<h1>일본어 <span lang="ja">${esc(deck.label)}</span> ${deck.count}개 연습</h1>
<p>일본어 <span lang="ja">${esc(deck.label)}</span> ${deck.count}개를 4지선다 퀴즈로 익힙니다.
정답률에 따라 출제 간격이 벌어지는 간격 반복(SRS)이라 이미 외운 항목은 덜 나오고
틀린 항목만 다시 모입니다. 듣고 풀기와 흘려듣기(음성 재생)를 함께 지원하고,
설치 없이 오프라인에서도 이어서 학습합니다.</p>
${sample}
<h2>다른 덱</h2>
${deckListHtml(decks)}
<h2>개념부터 보려면</h2>
<ul>
<li><a href="${BASE}guide/">일본어 12주 학습 커리큘럼</a> — 발음·문형·어휘를 순서대로</li>
<li><a href="${BASE}grammar-patterns.html">회화 문법 패턴 56개 정리</a></li>
</ul>
${BYLINE(reviewed)}`,
  )
}

/** JLPT 모의고사 화면의 정적 본문. */
function jlptBody(
  levels: string[],
  examItems: number,
  bankPerLevel: number,
  reviewed: string,
): string {
  return staticBody(
    `<h1>JLPT ${levels.join('·')} 미니 모의고사</h1>
<p>JLPT ${levels.join('·')} 네 레벨의 미니 모의고사입니다. 한 번에 ${examItems}문항을
실제 시험과 같은 네 파트로 나눠 출제하고, 문항은 레벨별 ${bankPerLevel}문항 은행에서
뽑습니다 — 다시 풀면 문항과 선택지 순서가 바뀝니다. 풀고 나면 파트별 점수와 가장
약한 파트를 알려주고, 그 파트에 해당하는 학습 덱으로 바로 이어집니다. 계정 없이
브라우저에서 바로 풀리고 중간에 나가도 진행 상황이 남습니다.</p>
<h2>출제 파트</h2>
<ul>
<li><strong>문자·어휘</strong> (<span lang="ja">文字・語彙</span>) — 한자 읽기, 표기, 문맥 규정, 유의 표현</li>
<li><strong>문법</strong> (<span lang="ja">文法</span>) — 문법 형식 판단(빈칸)과 문장 조립</li>
<li><strong>독해</strong> (<span lang="ja">読解</span>) — 지문을 읽고 딸린 문제를 푸는 형식</li>
<li><strong>청해</strong> (<span lang="ja">聴解</span>) — 일본어 음성으로 듣고 푸는 형식</li>
</ul>
<h2>이어서 학습하기</h2>
<ul>
<li><a href="${BASE}">にほんご Pocket 앱 — 덱 고르기</a></li>
<li><a href="${BASE}guide/">일본어 12주 학습 커리큘럼</a></li>
<li><a href="${BASE}grammar-patterns.html">회화 문법 패턴 56개 정리</a></li>
</ul>
${BYLINE(reviewed)}`,
  )
}

/**
 * canonical 이 다른 곳(/guide/…)을 가리키는 화면의 정적 본문.
 * 색인 대표가 아니므로 본문을 복제하지 않고 대표 주소로만 보낸다.
 */
function proxyBody(heading: string, lead: string, target: string, targetLabel: string): string {
  return staticBody(
    `<h1>${esc(heading)}</h1>
<p>${esc(lead)}</p>
<p><a href="${target}">${esc(targetLabel)}</a></p>`,
  )
}

/**
 * index.html 의 정적 JSON-LD 가 코드에서 계산한 값과 어긋나지 않는지 확인한다.
 *
 * 그 블록은 JS 없이 읽혀야 하므로 손으로 쓴 상수다 → 덱을 늘리거나 JLPT 레벨을
 * 추가하면 조용히 낡는다. 실제로 n3·n2 를 추가했는데 educationalLevel 이
 * 'JLPT N5-N4' 로 남아 있었다. 빌드를 멈춰서 알린다.
 */
function verifyStaticSchema(
  html: string,
  facts: { totalItems: number; topLevel: string; reviewed: string },
): void {
  const block = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html)?.[1]
  if (!block) throw new Error('verifyStaticSchema: index.html 에 JSON-LD 가 없다')

  const schema = JSON.parse(block) as {
    description?: string
    educationalLevel?: string
    dateModified?: string
    teaches?: string[]
  }
  const total = facts.totalItems.toLocaleString('en-US')
  const problems: string[] = []

  if (!schema.description?.includes(total)) {
    problems.push(`description 에 전체 문항 수(${total})가 없다`)
  }
  if (!schema.description?.includes(facts.topLevel)) {
    problems.push(`description 에 최상위 JLPT 레벨(${facts.topLevel})이 없다`)
  }
  if (!schema.educationalLevel?.endsWith(facts.topLevel)) {
    problems.push(
      `educationalLevel 이 '${schema.educationalLevel}' — ${facts.topLevel} 로 끝나야 한다`,
    )
  }
  if (!schema.teaches?.includes(`JLPT ${facts.topLevel}`)) {
    problems.push(`teaches 에 'JLPT ${facts.topLevel}' 이 없다`)
  }
  if (schema.dateModified !== facts.reviewed) {
    problems.push(`dateModified 가 '${schema.dateModified}' — CONTENT_REVIEWED(${facts.reviewed})와 다르다`)
  }
  if (problems.length > 0) {
    throw new Error(
      `verifyStaticSchema: index.html 의 JSON-LD 가 낡았다 —\n  - ${problems.join('\n  - ')}`,
    )
  }
}

/** dist/index.html 을 템플릿으로, 라우트에 맞는 head 값으로 갈아끼운 사본을 만든다. */
function routeHtml(template: string, meta: PageMeta, body: string): string {
  const swap = (html: string, pattern: RegExp, replacement: string) => {
    if (!pattern.test(html)) {
      throw new Error(`routeHtml: index.html 에서 ${pattern} 을 찾지 못했다`)
    }
    return html.replace(pattern, replacement)
  }

  let html = swap(template, /<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`)
  html = swap(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${esc(meta.description)}" />`,
  )
  html = swap(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${esc(meta.canonical)}" />`,
  )
  for (const [attr, key] of [
    ['property="og:title"', 'title'],
    ['property="og:description"', 'description'],
    ['property="og:url"', 'canonical'],
    ['name="twitter:title"', 'title'],
    ['name="twitter:description"', 'description'],
  ] as const) {
    html = swap(
      html,
      new RegExp(`<meta\\s+${attr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+content="[^"]*"\\s*\\/>`),
      `<meta ${attr} content="${esc(meta[key])}" />`,
    )
  }
  return swap(html, /<div id="root"><\/div>/, `<div id="root">${body}</div>`)
}

export function guidePages(): Plugin {
  let config: ResolvedConfig

  return {
    name: 'seo-static-pages',
    apply: 'build',
    configResolved(resolved) {
      config = resolved
    },
    async closeBundle() {
      // 앱 소스를 그대로 SSR 로드한다 → Markdown 파서가 한 벌로 유지된다.
      // apply:'build' 라서 이 중첩 서버에는 이 플러그인이 붙지 않는다(재귀 없음).
      const server = await createServer({
        configFile: false,
        root: config.root,
        logLevel: 'error',
        appType: 'custom',
        // router/meta 는 import.meta.env.BASE_URL 로 경로를 만든다. 여기서 base 를
        // 맞추지 않으면 '/' 가 들어와 경로와 canonical 이 조용히 어긋난다.
        base: BASE,
        server: { middlewareMode: true },
        // 의존성 사전 번들링은 필요 없다. 켜두면 스캔이 서버 종료와 경합해서
        // "Request is outdated" 로 빌드를 실패시킨다.
        optimizeDeps: { noDiscovery: true, include: [] },
      })
      try {
        const { CURRICULUM } = (await server.ssrLoadModule('/src/data/curriculum.ts')) as {
          CURRICULUM: CurriculumWeek[]
        }
        // Markdown 은 훅이 없는 순수 컴포넌트라 정적 렌더가 안전하다.
        // react / react-dom/server 는 CJS 이므로 ssrLoadModule 이 아니라 직접 import.
        const { Markdown } = (await server.ssrLoadModule('/src/components/Markdown.tsx')) as {
          Markdown: (props: { source: string }) => never
        }

        const outDir = resolve(config.root, config.build.outDir)
        const guideDir = resolve(outDir, 'guide')
        mkdirSync(guideDir, { recursive: true })

        const guidePaths: string[] = [`${BASE}guide/`]
        writeFileSync(resolve(guideDir, 'index.html'), indexPage(CURRICULUM))

        for (const week of CURRICULUM) {
          const rendered = week.pages.map((page) =>
            renderToStaticMarkup(createElement(Markdown, { source: page.body })),
          )
          const dir = resolve(guideDir, `week-${week.week}`)
          mkdirSync(dir, { recursive: true })
          writeFileSync(resolve(dir, 'index.html'), weekPage(week, rendered, CURRICULUM))
          guidePaths.push(`${BASE}guide/week-${week.week}/`)
        }
        const { JLPT_LEVELS, JLPT_POOL } = (await server.ssrLoadModule(
          '/src/data/jlpt/index.ts',
        )) as {
          JLPT_LEVELS: string[]
          JLPT_POOL: { level: string; part: string; questions?: unknown[] }[]
        }
        const { EXAM_PLAN, EXAM_READING_PASSAGES } = (await server.ssrLoadModule(
          '/src/lib/jlpt.ts',
        )) as {
          EXAM_PLAN: Record<string, number>
          EXAM_READING_PASSAGES: number
        }
        // 한 회차 채점 문항 수. 독해는 지문 하나에 딸린 하위 문제가 각각 1문항이다.
        // 은행 크기(레벨당 전체)와 다르므로 둘을 따로 센다 — 하나로 뭉치면 본문이
        // "54문항 출제"라고 거짓말한다.
        const jlptBank = JLPT_POOL.filter((q) => q.level === JLPT_LEVELS[0])
        const readingSubs = jlptBank
          .filter((q) => q.part === 'reading')
          .slice(0, EXAM_READING_PASSAGES)
          .reduce((n, q) => n + (q.questions?.length ?? 0), 0)
        const jlptExamItems =
          Object.values(EXAM_PLAN).reduce((a, b) => a + b, 0) + readingSubs

        // 덱 메타는 동기다 — 라우팅·제목·사이트맵은 이것만으로 돌아간다.
        const { DECK_META, loadDeck } = (await server.ssrLoadModule('/src/data/decks.ts')) as {
          DECK_META: DeckMeta[]
          loadDeck: (id: string) => Promise<DeckData>
        }
        const decks = DECK_META

        // 문항 데이터는 정적 본문에 표본을 실으려고 여기서만 읽는다. 브라우저
        // 번들에는 영향이 없다 — 앱은 여전히 화면에 필요할 때 청크를 받는다.
        const { deckCategories, clozeFilled } = (await server.ssrLoadModule(
          '/src/data/kana.ts',
        )) as {
          deckCategories: (d: DeckData) => DeckCategory[]
          clozeFilled: (k: KanaItem) => string
        }
        const samples = new Map<string, string>()
        for (const meta of decks) {
          const data = await loadDeck(meta.id)
          if (data.kana.length !== meta.count) {
            throw new Error(
              `seo-static-pages: ${meta.id} 문항 수가 메타(${meta.count})와 다르다 — ${data.kana.length}`,
            )
          }
          samples.set(meta.id, deckSampleHtml(data, deckCategories(data), clozeFilled))
        }

        // ── 앱 라우트별 정적 HTML ──────────────────────────────────────────
        const { pathOf } = (await server.ssrLoadModule('/src/lib/router.ts')) as {
          pathOf: (loc: unknown) => string
        }
        const { metaFor, CONTENT_REVIEWED, TOTAL_ITEMS } = (await server.ssrLoadModule(
          '/src/lib/meta.ts',
        )) as {
          metaFor: (loc: unknown) => PageMeta
          CONTENT_REVIEWED: string
          TOTAL_ITEMS: number
        }

        /** 라우트별 정적 본문. 색인 대표가 아닌 화면은 대표 주소로 보낸다. */
        const bodyFor = (loc: { screen: string; deckId?: string; week?: number }): string => {
          switch (loc.screen) {
            case 'home': {
              const deck = decks.find((d) => d.id === loc.deckId)
              if (!deck) throw new Error(`bodyFor: 모르는 덱 ${loc.deckId}`)
              const sample = samples.get(deck.id) ?? ''
              return deck.id === decks[0].id
                ? homeBody(decks, CURRICULUM, CONTENT_REVIEWED, sample)
                : deckBody(deck, decks, CONTENT_REVIEWED, sample)
            }
            case 'jlpt-home':
              return jlptBody(JLPT_LEVELS, jlptExamItems, jlptBank.length, CONTENT_REVIEWED)
            case 'learn':
              return proxyBody(
                '일본어 12주 학습 커리큘럼',
                '1~8주 N5 기초 한 바퀴, 9~12주 N4 핵심 문형. 주차별 개념 설명은 정적 문서에 있습니다.',
                `${BASE}guide/`,
                '커리큘럼 전체 목차 보기',
              )
            case 'learn-reader': {
              const week = CURRICULUM.find((w) => w.week === loc.week)
              return proxyBody(
                `${loc.week}주차${week ? `: ${week.title}` : ''}`,
                week ? `${week.subtitle}. 이번 주 목표: ${week.goal}` : '주차별 개념 정리.',
                `${BASE}guide/week-${loc.week}/`,
                `${loc.week}주차 본문 읽기`,
              )
            }
            case 'search':
              return proxyBody(
                '검색',
                '히라가나·카타카나·한자·단어·회화 문형을 한국어 뜻이나 발음으로 찾습니다. 검색은 앱에서 동작합니다.',
                BASE,
                'にほんご Pocket 앱 열기',
              )
            default:
              throw new Error(`bodyFor: 모르는 화면 ${loc.screen}`)
          }
        }

        const locations = [
          { screen: 'search' },
          { screen: 'learn' },
          { screen: 'jlpt-home' },
          // 첫 덱은 루트 자신 — index.html 을 아래에서 따로 손본다.
          ...decks.slice(1).map((d) => ({ screen: 'home', deckId: d.id })),
          ...CURRICULUM.map((w) => ({ screen: 'learn-reader', week: w.week })),
        ]

        // 템플릿을 먼저 읽는다 — 아래에서 index.html 자체를 덮어쓴다.
        const template = readFileSync(resolve(outDir, 'index.html'), 'utf8')
        verifyStaticSchema(template, {
          totalItems: TOTAL_ITEMS,
          topLevel: JLPT_LEVELS[JLPT_LEVELS.length - 1],
          reviewed: CONTENT_REVIEWED,
        })
        for (const loc of locations) {
          const path = pathOf(loc) // 예: /jp-study/deck/kanji
          if (!path.startsWith(BASE)) {
            throw new Error(`seo-static-pages: pathOf 가 base 밖의 경로를 냈다: ${path}`)
          }
          const dir = resolve(outDir, path.slice(BASE.length))
          mkdirSync(dir, { recursive: true })
          writeFileSync(resolve(dir, 'index.html'), routeHtml(template, metaFor(loc), bodyFor(loc)))
        }

        // 홈. head 는 index.html 이 이미 홈 기준이라 본문만 채운다.
        // spaFallback() 이 이 파일을 404.html 로 복사하므로 그 사본도 함께 채워진다.
        const home = { screen: 'home', deckId: decks[0].id }
        writeFileSync(
          resolve(outDir, 'index.html'),
          routeHtml(template, metaFor(home), bodyFor(home)),
        )

        writeFileSync(
          resolve(outDir, 'sitemap.xml'),
          sitemapXml(config.root, guidePaths, decks.map((d) => d.id)),
        )
        config.logger.info(
          `seo-static-pages: ${guidePaths.length} guide pages, ` +
            `${locations.length + 1} route pages, sitemap written`,
        )
      } finally {
        await server.close()
      }
    },
  }
}
