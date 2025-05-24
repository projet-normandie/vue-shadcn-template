// src/components/article/CommentList.vue
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, defineExpose } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { QuillEditor } from '@/components/ui/editor'
import { useI18n } from '@/i18n'
import { MessageSquare, User, Calendar, MoreVertical, Pencil, AlertCircle } from 'lucide-vue-next'
import commentService, { type Comment } from '@/services/comment.service'
import toastService from '@/services/toast.service'
import { useAuthStore } from '@/stores/auth'
import Spinner from '@/components/ui/Spinner.vue'
import type { ApiError } from '@/types'

/**
 * Props for the CommentList component
 */
const props = defineProps<{
  articleId: number
}>()

// Component state
const comments = ref<Comment[]>([])
const totalItems = ref(0)
const currentPage = ref(1)
const loading = ref(false)
const error = ref<string | null>(null)
const itemsPerPage = 10 // Fixed number of items per page
const openedDropdownId = ref<number | null>(null)
const editingCommentId = ref<number | null>(null)
const editContent = ref('')
const commentsLoaded = ref(false)

/**
 * Check if edit content is valid
 */
const isEditContentValid = computed(() => {
  if (!editContent.value) return false
  return commentService.isContentValid(editContent.value)
})

// Get auth store to check if user is logged in and compare with comment author
const authStore = useAuthStore()
const { t, locale } = useI18n()

/**
 * Format date for display based on locale
 */
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Load comments for the article
 */
const loadComments = async (page = 1, forceReload = false) => {
  if (commentsLoaded.value && page === 1 && comments.value.length > 0) {
    if (!forceReload) {
      console.log('Comments already loaded, skipping reload');
      return;
    }
  }

  loading.value = true;
  error.value = null;

  try {
    const response = await commentService.getArticleComments(props.articleId, page, itemsPerPage);

    if (page === 1) {
      comments.value = response['hydra:member'];
    } else {
      comments.value = [...comments.value, ...response['hydra:member']];
    }

    totalItems.value = response['hydra:totalItems'];
    currentPage.value = page;
    commentsLoaded.value = true;
  } catch (err: unknown) {
    const apiError = err as ApiError;
    error.value = apiError.response?.data?.message || t('comments.error.loadFailed');
    toastService.error(t('comments.error.title'), error.value);
  } finally {
    loading.value = false;
  }
}

/**
 * Check if there are more pages to load
 */
const hasMorePages = computed(() => {
  return comments.value.length < totalItems.value
})

/**
 * Check if the logged in user is the author of a comment
 */
const isCommentAuthor = (comment: Comment) => {
  return authStore.user && comment.user.id === authStore.user.id
}

/**
 * Toggle dropdown menu for comment actions
 */
const toggleDropdown = (commentId: number) => {
  if (openedDropdownId.value === commentId) {
    openedDropdownId.value = null
  } else {
    openedDropdownId.value = commentId
  }
}

/**
 * Close dropdowns when clicking outside
 */
const closeDropdowns = (e: MouseEvent) => {
  if (openedDropdownId.value !== null) {
    const target = e.target as HTMLElement
    if (!target.closest('.comment-actions')) {
      openedDropdownId.value = null
    }
  }
}

/**
 * Start editing a comment
 */
const startEditing = (comment: Comment) => {
  editingCommentId.value = comment.id
  editContent.value = comment.content
  openedDropdownId.value = null
}

/**
 * Cancel editing a comment
 */
const cancelEditing = () => {
  editingCommentId.value = null
  editContent.value = ''
}

/**
 * Save edited comment
 */
const saveComment = async (commentId: number) => {
  if (!isEditContentValid.value) return

  const comment = comments.value.find(c => c.id === commentId)

  if (!comment || !isCommentAuthor(comment)) {
    toastService.error(
        t('comments.error.title'),
        t('comments.error.notAuthorized')
    )
    editingCommentId.value = null
    return
  }

  loading.value = true

  try {
    await commentService.updateComment(commentId, { content: editContent.value.trim() })

    // Update the comment in the local list
    const index = comments.value.findIndex(c => c.id === commentId)
    if (index !== -1) {
      comments.value[index].content = editContent.value.trim()
      comments.value[index].updatedAt = new Date().toISOString()
    }

    toastService.success(t('comments.success.title'), t('comments.success.updated'))

    // Exit edit mode
    editingCommentId.value = null
    editContent.value = ''
  } catch (err: unknown) {
    const apiError = err as ApiError
    const errorMsg = apiError.response?.data?.message || t('comments.error.updateFailed')
    toastService.error(t('comments.error.title'), errorMsg)
  } finally {
    loading.value = false
  }
}

/**
 * Load more comments (next page)
 */
const loadMore = () => {
  loadComments(currentPage.value + 1)
}

// Watch for article ID changes to reload comments
watch(() => props.articleId, () => {
  loadComments(1)
})

// Initial load
onMounted(() => {
  loadComments()
  document.addEventListener('click', closeDropdowns)
})

// Clean up event listener
onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns)
})

defineExpose({
  loadComments
})
</script>

