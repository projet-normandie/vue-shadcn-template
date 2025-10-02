<!-- src/features/language/components/LanguageSelector.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Globe } from 'lucide-vue-next'
import { useI18n, type SupportedLocale } from '@/core/i18n'
import { Button } from '@/shared/components/ui/button'

const { availableLocales, t } = useI18n()

// Define menu-only locales (main languages shown in header)
const menuOnlyLocales: Record<SupportedLocale, string> = {
  en: availableLocales.en,
  fr: availableLocales.fr,
  ja: availableLocales.ja,
} as const
const route = useRoute()
const router = useRouter()
const showDropdown = ref(false)

// Get current language from route
const currentLanguage = computed(() => {
  return (route.params.lang as SupportedLocale) || 'en'
})

// Toggle the dropdown menu
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Change the current language by navigating to the same route with new lang
const changeLanguage = (newLocale: SupportedLocale) => {
  if (newLocale === currentLanguage.value) {
    showDropdown.value = false
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
  showDropdown.value = false
}

// Close dropdown when clicking outside
const closeDropdown = () => {
  if (showDropdown.value) {
    showDropdown.value = false
  }
}

// Setup click outside listener
onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

// Clean up event listener on component unmount
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<template>
  <div class="relative" @click.stop>
    <Button
        @click.stop="toggleDropdown"
        variant="ghost"
        size="sm"
        class="flex items-center gap-2 h-9 px-2 lg:px-3"
    >
      <Globe class="h-4 w-4" />
      <span class="hidden sm:inline text-sm">{{ menuOnlyLocales[currentLanguage] || availableLocales[currentLanguage] }}</span>
      <span class="sm:hidden text-xs font-medium uppercase">{{ currentLanguage }}</span>
    </Button>

    <!-- Dropdown menu avec z-index très élevé -->
    <div
        v-if="showDropdown"
        class="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 border"
        style="z-index: 9999 !important;"
    >
      <div class="py-1">
        <button
            v-for="(name, code) in menuOnlyLocales"
            :key="code"
            @click="changeLanguage(code as SupportedLocale)"
            class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
            :class="{
              'font-medium bg-gray-50 dark:bg-gray-700': currentLanguage === code,
              'text-gray-900 dark:text-gray-100': currentLanguage !== code
            }"
        >
          <!-- Current language indicator -->
          <span
              v-if="currentLanguage === code"
              class="w-2 h-2 rounded-full bg-primary flex-shrink-0"
          ></span>
          <span v-else class="w-2 h-2 flex-shrink-0"></span>

          <!-- Language name and code -->
          <div class="flex-1">
            <div class="font-medium">{{ name }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 uppercase">{{ code }}</div>
          </div>
        </button>
        
        <!-- Lien vers plus de langues -->
        <div class="border-t border-gray-200 dark:border-gray-600 pt-1 mt-2">
          <RouterLink
            :to="{ name: 'Settings', hash: '#language' }"
            @click="showDropdown = false"
            class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
            <span>{{ t('language.selector.seeMore') }}</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Force le z-index du dropdown pour être au-dessus de tout */
div[style*="z-index: 9999"] {
  position: fixed !important;
  z-index: 9999 !important;
}

/* Smooth transitions for dropdown items */
button {
  transition: background-color 0.15s ease-in-out;
}

/* Better visual hierarchy */
.bg-gray-50 {
  background-color: rgb(249 250 251);
}

.dark .dark\:bg-gray-700 {
  background-color: rgb(55 65 81);
}

.dark .dark\:bg-gray-800 {
  background-color: rgb(31 41 55);
}
</style>
