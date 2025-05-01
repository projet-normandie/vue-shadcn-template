<template>
  <div class="space-y-6">
    <div class="flex flex-col space-y-2">
      <h2 class="text-2xl font-bold tracking-tight">{{ t('home.welcome') }}</h2>
      <p class="text-muted-foreground">
        {{ t('home.description') }}
      </p>
    </div>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-lg border p-6 shadow-sm">
        <h3 class="font-medium mb-2">{{ t('home.features.feature1.title') }}</h3>
        <p class="text-sm text-muted-foreground">
          {{ t('home.features.feature1.description') }}
        </p>
      </div>
      <div class="rounded-lg border p-6 shadow-sm">
        <h3 class="font-medium mb-2">{{ t('home.features.feature2.title') }}</h3>
        <p class="text-sm text-muted-foreground">
          {{ t('home.features.feature2.description') }}
        </p>
      </div>
      <div class="rounded-lg border p-6 shadow-sm">
        <h3 class="font-medium mb-2">{{ t('home.features.feature3.title') }}</h3>
        <p class="text-sm text-muted-foreground">
          {{ t('home.features.feature3.description') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/i18n';

const { t } = useI18n();
</script>