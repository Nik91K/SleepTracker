import { useLocation } from "react-router"
import "./Footer.css"

const Footer = () => {
    const location = useLocation()
    const visibleRoutes = ['/', '/register', '/login']
    if (!visibleRoutes.includes(location.pathname)) {
    return null;
    }

    return (
        <footer className="footer">
            <p>
                Вихідний код:{" "}
                <a href="https://github.com/Nik91K/SleepTracker" target="_blank" rel="noreferrer" className="link">
                github.com/Nik91K/SleepTracker
                </a>
            </p>
            <p><a href="/register" className="link">Реєстрація</a></p>
            <p><a href="/login" className="link">Логін</a></p>
        </footer>
    )
}

export default Footer
