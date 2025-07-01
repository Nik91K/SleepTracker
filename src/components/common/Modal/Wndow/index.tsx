import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { IoCloseOutline } from "react-icons/io5";

export default function Modal({ open, children, onClose } : { open: boolean, children: React.ReactNode, onClose: () => void }) {
  if (!open) return null

  
  return ReactDOM.createPortal(
    <>
      <div className='overlay-window' onClick={onClose} />
      <div className="modal-window" role="dialog" aria-modal="true">
        <button className='close-button' onClick={onClose}><IoCloseOutline size={30} /></button>
        {children}
      </div>
    </>,
    document.getElementById('portal')!
  )
}