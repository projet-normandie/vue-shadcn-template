<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { Button } from '@/components/ui/button';
import { computed } from 'vue';
import UserRoleStatus from '@/components/auth/UserRoleStatus.vue';
import TokenStatus from '@/components/auth/TokenStatus.vue';

const authStore = useAuthStore();

// Formatage de la date d'expiration du token
const tokenExpirationDate = computed(() => {
  if (!authStore.tokenExpiration) return 'Non disponible';

  const date = new Date(authStore.tokenExpiration * 1000);
  return date.toLocaleString();
});

// Vérifier si un rôle spécifique est présent
const hasRole = (role: string): boolean => {
  if (!authStore.user || !authStore.user.roles) return false;
  return authStore.user.roles.includes(role);
};

// Rôles clés pour l'affichage
const keyRoles = [
  'ROLE_SUPER_ADMIN',
  'ROLE_ADMIN',
  'ROLE_USER',
  'ROLE_PLAYER'
];
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Profil utilisateur</h1>
      <p class="text-gray-500">Vos informations personnelles</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Colonne principale -->
      <div class="lg:col-span-2 space-y-6">
        <div v-if="authStore.getUser" class="space-y-6">
          <!-- État du token -->
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-medium">Informations d'authentification</h2>
              <TokenStatus />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">État du token</p>
                <p class="font-medium" :class="{'text-green-600': !authStore.isTokenExpired, 'text-red-600': authStore.isTokenExpired}">
                  {{ authStore.isTokenExpired ? 'Expiré' : 'Valide' }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Expiration du token</p>
                <p class="font-medium">{{ tokenExpirationDate }}</p>
              </div>
            </div>
          </div>

          <!-- Informations de base -->
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-lg font-medium mb-4">Informations de compte</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">ID</p>
                <p class="font-medium">{{ authStore.getUser.id }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Nom d'utilisateur</p>
                <p class="font-medium">{{ authStore.getUser.username }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Slug</p>
                <p class="font-medium">{{ authStore.getUser.slug }}</p>
              </div>
            </div>
          </div>

          <!-- Informations de joueur -->
          <div v-if="authStore.getPlayer" class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-lg font-medium mb-4">Informations de joueur</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">ID Joueur</p>
                <p class="font-medium">{{ authStore.getPlayer.id }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Slug Joueur</p>
                <p class="font-medium">{{ authStore.getPlayer.slug }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">ID Équipe</p>
                <p class="font-medium">{{ authStore.getPlayer.team.id }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Nom de l'équipe</p>
                <p class="font-medium">{{ authStore.getPlayer.team.slug }}</p>
              </div>
            </div>
          </div>

          <!-- Rôles -->
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-lg font-medium mb-4">Rôles et permissions</h2>

            <!-- Rôles principaux -->
            <div class="mb-4">
              <h3 class="text-sm font-medium text-gray-500 mb-2">Rôles principaux</h3>
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

            <!-- Tous les rôles -->
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Tous les rôles ({{ authStore.getUser.roles.length }})</h3>
              <div class="bg-gray-50 p-3 rounded-md max-h-64 overflow-y-auto">
                <div
                    v-for="role in authStore.getUser.roles"
                    :key="role"
                    class="px-2 py-1 mb-1 text-xs font-mono bg-gray-100 rounded"
                >
                  {{ role }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- État de chargement -->
        <div v-else class="flex items-center justify-center p-12">
          <div class="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>

      <!-- Barre latérale -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Statut utilisateur -->
        <UserRoleStatus />

        <!-- Liens utiles -->
        <div class="bg-white p-5 rounded-lg shadow">
          <h3 class="text-lg font-medium mb-4">Liens rapides</h3>
          <nav class="space-y-2">
            <RouterLink to="/" class="block p-2 hover:bg-gray-50 rounded-md text-sm">
              Tableau de bord
            </RouterLink>
            <a href="#" class="block p-2 hover:bg-gray-50 rounded-md text-sm">
              Modifier mon profil
            </a>
            <a href="#" class="block p-2 hover:bg-gray-50 rounded-md text-sm">
              Changer mon mot de passe
            </a>
            <a href="#" class="block p-2 hover:bg-gray-50 rounded-md text-sm text-red-600 hover:text-red-700">
              Supprimer mon compte
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>