<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Mon Application</h1>
        <p class="mt-2 text-gray-600">Connectez-vous pour accéder au tableau de bord</p>
      </div>

      <LoginForm />
    </div>
  </div>
</template>