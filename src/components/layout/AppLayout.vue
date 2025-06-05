<!-- src/components/layout/AppLayout.vue - Version mise à jour avec PWA -->
<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { SidebarProvider } from '@/components/ui/sidebar'

// PWA Components
import PWAInstallPrompt from '@/components/pwa/PWAInstallPrompt.vue'
import PWAUpdatePrompt from '@/components/pwa/PWAUpdatePrompt.vue'
import OfflineIndicator from '@/components/pwa/OfflineIndicator.vue'

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