import { useEffect, useRef, useState } from 'react'
import { type Deck, type DeckKind, type Kana } from '../data/kana'
import { clampIndex, glyphClassFor, jpTextFor } from '../lib/deck'
import { kanaToHangul } from '../lib/hangul'
import { primeSpeech, speakSequence, stopSpeech, type SpeechPart } from '../lib/speak'

interface Props {
  items: Kana[]
  deck: Deck
  koReady: boolean // a ko-KR voice exists → Korean reading/meaning can be spoken
  onExit: () => void
}

// Pauses between repeats and between cards (ms). onend chaining handles speech
// timing; these are deliberate breathing room so you can shadow the audio.
const REPEAT_GAP = 500
const CARD_GAP = 700

const RATES = [0.8, 1.0, 1.2] as const

// What gets read for one card: Japanese first, then the Korean side.
// Kana decks have no meaning, so the Korean side is the phonetic reading.
function partsFor(item: Kana, kind: DeckKind, readKo: boolean): SpeechPart[] {
  const parts: SpeechPart[] = []
  const jp = kind === 'kanji' ? item.romaji.replace(/・/g, '、') : jpTextFor(item, kind)
  parts.push({ text: jp, lang: 'ja-JP' })
  if (readKo) {
    if (kind === 'kana') parts.push({ text: kanaToHangul(item.kana), lang: 'ko-KR' })
    else if (item.meaning) parts.push({ text: item.meaning, lang: 'ko-KR' })
  }
  return parts
}

