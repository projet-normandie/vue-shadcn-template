// src/components/user/UserAvatar.vue
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { User } from 'lucide-vue-next';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import avatarService from '@/services/avatar.service';
import { cn } from '@/lib/utils';

// Props for customization
const props = withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bordered?: boolean;
  userId?: number; // Optional user ID (defaults to current user)
  showFallback?: boolean; // Show initials fallback when no image
  class?: string;
}>(), {
  size: 'md',
  bordered: false,
  showFallback: true
});

// Get auth store for current user
const authStore = useAuthStore();

// State management
const loaded = ref(false);
const error = ref(false);

// Calculate the user ID to display (props or current user)
const userId = computed(() => {
  return props.userId || (authStore.user?.id || 0);
});

// User's initials for the fallback
const userInitials = computed(() => {
  if (props.userId && props.userId !== authStore.user?.id) {
    // Custom initials for other users could be added here
    return '??';
  }

  return authStore.user?.username
      ? authStore.user.username.substring(0, 2).toUpperCase()
      : '?';
});

// Get avatar URL
const avatarUrl = computed(() => {
  if (!userId.value) return '';

  // Get the direct URL to the avatar with cache-busting
  return `${avatarService.getUserAvatarUrl(userId.value)}?t=${Date.now()}`;
});

// Size classes
const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg'
};

// Container classes
const containerClass = computed(() => {
  return cn(
      sizeClasses[props.size],
      props.bordered ? 'ring-2 ring-background' : '',
      props.class
  );
});

// Handle image load
const handleLoad = () => {
  loaded.value = true;
  error.value = false;
};

// Handle image error
const handleError = () => {
  loaded.value = false;
  error.value = true;
};

// Reset state when user or URL changes
onMounted(() => {
  loaded.value = false;
  error.value = false;
});
</script>

<template>
  <Avatar
      :class="containerClass"
      data-testid="user-avatar"
  >
    <!-- Actual avatar image -->
    <AvatarImage
        v-if="userId && avatarUrl"
        :src="avatarUrl"
        alt="User Avatar"
        @load="handleLoad"
        @error="handleError"
    />

    <!-- Fallback with user initials or icon -->
    <AvatarFallback
        v-if="!loaded || error || !userId"
        class="bg-muted"
    >
      <template v-if="showFallback && userInitials && !error">
        {{ userInitials }}
      </template>
      <User v-else class="h-4 w-4" />
    </AvatarFallback>
  </Avatar>
</template>