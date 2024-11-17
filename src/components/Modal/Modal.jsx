import { useEffect, useRef } from 'react'
import './Modal.css'

function Modal ({ isOpen, setIsOpen, children }) {

  const modalRef = useRef()
  
  useEffect(() => {

    const modalClose = (e) => {

      const modal = modalRef.current

      if (modal && !modal.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', modalClose)

    return () => {
      document.removeEventListener('mousedown', modalClose)
    }
  })

  return (
    <div className={`modal ${isOpen ? 'modal--open' : ''}`}>
      <div className="modal--overlay"></div>
      <div ref={modalRef} className="modal__container">
        {children}
      </div>
    </div>
  )
}
export default Modal