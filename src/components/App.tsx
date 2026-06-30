import { useEffect, useMemo, useState } from 'react'
import { DECKS, deckCategories, type Deck, type Kana } from '../data/kana'
import { useProgress } from '../hooks/useProgress'
import { useSettings } from '../hooks/useSettings'
import { useJlptExam } from '../hooks/useJlptExam'
import { hasJaVoice, hasKoVoice, loadVoices } from '../lib/speak'
import { swApplyUpdate, swOnUpdate } from '../lib/sw'
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
import { Search } from './Search'
import { JlptHome } from './JlptHome'
import { JlptExam } from './JlptExam'
import { JlptReport } from './JlptReport'
import { Learn } from './Learn'
import { LearnReader } from './LearnReader'
import { ListenPlayer } from './ListenPlayer'
import type { CurriculumWeek } from '../data/curriculum'
import type { JlptLevel, JlptPart, ScoredItem } from '../data/jlpt/types'

type Screen =
  | 'home'
  | 'lesson'
  | 'complete'
  | 'search'
  | 'jlpt-home'
  | 'jlpt-exam'
  | 'jlpt-report'
  | 'learn'
  | 'learn-reader'
  | 'listen-play'

export function App() {
  const { progress, persistent, update } = useProgress()
  const { settings, toggleSfx, toggleListen } = useSettings()
  // A new deploy waits until the user is back on Home (no mid-lesson reloads).
  const [updateReady, setUpdateReady] = useState(false)
  useEffect(() => swOnUpdate(setUpdateReady), [])
  const [deck, setDeck] = useState<Deck>(DECKS[0])
  const [categoryName, setCategoryName] = useState<string | null>(null) // null = 전체
  const [screen, setScreen] = useState<Screen>('home')
  const [items, setItems] = useState<LessonItem[]>([])
  const [results, setResults] = useState<LessonResult[]>([])
  // A review session (weak/wrong items) is a fixed set that must NOT advance the
  // lesson clock; a normal study session does (lessonsDone + 1).
  const [isReview, setIsReview] = useState(false)

  // JLPT exam flow (state + scoring/persistence live in the hook; screen
  // transitions stay here).
  const jlpt = useJlptExam()

  // 개념 학습(커리큘럼) 상태.
  const [learnWeek, setLearnWeek] = useState<CurriculumWeek | null>(null)

  // Listen mode needs a Japanese TTS voice. Voices load asynchronously (Chrome),
  // so detect once on mount and gate the toggle on the result.
  const [voiceReady, setVoiceReady] = useState(false)
  const [koReady, setKoReady] = useState(false)
  useEffect(() => {
    void loadVoices().then(() => {
      setVoiceReady(hasJaVoice())
      setKoReady(hasKoVoice())
    })
  }, [])
  const listenMode = settings.listen && voiceReady

  const categories = useMemo(() => deckCategories(deck), [deck])
  // The kana the lesson/progress is scoped to: the chosen category, or the whole deck.
  const scopeKana = useMemo(() => {
    const cat = categories.find((c) => c.name === categoryName)
    return cat ? cat.kana : deck.kana
  }, [categories, categoryName, deck])

  function selectDeck(d: Deck) {
    setDeck(d)
    setCategoryName(null) // reset category when switching decks
  }

  // Start a fixed lesson over the current scope: due reviews then new cards,
  // capped at LESSON_SIZE (see selectLessonKana).
  function startLesson() {
    const next = selectLessonKana(progress, scopeKana)
    if (next.length === 0) return
    setIsReview(false)
    setItems(next)
    setScreen('lesson')
  }

  // Passive listen: auto-play the current scope (no quizzing, no progress change).
  function startListen() {
    if (scopeKana.length === 0) return
    setScreen('listen-play')
  }

  // Review only the given kana (e.g. the ones missed last lesson), all as quizzes.
  // A review is a fixed set and does not advance the lesson clock.
  function startReview(kana: Kana[]) {
    if (kana.length === 0) return
    setIsReview(true)
    setItems(kana.map((k) => ({ kana: k, mode: 'quiz' })))
    setScreen('lesson')
  }

  function finishLesson(lessonResults: LessonResult[]) {
    // A normal session counts as one lesson (schedules grow off lessonsDone + 1);
    // a review reuses the current clock so it doesn't inflate the schedule.
    const base = isReview ? progress.lessonsDone : progress.lessonsDone + 1
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

  function startJlpt(level: JlptLevel) {
    if (jlpt.start(level)) setScreen('jlpt-exam')
  }

  function resumeJlpt() {
    if (jlpt.resume()) setScreen('jlpt-exam')
  }

  // Map a weak JLPT part to the existing deck that best practices it, so the
  // report's "study this" button lands the user on the right deck (listening
  // additionally flips on 듣기 모드). The user starts the lesson from Home —
  // selecting the deck and starting in one tick would feed Lesson a stale deck.
  function studyWeakPart(part: JlptPart) {
    const deckId =
      part === 'grammar'
        ? 'grammar'
        : part === 'reading'
          ? 'phrases'
          : 'words' // vocab + listening practice on the words deck
    const target = DECKS.find((d) => d.id === deckId)
    if (target) {
      setDeck(target)
      setCategoryName(null)
    }
    if (part === 'listening' && !settings.listen && voiceReady) toggleListen()
    setScreen('home')
  }

  function finishJlpt(examItems: ScoredItem[], answers: (number | null)[]) {
    jlpt.finish(examItems, answers)
    setScreen('jlpt-report')
  }

  const wrong = results.filter((r) => r.mode === 'quiz' && !r.correct).map((r) => r.kana)
  const weak = weakItems(progress, scopeKana)

  return (
    <div className="app">
      {screen === 'home' && (
        <Home
          progress={progress}
          persistent={persistent}
          updateReady={updateReady}
          onApplyUpdate={swApplyUpdate}
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
          onSearch={() => setScreen('search')}
          onStart={startLesson}
          onListen={startListen}
          onJlpt={() => setScreen('jlpt-home')}
          onLearn={() => setScreen('learn')}
        />
      )}
      {screen === 'listen-play' && (
        <ListenPlayer
          items={scopeKana}
          deck={deck}
          koReady={koReady}
          onExit={() => setScreen('home')}
        />
      )}
      {screen === 'lesson' && (
        <Lesson
          items={items}
          pool={scopeKana}
          deck={deck}
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
      {screen === 'search' && <Search onExit={() => setScreen('home')} />}
      {screen === 'learn' && (
        <Learn
          onOpenWeek={(w) => {
            setLearnWeek(w)
            setScreen('learn-reader')
          }}
          onExit={() => setScreen('home')}
        />
      )}
      {screen === 'learn-reader' && learnWeek && (
        <LearnReader week={learnWeek} onExit={() => setScreen('learn')} />
      )}
      {screen === 'jlpt-home' && (
        <JlptHome
          voiceReady={voiceReady}
          onStart={startJlpt}
          onResume={resumeJlpt}
          onExit={() => setScreen('home')}
        />
      )}
      {screen === 'jlpt-exam' && (
        <JlptExam
          level={jlpt.level}
          items={jlpt.items}
          initialAnswers={jlpt.answers}
          initialIdx={jlpt.idx}
          startedAt={jlpt.startedAt}
          voiceReady={voiceReady}
          onComplete={finishJlpt}
          onExit={() => setScreen('jlpt-home')}
        />
      )}
      {screen === 'jlpt-report' && jlpt.result && (
        <JlptReport
          level={jlpt.level}
          result={jlpt.result}
          items={jlpt.items}
          answers={jlpt.answers}
          durationSec={jlpt.durationSec}
          onStudyWeak={studyWeakPart}
          onRetake={() => startJlpt(jlpt.level)}
          onHome={() => setScreen('home')}
        />
      )}
    </div>
  )
}
