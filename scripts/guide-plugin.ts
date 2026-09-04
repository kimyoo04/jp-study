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

/** 정적 문서용 스타일. 앱 번들과 무관하게 JS 없이 그대로 읽히도록 인라인한다. */
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
.md-callout{margin:0 0 16px;padding:14px 16px;background:#f0ebe0;border-left:3px solid var(--blue);border-radius:0 10px 10px 0}
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
<meta property="og:image" content="${ORIGIN}${BASE}og-image.png" />
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

/** 덱 내용을 담은 소스. 가나 두 덱만 kana.ts 를 공유하고 나머지는 이름이 같다. */
function deckSources(id: string): string[] {
  if (id === 'hiragana' || id === 'katakana') return ['src/data/kana.ts']
  return [`src/data/${id}.ts`, `src/data/${id}-expanded.ts`]
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
    { path: BASE, sources: ['src/components/Home.tsx', 'src/data/kana.ts'] },
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

/** dist/index.html 을 템플릿으로, 라우트에 맞는 head 값으로 갈아끼운 사본을 만든다. */
function routeHtml(template: string, meta: PageMeta): string {
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
  return html
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
        const { DECKS } = (await server.ssrLoadModule('/src/data/kana.ts')) as {
          DECKS: { id: string }[]
        }

        // ── 앱 라우트별 정적 HTML ──────────────────────────────────────────
        const { pathOf } = (await server.ssrLoadModule('/src/lib/router.ts')) as {
          pathOf: (loc: unknown) => string
        }
        const { metaFor } = (await server.ssrLoadModule('/src/lib/meta.ts')) as {
          metaFor: (loc: unknown) => PageMeta
        }

        const locations: unknown[] = [
          { screen: 'search' },
          { screen: 'learn' },
          { screen: 'jlpt-home' },
          // 첫 덱은 루트 자신 — index.html 이 이미 그 메타를 갖고 있다.
          ...DECKS.slice(1).map((d) => ({ screen: 'home', deckId: d.id })),
          ...CURRICULUM.map((w) => ({ screen: 'learn-reader', week: w.week })),
        ]

        const template = readFileSync(resolve(outDir, 'index.html'), 'utf8')
        for (const loc of locations) {
          const path = pathOf(loc) // 예: /jp-study/deck/kanji
          if (!path.startsWith(BASE)) {
            throw new Error(`seo-static-pages: pathOf 가 base 밖의 경로를 냈다: ${path}`)
          }
          const dir = resolve(outDir, path.slice(BASE.length))
          mkdirSync(dir, { recursive: true })
          writeFileSync(resolve(dir, 'index.html'), routeHtml(template, metaFor(loc)))
        }

        writeFileSync(
          resolve(outDir, 'sitemap.xml'),
          sitemapXml(config.root, guidePaths, DECKS.map((d) => d.id)),
        )
        config.logger.info(
          `seo-static-pages: ${guidePaths.length} guide pages, ` +
            `${locations.length} route pages, sitemap written`,
        )
      } finally {
        await server.close()
      }
    },
  }
}
