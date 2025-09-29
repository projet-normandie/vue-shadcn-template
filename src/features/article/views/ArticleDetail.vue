// src/views/article/ArticleDetail.vue
<template>
  <div class="min-h-screen">
    <!-- Container principal optimisé pour Full HD -->
    <div class="max-w-[1880px] mx-auto py-8 px-2 sm:px-4">
      <!-- Back button -->
      <RouterLink
          :to="{name: 'Home'}"
          class="inline-flex items-center gap-2 text-primary hover:underline mb-6"
      >
        <ArrowLeft class="h-4 w-4" />
        {{ t('article.backToHome') }}
      </RouterLink>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center py-12">
        <Spinner size="lg" color="text-primary" />
      </div>

      <!-- Article content avec layout optimisé pour grands écrans -->
      <div v-else-if="article" class="grid grid-cols-1 xl:grid-cols-4 2xl:grid-cols-4 gap-8">

        <!-- Contenu principal de l'article -->
        <div class="xl:col-span-3 2xl:col-span-3">
          <article>
            <!-- Article header -->
            <div class="mb-8">
              <div class="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div class="flex items-center gap-2">
                  <Calendar class="h-4 w-4" />
                  <time :datetime="article.publishedAt">
                    {{ formatDate(article.publishedAt) }}
                  </time>
                </div>
              </div>

              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{{ article.title }}</h1>
            </div>

            <!-- Article image -->
            <div v-if="article.picture" class="mb-8">
              <img
                  :src="article.picture"
                  :alt="article.title"
                  class="w-full rounded-lg shadow-lg"
              />
            </div>

            <!-- Article content -->
            <Card>
              <CardContent class="prose dark:prose-invert max-w-none p-6 lg:p-8">
                <div v-html="article.content"></div>
              </CardContent>
            </Card>
          </article>
        </div>

        <!-- Sidebar pour les grands écrans -->
        <div class="xl:col-span-1 2xl:col-span-1">
          <div class="sticky top-8 space-y-6">


            <!-- Informations sur l'article -->
            <Card>
              <CardContent class="p-6">
                <h3 class="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Info class="h-5 w-5" />
                  {{ t('article.info.title') }}
                </h3>
                <div class="space-y-3 text-sm">
                  <div class="flex items-center gap-2 text-muted-foreground">
                    <Calendar class="h-4 w-4" />
                    <span>{{ formatDate(article.publishedAt) }}</span>
                  </div>
                  <div v-if="article.updatedAt && article.updatedAt !== article.publishedAt"
                       class="flex items-center gap-2 text-muted-foreground">
                    <Edit class="h-4 w-4" />
                    <span>{{ t('article.info.updated') }} {{ formatDate(article.updatedAt) }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-muted-foreground">
                    <Eye class="h-4 w-4" />
                    <span>{{ article.views || 0 }} {{ t('article.info.views') }}</span>
                  </div>
                </div>
              </CardContent>
            </Card>



            <!-- Derniers articles -->
            <Card>
              <CardContent class="p-6">
                <h3 class="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Newspaper class="h-5 w-5" />
                  {{ t('article.latest') }}
                </h3>
                <div class="space-y-3">
                  <div v-if="loadingLatest" class="flex justify-center py-4">
                    <Spinner size="sm" />
                  </div>
                  <div v-else-if="latestArticles.length > 0" class="space-y-3">
                    <RouterLink
                        v-for="latestArticle in latestArticles"
                        :key="latestArticle.id"
                        :to="{ name: 'ArticleDetail', params: { id: latestArticle.id, slug: latestArticle.slug }}"
                        class="block p-3 border rounded hover:bg-muted/50 transition-colors"
                    >
                      <h4 class="font-medium text-sm line-clamp-2 hover:text-primary transition-colors mb-1">
                        {{ latestArticle.title }}
                      </h4>
                      <div class="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar class="w-3 h-3" />
                        <time :datetime="latestArticle.publishedAt">
                          {{ formatDate(latestArticle.publishedAt) }}
                        </time>
                      </div>
                    </RouterLink>
                  </div>
                  <RouterLink :to="{name: 'ArticleList'}" class="block">
                    <Button variant="outline" class="w-full" size="sm">
                      <ArrowRight class="h-4 w-4 mr-2" />
                      {{ t('article.viewAll') }}
                    </Button>
                  </RouterLink>
                </div>
              </CardContent>
            </Card>

            <!-- Actions rapides -->
            <Card>
              <CardContent class="p-6">
                <h3 class="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Zap class="h-5 w-5" />
                  {{ t('article.actions.title') }}
                </h3>
                <div class="space-y-3">
                  <Button variant="outline" class="w-full" size="sm" @click="shareArticle">
                    <Share2 class="h-4 w-4 mr-2" />
                    {{ t('article.actions.share') }}
                  </Button>
                  <Button variant="outline" class="w-full" size="sm" @click="printArticle">
                    <Printer class="h-4 w-4 mr-2" />
                    {{ t('article.actions.print') }}
                  </Button>
                  <RouterLink :to="{name: 'Home'}">
                    <Button variant="outline" class="w-full" size="sm">
                      <Home class="h-4 w-4 mr-2" />
                      {{ t('article.backToHome') }}
                    </Button>
                  </RouterLink>
                </div>
              </CardContent>
            </Card>

            <!-- Gaming Stats (si applicable) -->
            <Card v-if="article.gameRelated">
              <CardContent class="p-6">
                <h3 class="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Gamepad2 class="h-5 w-5" />
                  {{ t('article.gaming.title') }}
                </h3>
                <div class="space-y-3 text-sm">
                  <div class="text-center p-4 bg-muted rounded-lg">
                    <div class="text-2xl font-bold mb-1">{{ stats.totalGames.toLocaleString() }}</div>
                    <div class="text-muted-foreground">{{ t('app.stats.games') }}</div>
                  </div>
                  <div class="text-center p-4 bg-muted rounded-lg">
                    <div class="text-2xl font-bold mb-1">{{ stats.totalRecords.toLocaleString() }}</div>
                    <div class="text-muted-foreground">{{ t('app.stats.records') }}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <!-- Comments section - Prend la largeur du bloc central -->
      <div v-if="article" class="mt-8 space-y-6">
        <div class="grid grid-cols-1 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
          <!-- Comments dans le bloc central -->
          <div class="xl:col-span-3 2xl:col-span-3 space-y-6">
            <!-- Comment form -->
            <CommentForm
                :article-iri="article?.['@id'] || `/api/articles/${route.params.id}`"
                @comment-added="handleCommentAdded"
            />

            <!-- Comments list -->
            <CommentList
                ref="commentListRef"
                :article-id="parseInt(route.params.id as string)"
            />
          </div>

          <!-- Espace vide pour maintenir l'alignement avec la sidebar -->
          <div class="xl:col-span-1 2xl:col-span-1"></div>
        </div>
      </div>

      <!-- Error state -->
      <div v-else class="text-center py-12">
        <Card class="max-w-md mx-auto">
          <CardContent class="p-8">
            <h2 class="text-xl font-semibold mb-2">{{ t('article.notFound.title') }}</h2>
            <p class="text-muted-foreground mb-4">
              {{ t('article.notFound.description') }}
            </p>
            <Button asChild>
              <RouterLink :to="{name: 'Home'}">
                {{ t('article.returnToHome') }}
              </RouterLink>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Calendar, ArrowLeft, Info, Edit, Eye, Newspaper, ArrowRight, Zap, Share2, Printer, Home, Gamepad2 } from 'lucide-vue-next'
