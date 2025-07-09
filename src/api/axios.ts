import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  withCredentials: true,
})

let isRefreshing = false

api.interceptors.response.use (
    res => res,
    async error => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            if (!isRefreshing){
                isRefreshing = true
                try {
                    const response = await api.get('/auth/refresh', { withCredentials: true })
                    isRefreshing = false
                    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
                    return api(originalRequest)
                } catch (refreshError) {
                    isRefreshing = false
                    return Promise.reject(refreshError)
                }
            }
            return Promise.reject(error)
        }
        return Promise.reject(error)
    }
)

export default api
