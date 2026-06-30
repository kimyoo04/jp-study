/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages serves this repo under /jp-study/.
// Every PWA path (base, SW scope, manifest start_url/scope) must carry that prefix.
const BASE = '/jp-study/'

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
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,mp3}'],
      },
    }),
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
