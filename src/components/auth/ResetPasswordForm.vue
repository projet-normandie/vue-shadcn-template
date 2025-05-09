// src/components/auth/ResetPasswordForm.vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Lock, AlertCircle, Eye, EyeOff } from 'lucide-vue-next'
import { useI18n } from '@/i18n'
import Spinner from '@/components/ui/Spinner.vue'
import forgotPasswordService from '@/services/forgot-password.service'
import toastService from '@/services/toast.service'
import type { ApiError } from '@/types';

/**
 * ResetPasswordForm component using Shadcn Card UI
 * Handles password reset confirmation with token
 */

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)
const router = useRouter()
const route = useRoute()
const { t } = useI18n()

/**
 * Extract token from URL
 */
const token = computed(() => {
  return route.query.token as string || ''
})

/**
 * Toggle password visibility between plain text and hidden
 */
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

/**
 * Toggle confirm password visibility between plain text and hidden
 */
const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

/**
 * Validate password length
 */
const isPasswordValid = computed(() => {
  if (!password.value) return true
  return password.value.length >= 8
})

/**
 * Check if passwords match
 */
const doPasswordsMatch = computed(() => {
  if (!confirmPassword.value) return true
  return password.value === confirmPassword.value
})

/**
 * Check if form is valid
 */
const isFormValid = computed(() => {
  return password.value &&
      confirmPassword.value &&
      isPasswordValid.value &&
      doPasswordsMatch.value &&
      token.value
})

/**
 * Handle reset password form submission
 */
const handleSubmit = async () => {
  if (!token.value) {
    error.value = t('auth.resetPassword.error.tokenRequired')
    toastService.error(t('auth.resetPassword.error.title'), error.value)
    return
  }

  if (!isFormValid.value) {
    if (!password.value) {
      error.value = t('auth.resetPassword.validation.passwordRequired')
    } else if (!isPasswordValid.value) {
      error.value = t('auth.resetPassword.validation.passwordLength')
    } else if (!doPasswordsMatch.value) {
      error.value = t('auth.resetPassword.validation.passwordMatch')
    }
    return
  }

  loading.value = true
  error.value = null

  try {
    await forgotPasswordService.confirmPasswordReset({
      token: token.value,
      plainPassword: password.value
    })

    // Show success notification
    toastService.success(
        t('auth.resetPassword.success.title'),
        t('auth.resetPassword.success.description')
    )

    // Redirect to login
    router.push('/login')

  } catch (err: unknown) {
    const apiError = err as ApiError;
    error.value = apiError.response?.data?.message || t('auth.resetPassword.error.default')

    // Show error notification
    toastService.error(
        t('auth.resetPassword.error.title'),
        error.value
    )
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Card class="w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle class="text-2xl font-bold text-center">{{ t('auth.resetPassword.title') }}</CardTitle>
      <CardDescription class="text-center">
        {{ t('auth.resetPassword.subtitle') }}
      </CardDescription>
    </CardHeader>

    <CardContent>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Error message -->
        <div v-if="error" class="p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2">
          <AlertCircle class="h-5 w-5" />
          <span>{{ error }}</span>
        </div>

        <!-- Token error -->
        <div v-if="!token" class="p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2">
          <AlertCircle class="h-5 w-5" />
          <span>{{ t('auth.resetPassword.error.tokenRequired') }}</span>
        </div>

        <!-- New Password field -->
        <div class="space-y-2">
          <label for="password" class="text-sm font-medium">{{ t('auth.resetPassword.newPassword') }}</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Lock class="h-5 w-5" />
            </div>
            <Input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                :placeholder="t('auth.resetPassword.enterNewPassword')"
                class="pl-10"
                :disabled="loading || !token"
                :class="{ 'border-red-500': password && !isPasswordValid }"
                required
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
          <p v-if="password && !isPasswordValid" class="text-sm text-red-500">
            {{ t('auth.resetPassword.validation.passwordLength') }}
          </p>
        </div>

        <!-- Confirm Password field -->
        <div class="space-y-2">
          <label for="confirmPassword" class="text-sm font-medium">{{ t('auth.resetPassword.confirmPassword') }}</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Lock class="h-5 w-5" />
            </div>
            <Input
                id="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                :placeholder="t('auth.resetPassword.enterConfirmPassword')"
                class="pl-10"
                :disabled="loading || !token"
                :class="{ 'border-red-500': confirmPassword && !doPasswordsMatch }"
                required
            />
            <button
                type="button"
                @click="toggleConfirmPasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
            >
              <Eye v-if="!showConfirmPassword" class="h-5 w-5" />
              <EyeOff v-else class="h-5 w-5" />
            </button>
          </div>
          <p v-if="confirmPassword && !doPasswordsMatch" class="text-sm text-red-500">
            {{ t('auth.resetPassword.validation.passwordMatch') }}
          </p>
        </div>

        <!-- Submit button -->
        <Button
            type="submit"
            class="w-full"
            :disabled="loading || !isFormValid"
        >
          <template v-if="loading">
            <Spinner color="text-white" size="md" :mr="true" />
            {{ t('auth.resetPassword.resetting') }}
          </template>
          <template v-else>
            {{ t('auth.resetPassword.resetButton') }}
          </template>
        </Button>
      </form>
    </CardContent>

    <CardFooter class="flex justify-center">
      <RouterLink to="/login" class="text-primary hover:underline text-sm">
        {{ t('auth.forgotPassword.backToLogin') }}
      </RouterLink>
    </CardFooter>
  </Card>
</template>