// src/plugins/pwa.ts
import type { App } from 'vue'
import pwaService from '@/features/pwa/services/pwa.service.ts'

/**
 * PWA Plugin for Vue
 * Initializes PWA functionality and makes it available globally
 */
export default {
    async install(app: App) {
        // Initialize PWA service
        try {
            await pwaService.init()
            console.log('✅ PWA Plugin initialized successfully')
        } catch (error) {
            console.error('❌ PWA Plugin initialization failed:', error)
        }

        // Make PWA service available globally
        app.config.globalProperties.$pwa = pwaService
        app.provide('pwa', pwaService)

        // Add global properties for template access
        app.config.globalProperties.$isPWA = () => pwaService.getStatus().isPWA
        app.config.globalProperties.$isOnline = () => pwaService.isOnline()
    }
}
