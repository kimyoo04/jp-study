// User settings (sound on/off). Persisted to localStorage with a safe fallback,
// same pattern as useProgress.
import { useCallback, useEffect, useState } from 'react'
import { setSfxEnabled } from '../lib/sound'

export interface Settings {
  sfx: boolean
}

const KEY = 'jp-study:settings:v1'
const DEFAULTS: Settings = { sfx: true }

function load(): Settings {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULTS
    const parsed = JSON.parse(raw) as Partial<Settings>
    return { sfx: typeof parsed.sfx === 'boolean' ? parsed.sfx : true }
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

  const toggleSfx = useCallback(() => {
    setSettings((prev) => {
      const next = { ...prev, sfx: !prev.sfx }
      try {
        localStorage.setItem(KEY, JSON.stringify(next))
      } catch {
        /* ignore — setting just won't persist */
      }
      return next
    })
  }, [])

  return { settings, toggleSfx }
}
