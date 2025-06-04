import React, { useState } from 'react'
import Modal from '../Wndow/index'
import './style.css'

export default function ModalButton({children, buttonName} : {children: React.ReactNode, buttonName: string}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className='button-style'>
        <button onClick={() => setIsOpen(true)}>{buttonName}</button>

            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                {children}
            </Modal>

      </div>
    </>
  )
}