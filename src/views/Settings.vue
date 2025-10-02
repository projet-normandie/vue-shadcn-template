<!-- src/views/Settings.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '@/core/i18n'
import ThemeGrid from '@/features/theme/components/ThemeGrid.vue'
import LanguageSelectorSettings from '@/features/language/components/LanguageSelectorSettings.vue'

const { t } = useI18n()
const route = useRoute()

// Active tab management
const activeTab = ref<'appearance' | 'language'>('appearance')

const setActiveTab = (tab: 'appearance' | 'language') => {
  activeTab.value = tab
}

// Check URL hash on mount to set active tab
onMounted(() => {
  if (route.hash === '#language') {
    activeTab.value = 'language'
  }
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">{{ t('menu.settings') }}</h1>
        <p class="text-muted-foreground">{{ t('settings.subtitle') }}</p>
      </div>

      <!-- Navigation onglets -->
      <div class="border-b border-border mb-8">
        <nav class="-mb-px flex space-x-8">
          <button 
            @click="setActiveTab('appearance')"
            class="border-b-2 py-2 px-1 font-medium text-sm transition-colors"
            :class="{
              'border-primary text-primary': activeTab === 'appearance',
              'border-transparent text-muted-foreground hover:text-foreground': activeTab !== 'appearance'
            }"
          >
            {{ t('settings.tabs.appearance') }}
          </button>
          <button 
            @click="setActiveTab('language')"
            class="border-b-2 py-2 px-1 font-medium text-sm transition-colors"
            :class="{
              'border-primary text-primary': activeTab === 'language',
              'border-transparent text-muted-foreground hover:text-foreground': activeTab !== 'language'
            }"
          >
            {{ t('language.settings.title') }}
          </button>
        </nav>
      </div>

      <!-- Contenu -->
      <div class="space-y-8">
        <!-- Onglet Appearance -->
        <div v-if="activeTab === 'appearance'">
          <section class="bg-card rounded-lg border border-border p-6">
            <ThemeGrid />
          </section>
        </div>

        <!-- Onglet Language -->
        <div v-if="activeTab === 'language'" class="space-y-6">
          <section class="bg-card rounded-lg border border-border p-6">
            <LanguageSelectorSettings />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>