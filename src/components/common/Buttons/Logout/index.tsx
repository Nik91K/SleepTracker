import { IoLogOutOutline } from 'react-icons/io5'
import './style.css'
import { useNavigate } from 'react-router'

const LogoutButton = () => {
    const send = useNavigate()
    const logout = () => {
        localStorage.removeItem('UserName')
        localStorage.removeItem('UserEmail')
        send('/')
    }

    return (
        <div className='logout-button' onClick={logout}>
           <IoLogOutOutline />
            <p>Вийти з акканту</p>
        </div>
    )
}

export default LogoutButton
