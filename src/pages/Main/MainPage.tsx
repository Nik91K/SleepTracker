import './styles.css';
import LayoutPage from '../../layoutPage/layoutPage';
import Sitebar from '../../components/Layout/Sitebar/Sitebar';
import ModalButton from '../../components/common/Modal/Open modal/index'
import { useNavigate } from 'react-router';
import { IoLogOutOutline } from "react-icons/io5";
import SubmitButton from '../../components/common/Buttons/SubmitButton';
import Input from '../../components/common/Input';
import { getFormInputValueByName } from '../../utils/getInput';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { createSleepRecord } from '../../api/slices/SleepRecord';
import Tooltip from '../../components/common/Tooltip';
import React, { useEffect } from 'react';
import SleepRecordForm from '../../components/common/Forms/SleepRecord';
import BasicPopover from '../../components/common/Popover';

const MainPage = () => {

    const [ tooltip, setError ] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')

    useEffect(() => {
        const nameStorage = localStorage.getItem('UserName')
        const emailStorage = localStorage.getItem('UserEmail')
        if (nameStorage) setName(nameStorage)
        if (emailStorage) setEmail(emailStorage)
    }, [])

    return (
        <LayoutPage>
            {tooltip && (
                <Tooltip type={tooltip.type} typeText={tooltip.message} close={() => setError(null)}/>
            )} 
            <div className="main-page">
                <Sitebar>
                    <ModalButton buttonName='Додати час'>
                        <SleepRecordForm />
                    </ModalButton>
                    <BasicPopover>
                        <div className="sitebar-about-user">
                            <div>
                                <img src="https://placehold.co/48x48" alt="" className='sitebar-user-img' />
                            </div>
                            <div className='sitebar-user-data'>
                                <p>{name}</p>
                                <p>{email}</p>
                            </div>
                        </div>
                    </BasicPopover>
                    
                </Sitebar>
            </div>
        </LayoutPage>
    )
}

export default MainPage
