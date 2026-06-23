// Web Speech API helper. The most device-flaky part of the app, so it's treated
// as an enhancement: detect ja voice, prime on first gesture, fail silently.
let voicesCache: SpeechSynthesisVoice[] = []
let primed = false

function synth(): SpeechSynthesis | null {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
    ? window.speechSynthesis
    : null
}

/** Load voices once. Chrome returns [] until the voiceschanged event fires. */
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  const s = synth()
  if (!s) return Promise.resolve([])
  const now = s.getVoices()
  if (now.length) {
    voicesCache = now
    return Promise.resolve(now)
  }
  return new Promise((resolve) => {
    const done = () => {
      voicesCache = s.getVoices()
      resolve(voicesCache)
    }
    s.addEventListener('voiceschanged', done, { once: true })
    // Safety timeout: some browsers never fire the event.
    setTimeout(done, 1000)
  })
}

export function hasJaVoice(): boolean {
  return voicesCache.some((v) => v.lang.toLowerCase().startsWith('ja'))
}

export function hasKoVoice(): boolean {
  return voicesCache.some((v) => v.lang.toLowerCase().startsWith('ko'))
}

function jaVoice(): SpeechSynthesisVoice | undefined {
  return voicesCache.find((v) => v.lang.toLowerCase().startsWith('ja'))
}

function koVoice(): SpeechSynthesisVoice | undefined {
  return voicesCache.find((v) => v.lang.toLowerCase().startsWith('ko'))
}

/** Call once from the first user tap to satisfy mobile autoplay gating. */
export function primeSpeech(): void {
  const s = synth()
  if (!s || primed) return
  primed = true
  try {
    const u = new SpeechSynthesisUtterance('')
    u.volume = 0
    s.speak(u)
  } catch {
    /* ignore */
  }
}

/**
 * Speak a study item. For kanji the `kana` field is a lone CJK glyph whose
 * reading is ambiguous to TTS, so we voice the `romaji` field (the hiragana
 * reading). Multi-reading kanji use '・' as a separator (し・よん), which TTS
 * would vocalize — swap it for a pause. Every other deck stores speakable
 * Japanese in `kana`.
 */
export function speakItem(item: { kana: string; romaji: string }, isKanji: boolean): void {
  speak(isKanji ? item.romaji.replace(/・/g, '、') : item.kana)
}

export function speak(text: string): void {
  const s = synth()
  if (!s) return
  try {
    s.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'ja-JP'
    const v = jaVoice()
    if (v) u.voice = v
    u.rate = 0.9
    s.speak(u)
  } catch {
    /* ignore — pronunciation is best-effort */
  }
}

/** Stop any ongoing speech (including a running sequence). */
export function stopSpeech(): void {
  const s = synth()
  if (s) s.cancel()
}

export interface SpeechPart {
  text: string
  lang: 'ja-JP' | 'ko-KR'
}

/**
 * Speak parts back-to-back, chaining on each utterance's `onend` so timing
 * adapts to device speed (fixed timers drift). Used by the passive listen
 * player to read Japanese then the Korean reading/meaning per card.
 * Returns a cancel function; call it to abort mid-sequence.
 */
export function speakSequence(
  parts: SpeechPart[],
  opts: { rate?: number; onPart?: (i: number) => void; onDone?: () => void } = {},
): () => void {
  const s = synth()
  if (!s || parts.length === 0) {
    opts.onDone?.()
    return () => {}
  }
  let cancelled = false
  let i = 0
  const next = () => {
    if (cancelled) return
    if (i >= parts.length) {
      opts.onDone?.()
      return
    }
    const part = parts[i]
    const u = new SpeechSynthesisUtterance(part.text)
    u.lang = part.lang
    const v = part.lang === 'ko-KR' ? koVoice() : jaVoice()
    if (v) u.voice = v
    u.rate = opts.rate ?? 0.9
    u.onend = () => {
      i++
      next()
    }
    // Treat an utterance error like a finished one so the sequence never stalls.
    u.onerror = () => {
      i++
      next()
    }
    opts.onPart?.(i)
    s.speak(u)
  }
  try {
    s.cancel()
    next()
  } catch {
    opts.onDone?.()
  }
  return () => {
    cancelled = true
    try {
      s.cancel()
    } catch {
      /* ignore */
    }
  }
}
