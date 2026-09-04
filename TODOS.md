# TODOS

Deferred work captured during reviews. Each item has enough context to pick up cold.

## JLPT 모드 (from /plan-eng-review 2026-06-15)

### ~~약점 파트 → SRS 복습 큐 연결~~  ✅ 2026-06-16
리포트 최약점 파트 → 대응 기존 덱으로 점프 버튼으로 해결(문법→문법덱, 어휘/청해→단어덱, 독해→회화덱; 청해는 듣기모드 on). JLPT 문항을 SRS 카드로 주입하는 모델 매핑은 불필요해 채택 안 함.

### ~~DESIGN.md 작성~~  ✅ 2026-06-16
`DESIGN.md` 작성 완료(토큰·컴포넌트 어휘·접근성·안티패턴).

### ~~레벨별 콘텐츠 lazy-load~~  ✅ 2026-09-05
JLPT 문제은행·커리큘럼 분리(0733090)에 이어 덱 데이터도 지연 로드로 전환(74a5cb7).
`src/data/decks.ts`가 동기 메타(`DECK_META` — 탭·문항 수·라우팅·<title>·사이트맵)와
비동기 로더(`loadDeck`)를 분리하고, 덱별 청크는 `src/data/decks/*.ts`. 엔트리 gzip 265KB → 65KB.

### 공유 상단 바(ProgressHeader) — ListenPlayer 적용 남음  ◐ 부분 완료
- **What:** `src/components/ProgressHeader.tsx`는 추출됐지만 `Lesson.tsx`만 쓴다.
  `ListenPlayer.tsx:203`은 여전히 `.lesson-top` 마크업을 직접 들고 있다 — 여기도 갈아끼우면 끝.
- **Why:** 두 화면이 같은 헤더 마크업을 따로 들고 있다(리팩토링 중 식별).
- **Context:** kr-study `docs/study-session.md` §6이 같은 정리를 한 선례.
  ConfirmDialog(=현 `lesson/ExitConfirm`, `Modal` 기반)도 함께 일반화 가능.
