// src/composables/useTwitchDomain.ts
import { computed } from 'vue'

/**
 * Composable to get the correct Twitch parent domain
 * Uses environment variables for reliable domain configuration across environments
 */
export function useTwitchDomain() {
    /**
     * Get the parent domain from environment variables
     * Fallback to auto-detection if not configured
     */
    const parentDomain = computed(() => {
        // Try to get from environment variable first
        const envDomain = import.meta.env.VITE_TWITCH_PARENT_DOMAIN

        // Debug logging (visible in browser console)
        if (import.meta.env.DEV) {
            console.log('🎯 Twitch Domain Debug:', {
                envDomain,
                mode: import.meta.env.MODE,
                allEnvVars: import.meta.env
            })
        }

        if (envDomain) {
            return envDomain
        }

        // Fallback to auto-detection if no env var is set
        if (typeof window === 'undefined') {
            return 'localhost' // SSR fallback
        }

        const { hostname, port } = window.location

        // For localhost, include the port
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return port ? `${hostname}:${port}` : hostname
        }

        // For production domains, just return the hostname
        return hostname
    })

    /**
     * Get the full origin URL
     */
    const origin = computed(() => {
        if (typeof window === 'undefined') {
            return 'http://localhost:5173' // SSR fallback
        }

        return window.location.origin
    })

    /**
     * Check if we're in development mode
     */
    const isDevelopment = computed(() => {
        return import.meta.env.DEV
    })

    /**
     * Get environment info for debugging
     */
    const environmentInfo = computed(() => {
        return {
            mode: import.meta.env.MODE,
            dev: import.meta.env.DEV,
            prod: import.meta.env.PROD,
            twitchParent: import.meta.env.VITE_TWITCH_PARENT_DOMAIN,
            detectedDomain: typeof window !== 'undefined' ? window.location.hostname : 'unknown'
        }
    })

    return {
        parentDomain,
        twitchParent: parentDomain, // Alias for backward compatibility
        origin,
        isDevelopment,
        environmentInfo
    }
}
