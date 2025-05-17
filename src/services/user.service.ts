// src/services/user.service.ts
import apiClient from '@/lib/axios'
import type { User } from '@/types/auth'


/**
 * Extended User interface with additional profile data
 */
export interface UserProfile extends User {
    email?: string
    username: string
    slug: string
    language: string
    createdAt?: string
    updatedAt?: string
}

/**
 * User update data interface
 */
export interface UserUpdateData {
    username?: string
    email?: string
    language?: string
}

/**
 * User service for managing user profiles
 */
class UserService {
    /**
     * Get user profile data
     * @param userId User ID
     * @returns Promise with user profile data
     */
    async getUserProfile(userId: number): Promise<UserProfile> {
        try {
            const response = await apiClient.get<UserProfile>(`/api/users/${userId}`);
            console.log('API Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    /**
     * Update user profile
     * @param userId User ID
     * @param data User data to update
     * @returns Promise with updated user profile
     */
    async updateUserProfile(userId: number, data: UserUpdateData): Promise<UserProfile> {
        const response = await apiClient.put<UserProfile>(`/api/users/${userId}`, data)
        return response.data
    }
}

export default new UserService()
