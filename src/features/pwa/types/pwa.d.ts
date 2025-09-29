// src/types/pwa.d.ts
declare global {
    interface Window {
        deferredPrompt?: Event
    }

    interface Navigator {
        standalone?: boolean
    }

    interface WorkerGlobalScope {
        skipWaiting(): void
    }
}

export interface PWAStatus {
    updateAvailable: boolean
    offlineReady: boolean
    needRefresh: boolean
    isPWA: boolean
    canInstall: boolean
    isOnline: boolean
}

export interface PWAInstallEvent extends Event {
    prompt(): Promise<{ outcome: 'accepted' | 'dismissed' }>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export interface PWAServiceWorkerMessage {
    type: 'SKIP_WAITING' | 'GET_VERSION' | 'CACHE_UPDATED'
    payload?: any
}

export {}