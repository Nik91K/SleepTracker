import './layoutPage.css';
import Header from '../components/Layout/Header/Header'
import Footer from '../components/Layout/Footer/Footer'
import { useEffect, useState } from 'react';

const LayoutPage = ({title, children} : {title?:string, children:React.ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsLoggedIn(!!token)
    }, []);

    return (
        <div className='layout-page' data-theme={isDark ? 'dark' : 'light'}>
            <Header isLoggedIn={isLoggedIn} />
            <main className='main-container'>
                <h2 className='layout-h2'>{title}</h2>
                <div className="content">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default LayoutPage
