import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../axios';
import type { SleepRecordType } from "../../types/sleepRecordTypes";

interface SleepRecordState {
    records: SleepRecordType[];
    loading: boolean;
    error: string | null;
}

const initialState: SleepRecordState = {
    records: [],
    loading: false,
    error: null,
}

const SLICE_URL = "sleep-record"

export const createSleepRecord = createAsyncThunk (
    'sleep-record/create',
    async (recordData: { date: string, fellAsleepAt: string, wokeUpAt: string }, { rejectWithValue }) => {
        try {
            const checkResponse = await api.get(`/sleep-record`, {
                params: {
                    startDate: recordData.date,
                    finishDate: recordData.date
                }
            })
            const existingRecord = checkResponse.data[0]
            let response
            if (existingRecord) {
                response = await api.put(`/${SLICE_URL}/${existingRecord.id}`, recordData)
            } else {
                response = await api.post(`/${SLICE_URL}`, recordData)
            }
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Щось пішло не так')
        }
    }
)

export const showSleepRecord = createAsyncThunk (
    'sleep-record/show',
    async ({ startDate, finishDate }: { startDate: string; finishDate: string }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/${SLICE_URL}`, {
                params: { startDate, finishDate }
            })
            return response.data as SleepRecordType[]
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

const sleepRecordSlice = createSlice({
    name: "sleepRecord",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createSleepRecord.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(createSleepRecord.fulfilled, (state, action) => {
            state.loading = false
            const update = action.payload
            const existingIndex = state.records.findIndex(record => record.id === update.id)
            if (existingIndex !== -1) {
                state.records[existingIndex] = update
            } else {
                state.records.push(update)
            }
        })
        .addCase(createSleepRecord.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
        .addCase(showSleepRecord.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(showSleepRecord.fulfilled, (state, action) => {
            state.loading = false
            state.records = action.payload
        })
        .addCase(showSleepRecord.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
    }
})

export default sleepRecordSlice.reducer
