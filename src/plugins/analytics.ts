// src/plugins/analytics.ts
import type { App } from 'vue'
import type { Router } from 'vue-router'
// Import vue-gtag correctly for Vue 3
import { createGtag } from 'vue-gtag'

/**
 * Google Analytics Plugin using vue-gtag
 * Provides automatic page tracking with Vue Router
 */
const analyticsPlugin = {
    /**
     * Install the plugin
     * @param app Vue application instance
     * @param router
     */
    install(app: App, router: { router: Router }): void {
        const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID || ''
        const environment = import.meta.env.VITE_ENV || 'development'
        const isDevelopment = import.meta.env.DEV

        // Only enable analytics in production or staging
        const enableAnalytics = !isDevelopment || environment === 'staging'

        // Don't initialize if no ID or analytics disabled
        if (!gaId || !enableAnalytics) {
            if (!gaId) {
                console.warn('Google Analytics not initialized: Missing measurement ID')
            } else if (!enableAnalytics) {
                console.info('Google Analytics disabled in development environment')
            }
            return
        }

        // Install vue-gtag
        const gtag = createGtag({
            tagId: gaId,
            pageTracker: {
                router,
            }
        })
        app.use(gtag)

        console.info(`Google Analytics initialized in ${environment} environment (with vue-gtag)`)
    }
}

export default analyticsPlugin