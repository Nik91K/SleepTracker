import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../axios'

interface TypeState {
    theme: string | null;
    image: string | null;
    loading: boolean;
    error: string | null;
    token: string | null;
}

const initialState: TypeState = {
    theme: null,
    image: null,
    loading: false,
    error: null,
    token: localStorage.getItem('token') || null,
}

const SLICE_URL = "user"

export const updateUserTheme = createAsyncThunk (
  'user/updateTheme',
  async (theme: string, { rejectWithValue }) => {
    try {
      const response = await api.patch('/user/theme', { theme })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateUserAvatar = createAsyncThunk(
    'user/updateAvatar',
    async (file: File, { rejectWithValue }) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await api.patch(`/${SLICE_URL}/avatar`, formData, {})
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getUserAvatar = createAsyncThunk(
    'user/getAvatar',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/${SLICE_URL}/me`)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

const configurationSlice = createSlice ({
    name: "configuration",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(updateUserTheme.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(updateUserTheme.fulfilled, (state, action) => {
            state.theme = action.payload.theme;
            state.loading = false
        })
        .addCase(updateUserTheme.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string;
        })

        .addCase(updateUserAvatar.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(updateUserAvatar.fulfilled, (state, action) => {
            state.image = action.payload.image
            state.loading = false
        })
        .addCase(updateUserAvatar.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })

        .addCase(getUserAvatar.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(getUserAvatar.fulfilled, (state, action) => {
            state.image = action.payload.image
            state.loading = false
        })
        .addCase(getUserAvatar.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
    }
})

export default configurationSlice.reducer
