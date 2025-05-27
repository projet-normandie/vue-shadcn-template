<!-- src/components/layout/AppFooter.vue -->
<script setup lang="ts">
import { useI18n } from '@/i18n';

const { t } = useI18n();
</script>

<template>
  <!-- Main footer component with legal links -->
  <footer class="border-t py-4 px-4 sm:px-6 w-full">
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <!-- Copyright text -->
      <p>{{ t('layout.footer.copyright') }}</p>

      <!-- Legal links navigation -->
      <nav class="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        <!-- Legally required pages -->
        <RouterLink
            to="/legal"
            class="hover:underline hover:text-foreground transition-colors"
        >
          {{ t('layout.footer.legal') }}
        </RouterLink>

        <RouterLink
            to="/privacy"
            class="hover:underline hover:text-foreground transition-colors"
        >
          {{ t('layout.footer.privacy') }}
        </RouterLink>

        <RouterLink
            to="/terms"
            class="hover:underline hover:text-foreground transition-colors"
        >
          {{ t('layout.footer.terms') }}
        </RouterLink>

        <!-- Important pages -->
        <RouterLink
            to="/contact"
            class="hover:underline hover:text-foreground transition-colors"
        >
          {{ t('layout.footer.contact') }}
        </RouterLink>

        <RouterLink
            to="/rules"
            class="hover:underline hover:text-foreground transition-colors"
        >
          {{ t('layout.footer.rules') }}
        </RouterLink>

        <!-- Optional pages -->
        <RouterLink
            to="/about"
            class="hover:underline hover:text-foreground transition-colors"
        >
          {{ t('layout.footer.about') }}
        </RouterLink>
      </nav>
    </div>
  </footer>
</template>