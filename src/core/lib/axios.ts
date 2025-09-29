import axios from 'axios'
import { useAuthStore } from '@/features/auth/stores/auth.ts'
import { ref } from 'vue'

// Create axios instance with base configuration
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_ROOT_API,
})

// Store current language in a reactive reference that can be updated
const currentLocale = ref('en')

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

        // Add Accept-Language header with current locale
        config.headers['Accept-Language'] = currentLocale.value

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

/**
 * Update the current locale used in API requests
 * @param locale The locale code (e.g., 'en', 'fr')
 */
export const updateApiLocale = (locale: string) => {
    currentLocale.value = locale
    console.log(`API language set to: ${locale}`)
}

export default apiClient