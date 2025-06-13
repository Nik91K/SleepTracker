import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../axios';

type DayRecord = {
  date: string;
  timeWentToBed: string;
  timeWokeUp: string;
  sleepDuration: string;
  sleepQuality: number;
}

type WeekSleepEfficiency = {
  startWeek: string;
  endWeek: string;
  sleepDuration: string;
  sleepQuality: number;
  days: DayRecord[];
}

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
    async ({ startDate, finishDay }: { startDate: string; finishDay: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/${SLICE_URL}`, {
                    startDate,
                    finishDay
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
