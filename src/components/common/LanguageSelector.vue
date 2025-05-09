<!-- src/components/common/LanguageSelector.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Globe } from 'lucide-vue-next'
import { useI18n, type SupportedLocale } from '@/i18n'
import { Button } from '@/components/ui/button'

const { locale, setLocale, availableLocales, t } = useI18n()
const showDropdown = ref(false)

// Toggle the dropdown menu
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Change the current language
const changeLanguage = (newLocale: SupportedLocale) => {
  setLocale(newLocale)
  showDropdown.value = false
}

// Close dropdown when clicking outside
const closeDropdown = (_e: MouseEvent) => {
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
      <span class="hidden sm:inline text-sm">{{ t('language.selector') }}</span>
    </Button>

    <!-- Dropdown menu -->
    <div
        v-if="showDropdown"
        class="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 border z-50"
    >
      <div class="py-1">
        <button
            v-for="(name, code) in availableLocales"
            :key="code"
            @click="changeLanguage(code as SupportedLocale)"
            class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
            :class="{ 'font-medium': locale === code }"
        >
          <span v-if="locale === code" class="w-2 h-2 rounded-full bg-primary"></span>
          <span v-else class="w-2 h-2"></span>
          {{ name }}
        </button>
      </div>
    </div>
  </div>
</template>