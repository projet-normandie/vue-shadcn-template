// src/views/NotFound.vue
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-16rem)]">
    <div class="text-center max-w-2xl px-6">
      <div class="mb-8">
        <div class="flex justify-center mb-6">
          <div class="relative">
            <div class="text-[10rem] font-extrabold text-primary opacity-10 leading-none select-none">
              404
            </div>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-4xl md:text-5xl font-bold text-primary">
                {{ t('error.notFound.title') }}
              </span>
            </div>
          </div>
        </div>
        <h2 class="text-2xl font-semibold mb-6">
          {{ t('error.notFound.subtitle') }}
        </h2>
        <p class="text-muted-foreground mb-8">
          {{ t('error.notFound.description') }}
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button @click="goBack" class="cursor-pointer">
            {{ t('error.notFound.back') }}
          </Button>
          <Button asChild variant="outline">
            <RouterLink :to="{name: 'Home'}">
              {{ t('error.notFound.home') }}
            </RouterLink>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>