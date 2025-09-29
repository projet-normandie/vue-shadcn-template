// src/features/theme/composables/useThemes.ts
import type { Component } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'
import { useI18n } from '@/core/i18n'

export interface Theme {
  id: string
  name: string
  icon: Component
  description: string
  className?: string
}

export function useThemes() {
  const { t } = useI18n()

  // Thèmes disponibles (light et dark uniquement)
  const allThemes: Theme[] = [
    {
      id: 'light',
      name: t('theme.selector.themes.light.name'),
      icon: Sun,
      description: t('theme.selector.themes.light.description'),
    },
    {
      id: 'dark', 
      name: t('theme.selector.themes.dark.name'),
      icon: Moon,
      description: t('theme.selector.themes.dark.description'),
    }
  ]

  // Top themes est maintenant identique à allThemes
  const topThemes: Theme[] = allThemes

  const applyTheme = (theme: Theme) => {
    // Supprimer toutes les classes de thème
    const htmlElement = document.documentElement
    allThemes.forEach(t => {
      if (t.className) {
        htmlElement.classList.remove(t.className)
      }
    })
    
    // Appliquer le nouveau thème
    if (theme.className) {
      htmlElement.classList.add(theme.className)
    } else if (theme.id === 'dark') {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
    
    localStorage.setItem('selectedTheme', theme.id)
  }

  return {
    topThemes,
    allThemes,
    applyTheme
  }
}