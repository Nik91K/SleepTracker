import './style.css'
import LayoutPage from '../../../layoutPage/layoutPage';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../api/hooks';
import getWeekSleepQuality from '../../../utils/WeekQuality';
import validateDuration from '../../../utils/WeekDuration';
import { showSleepRecordEfficiency } from '../../../api/slices/sleepEfficiencySlice';

const SleepTrackerStatistics = () => {
    const [ tooltip, setError ] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)
    const { efficiency, loading, error } = useAppSelector((state) => state.sleepEfficiency)
    const [ currentWeek, setCurrentWeek ] = React.useState(0)
    const dispatch = useAppDispatch()
    const startDate = "2025-06-01"
    const endDate = new Date().toISOString().slice(0, 10)
    
    useEffect(() => {
        dispatch(showSleepRecordEfficiency({ startDate, endDate }))
    }, [dispatch, startDate, endDate])

    const sleepQuality = getWeekSleepQuality(efficiency, currentWeek)
    const sleepDuration = validateDuration(efficiency[currentWeek]?.sleepDuration)


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

    return (
        <LayoutPage>
            <div>
                {error && <p>error</p>}
                <div>
                {efficiency[currentWeek] && (
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
                )}
                </div>
                <div>
                    <button onClick={handleMinusWeek}> <p>{'<'}</p> </button>
                    <button onClick={handleNextWeek}> <p>{'>'}</p> </button>
                </div>

            </div>
        </LayoutPage>
    )
}

export default SleepTrackerStatistics
