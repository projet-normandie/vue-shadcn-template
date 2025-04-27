import { useAuthStore } from '@/stores/auth'

/**
 * Vérifie si l'utilisateur possède un rôle spécifique
 * @param role Le rôle à vérifier
 * @returns boolean
 */
export function hasRole(role: string): boolean {
    const authStore = useAuthStore()
    if (!authStore.user || !authStore.user.roles) return false
    return authStore.user.roles.includes(role)
}

/**
 * Vérifie si l'utilisateur possède l'un des rôles spécifiés
 * @param roles Tableau de rôles
 * @returns boolean
 */
export function hasAnyRole(roles: string[]): boolean {
    const authStore = useAuthStore()
    if (!authStore.user || !authStore.user.roles) return false
    return roles.some(role => authStore.user!.roles.includes(role))
}

/**
 * Vérifie si l'utilisateur possède tous les rôles spécifiés
 * @param roles Tableau de rôles
 * @returns boolean
 */
export function hasAllRoles(roles: string[]): boolean {
    const authStore = useAuthStore()
    if (!authStore.user || !authStore.user.roles) return false
    return roles.every(role => authStore.user!.roles.includes(role))
}

/**
 * Vérifie si l'utilisateur est connecté
 * @returns boolean
 */
export function isAuthenticated(): boolean {
    const authStore = useAuthStore()
    return authStore.isAuthenticated
}

/**
 * Vérifie si l'utilisateur est un administrateur (a le rôle ROLE_ADMIN)
 * @returns boolean
 */
export function isAdmin(): boolean {
    return hasRole('ROLE_ADMIN')
}

/**
 * Vérifie si l'utilisateur est un super administrateur (a le rôle ROLE_SUPER_ADMIN)
 * @returns boolean
 */
export function isSuperAdmin(): boolean {
    return hasRole('ROLE_SUPER_ADMIN')
}

/**
 * Vérifie si l'utilisateur est un joueur (a le rôle ROLE_PLAYER)
 * @returns boolean
 */
export function isPlayer(): boolean {
    return hasRole('ROLE_PLAYER')
}