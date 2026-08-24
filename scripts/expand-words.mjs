import { readFile, writeFile, readdir } from 'node:fs/promises'
import { request } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

function generate(body) {
  return new Promise((resolve, reject) => {
    const req = request('http://127.0.0.1:11434/api/generate', {
      method: 'POST', headers: { 'content-type': 'application/json' },
    }, (res) => {
      let data = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => res.statusCode === 200 ? resolve(JSON.parse(data)) : reject(new Error(data)))
    })
    req.on('error', reject)
    req.end(JSON.stringify(body))
  })
}

const [sourceDir, mode = 'words'] = process.argv.slice(2)
if (!sourceDir) throw new Error('usage: node scripts/expand-words.mjs <hanabira-json-data-dir> [words|loanwords]')
const config = {
  words: {
    count: 608, pattern: /^[ぁ-ゖー]{2,16}$/, checkpoint: 'jp-study-word-expansion-gemma27b-v2.json',
    output: 'words-expanded.ts', exportName: 'WORD_EXPANSION_ROWS', levels: ['N4', 'N3', 'N2'],
  },
  loanwords: {
    count: 349, pattern: /^[ァ-ヺー]{2,24}$/, checkpoint: 'jp-study-loanword-expansion-gemma27b-v1.json',
    output: 'loanwords-expanded.ts', exportName: 'LOANWORD_EXPANSION_ROWS', levels: ['N4', 'N3', 'N2', 'N1'],
  },
}[mode]
if (!config) throw new Error(`unsupported mode: ${mode}`)

const dataDir = new URL('../src/data/', import.meta.url)
const dataFiles = (await readdir(dataDir)).filter((name) =>
  name.endsWith('.ts') && !name.endsWith('.test.ts') && !name.includes('-expanded'))
const allData = (await Promise.all(dataFiles.map((name) => readFile(new URL(name, dataDir), 'utf8')))).join('\n')
const existing = new Set([...allData.matchAll(/\{ kana: '([^']+)'/g)].map((m) => m[1]))
const candidates = []
for (const level of config.levels) {
  const rows = JSON.parse(await readFile(`${sourceDir}/wordsTanos_openai_JLPT_${level}_tanos_vocab_list.json`, 'utf8'))
  for (const row of rows) {
    const kana = row.vocabulary_simplified?.trim()
    const written = row.vocabulary_original?.trim()
    const english = row.vocabulary_english?.trim()
    if (!kana || !english || existing.has(kana) || candidates.some((x) => x.kana === kana)) continue
    if (!config.pattern.test(kana)) continue
    candidates.push({ kana, written: written !== kana ? written : undefined, english, level })
    if (candidates.length === config.count) break
  }
  if (candidates.length === config.count) break
}
if (mode === 'loanwords' && candidates.length < config.count) {
  const supplemental = [
    ['アーカイブ', 'archive'], ['アクセス', 'access'], ['アップデート', 'update'],
    ['アルゴリズム', 'algorithm'], ['インストール', 'install'], ['インターフェース', 'interface'],
    ['ウェブサイト', 'website'], ['キャッシュ', 'cache'], ['クラウド', 'cloud computing'],
    ['サーバー', 'server'], ['セキュリティ', 'security'], ['ソフトウェア', 'software'],
    ['データベース', 'database'], ['デジタル', 'digital'], ['ネットワーク', 'network'],
    ['バックアップ', 'backup'], ['ブラウザー', 'web browser'], ['プラグイン', 'plugin'],
    ['プラットフォーム', 'platform'], ['プログラミング', 'programming'], ['リモート', 'remote'],
    ['ログアウト', 'log out'], ['ユーザー', 'user'], ['フォルダー', 'folder'],
    ['ルーター', 'router'], ['メモリー', 'computer memory'], ['プロセッサー', 'processor'],
  ]
  for (const [kana, english] of supplemental) {
    if (existing.has(kana) || candidates.some((x) => x.kana === kana)) continue
    candidates.push({ kana, english, level: 'supplemental' })
    if (candidates.length === config.count) break
  }
}
if (candidates.length !== config.count) throw new Error(`needed ${config.count} candidates, found ${candidates.length}`)

const checkpoint = join(tmpdir(), config.checkpoint)
let translated = []
try { translated = JSON.parse(await readFile(checkpoint, 'utf8')) } catch {}
for (let offset = translated.length; offset < candidates.length; offset += 32) {
  const batch = candidates.slice(offset, offset + 32)
  const prompt = `다음 일본어 JLPT 어휘를 한국인 학습자용 카드로 번역하세요. kana는 입력과 같은 순서로 그대로 복사하고, meaning은 영어 뜻을 바탕으로 간결하고 정확한 한국어만 사용하세요. 외국어·한자·로마자는 meaning에 절대 쓰지 마세요. 여러 핵심 뜻은 ' / '로 구분하세요. 설명 없이 JSON 배열만 반환하세요.\n${JSON.stringify(batch)}`
  const payload = await generate({
      model: 'gemma3:27b', prompt, stream: false, options: { temperature: 0 },
      format: {
        type: 'array', minItems: batch.length, maxItems: batch.length,
        items: {
          type: 'object', required: ['kana', 'meaning'], additionalProperties: false,
          properties: { kana: { type: 'string' }, meaning: { type: 'string' } },
        },
      },
  })
  const parsed = JSON.parse(payload.response)
  const items = Array.isArray(parsed)
    ? parsed
    : (parsed.items ?? parsed.words ?? parsed.vocabulary ?? Object.values(parsed).find(Array.isArray))
  if (!Array.isArray(items) || items.length !== batch.length) {
    throw new Error(`bad model batch at ${offset}: ${payload.response.slice(0, 500)}`)
  }
  for (let i = 0; i < batch.length; i++) {
    const item = items[i]
    if (item.kana !== batch[i].kana || !item.meaning || !/[가-힣]/.test(item.meaning)
      || /[A-Za-z\u0400-\u04ff\u4e00-\u9fff\u0E00-\u0E7F\u0100-\u024F]/.test(item.meaning)) {
      throw new Error(`bad item at ${offset + i}: ${JSON.stringify(item)}`)
    }
    translated.push({ ...batch[i], meaning: item.meaning })
  }
  await writeFile(checkpoint, JSON.stringify(translated))
  process.stdout.write(`translated ${translated.length}/${config.count}\n`)
}

const esc = (s) => s.replaceAll('\\', '\\\\').replaceAll("'", "\\'")
const py = spawnSync('/tmp/jp-study-kakasi/bin/python', [new URL('./romanize_words.py', import.meta.url).pathname], {
  input: JSON.stringify(translated.map((x) => x.kana)), encoding: 'utf8',
})
if (py.status !== 0) throw new Error(`romanizer failed: ${py.stderr}`)
const romaji = JSON.parse(py.stdout)
const lines = [
  "// Generated from the Hanabira JLPT vocabulary lists, then translated and romanized locally.",
  "// Kept separate from the curated core list so the expansion remains auditable.",
  "import type { Kana } from './kana'", '',
  `export const ${config.exportName}: Kana[][] = [`,
]
for (let i = 0; i < translated.length; i += 8) {
  lines.push('  [')
  for (const [j, x] of translated.slice(i, i + 8).entries()) {
    const written = x.written ? `, written: '${esc(x.written)}'` : ''
    lines.push(`    { kana: '${esc(x.kana)}'${written}, romaji: '${esc(romaji[i + j])}', meaning: '${esc(x.meaning)}' },`)
  }
  lines.push('  ],')
}
lines.push(']', '')
await writeFile(new URL(`../src/data/${config.output}`, import.meta.url), lines.join('\n'))
