// User settings (sound on/off). Persisted to localStorage with a safe fallback,
// same pattern as useProgress.
import { useCallback, useEffect, useState } from 'react'
import { setSfxEnabled } from '../lib/sound'

export interface Settings {
  sfx: boolean
  listen: boolean // audio-prompted quizzes (hear -> pick); off by default
}

const KEY = 'jp-study:settings:v1'
const DEFAULTS: Settings = { sfx: true, listen: false }

function load(): Settings {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULTS
    const parsed = JSON.parse(raw) as Partial<Settings>
    return {
      sfx: typeof parsed.sfx === 'boolean' ? parsed.sfx : true,
      listen: typeof parsed.listen === 'boolean' ? parsed.listen : false,
    }
  } catch {
    return DEFAULTS
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(load)

  // Keep the sound module in sync with the setting.
  useEffect(() => {
    setSfxEnabled(settings.sfx)
  }, [settings.sfx])

  const persist = useCallback((next: Settings) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* ignore — setting just won't persist */
    }
    return next
  }, [])

  const toggleSfx = useCallback(() => {
    setSettings((prev) => persist({ ...prev, sfx: !prev.sfx }))
  }, [persist])

  const toggleListen = useCallback(() => {
    setSettings((prev) => persist({ ...prev, listen: !prev.listen }))
  }, [persist])

  return { settings, toggleSfx, toggleListen }
}
