<!-- src/features/theme/components/ThemeSelector.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '@/core/i18n'
import { useThemes, type Theme } from '../composables/useThemes'

const { t } = useI18n()
const { topThemes, allThemes, applyTheme } = useThemes()

const currentTheme = ref('light')
const isOpen = ref(false)

const handleApplyTheme = (theme: Theme) => {
  applyTheme(theme)
  currentTheme.value = theme.id
  isOpen.value = false
}

// Charger le thème au montage
onMounted(() => {
  const savedTheme = localStorage.getItem('selectedTheme')
  if (savedTheme) {
    const theme = allThemes.find(t => t.id === savedTheme)
    if (theme) {
      applyTheme(theme)
      currentTheme.value = theme.id
    }
  }
})

const getCurrentTheme = () => {
  return allThemes.find(t => t.id === currentTheme.value) || allThemes[0]
}
</script>

<template>
  <div class="relative">
    <!-- Bouton principal -->
    <button 
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
    >
      <component :is="getCurrentTheme().icon" :size="16" />
      <span class="text-sm hidden sm:inline">{{ getCurrentTheme().name }}</span>
      <svg 
        class="w-4 h-4 transition-transform" 
        :class="{ 'rotate-180': isOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Menu déroulant -->
    <div 
      v-if="isOpen"
      class="absolute top-full mt-2 right-0 w-64 bg-popover border border-border rounded-lg shadow-lg z-50 p-2"
    >
      <div class="text-sm font-medium text-muted-foreground px-3 py-2 border-b border-border mb-2">
        🎨 {{ t('theme.selector.title') }}
      </div>
      
      <div class="space-y-1">
        <button
          v-for="theme in topThemes"
          :key="theme.id"
          @click="handleApplyTheme(theme)"
          class="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors text-left"
          :class="{ 'bg-accent': currentTheme === theme.id }"
        >
          <component :is="theme.icon" :size="16" />
          <div class="flex-1">
            <div class="font-medium text-sm">{{ theme.name }}</div>
            <div class="text-xs text-muted-foreground">{{ theme.description }}</div>
          </div>
          <div v-if="currentTheme === theme.id" class="w-2 h-2 rounded-full bg-primary"></div>
        </button>
      </div>
    </div>

    <!-- Overlay pour fermer -->
    <div 
      v-if="isOpen" 
      @click="isOpen = false"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>