import { FaChevronRight } from "react-icons/fa";
import React, { useState } from 'react'
import Modal from '../Wndow/index'
import './style.css'

export default function ModalButton({children, buttonName} : {children: React.ReactNode, buttonName?: string}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className='button-style'>
        <button className="modal-button" onClick={() => setIsOpen(true)}><p>{buttonName}</p><FaChevronRight /></button>

            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                {children}
            </Modal>

      </div>
    </>
  )
}