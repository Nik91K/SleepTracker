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
                    const response = await api.post('/auth/refresh', null, { withCredentials: true })
                    isRefreshing = false
                    const newAccessToken = response.data.accessToken
                    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
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
