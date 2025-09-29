// src/composables/useAuth.ts
import { computed } from 'vue'
import { useAuthStore } from '@/features/auth/stores/auth.ts'

/**
 * Composable for authentication state management
 * Provides reactive access to authentication state from the store
 */
export function useAuth() {
    const authStore = useAuthStore()

    /**
     * Check if the user is authenticated
     */
    const isAuthenticated = computed(() => authStore.isAuthenticated)

    /**
     * Get the current user
     */
    const user = computed(() => authStore.user)

    /**
     * Get the current player
     */
    const player = computed(() => authStore.player)

    /**
     * Check if authentication is loading
     */
    const isLoading = computed(() => authStore.isLoading)

    /**
     * Get authentication error
     */
    const error = computed(() => authStore.error)

    /**
     * Check if token is expired
     */
    const isTokenExpired = computed(() => authStore.isTokenExpired)

    /**
     * Get the current user's friends
     */
    const friends = computed(() => authStore.friends || [])

    return {
        // State
        isAuthenticated,
        user,
        player,
        isLoading,
        error,
        isTokenExpired,
        friends,

        // Actions
        login: authStore.login.bind(authStore),
        logout: authStore.logout.bind(authStore),
        refreshToken: authStore.refreshAuthToken.bind(authStore),
        addFriend: authStore.addFriend.bind(authStore),
    }
}
