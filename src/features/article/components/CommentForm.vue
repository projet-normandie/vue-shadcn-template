// src/components/article/CommentForm.vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardFooter } from '@/shared/components/ui/card'
import { QuillEditor } from '@/shared/components/ui/editor'
import { toolbarConfigs } from '@/shared/components/ui/editor'
import { useAuthStore } from '@/features/auth/stores/auth.ts'
import { useI18n } from '@/core/i18n'
import toastService from '@/shared/services/toast.service.ts'
import commentService, { type CommentFormData } from '@/features/article/services/comment.service.ts'
import Spinner from '@/shared/components/ui/Spinner.vue'
import { AlertCircle, MessageSquare } from 'lucide-vue-next'
import type { ApiError } from '@/core/types'

/**
 * Quill Editor Instance Interface
 */
interface QuillEditorInstance {
  getHTML: () => string
  getText: () => string
  focus: () => void
  setContent: (content: string) => void
}

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
const editorRef = ref<QuillEditorInstance | null>(null)

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
  if (!content.value) return false

  // Get plain text from editor to validate actual content length
  const plainText = editorRef.value?.getText()?.trim() || ''
  return plainText.length >= 3
})

/**
 * Get character count for display
 */
const characterCount = computed(() => {
  const plainText = editorRef.value?.getText()?.trim() || ''
  return plainText.length
})

/**
 * Handle editor ready event
 */
const onEditorReady = () => {
  console.log('Comment editor ready')
  // Focus the editor when it's ready if user is authenticated
  if (isAuthenticated.value) {
    setTimeout(() => {
      editorRef.value?.focus()
    }, 100)
  }
}

/**
 * Handle form submission
 */
const handleSubmit = async () => {
  if (!isValid.value || isSubmitting.value) return

  isSubmitting.value = true
  error.value = null

  try {
    const articleIri = props.articleIri

    console.log('Submitting comment with data:', {
      content: content.value.trim(),
      article: articleIri
    })

    const commentData: CommentFormData = {
      content: content.value.trim(),
      article: articleIri
    }

    await commentService.createComment(commentData)

    // Reset form
    content.value = ''

    // Check if editor is available before calling methods
    if (editorRef.value && typeof editorRef.value.setContent === 'function') {
      try {
        editorRef.value.setContent('') // Clear Quill editor content
      } catch (error) {
        console.warn('Error clearing editor after submit:', error)
      }
    }

    // Show success notification
    toastService.success(
        t('comments.success.title'),
        t('comments.success.added')
    )

    // Emit event to parent
    emit('comment-added')
  } catch (err: unknown) {
    console.error('Error submitting comment:', err)

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

/**
 * Clear the editor content
 */
const clearContent = () => {
  content.value = ''

  // Check if editor is available before calling methods
  if (editorRef.value && typeof editorRef.value.setContent === 'function') {
    try {
      editorRef.value.setContent('')
    } catch (error) {
      console.warn('Error clearing editor content:', error)
    }
  }
  error.value = null
}

</script>

<template>
  <Card>
    <CardContent class="pt-6">
      <!-- Header -->
      <div class="flex items-center gap-2 mb-4">
        <MessageSquare class="h-5 w-5 text-primary" />
        <h3 class="font-medium">{{ t('comments.form.title') }}</h3>
      </div>

      <!-- Not logged in message -->
      <div v-if="!isAuthenticated" class="flex items-center gap-2 text-sm p-3 bg-amber-50 text-amber-700 rounded-md mb-4">
        <AlertCircle class="h-5 w-5 flex-shrink-0" />
        <p>{{ t('comments.loginRequired') }} <RouterLink :to="{name: 'Login'}" class="font-medium underline">{{ t('comments.loginLink') }}</RouterLink></p>
      </div>

      <!-- Error message -->
      <div v-if="error" class="p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2 mb-4">
        <AlertCircle class="h-5 w-5" />
        <span>{{ error }}</span>
      </div>

      <!-- Editor Section -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">
            {{ t('comments.form.content') }}
            <span class="text-red-500 ml-1">*</span>
          </label>

          <!-- Character count and validation info -->
          <div class="flex justify-between items-center text-xs text-muted-foreground mb-2">
            <span>{{ t('comments.form.minCharacters') }}</span>
            <span :class="{ 'text-red-500': characterCount > 0 && characterCount < 3 }">
              {{ characterCount }} {{ t('comments.form.characters') }}
            </span>
          </div>

          <!-- Quill Editor with basic toolbar -->
          <QuillEditor
              ref="editorRef"
              v-model="content"
              :placeholder="t('comments.form.placeholder')"
              :toolbar="toolbarConfigs.basic"
              height="200px"
              :read-only="!isAuthenticated"
              @editor-ready="onEditorReady"
              class="w-full"
          />

          <!-- Helper text -->
          <p class="text-xs text-muted-foreground mt-2">
            {{ t('comments.form.helpText') }}
          </p>
        </div>
      </div>
    </CardContent>

    <CardFooter class="flex justify-between items-center">
      <!-- Clear button (only show if there's content) -->
      <Button
          v-if="content && characterCount > 0"
          variant="ghost"
          size="sm"
          @click="clearContent"
          :disabled="isSubmitting"
          class="text-muted-foreground hover:text-foreground"
      >
        {{ t('comments.form.clear') }}
      </Button>
      <div v-else></div>

      <!-- Submit button -->
      <Button
          @click="handleSubmit"
          :disabled="!isValid || !isAuthenticated || isSubmitting"
          class="min-w-[120px]"
      >
        <template v-if="isSubmitting">
          <Spinner color="text-white" size="sm" :mr="true" />
          {{ t('comments.form.submitting') }}
        </template>
        <template v-else>
          <MessageSquare class="h-4 w-4 mr-2" />
          {{ t('comments.form.submit') }}
        </template>
      </Button>
    </CardFooter>
  </Card>
</template>

<style scoped>
/* Custom styles for comment form editor */
:deep(.quill-editor-wrapper) {
  /* Smaller border radius for comment form */
  border-radius: 6px;
}

:deep(.ql-toolbar) {
  /* More compact toolbar for comments */
  padding: 8px;
  border-bottom: 1px solid hsl(var(--border));
}

:deep(.ql-toolbar .ql-formats) {
  margin-right: 12px;
}

:deep(.ql-editor) {
  /* Better spacing for comment editor */
  padding: 12px;
  font-size: 14px;
  line-height: 1.5;
  min-height: 120px;
}

:deep(.ql-editor.ql-blank::before) {
  color: hsl(var(--muted-foreground));
  font-style: normal;
  font-size: 14px;
}

/* Highlight validation state */
.character-count-invalid {
  color: hsl(var(--destructive));
}

/* Focus state for the entire editor wrapper when authenticated */
:deep(.quill-editor-wrapper:focus-within) {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Disabled state styling */
:deep(.quill-editor-wrapper[data-read-only="true"]) {
  opacity: 0.6;
  cursor: not-allowed;
}

:deep(.quill-editor-wrapper[data-read-only="true"] .ql-toolbar) {
  pointer-events: none;
}
</style>
