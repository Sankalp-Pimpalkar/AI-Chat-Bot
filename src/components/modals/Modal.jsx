/* eslint-disable react/prop-types */
import { useEffect } from 'react'

function Modal({ isOpen, onClose, children }) {

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'escape') {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className='w-full h-full z-10 antialiased fixed flex items-center justify-center p-2 inset-0 bg-gray-900/90'>
            <div className='w-fit max-w-sm h-fit bg-gray-900 border border-gray-800 p-5 rounded-md'>
                {children}
            </div>
        </div>
    )
}

export default Modal