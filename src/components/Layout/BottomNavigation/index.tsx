import './style.css'
import { FaHome, FaCog } from 'react-icons/fa'
import { FaChartSimple } from "react-icons/fa6";
import { Link, useLocation } from 'react-router'

const BottomNavigation = () => {
    const currentPath = useLocation().pathname
    
    return (
        <div className="bottom-nav">
            <Link to="/sleeptracker" className={`navigation-button ${currentPath === '/sleeptracker' ? 'active' : ''}`}>
                <FaHome />
                <span>Home</span>
            </Link>
            <Link to="/sleeptracker/statistics" className={`navigation-button ${currentPath === '/sleeptracker/statistics' ? 'active' : ''}`}>
                <FaChartSimple />
                <span>Statistics</span>
            </Link>
            <Link to="/sleeptracker/settings" className={`navigation-button ${currentPath === '/sleeptracker/settings' ? 'active' : ''}`}>
                <FaCog />
                <span>Settings</span>
            </Link>
        </div>
    )
}

export default BottomNavigation
