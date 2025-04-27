<script setup lang="ts">
import { computed } from 'vue';
import * as authUtils from '@/utils/auth.utils';

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

// Vérifie si l'utilisateur a les autorisations nécessaires
const hasPermission = computed(() => {
  // Si un rôle spécifique est requis
  if (props.requiredRole) {
    return authUtils.hasRole(props.requiredRole);
  }

  // Si plusieurs rôles sont requis
  if (props.requiredRoles.length > 0) {
    return props.requireAll
        ? authUtils.hasAllRoles(props.requiredRoles)
        : authUtils.hasAnyRole(props.requiredRoles);
  }

  // Par défaut, considérer que l'authentification est suffisante
  return authUtils.isAuthenticated();
});
</script>

<template>
  <div>
    <!-- Contenu pour les utilisateurs autorisés -->
    <template v-if="hasPermission">
      <slot></slot>
    </template>

    <!-- Contenu alternatif pour les utilisateurs non autorisés -->
    <template v-else-if="fallbackContent">
      <slot name="fallback">
        <div class="p-4 bg-gray-50 rounded-md text-gray-500 text-sm border border-gray-200">
          Vous n'avez pas les permissions nécessaires pour afficher ce contenu.
        </div>
      </slot>
    </template>
  </div>
</template>