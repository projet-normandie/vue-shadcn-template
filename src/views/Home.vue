<template>
  <div class="space-y-6">
    <div class="flex flex-col space-y-2">
      <h2 class="text-2xl font-bold tracking-tight">{{ t('home.welcome') }}</h2>
      <p class="text-muted-foreground">
        {{ t('home.description') }}
      </p>
    </div>

    <!-- Latest Articles Section -->
    <div class="my-8">
      <LatestArticles />
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>{{ t('home.features.feature1.title') }}</CardTitle>
          <CardDescription>{{ t('home.features.feature1.description') }}</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{{ t('home.features.feature2.title') }}</CardTitle>
          <CardDescription>{{ t('home.features.feature2.description') }}</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{{ t('home.features.feature2.title') }}</CardTitle>
          <CardDescription>{{ t('home.features.feature2.description') }}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/i18n';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import LatestArticles from '@/components/article/LatestArticles.vue'
const { t } = useI18n();
</script>