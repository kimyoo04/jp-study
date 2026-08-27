import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DECKS, deckCategories, type Deck, type Kana } from '../data/kana'
import { useProgress } from '../hooks/useProgress'
import { useSettings } from '../hooks/useSettings'
import { useJlptExam } from '../hooks/useJlptExam'
import { hasJaVoice, hasKoVoice, loadVoices } from '../lib/speak'
import { swApplyUpdate, swOnUpdate } from '../lib/sw'
import { applyMeta, metaFor } from '../lib/meta'
import { currentLocation, pathOf, type Location } from '../lib/router'
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
import { ListenPlayer } from './ListenPlayer'
import type { JlptLevel, JlptPart, ScoredItem } from '../data/jlpt/types'

// 홈에서 바로 필요하지 않고, 각자 무거운 데이터를 끌고 오는 화면들은 지연
// 로딩한다. 개념 학습은 curriculum.ts(gzip 24KB), JLPT 는 문제 은행(13KB)을
// 함께 떼어낸다. 홈·레슨(핵심 경로)은 그대로 초기 번들에 둔다.
const Search = lazy(() => import('./Search').then((m) => ({ default: m.Search })))
const Learn = lazy(() => import('./Learn').then((m) => ({ default: m.Learn })))
const LearnReader = lazy(() => import('./LearnReader').then((m) => ({ default: m.LearnReader })))
const JlptHome = lazy(() => import('./JlptHome').then((m) => ({ default: m.JlptHome })))
const JlptExam = lazy(() => import('./JlptExam').then((m) => ({ default: m.JlptExam })))
const JlptReport = lazy(() => import('./JlptReport').then((m) => ({ default: m.JlptReport })))

// 주소를 가지는 화면(lib/router.ts의 Location)과 일시적 화면(진행 중 상태가
// URL에 담기지 않아 복원 불가)이 섞여 있다. 어느 쪽인지는 router.ts 주석 참고.
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

/** 일시적 화면이 뒤로가기로 빠져나갈 부모 Location. */
function parentOf(screen: Screen, deckId: Deck['id'], week: number | null): Location {
  switch (screen) {
    case 'search':
      return { screen: 'search' }
    case 'learn':
      return { screen: 'learn' }
    case 'learn-reader':
      return week ? { screen: 'learn-reader', week } : { screen: 'learn' }
    case 'jlpt-home':
    case 'jlpt-exam':
    case 'jlpt-report':
      return { screen: 'jlpt-home' }
    // home + 홈에서 파생된 일시적 화면(레슨·완료·흘려듣기)
    default:
      return { screen: 'home', deckId }
  }
}

