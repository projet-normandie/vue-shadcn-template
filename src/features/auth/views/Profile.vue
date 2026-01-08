// src/views/Profile.vue
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/features/auth/stores/auth.ts';
import { useI18n } from '@/core/i18n';
import {
  Card,
  CardContent,
} from '@/shared/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/shared/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { User, Upload, KeyRound } from 'lucide-vue-next';
import ProfileInfoTab from '@/features/auth/components/profile/ProfileInfoTab.vue';
import ProfileAvatarTab from '@/features/auth/components/profile/ProfileAvatarTab.vue';
import ProfilePasswordTab from '@/features/auth/components/profile/ProfilePasswordTab.vue';
import UserRoleStatus from '@/features/auth/components/UserRoleStatus.vue';
import UserAvatar from '@/features/auth/components/UserAvatar.vue';

// Get stores and translations
const authStore = useAuthStore();
const { t } = useI18n();

// Current active tab/accordionItem
const activeTab = ref('info');
const activeAccordionItem = ref(['info']); // For accordion, need array of active items

// Track window width for responsive design
const windowWidth = ref(window.innerWidth);
const isMobileView = computed(() => windowWidth.value < 640); // 640px is the sm breakpoint in Tailwind

// Update window width on resize
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

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

/**
 * Handle accordion item change
 */
const handleAccordionChange = (value) => {
  activeAccordionItem.value = value ? [value] : [];
  // If there's a selected item, update the active tab as well
  if (value) {
    activeTab.value = value;
  }
};

/**
 * Handle tab change
 */
const handleTabChange = (value) => {
  activeTab.value = value;
  // Synchronize accordion selection with tab
  activeAccordionItem.value = [value];
};

// Add event listener for resize on mount
onMounted(() => {
  window.addEventListener('resize', handleResize);
  // Initial check
  handleResize();
});

// Remove event listener on unmount
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
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
      <!-- Main content - tabs with responsive switching -->
      <div class="lg:col-span-2 space-y-6">
        <Card>
          <CardContent class="pt-6">
            <!-- Mobile: Accordion interface -->
            <div v-if="isMobileView">
              <Accordion
                  type="single"
                  collapsible
                  :value="activeAccordionItem[0]"
                  @update:value="handleAccordionChange"
              >
                <AccordionItem value="info">
                  <AccordionTrigger>
                    <div class="flex items-center gap-2">
                      <User class="h-4 w-4" />
                      {{ t('profile.tabs.info') }}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ProfileInfoTab @profile-updated="handleProfileUpdate" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="avatar">
                  <AccordionTrigger>
                    <div class="flex items-center gap-2">
                      <Upload class="h-4 w-4" />
                      {{ t('profile.tabs.avatar') }}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ProfileAvatarTab @avatar-updated="handleProfileUpdate" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="password">
                  <AccordionTrigger>
                    <div class="flex items-center gap-2">
                      <KeyRound class="h-4 w-4" />
                      {{ t('profile.tabs.password') }}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ProfilePasswordTab />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <!-- Desktop: Regular tabs -->
            <Tabs
                v-else
                :value="activeTab"
                @update:value="handleTabChange"
                class="w-full"
            >
              <TabsList class="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="info">
                  <User class="mr-2 h-4 w-4" />
                  {{ t('profile.tabs.info') }}
                </TabsTrigger>
                <TabsTrigger value="avatar">
                  <Upload class="mr-2 h-4 w-4" />
                  {{ t('profile.tabs.avatar') }}
                </TabsTrigger>
                <TabsTrigger value="password">
                  <KeyRound class="mr-2 h-4 w-4" />
                  {{ t('profile.tabs.password') }}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" class="mt-0">
                <ProfileInfoTab @profile-updated="handleProfileUpdate" />
              </TabsContent>

              <TabsContent value="avatar" class="mt-0">
                <ProfileAvatarTab @avatar-updated="handleProfileUpdate" />
              </TabsContent>

              <TabsContent value="password" class="mt-0">
                <ProfilePasswordTab />
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
