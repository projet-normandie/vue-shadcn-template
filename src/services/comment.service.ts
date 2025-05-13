// src/services/comment.service.ts
import apiClient from '@/lib/axios'
import type { User } from '@/types/auth'

/**
 * Comment interface based on API response
 */
export interface Comment {
    id: number
    content: string
    createdAt: string
    updatedAt: string | null
    user: User
    article: { id: number }
}

/**
 * API response interface for comment collection
 */
interface CommentCollectionResponse {
    'hydra:member': Comment[]
    'hydra:totalItems': number
    'hydra:view': {
        '@id': string
        'hydra:first': string
        'hydra:last': string
        'hydra:next'?: string
    }
}

/**
 * Comment create/update request data interface
 */
export interface CommentFormData {
    content: string
    article: string  // IRI format (e.g., '/api/articles/123')
}

/**
 * Comment service for fetching and managing comments
 */
class CommentService {
    /**
     * Get comments for an article
     * @param articleId Article ID
     * @param page Page number
     * @param itemsPerPage Number of items per page
     * @returns Promise with comment collection
     */
    async getArticleComments(
        articleId: number,
        page = 1,
        itemsPerPage = 10
    ): Promise<CommentCollectionResponse> {
        const response = await apiClient.get<CommentCollectionResponse>(`/api/articles/${articleId}/comments`, {
            params: {
                'order[createdAt]': 'desc',
                page,
                itemsPerPage
            }
        })
        return response.data
    }

    /**
     * Create a new comment
     * @param data Comment data
     * @returns Promise with created comment
     */
    async createComment(data: CommentFormData): Promise<Comment> {
        const response = await apiClient.post<Comment>('/api/article_comments', data)
        return response.data
    }

    /**
     * Update a comment
     * @param id Comment ID
     * @param data Comment data
     * @returns Promise with updated comment
     */
    async updateComment(id: number, data: Partial<CommentFormData>): Promise<Comment> {
        const response = await apiClient.put<Comment>(`/api/article_comments/${id}`, data)
        return response.data
    }


}

export default new CommentService()
