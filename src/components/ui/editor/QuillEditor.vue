<!-- src/components/ui/editor/QuillEditor.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'vue'

/**
 * Predefined editor configurations
 */
export type EditorPreset = 'minimal' | 'standard' | 'full'

/**
 * Props for QuillEditor component
 */
interface Props {
  modelValue?: string
  placeholder?: string
  theme?: 'snow' | 'bubble'
  readOnly?: boolean
  preset?: EditorPreset
  class?: HTMLAttributes['class']
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Start typing...',
  theme: 'snow',
  readOnly: false,
  preset: 'minimal'
})

/**
 * Emits
 */
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'ready': [quill: any]
  'change': []
  'focus': [quill: any]
  'blur': [quill: any]
}>()

// État local
const content = ref(props.modelValue)
const quillRef = ref<any>(null)

// Configurations des toolbars selon la doc officielle
const toolbarOptions = {
  minimal: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean']
  ],
  standard: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean']
  ],
  full: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['blockquote', 'code-block'],
    ['clean']
  ]
}

// Formats correspondants (optionnels selon la doc)
const formatOptions = {
  minimal: ['bold', 'italic'],
  comment: ['bold', 'italic', 'underline', 'list', 'link'],
  standard: ['header', 'bold', 'italic', 'underline', 'strike', 'color', 'background', 'list', 'align', 'link', 'image'],
  article: ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'color', 'background', 'list', 'indent', 'align', 'link', 'image', 'video', 'blockquote', 'code-block'],
  full: ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'color', 'background', 'script', 'list', 'indent', 'direction', 'align', 'link', 'image', 'video', 'blockquote', 'code-block'],
  custom: ['bold', 'italic']
}

// Events handlers
const onReady = (quill: any) => {
  console.log('Quill is ready:', quill)
  emit('ready', quill)
}

const onFocus = (event: any) => {
  emit('focus', event.quill)
}

const onBlur = (event: any) => {
  emit('blur', event.quill)
}

// Watch external change
watch(() => props.modelValue, (newValue) => {
  if (content.value !== newValue) {
    content.value = newValue
  }
})

// Watch internal change
watch(() => content.value, (newValue) => {
  emit('update:modelValue', newValue)
})


defineExpose({
  getQuill: () => quillRef.value?.getQuill?.(),
  getHTML: () => content.value,
  getText: () => {
    const quill = quillRef.value?.getQuill?.()
    return quill?.getText?.() || ''
  },
  focus: () => {
    const quill = quillRef.value?.getQuill?.()
    quill?.focus?.()
  },
  setContents: (delta: any) => {
    const quill = quillRef.value?.getQuill?.()
    quill?.setContents?.(delta)
  }
})
</script>

<template>
  <div
      :class="cn('border rounded-md', props.class)"
      :style="{ height: height }"
  >
    <QuillEditor
        ref="quillRef"
        v-model:content="content"
        content-type="html"
        :theme="theme"
        :placeholder="placeholder"
        :read-only="readOnly"
        :toolbar="toolbarOptions[preset]"
        :formats="formatOptions[preset]"
        @ready="onReady"
        @focus="onFocus"
        @blur="onBlur"
    />
  </div>
</template>

<style scoped>
:deep(.ql-container),
:deep(.ql-toolbar) {
  border: none;
}

:deep(.ql-toolbar) {
  border-bottom: 1px solid hsl(var(--border));
}

:deep(.ql-editor) {
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
}

:deep(.ql-editor.ql-blank::before) {
  color: hsl(var(--muted-foreground));
}
</style>
