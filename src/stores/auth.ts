import { defineStore } from 'pinia'
import authService from '@/services/auth.service'
import toastService from '@/services/toast.service'

/**
 * User interface representing authenticated user data
 */
interface User {
    id: number
    username: string
    roles: string[]
    slug: string
}

/**
 * Authentication state interface
 */
interface AuthState {
    token: string | null
    refreshToken: string | null
    user: User | null
    loading: boolean
    error: string | null
    tokenExpiration: number | null
}

/**
 * Authentication store to manage the user session
 * Handles login, logout, token refresh, and user data
 */
export const useAuthStore = defineStore('auth', {
    /**
     * Initial state for authentication
     */
    state: (): AuthState => ({
        token: localStorage.getItem('token') || null,
        refreshToken: localStorage.getItem('refresh_token') || null,
        user: null,
        loading: false,
        error: null,
        tokenExpiration: localStorage.getItem('token_expiration') ? Number(localStorage.getItem('token_expiration')) : null
    }),

    /**
     * Computed properties for authentication state
     */
    getters: {
        /**
         * Check if the user is authenticated
         */
        isAuthenticated: (state) => !!state.token,

        /**
         * Get the current user
         */
        getUser: (state) => state.user,

        /**
         * Get the last error message
         */
        getError: (state) => state.error,

        /**
         * Check if authentication is in progress
         */
        isLoading: (state) => state.loading,

        /**
         * Check if the token is expired
         * Adds a 10-second safety margin
         */
        isTokenExpired: (state) => {
            if (!state.tokenExpiration) return true
            return Date.now() >= (state.tokenExpiration - 10) * 1000
        }
    },

    /**
     * Actions to modify the authentication state
     */
    actions: {
        /**
         * Login with username and password
         * @param username User's username
         * @param password User's password
         * @returns Promise<boolean> True if login was successful
         */
        async login(username: string, password: string) {
            this.loading = true
            this.error = null

            try {
                const response = await authService.login({ username, password })

                // Store authentication data
                this.setAuthData(response.token, response.refresh_token, response.user)

                // Show success notification
                toastService.success('Login Successful', `Welcome, ${response.user.username}!`)

                return true
            } catch (error: any) {
                this.error = error.response?.data?.message || 'An error occurred during login'

                // Show error notification
                toastService.error('Login Failed', this.error)

                return false
            } finally {
                this.loading = false
            }
        },

        /**
         * Parse JWT token to extract data
         * @param token JWT token string
         * @returns Parsed token payload or null if invalid
         */
        parseJwt(token: string) {
            try {
                const base64Url = token.split('.')[1]
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                }).join(''))

                return JSON.parse(jsonPayload)
            } catch (e) {
                return null
            }
        },

        /**
         * Set authentication data in the store and localStorage
         * @param token JWT token
         * @param refreshToken Refresh token
         * @param user User data
         */
        setAuthData(token: string, refreshToken: string, user: User) {
            this.token = token
            this.refreshToken = refreshToken
            this.user = user

            // Parse token to get expiration time
            const parsedToken = this.parseJwt(token)
            if (parsedToken && parsedToken.exp) {
                this.tokenExpiration = parsedToken.exp
                localStorage.setItem('token_expiration', String(parsedToken.exp))
            }

            localStorage.setItem('token', token)
            localStorage.setItem('refresh_token', refreshToken)
        },

        /**
         * Refresh the authentication token
         * @returns Promise<boolean> True if token refresh was successful
         */
        async refreshAuthToken() {
            if (!this.refreshToken) return false

            try {
                const response = await authService.refreshToken(this.refreshToken)

                // Update tokens
                this.token = response.token
                this.refreshToken = response.refresh_token

                // Update expiration
                const parsedToken = this.parseJwt(response.token)
                if (parsedToken && parsedToken.exp) {
                    this.tokenExpiration = parsedToken.exp
                    localStorage.setItem('token_expiration', String(parsedToken.exp))
                }

                localStorage.setItem('token', response.token)
                localStorage.setItem('refresh_token', response.refresh_token)

                // Show notification
                toastService.info('Token Refreshed', 'Your session has been extended', {
                    duration: 3000,
                    autoClose: true
                })

                return true
            } catch (error) {
                // If refresh fails, log the user out
                toastService.error('Session Expired', 'Please login again')
                this.logout()
                return false
            }
        },

         /**
         * Logout the current user
         * Clears tokens and user data from store and localStorage
         */
        async logout() {
            // Show notification
            toastService.success('Logged Out', 'You have been successfully logged out')

            // Clear local data
            this.token = null
            this.refreshToken = null
            this.user = null
            this.tokenExpiration = null
            localStorage.removeItem('token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('token_expiration')
        },
    },
    persist: true
})