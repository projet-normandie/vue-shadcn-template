// src/composables/usePWA.ts
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import pwaService from '@/services/pwa.service'
import toastService from '@/services/toast.service'

/**
 * PWA Install Event interface
 */
interface PWAInstallEvent extends Event {
    prompt(): Promise<{ outcome: 'accepted' | 'dismissed' }>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

/**
 * PWA Composable for managing Progressive Web App functionality in Vue components
 */
export function usePWA() {
    // Reactive state
    const state = reactive({
        updateAvailable: false,
        offlineReady: false,
        needRefresh: false,
        isPWA: false,
        canInstall: false,
        isOnline: navigator.onLine,
        installing: false,
        installPrompt: null as PWAInstallEvent | null
    })

    // Storage estimate
    const storageEstimate = ref<StorageEstimate | null>(null)

    /**
     * Update the service worker
     */
    const updateApp = async () => {
        try {
            await pwaService.updateServiceWorker()
        } catch (error) {
            console.error('Failed to update app:', error)
            toastService.error('Update Failed', 'Failed to update the application')
        }
    }

    /**
     * Install the PWA
     */
    const installApp = async () => {
        if (!state.installPrompt) return

        state.installing = true

        try {
            const prompt = state.installPrompt
            const result = await prompt.prompt()

            if (result.outcome === 'accepted') {
                console.log('PWA installation accepted')
                toastService.success('App Installed', 'The app has been installed successfully')
                state.installPrompt = null
            } else {
                console.log('PWA installation declined')
            }
        } catch (error) {
            console.error('PWA installation failed:', error)
            toastService.error('Installation Failed', 'Failed to install the application')
        } finally {
            state.installing = false
        }
    }

    /**
     * Clear all application caches
     */
    const clearCaches = async () => {
        try {
            await pwaService.clearCaches()
            toastService.success('Caches Cleared', 'All application caches have been cleared')
        } catch (error) {
            console.error('Failed to clear caches:', error)
            toastService.error('Clear Failed', 'Failed to clear application caches')
        }
    }

    /**
     * Get storage usage information
     */
    const getStorageInfo = async () => {
        try {
            storageEstimate.value = await pwaService.getStorageEstimate()
        } catch (error) {
            console.error('Failed to get storage info:', error)
        }
    }

    /**
     * Format bytes to human readable string
     */
    const formatBytes = (bytes: number | undefined): string => {
        if (!bytes) return '0 B'

        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(1024))
        return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
    }

    /**
     * Calculate storage usage percentage
     */
    const getStorageUsagePercentage = (): number => {
        if (!storageEstimate.value?.quota || !storageEstimate.value?.usage) return 0
        return Math.round((storageEstimate.value.usage / storageEstimate.value.quota) * 100)
    }

    /**
     * Handle online/offline events
     */
    const handleOnlineChange = () => {
        state.isOnline = navigator.onLine

        if (state.isOnline) {
            toastService.success('Back Online', 'Internet connection restored')
        } else {
            toastService.warning('Offline Mode', 'You are now offline. Some features may be limited.')
        }
    }

    /**
     * Handle PWA events
     */
    const handlePWAEvents = (event: Event) => {
        switch (event.type) {
            case 'pwa:offline-ready':
                state.offlineReady = true
                toastService.success(
                    'App Ready',
                    'App is ready to work offline',
                    { duration: 5000 }
                )
                break

            case 'pwa:update-available':
                state.updateAvailable = true
                state.needRefresh = true
                toastService.info(
                    'Update Available',
                    'A new version is available. Click to update.',
                    {
                        duration: 0, // Don't auto-close
                        autoClose: false
                    }
                )
                break

            case 'pwa:update-success':
                toastService.success(
                    'Update Complete',
                    'App has been updated to the latest version'
                )
                break
        }
    }

    /**
     * Handle beforeinstallprompt event
     */
    const handleInstallPrompt = (event: Event) => {
        // Prevent the mini-infobar from appearing on mobile
        event.preventDefault()

        // Save the event for later use
        state.installPrompt = event as PWAInstallEvent
        state.canInstall = true

        console.log('PWA install prompt ready')
    }

    /**
     * Handle app installed event
     */
    const handleAppInstalled = () => {
        state.installPrompt = null
        state.canInstall = false
        console.log('PWA was installed')
    }

    /**
     * Update state from PWA service
     */
    const updateState = () => {
        const status = pwaService.getStatus()
        Object.assign(state, status)
    }

    // Lifecycle hooks
    onMounted(async () => {
        // Initialize PWA service
        await pwaService.init()

        // Update initial state
        updateState()

        // Get initial storage info
        await getStorageInfo()

        // Add event listeners
        window.addEventListener('online', handleOnlineChange)
        window.addEventListener('offline', handleOnlineChange)
        window.addEventListener('beforeinstallprompt', handleInstallPrompt)
        window.addEventListener('appinstalled', handleAppInstalled)

        // PWA custom events
        window.addEventListener('pwa:offline-ready', handlePWAEvents)
        window.addEventListener('pwa:update-available', handlePWAEvents)
        window.addEventListener('pwa:update-success', handlePWAEvents)
    })

    onUnmounted(() => {
        // Clean up event listeners
        window.removeEventListener('online', handleOnlineChange)
        window.removeEventListener('offline', handleOnlineChange)
        window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
        window.removeEventListener('appinstalled', handleAppInstalled)

        // PWA custom events
        window.removeEventListener('pwa:offline-ready', handlePWAEvents)
        window.removeEventListener('pwa:update-available', handlePWAEvents)
        window.removeEventListener('pwa:update-success', handlePWAEvents)
    })

    return {
        // State
        ...state,
        storageEstimate,

        // Actions
        updateApp,
        installApp,
        clearCaches,
        getStorageInfo,

        // Computed
        formatBytes,
        getStorageUsagePercentage,

        // Getters
        storageUsed: () => formatBytes(storageEstimate.value?.usage),
        storageQuota: () => formatBytes(storageEstimate.value?.quota),
        storageUsagePercent: getStorageUsagePercentage
    }
}
