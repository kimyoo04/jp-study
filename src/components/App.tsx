import { useEffect, useMemo, useState } from 'react'
import { DECKS, deckCategories, type Deck, type Kana } from '../data/kana'
import { useProgress } from '../hooks/useProgress'
import { useSettings } from '../hooks/useSettings'
import { hasJaVoice, loadVoices } from '../lib/speak'
import {
  applyAnswer,
  introducedCard,
  newCard,
  selectLessonKana,
  weakItems,
  type LessonItem,
} from '../lib/srs'
import { Home } from './Home'
import { Lesson, type LessonResult } from './Lesson'
import { Complete } from './Complete'

type Screen = 'home' | 'lesson' | 'complete'

export function App() {
  const { progress, persistent, update } = useProgress()
  const { settings, toggleSfx, toggleListen } = useSettings()
  const [deck, setDeck] = useState<Deck>(DECKS[0])
  const [categoryName, setCategoryName] = useState<string | null>(null) // null = 전체
  const [screen, setScreen] = useState<Screen>('home')
  const [items, setItems] = useState<LessonItem[]>([])
  const [results, setResults] = useState<LessonResult[]>([])

  // Listen mode needs a Japanese TTS voice. Voices load asynchronously (Chrome),
  // so detect once on mount and gate the toggle on the result.
  const [voiceReady, setVoiceReady] = useState(false)
  useEffect(() => {
    void loadVoices().then(() => setVoiceReady(hasJaVoice()))
  }, [])
  const listenMode = settings.listen && voiceReady

  const categories = useMemo(() => deckCategories(deck), [deck])
  // The kana the lesson/progress is scoped to: the chosen category, or the whole deck.
  const scopeKana = useMemo(() => {
    const cat = categories.find((c) => c.name === categoryName)
    return cat ? cat.kana : deck.kana
  }, [categories, categoryName, deck])

  // The lesson count this lesson will produce when finished.
  const base = useMemo(() => progress.lessonsDone + 1, [progress.lessonsDone])

  function selectDeck(d: Deck) {
    setDeck(d)
    setCategoryName(null) // reset category when switching decks
  }

  function startLesson() {
    const next = selectLessonKana(progress, scopeKana)
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
  const weak = weakItems(progress, scopeKana)

  return (
    <div className="app">
      {screen === 'home' && (
        <Home
          progress={progress}
          persistent={persistent}
          deck={deck}
          onSelectDeck={selectDeck}
          categories={categories}
          categoryName={categoryName}
          onSelectCategory={setCategoryName}
          scopeKana={scopeKana}
          weakCount={weak.length}
          onReviewWeak={() => startReview(weak)}
          sfx={settings.sfx}
          onToggleSfx={toggleSfx}
          listen={settings.listen}
          onToggleListen={toggleListen}
          listenAvailable={voiceReady}
          onStart={startLesson}
        />
      )}
      {screen === 'lesson' && (
        <Lesson
          items={items}
          pool={scopeKana}
          deckKind={deck.kind}
          listenMode={listenMode}
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
