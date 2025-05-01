<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import RoleAwareContent from './RoleAwareContent.vue';
import * as authUtils from '@/utils/auth.utils';
import { useI18n } from '@/i18n';

const authStore = useAuthStore();
const { t } = useI18n();

// Get main roles for display
const mainRoles = computed(() => {
  const roles = [];

  if (authUtils.isSuperAdmin()) roles.push({ key: 'super-admin', label: 'Super Admin', color: 'bg-red-100 text-red-800' });
  if (authUtils.isAdmin()) roles.push({ key: 'admin', label: 'Admin', color: 'bg-blue-100 text-blue-800' });
  if (authUtils.isPlayer()) roles.push({ key: 'player', label: 'Joueur', color: 'bg-green-100 text-green-800' });

  return roles;
});

// Get all user roles
const allRoles = computed(() => {
  if (!authStore.user || !authStore.user.roles) return [];
  return authStore.user.roles;
});

// Count roles by category
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
    <h3 class="text-lg font-medium mb-4">{{ t('auth.profile.status.title') }}</h3>

    <div v-if="authStore.isAuthenticated">
      <!-- Basic information -->
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

      <!-- Roles section -->
      <div class="border-t pt-3 mt-3">
        <p class="text-sm text-gray-500 mb-2">{{ t('auth.profile.roles.categories.title') }}</p>
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-gray-50 p-2 rounded flex items-center justify-between">
            <span class="text-xs">{{ t('auth.profile.roles.categories.admin') }}</span>
            <span class="text-xs font-medium bg-gray-200 px-2 py-0.5 rounded-full">{{ roleCategories.admin }}</span>
          </div>
          <div class="bg-gray-50 p-2 rounded flex items-center justify-between">
            <span class="text-xs">{{ t('auth.profile.roles.categories.sonata') }}</span>
            <span class="text-xs font-medium bg-gray-200 px-2 py-0.5 rounded-full">{{ roleCategories.sonata }}</span>
          </div>
          <div class="bg-gray-50 p-2 rounded flex items-center justify-between">
            <span class="text-xs">{{ t('auth.profile.roles.categories.vgr') }}</span>
            <span class="text-xs font-medium bg-gray-200 px-2 py-0.5 rounded-full">{{ roleCategories.vgr }}</span>
          </div>
          <div class="bg-gray-50 p-2 rounded flex items-center justify-between">
            <span class="text-xs">{{ t('auth.profile.roles.categories.other') }}</span>
            <span class="text-xs font-medium bg-gray-200 px-2 py-0.5 rounded-full">{{ roleCategories.other }}</span>
          </div>
        </div>
      </div>

      <!-- Admin-only actions -->
      <RoleAwareContent required-role="ROLE_ADMIN" class="mt-4">
        <div class="border-t pt-3">
          <h4 class="text-sm font-medium mb-2">{{ t('auth.profile.roles.adminActions') }}</h4>
          <div class="grid grid-cols-2 gap-2">
            <button class="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded">
              {{ t('auth.profile.roles.manageUsers') }}
            </button>
            <button class="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded">
              {{ t('auth.profile.roles.viewStatistics') }}
            </button>
          </div>
        </div>
      </RoleAwareContent>

      <!-- Super admin-only actions -->
      <RoleAwareContent required-role="ROLE_SUPER_ADMIN" class="mt-4">
        <div class="border-t pt-3">
          <h4 class="text-sm font-medium mb-2">{{ t('auth.profile.roles.superAdminActions') }}</h4>
          <div class="grid grid-cols-2 gap-2">
            <button class="text-xs bg-red-50 hover:bg-red-100 text-red-700 p-2 rounded">
              {{ t('auth.profile.roles.systemConfig') }}
            </button>
            <button class="text-xs bg-red-50 hover:bg-red-100 text-red-700 p-2 rounded">
              {{ t('auth.profile.roles.roleManagement') }}
            </button>
          </div>
        </div>
      </RoleAwareContent>
    </div>

    <div v-else class="text-center py-4">
      <p class="text-gray-500 text-sm">{{ t('auth.profile.status.guest') }}</p>
    </div>
  </div>
</template>