import { readFile, writeFile } from 'node:fs/promises'
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

const [mode = 'grammar'] = process.argv.slice(2)
const config = {
  grammar: { source: 'grammar.ts', output: 'grammar-expanded.ts', exportName: 'GRAMMAR_EXPANSION_ROWS' },
  phrases: { source: 'phrases.ts', output: 'phrases-expanded.ts', exportName: 'PHRASE_EXPANSION_ROWS' },
  keigo: { source: 'keigo.ts', output: 'keigo-expanded.ts', exportName: 'KEIGO_EXPANSION_ROWS' },
}[mode]
if (!config) throw new Error(`unsupported mode: ${mode}`)

const source = await readFile(new URL(`../src/data/${config.source}`, import.meta.url), 'utf8')
const base = source.split('\n').flatMap((line) => {
  if (!line.includes('{ kana:')) return []
  const fields = Object.fromEntries([...line.matchAll(/(kana|meaning|note): '((?:\\'|[^'])*)'/g)]
    .map((match) => [match[1], match[2].replaceAll("\\'", "'")]))
  return fields.kana && fields.meaning && fields.note ? [fields] : []
})
if (!base.length) throw new Error(`no sentence cards parsed from ${config.source}`)

const checkpoint = join(tmpdir(), `jp-study-${mode}-expansion-gemma27b-v1.json`)
let expanded = []
try { expanded = JSON.parse(await readFile(checkpoint, 'utf8')) } catch {}
const canonical = (value) => value.replace(/[ァ-ヶ]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0x60))
  .replace(/[ 、。！？!?]/g, '')
const allKana = new Set(base.map((item) => canonical(item.kana)))
for (const item of expanded) allKana.add(canonical(item.kana))

function normalizeKana(value) {
  const result = spawnSync('/tmp/jp-study-kakasi/bin/python', [new URL('./normalize_japanese.py', import.meta.url).pathname], {
    input: JSON.stringify([value]), encoding: 'utf8',
  })
  if (result.status !== 0) throw new Error(`kana normalization failed: ${result.stderr}`)
  return JSON.parse(result.stdout)[0].replace(/[\[\]［］【】<>＜＞]/g, '')
}

function validItem(item, sourceKana) {
  return structurallyValid(item, sourceKana) && /[가-힣]/.test(item.meaning)
    && !/[A-Za-z\u0400-\u04ff\u4e00-\u9fff]/.test(item.meaning)
}

function structurallyValid(item, sourceKana) {
  const length = canonical(item.kana).length
  return item.sourceKana === sourceKana && /[ぁ-ゖァ-ヺ]/.test(item.kana)
    && !/[一-龯A-Za-z0-9０-９가-힣\[\]［］【】<>＜＞]/.test(item.kana) && !allKana.has(canonical(item.kana))
    && (mode === 'grammar' || (length >= 5 && length <= 40))
}

function tokensForNote(note) {
  const pattern = note.includes('～') ? note.slice(note.indexOf('～')) : note
  return [...new Set([...pattern.matchAll(/[ぁ-ゖァ-ヺ]+/g)].map((match) => match[0]))]
}

function preservesPattern(item, sourceItem) {
  const sentence = canonical(item.kana)
  if (mode !== 'grammar') {
    const sourceSentence = canonical(sourceItem.kana)
    if (sentence.includes(sourceSentence)) return true
    if (sourceSentence.startsWith('この') && sentence.includes(`このお${sourceSentence.slice(2)}`)) return true
    const demonstrative = sourceSentence.match(/^(?:これ|それ|あれ)(.+)$/)
    return Boolean(demonstrative?.[1] && sentence.includes(demonstrative[1]))
  }
  const tokens = tokensForNote(sourceItem.note)
  // Phrase and keigo notes are Korean situation/category labels, not surface grammar.
  if (tokens.length === 0) return true
  const matches = tokens.filter((token) => {
    if (sentence.includes(token)) return true
    if (token.endsWith('ます')) return sentence.includes(token.slice(0, -2))
    if (token.endsWith('する')) return sentence.includes(token.slice(0, -2) + 'し')
    if (token.endsWith('る')) return sentence.includes(token.slice(0, -1))
    return false
  }).length
  return sourceItem.note.includes('/')
    ? matches >= Math.max(1, tokens.length - 1)
    : matches === tokens.length
}

