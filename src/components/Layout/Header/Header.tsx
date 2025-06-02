import { TfiAlarmClock } from "react-icons/tfi";
import { MdOutlineAppRegistration } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import Sitebar from "../Sitebar/Sitebar";``
import './Header.css'
import { useNavigate } from "react-router";


const Header = ({ isLoggedIn } : { isLoggedIn: boolean }) => {
    const send = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        send('/')
    }

    return (
        <header className="header">
            <div className="header-title">
                {isLoggedIn && (
                    <Sitebar />
                )}
                <TfiAlarmClock size={35} />
                <span className="header-title">Sleep tracker</span>
            </div>
            <div className="header-links">
                {!isLoggedIn && (
                <a href="/login" className="link header-link">
                    <div>
                        <MdOutlineAppRegistration size={20}/>
                        <span>Вхід</span>
                    </div>
                </a>
                )}
                {!isLoggedIn && (
                <a href="/register" className="link header-link">
                    <div>
                        <IoLogInOutline size={20}/>
                        <span>Реєстрація</span>
                        
                    </div>
                </a>
                )}
                {isLoggedIn && (
                    <div onClick={logout} className="link header-link">
                        <IoIosLogOut size={20}/>
                        <span>Вийти з акаунту</span>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
