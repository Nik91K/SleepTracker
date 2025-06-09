import { Link } from 'react-router';
import SleepRecordForm from '../../common/Forms/SleepRecord';
import ModalButton from '../../common/Modal/Open modal';
import BasicPopover from '../../common/Popover';
import './style.css'
import { useEffect } from 'react'
import React from 'react';

const Sitebar = ({children} : {children:React.ReactNode}) => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')

    useEffect(() => {
        const nameStorage = localStorage.getItem('UserName')
        const emailStorage = localStorage.getItem('UserEmail')
        if (nameStorage) setName(nameStorage)
        if (emailStorage) setEmail(emailStorage)
    }, [])

    useEffect(() => {
        const hamMenu = document.querySelector(".ham-menu")
        const offScreenMenu = document.querySelector(".off-screen-menu")

        if (hamMenu && offScreenMenu) {
            const toggleMenu = () => {
                hamMenu.classList.toggle("active")
                offScreenMenu.classList.toggle("active")
            }

            hamMenu.addEventListener("click", toggleMenu)

            return () => {
                hamMenu.removeEventListener("click", toggleMenu)
            }
        }
    }, []);



    return (
        <>
            <div className="off-screen-menu">
                <ModalButton buttonName='Додати час'>
                    <SleepRecordForm />
                </ModalButton>
                    <Link to="/sleeptracker"><p>SleepTracker</p></Link>
                    <Link to="/login"><p>Логін</p></Link>
                    <Link to="/"><p>Головна</p></Link>
                <BasicPopover>
                    <div className="sitebar-about-user">
                        <div>
                            <img src="https://placehold.co/48x48" alt="" className='sitebar-user-img' />
                        </div>
                        <div className='sitebar-user-data'>
                            <p>{name}</p>
                            <p>{email}</p>
                        </div>
                    </div>
                </BasicPopover>
            </div>

            <nav>
                <div className="ham-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </>
    )
}

export default Sitebar
