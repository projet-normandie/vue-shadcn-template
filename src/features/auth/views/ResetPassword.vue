// src/views/ResetPassword.vue
<script setup lang="ts">
import ResetPasswordForm from '@/features/auth/components/ResetPasswordForm.vue';
import { useI18n } from '@/core/i18n';

const { t } = useI18n();
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold">{{ t('app.name') }}</h1>
        <p class="mt-2 text-gray-600">{{ t('auth.resetPassword.subtitle') }}</p>
      </div>

      <ResetPasswordForm />
    </div>
  </div>
</template>