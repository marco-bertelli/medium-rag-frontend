import { useEffect, useRef } from 'react'

export const useDetectClickOutside = ({ setShowModal }: { setShowModal: CallableFunction }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClickOutside(event: DocumentEventMap['mousedown']) {
      if (modalRef && modalRef.current) {
        if (!modalRef.current.contains(event?.target as Node | null)) {
          setShowModal(false)
        }
      }
    }
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setShowModal(false)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [modalRef, setShowModal])
  return modalRef
}
