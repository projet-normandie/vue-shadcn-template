// src/services/pwa.service.ts
import { Workbox } from 'workbox-window'

/**
 * PWA Install Event interface
 */
interface PWAInstallEvent extends Event {
    prompt(): Promise<{ outcome: 'accepted' | 'dismissed' }>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

/**
 * Workbox Event interface
 */
interface WorkboxEvent {
    isUpdate?: boolean
    type: string
    target: Workbox
}

/**
 * Service Worker Message interface
 */
interface ServiceWorkerMessage {
    type: string
    payload?: unknown
}

/**
 * PWA Service for managing Progressive Web App functionality
 * Handles service worker registration, updates, and offline capabilities
 */
class PWAService {
    private wb: Workbox | null = null
    private updateAvailable = false
    private offlineReady = false
    private needRefresh = false
    private installPrompt: PWAInstallEvent | null = null

    /**
     * Initialize the PWA service
     */
    async init(): Promise<void> {
        console.log('🚀 Initializing PWA Service')

        // Setup install prompt handling first
        this.setupInstallPromptHandling()

        if ('serviceWorker' in navigator) {
            this.wb = new Workbox('/sw.js')

            // Service worker events
            this.setupEventListeners()

            // Register the service worker
            try {
                await this.wb.register()
                console.log('✅ Service Worker registered successfully')
            } catch (error) {
                console.error('❌ Service Worker registration failed:', error)
            }
        } else {
            console.warn('⚠️ Service Worker is not supported in this browser')
        }

        // Log initial PWA capabilities
        this.logPWACapabilities()
    }

    /**
     * Setup install prompt handling
     */
    private setupInstallPromptHandling(): void {
        console.log('🔧 Setting up install prompt handling')

        // Handle beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (event) => {
            console.log('📱 beforeinstallprompt event received')

            // Prevent the mini-infobar from appearing
            event.preventDefault()

            // Store the event for later use
            this.installPrompt = event as PWAInstallEvent

            // Dispatch custom event for components to listen
            window.dispatchEvent(new CustomEvent('pwa:install-prompt-ready', {
                detail: { canInstall: true }
            }))
        })

        // Handle app installed event
        window.addEventListener('appinstalled', () => {
            console.log('🎉 PWA app was installed')
            this.installPrompt = null

            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('pwa:app-installed'))
        })
    }

    /**
     * Log PWA capabilities for debugging
     */
    private logPWACapabilities(): void {
        const capabilities = {
            serviceWorker: 'serviceWorker' in navigator,
            beforeInstallPrompt: 'onbeforeinstallprompt' in window,
            standalone: window.matchMedia('(display-mode: standalone)').matches,
            navigatorStandalone: 'standalone' in window.navigator,
            isIOSStandalone: (window.navigator as Navigator & { standalone?: boolean }).standalone === true,
            userAgent: navigator.userAgent,
            displayMode: window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser'
        }

        console.log('🔍 PWA Capabilities:', capabilities)
    }

    /**
     * Setup service worker event listeners
     */
    private setupEventListeners(): void {
        if (!this.wb) return

        // Service worker installed for the first time
        this.wb.addEventListener('installed', (event: WorkboxEvent) => {
            console.log('🎉 PWA installed successfully')
            this.offlineReady = true

            if (!event.isUpdate) {
                this.showOfflineReadyToast()
            }
        })

        // New service worker available (update ready)
        this.wb.addEventListener('waiting', () => {
            console.log('🔄 New update available')
            this.updateAvailable = true
            this.needRefresh = true
            this.showUpdateAvailableToast()
        })

        // Service worker controlling the page
        this.wb.addEventListener('controlling', () => {
            console.log('✨ PWA updated successfully')
            this.showUpdateSuccessToast()
            // Reload the page to apply updates
            window.location.reload()
        })

        // Service worker activation
        this.wb.addEventListener('activated', (event: WorkboxEvent) => {
            if (event.isUpdate) {
                console.log('🚀 PWA updated and activated')
            }
        })
    }

    /**
     * Update the service worker when a new version is available
     */
    async updateServiceWorker(): Promise<void> {
        if (!this.wb || !this.updateAvailable) return

        try {
            // Tell the waiting service worker to skip waiting and become active
            this.wb.addEventListener('controlling', () => {
                window.location.reload()
            })

            // Send skip waiting message
            this.wb.messageSW({ type: 'SKIP_WAITING' } as ServiceWorkerMessage)
        } catch (error) {
            console.error('Failed to update service worker:', error)
        }
    }

    /**
     * Trigger PWA installation
     */
    async triggerInstall(): Promise<{ outcome: 'accepted' | 'dismissed' } | null> {
        if (!this.installPrompt) {
            console.warn('No install prompt available')
            return null
        }

        try {
            const result = await this.installPrompt.prompt()
            console.log('Install prompt result:', result.outcome)

            if (result.outcome === 'accepted') {
                this.installPrompt = null
            }

            return result
        } catch (error) {
            console.error('Install prompt failed:', error)
            return null
        }
    }

    /**
     * Check if the app is running as a PWA
     */
    isPWA(): boolean {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches
        const isIOSStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true
        const isAndroidStandalone = document.referrer.includes('android-app://')

        return isStandalone || isIOSStandalone || isAndroidStandalone
    }

    /**
     * Check if PWA installation is available
     */
    canInstall(): boolean {
        // If already installed, can't install again
        if (this.isPWA()) return false

        // If we have a stored install prompt, we can install
        if (this.installPrompt) return true

        // Check for browser support
        return 'beforeinstallprompt' in window || 'onbeforeinstallprompt' in window
    }

    /**
     * Get installation prompt if available
     */
    getInstallPrompt(): PWAInstallEvent | null {
        return this.installPrompt
    }

    /**
     * Check if the device is online
     */
    isOnline(): boolean {
        return navigator.onLine
    }

    /**
     * Get service worker registration
     */
    getRegistration(): Promise<ServiceWorkerRegistration | undefined> {
        return navigator.serviceWorker.getRegistration()
    }

    /**
     * Clear all caches
     */
    async clearCaches(): Promise<void> {
        if ('caches' in window) {
            const cacheNames = await caches.keys()
            await Promise.all(
                cacheNames.map(cacheName => caches.delete(cacheName))
            )
            console.log('🧹 All caches cleared')
        }
    }

    /**
     * Get cache storage estimate
     */
    async getStorageEstimate(): Promise<StorageEstimate | null> {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            return await navigator.storage.estimate()
        }
        return null
    }

    /**
     * Show toast notification for offline ready
     */
    private showOfflineReadyToast(): void {
        // This will be handled by the PWA component
        window.dispatchEvent(new CustomEvent('pwa:offline-ready'))
    }

    /**
     * Show toast notification for update available
     */
    private showUpdateAvailableToast(): void {
        // This will be handled by the PWA component
        window.dispatchEvent(new CustomEvent('pwa:update-available'))
    }

    /**
     * Show toast notification for successful update
     */
    private showUpdateSuccessToast(): void {
        // This will be handled by the PWA component
        window.dispatchEvent(new CustomEvent('pwa:update-success'))
    }

    /**
     * Get PWA status information
     */
    getStatus() {
        return {
            updateAvailable: this.updateAvailable,
            offlineReady: this.offlineReady,
            needRefresh: this.needRefresh,
            isPWA: this.isPWA(),
            canInstall: this.canInstall(),
            isOnline: this.isOnline(),
            hasInstallPrompt: !!this.installPrompt
        }
    }
}

// Export singleton instance
export default new PWAService()
