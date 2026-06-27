# TODOS

Deferred work captured during reviews. Each item has enough context to pick up cold.

## JLPT 모드 (from /plan-eng-review 2026-06-15)

### ~~약점 파트 → SRS 복습 큐 연결~~  ✅ 2026-06-16
리포트 최약점 파트 → 대응 기존 덱으로 점프 버튼으로 해결(문법→문법덱, 어휘/청해→단어덱, 독해→회화덱; 청해는 듣기모드 on). JLPT 문항을 SRS 카드로 주입하는 모델 매핑은 불필요해 채택 안 함.

### ~~DESIGN.md 작성~~  ✅ 2026-06-16
`DESIGN.md` 작성 완료(토큰·컴포넌트 어휘·접근성·안티패턴).

### 레벨별 콘텐츠 lazy-load  ⚡ 트리거 충족(2026-06)
- **What:** JLPT 레벨 데이터(N5/N4/N3/N2)를 동적 import로 분할 로드.
- **Why:** 현재 `src/data/jlpt/index.ts`에서 N5~N2를 eager import. 빌드 시 "chunks > 500 kB" 경고가 뜬다.
- **Pros:** 초기 로드 가벼워짐. PWA 첫 진입 속도 유지.
- **Cons:** 코드 스플리팅 + 로딩 상태 UI 추가.
- **Context:** /plan-eng-review 성능 섹션에서 식별. N5 MVP에선 조기최적화였으나 **N5~N2 4레벨이 모두 추가돼 트리거 조건이 충족됨** — 이제 착수 가능.

### 공유 상단 바(ProgressHeader) 추출
- **What:** `.lesson-top`(✕ + ‹ + 진행바 + 카운터) 마크업이 `Lesson.tsx`와 `ListenPlayer.tsx`에 중복. 공용 `ProgressHeader` 컴포넌트로 추출.
- **Why:** 두 화면이 같은 헤더 마크업을 따로 들고 있다(리팩토링 중 식별).
- **Context:** kr-study `docs/study-session.md` §6이 같은 정리를 한 선례. ConfirmDialog(=현 `ExitConfirm`)도 함께 일반화 가능.
