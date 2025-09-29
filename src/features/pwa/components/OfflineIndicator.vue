<!-- src/components/pwa/OfflineIndicator.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { Alert, AlertDescription } from '@/shared/components/ui/alert'
import { Badge } from '@/shared/components/ui/badge'
import { WifiOff, Wifi } from 'lucide-vue-next'
import { usePWA } from '@/features/pwa/composables/usePWA.ts'

/**
 * Offline Indicator Component
 * Shows connection status and offline capabilities
 */

interface Props {
    showWhenOnline?: boolean
    position?: 'fixed' | 'relative'
    compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    showWhenOnline: false,
    position: 'fixed',
    compact: false
})

const { isOnline, offlineReady } = usePWA()

const shouldShow = computed(() => {
    return !isOnline || (props.showWhenOnline && isOnline)
})

const statusConfig = computed(() => {
    if (!isOnline) {
        return {
            icon: WifiOff,
            title: 'You are offline',
            description: offlineReady
                ? 'The app will continue to work with cached content'
                : 'Some features may not be available',
            variant: offlineReady ? 'default' : 'destructive',
            className: offlineReady
                ? 'border-yellow-200 bg-yellow-50 text-yellow-800'
                : 'border-red-200 bg-red-50 text-red-800'
        }
    } else {
        return {
            icon: Wifi,
            title: 'You are online',
            description: 'All features are available',
            variant: 'default',
            className: 'border-green-200 bg-green-50 text-green-800'
        }
    }
})

const containerClass = computed(() => {
    const base = 'z-50'
    const positionClass = props.position === 'fixed'
        ? 'fixed bottom-4 right-4 max-w-sm'
        : 'relative w-full'

    return `${base} ${positionClass}`
})
</script>

<template>
    <div v-if="shouldShow" :class="containerClass">
        <!-- Compact Badge Version -->
        <Badge
            v-if="compact"
            :variant="isOnline ? 'secondary' : 'destructive'"
            class="flex items-center gap-1"
        >
            <component :is="statusConfig.icon" class="h-3 w-3" />
            {{ isOnline ? 'Online' : 'Offline' }}
        </Badge>

        <!-- Full Alert Version -->
        <Alert v-else :class="statusConfig.className">
            <component :is="statusConfig.icon" class="h-4 w-4" />
            <AlertDescription class="font-medium">
                {{ statusConfig.title }}
                <p class="text-xs mt-1 opacity-90">
                    {{ statusConfig.description }}
                </p>
            </AlertDescription>
        </Alert>
    </div>
</template>
