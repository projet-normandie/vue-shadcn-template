// src/services/avatar.service.ts
import apiClient from '@/lib/axios'

/**
 * Avatar data interface for upload
 */
export interface AvatarData {
    imageData: string // Complete data URL (e.g. "data:image/jpeg;base64,...")
}

/**
 * Response interface for avatar upload
 */
export interface AvatarUploadResponse {
    success?: boolean;
    message?: string;
}

/**
 * Avatar service for managing user avatars
 */
class AvatarService {
    /**
     * Get avatar URL for a user
     * @param userId User ID
     * @returns Direct URL to the user's avatar image
     */
    getUserAvatarUrl(userId: number): string {
        // Return the direct URL to the avatar image
        return `${import.meta.env.VITE_ROOT_API || ''}/users/${userId}/avatar`;
    }

    /**
     * Upload new avatar
     * @param data Avatar data with complete data URL string including the prefix (data:image/jpeg;base64,...)
     * @returns Promise with response including success status and image URL
     */
    async uploadAvatar(data: AvatarData): Promise<AvatarUploadResponse> {
        const response = await apiClient.post<AvatarUploadResponse>('/api/users/upload-avatar', data);
        return response.data;
    }
}

export default new AvatarService()
