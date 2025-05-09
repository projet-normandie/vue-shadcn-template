import apiClient from '@/lib/axios'
import type {User} from "@/types/auth.ts";

interface LoginCredentials {
    username: string
    password: string
}

interface LoginResponse {
    token: string
    refresh_token: string
    user: User
}

interface RefreshTokenResponse {
    token: string
    refresh_token: string
}

class AuthService {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const response = await apiClient.post('/api/login_check', credentials)
        return response.data
    }


    async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
        const response = await apiClient.post('/api/token/refresh', { refresh_token: refreshToken })
        return response.data
    }
}

export default new AuthService()