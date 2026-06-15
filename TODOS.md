# TODOS

Deferred work captured during reviews. Each item has enough context to pick up cold.

## JLPT 모드 (from /plan-eng-review 2026-06-15)

### 약점 파트 → SRS 복습 큐 연결
- **What:** JLPT 진단 리포트의 최약점 파트(특히 어휘) 문항을 기존 가나/단어 SRS 복습 루프에 복습 후보로 흘려보내기.
- **Why:** 진단이 "너 문법 약해"로 끝나면 행동으로 안 이어짐. 약점 단어를 기존 학습 루프에 자동 주입하면 진단→학습이 닫힌 고리가 됨.
- **Pros:** 시험 대비와 평소 학습이 통합됨. 기존 SRS(`src/lib/srs.ts`) 재사용.
- **Cons:** JLPT VocabQ는 `interface Kana`와 모델이 다름(레벨태그·baked choices) → 매핑 레이어 필요. progress.kana 키 충돌 주의.
- **Context:** 설계 doc(kimyoo-main-design-20260615-013607.md)에서 의도적 보류. JLPT 데이터 모델이 안정된 뒤 착수.
- **Depends on:** JLPT MVP(types.ts/jlpt.ts/데이터) 완료.

### DESIGN.md 작성 (디자인 시스템 문서화)
- **What:** styles.css에 흩어진 토큰(색/폰트/간격/반경)과 컴포넌트 어휘(card/opt/progress-bar/modal/ChoiceGrid)를 DESIGN.md로 정리.
- **Why:** 덱 10개 + JLPT로 UI가 커짐. 문서화하면 이후 /plan-design-review가 거기 calibrate, 신규 화면 일관성↑.
- **Pros:** 디자인 결정 일관성, 새 기여자/미래 세션이 규칙을 한 곳에서 봄.
- **Cons:** 유지보수 부담(코드와 동기화). 토큰이 이미 명확해 지금 필수는 아님.
- **Context:** /plan-design-review 2026-06-15에서 DESIGN.md 부재 확인. 토큰은 styles.css :root에 있음.
- **Depends on:** 없음. 언제든 가능.

### 레벨별 콘텐츠 lazy-load
- **What:** JLPT 레벨 데이터(N5/N4/N3/N2)를 동적 import로 분할 로드.
- **Why:** 현재 eager import. N3/N2까지 콘텐츠가 커지면 초기 번들/로딩이 무거워짐.
- **Pros:** 초기 로드 가벼워짐. PWA 첫 진입 속도 유지.
- **Cons:** 코드 스플리팅 + 로딩 상태 UI 추가. N5-only 시점엔 조기최적화.
- **Context:** /plan-eng-review 성능 섹션에서 식별. N5 MVP에선 불필요, 콘텐츠 증가 시 트리거.
- **Depends on:** N3/N2 콘텐츠가 실제로 추가될 때.