export function ListenPlayer({ items, deck, koReady, onExit }: Props) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [part, setPart] = useState<'ja' | 'ko' | null>(null)
  const [rate, setRate] = useState<number>(1.0)
  const [repeatEach, setRepeatEach] = useState(1)
  const [readKo, setReadKo] = useState(koReady)
  const [loop, setLoop] = useState(false)

  // The playback loop runs imperatively (speech callbacks fire outside React),
  // so it reads live values from refs to avoid stale closures.
  const idxRef = useRef(0)
  const playingRef = useRef(false)
  const cancelRef = useRef<() => void>(() => {})
  const timerRef = useRef<number | null>(null)
  const cfg = useRef({ rate, repeatEach, readKo, loop })
  useEffect(() => {
    cfg.current = { rate, repeatEach, readKo, loop }
  }, [rate, repeatEach, readKo, loop])

  const step = items[index]

  function clearTimer() {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  function stopAll() {
    cancelRef.current()
    clearTimer()
    stopSpeech()
  }

  function playFrom(i: number, repeatsLeft: number) {
    idxRef.current = i
    setIndex(i)
    const parts = partsFor(items[i], deck.kind, cfg.current.readKo)
    cancelRef.current()
    cancelRef.current = speakSequence(parts, {
      rate: cfg.current.rate,
      onPart: (pi) => setPart(parts[pi].lang === 'ko-KR' ? 'ko' : 'ja'),
      onDone: () => {
        setPart(null)
        if (!playingRef.current) return
        if (repeatsLeft > 1) {
          timerRef.current = window.setTimeout(() => playFrom(i, repeatsLeft - 1), REPEAT_GAP)
          return
        }
        const nextIdx = i + 1
        if (nextIdx < items.length) {
          timerRef.current = window.setTimeout(
            () => playFrom(nextIdx, cfg.current.repeatEach),
            CARD_GAP,
          )
        } else if (cfg.current.loop) {
          timerRef.current = window.setTimeout(() => playFrom(0, cfg.current.repeatEach), CARD_GAP)
        } else {
          playingRef.current = false
          setPlaying(false)
        }
      },
    })
  }

  function play() {
    primeSpeech()
    playingRef.current = true
    setPlaying(true)
    playFrom(idxRef.current, cfg.current.repeatEach)
  }

  function pause() {
    playingRef.current = false
    setPlaying(false)
    stopAll()
    setPart(null)
  }

  function goTo(target: number) {
    const i = clampIndex(target, items.length)
    stopAll()
    idxRef.current = i
    setIndex(i)
    if (playingRef.current) {
      playFrom(i, cfg.current.repeatEach)
    } else {
      // Paused nav: speak the card once for feedback, no auto-advance.
      const parts = partsFor(items[i], deck.kind, cfg.current.readKo)
      primeSpeech()
      cancelRef.current = speakSequence(parts, {
        rate: cfg.current.rate,
        onPart: (pi) => setPart(parts[pi].lang === 'ko-KR' ? 'ko' : 'ja'),
        onDone: () => setPart(null),
      })
    }
  }

  // Auto-play on entry (entry is a tap, so speech is unlocked) and keep the
  // screen awake while playing. Cleanup stops speech on unmount.
  useEffect(() => {
    play()
    let lock: WakeLockSentinel | null = null
    const requestLock = () => {
      navigator.wakeLock
        ?.request('screen')
        .then((l) => (lock = l))
        .catch(() => {})
    }
    requestLock()
    const onVisible = () => {
      if (document.visibilityState === 'visible') requestLock()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      stopAll()
      document.removeEventListener('visibilitychange', onVisible)
      lock?.release().catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const progressPct = Math.round(((index + 1) / items.length) * 100)
  const koText =
    deck.kind === 'kana' ? kanaToHangul(step.kana) : (step.meaning ?? '')

  return (
    <main className="screen listen-play">
      <div className="lesson-top">
        <button className="link" onClick={onExit} aria-label="나가기">
          ✕
        </button>
        <div className="progress-bar slim">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="counter">
          {index + 1}/{items.length}
        </span>
      </div>

      <section className="card listen-card">
        {(deck.kind === 'sentence' || deck.kind === 'cloze') && step.note && (
          <div className="pattern">{step.note}</div>
        )}
        <div className={glyphClassFor(deck.kind) + (part === 'ja' ? ' speaking' : '')}>
          {jpTextFor(step, deck.kind)}
        </div>
        <div className="romaji">{step.romaji}</div>
        {readKo && koText && (
          <div className={'meaning' + (part === 'ko' ? ' speaking' : '')}>{koText}</div>
        )}
        <div className="listen-status" role="status">
          {part === 'ja' ? '🔊 일본어' : part === 'ko' ? '🔊 한국어' : playing ? '…' : '일시정지'}
        </div>
      </section>

      <div className="listen-controls">
        <button className="link nav-arrow" onClick={() => goTo(index - 1)} aria-label="이전">
          ‹
        </button>
        <button
          className="btn-primary listen-play-btn"
          onClick={() => (playing ? pause() : play())}
        >
          {playing ? '⏸ 일시정지' : '▶ 재생'}
        </button>
        <button className="link nav-arrow" onClick={() => goTo(index + 1)} aria-label="다음">
          ›
        </button>
      </div>

      {items.length > 10 && (
        <div className="listen-skip">
          {items.length > 50 && (
            <button className="listen-jump" onClick={() => goTo(index - 50)} aria-label="50개 뒤로">
              «50
            </button>
          )}
          <button className="listen-jump" onClick={() => goTo(index - 10)} aria-label="10개 뒤로">
            «10
          </button>
          <button className="listen-jump" onClick={() => goTo(index + 10)} aria-label="10개 앞으로">
            10»
          </button>
          {items.length > 50 && (
            <button className="listen-jump" onClick={() => goTo(index + 50)} aria-label="50개 앞으로">
              50»
            </button>
          )}
        </div>
      )}

      <div className="listen-options">
        <div className="listen-opt">
          <span>속도</span>
          <div className="seg">
            {RATES.map((r) => (
              <button
                key={r}
                className={r === rate ? 'seg-item on' : 'seg-item'}
                onClick={() => setRate(r)}
              >
                {r.toFixed(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="listen-opt">
          <span>반복</span>
          <div className="seg">
            {[1, 2].map((n) => (
              <button
                key={n}
                className={n === repeatEach ? 'seg-item on' : 'seg-item'}
                onClick={() => setRepeatEach(n)}
              >
                {n}회
              </button>
            ))}
          </div>
        </div>
        <button
          className={readKo ? 'listen-chip on' : 'listen-chip'}
          onClick={() => setReadKo((v) => !v)}
          disabled={!koReady}
          aria-pressed={readKo}
        >
          한국어 읽기 {readKo ? '켜짐' : '꺼짐'}
          {!koReady && <small> (음성 없음)</small>}
        </button>
        <button
          className={loop ? 'listen-chip on' : 'listen-chip'}
          onClick={() => setLoop((v) => !v)}
          aria-pressed={loop}
        >
          ↻ 반복 재생 {loop ? '켜짐' : '꺼짐'}
        </button>
      </div>
    </main>
  )
}
