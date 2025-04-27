<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
  <Toaster
      :richColors="true"
      :expand="true"
      :closeButton="true"
  />
</template>