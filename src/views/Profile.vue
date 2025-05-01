<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';
import UserRoleStatus from '@/components/auth/UserRoleStatus.vue';
import TokenStatus from '@/components/auth/TokenStatus.vue';
import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import { useI18n } from '@/i18n';

const authStore = useAuthStore();
const { t } = useI18n();

/**
 * Format token expiration date for display
 */
const tokenExpirationDate = computed(() => {
  if (!authStore.tokenExpiration) return t('auth.token.status.unavailable');

  const date = new Date(authStore.tokenExpiration * 1000);
  return date.toLocaleString();
});

/**
 * Check if user has a specific role
 * @param role Role to check
 * @returns boolean
 */
const hasRole = (role: string): boolean => {
  if (!authStore.user || !authStore.user.roles) return false;
  return authStore.user.roles.includes(role);
};

/**
 * Key roles for display in UI
 */
const keyRoles = [
  'ROLE_SUPER_ADMIN',
  'ROLE_ADMIN',
  'ROLE_USER',
];
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold">{{ t('auth.profile.title') }}</h1>
      <p class="text-gray-500">{{ t('auth.profile.subtitle') }}</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main column -->
      <div class="lg:col-span-2 space-y-6">
        <div v-if="authStore.getUser" class="space-y-6">
          <!-- Authentication Info Card -->
          <Card>
            <CardHeader class="flex flex-row items-center justify-between">
              <CardTitle>{{ t('auth.profile.sections.authentication') }}</CardTitle>
              <TokenStatus />
            </CardHeader>
            <CardContent>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-muted-foreground">{{ t('auth.profile.fields.tokenStatus') }}</p>
                  <p class="font-medium" :class="{'text-green-600': !authStore.isTokenExpired, 'text-red-600': authStore.isTokenExpired}">
                    {{ authStore.isTokenExpired ? t('auth.token.status.expired') : t('auth.token.status.valid') }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">{{ t('auth.profile.fields.tokenExpiration') }}</p>
                  <p class="font-medium">{{ tokenExpirationDate }}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Account Info Card -->
          <Card>
            <CardHeader>
              <CardTitle>{{ t('auth.profile.sections.account') }}</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-muted-foreground">{{ t('auth.profile.fields.id') }}</p>
                  <p class="font-medium">{{ authStore.getUser.id }}</p>
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">{{ t('auth.profile.fields.username') }}</p>
                  <p class="font-medium">{{ authStore.getUser.username }}</p>
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">{{ t('auth.profile.fields.slug') }}</p>
                  <p class="font-medium">{{ authStore.getUser.slug }}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Roles Card -->
          <Card>
            <CardHeader>
              <CardTitle>{{ t('auth.profile.sections.roles') }}</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <!-- Main roles -->
              <div>
                <h3 class="text-sm font-medium text-muted-foreground mb-2">{{ t('auth.profile.fields.mainRoles') }}</h3>
                <div class="flex flex-wrap gap-2">
                  <div
                      v-for="role in keyRoles"
                      :key="role"
                      class="px-3 py-1 rounded-full text-sm"
                      :class="hasRole(role) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  >
                    {{ role.replace('ROLE_', '') }}
                    <span v-if="hasRole(role)" class="ml-1">✓</span>
                  </div>
                </div>
              </div>

              <!-- All roles -->
              <div>
                <h3 class="text-sm font-medium text-muted-foreground mb-2">
                  {{ t('auth.profile.fields.allRoles') }} ({{ authStore.getUser.roles.length }})
                </h3>
                <div class="p-3 rounded-md max-h-64 overflow-y-auto">
                  <div
                      v-for="role in authStore.getUser.roles"
                      :key="role"
                      class="px-2 py-1 mb-1 text-xs font-mono rounded"
                  >
                    {{ role }}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Loading state -->
        <div v-else class="flex items-center justify-center p-12">
          <div class="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <!-- User Role Status Component -->
        <UserRoleStatus />

        <!-- Quick Links Card -->
        <Card>
          <CardHeader>
            <CardTitle>{{ t('auth.profile.links.quickLinks') }}</CardTitle>
          </CardHeader>
          <CardContent>
            <nav class="space-y-2">
              <RouterLink to="/" class="block p-2 rounded-md text-sm">
                {{ t('auth.profile.links.dashboard') }}
              </RouterLink>
              <a href="#" class="block p-2 rounded-md text-sm">
                {{ t('auth.profile.links.editProfile') }}
              </a>
              <a href="#" class="block p-2 rounded-md text-sm">
                {{ t('auth.profile.links.changePassword') }}
              </a>
              <a href="#" class="block p-2 rounded-md text-sm text-red-600 hover:text-red-700">
                {{ t('auth.profile.links.deleteAccount') }}
              </a>
            </nav>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>