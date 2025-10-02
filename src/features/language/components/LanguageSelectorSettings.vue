<!-- src/features/language/components/LanguageSelectorSettings.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Globe, Check } from 'lucide-vue-next'
import { useI18n, type SupportedLocale } from '@/core/i18n'

const { availableLocales, t } = useI18n()
const route = useRoute()
const router = useRouter()

// Get current language from route
const currentLanguage = computed(() => {
  return (route.params.lang as SupportedLocale) || 'en'
})

// Change the current language by navigating to the same route with new lang
const changeLanguage = (newLocale: SupportedLocale) => {
  if (newLocale === currentLanguage.value) {
    return
  }

  // Get current route without the language parameter
  const currentPath = route.path
  const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}(-[a-z]{2})?/, '')

  // Navigate to the same path with new language
  const newPath = `/${newLocale}${pathWithoutLang}`

  // Handle query parameters and hash if they exist
  const newRoute = {
    path: newPath,
    query: route.query,
    hash: route.hash
  }

  router.push(newRoute)
}

// Language descriptions for better UX
const languageDescriptions: Record<SupportedLocale, string> = {
  en: 'English (United States)',
  fr: 'Français (France)', 
  es: 'Español (España)',
  ja: '日本語 (日本)',
  de: 'Deutsch (Deutschland)',
  it: 'Italiano (Italia)',
  'zh-cn': '简体中文 (中国)',
  'pt-br': 'Português (Brasil)'
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2 mb-4">
      <Globe class="h-5 w-5 text-primary" />
      <h3 class="text-lg font-medium">{{ t('language.settings.title') }}</h3>
    </div>
    
    <p class="text-sm text-muted-foreground mb-6">
      {{ t('language.settings.description') }}
    </p>

    <div class="grid gap-3">
      <button
        v-for="(name, code) in availableLocales"
        :key="code"
        @click="changeLanguage(code as SupportedLocale)"
        class="flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-muted/50"
        :class="{
          'border-primary bg-primary/5': currentLanguage === code,
          'border-border': currentLanguage !== code
        }"
      >
        <div class="flex items-center gap-3">
          <div class="flex flex-col items-start">
            <span class="font-medium">{{ name }}</span>
            <span class="text-sm text-muted-foreground">{{ languageDescriptions[code as SupportedLocale] }}</span>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted-foreground uppercase font-mono">{{ code }}</span>
          <Check 
            v-if="currentLanguage === code"
            class="h-4 w-4 text-primary"
          />
        </div>
      </button>
    </div>

    <div class="mt-6 p-4 rounded-lg bg-muted/50 border border-dashed">
      <div class="flex items-start gap-3">
        <Globe class="h-4 w-4 text-muted-foreground mt-0.5" />
        <div class="text-sm text-muted-foreground">
          <p class="font-medium mb-1">{{ t('language.settings.note.title') }}</p>
          <p>{{ t('language.settings.note.description') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>