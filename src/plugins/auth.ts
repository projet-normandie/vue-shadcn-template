import type { App } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { type Router } from 'vue-router'
import tokenManager from '@/services/token-manager'

/**
 * Authentication plugin for Vue
 * This plugin integrates authentication state management with
 * the router and token management
 */
export default {
    install(_app: App, { router }: { router: Router }) {
        // Get access to the auth store
        const authStore = useAuthStore()

        // Initialize the token manager with our auth store
        tokenManager.setup(authStore)

        // Navigation guard - checks authentication before each route change
        router.beforeEach(async (to, _from, next) => {
            const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

            // If the route requires authentication and we have a token
            if (requiresAuth && authStore.token) {
                // If the token is expired and we have a refresh token, try to refresh it
                if (authStore.isTokenExpired && authStore.refreshToken) {
                    console.log('Token expired, attempting to refresh...')
                    const success = await authStore.refreshAuthToken()

                    if (!success) {
                        // Refresh failed, redirect to login page
                        return next('/login')
                    }
                }
            }

            // Continue navigation
            next()
        })

        // Listen for authentication state changes
        authStore.$subscribe((_mutation, _state) => {
            // Check token status on any auth state change
            tokenManager.checkTokenExpiration()
        })

        // Clean up token manager when the application is closed
        window.addEventListener('beforeunload', () => {
            tokenManager.stopTokenCheck()
        })
    }
}