// 라우트별 document 메타 적용.
//
// CSR 앱이라 Googlebot이 렌더링한 스냅샷과 링크 공유 미리보기가 같은 <head>를
// 본다. 화면이 바뀔 때 title·description·canonical·og:*를 같이 갱신해 두면
// 두 경로 모두 화면에 맞는 정보를 얻는다.
import { DECKS } from '../data/kana'
import { CURRICULUM } from '../data/curriculum'
import { pathOf, type Location } from './router'

export const ORIGIN = 'https://kimyoo04.github.io'
export const SITE_NAME = 'にほんご Pocket'
export const OG_IMAGE = `${ORIGIN}/jp-study/og-image.png`

export interface PageMeta {
  title: string
  description: string
  /** 절대 URL. 색인 대표 주소. */
  canonical: string
}

/** 주차 개념 학습은 빌드 시 생성한 정적 페이지(/guide/week-N/)가 색인 대표다. */
export function guidePath(week: number): string {
  return `/jp-study/guide/week-${week}/`
}

export function metaFor(loc: Location): PageMeta {
  const abs = (path: string) => `${ORIGIN}${path}`

  switch (loc.screen) {
    case 'home': {
      const deck = DECKS.find((d) => d.id === loc.deckId) ?? DECKS[0]
      const isRoot = loc.deckId === DECKS[0].id
      return {
        title: isRoot
          ? `${SITE_NAME} — 폰으로 하는 일본어 독학`
          : `${deck.label} ${deck.kana.length}개 연습 — ${SITE_NAME}`,
        description: isRoot
          ? '히라가나·카타카나부터 한자·문법·경어·JLPT까지, 폰 한 손으로 하는 일본어 독학 앱. 6,000개 이상 문항을 간격 반복(SRS)으로 익히고 오프라인에서도 학습합니다.'
          : `일본어 ${deck.label} ${deck.kana.length}개를 간격 반복(SRS) 퀴즈로 익힙니다. 듣기 모드와 흘려듣기를 함께 지원합니다.`,
        canonical: abs(pathOf(loc)),
      }
    }
    case 'search':
      return {
        title: `검색 — ${SITE_NAME}`,
        description:
          '히라가나·카타카나·한자·단어·회화 문형을 한국어 뜻이나 발음으로 바로 찾습니다. 6,000개 이상 학습 항목을 한 번에 검색합니다.',
        canonical: abs(pathOf(loc)),
      }
    case 'learn':
      return {
        title: `일본어 12주 학습 커리큘럼 — ${SITE_NAME}`,
        description:
          '1~8주 N5 기초 한 바퀴, 9~12주 N4 핵심 문형. 주차별로 발음·문형·어휘 개념을 읽고 바로 퀴즈로 넘어갑니다.',
        canonical: abs('/jp-study/guide/'),
      }
    case 'learn-reader': {
      const week = CURRICULUM.find((w) => w.week === loc.week)
      return {
        title: week
          ? `${week.week}주차: ${week.title} — 일본어 12주 커리큘럼`
          : `일본어 12주 학습 커리큘럼 — ${SITE_NAME}`,
        description: week ? `${week.subtitle}. 목표: ${week.goal}` : '일본어 12주 학습 커리큘럼.',
        canonical: abs(guidePath(loc.week)),
      }
    }
    case 'jlpt-home':
      return {
        title: `JLPT 모의고사 (N5·N4) — ${SITE_NAME}`,
        description:
          'JLPT N5·N4 문자어휘·문법·독해·듣기 미니 모의고사. 파트별 점수와 약점 파트를 바로 확인하고 해당 덱으로 이어서 학습합니다.',
        canonical: abs(pathOf(loc)),
      }
  }
}

/** <head>의 해당 태그를 만들거나 값만 갈아끼운다. */
function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

export function applyMeta(meta: PageMeta): void {
  document.title = meta.title

  setTag(
    'meta[name="description"]',
    () => Object.assign(document.createElement('meta'), { name: 'description' }),
    'content',
    meta.description,
  )
  setTag(
    'link[rel="canonical"]',
    () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
    'href',
    meta.canonical,
  )

  const og: Record<string, string> = {
    'og:type': 'website',
    'og:site_name': SITE_NAME,
    'og:locale': 'ko_KR',
    'og:title': meta.title,
    'og:description': meta.description,
    'og:url': meta.canonical,
    'og:image': OG_IMAGE,
  }
  for (const [property, content] of Object.entries(og)) {
    setTag(
      `meta[property="${property}"]`,
      () => {
        const el = document.createElement('meta')
        el.setAttribute('property', property)
        return el
      },
      'content',
      content,
    )
  }

  const twitter: Record<string, string> = {
    'twitter:card': 'summary_large_image',
    'twitter:title': meta.title,
    'twitter:description': meta.description,
    'twitter:image': OG_IMAGE,
  }
  for (const [name, content] of Object.entries(twitter)) {
    setTag(
      `meta[name="${name}"]`,
      () => Object.assign(document.createElement('meta'), { name }),
      'content',
      content,
    )
  }
}
