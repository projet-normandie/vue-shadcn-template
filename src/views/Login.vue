<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
import { useI18n } from '@/i18n';

const { t } = useI18n();
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ t('app.name') }}</h1>
        <p class="mt-2 text-gray-600">{{ t('auth.login.subtitle') }}</p>
      </div>

      <LoginForm />
    </div>
  </div>
</template>