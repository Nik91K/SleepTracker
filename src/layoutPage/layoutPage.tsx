import './layoutPage.css';
import Header from '../components/Layout/Header/Header'
import Footer from '../components/Layout/Footer/Footer'

const LayoutPage = ({title, children} : {title:string, children:React.ReactNode}) => {
    return (
        <div>
            <Header />
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
