// 모든 확인 다이얼로그·시트의 껍데기. DESIGN.md 의 `.modal-backdrop` + `.modal`
// 마크업을 그대로 쓰면서, 다이얼로그가 지켜야 할 동작을 한곳에 모은다.
//
// 예전에는 네 곳(레슨 나가기 · 시험 나가기 · 제출 확인 · 문항 목록)이 같은
// 마크업을 각자 복사해 두고 role/aria-modal 만 붙여놨다. 측정 결과 열린
// 상태에서 Tab 을 6번 누르면 **모달 뒤 문항의 보기 버튼**으로 빠져나갔고,
// `Esc` 는 아무 반응이 없었다. 스크린리더 사용자는 자기가 모달 안에 있는지,
// 어떻게 나가는지 알 수 없었다.
//
// 그래서 여기서 다 처리한다: 제목 연결(aria-labelledby) · 포커스 진입 ·
// 포커스 트랩(Tab/Shift+Tab 순환) · Esc 닫기 · 닫을 때 원래 포커스 복원.
import { useEffect, useId, useRef, useState } from 'react'

interface Props {
  title: string
  /** Esc·배경 클릭으로 닫기. 생략하면 반드시 버튼으로만 닫는 다이얼로그가 된다. */
  onClose?: () => void
  /** 배경 클릭으로도 닫을지. 파괴적 확인창은 false 로 둬 오조작을 막는다. */
  closeOnBackdrop?: boolean
  className?: string
  children: React.ReactNode
}

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Modal({ title, onClose, closeOnBackdrop = false, className, children }: Props) {
  const boxRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  // 열기 전 포커스를 **첫 렌더 중에** 붙잡는다. useEffect 안에서 읽으면 늦다:
  // React 는 커밋 단계에서 autoFocus 를 적용하므로 effect 가 도는 시점의
  // activeElement 는 이미 모달 안쪽 버튼이고, 그걸 복원 대상으로 저장하면
  // 닫은 뒤 사라진 노드에 focus() 를 걸어 결국 body 로 떨어진다(측정으로 확인).
  const [restoreTo] = useState<HTMLElement | null>(
    () => document.activeElement as HTMLElement | null,
  )

  useEffect(() => {
    function focusables(): HTMLElement[] {
      return Array.from(boxRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])
    }

    // 진입 포커스: autoFocus 가 이미 잡았으면 존중하고, 아니면 첫 컨트롤로.
    if (!boxRef.current?.contains(document.activeElement)) focusables()[0]?.focus()

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && onClose) {
        e.preventDefault()
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const list = focusables()
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]
      const active = document.activeElement
      // 트랩: 양 끝에서 순환시키고, 어떤 이유로든 포커스가 모달 밖에 있으면
      // 안으로 되돌린다(배경의 보기 버튼으로 새던 경로를 막는다).
      if (!boxRef.current?.contains(active)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    // capture 로 받는다 — 레슨·시험 화면이 window 에 걸어둔 단축키(1–4, Enter,
    // Esc, R)가 모달이 열린 동안 먼저 반응하면 안 된다.
    window.addEventListener('keydown', onKey, true)
    return () => {
      window.removeEventListener('keydown', onKey, true)
      // 여는 버튼이 그 사이 사라졌을 수도 있다(화면 전환) — 그럴 땐 그냥 둔다.
      if (restoreTo && document.contains(restoreTo)) restoreTo.focus()
    }
  }, [onClose, restoreTo])

  return (
    <div
      className="modal-backdrop"
      onClick={closeOnBackdrop && onClose ? onClose : undefined}
    >
      <div
        ref={boxRef}
        className={className ? `modal ${className}` : 'modal'}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="modal-title" id={titleId}>
          {title}
        </p>
        {children}
      </div>
    </div>
  )
}
