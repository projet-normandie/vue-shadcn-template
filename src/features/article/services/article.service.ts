// src/services/article.service.ts
import apiClient from '@/core/lib/axios.ts'

/**
 * Article interface based on API response
 */
export interface Article {
    '@id': string     // IRI for this article (e.g., '/api/articles/1')
    id: number
    title: string
    content: string
    slug: string
    picture: string
    publishedAt: string
    excerpt?: string  // Optional excerpt for article preview
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
        'hydra:previous'?: string
    }
}

/**
 * Interface for article search and filtering parameters
 */
export interface ArticleFilters {
    page?: number
    itemsPerPage?: number
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    status?: string
    category?: string
}

/**
 * Article service for fetching articles from the API
 */
class ArticleService {
    /**
     * Get articles with pagination, search and filtering
     * @param filters Search and pagination parameters
     * @returns Promise with article collection
     */
    async getArticles(filters: ArticleFilters = {}): Promise<ArticleCollectionResponse> {
        const {
            page = 1,
            itemsPerPage = 12,
            search,
            sortBy = 'publishedAt',
            sortOrder = 'desc',
            status = 'PUBLISHED',
            category
        } = filters

        // Build query parameters
        const params: Record<string, string | number> = {
            page,
            itemsPerPage,
            status
        }

        // Add sorting
        params[`order[${sortBy}]`] = sortOrder

        // Add search if provided
        if (search && search.trim()) {
            params['search'] = search.trim()
        }

        // Add category filter if provided
        if (category) {
            params['category'] = category
        }

        const response = await apiClient.get<ArticleCollectionResponse>('/api/articles', {
            params
        })

        return response.data
    }

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

    /**
     * Get featured articles
     * @param limit Number of articles to fetch
     * @returns Promise with article collection
     */
    async getFeaturedArticles(limit = 3): Promise<Article[]> {
        const response = await apiClient.get<ArticleCollectionResponse>('/api/articles', {
            params: {
                'featured': true,
                'order[publishedAt]': 'desc',
                'status': 'PUBLISHED',
                itemsPerPage: limit
            }
        })
        return response.data['hydra:member']
    }

    /**
     * Get articles by category
     * @param categorySlug Category slug
     * @param filters Additional filters
     * @returns Promise with article collection
     */
    async getArticlesByCategory(categorySlug: string, filters: Omit<ArticleFilters, 'category'> = {}): Promise<ArticleCollectionResponse> {
        return this.getArticles({
            ...filters,
            category: categorySlug
        })
    }

    /**
     * Search articles
     * @param query Search query
     * @param filters Additional filters
     * @returns Promise with article collection
     */
    async searchArticles(query: string, filters: Omit<ArticleFilters, 'search'> = {}): Promise<ArticleCollectionResponse> {
        return this.getArticles({
            ...filters,
            search: query
        })
    }

    /**
     * Get related articles
     * @param articleId Current article ID
     * @param limit Number of related articles to fetch
     * @returns Promise with related articles
     */
    async getRelatedArticles(articleId: number, limit = 3): Promise<Article[]> {
        const response = await apiClient.get<ArticleCollectionResponse>(`/api/articles/${articleId}/related`, {
            params: {
                itemsPerPage: limit
            }
        })
        return response.data['hydra:member']
    }
}

export default new ArticleService()
