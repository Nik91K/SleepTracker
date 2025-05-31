import { TfiAlarmClock } from "react-icons/tfi";
import { MdOutlineAppRegistration } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import Sitebar from "../Sitebar/Sitebar";``
import './Header.css'

interface HeaderProps{
    isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {

    return (
        <header className="header">
            {isLoggedIn && (
                <Sitebar />
            )}
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
                        {!isLoggedIn && (
                        <span>Реєстрація</span>
                        )}
                    </div>
                </a>
            </div>
        </header>
    )
}

export default Header
