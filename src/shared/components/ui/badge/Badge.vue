<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { cn } from '@/core/lib/utils.ts'
import { Primitive } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { type BadgeVariants, badgeVariants } from './index.ts'

const props = defineProps<PrimitiveProps & {
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <Primitive
    data-slot="badge"
    :class="cn(badgeVariants({ variant }), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>
