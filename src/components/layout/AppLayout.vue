<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useI18n } from '@/i18n';

const { t } = useI18n();
</script>

<template>
  <SidebarProvider>
    <AppSidebar />

    <div class="flex flex-col min-h-screen w-full">
      <AppHeader />

      <main class="flex-1 w-full px-4 py-6 sm:px-6">
        <RouterView />
      </main>

      <footer class="border-t py-4 px-4 sm:px-6 w-full">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{{ t('layout.footer.copyright') }}</p>
          <nav class="flex items-center gap-4">
            <a href="#" class="hover:underline">{{ t('layout.footer.legal') }}</a>
            <a href="#" class="hover:underline">{{ t('layout.footer.privacy') }}</a>
            <a href="#" class="hover:underline">{{ t('layout.footer.contact') }}</a>
          </nav>
        </div>
      </footer>
    </div>
  </SidebarProvider>
</template>