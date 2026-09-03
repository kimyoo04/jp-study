// Confirmation shown when the user tries to leave a lesson mid-progress.
// 다이얼로그 동작(포커스 트랩·Esc·포커스 복원)은 Modal 이 맡는다.
import { Modal } from '../Modal'

export function ExitConfirm({ onStay, onLeave }: { onStay: () => void; onLeave: () => void }) {
  return (
    <Modal title="나가시겠어요?" onClose={onStay}>
      <p className="modal-body">나가면 이번 레슨 진도가 사라져요.</p>
      <button className="btn-primary" onClick={onStay} autoFocus>
        계속하기
      </button>
      <button className="btn-ghost" onClick={onLeave}>
        나가기
      </button>
    </Modal>
  )
}
