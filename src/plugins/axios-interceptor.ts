import apiClient from '@/lib/axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import toastService from '@/services/toast.service'

// Enable debug mode in development
const DEBUG = process.env.NODE_ENV === 'development'

// Flag to prevent multiple logout notifications
let isHandlingLogout = false

// Setup for request and response interceptors
export default {
    setup() {
        // Request interceptor - runs before each API request
        apiClient.interceptors.request.use(
            config => {
                const authStore = useAuthStore()

                // If we have a token, add it to the request header
                if (authStore.token) {
                    config.headers['Authorization'] = `Bearer ${authStore.token}`

                    // Check if the token is about to expire (less than 30 seconds)
                    if (authStore.tokenExpiration) {
                        const now = Math.floor(Date.now() / 1000)
                        const timeLeft = authStore.tokenExpiration - now

                        if (DEBUG) {
                            console.log(`[Debug] Time remaining for token: ${timeLeft} seconds`)
                        }

                        // If token is about to expire and we have a refresh token
                        // we could try to refresh the token before proceeding with the request
                        if (timeLeft < 30 && timeLeft > 0 && authStore.refreshToken) {
                            if (DEBUG) {
                                console.log('[Debug] Token is about to expire, attempting automatic refresh...')
                            }

                            // We could trigger a token refresh here, but that would delay the request
                            // Instead, we'll use the response interceptor to handle 401 errors
                            // and the auth plugin to automatically refresh the token periodically
                        }
                    }
                }

                return config
            },
            error => {
                // Return any request errors
                return Promise.reject(error)
            }
        )

        // Response interceptor - handles 401 Unauthorized errors and token refresh
        apiClient.interceptors.response.use(
            response => {
                // Pass through successful responses
                return response
            },
            async error => {
                // Get the original request that caused the error
                const originalRequest = error.config
                const isLoginRequest = originalRequest.url?.includes('/api/login_check')

                // Avoid infinite refresh loops
                if (originalRequest._retry) {
                    return Promise.reject(error)
                }

                // If the error is 401 (Unauthorized) and we have a refresh token
                // But skip this logic for login requests
                if (error.response && error.response.status === 401 && !isLoginRequest) {
                    const authStore = useAuthStore()

                    // If we don't have a refresh token or the request was for a refresh token
                    if (!authStore.refreshToken || originalRequest.url === '/api/token/refresh') {
                        // Avoid showing multiple logout notifications
                        if (!isHandlingLogout) {
                            isHandlingLogout = true

                            // Clear auth state and redirect to login
                            await authStore.logout()

                            // Show logout notification only once
                            toastService.error('Session Expired', 'Please log in again')

                            router.push({name: 'Login'});

                            // Reset the flag after a delay
                            setTimeout(() => {
                                isHandlingLogout = false
                            }, 1000)
                        }

                        return Promise.reject(error)
                    }

                    // Mark the request for retry
                    originalRequest._retry = true

                    try {
                        // Attempt to refresh the token
                        const success = await authStore.refreshAuthToken()

                        if (success) {
                            // If refresh was successful, update the Authorization header and retry the request
                            originalRequest.headers['Authorization'] = `Bearer ${authStore.token}`
                            return apiClient(originalRequest)
                        } else {
                            // If refresh failed, logout and redirect to login
                            // But avoid duplicate notifications
                            if (!isHandlingLogout) {
                                isHandlingLogout = true

                                await authStore.logout()

                                // Show logout notification only once
                                toastService.error('Session Expired', 'Please log in again')

                                router.push({name: 'Login'});

                                // Reset the flag after a delay
                                setTimeout(() => {
                                    isHandlingLogout = false
                                }, 1000)
                            }

                            return Promise.reject(error)
                        }
                    } catch (refreshError) {
                        // If there was an error refreshing the token, logout and redirect
                        // But avoid duplicate notifications
                        if (!isHandlingLogout) {
                            isHandlingLogout = true

                            await authStore.logout()

                            // Show logout notification only once
                            toastService.error('Session Expired', 'Please log in again')

                            router.push({name: 'Login'});

                            // Reset the flag after a delay
                            setTimeout(() => {
                                isHandlingLogout = false
                            }, 1000)
                        }

                        return Promise.reject(refreshError)
                    }
                }

                // For errors other than 401, just pass them through
                return Promise.reject(error)
            }
        )

        // Debug logging for development environments
        if (DEBUG) {
            // Log outgoing requests
            apiClient.interceptors.request.use(request => {
                console.log('Outgoing request:', request.method?.toUpperCase(), request.url)
                return request
            })

            // Log incoming responses
            apiClient.interceptors.response.use(response => {
                console.log('Incoming response:', response.status, response.config.url)
                return response
            }, error => {
                console.error('Response error:', error.response?.status, error.config?.url)
                return Promise.reject(error)
            })
        }
    }
}
