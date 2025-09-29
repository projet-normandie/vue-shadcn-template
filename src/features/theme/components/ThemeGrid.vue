<!-- src/features/theme/components/ThemeGrid.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '@/core/i18n'
import { useThemes, type Theme } from '../composables/useThemes'

const { t } = useI18n()
const { allThemes, applyTheme } = useThemes()

const currentTheme = ref('light')

const handleApplyTheme = (theme: Theme) => {
  applyTheme(theme)
  currentTheme.value = theme.id
}

// Charger le thème au montage
onMounted(() => {
  const savedTheme = localStorage.getItem('selectedTheme')
  if (savedTheme) {
    currentTheme.value = savedTheme
  }
})

// Couleurs de preview pour les thèmes light et dark
const getThemePreviewColors = (themeId: string) => {
  const colorMaps: Record<string, { primary: string; secondary: string; accent: string }> = {
    light: { primary: '#666666', secondary: '#e5e5e5', accent: '#cccccc' },
    dark: { primary: '#ffffff', secondary: '#3f3f46', accent: '#52525b' }
  }
  
  return colorMaps[themeId] || colorMaps.light
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold">{{ t('theme.grid.title') }}</h2>
      <p class="text-muted-foreground mt-1">{{ t('theme.grid.subtitle') }}</p>
    </div>

    <!-- Grille des thèmes -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
      <button
        v-for="theme in allThemes"
        :key="theme.id"
        @click="handleApplyTheme(theme)"
        class="group relative p-6 rounded-lg border-2 transition-all duration-200 text-left"
        :class="{
          'border-primary ring-2 ring-primary/20': currentTheme === theme.id,
          'border-border hover:border-primary/50': currentTheme !== theme.id
        }"
      >
        <!-- Preview couleurs -->
        <div class="flex gap-2 mb-4">
          <div 
            class="w-8 h-8 rounded-full"
            :style="{ backgroundColor: getThemePreviewColors(theme.id).primary }"
          ></div>
          <div 
            class="w-8 h-8 rounded-full"
            :style="{ backgroundColor: getThemePreviewColors(theme.id).secondary }"
          ></div>
          <div 
            class="w-8 h-8 rounded-full"
            :style="{ backgroundColor: getThemePreviewColors(theme.id).accent }"
          ></div>
        </div>

        <!-- Info thème -->
        <div class="flex items-start gap-3">
          <component :is="theme.icon" :size="24" class="mt-0.5 flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="font-medium text-base mb-1">{{ theme.name }}</div>
            <div class="text-sm text-muted-foreground">{{ theme.description }}</div>
          </div>
        </div>

        <!-- Badge actif -->
        <div 
          v-if="currentTheme === theme.id"
          class="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium"
        >
          ✓
        </div>
      </button>
    </div>
  </div>
</template>