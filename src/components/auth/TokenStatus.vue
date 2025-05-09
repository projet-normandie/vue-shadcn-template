<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-vue-next'
import { useI18n } from '@/i18n'

const authStore = useAuthStore()
const { t } = useI18n()
const refreshing = ref(false)
const timeRemaining = ref('')
const intervalId = ref<number | null>(null)

// Calculate token status (color, text)
const tokenStatus = computed(() => {
  if (!authStore.token) return { color: 'bg-gray-200', text: t('auth.token.status.notConnected') }
  if (authStore.isTokenExpired) return { color: 'bg-red-500', text: t('auth.token.status.expired') }

  if (!authStore.tokenExpiration) return { color: 'bg-gray-200', text: t('auth.token.status.unknown') }

  const now = Math.floor(Date.now() / 1000)
  const diff = authStore.tokenExpiration - now

  if (diff < 60) return { color: 'bg-red-500', text: t('auth.token.status.expiringSoon') }
  if (diff < 300) return { color: 'bg-yellow-500', text: t('auth.token.status.expiringSoon') }
  return { color: 'bg-green-500', text: t('auth.token.status.valid') }
})

// Update remaining time for token expiration
const updateTimeRemaining = () => {
  if (!authStore.tokenExpiration) {
    timeRemaining.value = t('auth.token.status.unavailable')
    return
  }

  const now = Math.floor(Date.now() / 1000)
  const diff = authStore.tokenExpiration - now

  if (diff <= 0) {
    timeRemaining.value = t('auth.token.status.expired')
    return
  }

  const minutes = Math.floor(diff / 60)
  const seconds = diff % 60
  timeRemaining.value = `${minutes}:${seconds.toString().padStart(2, '0')}`
}

// Function to manually refresh the token
const handleRefreshToken = async () => {
  refreshing.value = true
  try {
    await authStore.refreshAuthToken()
  } finally {
    refreshing.value = false
  }
}

// Component initialization
onMounted(() => {
  updateTimeRemaining()
  intervalId.value = window.setInterval(updateTimeRemaining, 1000)
})

// Cleanup on component destruction
onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})
</script>

<template>
  <div class="flex flex-col sm:flex-row items-center gap-2">
    <div class="flex items-center gap-2">
      <span class="h-3 w-3 rounded-full" :class="tokenStatus.color"></span>
      <span class="text-sm whitespace-nowrap">{{ tokenStatus.text }}</span>
      <span class="text-xs text-muted-foreground whitespace-nowrap">{{ timeRemaining }}</span>
    </div>

    <Button
        v-if="showRefreshButton && authStore.refreshToken"
        size="sm"
        variant="outline"
        @click="handleRefreshToken"
        :disabled="refreshing"
        class="h-8 min-w-[140px]"
    >
      <RefreshCw :class="{'animate-spin': refreshing}" class="h-3 w-3 mr-2" />
      {{ refreshing ? t('auth.token.status.refreshing') : t('auth.token.status.refreshButton') }}
    </Button>
  </div>
</template>