export function App() {
  const { progress, persistent, update } = useProgress()
  const { settings, toggleSfx, toggleListen } = useSettings()
  // A new deploy waits until the user is back on Home (no mid-lesson reloads).
  const [updateReady, setUpdateReady] = useState(false)
  useEffect(() => swOnUpdate(setUpdateReady), [])
  // 첫 렌더는 주소창에서 읽는다: 딥링크·북마크·404.html 부팅이 같은 화면을 연다.
  const [deck, setDeck] = useState<Deck>(() => {
    const loc = currentLocation()
    return (loc.screen === 'home' ? DECKS.find((d) => d.id === loc.deckId) : undefined) ?? DECKS[0]
  })
  const [categoryName, setCategoryName] = useState<string | null>(null) // null = 전체
  const [screen, setScreen] = useState<Screen>(() => currentLocation().screen)
  const [items, setItems] = useState<LessonItem[]>([])
  const [results, setResults] = useState<LessonResult[]>([])
  // A review session (weak/wrong items) is a fixed set that must NOT advance the
  // lesson clock; a normal study session does (lessonsDone + 1).
  const [isReview, setIsReview] = useState(false)

  // JLPT exam flow (state + scoring/persistence live in the hook; screen
  // transitions stay here).
  const jlpt = useJlptExam()

  // 개념 학습(커리큘럼) 상태. 주차 번호만 들고 있는다 — 주차 데이터는 지연
  // 로딩되는 LearnReader 청크 안에서 해석한다.
  const [learnWeek, setLearnWeek] = useState<number | null>(() => {
    const loc = currentLocation()
    return loc.screen === 'learn-reader' ? loc.week : null
  })

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

  // 최신 덱을 popstate 핸들러(마운트 시 한 번만 등록)에서 읽기 위한 거울.
  const deckRef = useRef(deck)
  deckRef.current = deck

  /** 주소창의 Location을 화면 상태에 반영한다. 콜드 로드와 popstate가 공유. */
  const applyLocation = useCallback((loc: Location) => {
    setScreen(loc.screen)
    if (loc.screen === 'home' && loc.deckId !== deckRef.current.id) {
      const d = DECKS.find((x) => x.id === loc.deckId)
      if (d) {
        setDeck(d)
        setCategoryName(null) // 카테고리는 URL에 없으므로 덱이 바뀌면 전체로
      }
    }
    if (loc.screen === 'learn-reader') setLearnWeek(loc.week)
  }, [])

  // 뒤로/앞으로: 주소가 곧 화면이다. 일시적 화면은 부모 경로를 쌓으므로
  // 되돌아온 경로는 항상 복원 가능한 Location으로 해석된다.
  useEffect(() => {
    const onPop = () => applyLocation(currentLocation())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [applyLocation])

  // 정규화: /deck/hiragana → / , 미지의 경로(404.html 부팅) → / 로 주소를 맞춘다.
  useEffect(() => {
    const canonicalPath = pathOf(currentLocation())
    if (canonicalPath !== window.location.pathname) {
      window.history.replaceState(null, '', canonicalPath)
    }
  }, [])

  /** 주소 있는 화면으로 이동: 상태와 주소를 함께 바꾼다. */
  function go(loc: Location, opts?: { replace?: boolean }) {
    applyLocation(loc)
    const path = pathOf(loc)
    if (path === window.location.pathname) return
    if (opts?.replace) window.history.replaceState(null, '', path)
    else window.history.pushState(null, '', path)
  }

  /**
   * 일시적 화면(레슨·시험 등)으로 이동. 진행 중 상태가 URL에 담기지 않으므로
   * 부모 경로를 한 칸 쌓기만 한다 → 뒤로가기가 부모 화면으로 빠진다.
   */
  function goTransient(next: Screen) {
    window.history.pushState(null, '', pathOf(parentOf(next, deckRef.current.id, learnWeek)))
    setScreen(next)
  }

  /** 일시적 화면 종료: 쌓아둔 항목을 소비해 부모로 돌아간다(popstate가 처리). */
  function exitTransient() {
    window.history.back()
  }

  const homeLocation = useMemo<Location>(() => ({ screen: 'home', deckId: deck.id }), [deck.id])

  // 화면이 바뀌면 title·description·canonical·og:*를 같이 갱신한다.
  // 일시적 화면은 부모의 메타를 쓴다(공유 미리보기가 레슨 중간을 가리키지 않도록).
  useEffect(() => {
    applyMeta(metaFor(parentOf(screen, deck.id, learnWeek)))
  }, [screen, deck.id, learnWeek])

  // 덱 전환은 주소 변경으로만 처리한다(applyLocation이 덱과 카테고리를 맞춘다).
  // 탭은 자주 눌리므로 push 대신 replace 로 히스토리를 채우지 않는다.
  function selectDeck(d: Deck) {
    go({ screen: 'home', deckId: d.id }, { replace: true })
  }

  // Start a fixed lesson over the current scope: due reviews then new cards,
  // capped at LESSON_SIZE (see selectLessonKana).
  function startLesson() {
    const next = selectLessonKana(progress, scopeKana)
    if (next.length === 0) return
    setIsReview(false)
    setItems(next)
    goTransient('lesson')
  }

  // Passive listen: auto-play the current scope (no quizzing, no progress change).
  function startListen() {
    if (scopeKana.length === 0) return
    goTransient('listen-play')
  }

  // Review only the given kana (e.g. the ones missed last lesson), all as quizzes.
  // A review is a fixed set and does not advance the lesson clock.
  function startReview(kana: Kana[]) {
    if (kana.length === 0) return
    setIsReview(true)
    setItems(kana.map((k) => ({ kana: k, mode: 'quiz' })))
    goTransient('lesson')
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
    goTransient('complete')
  }

  async function startJlpt(level: JlptLevel) {
    if (await jlpt.start(level)) goTransient('jlpt-exam')
  }

  function resumeJlpt() {
    if (jlpt.resume()) goTransient('jlpt-exam')
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
    if (part === 'listening' && !settings.listen && voiceReady) toggleListen()
    const target = DECKS.find((d) => d.id === deckId)
    go({ screen: 'home', deckId: target?.id ?? deck.id })
  }

  function finishJlpt(examItems: ScoredItem[], answers: (number | null)[]) {
    jlpt.finish(examItems, answers)
    goTransient('jlpt-report')
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
          onSearch={() => go({ screen: 'search' })}
          onStart={startLesson}
          onListen={startListen}
          onJlpt={() => go({ screen: 'jlpt-home' })}
          onLearn={() => go({ screen: 'learn' })}
        />
      )}
      {screen === 'listen-play' && (
        <ListenPlayer
          items={scopeKana}
          deck={deck}
          koReady={koReady}
          onExit={exitTransient}
        />
      )}
      {screen === 'lesson' && (
        <Lesson
          items={items}
          pool={scopeKana}
          deck={deck}
          listenMode={listenMode}
          onExit={exitTransient}
          onComplete={finishLesson}
        />
      )}
      {screen === 'complete' && (
        <Complete
          results={results}
          wrong={wrong}
          onReview={() => startReview(wrong)}
          onAgain={startLesson}
          onHome={exitTransient}
        />
      )}
      <Suspense fallback={<div className="screen screen-loading" aria-busy="true" />}>
        {screen === 'search' && <Search onExit={() => go(homeLocation)} />}
        {screen === 'learn' && (
          <Learn
            onOpenWeek={(week) => go({ screen: 'learn-reader', week })}
            onExit={() => go(homeLocation)}
          />
        )}
        {screen === 'learn-reader' && learnWeek !== null && (
          <LearnReader week={learnWeek} onExit={() => go({ screen: 'learn' })} />
        )}
        {screen === 'jlpt-home' && (
          <JlptHome
            voiceReady={voiceReady}
            onStart={(level) => void startJlpt(level)}
            onResume={resumeJlpt}
            onExit={() => go(homeLocation)}
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
            onExit={exitTransient}
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
            onRetake={() => void startJlpt(jlpt.level)}
            onHome={() => go(homeLocation)}
          />
        )}
      </Suspense>
    </div>
  )
}
