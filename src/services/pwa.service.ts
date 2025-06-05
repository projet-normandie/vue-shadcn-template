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

    /**
     * Initialize the PWA service
     */
    async init(): Promise<void> {
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
     * Check if the app is running as a PWA
     */
    isPWA(): boolean {
        return window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as Window['navigator'] & { standalone?: boolean }).standalone === true ||
            document.referrer.includes('android-app://')
    }

    /**
     * Check if PWA installation is available
     */
    canInstall(): boolean {
        return 'beforeinstallprompt' in window
    }

    /**
     * Get installation prompt if available
     */
    getInstallPrompt(): PWAInstallEvent | null {
        return (window as Window & { deferredPrompt?: PWAInstallEvent }).deferredPrompt || null
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
            isOnline: this.isOnline()
        }
    }
}

// Export singleton instance
export default new PWAService()
