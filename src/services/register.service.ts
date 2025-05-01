import apiClient from '@/lib/axios'

/**
 * User registration data interface
 */
interface RegisterData {
    username: string
    email: string
    plainPassword: string
}

/**
 * Registration service
 * Handles user registration API requests
 */
class RegisterService {
    /**
     * Register a new user
     * @param userData User registration data
     * @returns Promise with the API response
     */
    async register(userData: RegisterData): Promise<any> {
        const response = await apiClient.post('/api/users', userData)
        return response.data
    }
}

/**
 * Create and export a composable to use the registration service
 */
export default function useRegisterService() {
    return new RegisterService()
}