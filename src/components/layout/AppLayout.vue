<!-- src/components/layout/AppLayout.vue - Using separate AppFooter component -->
<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import { SidebarProvider } from '@/components/ui/sidebar';
</script>

<template>
  <SidebarProvider>
    <AppSidebar />

    <div class="flex flex-col min-h-screen w-full">
      <!-- Header component -->
      <AppHeader />

      <!-- Main content area -->
      <main class="flex-1 w-full px-4 py-6 sm:px-6">
        <RouterView />
      </main>

      <!-- Footer component -->
      <AppFooter />
    </div>
  </SidebarProvider>
</template>
