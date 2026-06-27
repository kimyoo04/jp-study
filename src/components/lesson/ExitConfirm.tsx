// Confirmation shown when the user tries to leave a lesson mid-progress.
export function ExitConfirm({ onStay, onLeave }: { onStay: () => void; onLeave: () => void }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <p className="modal-title">나가시겠어요?</p>
        <p className="modal-body">나가면 이번 레슨 진도가 사라져요.</p>
        <button className="btn-primary" onClick={onStay} autoFocus>
          계속하기
        </button>
        <button className="btn-ghost" onClick={onLeave}>
          나가기
        </button>
      </div>
    </div>
  )
}
