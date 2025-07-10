import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../axios';
import type { UserType } from "../../types/userTypes";

interface TypeState {
    user: UserType | null
    loading: boolean
    error: string | null
}

const initialState: TypeState = {
    user: null,
    loading: false,
    error: null,
}

const SLICE_URL = "auth"

export const registerUser = createAsyncThunk (
    'auth/register',
    async (userData: { email:string, password:string, name:string, theme:string }, { rejectWithValue }) => {
        try {
            const response:any = await api.post(`/${SLICE_URL}/register`, userData)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const loginUser = createAsyncThunk (
    'auth/login',
    async (userData: { email:string, password:string }, { rejectWithValue }) => {
        try {
            const response:any = await api.post(`/${SLICE_URL}/login`, userData)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Login failed")
        }
    } 
)

export const userData = createAsyncThunk (
    'auth/data',
    async (_, { rejectWithValue }) => {
        try {
            const response:any = await api.get(`/${SLICE_URL}/user`)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || 'Data failed')
        }
    }
)

export const refreshToken = createAsyncThunk(
    'auth/refresh',
    async (_, { rejectWithValue }) => {
        try {
            const response:any = await api.post(`/${SLICE_URL}/refresh`)
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
            return response.data.user
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || 'Refresh failed')
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            const { accessToken, user } = action.payload;
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            state.user = user;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string
        })

        .addCase(userData.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(userData.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
        })
        .addCase(userData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string
        })

        .addCase(refreshToken.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(refreshToken.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
        })
        .addCase(refreshToken.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
            state.user = null
        })
    }
})

export default authSlice.reducer
