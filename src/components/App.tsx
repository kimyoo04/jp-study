import { useMemo, useState } from 'react'
import { DECKS, type Deck } from '../data/kana'
import { useProgress } from '../hooks/useProgress'
import { useSettings } from '../hooks/useSettings'
import { applyAnswer, introducedCard, newCard, selectLessonKana, type LessonItem } from '../lib/srs'
import { Home } from './Home'
import { Lesson } from './Lesson'
import { Complete } from './Complete'

type Screen = 'home' | 'lesson' | 'complete'

export function App() {
  const { progress, persistent, update } = useProgress()
  const { settings, toggleSfx } = useSettings()
  const [deck, setDeck] = useState<Deck>(DECKS[0])
  const [screen, setScreen] = useState<Screen>('home')
  const [items, setItems] = useState<LessonItem[]>([])
  const [lastScore, setLastScore] = useState({ correct: 0, total: 0 })

  // The lesson count this lesson will produce when finished.
  const base = useMemo(() => progress.lessonsDone + 1, [progress.lessonsDone])

  function startLesson() {
    const next = selectLessonKana(progress, deck.kana)
    if (next.length === 0) return
    setItems(next)
    setScreen('lesson')
  }

  function finishLesson(results: { kana: string; mode: LessonItem['mode']; correct: boolean }[]) {
    const kana = { ...progress.kana }
    for (const r of results) {
      if (r.mode === 'intro') {
        kana[r.kana] = introducedCard(base)
      } else {
        const card = kana[r.kana] ?? newCard(progress.lessonsDone)
        kana[r.kana] = applyAnswer(card, r.correct, base)
      }
    }
    update({
      ...progress,
      kana,
      lessonsDone: base,
      lastPlayed: new Date().toISOString().slice(0, 10),
    })
    const graded = results.filter((r) => r.mode === 'quiz')
    setLastScore({ correct: graded.filter((r) => r.correct).length, total: graded.length })
    setScreen('complete')
  }

  return (
    <div className="app">
      {screen === 'home' && (
        <Home
          progress={progress}
          persistent={persistent}
          deck={deck}
          onSelectDeck={setDeck}
          sfx={settings.sfx}
          onToggleSfx={toggleSfx}
          onStart={startLesson}
        />
      )}
      {screen === 'lesson' && (
        <Lesson
          items={items}
          pool={deck.kana}
          onExit={() => setScreen('home')}
          onComplete={finishLesson}
        />
      )}
      {screen === 'complete' && (
        <Complete score={lastScore} onAgain={startLesson} onHome={() => setScreen('home')} />
      )}
    </div>
  )
}
