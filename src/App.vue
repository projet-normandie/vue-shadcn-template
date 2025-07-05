<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <RouterView />
  <Toaster
      :richColors="true"
      :expand="true"
      :closeButton="true"
  />
</template>