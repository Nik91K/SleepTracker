import type { DayRecord } from './dayReacordType'

export type WeekSleepEfficiency = {
    startWeek: string;
    endWeek: string;
    sleepDuration: string;
    sleepQuality: number;
    days: DayRecord[];
}
