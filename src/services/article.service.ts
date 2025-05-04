// src/services/article.service.ts
import apiClient from '@/lib/axios'

/**
 * Article interface based on API response
 */
export interface Article {
    id: number
    title: string
    content: string
    slug: string
    picture: string
    publishedAt: string
}

/**
 * API response interface for article collection
 */
interface ArticleCollectionResponse {
    'hydra:member': Article[]
    'hydra:totalItems': number
    'hydra:view': {
        '@id': string
        'hydra:first': string
        'hydra:last': string
        'hydra:next'?: string
    }
}

/**
 * Article service for fetching articles from the API
 */
class ArticleService {
    /**
     * Get latest articles
     * @param limit Number of articles to fetch
     * @returns Promise with article collection
     */
    async getLatestArticles(limit = 5): Promise<Article[]> {
        const response = await apiClient.get<ArticleCollectionResponse>('/api/articles', {
            params: {
                'order[publishedAt]': 'desc',
                'status': 'PUBLISHED',
                itemsPerPage: limit
            }
        })
        return response.data['hydra:member']
    }

    /**
     * Get article by ID
     * @param id Article ID
     * @returns Promise with article data
     */
    async getArticle(id: number): Promise<Article> {
        const response = await apiClient.get<Article>(`/api/articles/${id}`)
        return response.data
    }
}

export default new ArticleService()