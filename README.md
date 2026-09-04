# にほんご Pocket

폰으로 하는 일본어 독학 — 히라가나부터 JLPT까지. React + Vite + PWA, GitHub Pages 정적 호스팅.

듀오링고 스타일 레슨, 즉각 효과음 피드백, 브라우저 내장 일본어 발음(TTS),
가벼운 Leitner 간격반복(SRS). 백엔드 없음 — 진도는 브라우저 localStorage에 저장.

**11개 덱**(가나·단어·외래어·조수사·의태어·문법·회화·경어·한자·빈칸, 6,040항목) +
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
  data/kana.ts        가나 104자 + 덱/카드 타입(Deck·DeckId·DeckKind·Kana)
  data/decks.ts       덱 레지스트리 — 동기 메타(DECK_META)와 지연 로더(loadDeck) 분리
  data/decks/*.ts     덱별 지연 로드 청크 (words/loanwords/counters/mimetic/
                      grammar/phrases/keigo/kanji/cloze) — 카테고리 라벨 포함
  data/*.ts           덱 콘텐츠 원본 (`*-expanded.ts` 는 2배 확장분)
  data/curriculum.ts  12주 개념 학습 커리큘럼(마크다운)
  data/jlpt/          JLPT 문제 은행(n5~n2) + 시험 타입 — 레벨별 동적 로드
  lib/srs.ts          순수 SRS (박스/interval/due/레슨 선택) — 부수효과 없음
  lib/quiz.ts         순수 문제 생성 (distractor 같은 행 우선; 빈칸은 카드 자체 선택지)
  lib/jlpt.ts         JLPT 시험 구성·채점·진행 저장
  lib/router.ts       URL ⇄ 화면 매핑 (주소를 갖는 화면 / 일시적 화면 구분)
  lib/meta.ts         라우트별 title·description·canonical·og:* 갱신
  lib/deck.ts         덱 종류별 뷰 헬퍼 (글리프 클래스/일본어 텍스트/인덱스 클램프)
  lib/search.ts       전 덱 통합 검색 (romaji/뜻/글자)
  lib/storage.ts      localStorage 래퍼 (사파리 프라이빗/쿼터 오류 시 메모리로 강등)
  lib/sw.ts           서비스워커 업데이트 채널 (레슨 중 자동 새로고침 방지)
  lib/rng.ts          공용 난수·셔플 (테스트에서 주입 가능)
  lib/speak.ts        Web Speech API 발음, sound.ts 효과음, hangul.ts 가나→한글
  hooks/              useProgress(진도) / useSettings(설정) / useJlptExam(JLPT 상태)
  components/         App(라우팅) / Home / Lesson(+lesson/ 하위) / ProgressHeader /
                      Complete / Search / ListenPlayer / Jlpt*(시험) /
                      Learn·LearnReader(개념) / Markdown / Modal / ChoiceGrid / KeyHint
scripts/guide-plugin.ts  빌드 시 정적 HTML 생성 Vite 플러그인 (아래 "정적 생성")
```

도메인 로직(`lib/srs.ts`, `lib/quiz.ts`, `lib/jlpt.ts`)은 순수 함수라 목킹 없이 단위 테스트됩니다.

한자 확장 데이터의 글자·읽기·영어 원뜻은 EDRDG의
[KANJIDIC2](https://www.edrdg.org/wiki/index.php/KANJIDIC2)를 기반으로 하며
CC BY-SA 4.0 조건을 따릅니다. 한국어 뜻은 학습용으로 간결하게 번역했습니다.

## 정적 생성

앱은 CSR이라 JS를 실행하지 않는 크롤러에게는 빈 문서로 보인다. `scripts/guide-plugin.ts`가
빌드 시 세 가지를 굽는다.

- `/guide/week-N/` — 12주 커리큘럼 본문. 앱의 `Markdown` 컴포넌트를 그대로
  `renderToStaticMarkup` 하므로 화면과 마크업이 벌어지지 않는다. 앱 라우트
  `/learn/week-N`은 canonical로 여기를 가리킨다.
- 앱 라우트별 `index.html` 사본 — GitHub Pages는 404.html을 HTTP 404로 서빙해서
  `/deck/kanji` 같은 경로가 화면은 떠도 색인되지 않는다. 사본을 두면 200으로 응답하고,
  head는 `lib/meta.ts`의 그 라우트 값으로, 본문에는 덱 문항 목록이 정적으로 들어간다.
- `sitemap.xml` — 색인 대상 URL과 `lastmod`(git 커밋일).

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
- v24: 흘려듣기 — 자동재생 듣기 모드, 속도 0.8~2.0배, 10/50 건너뛰기 ✅
- v25: 빈칸(穴埋め) 객관식 덱 추가 → 11덱. 220문항(N5~N3 문법)으로 확장 ✅
- v26: 코드 리팩토링(공용 헬퍼·Lesson 분리·useJlptExam 훅). 레슨은 6문제 고정 유지(세션 연속화·단계 스킵은 도입 후 롤백) ✅
- v27: 키보드 컨트롤(퀴즈·흘려듣기 단축키 + 힌트) · UI 다듬기(나가기 버튼 히트영역, 오버스크롤 바운스 제거, 객관식 텍스트/마크 축소) · 새 배포 알림 배너(레슨 중 자동 새로고침 방지, 홈에서 적용) ✅
- v28: 고정 문자 덱을 제외한 9개 콘텐츠 덱을 각각 정확히 2배로 확장 — 총 6,040항목. 통합 중복·필드·카테고리·오답 감사 추가 ✅
- v29: 화면마다 URL 부여 — 딥링크·뒤로가기·라우트별 메타(`lib/router.ts`·`lib/meta.ts`),
  GitHub Pages SPA 404 대응(라우트별 정적 HTML 사본) ✅
- v30: 검색 노출 — 12주 커리큘럼 정적 페이지(`/guide/week-N/`), sitemap·robots,
  JSON-LD(WebApplication·Course), OG 이미지·공유 미리보기, 덱 페이지에 문항 목록 정적 노출 ✅
- v31: 접근성·디자인 정리 — 모달 포커스 트랩·터치 타깃·동작 축소, 대비 AA,
  덱 탭 tablist 관례, 4px 간격 스케일 토큰화, `lang="ja"` ✅
- v32 (현재): 성능 — 커리큘럼·JLPT 문제은행 분리에 이어 덱 데이터 지연 로드
  (`data/decks.ts` 메타/로더 분리, 엔트리 gzip 265KB → 65KB) ✅
- v33+: 학습 통계
