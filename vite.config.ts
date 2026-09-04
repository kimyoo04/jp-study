/// <reference types="vitest/config" />
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { guidePages } from './scripts/guide-plugin'

// GitHub Pages serves this repo under /jp-study/.
// Every PWA path (base, SW scope, manifest start_url/scope) must carry that prefix.
const BASE = '/jp-study/'

/**
 * GitHub Pages has no rewrite rules: a request for /jp-study/learn/week-3 hits
 * the filesystem, misses, and 404s. Pages serves 404.html for every miss, so a
 * copy of index.html there boots the SPA and the router reads the real path.
 */
function spaFallback(): Plugin {
  let outDir = 'dist'
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    VitePWA({
      // 'prompt': the new SW waits; the app applies it from the Home banner
      // (autoUpdate would reload the page mid-lesson and lose quiz state).
      registerType: 'prompt',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'にほんご Pocket',
        short_name: 'にほんご',
        description: '폰으로 하는 일본어 독학 — 히라가나부터',
        lang: 'ko',
        start_url: BASE,
        scope: BASE,
        display: 'standalone',
        background_color: '#0f1020',
        theme_color: '#0f1020',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        // 스토어형 설치 UI(Chrome 리치 설치 프롬프트, Play Store PWA 등록)가
        // 요구하는 항목. 없으면 설치 배너가 최소 형태로만 뜬다.
        categories: ['education', 'books'],
        screenshots: [
          {
            src: 'screenshot-home.png',
            sizes: '1080x1920',
            type: 'image/png',
            form_factor: 'narrow',
            label: '덱을 고르고 오늘의 레슨을 시작하는 홈 화면',
          },
          {
            src: 'screenshot-lesson.png',
            sizes: '1080x1920',
            type: 'image/png',
            form_factor: 'narrow',
            label: '한자 카드를 4지선다로 푸는 레슨 화면',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,mp3}'],
        // spaFallback() writes 404.html before generateSW globs the output, so
        // exclude it: it is a byte-for-byte copy of the already-precached
        // index.html and only exists for GitHub Pages' miss handler.
        // 404.html: index.html 과 바이트 동일한 복사본.
        // guide/**: 정적 콘텐츠 문서. 앱 오프라인 학습은 /learn 화면이 담당하므로
        //   설치 용량을 176KB 늘리면서 중복 precache 할 이유가 없다.
        // og-image.jpg 는 globPatterns 에 jpg 가 없어서 애초에 잡히지 않는다 —
        //   공유 미리보기 전용이고 앱 화면에 안 쓰이므로 그대로 둔다.
        // 라우트별 사본(deck/**, learn/**, jlpt/**, search/**)은 GitHub Pages 가
        // 200 을 주게 하려고 두는 것뿐이다. 오프라인 내비게이션은 SW 의
        // NavigationRoute 가 index.html 로 처리하므로 precache 할 필요가 없다.
        globIgnores: [
          '404.html',
          'guide/**',
          'screenshot-*.png',
          'deck/**',
          'learn/**',
          'jlpt/**',
          'search/**',
        ],
      },
    }),
    // 정적 커리큘럼 페이지를 먼저 굽고(spaFallback 은 index.html 만 복사한다),
    // 그 다음 404 fallback. 둘 다 generateSW 앞에서 돌므로 globIgnores 로 걸러진다.
    guidePages(),
    spaFallback(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['e2e/**', 'node_modules/**'],
  },
})
