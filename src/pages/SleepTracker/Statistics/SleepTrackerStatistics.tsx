import './style.css'
import LayoutPage from '../../../layoutPage/layoutPage';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../api/hooks';
import getWeekSleepQuality from '../../../utils/WeekQuality';
import validateDuration from '../../../utils/WeekDuration';
import { showSleepRecordEfficiency } from '../../../api/slices/sleepEfficiencySlice';
import LineChart from '../../../components/Layout/Charts/Line';
import BarChart from '../../../components/Layout/Charts/Bar';
import CustomButton from '../../../components/common/Buttons/Custom/index'

const SleepTrackerStatistics = () => {
    const [ tooltip, setError ] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)
    const { efficiency, loading, error } = useAppSelector((state) => state.sleepEfficiency)
    const [ currentWeek, setCurrentWeek ] = React.useState(0)
    const [showByWeek, setShowByWeek] = React.useState(false)
    const dispatch = useAppDispatch()
    const startDate = "2025-06-16"
    const endDate = new Date().toISOString().slice(0, 10)
    
    useEffect(() => {
        dispatch(showSleepRecordEfficiency({ startDate, endDate }))
    }, [dispatch, startDate, endDate])

    const sleepQuality = efficiency[currentWeek]?.sleepQuality
    const allSleepQuality = efficiency.map(efficiency => efficiency.sleepQuality)
    const sleepDuration = validateDuration(efficiency[currentWeek]?.sleepDuration)
    const allSleepDuration = efficiency.map(efficiency => efficiency.sleepQuality)

    const handleNextWeek = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (currentWeek < efficiency.length - 1) {
            setCurrentWeek((week) => week + 1)
        }
    }

    const handleMinusWeek = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (currentWeek > 0) {
            setCurrentWeek(currentWeek - 1)
        }
    }

    const hoursToIntegers = (duration: string) => {
        const [hours, minutes] = duration.split(':').map(Number)
        return parseFloat((hours + minutes / 60).toFixed(1))
    }

    const start = efficiency[currentWeek]?.startWeek
    const end = efficiency[currentWeek]?.endWeek
    const sleepDate = `${start} - ${end}`

    const daySleepDuration = efficiency[currentWeek]?.days.map(day => 
        day.sleepDuration ? hoursToIntegers(day.sleepDuration) : 0
    )

    const daySleepQuality = efficiency[currentWeek]?.days.map(day =>
        day.sleepQuality
    )

    return (
        <LayoutPage title='Статистика'>
            {error && <p>error</p>}
            <div className='statistics-page-buttons'>
                <div className='statistics-page-date-buttons'>
                    {!showByWeek && (
                        <>
                        <div>
                            <CustomButton buttonText='<' onClick={handleMinusWeek} />
                            <CustomButton buttonText='>' onClick={handleNextWeek} />
                        </div>
                        <p>{sleepDate}</p>
                        </>
                    )}                 
                </div>
                <div>
                    <CustomButton
                        buttonText={showByWeek ? 'Показати по днях' : 'Показати по тижнях'}
                        onClick={() => setShowByWeek(prev => !prev)}
                    />
                </div>

            </div>
            <div className='statistics-page-main'>
                    
                <div className='statistics-page-charts'>
                    <h2>Якість сну</h2>
                    {showByWeek ? (
                        <LineChart
                        sleepData={allSleepQuality}
                        backgroundColor='#ffa500'
                        chartTitle={`Якість сну по тижнях:`}
                        chartLabel='Середня якість'
                        yValue={(value) => `${value}%`}
                        />
                    ) : (
                        <LineChart
                        sleepData={daySleepQuality}
                        backgroundColor='#ffa500'
                        chartTitle={`Статистика за ${sleepDate}`}
                        chartLabel='Якість сну'
                        yValue={(value) => `${value}%`}
                        />
                    )}
                    </div>

                    <div className='statistics-page-charts'>
                    <h2>Час сну</h2>
                    {showByWeek ? (
                        <BarChart
                        sleepData={allSleepDuration}
                        backgroundColor='#ffa500'
                        chartTitle={`Час сну по тижнях`}
                        chartLabel='Середній час сну'
                        yValue={(value) => `${value}год`}
                        />
                    ) : (
                        <BarChart
                        sleepData={daySleepDuration}
                        backgroundColor='#ffa500'
                        chartTitle={`Статистика за ${sleepDate}`}
                        chartLabel='Час сну за день'
                        yValue={(value) => `${value}год`}
                        />
                    )}
                    </div>
            </div>
        </LayoutPage>
    )
}

export default SleepTrackerStatistics


            {/* {efficiency[currentWeek] && (
                <div>
                    <h3>Тиждень: {efficiency[currentWeek].startWeek} — {efficiency[currentWeek].endWeek}</h3>
                    <p>Якість сну: {sleepQuality}</p>
                    <p>Тривалість сну: {sleepDuration}</p>
                    <ul>
                        {efficiency[currentWeek].days.map((day, i) => (
                            <li key={i}>
                                {day.date}: {day.sleepDuration} год — Якість {day.sleepQuality}%
                            </li>
                        ))}
                    </ul>
                </div>
            )} */}