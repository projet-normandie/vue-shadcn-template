// src/components/article/CommentForm.vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from '@/i18n'
import toastService from '@/services/toast.service'
import commentService, { type CommentFormData } from '@/services/comment.service'
import Spinner from '@/components/ui/Spinner.vue'
import { AlertCircle } from 'lucide-vue-next'
import type { ApiError } from '@/types'

/**
 * Props for the CommentForm component
 */
const props = defineProps<{
  articleIri: string
}>()

/**
 * Emit events from this component
 */
const emit = defineEmits<{
  /**
   * Emitted when a new comment is successfully added
   */
  'comment-added': []
}>()

// Get auth store to check if user is logged in
const authStore = useAuthStore()
const { t } = useI18n()

// Form state
const content = ref('')
const isSubmitting = ref(false)
const error = ref<string | null>(null)

/**
 * Check if user is authenticated
 */
const isAuthenticated = computed(() => {
  return authStore.isAuthenticated
})

/**
 * Check if form is valid
 */
const isValid = computed(() => {
  return content.value.trim().length >= 3
})

/**
 * Handle form submission
 */
const handleSubmit = async () => {
  if (!isValid.value || isSubmitting.value) return

  isSubmitting.value = true
  error.value = null

  try {
    const articleIri = props.articleIri;

    console.log('Submitting comment with data:', {
      content: content.value.trim(),
      article: articleIri
    });

    const commentData: CommentFormData = {
      content: content.value.trim(),
      article: articleIri
    }

    await commentService.createComment(commentData)

    // Reset form
    content.value = ''

    // Show success notification
    toastService.success(
        t('comments.success.title'),
        t('comments.success.added')
    )

    // Emit event to parent
    emit('comment-added')
  } catch (err: unknown) {
    console.error('Error submitting comment:', err);

    const apiError = err as ApiError
    error.value = apiError.response?.data?.message || t('comments.error.default')

    // Show error notification
    toastService.error(
        t('comments.error.title'),
        error.value
    )
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <Card>
    <CardContent class="pt-6">
      <!-- Not logged in message -->
      <div v-if="!isAuthenticated" class="flex items-center gap-2 text-sm p-3 bg-amber-50 text-amber-700 rounded-md mb-4">
        <AlertCircle class="h-5 w-5 flex-shrink-0" />
        <p>{{ t('comments.loginRequired') }} <RouterLink to="/login" class="font-medium underline">{{ t('comments.loginLink') }}</RouterLink></p>
      </div>

      <!-- Error message -->
      <div v-if="error" class="p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2 mb-4">
        <AlertCircle class="h-5 w-5" />
        <span>{{ error }}</span>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label for="comment-content" class="block text-sm font-medium mb-2">{{ t('comments.form.content') }}</label>
            <textarea
                id="comment-content"
                v-model="content"
                :placeholder="t('comments.form.placeholder')"
                rows="4"
                class="w-full rounded-md border border-input px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="!isAuthenticated || isSubmitting"
            ></textarea>
          </div>
        </div>
      </form>
    </CardContent>

    <CardFooter>
      <Button
          @click="handleSubmit"
          :disabled="!isValid || !isAuthenticated || isSubmitting"
          class="ml-auto"
      >
        <template v-if="isSubmitting">
          <Spinner color="text-white" size="sm" :mr="true" />
          {{ t('comments.form.submitting') }}
        </template>
        <template v-else>
          {{ t('comments.form.submit') }}
        </template>
      </Button>
    </CardFooter>
  </Card>
</template>
