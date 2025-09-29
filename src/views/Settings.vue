<!-- src/views/Settings.vue -->
<script setup lang="ts">
import { useI18n } from '@/core/i18n'
import ThemeGrid from '@/features/theme/components/ThemeGrid.vue'

const { t } = useI18n()
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">{{ t('menu.settings') }}</h1>
        <p class="text-muted-foreground">{{ t('settings.subtitle') }}</p>
      </div>

      <!-- Navigation onglets -->
      <div class="border-b border-border mb-8">
        <nav class="-mb-px flex space-x-8">
          <button class="border-b-2 border-primary text-primary py-2 px-1 font-medium text-sm">
            {{ t('settings.tabs.appearance') }}
          </button>
        </nav>
      </div>

      <!-- Contenu -->
      <div class="space-y-8">
        <!-- Section Thèmes -->
        <section class="bg-card rounded-lg border border-border p-6">
          <ThemeGrid />
        </section>
      </div>
    </div>
  </div>
</template>