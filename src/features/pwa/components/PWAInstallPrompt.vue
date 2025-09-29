<!-- src/components/pwa/PWAInstallPrompt.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { Download, Smartphone, X } from 'lucide-vue-next'
import { usePWA } from '@/features/pwa/composables/usePWA.ts'

/**
 * PWA Install Prompt Component
 * Shows when the app can be installed as a PWA
 */

const emit = defineEmits<{
    'close': []
}>()

const {
    canInstall,
    installing,
    isPWA,
    installApp
} = usePWA()

const shouldShow = computed(() => {
    return canInstall && !isPWA && !installing
})

const handleInstall = async () => {
    await installApp()
    emit('close')
}
</script>

<template>
    <Card v-if="shouldShow" class="border-primary/20 bg-primary/5">
        <CardHeader class="pb-3">
            <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                    <div class="bg-primary/10 rounded-full p-2">
                        <Smartphone class="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle class="text-lg">Install App</CardTitle>
                        <CardDescription>
                            Add this app to your home screen for quick access
                        </CardDescription>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    @click="$emit('close')"
                    class="h-8 w-8 p-0"
                >
                    <X class="h-4 w-4" />
                </Button>
            </div>
        </CardHeader>

        <CardContent class="pt-0">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <Badge variant="secondary" class="text-xs">
                        ⚡ Fast
                    </Badge>
                    <Badge variant="secondary" class="text-xs">
                        📱 Native-like
                    </Badge>
                    <Badge variant="secondary" class="text-xs">
                        🔒 Secure
                    </Badge>
                </div>

                <Button
                    @click="handleInstall"
                    :disabled="installing"
                    size="sm"
                    class="gap-2"
                >
                    <Download class="h-4 w-4" />
                    {{ installing ? 'Installing...' : 'Install' }}
                </Button>
            </div>
        </CardContent>
    </Card>
</template>
