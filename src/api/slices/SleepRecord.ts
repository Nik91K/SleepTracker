import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../axios';
import type { SleepRecordType } from "../../types/sleepRecordTypes";

interface SleepRecordState {
    records: SleepRecordType[];
    loading: boolean;
    error: string | null;
    token: string | null;
}

const initialState: SleepRecordState = {
    records: [],
    loading: false,
    error: null,
    token: localStorage.getItem('token') || null,
}

const SLICE_URL = "sleep-record"

export const createSleepRecord = createAsyncThunk (
    'sleep-record/create',
    async (recordData: { date: string, fellAsleepAt: string, wokeUpAt: string }, { rejectWithValue }) => {
        try {
            const response:any = await axios.post(`/${SLICE_URL}`, recordData)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const showSleepRecord = createAsyncThunk (
    'sleep-record/show',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/${SLICE_URL}`)
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
            state.records.push(action.payload)
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
