import './styles.css';
import LayoutPage from '../../layoutPage/layoutPage';
import Tooltip from '../../components/common/Tooltip';
import React, { useEffect } from 'react';
import Greetings from '../../components/common/Greetings';
import { showSleepRecord } from '../../api/slices/SleepRecord';
import { useAppDispatch, useAppSelector } from '../../api/hooks';

const MainPage = () => {
    const [ tooltip, setError ] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)
    const { loading, error, records } = useAppSelector((state) => state.sleepRecord)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(showSleepRecord())
    }, [dispatch]);
    
    return (
        <LayoutPage>
            {tooltip && (
                <Tooltip type={tooltip.type} typeText={tooltip.message} close={() => setError(null)}/>
            )} 
            <div className="main-page">
                <Greetings />
            </div>
            <div>
                <p>{loading}</p>
                {error && <p style={{color: 'red'}}>{JSON.stringify(error)}</p>}
                <div>
                    {records.map((record) => (
                        <li key={record.id}>
                            <p>{record.fellAsleepAt}</p>
                            <p>{record.wokeUpAt}</p>
                            <p>{record.date}</p>
                            <p>{record.id || 'id'}</p>
                        </li>
                    ))}
                </div>
            </div>
        </LayoutPage>
    )
}

export default MainPage
