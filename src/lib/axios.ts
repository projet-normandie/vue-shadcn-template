import axios from 'axios'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'


// Pour éviter les appels infinis de refresh token
let isRefreshing = false
let failedQueue: Array<{
    resolve: (value: unknown) => void
    reject: (reason?: any) => void
    config: any
}> = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })

    failedQueue = []
}


// Configuration de base d'axios
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_ROOT_API,
})

// Intercepteur pour les requêtes
apiClient.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore()

        // Ajouter le token d'authentification si disponible
        if (authStore.token) {
            config.headers.Authorization = `Bearer ${authStore.token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Intercepteur pour les réponses
apiClient.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config

        // Éviter les boucles infinies
        if (originalRequest._retry) {
            return Promise.reject(error)
        }

        // Si l'erreur est 401 (non autorisé) et nous avons un refresh token
        if (error.response && error.response.status === 401) {
            const authStore = useAuthStore()

            // Si nous n'avons pas de token de rafraichissement ou si la requête était déjà pour un refresh token
            if (!authStore.refreshToken || originalRequest.url === '/token/refresh') {
                authStore.logout()
                router.push('/login')
                return Promise.reject(error)
            }

            if (isRefreshing) {
                // Si un refresh est déjà en cours, mettre la requête en file d'attente
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject, config: originalRequest })
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`
                        return apiClient(originalRequest)
                    })
                    .catch(err => {
                        return Promise.reject(err)
                    })
            }

            originalRequest._retry = true
            isRefreshing = true

            return new Promise((resolve, reject) => {
                authStore.refreshAuthToken()
                    .then(success => {
                        if (success) {
                            processQueue(null, authStore.token)
                            originalRequest.headers['Authorization'] = `Bearer ${authStore.token}`
                            resolve(apiClient(originalRequest))
                        } else {
                            processQueue(error)
                            authStore.logout()
                            router.push('/login')
                            reject(error)
                        }
                    })
                    .catch(err => {
                        processQueue(err)
                        authStore.logout()
                        router.push('/login')
                        reject(err)
                    })
                    .finally(() => {
                        isRefreshing = false
                    })
            })
        }

        return Promise.reject(error)
    }
)

export default apiClient