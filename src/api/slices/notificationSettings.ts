import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from '../axios'


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

const SLICE_URL = "/api/v1/notifications/settings"

export const createNotificationSettings = createAsyncThunk(
  'notification/createSettings',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SLICE_URL}/${userId}`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Unknown error')
    }
  }
)

export const updateNotificationSettings = createAsyncThunk(
  'notification/updateSettings',
  async (settings: NotificationSettings, { rejectWithValue }) => {
    try {
      const response = await axios.patch(SLICE_URL, settings)
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
        .addCase(createNotificationSettings.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(createNotificationSettings.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        .addCase(createNotificationSettings.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })

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
        });
    }
})

export default notificationSlice.reducer
