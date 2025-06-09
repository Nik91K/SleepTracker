import './styles.css';
import LayoutPage from '../../layoutPage/layoutPage';
import Sitebar from '../../components/Layout/Sitebar/Sitebar';
import ModalButton from '../../components/common/Modal/Open modal/index'
import { Link, useLocation, useNavigate } from 'react-router';
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
    

    return (
        <LayoutPage>
            {tooltip && (
                <Tooltip type={tooltip.type} typeText={tooltip.message} close={() => setError(null)}/>
            )} 
            <div className="main-page">
                <p>Головна сторінка</p>
            </div>
        </LayoutPage>
    )
}

export default MainPage