<template>
  <div class="space-y-4">
    <!-- Comment count header -->
    <div class="flex items-center gap-2">
      <MessageSquare class="h-5 w-5" />
      <h3 class="text-lg font-medium">
        {{ t('comments.title') }} ({{ totalItems }})
      </h3>
    </div>

    <!-- Loading state -->
    <div v-if="loading && !comments.length" class="flex justify-center py-8">
      <Spinner size="lg" color="text-primary" />
    </div>

    <!-- Error state -->
    <div v-else-if="error && !comments.length" class="p-4 bg-red-50 text-red-700 rounded-md flex items-center gap-2">
      <AlertCircle class="h-5 w-5 flex-shrink-0" />
      <p>{{ error }}</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="!comments.length" class="text-center py-8 text-muted-foreground">
      <MessageSquare class="h-12 w-12 mx-auto mb-2 opacity-20" />
      <p>{{ t('comments.empty') }}</p>
    </div>

    <!-- Comments list -->
    <div v-else class="space-y-4">
      <Card v-for="comment in comments" :key="comment.id" class="overflow-hidden comment-card">
        <CardContent class="pt-6">
          <!-- Comment header -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User class="h-5 w-5 text-primary/70" />
              </div>
              <div>
                <div class="font-medium">{{ comment.user.username }}</div>
                <div class="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar class="h-3 w-3" />
                  <time :datetime="comment.createdAt">{{ formatDate(comment.createdAt) }}</time>
                  <template v-if="comment.updatedAt">
                    <span class="px-1">•</span>
                    <span>{{ t('comments.edited') }}</span>
                  </template>
                </div>
              </div>
            </div>

            <!-- Comment actions dropdown (only for author) -->
            <div v-if="isCommentAuthor(comment)" class="relative comment-actions">
              <button
                  @click.stop="toggleDropdown(comment.id)"
                  class="p-2 rounded-full hover:bg-accent"
                  :aria-expanded="openedDropdownId === comment.id"
                  aria-haspopup="true"
              >
                <MoreVertical class="h-4 w-4" />
              </button>

              <!-- Dropdown menu -->
              <div
                  v-if="openedDropdownId === comment.id"
                  class="absolute right-0 z-10 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              >
                <div class="py-1">
                  <button
                      @click="startEditing(comment)"
                      class="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <Pencil class="h-4 w-4" />
                    {{ t('comments.actions.edit') }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Comment content (editable if in edit mode) -->
          <div v-if="editingCommentId === comment.id" class="space-y-4">
            <div class="edit-mode-wrapper">
              <QuillEditor
                  v-model="editContent"
                  :placeholder="t('comments.form.placeholder')"
                  preset="minimal"
                  height="150px"
                  class="w-full"
              />
            </div>
            <div class="flex justify-end gap-2 edit-mode-buttons">
              <Button
                  variant="outline"
                  size="sm"
                  @click="cancelEditing"
                  class="btn"
              >
                {{ t('comments.actions.cancel') }}
              </Button>
              <Button
                  size="sm"
                  @click="saveComment(comment.id)"
                  :disabled="!isEditContentValid || loading"
                  class="btn"
              >
                <Spinner v-if="loading" color="text-white" size="sm" :mr="true" />
                {{ t('comments.actions.save') }}
              </Button>
            </div>
          </div>

          <!-- Regular comment display -->
          <div v-else class="comment-content prose prose-sm dark:prose-invert max-w-none">
            <div v-html="comment.content"></div>
          </div>
        </CardContent>
      </Card>

      <!-- Load more button -->
      <div v-if="hasMorePages" class="flex justify-center pt-2">
        <Button
            variant="outline"
            @click="loadMore"
            :disabled="loading"
            class="gap-2"
        >
          <Spinner v-if="loading" color="text-primary" size="sm" :mr="false" />
          {{ t('comments.loadMore') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Comment content styling */
.comment-content :deep(p) {
  margin: 0.5rem 0;
}

.comment-content :deep(p:first-child) {
  margin-top: 0;
}

.comment-content :deep(p:last-child) {
  margin-bottom: 0;
}

.comment-content :deep(strong) {
  font-weight: 600;
}

.comment-content :deep(em) {
  font-style: italic;
}

.comment-content :deep(u) {
  text-decoration: underline;
}

.comment-content :deep(a) {
  color: hsl(var(--primary));
  text-decoration: underline;
}

.comment-content :deep(a:hover) {
  opacity: 0.8;
}

.comment-content :deep(ul),
.comment-content :deep(ol) {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
}

.comment-content :deep(li) {
  margin: 0.25rem 0;
}

.comment-content :deep(ul li) {
  list-style-type: disc;
}

.comment-content :deep(ol li) {
  list-style-type: decimal;
}

/* Compact editor for editing comments */
.edit-mode-wrapper {
  border: 1px solid hsl(var(--border));
  border-radius: 6px;
  overflow: hidden;
}

.edit-mode-wrapper :deep(.quill-editor-wrapper) {
  border: none;
  border-radius: 0;
}

.edit-mode-wrapper :deep(.quill-editor-wrapper .ql-toolbar) {
  padding: 6px 8px;
  border-bottom: 1px solid hsl(var(--border));
  border-left: none;
  border-right: none;
  border-top: none;
}

.edit-mode-wrapper :deep(.quill-editor-wrapper .ql-container) {
  border: none;
}

.edit-mode-wrapper :deep(.quill-editor-wrapper .ql-editor) {
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  min-height: 100px;
}

/* Comment actions dropdown */
.comment-actions {
  position: relative;
}

/* Smooth transitions for comment interactions */
.comment-card {
  transition: box-shadow 0.2s ease;
}

.comment-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Loading state for comment actions */
.comment-loading {
  opacity: 0.6;
  pointer-events: none;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .comment-content :deep(ul),
  .comment-content :deep(ol) {
    padding-left: 1.25rem;
  }

  .edit-mode-wrapper :deep(.quill-editor-wrapper .ql-toolbar) {
    padding: 4px 6px;
  }

  .edit-mode-wrapper :deep(.quill-editor-wrapper .ql-editor) {
    padding: 6px 8px;
    font-size: 13px;
  }

  /* Stack buttons on mobile for better UX */
  .edit-mode-buttons {
    flex-direction: column-reverse;
  }

  .edit-mode-buttons .btn {
    width: 100%;
  }
}
</style>
