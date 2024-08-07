import ReactDOM  from "react-dom"
import { ReactNode } from "react";
type ModalProps = {
  children: ReactNode,
  handleModalStatus: (e: React.MouseEvent) => void
};

const portalRoot = document.getElementById("portal-root-status")
const ModalStatus = ({handleModalStatus, children}: ModalProps) => {
  
    if (!portalRoot) return null
  return ReactDOM.createPortal(
    <div onClick={handleModalStatus} className='fixed inset-0 z-20 flex items-center justify-center p-8 bg-opacity-50 bg-black/70'>
      {children}
    </div>,
    portalRoot
  )
}

export default ModalStatus
