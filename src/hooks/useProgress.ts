// Persistence only — domain logic lives in lib/srs.ts. Wraps localStorage in
// try/catch so Safari private mode / quota errors degrade to in-memory state
// instead of crashing.
import { useCallback, useState } from 'react'
import { emptyProgress, PROGRESS_VERSION, type Progress } from '../lib/srs'

const KEY = 'jp-study:progress:v1'

export function loadProgress(): { progress: Progress; persistent: boolean } {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { progress: emptyProgress(), persistent: true }
    const parsed = JSON.parse(raw) as Progress
    if (!parsed || parsed.version !== PROGRESS_VERSION || typeof parsed.kana !== 'object') {
      return { progress: emptyProgress(), persistent: true }
    }
    return { progress: parsed, persistent: true }
  } catch {
    // Corrupt JSON or storage unavailable -> start fresh, flag non-persistent.
    return { progress: emptyProgress(), persistent: false }
  }
}

function saveProgress(p: Progress): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
    return true
  } catch {
    return false
  }
}

export function useProgress() {
  const [{ progress, persistent }, setState] = useState(loadProgress)

  const update = useCallback((next: Progress) => {
    const ok = saveProgress(next)
    setState((prev) => ({ progress: next, persistent: prev.persistent && ok }))
  }, [])

  const reset = useCallback(() => {
    const fresh = emptyProgress()
    saveProgress(fresh)
    setState({ progress: fresh, persistent: true })
  }, [])

  return { progress, persistent, update, reset }
}
