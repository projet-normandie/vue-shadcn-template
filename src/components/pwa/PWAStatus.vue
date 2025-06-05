<!-- src/components/pwa/PWAStatus.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
    Wifi,
    WifiOff,
    Smartphone,
    Download,
    Trash2,
    RefreshCw,
    HardDrive,
    Globe
} from 'lucide-vue-next'
import { usePWA } from '@/composables/usePWA'

/**
 * PWA Status Component
 * Displays current PWA status and controls
 */

const {
    isOnline,
    isPWA,
    canInstall,
    offlineReady,
    updateAvailable,
    storageEstimate,
    storageUsed,
    storageQuota,
    storageUsagePercent,
    installApp,
    updateApp,
    clearCaches,
    getStorageInfo
} = usePWA()

const connectionStatus = computed(() => ({
    icon: isOnline ? Wifi : WifiOff,
    text: isOnline ? 'Online' : 'Offline',
    color: isOnline ? 'text-green-600' : 'text-red-600',
    bg: isOnline ? 'bg-green-100' : 'bg-red-100'
}))

const appStatus = computed(() => ({
    icon: isPWA ? Smartphone : Globe,
    text: isPWA ? 'PWA Mode' : 'Browser Mode',
    color: isPWA ? 'text-blue-600' : 'text-gray-600',
    bg: isPWA ? 'bg-blue-100' : 'bg-gray-100'
}))

const handleRefreshStorage = async () => {
    await getStorageInfo()
}
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle class="flex items-center gap-2">
                <div class="bg-primary/10 rounded-full p-1">
                    <Smartphone class="h-4 w-4 text-primary" />
                </div>
                PWA Status
            </CardTitle>
        </CardHeader>

        <CardContent class="space-y-6">
            <!-- Connection & App Status -->
            <div class="grid grid-cols-2 gap-4">
                <div :class="connectionStatus.bg" class="rounded-lg p-3">
                    <div class="flex items-center gap-2">
                        <component :is="connectionStatus.icon" :class="connectionStatus.color" class="h-4 w-4" />
                        <span class="text-sm font-medium">{{ connectionStatus.text }}</span>
                    </div>
                </div>

                <div :class="appStatus.bg" class="rounded-lg p-3">
                    <div class="flex items-center gap-2">
                        <component :is="appStatus.icon" :class="appStatus.color" class="h-4 w-4" />
                        <span class="text-sm font-medium">{{ appStatus.text }}</span>
                    </div>
                </div>
            </div>

            <!-- Features Status -->
            <div class="space-y-2">
                <h4 class="text-sm font-medium">Features</h4>
                <div class="flex flex-wrap gap-2">
                    <Badge :variant="offlineReady ? 'default' : 'secondary'">
                        {{ offlineReady ? '✅' : '⏳' }} Offline Ready
                    </Badge>
                    <Badge :variant="updateAvailable ? 'destructive' : 'secondary'">
                        {{ updateAvailable ? '🔄' : '✅' }} Up to Date
                    </Badge>
                    <Badge :variant="canInstall ? 'default' : 'secondary'">
                        {{ canInstall ? '📱' : '✅' }} {{ canInstall ? 'Can Install' : 'Installed' }}
                    </Badge>
                </div>
            </div>

            <!-- Storage Information -->
            <div v-if="storageEstimate" class="space-y-3">
                <div class="flex items-center justify-between">
                    <h4 class="text-sm font-medium flex items-center gap-2">
                        <HardDrive class="h-4 w-4" />
                        Storage Usage
                    </h4>
                    <Button
                        variant="ghost"
                        size="sm"
                        @click="handleRefreshStorage"
                        class="h-6 w-6 p-0"
                    >
                        <RefreshCw class="h-3 w-3" />
                    </Button>
                </div>

                <div class="space-y-2">
                    <div class="flex justify-between text-xs text-muted-foreground">
                        <span>{{ storageUsed() }} used</span>
                        <span>{{ storageQuota() }} total</span>
                    </div>
                    <Progress :value="storageUsagePercent()" class="h-2" />
                    <p class="text-xs text-muted-foreground">
                        {{ storageUsagePercent() }}% of available storage used
                    </p>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-2 pt-2 border-t">
                <Button
                    v-if="canInstall && !isPWA"
                    @click="installApp"
                    variant="default"
                    size="sm"
                    class="w-full gap-2"
                >
                    <Download class="h-4 w-4" />
                    Install App
                </Button>

                <Button
                    v-if="updateAvailable"
                    @click="updateApp"
                    variant="outline"
                    size="sm"
                    class="w-full gap-2"
                >
                    <RefreshCw class="h-4 w-4" />
                    Update App
                </Button>

                <Button
                    @click="clearCaches"
                    variant="ghost"
                    size="sm"
                    class="w-full gap-2 text-muted-foreground"
                >
                    <Trash2 class="h-4 w-4" />
                    Clear Cache
                </Button>
            </div>
        </CardContent>
    </Card>
</template>
