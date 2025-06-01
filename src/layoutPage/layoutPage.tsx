import './layoutPage.css';
import Header from '../components/Layout/Header/Header'
import Footer from '../components/Layout/Footer/Footer'
import { useEffect, useState } from 'react';

const LayoutPage = ({title, children} : {title?:string, children:React.ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token)
    }, []);

    return (
        <div>
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
