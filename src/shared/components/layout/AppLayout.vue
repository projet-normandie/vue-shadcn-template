<!-- src/components/layout/AppLayout.vue - Version mise à jour avec PWA -->
<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from '@/shared/components/layout/AppSidebar.vue'
import AppHeader from '@/shared/components/layout/AppHeader.vue'
import AppFooter from '@/shared/components/layout/AppFooter.vue'
import { SidebarProvider } from '@/shared/components/ui/sidebar'

// PWA Components
import PWAInstallPrompt from '@/features/pwa/components/PWAInstallPrompt.vue'
import PWAUpdatePrompt from '@/features/pwa/components/PWAUpdatePrompt.vue'
import OfflineIndicator from '@/features/pwa/components/OfflineIndicator.vue'

// State for PWA prompts
const showInstallPrompt = ref(true)
</script>

<template>
    <SidebarProvider>
        <AppSidebar />

        <div class="flex flex-col min-h-screen w-full">
            <!-- Header component -->
            <AppHeader />

            <!-- PWA Install Prompt -->
            <div v-if="showInstallPrompt" class="px-4 pt-4">
                <PWAInstallPrompt @close="showInstallPrompt = false" />
            </div>

            <!-- PWA Update Prompt -->
            <div class="px-4 pt-4">
                <PWAUpdatePrompt />
            </div>

            <!-- Main content area -->
            <main class="flex-1 w-full px-4 py-6 sm:px-6">
                <RouterView />
            </main>

            <!-- Footer component -->
            <AppFooter />
        </div>

        <!-- Offline Indicator (fixed position) -->
        <OfflineIndicator />
    </SidebarProvider>
</template>