async function translateMeaning(item) {
  const payload = await generate({
    model: 'gemma3:27b', stream: false, options: { temperature: 0, num_ctx: 4096, num_predict: 192 },
    prompt: `다음 일본어 문장을 자연스럽고 간결한 한국어로만 번역하세요. 일본어·한자·영어를 답에 섞지 마세요. 예: 日本へ行きます → 일본에 갑니다. 번역할 문장: ${item.written || item.kana}`,
    format: {
      type: 'object', required: ['meaning'], additionalProperties: false,
      properties: { meaning: { type: 'string' } },
    },
  })
  return { ...item, meaning: JSON.parse(payload.response).meaning }
}

async function reviewPhraseBatch(batch, candidates) {
  const payload = await generate({
    model: 'gemma3:27b', stream: false, options: { temperature: 0.15, num_ctx: 8192, num_predict: 1024 },
    prompt: `/no_think\n당신은 일본어 회화 교재 편집자입니다. 원문과 신규 후보를 한 쌍씩 엄격히 비교하세요. 후보가 원문의 한국어 뜻과 같은 의사소통 목적·핵심 대상·상황을 유지하고, 현대 일본인이 실제로 쓸 자연스러운 한 문장이면 그대로 두세요. 이름을 직업으로, 메뉴를 상품으로 바꾸는 식의 의미 이탈, 오타, 부자연스러운 결합, 장황한 설명문이 있으면 반드시 고치세요. 원문과 일본어 문장이 같아서는 안 됩니다. 대괄호·꺾쇠·빈칸·이름 같은 플레이스홀더를 절대 쓰지 말고, 필요한 인명은 실제 예시 이름(예: たなか)으로 쓰세요. sourceKana는 정확히 유지하고 kana는 한자 없는 읽기, written은 자연스러운 한자 혼용 표기, meaning은 후보 문장의 정확한 한국어 뜻으로 쓰세요. JSON 배열만 반환하세요.\n원문:${JSON.stringify(batch)}\n후보:${JSON.stringify(candidates)}`,
    format: {
      type: 'array', minItems: batch.length, maxItems: batch.length,
      items: {
        type: 'object', required: ['sourceKana', 'kana', 'written', 'meaning'], additionalProperties: false,
        properties: {
          sourceKana: { type: 'string' }, kana: { type: 'string' },
          written: { type: 'string' }, meaning: { type: 'string' },
        },
      },
    },
  })
  return JSON.parse(payload.response)
}

async function judgePhraseBatch(batch, candidates) {
  const pairs = batch.map((sourceItem, index) => ({
    sourceKana: sourceItem.kana,
    sourceMeaning: sourceItem.meaning,
    candidateKana: candidates[index]?.kana,
    candidateMeaning: candidates[index]?.meaning,
  }))
  const payload = await generate({
    model: 'gemma3:27b', stream: false, options: { temperature: 0, num_ctx: 4096, num_predict: 384 },
    prompt: `/no_think\n각 원문-후보 쌍을 독립적으로 판정하세요. 후보는 표현이나 공손도가 달라도 되지만 원문의 의사소통 목적, 핵심 대상, 긍정·부정, 시제까지 의미가 동등해야 합니다. '언제가 좋아요?'를 '언제가 안 돼요?'로 바꾸거나 '신경 쓰지 마세요'를 '축하해 줘서 기뻐요'로 바꾸면 false입니다. 일본어가 부자연스럽거나 오타가 있어도 false입니다. 입력 순서대로 sourceKana와 equivalent만 JSON 배열로 반환하세요.\n${JSON.stringify(pairs)}`,
    format: {
      type: 'array', minItems: batch.length, maxItems: batch.length,
      items: {
        type: 'object', required: ['sourceKana', 'equivalent'], additionalProperties: false,
        properties: { sourceKana: { type: 'string' }, equivalent: { type: 'boolean' } },
      },
    },
  })
  return JSON.parse(payload.response)
}

