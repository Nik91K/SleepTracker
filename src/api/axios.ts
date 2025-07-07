import axios from "axios"

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
    withCredentials: true,
})

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}api/v1/auth/refresh`,
                    {},
                    { withCredentials: true }
                )
                const newToken = response.data.accessToken
                instance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return instance(originalRequest)
            } catch (error) {
                console.log('Refresh error', error)
            }
        }
        return Promise.reject(error)
    }
)

export default instance
