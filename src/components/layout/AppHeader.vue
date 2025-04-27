<script setup lang="ts">
import { Menu, User, LogIn } from "lucide-vue-next";
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { SidebarTrigger } from '@/components/ui/sidebar';

const authStore = useAuthStore();
const router = useRouter();
const showDropdown = ref(false);

// Toggle the user dropdown menu
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// Close dropdown when clicking outside
const closeDropdown = (e: MouseEvent) => {
  if (showDropdown.value) {
    showDropdown.value = false;
  }
};

// Handle logout action
const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
  showDropdown.value = false;
};

// User initials for avatar
const userInitials = computed(() => {
  if (!authStore.user) return '?';
  return authStore.user.username.substring(0, 2).toUpperCase();
});

// User display name
const userDisplayName = computed(() => {
  return authStore.user?.username || 'Guest';
});

// User email or ID
const userSubtitle = computed(() => {
  return authStore.user?.slug || 'm@example.com';
});

// Check if user is authenticated
const isAuthenticated = computed(() => {
  return authStore.isAuthenticated;
});

// Setup click outside listener
onMounted(() => {
  document.addEventListener('click', closeDropdown);
});
</script>

<template>
  <header class="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background w-full px-4 sm:px-6">
    <SidebarTrigger class="lg:hidden">
      <Menu class="h-6 w-6" />
    </SidebarTrigger>

    <div class="flex flex-1 items-center justify-between">
      <div class="flex items-center gap-2">
        <h1 class="font-semibold text-lg">Mon Application</h1>
      </div>

      <div class="flex items-center gap-4">
        <nav class="hidden md:flex items-center gap-6">
          <a href="#" class="text-sm font-medium hover:underline">Aide</a>
          <a href="#" class="text-sm font-medium hover:underline">Documentation</a>
        </nav>

        <!-- Login link when user is not authenticated -->
        <RouterLink
            v-if="!isAuthenticated"
            to="/login"
            class="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <LogIn class="h-5 w-5" />
          <span class="hidden sm:inline">Connexion</span>
        </RouterLink>

        <!-- User avatar only when authenticated -->
        <div v-else class="relative">
          <button
              @click.stop="toggleDropdown"
              class="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors focus:outline-none cursor-pointer"
              aria-label="Menu utilisateur"
          >
            <span class="text-sm font-medium">{{ userInitials }}</span>
          </button>
          <!-- Dropdown menu -->
          <div
              v-if="showDropdown"
              class="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white border"
          >
            <div class="p-2">
              <div class="px-4 py-2 border-b">
                <p class="font-medium">{{ userDisplayName }}</p>
                <p class="text-xs text-muted-foreground">{{ userSubtitle }}</p>
              </div>

              <div class="py-1">
                <RouterLink
                    to="/profile"
                    class="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                    @click="showDropdown = false"
                >
                  <User class="h-4 w-4" />
                  <span>Profile</span>
                  <span class="ml-auto text-xs text-muted-foreground">⌘P</span>
                </RouterLink>

                <RouterLink
                    to="#"
                    class="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                    @click="showDropdown = false"
                >
                  <span>Settings</span>
                  <span class="ml-auto text-xs text-muted-foreground">⌘S</span>
                </RouterLink>
              </div>

              <div class="py-1 border-t">
                <button
                    @click="handleLogout"
                    class="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded-md text-left"
                >
                  <span>Log out</span>
                  <span class="ml-auto text-xs text-muted-foreground">⌘⇧Q</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>