async function repair(item, sourceItem) {
  const failures = []
  const requiredTokens = mode !== 'grammar' ? [sourceItem.kana] : tokensForNote(sourceItem.note)
  const relatedForbidden = base.concat(expanded)
    .filter((candidate) => candidate.note === sourceItem.note)
    .map((candidate) => candidate.kana)
  for (let attempt = 0; attempt < 3; attempt++) {
    const payload = await generate({
      model: 'gemma3:27b', stream: false, options: { temperature: 0.65 + attempt * 0.15, num_ctx: 8192, num_predict: 384 },
      prompt: `다음 일본어 카드와 같은 ${mode === 'grammar' ? '문법 패턴' : '상황 범주'}(${sourceItem.note})의 새 예문을 하나 만드세요. 새 문장에는 다음 필수 문자열을 정확히 포함하세요: ${JSON.stringify(requiredTokens)}. ${mode !== 'grammar' ? `원문의 한국어 뜻(${sourceItem.meaning})과 같은 의사소통 목적과 핵심 대상을 반드시 유지하세요. 원문 표현 앞에 호칭·대상·부사·장소를 자연스러운 일본어 어순으로 붙이세요. 한 카드에는 한 화자의 발화만 쓰고 질문·응답이나 서로 다른 화자의 말을 합치지 마세요. 「から」「けど」로 이유·역접만 말한 채 끝내지 말고 완결된 문장으로 쓰세요. 호칭은 「たなかさん」「せんせい」처럼 관계가 분명한 것을 쓰고, 첫 만남에 가족 호칭을 임의로 쓰지 마세요. 질문 뒤에 쉼표로 명사구를 덧붙이면 안 됩니다. 일본 현지에서 실제로 말할 법한 5~30자 내외의 짧고 완결된 한 문장으로 쓰세요. 숫자는 일본어 읽기로 쓰고 대괄호·꺾쇠·빈칸·플레이스홀더는 금지합니다.` : '반드시 장소·시간·이유·수식어 중 두 가지 이상을 넣어 읽기 기준 15자 이상의 구체적인 문장으로 쓰세요. 기존 문장의 단순 단어 교체는 금지합니다.'} kana는 히라가나·가타카나 읽기, written은 한자 혼용 표기, meaning은 반드시 한국어 뜻입니다. 다음 후보는 중복 또는 형식 오류였으므로 다른 소재로 다시 쓰세요: ${JSON.stringify(item)}. 원문: ${JSON.stringify(sourceItem)}. 이전 실패: ${JSON.stringify(failures)}. 금지: ${JSON.stringify(relatedForbidden)}`,
      format: {
        type: 'object', required: ['kana', 'written', 'meaning'], additionalProperties: false,
        properties: { kana: { type: 'string' }, written: { type: 'string' }, meaning: { type: 'string' } },
      },
    })
    const candidate = { ...JSON.parse(payload.response), sourceKana: sourceItem.kana }
    candidate.kana = normalizeKana(candidate.kana)
    const fixed = structurallyValid(candidate, sourceItem.kana) ? await translateMeaning(candidate) : candidate
    if (validItem(fixed, sourceItem.kana) && preservesPattern(fixed, sourceItem)) return fixed
    failures.push(fixed)
  }
  throw new Error(`could not repair item for ${sourceItem.kana}: ${JSON.stringify(failures)}`)
}

