// src/components/profile/ProfilePasswordTab.vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/features/auth/stores/auth.ts';
import { useI18n } from '@/core/i18n';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { z } from 'zod';
import { AlertCircle, KeyRound, EyeOff, Eye } from 'lucide-vue-next';
import toastService from '@/shared/services/toast.service.ts';
import passwordService from '@/features/auth/services/password.service.ts';
import Spinner from '@/shared/components/ui/Spinner.vue';
import type { ApiError } from '@/core/types';

// Initialize stores and i18n
const authStore = useAuthStore();
const { t } = useI18n();

// Form state
const loading = ref(false);
const error = ref<string | null>(null);
const success = ref(false);

// Password visibility toggles
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

// Local reactive state for form values
const formValues = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Create form validation schema
const validationSchema = z.object({
  currentPassword: z.string()
      .min(1, t('profile.password.validation.currentRequired')),
  newPassword: z.string()
      .min(8, t('profile.password.validation.newLength'))
      .regex(/[A-Za-z]/, t('profile.password.validation.newLetters'))
      .regex(/[0-9]/, t('profile.password.validation.newNumbers')),
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: t('profile.password.validation.passwordMatch'),
  path: ['confirmPassword']
});

/**
 * Toggle password visibility for current password
 */
const toggleCurrentPasswordVisibility = () => {
  showCurrentPassword.value = !showCurrentPassword.value;
};

/**
 * Toggle password visibility for new password
 */
const toggleNewPasswordVisibility = () => {
  showNewPassword.value = !showNewPassword.value;
};

/**
 * Toggle password visibility for confirm password
 */
const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

/**
 * Check if passwords match
 */
const doPasswordsMatch = computed(() => {
  if (!formValues.value.confirmPassword) return true;
  return formValues.value.newPassword === formValues.value.confirmPassword;
});

/**
 * Check if form is valid
 */
const isFormValid = computed(() => {
  return formValues.value.currentPassword &&
      formValues.value.newPassword.length >= 8 &&
      doPasswordsMatch.value;
});

/**
 * Reset form fields
 */
const resetForm = () => {
  formValues.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  error.value = null;
  success.value = false;
};

/**
 * Handle form submission
 */
const onSubmit = async (event: Event) => {
  event.preventDefault();

  if (!authStore.user?.id) return;

  // Validate the form manually with Zod
  try {
    // Parse will throw an error if validation fails
    validationSchema.parse(formValues.value);

    loading.value = true;
    error.value = null;
    success.value = false;

    try {
      await passwordService.changePassword({
        currentPassword: formValues.value.currentPassword,
        newPassword: formValues.value.newPassword
      });

      // Show success notification
      toastService.success(t('profile.password.success.title'), t('profile.password.success.changed'));

      // Update success state
      success.value = true;

      // Reset form fields
      resetForm();
    } catch (err: unknown) {
      const apiError = err as ApiError;
      error.value = apiError.response?.data?.message || t('profile.password.error.changeFailed');
      toastService.error(t('profile.password.error.title'), error.value);
    } finally {
      loading.value = false;
    }
  } catch (validationError) {
    // Handle Zod validation errors
    if (validationError instanceof z.ZodError) {
      error.value = validationError.errors[0]?.message || t('profile.password.error.validationFailed');
    } else {
      error.value = t('profile.password.error.validationFailed');
    }
  }
};
</script>

<template>
  <div>
    <!-- Error display -->
    <div v-if="error" class="p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2 mb-6">
      <AlertCircle class="h-5 w-5 flex-shrink-0" />
      <p>{{ error }}</p>
    </div>

    <!-- Success message -->
    <div v-if="success" class="p-3 bg-green-50 text-green-700 rounded-md flex items-center gap-2 mb-6">
      <AlertCircle class="h-5 w-5 flex-shrink-0" />
      <p>{{ t('profile.password.success.changed') }}</p>
    </div>

    <!-- Form -->
    <form @submit="onSubmit" class="space-y-6">
      <!-- Current password field -->
      <div class="space-y-2">
        <label for="currentPassword" class="text-sm font-medium">
          {{ t('profile.password.fields.current') }}
        </label>
        <div class="relative">
          <Input
              id="currentPassword"
              name="currentPassword"
              :type="showCurrentPassword ? 'text' : 'password'"
              v-model="formValues.currentPassword"
              :placeholder="t('profile.password.placeholders.current')"
              class="pr-10"
          />
          <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
              @click="toggleCurrentPasswordVisibility"
          >
            <Eye v-if="showCurrentPassword" class="h-5 w-5" />
            <EyeOff v-else class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- New password field -->
      <div class="space-y-2">
        <label for="newPassword" class="text-sm font-medium">
          {{ t('profile.password.fields.new') }}
        </label>
        <div class="relative">
          <Input
              id="newPassword"
              name="newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              v-model="formValues.newPassword"
              :placeholder="t('profile.password.placeholders.new')"
              class="pr-10"
          />
          <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
              @click="toggleNewPasswordVisibility"
          >
            <Eye v-if="showNewPassword" class="h-5 w-5" />
            <EyeOff v-else class="h-5 w-5" />
          </button>
        </div>
        <p class="text-sm text-muted-foreground">
          {{ t('profile.password.descriptions.requirements') }}
        </p>
      </div>

      <!-- Confirm password field -->
      <div class="space-y-2">
        <label for="confirmPassword" class="text-sm font-medium">
          {{ t('profile.password.fields.confirm') }}
        </label>
        <div class="relative">
          <Input
              id="confirmPassword"
              name="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="formValues.confirmPassword"
              :placeholder="t('profile.password.placeholders.confirm')"
              class="pr-10"
              :class="{ 'border-red-500': formValues.confirmPassword && !doPasswordsMatch }"
          />
          <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
              @click="toggleConfirmPasswordVisibility"
          >
            <Eye v-if="showConfirmPassword" class="h-5 w-5" />
            <EyeOff v-else class="h-5 w-5" />
          </button>
        </div>
        <p v-if="formValues.confirmPassword && !doPasswordsMatch" class="text-sm text-red-500">
          {{ t('profile.password.validation.passwordMatch') }}
        </p>
      </div>

      <!-- Submit button -->
      <Button
          type="submit"
          :disabled="loading || !isFormValid"
          class="w-full sm:w-auto"
      >
        <template v-if="loading">
          <Spinner color="text-white" size="sm" :mr="true" />
          {{ t('profile.password.buttons.changing') }}
        </template>
        <template v-else>
          <KeyRound class="mr-2 h-4 w-4" />
          {{ t('profile.password.buttons.change') }}
        </template>
      </Button>
    </form>
  </div>
</template>
