import './styles.css';
import LayoutPage from '../../../layoutPage/layoutPage';
import Tooltip from '../../../components/common/Tooltip';
import React, { useEffect } from 'react';
import Greetings from '../../../components/common/Greetings';
import { useAppDispatch, useAppSelector } from '../../../api/hooks';
import BarChart from '../../../components/Layout/Charts/Bar'
import { showSleepRecordEfficiency } from '../../../api/slices/sleepEfficiencySlice';
import CircularChart from '../../../components/Layout/Charts/Circular'
import HomeSections from '../../../components/Layout/HomeSections'
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import getWeekSleepQuality from '../../../utils/WeekQuality'
import { BsCurrencyBitcoin, BsMoonStarsFill } from "react-icons/bs";
import validateDuration from '../../../utils/WeekDuration'
import CurrentDate from '../../../components/common/Date/index'

const MainPage = () => {
    const [ tooltip, setError ] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)
    const { efficiency, loading, error } = useAppSelector((state) => state.sleepEfficiency)
    const [ currentWeek, setCurrentWeek ] = React.useState(0)

    const dispatch = useAppDispatch()
    const startDate = new Date().toISOString().slice(0, 10)
    const endDate = new Date().toISOString().slice(0, 10)

    useEffect(() => {
        dispatch(showSleepRecordEfficiency({ startDate, endDate }))
    }, [dispatch, startDate, endDate])

    const hoursToIntegers = (duration: string) => {
        const [hours, minutes] = duration.split(':').map(Number)
        return parseFloat((hours + minutes / 60).toFixed(3))
    }

    const sleepData = efficiency[currentWeek]?.days.map(day => 
        day.sleepDuration ? hoursToIntegers(day.sleepDuration) : 0
    )

    const todaySleep = efficiency[currentWeek]?.days.find(day => 
        day.date === endDate
    )

    const todaySleepDuration = todaySleep?.sleepDuration|| '0 годин'

    const sleepQuality = getWeekSleepQuality(efficiency, currentWeek)
    const sleepDuration = validateDuration(efficiency[currentWeek]?.sleepDuration)

    const sectionData = [
        { 
            icon: <BsMoonStarsFill />, 
            valueTop: sleepDuration, 
            valueBottom: 'Week Time' 
        },
        { 
            icon: efficiency[currentWeek] && ( <CircularChart dataPercentage={efficiency[currentWeek].sleepQuality} /> ), 
            valueTop: sleepQuality, 
            valueBottom: 'Week Quality' 
        },
        { 
            icon: <FaCalendarAlt />, 
            valueTop: <CurrentDate />,
            valueBottom: 'Сьогодні'
        },
        { 
            icon: <FaClock />, 
            valueTop: todaySleepDuration, 
            valueBottom: 'Сьогодні ви спали'
        },
    ]

    console.log("sleepQuality:", efficiency[currentWeek]?.sleepQuality)
    return (
        <LayoutPage>
            {tooltip && (
                <Tooltip type={tooltip.type} typeText={tooltip.message} close={() => setError(null)}/>
            )} 
            <div className="main-page sleep-tracker-header">
                <Greetings />
            </div>
            {error && <p>Помилка: {error}</p>}
            <div className='main-page-top'>
                <HomeSections sections={sectionData} />
                <div className='chart-container'>
                    <BarChart sleepData={sleepData} backgroundColor='rgb(255, 165, 0)'/>                    
                </div>
            </div>
        </LayoutPage>
    )
}

export default MainPage
