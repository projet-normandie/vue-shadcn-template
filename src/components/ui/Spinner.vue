<script setup lang="ts">
/**
 * Spinner component for loading states
 *
 * Props:
 * - size: Size of the spinner (default: "md")
 * - color: Color class for the spinner (default: text-white)
 * - mr: Add margin-right (default: true)
 * - ml: Add margin-left (default: false)
 */
defineProps({
  size: {
    type: String,
    default: "md",
    validator: (value: string) => ["sm", "md", "lg"].includes(value)
  },
  color: {
    type: String,
    default: "text-white"
  },
  mr: {
    type: Boolean,
    default: true
  },
  ml: {
    type: Boolean,
    default: false
  }
});

/**
 * Size classes for the spinner
 */
const sizeClass = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6"
};
</script>

<template>
  <svg
      class="animate-spin"
      :class="[
      sizeClass[size],
      color,
      mr ? 'mr-3' : '',
      ml ? 'ml-3' : ''
    ]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
</template>