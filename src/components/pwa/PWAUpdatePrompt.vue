<!-- src/components/pwa/PWAUpdatePrompt.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { AlertTriangle, RefreshCw, X } from 'lucide-vue-next'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { usePWA } from '@/composables/usePWA'

/**
 * PWA Update Prompt Component
 * Shows when an app update is available
 */

const { updateAvailable, needRefresh, updateApp } = usePWA()

// Local state
const isUpdating = ref(false)
const isDismissed = ref(false)

const handleUpdate = async () => {
    isUpdating.value = true
    try {
        await updateApp()
    } catch (error) {
        console.error('Update failed:', error)
    } finally {
        isUpdating.value = false
    }
}

const handleDismiss = () => {
    isDismissed.value = true
}
</script>

<template>
    <Alert
        v-if="updateAvailable && needRefresh && !isDismissed"
        class="border-blue-200 bg-blue-50 relative"
    >
        <AlertTriangle class="h-4 w-4 text-blue-600" />

        <AlertDescription class="flex items-center justify-between w-full pr-8">
            <div class="flex-1">
        <span class="text-blue-800 font-medium">
          New version available!
        </span>
                <p class="text-blue-700 text-sm mt-1">
                    Update now for the latest features and improvements.
                </p>
            </div>

            <div class="flex items-center gap-2 ml-4">
                <Button
                    @click="handleUpdate"
                    :disabled="isUpdating"
                    size="sm"
                    variant="outline"
                    class="border-blue-300 text-blue-700 hover:bg-blue-100 gap-2"
                >
                    <RefreshCw :class="{ 'animate-spin': isUpdating }" class="h-3 w-3" />
                    {{ isUpdating ? 'Updating...' : 'Update' }}
                </Button>
            </div>
        </AlertDescription>

        <!-- Dismiss Button -->
        <Button
            @click="handleDismiss"
            variant="ghost"
            size="sm"
            class="absolute top-2 right-2 h-6 w-6 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
        >
            <X class="h-3 w-3" />
        </Button>
    </Alert>
</template>

<style scoped>
/* Animation for the refresh icon */
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}
</style>
