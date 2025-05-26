<!-- src/views/Privacy.vue -->
<script setup lang="ts">
import { ref, watch, nextTick, markRaw } from 'vue'
import { useI18n } from '@/i18n'

const { locale } = useI18n()
const currentComponent = ref(null)
const isLoading = ref(true)

// Function to load the correct component
const loadComponent = async () => {
  isLoading.value = true
  currentComponent.value = null

  // Small delay to show loading state
  await nextTick()

  try {
    console.log('Loading Privacy for locale:', locale.value)

    let component
    switch (locale.value) {
      case 'fr':
        component = (await import('./privacy/Privacy.fr.vue')).default
        break
      case 'en':
      default:
        component = (await import('./privacy/Privacy.en.vue')).default
        break
    }

    // Use markRaw to prevent Vue from making the component reactive
    currentComponent.value = markRaw(component)
  } catch (error) {
    console.error('Error loading Privacy component:', error)
  } finally {
    isLoading.value = false
  }
}

// Watch for locale changes and reload component
watch(locale, loadComponent, { immediate: true })
</script>

<template>
  <div>
    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[50vh]">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p class="text-muted-foreground">Loading Privacy Policy...</p>
      </div>
    </div>

    <!-- Loaded component -->
    <component
        v-else-if="currentComponent"
        :is="currentComponent"
        :key="`privacy-${locale}`"
    />

    <!-- Error fallback -->
    <div v-else class="flex justify-center items-center min-h-[50vh]">
      <p class="text-muted-foreground">Failed to load Privacy Policy content</p>
    </div>
  </div>
</template>
