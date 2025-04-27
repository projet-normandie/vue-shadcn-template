import { useAuthStore } from '@/stores/auth'
import type { Directive, DirectiveBinding } from 'vue'

/**
 * Directive pour vérifier les autorisations basées sur les rôles
 *
 * Utilisation:
 * v-auth="'ROLE_ADMIN'" - Vérifie si l'utilisateur a le rôle ROLE_ADMIN
 * v-auth="['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']" - Vérifie si l'utilisateur a au moins un des rôles spécifiés
 * v-auth.all="['ROLE_ADMIN', 'ROLE_USER']" - Vérifie si l'utilisateur a tous les rôles spécifiés
 */
export const vAuth: Directive<HTMLElement, string | string[]> = {
    beforeMount(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
        const { value, modifiers } = binding
        const authStore = useAuthStore()

        const hasRole = (role: string): boolean => {
            if (!authStore.user || !authStore.user.roles) return false
            return authStore.user.roles.includes(role)
        }

        const checkAccess = (): boolean => {
            // Si aucun utilisateur ou pas de valeur, cacher l'élément
            if (!authStore.user || !value) return false

            // Si la valeur est une chaîne, vérifier directement le rôle
            if (typeof value === 'string') {
                return hasRole(value)
            }

            // Si la valeur est un tableau et le modificateur "all" est présent,
            // vérifier que l'utilisateur a tous les rôles
            if (Array.isArray(value) && modifiers.all) {
                return value.every(role => hasRole(role))
            }

            // Sinon, vérifier que l'utilisateur a au moins un des rôles
            if (Array.isArray(value)) {
                return value.some(role => hasRole(role))
            }

            return false
        }

        if (!checkAccess()) {
            // Cacher l'élément s'il n'a pas les autorisations nécessaires
            el.style.display = 'none'
        }
    }
}

// Plugin d'authentification pour Vue
export default {
    install(app: any) {
        app.directive('auth', vAuth)
    }
}