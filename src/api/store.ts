import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice'
import sleepRecordSlice from './slices/SleepRecord';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        sleepRecord: sleepRecordSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
