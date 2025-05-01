<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth'
import { Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-vue-next'
import { useI18n } from '@/i18n'

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const authStore = useAuthStore()
const router = useRouter()
const { t } = useI18n()

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  if (username.value && password.value) {
    const success = await authStore.login(username.value, password.value)
    if (success) {
      router.push('/')
    }
  }
}
</script>

<template>
  <div class="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-center mb-6">{{ t('auth.login.title') }}</h1>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div v-if="authStore.getError" class="p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2">
        <AlertCircle class="h-5 w-5" />
        <span>{{ authStore.getError }}</span>
      </div>

      <div class="space-y-2">
        <label for="username" class="text-sm font-medium">{{ t('auth.login.username') }}</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <User class="h-5 w-5" />
          </div>
          <Input
              id="username"
              v-model="username"
              :placeholder="t('auth.login.enterUsername')"
              class="pl-10"
              :disabled="authStore.isLoading"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label for="password" class="text-sm font-medium">{{ t('auth.login.password') }}</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Lock class="h-5 w-5" />
          </div>
          <Input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              :placeholder="t('auth.login.enterPassword')"
              class="pl-10"
              :disabled="authStore.isLoading"
          />
          <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
          >
            <Eye v-if="!showPassword" class="h-5 w-5" />
            <EyeOff v-else class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div class="flex items-center">
        <input
            id="remember-me"
            type="checkbox"
            v-model="rememberMe"
            class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label for="remember-me" class="ml-2 block text-sm text-gray-700">
          {{ t('auth.login.rememberMe') }}
        </label>
      </div>

      <Button
          type="submit"
          class="w-full"
          :disabled="authStore.isLoading || !username || !password"
      >
        <template v-if="authStore.isLoading">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ t('auth.login.loginInProgress') }}
        </template>
        <template v-else>
          {{ t('auth.login.loginButton') }}
        </template>
      </Button>

      <div class="text-center text-sm text-gray-500 mt-4">
        <a href="#" class="text-primary hover:underline">{{ t('auth.login.forgotPassword') }}</a>
      </div>
    </form>
  </div>
</template>