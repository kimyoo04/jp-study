# TODOS

Deferred work captured during reviews. Each item has enough context to pick up cold.

## JLPT 모드 (from /plan-eng-review 2026-06-15)

### ~~약점 파트 → SRS 복습 큐 연결~~  ✅ 2026-06-16
리포트 최약점 파트 → 대응 기존 덱으로 점프 버튼으로 해결(문법→문법덱, 어휘/청해→단어덱, 독해→회화덱; 청해는 듣기모드 on). JLPT 문항을 SRS 카드로 주입하는 모델 매핑은 불필요해 채택 안 함.

### ~~DESIGN.md 작성~~  ✅ 2026-06-16
`DESIGN.md` 작성 완료(토큰·컴포넌트 어휘·접근성·안티패턴).

### 레벨별 콘텐츠 lazy-load
- **What:** JLPT 레벨 데이터(N5/N4/N3/N2)를 동적 import로 분할 로드.
- **Why:** 현재 eager import. N3/N2까지 콘텐츠가 커지면 초기 번들/로딩이 무거워짐.
- **Pros:** 초기 로드 가벼워짐. PWA 첫 진입 속도 유지.
- **Cons:** 코드 스플리팅 + 로딩 상태 UI 추가. N5-only 시점엔 조기최적화.
- **Context:** /plan-eng-review 성능 섹션에서 식별. N5 MVP에선 불필요, 콘텐츠 증가 시 트리거.
- **Depends on:** N3/N2 콘텐츠가 실제로 추가될 때.
