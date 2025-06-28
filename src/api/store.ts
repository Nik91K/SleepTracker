import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice'
import sleepRecordSlice from './slices/SleepRecord';
import sleepEfficiencySlice from './slices/sleepEfficiencySlice';
import configurationSlice from './slices/userSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        sleepRecord: sleepRecordSlice,
        sleepEfficiency: sleepEfficiencySlice,
        users: configurationSlice
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
