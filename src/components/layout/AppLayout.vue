<script setup lang="ts">
import { Menu } from "lucide-vue-next";
import AppSidebar from '@/components/layout/AppSidebar.vue';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
</script>

<template>
  <SidebarProvider>
    <AppSidebar />

    <div class="flex flex-col min-h-screen w-full">
      <header class="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background w-full px-4 sm:px-6">
        <SidebarTrigger class="lg:hidden">
          <Menu class="h-6 w-6" />
        </SidebarTrigger>
        <div class="flex flex-1 items-center justify-between">
          <div class="flex items-center gap-2">
            <h1 class="font-semibold text-lg">Mon Application</h1>
          </div>
          <div class="flex items-center gap-4">
            <nav class="hidden md:flex items-center gap-6">
              <a href="#" class="text-sm font-medium hover:underline">Aide</a>
              <a href="#" class="text-sm font-medium hover:underline">Documentation</a>
            </nav>
            <div class="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span class="text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 w-full px-4 py-6 sm:px-6">
        <RouterView />
      </main>

      <footer class="border-t py-4 px-4 sm:px-6 w-full">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 Mon Application. Tous droits réservés.</p>
          <nav class="flex items-center gap-4">
            <a href="#" class="hover:underline">Mentions légales</a>
            <a href="#" class="hover:underline">Politique de confidentialité</a>
            <a href="#" class="hover:underline">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  </SidebarProvider>
</template>