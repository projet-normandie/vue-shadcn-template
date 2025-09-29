<script setup lang="ts">
import { Toaster } from '@/shared/components/ui/sonner'
</script>

<template>
  <RouterView />
  <Toaster
      :richColors="true"
      :expand="true"
      :closeButton="true"
  />
</template>