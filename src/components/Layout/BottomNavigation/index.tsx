import './style.css'
import { FaHome, FaCog } from 'react-icons/fa'
import { FaChartSimple } from "react-icons/fa6";
import { Link } from 'react-router'

const BottomNavigation = () => {

    return (
        <div className="bottom-nav">
            <Link to="/sleeptracker" className="nav-btn">
                <FaHome />
                <span>Home</span>
            </Link>
            <Link to="/sleeptracker/statistics" className="nav-btn">
                <FaChartSimple />
                <span>Statistics</span>
            </Link>
            <Link to="/sleeptracker/settings" className="nav-btn">
                <FaCog />
                <span>Settings</span>
            </Link>
        </div>
    )
}

export default BottomNavigation
