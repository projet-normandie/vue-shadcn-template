<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import RoleAwareContent from './RoleAwareContent.vue';
import * as authUtils from '@/utils/auth.utils';

const authStore = useAuthStore();

// Récupère les principaux rôles pour l'affichage
const mainRoles = computed(() => {
  const roles = [];

  if (authUtils.isSuperAdmin()) roles.push({ key: 'super-admin', label: 'Super Admin', color: 'bg-red-100 text-red-800' });
  if (authUtils.isAdmin()) roles.push({ key: 'admin', label: 'Admin', color: 'bg-blue-100 text-blue-800' });
  if (authUtils.isPlayer()) roles.push({ key: 'player', label: 'Joueur', color: 'bg-green-100 text-green-800' });

  return roles;
});

// Récupère tous les rôles de l'utilisateur
const allRoles = computed(() => {
  if (!authStore.user || !authStore.user.roles) return [];
  return authStore.user.roles;
});

// Compte les rôles par catégorie
const roleCategories = computed(() => {
  if (!authStore.user || !authStore.user.roles) return {};

  const categories = {
    admin: 0,
    sonata: 0,
    vgr: 0,
    other: 0
  };

  allRoles.value.forEach(role => {
    if (role.includes('ROLE_SONATA')) {
      categories.sonata++;
    } else if (role.includes('ROLE_VGR')) {
      categories.vgr++;
    } else if (['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'].includes(role)) {
      categories.admin++;
    } else {
      categories.other++;
    }
  });

  return categories;
});
</script>

<template>
  <div class="bg-white p-5 rounded-lg shadow">
    <h3 class="text-lg font-medium mb-4">Statut de l'utilisateur</h3>

    <div v-if="authStore.isAuthenticated">
      <!-- Informations de base -->
      <div class="mb-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span class="font-medium">
              {{ authStore.user?.username.substring(0, 2).toUpperCase() }}
            </span>
          </div>
          <div>
            <p class="font-medium">{{ authStore.user?.username }}</p>
            <div class="flex flex-wrap gap-1 mt-1">
              <span
                  v-for="role in mainRoles"
                  :key="role.key"
                  :class="[role.color, 'px-2 py-0.5 text-xs rounded-full']"
              >
                {{ role.label }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Section des rôles -->
      <div class="border-t pt-3 mt-3">
        <p class="text-sm text-gray-500 mb-2">Catégories de permissions</p>
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-gray-50 p-2 rounded flex items-center justify-between">
            <span class="text-xs">Administration</span>
            <span class="text-xs font-medium bg-gray-200 px-2 py-0.5 rounded-full">{{ roleCategories.admin }}</span>
          </div>
          <div class="bg-gray-50 p-2 rounded flex items-center justify-between">
            <span class="text-xs">Sonata</span>
            <span class="text-xs font-medium bg-gray-200 px-2 py-0.5 rounded-full">{{ roleCategories.sonata }}</span>
          </div>
          <div class="bg-gray-50 p-2 rounded flex items-center justify-between">
            <span class="text-xs">VGR</span>
            <span class="text-xs font-medium bg-gray-200 px-2 py-0.5 rounded-full">{{ roleCategories.vgr }}</span>
          </div>
          <div class="bg-gray-50 p-2 rounded flex items-center justify-between">
            <span class="text-xs">Autres</span>
            <span class="text-xs font-medium bg-gray-200 px-2 py-0.5 rounded-full">{{ roleCategories.other }}</span>
          </div>
        </div>
      </div>

      <!-- Actions admin uniquement -->
      <RoleAwareContent required-role="ROLE_ADMIN" class="mt-4">
        <div class="border-t pt-3">
          <h4 class="text-sm font-medium mb-2">Actions administrateur</h4>
          <div class="grid grid-cols-2 gap-2">
            <button class="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded">
              Gérer les utilisateurs
            </button>
            <button class="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded">
              Voir les statistiques
            </button>
          </div>
        </div>
      </RoleAwareContent>

      <!-- Actions super admin uniquement -->
      <RoleAwareContent required-role="ROLE_SUPER_ADMIN" class="mt-4">
        <div class="border-t pt-3">
          <h4 class="text-sm font-medium mb-2">Actions super administrateur</h4>
          <div class="grid grid-cols-2 gap-2">
            <button class="text-xs bg-red-50 hover:bg-red-100 text-red-700 p-2 rounded">
              Configuration système
            </button>
            <button class="text-xs bg-red-50 hover:bg-red-100 text-red-700 p-2 rounded">
              Gestion des rôles
            </button>
          </div>
        </div>
      </RoleAwareContent>
    </div>

    <div v-else class="text-center py-4">
      <p class="text-gray-500 text-sm">Connectez-vous pour voir votre statut</p>
    </div>
  </div>
</template>