import { useI18n } from '@/core/i18n'
import articleService, { type Article } from '@/features/article/services/article.service.ts'
import Spinner from '@/shared/components/ui/Spinner.vue'
import toastService from '@/shared/services/toast.service.ts'
import CommentForm from '@/features/article/components/CommentForm.vue'
import CommentList from '@/features/article/components/CommentList.vue'
import { useDateFormatter } from '@/shared/composables/useDateFormatter.ts'

const route = useRoute()
const article = ref<Article | null>(null)
const loading = ref(false)
const latestArticles = ref<Article[]>([])
const loadingLatest = ref(false)
const stats = ref({
  totalGames: 1250,
  totalRecords: 45820
})
const { t } = useI18n()
const { formatDate } = useDateFormatter()

// Reference to the CommentList component for method calls
const commentListRef = ref(null)

/**
 * Handle comment added event to refresh comments list
 */
const handleCommentAdded = () => {
  // Refresh comments
  if (commentListRef.value && typeof commentListRef.value.loadComments === 'function') {
    console.log('Refreshing comment list...');

    commentListRef.value.loadComments(1, true);
  } else {
    console.warn('CommentList reference or loadComments method not available');
  }
}

/**
 * Load latest articles
 */
const loadLatestArticles = async () => {
  loadingLatest.value = true
  try {
    latestArticles.value = await articleService.getLatestArticles(4)
    // Filter out current article
    if (article.value) {
      latestArticles.value = latestArticles.value.filter(a => a.id !== article.value!.id)
    }
  } catch (error) {
    console.error('Failed to load latest articles:', error)
  } finally {
    loadingLatest.value = false
  }
}

/**
 * Share article
 */
const shareArticle = async () => {
  if (!article.value) return

  if (navigator.share) {
    try {
      await navigator.share({
        title: article.value.title,
        url: window.location.href
      })
    } catch (error) {
      console.log('Share cancelled', error)
    }
  } else {
    // Fallback: copy URL to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href)
      toastService.success(t('article.actions.share'), t('article.actions.linkCopied'))
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }
}

/**
 * Print article
 */
const printArticle = () => {
  window.print()
}

/**
 * Fetch article details
 */
const fetchArticle = async () => {
  const id = route.params.id as string

  if (!id) {
    toastService.error(t('article.error.title'), t('article.error.invalidId'))
    return Promise.reject(new Error('Invalid article ID'));
  }

  loading.value = true
  try {
    article.value = await articleService.getArticle(parseInt(id))
    return article.value;
  } catch (error) {
    console.error('Failed to fetch article:', error)
    toastService.error(t('article.error.title'), t('article.error.loadFailed'))
    return Promise.reject(error);
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchArticle().then(() => {
    // Load sidebar content after main article is loaded
    loadLatestArticles()

    setTimeout(() => {
      if (commentListRef.value && typeof commentListRef.value.loadComments === 'function') {
        commentListRef.value.loadComments(1);
      }
    }, 100);
  });
})
</script>

<style scoped>
.prose {
  color: inherit;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4),
.prose :deep(h5),
.prose :deep(h6) {
  color: inherit;
}

.prose :deep(a) {
  color: var(--primary);
  text-decoration: underline;
}

.prose :deep(a:hover) {
  color: var(--primary);
  opacity: 0.8;
}

.prose :deep(img) {
  border-radius: 0.5rem;
}

.prose :deep(p) {
  margin-bottom: 1rem;
}

.prose :deep(ul),
.prose :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.prose :deep(li) {
  margin-bottom: 0.5rem;
}
</style>
