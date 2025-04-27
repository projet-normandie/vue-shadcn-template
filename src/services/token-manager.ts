import { useAuthStore } from '@/stores/auth'
import toastService from '@/services/toast.service'

/**
 * Token Manager Service
 * Handles automatic token checking and refreshing
 */
class TokenManager {
    private refreshTimeout: number | null = null
    private tokenCheckInterval: number | null = null
    private store: ReturnType<typeof useAuthStore> | null = null

    /**
     * Setup the token manager with the auth store
     * @param store Authentication store instance
     */
    setup(store: ReturnType<typeof useAuthStore>) {
        this.store = store

        // Initial token check
        this.checkTokenExpiration()

        // Setup periodic token checking
        this.startTokenCheck()

        return this
    }

    /**
     * Check if the current token is near expiration
     * and schedule an automatic refresh if needed
     */
    checkTokenExpiration() {
        if (!this.store) return

        // Clear any existing timeout
        if (this.refreshTimeout) {
            window.clearTimeout(this.refreshTimeout)
            this.refreshTimeout = null
        }

        // If we don't have a token or refresh token, nothing to do
        if (!this.store.token || !this.store.refreshToken || !this.store.tokenExpiration) {
            return
        }

        const now = Math.floor(Date.now() / 1000)
        const expiresAt = this.store.tokenExpiration
        const timeRemaining = expiresAt - now

        // If the token is already expired, try to refresh it immediately
        if (timeRemaining <= 0) {
            this.refreshToken()
            return
        }

        // If the token expires in less than 5 minutes (300 seconds),
        // schedule an automatic refresh
        if (timeRemaining < 300) {
            // Refresh the token 30 seconds before expiration
            const refreshIn = Math.max(timeRemaining - 30, 0) * 1000

            console.log(`Token expires in ${timeRemaining}s, refreshing in ${refreshIn / 1000}s`)

            // If token expires in less than 2 minutes, show a notification
            if (timeRemaining < 120 && timeRemaining > 30) {
                toastService.warning(
                    'Session expiring soon',
                    'Your session will expire soon and will be automatically renewed',
                    { autoClose: true, duration: 5000 }
                )
            }

            this.refreshTimeout = window.setTimeout(() => {
                this.refreshToken()
            }, refreshIn)
        }
    }

    /**
     * Refresh the authentication token
     */
    async refreshToken() {
        if (!this.store) return false

        try {
            const success = await this.store.refreshAuthToken()

            if (success) {
                // Re-check to schedule the next refresh
                this.checkTokenExpiration()
                return true
            }

            return false
        } catch (error) {
            console.error('Error refreshing token:', error)
            return false
        }
    }

    /**
     * Start periodic token checking
     */
    startTokenCheck() {
        // Clear existing interval if present
        if (this.tokenCheckInterval) {
            window.clearInterval(this.tokenCheckInterval)
        }

        // Check token status every minute
        this.tokenCheckInterval = window.setInterval(() => {
            this.checkTokenExpiration()
        }, 60000)
    }

    /**
     * Stop periodic token checking
     */
    stopTokenCheck() {
        if (this.tokenCheckInterval) {
            window.clearInterval(this.tokenCheckInterval)
            this.tokenCheckInterval = null
        }

        if (this.refreshTimeout) {
            window.clearTimeout(this.refreshTimeout)
            this.refreshTimeout = null
        }
    }
}

// Export a singleton instance
export default new TokenManager()