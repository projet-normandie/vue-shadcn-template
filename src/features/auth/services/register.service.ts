import apiClient from '@/core/lib/axios.ts'

/**
 * User registration data interface
 */
interface RegisterData {
    username: string
    email: string
    plainPassword: string
}

interface RegisterResponse {
    username: string
    email: string
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
    async register(userData: RegisterData): Promise<RegisterResponse> {
        const response = await apiClient.post<RegisterResponse>('/api/users', userData)
        return response.data
    }
}

/**
 * Create and export a composable to use the registration service
 */
export default function useRegisterService() {
    return new RegisterService()
}