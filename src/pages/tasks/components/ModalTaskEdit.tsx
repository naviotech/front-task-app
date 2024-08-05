import ReactDOM  from "react-dom"
import { ReactNode } from "react";
type ModalProps = {
  children: ReactNode,
  handleModal: (e: React.MouseEvent) => void
};

const portalRoot = document.getElementById("portal-root-edit")
const ModalTaskEdit = ({handleModal, children}: ModalProps) => {
  if (!portalRoot) return null
  return ReactDOM.createPortal(
    <div onClick={handleModal} className='fixed inset-0 z-20 flex items-center justify-center p-8 bg-opacity-50 bg-black/70'>
      {children}
    </div>,
    portalRoot
  )
}

export default ModalTaskEdit