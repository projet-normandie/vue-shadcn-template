// src/services/forgot-password.service.ts
import apiClient from '@/core/lib/axios.ts'

/**
 * Interface for forgot password request
 */
interface ForgotPasswordRequest {
    email: string,
    callBackUrl: string
}

/**
 * Interface for reset password confirmation
 */
interface ResetPasswordRequest {
    token: string
    plainPassword: string
}

/**
 * Forgot Password Service
 * Handles password reset functionality with the API
 */
class ForgotPasswordService {
    /**
     * Send password reset link to user's email
     * @param data Object containing email address
     * @returns Promise with the API response
     */
    async sendPasswordResetLink(data: ForgotPasswordRequest): Promise<unknown> {
        const response = await apiClient.post('/api/users/reset-password/send-link', data)
        return response.data
    }

    /**
     * Confirm password reset with token and new password
     * @param data Object containing reset token and new password
     * @returns Promise with the API response
     */
    async confirmPasswordReset(data: ResetPasswordRequest): Promise<unknown> {
        const response = await apiClient.post('/api/users/reset-password/confirm', data)
        return response.data
    }
}

export default new ForgotPasswordService()