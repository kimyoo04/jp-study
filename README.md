# にほんご Pocket

폰으로 하는 일본어 독학 — 히라가나부터. React + Vite + PWA, GitHub Pages 정적 호스팅.

듀오링고 스타일의 짧은(2~3분) 레슨, 즉각 효과음 피드백, 브라우저 내장 일본어 발음(TTS),
가벼운 Leitner 간격반복(SRS). 백엔드 없음 — 진도는 브라우저 localStorage에 저장.

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
  data/kana.ts        가나 + 덱 정의 (히라가나/가타카나/단어/외래어/문법)
  data/words.ts       기초 단어, loanwords.ts 외래어, grammar.ts 문법 예문
  lib/srs.ts          순수 SRS 로직 (박스/interval/due/레슨 선택) — 부수효과 없음
  lib/quiz.ts         순수 문제 생성 (distractor: 같은 행 우선)
  lib/speak.ts        Web Speech API 발음 (보이스 감지/제스처 게이팅/폴백)
  lib/sound.ts        Web Audio 효과음 (mp3 불필요)
  hooks/useProgress.ts  localStorage 영속성 (프라이빗 모드 폴백)
  components/         App(화면 전환) / Home / Lesson / Complete
```

도메인 로직(`lib/srs.ts`, `lib/quiz.ts`)은 순수 함수라 목킹 없이 단위 테스트됩니다.

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
- v8 (현재): 문법 패턴 11종·예문 44개로 확장 (たい/ませんか/あります/ください/から…まで/と おもいます 등) ✅
- v9+: 더 많은 문법, 자유 입력 채점
