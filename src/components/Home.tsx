import { HIRAGANA } from '../data/kana'
import { learnedCount, type Progress } from '../lib/srs'

interface Props {
  progress: Progress
  persistent: boolean
  onStart: () => void
}

export function Home({ progress, persistent, onStart }: Props) {
  const total = HIRAGANA.length
  const learned = learnedCount(progress)
  const pct = Math.round((learned / total) * 100)

  return (
    <main className="screen home">
      <header className="home-head">
        <h1 className="logo">にほんご Pocket</h1>
        <p className="tagline">히라가나부터, 한 손으로</p>
      </header>

      {!persistent && (
        <div className="banner" role="status">
          ⚠️ 이 브라우저에선 진도가 저장되지 않아요 (프라이빗 모드일 수 있어요)
        </div>
      )}

      <section className="progress-card">
        <div className="progress-label">
          <span>히라가나</span>
          <span>
            {learned} / {total}
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="progress-sub">
          {progress.lessonsDone > 0 ? `레슨 ${progress.lessonsDone}회 완료` : '아직 시작 전'}
        </div>
      </section>

      <button className="btn-primary" onClick={onStart}>
        {progress.lessonsDone > 0 ? '오늘의 레슨' : '시작하기'}
      </button>
    </main>
  )
}
