import './styles.css';
import LayoutPage from '../../layoutPage/layoutPage';
import Sitebar from '../../components/Layout/Sitebar/Sitebar';
import ModalButton from '../../components/common/Modal/Open modal/index'
import { useNavigate } from 'react-router';
import { IoLogOutOutline } from "react-icons/io5";
import SubmitButton from '../../components/common/Buttons/SubmitButton';
import Input from '../../components/common/Inputs/Text';
import { getFormInputValueByName } from '../../utils/getInput';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { createSleepRecord } from '../../api/slices/SleepRecord';
import Tooltip from '../../components/common/Tooltip';
import React from 'react';

const MainPage = () => {
    const send = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        send('/')
    }

    const dispatch = useAppDispatch()
    const { loading, error } = useAppSelector(state => state.sleepRecord)
    const [ tooltip, setError ] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)
    const [ date, setDate ] = React.useState('')
    const [fellAsleepAt, setFellAsleepAt] = React.useState('')
    const [wokeUpAt, setWokeUpAt] = React.useState('')

    React.useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('sleepData') || '{}');
        if (savedData.date) setDate(savedData.date);
        if (savedData.fellAsleepAt) setFellAsleepAt(savedData.fellAsleepAt);
        if (savedData.wokeUpAt) setWokeUpAt(savedData.wokeUpAt);
    }, []);

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const date = getFormInputValueByName(event.currentTarget, 'date-track')
        const fellAsleepAt = getFormInputValueByName(event.currentTarget, 'fellAsleepAt')
        const wokeUpAt = getFormInputValueByName(event.currentTarget, 'wokeUpAt')

        if (!date || !fellAsleepAt || !wokeUpAt) {
            setError({type:'error', message:'Будь ласка, заповніть поля.'})
            return
        }

        dispatch(createSleepRecord({ date, fellAsleepAt, wokeUpAt }))
        .unwrap()
        .then(() => {
            setError({type: 'success', message: 'Дані додано'})
            localStorage.setItem('sleepData', JSON.stringify({ date, fellAsleepAt, wokeUpAt }))
        }) .catch((error) => {
            setError({ type: 'error', message: error })
        })
        event.currentTarget.reset()
    }




    return (
        <LayoutPage>
            {tooltip && (
                <Tooltip type={tooltip.type} typeText={tooltip.message} close={() => setError(null)}/>
            )} 
            <div className="main-page">
                <Sitebar>
                    <ModalButton buttonName='Додати час'>
                        <form className="modal-form" onSubmit={handleSubmit}>
                            <h2>Заповніть дані</h2>
                            {loading && <p>Завантаження</p>}
                            <Input type="date" name="date-track" title='Дата' value={date} onChange={(e) => setDate(e.target.value)} />
                            <Input
                                type="text"
                                title='Коли ви лягли спаси'
                                name="fellAsleepAt"
                                pattern="^([01]\d|2[0-3]):([0-5]\d)$"
                                value={fellAsleepAt}
                                onChange={(e) => setFellAsleepAt(e.target.value)}

                            />
                            <Input
                                type="text"
                                title='Коли ви прокинулись'
                                name="wokeUpAt"
                                pattern="^([01]\d|2[0-3]):([0-5]\d)$"
                                value={wokeUpAt}
                                onChange={(e) => setWokeUpAt(e.target.value)}

                            />
                            23:59
                            <SubmitButton type='submit' text='Надіслати' />
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
