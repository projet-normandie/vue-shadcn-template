import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// Create axios instance with base configuration
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_ROOT_API,
})

/**
 * Basic request interceptor to add authentication token to requests
 * The more advanced handling is in src/plugins/axios-interceptor.ts
 */
apiClient.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore()

        // Add the token to the authorization header if available
        if (authStore.token) {
            config.headers.Authorization = `Bearer ${authStore.token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default apiClient