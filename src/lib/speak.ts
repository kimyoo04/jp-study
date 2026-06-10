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

function jaVoice(): SpeechSynthesisVoice | undefined {
  return voicesCache.find((v) => v.lang.toLowerCase().startsWith('ja'))
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
