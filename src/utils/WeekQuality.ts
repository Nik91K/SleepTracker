import type { WeekSleepEfficiency } from '../types/weekSleepEfficiencyType'

function getWeekSleepQuality(efficiency: WeekSleepEfficiency[], currentWeek: number) {
    const current = efficiency[currentWeek]

    if (current && current.sleepQuality !== undefined && current.sleepQuality !== null) {
        return `${current.sleepQuality}%`
    } return 'Немає даних'
}

export default getWeekSleepQuality