const batchSize = mode === 'phrases' ? 8 : 4
for (let offset = expanded.length; offset < base.length; offset += batchSize) {
  const batch = base.slice(offset, offset + batchSize)
  const input = batch.map(({ kana, meaning, note }) => ({
    sourceKana: kana, meaning, note,
    required: mode !== 'grammar' ? [kana] : tokensForNote(note),
  }))
  const activeNotes = new Set(batch.map((item) => item.note))
  const forbidden = base.concat(expanded).filter((item) => activeNotes.has(item.note)).map((item) => item.kana)
  const prompt = `/no_think\n일본어 학습 카드마다 같은 문법 패턴 또는 같은 상황에서 쓸 수 있는 완전히 새로운 예문을 하나 만드세요. sourceKana는 입력 순서대로 그대로 복사하세요. kana에는 새 문장의 읽기를 한자 없이 히라가나·가타카나로 쓰고 자연스러운 띄어쓰기를 넣으세요. written에는 새 문장의 일반적인 한자 혼용 표기를 쓰세요. meaning은 간결하고 정확한 한국어만 쓰세요. ${mode !== 'grammar' ? '각 입력의 required에 든 원문 표현을 어순 그대로 반드시 포함하고, 그 표현 앞에 자연스러운 호칭·대상·부사·장소를 붙여 새 발화로 확장하세요. 한 카드에는 한 화자의 발화만 쓰고 질문·응답이나 서로 다른 화자의 말을 합치지 마세요. 「から」「けど」로 끝내지 말고 완결된 문장으로 쓰세요. 질문이나 종결 표현 뒤에 쉼표로 명사구나 부사를 덧붙이지 마세요. required 표현을 유의어나 다른 표현으로 교체하면 안 됩니다. 각 입력의 meaning과 동일한 의사소통 목적과 핵심 대상을 유지하세요. 숫자는 일본어 읽기로 쓰고, 실제 대화에서 쓸 법한 40자 이하의 발화로 만드세요.' : '장소·시간·이유·수식어를 활용해 구체적인 문장으로 만드세요.'} 원문의 단순 시제 변경이나 단어 하나만 바꾼 문장은 피하세요. 아래 금지 문장과 같은 문장은 절대 만들지 마세요. JSON 배열만 반환하세요.\n입력:${JSON.stringify(input)}\n금지:${JSON.stringify(forbidden)}`
  const payload = await generate({
    model: 'gemma3:27b', prompt, stream: false, options: { temperature: 0.3, num_ctx: 8192, num_predict: 768 },
    format: {
      type: 'array', minItems: batch.length, maxItems: batch.length,
      items: {
        type: 'object', required: ['sourceKana', 'kana', 'written', 'meaning'], additionalProperties: false,
        properties: {
          sourceKana: { type: 'string' }, kana: { type: 'string' },
          written: { type: 'string' }, meaning: { type: 'string' },
        },
      },
    },
  })
  let items = JSON.parse(payload.response)
  if (!Array.isArray(items) || items.length !== batch.length) throw new Error(`bad batch at ${offset}`)
  // Phrase meaning is guarded structurally by requiring the complete source
  // expression in the expanded utterance; the expensive semantic pass is kept
  // available for audits but is not needed for every generation batch.
  const normalized = spawnSync('/tmp/jp-study-kakasi/bin/python', [new URL('./normalize_japanese.py', import.meta.url).pathname], {
    input: JSON.stringify(items.map((item) => item.kana)), encoding: 'utf8',
  })
  if (normalized.status !== 0) throw new Error(`kana normalization failed: ${normalized.stderr}`)
  const readings = JSON.parse(normalized.stdout).map((value) => value.replace(/[\[\]［］【】<>＜＞]/g, ''))
  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    item.kana = readings[i]
    if (structurallyValid(item, batch[i].kana) && !validItem(item, batch[i].kana)) item = await translateMeaning(item)
    if (!validItem(item, batch[i].kana) || !preservesPattern(item, batch[i])) item = await repair(item, batch[i])
    const next = { kana: item.kana, written: item.written, meaning: item.meaning, note: batch[i].note }
    expanded.push(next)
    allKana.add(canonical(item.kana))
  }
  await writeFile(checkpoint, JSON.stringify(expanded))
  process.stdout.write(`generated ${expanded.length}/${base.length}\n`)
}

const py = spawnSync('/tmp/jp-study-kakasi/bin/python', [new URL('./romanize_words.py', import.meta.url).pathname], {
  input: JSON.stringify(expanded.map((x) => x.kana)), encoding: 'utf8',
})
if (py.status !== 0) throw new Error(`romanizer failed: ${py.stderr}`)
const romaji = JSON.parse(py.stdout)
const esc = (s) => s.replaceAll('\\', '\\\\').replaceAll("'", "\\'")
const notes = [...new Set(base.map((item) => item.note))]
const lines = [
  '// Generated as one new example for every curated sentence card.',
  "import type { Kana } from './kana'", '', `export const ${config.exportName}: Kana[][] = [`,
]
for (const note of notes) {
  lines.push('  [')
  for (let i = 0; i < expanded.length; i++) {
    const item = expanded[i]
    if (item.note !== note) continue
    const written = item.written && item.written !== item.kana ? `, written: '${esc(item.written)}'` : ''
    lines.push(`    { kana: '${esc(item.kana)}'${written}, romaji: '${esc(romaji[i])}', meaning: '${esc(item.meaning)}', note: '${esc(note)}' },`)
  }
  lines.push('  ],')
}
lines.push(']', '')
await writeFile(new URL(`../src/data/${config.output}`, import.meta.url), lines.join('\n'))
