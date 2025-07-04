import { Link, Outlet, useLocation } from 'react-router-dom';
import SleepRecordForm from '../../common/Forms/SleepRecord';
import ModalButton from '../../common/Modal/Open modal';
import BasicPopover from '../../common/Popover';
import './style.css'
import { useEffect } from 'react'
import React from 'react';
import defaultAvatar from '../../../assets/avatar/default-avatar.jpg'
import { MdNightsStay } from "react-icons/md";
import { IoSettingsSharp, IoStatsChart } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from '../../../api/hooks'
import { getUserAvatar } from '../../../api/slices/userSlice'
import { userData } from '../../../api/slices/authSlice';

const Sitebar = () => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const location = useLocation()
    const currentPath = location.pathname
    const showSidebar = location.pathname.startsWith('/sleeptracker')
    const { loading, error, image } = useAppSelector((state) => state.users)
    const { user } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    let imageUrl = image
    if (image && image.startsWith('/uploads')) {
        imageUrl = `${import.meta.env.VITE_API_URL}${image}`
    }

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

    useEffect(() => {
        dispatch(getUserAvatar())
        dispatch(userData())
    }, [dispatch])

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
                    <Link to="/sleeptracker" className={`sitebar-button ${currentPath === '/sleeptracker' ? 'active' : ''}`}><MdNightsStay />SleepTracker</Link>
                    <Link to="/sleeptracker/statistics" className={`sitebar-button ${currentPath === '/sleeptracker/statistics' ? 'active' : ''}`}><IoStatsChart />Статистика</Link>
                    <Link to="/sleeptracker/settings" className={`sitebar-button ${currentPath === '/sleeptracker/settings' ? 'active' : ''}`}><IoSettingsSharp/>Налаштування</Link>
                    <ModalButton buttonName='Додати час'>
                        <SleepRecordForm />
                    </ModalButton>
                    <div className='sitebar-about-user-container'>
                        <BasicPopover>
                            <div className="sitebar-about-user">
                                <div>
                                    <p>{loading}</p>
                                    <img src={imageUrl ? imageUrl : defaultAvatar} alt="User avatar" className='sitebar-user-img' />
                                </div>
                                <div className='sitebar-user-data'>
                                    <p>{user?.name || 'Користувач'}</p>
                                    <p>{user?.email || 'email@example.com'}</p>
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
