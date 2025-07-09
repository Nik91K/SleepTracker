import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../axios';
import type { WeekSleepEfficiency } from '../../types/weekSleepEfficiencyType'

interface SleepEfficiencyState {
    efficiency: WeekSleepEfficiency[]
    loading: boolean;
    error: string | null;
}

const initialState: SleepEfficiencyState = {
    efficiency: [],
    loading: false,
    error: null,
}

const SLICE_URL = "sleep-record/efficiency"

export const showSleepRecordEfficiency = createAsyncThunk (
    'sleep-record/showEfficiency',
    async ({ startDate, endDate }: { startDate: string; endDate: string }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/${SLICE_URL}`, {
                    startDate,
                    endDate
            })
            return response.data as WeekSleepEfficiency[]
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

const sleepEfficiencySlice = createSlice({
    name: "sleepEfficiency",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(showSleepRecordEfficiency.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(showSleepRecordEfficiency.fulfilled, (state, action) => {
                state.loading = false;
                state.efficiency = action.payload;
            })
            .addCase(showSleepRecordEfficiency.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default sleepEfficiencySlice.reducer
