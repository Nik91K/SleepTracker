import type { SleepRecordType } from "./sleepRecordTypes";

export type GroupedSleepRecordsType = {
    startDate: string;
    finishDate: string;
    records: SleepRecordType[];
}
