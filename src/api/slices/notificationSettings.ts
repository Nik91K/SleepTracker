import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../axios'


interface NotificationSettings {
  enabled: boolean;
  time: string;
  method: 'email';
}

interface NotificationState {
  data: NotificationSettings | null;
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  data: null,
  loading: false,
  error: null,
}

const SLICE_URL = "notifications/settings"

export const updateNotificationSettings = createAsyncThunk(
  'notification/updateSettings',
  async (settings: NotificationSettings, { rejectWithValue }) => {
    try {
      const response = await api.patch(SLICE_URL, settings)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Unknown error')
    }
  }
)

export const showNotificationSettings = createAsyncThunk(
  'notification/createSettings',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${SLICE_URL}/${userId}`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Unknown error')
    }
  }
)

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(updateNotificationSettings.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(updateNotificationSettings.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        .addCase(updateNotificationSettings.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })

        .addCase(showNotificationSettings.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(showNotificationSettings.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        .addCase(showNotificationSettings.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
    }
})

export default notificationSlice.reducer
