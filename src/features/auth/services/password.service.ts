// src/services/password.service.ts
import apiClient from '@/core/lib/axios.ts'
import { useAuthStore } from '@/features/auth/stores/auth.ts'

/**
 * Interface for password change request
 */
export interface PasswordChangeData {
    currentPassword: string
    newPassword: string
}

/**
 * Response interface for password change
 */
export interface PasswordChangeResponse {
    success?: boolean
    message?: string
}

/**
 * Password service for managing user passwords
 */
class PasswordService {
    /**
     * Change user password
     * @param data Password change data with current and new password
     * @returns Promise with the API response
     */
    async changePassword(data: PasswordChangeData): Promise<PasswordChangeResponse> {
        const authStore = useAuthStore();

        if (!authStore.user?.id) {
            throw new Error('User not authenticated');
        }

        // Send both the current and new password for verification
        const response = await apiClient.post<PasswordChangeResponse>('/api/users/change-password', {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword
        });

        return response.data;
    }
}

export default new PasswordService()
