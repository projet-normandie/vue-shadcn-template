// src/views/article/ArticleList.vue
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Search, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useI18n } from '@/i18n'
import articleService, { type Article } from '@/services/article.service'
import Spinner from '@/components/ui/Spinner.vue'
import toastService from '@/services/toast.service'

/**
 * Articles list view with pagination, search and filtering
 */

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()

// Component state
const articles = ref<Article[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const totalItems = ref(0)
const currentPage = ref(1)
const itemsPerPage = ref(12)
const searchQuery = ref('')
const sortBy = ref('publishedAt')
const sortOrder = ref('desc')

// Pagination settings
const maxVisiblePages = 5

/**
 * Format date for display based on locale
 */
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Calculate total pages
 */
const totalPages = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage.value)
})

/**
 * Calculate visible page numbers for pagination
 */
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2))
  const end = Math.min(totalPages.value, start + maxVisiblePages - 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

/**
 * Check if there's a previous page
 */
const hasPreviousPage = computed(() => {
  return currentPage.value > 1
})

/**
 * Check if there's a next page
 */
const hasNextPage = computed(() => {
  return currentPage.value < totalPages.value
})

/**
 * Sort options for the dropdown
 */
const sortOptions = [
  { value: 'publishedAt:desc', label: t('articles.sort.newest') },
  { value: 'publishedAt:asc', label: t('articles.sort.oldest') },
  { value: 'title:asc', label: t('articles.sort.titleAZ') },
  { value: 'title:desc', label: t('articles.sort.titleZA') }
]

/**
 * Items per page options
 */
const itemsPerPageOptions = [
  { value: 6, label: '6' },
  { value: 12, label: '12' },
  { value: 24, label: '24' },
  { value: 48, label: '48' }
]

/**
 * Load articles from API
 */
const loadArticles = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await articleService.getArticles({
      page: currentPage.value,
      itemsPerPage: itemsPerPage.value,
      search: searchQuery.value || undefined,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value as 'asc' | 'desc'
    })

    articles.value = response['hydra:member']
    totalItems.value = response['hydra:totalItems']
  } catch (err) {
    console.error('Failed to load articles:', err)
    error.value = t('articles.error.loadFailed')
    toastService.error(t('articles.error.title'), error.value)
  } finally {
    loading.value = false
  }
}

/**
 * Handle page change
 */
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    currentPage.value = page
    updateUrl()
    loadArticles()

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

/**
 * Handle search
 */
const handleSearch = () => {
  currentPage.value = 1
  updateUrl()
  loadArticles()
}

/**
 * Handle sort change
 */
const handleSortChange = (value: string) => {
  const [field, order] = value.split(':')
  sortBy.value = field
  sortOrder.value = order
  currentPage.value = 1
  updateUrl()
  loadArticles()
}

/**
 * Handle items per page change
 */
const handleItemsPerPageChange = (value: number) => {
  itemsPerPage.value = value
  currentPage.value = 1
  updateUrl()
  loadArticles()
}

/**
 * Update URL with current filters
 */
const updateUrl = () => {
  const query: Record<string, string> = {}

  if (currentPage.value > 1) query.page = currentPage.value.toString()
  if (itemsPerPage.value !== 12) query.limit = itemsPerPage.value.toString()
  if (searchQuery.value) query.search = searchQuery.value
  if (sortBy.value !== 'publishedAt' || sortOrder.value !== 'desc') {
    query.sort = `${sortBy.value}:${sortOrder.value}`
  }

  router.replace({ query })
}

/**
 * Initialize from URL parameters
 */
const initializeFromUrl = () => {
  currentPage.value = parseInt(route.query.page as string) || 1
  itemsPerPage.value = parseInt(route.query.limit as string) || 12
  searchQuery.value = (route.query.search as string) || ''

  if (route.query.sort) {
    const [field, order] = (route.query.sort as string).split(':')
    sortBy.value = field || 'publishedAt'
    sortOrder.value = order || 'desc'
  }
}

/**
 * Clear all filters
 */
const clearFilters = () => {
  searchQuery.value = ''
  sortBy.value = 'publishedAt'
  sortOrder.value = 'desc'
  itemsPerPage.value = 12
  currentPage.value = 1
  updateUrl()
  loadArticles()
}

// Watch for route changes (when user navigates back/forward)
watch(() => route.query, () => {
  initializeFromUrl()
  loadArticles()
})

// Initialize component
onMounted(() => {
  initializeFromUrl()
  loadArticles()
})
</script>

