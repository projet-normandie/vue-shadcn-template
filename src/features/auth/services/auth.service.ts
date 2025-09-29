import apiClient from '@/core/lib/axios.ts'
import axios from 'axios'
import type {User} from "@/features/auth/types/auth.ts";

// Create a standalone axios instance for refresh token requests
// This bypasses all interceptors to avoid Authorization header conflicts
const refreshTokenClient = axios.create({
    baseURL: apiClient.defaults.baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

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
        const response = await refreshTokenClient.post('/api/token/refresh', { refresh_token: refreshToken })
        return response.data
    }
}

export default new AuthService()