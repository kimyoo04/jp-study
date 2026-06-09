import { useMemo, useState } from 'react'
import { DECKS, type Deck, type Kana } from '../data/kana'
import { useProgress } from '../hooks/useProgress'
import { useSettings } from '../hooks/useSettings'
import {
  applyAnswer,
  introducedCard,
  newCard,
  selectLessonKana,
  type LessonItem,
} from '../lib/srs'
import { Home } from './Home'
import { Lesson, type LessonResult } from './Lesson'
import { Complete } from './Complete'

type Screen = 'home' | 'lesson' | 'complete'

export function App() {
  const { progress, persistent, update } = useProgress()
  const { settings, toggleSfx } = useSettings()
  const [deck, setDeck] = useState<Deck>(DECKS[0])
  const [screen, setScreen] = useState<Screen>('home')
  const [items, setItems] = useState<LessonItem[]>([])
  const [results, setResults] = useState<LessonResult[]>([])

  // The lesson count this lesson will produce when finished.
  const base = useMemo(() => progress.lessonsDone + 1, [progress.lessonsDone])

  function startLesson() {
    const next = selectLessonKana(progress, deck.kana)
    if (next.length === 0) return
    setItems(next)
    setScreen('lesson')
  }

  // Review only the given kana (e.g. the ones missed last lesson), all as quizzes.
  function startReview(kana: Kana[]) {
    if (kana.length === 0) return
    setItems(kana.map((k) => ({ kana: k, mode: 'quiz' })))
    setScreen('lesson')
  }

  function finishLesson(lessonResults: LessonResult[]) {
    const kana = { ...progress.kana }
    for (const r of lessonResults) {
      const key = r.kana.kana
      if (r.mode === 'intro') {
        kana[key] = introducedCard(base)
      } else {
        const card = kana[key] ?? newCard(progress.lessonsDone)
        kana[key] = applyAnswer(card, r.correct, base)
      }
    }
    update({
      ...progress,
      kana,
      lessonsDone: base,
      lastPlayed: new Date().toISOString().slice(0, 10),
    })
    setResults(lessonResults)
    setScreen('complete')
  }

  const wrong = results.filter((r) => r.mode === 'quiz' && !r.correct).map((r) => r.kana)

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
          deckKind={deck.kind}
          onExit={() => setScreen('home')}
          onComplete={finishLesson}
        />
      )}
      {screen === 'complete' && (
        <Complete
          results={results}
          wrong={wrong}
          onReview={() => startReview(wrong)}
          onAgain={startLesson}
          onHome={() => setScreen('home')}
        />
      )}
    </div>
  )
}