<template>
  <div class="container mx-auto max-w-7xl px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">{{ t('articles.list.title') }}</h1>
      <p class="text-muted-foreground">
        {{ t('articles.list.subtitle') }}
      </p>
    </div>

    <!-- Filters and Search -->
    <Card class="mb-8">
      <CardContent class="pt-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="lg:col-span-2">
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                  v-model="searchQuery"
                  :placeholder="t('articles.list.searchPlaceholder')"
                  class="pl-10"
                  @keyup.enter="handleSearch"
              />
            </div>
          </div>

          <!-- Sort -->
          <div>
            <Select
                :value="`${sortBy}:${sortOrder}`"
                @update:value="handleSortChange"
            >
              <SelectTrigger>
                <SelectValue :placeholder="t('articles.list.sortBy')" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                    v-for="option in sortOptions"
                    :key="option.value"
                    :value="option.value"
                >
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Items per page -->
          <div>
            <Select
                :value="itemsPerPage.toString()"
                @update:value="handleItemsPerPageChange"
            >
              <SelectTrigger>
                <SelectValue :placeholder="t('articles.list.itemsPerPage')" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                    v-for="option in itemsPerPageOptions"
                    :key="option.value"
                    :value="option.value.toString()"
                >
                  {{ option.label }} {{ t('articles.list.perPage') }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Filter actions -->
        <div class="flex justify-between items-center mt-4">
          <div class="text-sm text-muted-foreground">
            {{ t('articles.list.showing', {
            start: Math.min((currentPage - 1) * itemsPerPage + 1, totalItems),
            end: Math.min(currentPage * itemsPerPage, totalItems),
            total: totalItems
          }) }}
          </div>

          <div class="flex gap-2">
            <Button variant="outline" size="sm" @click="handleSearch">
              <Search class="h-4 w-4 mr-2" />
              {{ t('articles.list.search') }}
            </Button>
            <Button variant="ghost" size="sm" @click="clearFilters">
              {{ t('articles.list.clearFilters') }}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center py-12">
      <Spinner size="lg" color="text-primary" />
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-12">
      <Card>
        <CardContent class="p-8">
          <h2 class="text-xl font-semibold mb-2 text-destructive">{{ t('articles.error.title') }}</h2>
          <p class="text-muted-foreground mb-4">{{ error }}</p>
          <Button @click="loadArticles">
            {{ t('articles.list.retry') }}
          </Button>
        </CardContent>
      </Card>
    </div>

    <!-- Empty state -->
    <div v-else-if="!articles.length" class="text-center py-12">
      <Card>
        <CardContent class="p-8">
          <h2 class="text-xl font-semibold mb-2">{{ t('articles.list.noResults') }}</h2>
          <p class="text-muted-foreground mb-4">
            {{ searchQuery ? t('articles.list.noResultsSearch') : t('articles.list.noArticles') }}
          </p>
          <Button v-if="searchQuery" @click="clearFilters">
            {{ t('articles.list.clearFilters') }}
          </Button>
        </CardContent>
      </Card>
    </div>

    <!-- Articles grid -->
    <div v-else class="space-y-8">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RouterLink
            v-for="article in articles"
            :key="article.id"
            :to="{ name: 'ArticleDetail', params: { id: article.id, slug: article.slug }}"
            class="block transition-transform hover:scale-[1.02]"
        >
          <Card class="overflow-hidden hover:shadow-lg transition-shadow h-full">
            <!-- Article Image -->
            <div v-if="article.picture" class="aspect-video overflow-hidden">
              <img
                  :src="article.picture"
                  :alt="article.title"
                  class="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>

            <!-- Article Content -->
            <CardHeader class="pb-3">
              <div class="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar class="h-4 w-4" />
                <time :datetime="article.publishedAt">
                  {{ formatDate(article.publishedAt) }}
                </time>
              </div>
              <CardTitle class="line-clamp-2 leading-tight">
                {{ article.title }}
              </CardTitle>
            </CardHeader>

            <CardContent class="pt-0">
              <!-- Article excerpt if available -->
              <p v-if="article.excerpt" class="text-muted-foreground text-sm line-clamp-3 mb-3">
                {{ article.excerpt }}
              </p>

              <!-- Read more link -->
              <div class="flex items-center text-primary text-sm font-medium">
                <span>{{ t('articles.list.readMore') }}</span>
                <ArrowRight class="h-4 w-4 ml-1" />
              </div>
            </CardContent>
          </Card>
        </RouterLink>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center">
        <nav class="flex items-center gap-1">
          <!-- Previous button -->
          <Button
              variant="outline"
              size="sm"
              :disabled="!hasPreviousPage"
              @click="goToPage(currentPage - 1)"
          >
            <ChevronLeft class="h-4 w-4" />
            {{ t('articles.list.previous') }}
          </Button>

          <!-- First page -->
          <Button
              v-if="visiblePages[0] > 1"
              variant="outline"
              size="sm"
              @click="goToPage(1)"
          >
            1
          </Button>

          <!-- Ellipsis if needed -->
          <span v-if="visiblePages[0] > 2" class="px-2 text-muted-foreground">
            ...
          </span>

          <!-- Page numbers -->
          <Button
              v-for="page in visiblePages"
              :key="page"
              :variant="page === currentPage ? 'default' : 'outline'"
              size="sm"
              @click="goToPage(page)"
          >
            {{ page }}
          </Button>

          <!-- Ellipsis if needed -->
          <span v-if="visiblePages[visiblePages.length - 1] < totalPages - 1" class="px-2 text-muted-foreground">
            ...
          </span>

          <!-- Last page -->
          <Button
              v-if="visiblePages[visiblePages.length - 1] < totalPages"
              variant="outline"
              size="sm"
              @click="goToPage(totalPages)"
          >
            {{ totalPages }}
          </Button>

          <!-- Next button -->
          <Button
              variant="outline"
              size="sm"
              :disabled="!hasNextPage"
              @click="goToPage(currentPage + 1)"
          >
            {{ t('articles.list.next') }}
            <ChevronRight class="h-4 w-4" />
          </Button>
        </nav>
      </div>

      <!-- Pagination info -->
      <div class="text-center text-sm text-muted-foreground">
        {{ t('articles.list.pageInfo', { current: currentPage, total: totalPages }) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Line clamp utilities for text truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions */
.transition-transform {
  transition: transform 0.2s ease-in-out;
}

.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}

/* Aspect ratio utilities */
.aspect-video {
  aspect-ratio: 16 / 9;
}

/* Ensure cards have consistent height */
.h-full {
  height: 100%;
}
</style>
