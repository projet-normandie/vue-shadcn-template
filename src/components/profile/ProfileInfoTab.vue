// src/components/profile/ProfileInfoTab.vue
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useI18n } from '@/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { AlertCircle, Save } from 'lucide-vue-next';
import userService from '@/services/user.service';
import toastService from '@/services/toast.service';
import Spinner from '@/components/ui/Spinner.vue';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ApiError } from '@/types';
import { type SupportedLocale } from '@/i18n';

// Initialize stores and i18n
const authStore = useAuthStore();
const { t, locale, setLocale, availableLocales } = useI18n();

// Emit events with safeguard
const emit = defineEmits<{
  'profile-updated': []
}>();

// Form state
const loading = ref(false);
const error = ref<string | null>(null);

// Local reactive state for form values
const formValues = ref({
  username: '',
  email: '',
  language: locale.value
});

// Create form validation schema
const validationSchema = z.object({
  username: z.string()
      .min(3, t('profile.validation.usernameLength'))
      .max(20, t('profile.validation.usernameMax'))
      .regex(/^[a-zA-Z0-9_]+$/, t('profile.validation.usernameFormat')),
  email: z.string()
      .email(t('profile.validation.emailFormat')),
  language: z.string()
});

// Available languages for dropdown
const languageOptions = computed(() => {
  return Object.entries(availableLocales).map(([code, name]) => ({
    value: code,
    label: name
  }));
});

/**
 * Load user data
 */
const loadUserData = async () => {
  if (!authStore.user?.id) return;

  loading.value = true;
  try {
    const userData = await userService.getUserProfile(authStore.user.id);

    // Update our local form values
    formValues.value = {
      username: userData.username || '',
      email: userData.email || '',
      language: locale.value
    };

    // Log the loaded data to verify
    console.log('User data loaded:', userData);
    console.log('Form values after update:', formValues.value);
  } catch (err) {
    console.error('Failed to load user data:', err);
    error.value = t('profile.error.loadFailed');
  } finally {
    loading.value = false;
  }
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

    try {
      await userService.updateUserProfile(authStore.user.id, {
        username: formValues.value.username,
        email: formValues.value.email,
        language: formValues.value.language,
      });

      // Update locale if changed
      if (formValues.value.language !== locale.value) {
        setLocale(formValues.value.language as SupportedLocale);
      }

      // Update auth store with new data
      if (typeof authStore.updateUserData === 'function') {
        authStore.updateUserData({
          ...authStore.user,
          username: formValues.value.username
        });
      }

      // Show success notification
      toastService.success(t('profile.success.title'), t('profile.success.updated'));

      // Emit event to parent if defined
      if (typeof emit === 'function') {
        emit('profile-updated');
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      error.value = apiError.response?.data?.message || t('profile.error.updateFailed');
      toastService.error(t('profile.error.title'), error.value);
    } finally {
      loading.value = false;
    }
  } catch (validationError) {
    // Handle Zod validation errors
    if (validationError instanceof z.ZodError) {
      error.value = validationError.errors[0]?.message || t('profile.error.validationFailed');
    } else {
      error.value = t('profile.error.validationFailed');
    }
  }
};

// Load user data on component mount
onMounted(() => {
  loadUserData();
});
</script>

<template>
  <div>
    <!-- Error display -->
    <div v-if="error" class="p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2 mb-6">
      <AlertCircle class="h-5 w-5 flex-shrink-0" />
      <p>{{ error }}</p>
    </div>

    <!-- Loading state -->
    <div v-if="loading && !formValues.username" class="flex justify-center py-8">
      <Spinner size="lg" color="text-primary" />
    </div>

    <!-- Form -->
    <form v-else @submit="onSubmit" class="space-y-6">
      <!-- Username field -->
      <div class="space-y-2">
        <label for="username" class="text-sm font-medium">{{ t('profile.fields.username') }}</label>
        <Input
            id="username"
            name="username"
            v-model="formValues.username"
            :placeholder="t('profile.placeholders.username')"
        />
        <p class="text-sm text-muted-foreground">
          {{ t('profile.descriptions.username') }}
        </p>
      </div>

      <!-- Email field -->
      <div class="space-y-2">
        <label for="email" class="text-sm font-medium">{{ t('profile.fields.email') }}</label>
        <Input
            id="email"
            name="email"
            type="email"
            v-model="formValues.email"
            :placeholder="t('profile.placeholders.email')"
        />
        <p class="text-sm text-muted-foreground">
          {{ t('profile.descriptions.email') }}
        </p>
      </div>

      <!-- Language selection -->
      <div class="space-y-2">
        <label for="language" class="text-sm font-medium">{{ t('profile.fields.language') }}</label>
        <Select
            id="language"
            name="language"
            v-model="formValues.language"
        >
          <SelectTrigger>
            <SelectValue :placeholder="t('profile.placeholders.language')" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
                v-for="option in languageOptions"
                :key="option.value"
                :value="option.value"
            >
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <p class="text-sm text-muted-foreground">
          {{ t('profile.descriptions.language') }}
        </p>
      </div>

      <!-- Submit button -->
      <Button
          type="submit"
          :disabled="loading"
          class="w-full sm:w-auto"
      >
        <template v-if="loading">
          <Spinner color="text-white" size="sm" :mr="true" />
          {{ t('profile.buttons.saving') }}
        </template>
        <template v-else>
          <Save class="mr-2 h-4 w-4" />
          {{ t('profile.buttons.save') }}
        </template>
      </Button>
    </form>
  </div>
</template>
