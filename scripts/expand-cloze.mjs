import { readFile, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'

const sourceUrl = new URL('../src/data/cloze.ts', import.meta.url)
const outputUrl = new URL('../src/data/cloze-expanded.ts', import.meta.url)
const source = await readFile(sourceUrl, 'utf8')
const base = source.split('\n').flatMap((line) => {
  if (!line.includes('{ kana:')) return []
  const fields = Object.fromEntries([...line.matchAll(/(kana|meaning|note|answer): '((?:\\'|[^'])*)'/g)]
    .map((match) => [match[1], match[2].replaceAll("\\'", "'")]))
  const choices = line.match(/choices: \[([^\]]+)\]/)?.[1]
    .split(',').map((value) => value.trim().replace(/^'|'$/g, ''))
  return fields.kana && fields.meaning && fields.note && fields.answer && choices?.length === 3
    ? [{ ...fields, choices }]
    : []
})
if (!base.length) throw new Error('no cloze cards parsed')

const speakers = [
  ['たなかさん', '다나카 씨'], ['せんせい', '선생님'], ['ともだち', '친구'],
  ['ちち', '아버지'], ['はは', '어머니'], ['やまださん', '야마다 씨'],
  ['てんいんさん', '점원'], ['がくせい', '학생'],
]
const expanded = base.map((item, index) => {
  const [speaker, speakerMeaning] = speakers[index % speakers.length]
  return {
    ...item,
    kana: `${speaker}は「${item.kana}」と いいました`,
    meaning: `${speakerMeaning}는 “${item.meaning}”라고 말했습니다`,
  }
})

const canonical = (value) => value.replace(/[ァ-ヶ]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0x60))
  .replace(/[ 、。！？!?「」]/g, '')
const baseKeys = new Set(base.map((item) => canonical(item.kana)))
const expansionKeys = expanded.map((item) => canonical(item.kana))
if (new Set(expansionKeys).size !== expanded.length) throw new Error('duplicate expanded cloze keys')
if (expansionKeys.some((key) => baseKeys.has(key))) throw new Error('expanded cloze collides with base')
for (const item of expanded) {
  if (item.kana.split('◯◯').length - 1 !== 1) throw new Error(`bad blank: ${item.kana}`)
  if (item.choices.length !== 3 || new Set(item.choices).size !== 3 || item.choices.includes(item.answer)) {
    throw new Error(`bad choices: ${item.kana}`)
  }
}

const filled = expanded.map((item) => item.kana.replace('◯◯', item.answer))
const romanized = spawnSync('/tmp/jp-study-kakasi/bin/python', [new URL('./romanize_words.py', import.meta.url).pathname], {
  input: JSON.stringify(filled), encoding: 'utf8',
})
if (romanized.status !== 0) throw new Error(`romanizer failed: ${romanized.stderr}`)
const romaji = JSON.parse(romanized.stdout)
const quote = (value) => value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")
const notes = [...new Set(base.map((item) => item.note))]
const lines = [
  '// Deterministically derived as one reported-speech problem per curated cloze card.',
  "import type { Kana } from './kana'", '', 'export const CLOZE_EXPANSION_ROWS: Kana[][] = [',
]
for (const note of notes) {
  lines.push('  [')
  for (let index = 0; index < expanded.length; index++) {
    const item = expanded[index]
    if (item.note !== note) continue
    const choices = item.choices.map((choice) => `'${quote(choice)}'`).join(', ')
    lines.push(`    { kana: '${quote(item.kana)}', romaji: '${quote(romaji[index])}', meaning: '${quote(item.meaning)}', note: '${quote(note)}', answer: '${quote(item.answer)}', choices: [${choices}] },`)
  }
  lines.push('  ],')
}
lines.push(']', '')
await writeFile(outputUrl, lines.join('\n'))
process.stdout.write(`wrote ${expanded.length} cloze expansion cards\n`)
