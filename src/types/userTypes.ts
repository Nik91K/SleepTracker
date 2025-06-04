import type { SleepRecordType } from "./sleepRecordTypes.ts";
export type UserType = {
    id: number,
    name?: string,
    email: string,
    password: string,
    theme: string,
    SleepRecordTypes?: SleepRecordType[]
}
