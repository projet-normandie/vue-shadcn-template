<script setup lang="ts">
import { computed } from 'vue';
import * as authUtils from '@/utils/auth.utils';
import { useI18n } from '@/i18n';

const { t } = useI18n();

const props = defineProps({
  requiredRole: {
    type: String,
    default: null
  },
  requiredRoles: {
    type: Array as () => string[],
    default: () => []
  },
  requireAll: {
    type: Boolean,
    default: false
  },
  fallbackContent: {
    type: Boolean,
    default: false
  }
});

// Check if user has the necessary permissions
const hasPermission = computed(() => {
  // If a specific role is required
  if (props.requiredRole) {
    return authUtils.hasRole(props.requiredRole);
  }

  // If multiple roles are required
  if (props.requiredRoles.length > 0) {
    return props.requireAll
        ? authUtils.hasAllRoles(props.requiredRoles)
        : authUtils.hasAnyRole(props.requiredRoles);
  }

  // By default, consider authentication is sufficient
  return authUtils.isAuthenticated();
});
</script>

<template>
  <div>
    <!-- Content for authorized users -->
    <template v-if="hasPermission">
      <slot></slot>
    </template>

    <!-- Alternative content for unauthorized users -->
    <template v-else-if="fallbackContent">
      <slot name="fallback">
        <div class="p-4 bg-gray-50 rounded-md text-gray-500 text-sm border border-gray-200">
          {{ t('common.noPermission') }}
        </div>
      </slot>
    </template>
  </div>
</template>