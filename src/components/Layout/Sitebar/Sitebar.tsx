import { Link, Outlet, useLocation } from 'react-router-dom';
import SleepRecordForm from '../../common/Forms/SleepRecord';
import ModalButton from '../../common/Modal/Open modal';
import BasicPopover from '../../common/Popover';
import './style.css'
import { useEffect } from 'react'
import React from 'react';
import { MdNightsStay } from "react-icons/md";
import { IoSettingsSharp, IoStatsChart } from "react-icons/io5";
const Sitebar = () => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const location = useLocation()
    const showSidebar = location.pathname.startsWith('/sleeptracker')

    useEffect(() => {
        const nameStorage = localStorage.getItem('UserName') || 'Користувач'
        const emailStorage = localStorage.getItem('UserEmail') || 'email@example.com'
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

    if (!showSidebar) {
        return <Outlet />
    }

    return (
        <div style={{ display: 'flex' }}>
            {showSidebar && (
                <>
                <div className="ham-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className="off-screen-menu">
                    <Link to="/sleeptracker" className='sitebar-button'><MdNightsStay />SleepTracker</Link>
                    <Link to="/sleeptracker/statistics" className='sitebar-button'><IoStatsChart />Статистика</Link>
                    <Link to="/sleeptracker/settings" className='sitebar-button'><IoSettingsSharp/>Налаштування</Link>
                    <ModalButton buttonName='Додати час'>
                        <SleepRecordForm />
                    </ModalButton>
                    <div className='sitebar-about-user-container'>
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
                </div>
                </>
            )}
            <div style={{ flex: 1}}>
                <Outlet />
            </div>
        </div>
    )
}

export default Sitebar
