<!-- src/features/theme/components/ThemeSwitcher.vue -->
<script setup lang="ts">
import { useColorMode, useCycleList } from '@vueuse/core'
import { watchEffect } from 'vue'
import { Moon, Sun} from 'lucide-vue-next'

const mode = useColorMode({
  emitAuto: true,
})

const { state, next } = useCycleList(['dark', 'light'] as const, { initialValue: mode })

watchEffect(() => mode.value = state.value)
</script>

<template>
  <button class="cursor-pointer" @click="next()">
    <Sun v-if="state === 'dark'" class="align-middle" :size="20" />
    <Moon v-else class="align-middle" :size="20" />
  </button>
</template>