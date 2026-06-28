# にほんご Pocket

폰으로 하는 일본어 독학 — 히라가나부터 JLPT까지. React + Vite + PWA, GitHub Pages 정적 호스팅.

듀오링고 스타일 레슨, 즉각 효과음 피드백, 브라우저 내장 일본어 발음(TTS),
가벼운 Leitner 간격반복(SRS). 백엔드 없음 — 진도는 브라우저 localStorage에 저장.

**11개 덱**(가나·단어·외래어·조수사·의태어·문법·회화·경어·한자·빈칸, 약 3,100항목) +
**JLPT 모의고사**(N5~N2 진단) + **흘려듣기**(자동재생) + **개념 학습**(12주 커리큘럼) +
**전 덱 검색**. 한 레슨은 최대 6문제(밀린 복습 우선, 그다음 신규)로 진행한다.

## 개발

```bash
pnpm install
pnpm dev          # http://localhost:5173/jp-study/
pnpm test         # 단위 테스트 (Vitest)
pnpm test:e2e     # E2E (Playwright) — 최초 1회: pnpm exec playwright install chromium
pnpm build        # 프로덕션 빌드 -> dist/
pnpm preview      # 빌드 결과 미리보기
```

## 구조

```
src/
  data/kana.ts        가나 + 11개 덱 정의(DECKS) + 카테고리 분류(deckCategories)
  data/*.ts           덱 콘텐츠 — words/loanwords/counters/mimetic/grammar/
                      phrases/keigo/kanji/cloze(빈칸)
  data/curriculum.ts  12주 개념 학습 커리큘럼(마크다운)
  data/jlpt/          JLPT 문제 은행(n5~n2) + 시험 타입
  lib/srs.ts          순수 SRS (박스/interval/due/레슨 선택) — 부수효과 없음
  lib/quiz.ts         순수 문제 생성 (distractor 같은 행 우선; 빈칸은 카드 자체 선택지)
  lib/jlpt.ts         JLPT 시험 구성·채점·진행 저장
  lib/deck.ts         덱 종류별 뷰 헬퍼 (글리프 클래스/일본어 텍스트/인덱스 클램프)
  lib/search.ts       전 덱 통합 검색 (romaji/뜻/글자)
  lib/speak.ts        Web Speech API 발음, sound.ts 효과음, hangul.ts 가나→한글
  hooks/              useProgress(진도) / useSettings(설정) / useJlptExam(JLPT 상태)
  components/         App(화면 전환) / Home / Lesson(+lesson/ 하위) / Complete /
                      Search / ListenPlayer / Jlpt*(시험) / Learn·LearnReader(개념)
```

도메인 로직(`lib/srs.ts`, `lib/quiz.ts`, `lib/jlpt.ts`)은 순수 함수라 목킹 없이 단위 테스트됩니다.

## 배포

`main`에 푸시하면 GitHub Actions가 테스트 → 빌드 → GitHub Pages 배포.
저장소 Settings → Pages → Source를 **GitHub Actions**로 설정하세요.

서브패스(`/jp-study/`) 호스팅이므로 `vite.config.ts`의 `base`와 PWA manifest
`start_url`/`scope`가 모두 그 경로를 사용합니다. 저장소 이름이 다르면 `base`만 바꾸면 됩니다.

## 로드맵

- v1: 히라가나 46자 ✅
- v2: 탁음/반탁음(25) + 요음(33), 효과음 토글 ✅ — 히라가나 104자
- v3: 가타카나 104자 (홈에서 ひらがな/カタカナ 덱 전환) ✅
- v4: 단어/인사말 덱(글자→뜻 퀴즈) + 완료 화면 칩 요약 & "틀린 것만 복습" ✅
- v5: 단어 83개로 확장 — 인사말/숫자/생활/시간/색깔/음식/동물/가족/동사/형용사/요일 ✅
- v6: 외래어 덱(카타카나 외래어 32단어, コーヒー=커피 등) ✅
- v7: 문법/예문 덱 + 홈 "약한 것만 복습"(seen·box<3 모아 출제) ✅
- v8: 문법 패턴 11종·예문 44개 (たい/ませんか/あります/ください/から…まで/と おもいます 등) ✅
- v9: 형용사 활용·존댓말 6패턴 — 문법 17패턴·예문 68개 ✅
- v10: て형·조사 심화 7패턴 — 문법 24패턴·예문 94개 ✅
- v11: 디자인 리뷰 개선 4건 — ✓/✗ 아이콘, 정답 팝, 홈 전체 진척, 나가기 확인 ✅
- v12: 문법 6패턴 추가 — 30패턴·예문 116개 ✅
- v13: 세 덱 확장 — 단어 141 / 외래어 71 / 문법 36패턴 (총 554) ✅
- v14: 단어 191 / 외래어 103 / 문법 42패턴 (총 654) ✅
- v15: 회화 덱 추가 (상황별 일상 회화). 탭바 가로 스크롤 ✅
- v16: 콘텐츠 대확장 — 단어 579 · 외래어 309 · 문법 456 · 회화 500 ✅
- v17: 한자(漢字) 덱 추가 (글자→뜻 퀴즈). 총 7덱 ✅
- v18: 콘텐츠 확장 — 회화 500 · 한자 500 (총 2552 항목) ✅
- v19: 카테고리 선택 — 덱 안에서 테마/패턴/상황별로 골라 학습 (홈 드롭다운) ✅
- v20: 조수사·의태어·경어 덱 추가 — 10덱 ✅
- v21: 전 덱 통합 검색 (romaji·뜻·글자로 즉시 검색) ✅
- v22: JLPT 모의고사 — N5~N2 4파트 진단, 문항 네비게이터·카운트업 타이머·오답 복습, 약점 파트→덱 점프 ✅
- v23: 개념 학습 — 12주 커리큘럼 마크다운 리더 ✅
- v24: 흘려듣기 — 자동재생 듣기 모드, 속도 0.8/1.0/1.2, 10/50 건너뛰기 ✅
- v25: 빈칸(穴埋め) 객관식 덱 추가 → 11덱. 220문항(N5~N3 문법)으로 확장 ✅
- v26 (현재): 코드 리팩토링(공용 헬퍼·Lesson 분리·useJlptExam 훅). 레슨은 6문제 고정 유지(세션 연속화·단계 스킵은 도입 후 롤백) ✅
- v27+: 학습 통계, 레벨별 콘텐츠 lazy-load
