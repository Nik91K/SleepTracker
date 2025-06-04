import './styles.css';
import LayoutPage from '../../layoutPage/layoutPage';
import Sitebar from '../../components/Layout/Sitebar/Sitebar';
import ModalButton from '../../components/common/Modal/Open modal/index'
import { useNavigate } from 'react-router';
import { IoLogOutOutline } from "react-icons/io5";
import SubmitButton from '../../components/common/Buttons/SubmitButton';
import Input from '../../components/common/Inputs/Text';

const MainPage = () => {
    const send = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        send('/')
    }
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

    }

    return (
        <LayoutPage>
            <div className="main-page">
                <Sitebar>
                    <ModalButton buttonName='Додати час'>
                        <form className="modal-form">
                            <h2>Заповніть дані</h2>

                            <Input type="date" name="name" title='Дата' />
                            <Input
                                type="text"
                                title='Коли ви лягли спаси'
                                name="fellAsleepAt"
                                pattern="^([01]\d|2[0-3]):([0-5]\d)$"
                            />
                            <Input
                                type="text"
                                title='Коли ви прокинулись'
                                name="fellAsleepAt"
                                pattern="^([01]\d|2[0-3]):([0-5]\d)$"
                            />
                            23:59
                            <SubmitButton type='button' onClick={handleSubmit} text='Надіслати' />
                        </form>
                    </ModalButton>
                    <div className='logout-button' onClick={logout}>
                        <IoLogOutOutline />
                        <p>Вийти з акканту</p>
                    </div>
                </Sitebar>
            </div>
        </LayoutPage>
    )
}

export default MainPage
