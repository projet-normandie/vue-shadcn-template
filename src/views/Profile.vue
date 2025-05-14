// src/views/Profile.vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useI18n } from '@/i18n';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Upload } from 'lucide-vue-next';
import ProfileInfoTab from '@/components/profile/ProfileInfoTab.vue';
import ProfileAvatarTab from '@/components/profile/ProfileAvatarTab.vue';
import UserRoleStatus from '@/components/auth/UserRoleStatus.vue';
import UserAvatar from '@/components/user/UserAvatar.vue';

// Get stores and translations
const authStore = useAuthStore();
const { t } = useI18n();

// Current active tab
const activeTab = ref('info');

// Computed property to format token expiration date
const tokenExpirationDate = computed(() => {
  if (!authStore.tokenExpiration) return t('auth.token.status.unavailable');

  const date = new Date(authStore.tokenExpiration * 1000);
  return date.toLocaleString();
});

// Check if token is expired
const isTokenExpired = computed(() => {
  return authStore.isTokenExpired;
});

/**
 * Handle profile info update
 */
const handleProfileUpdate = () => {
  // Refresh user data if needed
  if (typeof authStore.refreshUserData === 'function') {
    authStore.refreshUserData();
  }
};
</script>

<template>
  <div>
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold">{{ t('profile.title') }}</h1>
        <p class="text-gray-500">{{ t('profile.subtitle') }}</p>
      </div>
      <UserAvatar size="lg" bordered />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main content - tabs -->
      <div class="lg:col-span-2 space-y-6">
        <Card>
          <CardContent class="pt-6">
            <Tabs v-model="activeTab" class="w-full">
              <TabsList class="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="info" @click="activeTab = 'info'">
                  <User class="mr-2 h-4 w-4" />
                  {{ t('profile.tabs.info') }}
                </TabsTrigger>
                <TabsTrigger value="avatar" @click="activeTab = 'avatar'">
                  <Upload class="mr-2 h-4 w-4" />
                  {{ t('profile.tabs.avatar') }}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" class="mt-0">
                <ProfileInfoTab @profile-updated="handleProfileUpdate" />
              </TabsContent>

              <TabsContent value="avatar" class="mt-0">
                <ProfileAvatarTab @avatar-updated="handleProfileUpdate" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <UserRoleStatus />

        <Card>
          <CardContent class="pt-6">
            <div class="flex flex-col space-y-1 mb-4">
              <h3 class="font-medium">{{ t('profile.authentication.title') }}</h3>

              <div class="flex items-center gap-2">
                <span class="h-3 w-3 rounded-full" :class="isTokenExpired ? 'bg-red-500' : 'bg-green-500'"></span>
                <span class="text-sm whitespace-nowrap">
                  {{ isTokenExpired ? t('auth.token.status.expired') : t('auth.token.status.valid') }}
                </span>
                <span class="text-xs text-muted-foreground whitespace-nowrap">{{ tokenExpirationDate }}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
