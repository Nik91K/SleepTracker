import { TfiAlarmClock } from "react-icons/tfi";
import { MdOutlineAppRegistration } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import Greetings from "../../../common/Greetings";
import { useLocation } from 'react-router-dom';
import './Header.css'


const Header = ({ isLoggedIn, pageTitle } : { isLoggedIn: boolean, pageTitle?:string }) => {
    const location = useLocation()
    return (
        <header className="header">
            { !isLoggedIn &&
                <>
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
                </>
            }
            { isLoggedIn &&
                <div className="page-title">
                    {location.pathname === '/sleeptracker' && <Greetings />}
                    {location.pathname !== '/sleeptracker' && pageTitle && (
                        <p>{pageTitle}</p>
                    )}
                </div>
            }
        </header>
    )
}

export default Header
