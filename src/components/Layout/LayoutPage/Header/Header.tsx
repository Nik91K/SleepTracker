import { TfiAlarmClock } from "react-icons/tfi";
import { MdOutlineAppRegistration } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import './Header.css'


const Header = ({ isLoggedIn } : { isLoggedIn: boolean }) => {

    if (isLoggedIn) return null
    return (
        <header className="header">
            <div className="header-title">
                <TfiAlarmClock size={35} />
                <span className="header-title">Sleep tracker</span>
            </div>
            <div className="header-links">
                <a href="/login" className="link header-link">
                    <div>
                        <MdOutlineAppRegistration size={20}/>
                        <span>Вхід</span>
                    </div>
                </a>
                <a href="/register" className="link header-link">
                    <div>
                        <IoLogInOutline size={20}/>
                        <span>Реєстрація</span>                      
                    </div>
                </a>
            </div>
        </header>
    )
}

export default Header
