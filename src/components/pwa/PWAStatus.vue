<!-- src/components/pwa/PWAStatus.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import {
  Wifi,
  WifiOff,
  Smartphone,
  Download,
  RefreshCw,
  HardDrive,
  Shield,
  Bell,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-vue-next'
import { usePWA } from '@/composables/usePWA'

const {
  isPWA,
  isOnline,
  canInstall,
  offlineReady,
  updateAvailable,
  storageUsed,
  storageQuota,
  storageUsagePercent,
  installApp,
  updateApp,
  installing
} = usePWA()

/**
 * Get connection status with appropriate styling
 */
const connectionStatus = computed(() => {
  return {
    label: isOnline.value ? 'Online' : 'Offline',
    variant: isOnline.value ? 'default' : 'destructive',
    icon: isOnline.value ? Wifi : WifiOff
  }
})

/**
 * Get app mode status
 */
const appModeStatus = computed(() => {
  return {
    label: isPWA.value ? 'PWA Mode' : 'Browser Mode',
    variant: isPWA.value ? 'default' : 'secondary',
    icon: Smartphone
  }
})

/**
 * Get install status - improved detection
 */
const installStatus = computed(() => {
  // Check multiple conditions for better detection
  const hasBeforeInstallPrompt = 'beforeinstallprompt' in window
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

  if (isPWA.value || isStandalone) {
    return {
      label: 'Installed',
      variant: 'default',
      icon: CheckCircle,
      canInstall: false
    }
  }

  if (canInstall.value || hasBeforeInstallPrompt) {
    return {
      label: 'Can Install',
      variant: 'secondary',
      icon: Download,
      canInstall: true
    }
  }

  // Special handling for iOS (no beforeinstallprompt support)
  if (isIOS && !isStandalone) {
    return {
      label: 'iOS - Add to Home Screen',
      variant: 'outline',
      icon: Smartphone,
      canInstall: false
    }
  }

  return {
    label: 'Not Available',
    variant: 'outline',
    icon: XCircle,
    canInstall: false
  }
})

/**
 * Get offline status
 */
const offlineStatus = computed(() => {
  return {
    label: offlineReady.value ? 'Ready' : 'Loading',
    variant: offlineReady.value ? 'default' : 'secondary',
    icon: offlineReady.value ? Shield : Clock
  }
})

/**
 * Get update status
 */
const updateStatus = computed(() => {
  return {
    label: updateAvailable.value ? 'Update Available' : 'Up to Date',
    variant: updateAvailable.value ? 'destructive' : 'default',
    icon: RefreshCw
  }
})

/**
 * Handle install button click
 */
const handleInstall = async () => {
  try {
    await installApp()
  } catch (error) {
    console.error('Installation failed:', error)
  }
}

/**
 * Handle update button click
 */
const handleUpdate = async () => {
  try {
    await updateApp()
  } catch (error) {
    console.error('Update failed:', error)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- PWA Status Header -->
    <div class="flex items-center gap-3">
      <div class="bg-primary/10 rounded-full p-2">
        <Smartphone class="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold">PWA Status</h3>
        <p class="text-sm text-muted-foreground">Current application state</p>
      </div>
    </div>

    <!-- Status Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Connection Status -->
      <div class="flex items-center justify-between p-3 rounded-lg border">
        <div class="flex items-center gap-3">
          <component :is="connectionStatus.icon" class="h-5 w-5"
                     :class="isOnline ? 'text-green-600' : 'text-red-600'" />
          <span class="font-medium">Connection</span>
        </div>
        <Badge :variant="connectionStatus.variant">
          {{ connectionStatus.label }}
        </Badge>
      </div>

      <!-- App Mode -->
      <div class="flex items-center justify-between p-3 rounded-lg border">
        <div class="flex items-center gap-3">
          <component :is="appModeStatus.icon" class="h-5 w-5"
                     :class="isPWA ? 'text-blue-600' : 'text-gray-400'" />
          <span class="font-medium">App Mode</span>
        </div>
        <Badge :variant="appModeStatus.variant">
          {{ appModeStatus.label }}
        </Badge>
      </div>

      <!-- Offline Support -->
      <div class="flex items-center justify-between p-3 rounded-lg border">
        <div class="flex items-center gap-3">
          <component :is="offlineStatus.icon" class="h-5 w-5"
                     :class="offlineReady ? 'text-green-600' : 'text-orange-500'" />
          <span class="font-medium">Offline Support</span>
        </div>
        <Badge :variant="offlineStatus.variant">
          {{ offlineStatus.label }}
        </Badge>
      </div>

      <!-- Updates -->
      <div class="flex items-center justify-between p-3 rounded-lg border">
        <div class="flex items-center gap-3">
          <component :is="updateStatus.icon" class="h-5 w-5"
                     :class="updateAvailable ? 'text-orange-600' : 'text-green-600'" />
          <span class="font-medium">Updates</span>
        </div>
        <Badge :variant="updateStatus.variant">
          {{ updateStatus.label }}
        </Badge>
      </div>
    </div>

    <Separator />

    <!-- Features Section -->
    <div>
      <h4 class="font-medium mb-3">Features</h4>
      <div class="flex flex-wrap gap-2">
        <Badge v-if="offlineReady" variant="default" class="gap-1">
          <CheckCircle class="h-3 w-3" />
          Offline Ready
        </Badge>
        <Badge v-if="!updateAvailable" variant="default" class="gap-1">
          <CheckCircle class="h-3 w-3" />
          Up to Date
        </Badge>
        <Badge v-if="isPWA" variant="default" class="gap-1">
          <CheckCircle class="h-3 w-3" />
          Installed
        </Badge>
        <Badge variant="secondary" class="gap-1">
          <Bell class="h-3 w-3" />
          Notifications (Future)
        </Badge>
      </div>
    </div>

    <Separator />

    <!-- Storage Information -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h4 class="font-medium flex items-center gap-2">
          <HardDrive class="h-4 w-4" />
          Storage Usage
        </h4>
        <span class="text-sm text-muted-foreground">
                    {{ storageUsed() }} / {{ storageQuota() }}
                </span>
      </div>

      <div class="space-y-2">
        <Progress :value="storageUsagePercent()" class="h-2" />
        <div class="flex justify-between text-xs text-muted-foreground">
          <span>{{ storageUsagePercent() }}% used</span>
          <span>{{ storageUsed() }} used</span>
        </div>
      </div>
    </div>

    <Separator />

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-3">
      <!-- Install Button -->
      <Button
          v-if="installStatus.canInstall && !isPWA"
          @click="handleInstall"
          :disabled="installing"
          class="flex-1 gap-2"
      >
        <Download class="h-4 w-4" />
        {{ installing ? 'Installing...' : 'Install App' }}
      </Button>

      <!-- Update Button -->
      <Button
          v-if="updateAvailable"
          @click="handleUpdate"
          variant="outline"
          class="flex-1 gap-2"
      >
        <RefreshCw class="h-4 w-4" />
        Update Available
      </Button>

      <!-- iOS Installation Instructions -->
      <div v-if="installStatus.label.includes('iOS')"
           class="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
        <p class="font-medium text-blue-800 mb-1">Add to Home Screen</p>
        <p class="text-blue-600">
          Tap the share button <span class="font-mono">⇧</span> and select "Add to Home Screen"
        </p>
      </div>
    </div>

    <!-- Debug Information (only in development) -->
    <div v-if="$env?.DEV" class="mt-4 p-3 bg-gray-50 rounded-lg text-xs">
      <strong>Debug Info:</strong><br>
      Can Install: {{ canInstall }}<br>
      Is PWA: {{ isPWA }}<br>
      beforeinstallprompt: {{ 'beforeinstallprompt' in window }}<br>
      Standalone: {{ window.matchMedia('(display-mode: standalone)').matches }}<br>
      User Agent: {{ navigator.userAgent.substring(0, 50) }}...
    </div>
  </div>
</template>

<style scoped>
/* Ensure badges are properly aligned */
.flex-wrap .badge {
  flex-shrink: 0;
}

/* Progress bar styling */
.progress {
  background-color: hsl(var(--muted));
}

/* Animation for status changes */
.badge {
  transition: all 0.2s ease;
}

/* Debug info styling */
.debug-info {
  font-family: 'Courier New', monospace;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
}
</style>
