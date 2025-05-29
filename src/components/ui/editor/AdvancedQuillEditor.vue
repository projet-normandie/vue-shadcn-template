// src/components/ui/editor/AdvancedQuillEditor.vue
<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { cn } from '@/lib/utils'
import { QuillImageHandler, type ImageUploadOptions } from './QuillImageHandler'
import type { HTMLAttributes } from 'vue'

// Import Quill dynamically to avoid issues
let QuillModule: any = null

/**
 * Advanced Quill Editor with image upload capabilities
 * and custom modules support
 */

// Props interface
interface AdvancedQuillEditorProps {
    modelValue?: string
    placeholder?: string
    readOnly?: boolean
    theme?: 'snow' | 'bubble'
    toolbar?: string | Array<any> | boolean
    formats?: string[]
    class?: HTMLAttributes['class']
    height?: string
    imageUpload?: ImageUploadOptions
    modules?: Record<string, any>
}

// Define props
const props = withDefaults(defineProps<AdvancedQuillEditorProps>(), {
    modelValue: '',
    placeholder: 'Write something amazing...',
    readOnly: false,
    theme: 'snow',
    toolbar: true,
    height: '300px'
})

// Define emits
const emit = defineEmits<{
    'update:modelValue': [value: string]
    'textChange': [delta: any, oldDelta: any, source: string]
    'selectionChange': [range: any, oldRange: any, source: string]
    'editorReady': [editor: any]
    'focus': [editor: any]
    'blur': [editor: any]
    'imageUploaded': [url: string, file?: File]
    'imageUploadError': [error: Error, file?: File]
}>()

// Reactive references
const editorContainer = ref<HTMLElement>()
const quillInstance = ref<any>(null)
const imageHandler = ref<QuillImageHandler | null>(null)
const isReady = ref(false)
const loading = ref(true)

/**
 * Load Quill dynamically
 */
const loadQuill = async () => {
    if (QuillModule) return QuillModule

    try {
        // Import Quill and CSS dynamically
        const [quillModule] = await Promise.all([
            import('quill'),
            import('quill/dist/quill.snow.css'),
            import('quill/dist/quill.bubble.css')
        ])

        QuillModule = quillModule.default || quillModule
        return QuillModule
    } catch (error) {
        console.error('Failed to load Quill:', error)
        throw error
    }
}

/**
 * Enhanced toolbar with image upload
 */
const getEnhancedToolbar = () => {
    if (props.toolbar === false) return false
    if (props.toolbar === true || !props.toolbar) {
        return [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': [1, 2, 3, false] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ]
    }
    return props.toolbar
}

/**
 * Enhanced formats including video
 */
const getEnhancedFormats = () => {
    return props.formats || [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent',
        'link', 'image', 'video',
        'color', 'background',
        'align', 'script',
        'code-block'
    ]
}

/**
 * Custom image upload handler
 */
const handleImageUpload = async (file: File): Promise<string> => {
    try {
        emit('imageUploaded', '', file)

        // If props.imageUpload has an onUpload function, use it
        if (props.imageUpload?.onUpload) {
            return await props.imageUpload.onUpload(file)
        }

        // Otherwise, convert to base64 as fallback
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = () => reject(new Error('Failed to read file'))
            reader.readAsDataURL(file)
        })

    } catch (error) {
        emit('imageUploadError', error as Error, file)
        throw error
    }
}

/**
 * Initialize Quill editor with advanced features
 */
const initializeQuill = async () => {
    if (!editorContainer.value) return

    try {
        // Load Quill dynamically
        const Quill = await loadQuill()

        // Prepare modules
        const modules = {
            toolbar: getEnhancedToolbar(),
            ...props.modules
        }

        // Create Quill options
        const options = {
            theme: props.theme,
            readOnly: props.readOnly,
            placeholder: props.placeholder,
            formats: getEnhancedFormats(),
            modules
        }

        // Initialize Quill
        quillInstance.value = new Quill(editorContainer.value, options)

        // Setup image handler if image upload is enabled
        if (props.imageUpload || getEnhancedToolbar() !== false) {
            imageHandler.value = new QuillImageHandler(quillInstance.value, {
                ...props.imageUpload,
                onUpload: handleImageUpload
            })
        }

        // Set initial content
        if (props.modelValue) {
            quillInstance.value.root.innerHTML = props.modelValue
        }

        // Setup event listeners
        setupEventListeners()

        // Mark as ready
        isReady.value = true
        loading.value = false

        // Emit ready event
        emit('editorReady', quillInstance.value)

    } catch (error) {
        console.error('Failed to initialize Advanced Quill editor:', error)
        loading.value = false
    }
}

/**
 * Setup Quill event listeners
 */
const setupEventListeners = () => {
    if (!quillInstance.value) return

    // Text change event
    const handleTextChange = (delta: any, oldDelta: any, source: string) => {
        const html = quillInstance.value?.root.innerHTML || ''
        emit('update:modelValue', html)
        emit('textChange', delta, oldDelta, source)
    }

    // Selection change event
    const handleSelectionChange = (range: any, oldRange: any, source: string) => {
        emit('selectionChange', range, oldRange, source)

        if (range) {
            emit('focus', quillInstance.value!)
        } else {
            emit('blur', quillInstance.value!)
        }
    }

    // Bind events
    quillInstance.value.on('text-change', handleTextChange)
    quillInstance.value.on('selection-change', handleSelectionChange)
}

/**
 * Watch for modelValue changes
 */
watch(() => props.modelValue, (newValue) => {
    if (!quillInstance.value || !isReady.value) return

    const currentHTML = quillInstance.value.root.innerHTML
    if (newValue !== currentHTML) {
        quillInstance.value.root.innerHTML = newValue || ''
    }
})

/**
 * Watch for readOnly changes
 */
watch(() => props.readOnly, (newValue) => {
    if (!quillInstance.value || !isReady.value) return
    quillInstance.value.enable(!newValue)
})

/**
 * Public methods
 */
const focus = () => {
    quillInstance.value?.focus()
}

const blur = () => {
    quillInstance.value?.blur()
}

const getEditor = () => {
    return quillInstance.value
}

const getText = () => {
    return quillInstance.value?.getText() || ''
}

const getHTML = () => {
    return quillInstance.value?.root.innerHTML || ''
}

const setContent = (content: string) => {
    if (quillInstance.value) {
        quillInstance.value.root.innerHTML = content
    }
}

const insertImageFromUrl = (url: string) => {
    imageHandler.value?.insertImageFromUrl(url)
}

const getImages = () => {
    return imageHandler.value?.getImages() || []
}

// Expose methods
defineExpose({
    focus,
    blur,
    getEditor,
    getText,
    getHTML,
    setContent,
    insertImageFromUrl,
    getImages
})

// Lifecycle
onMounted(async () => {
    await nextTick()
    await initializeQuill()
})
</script>

<template>
    <div class="advanced-quill-editor-wrapper">
        <!-- Loading state -->
        <div
            v-if="loading"
            class="flex items-center justify-center border border-input rounded-md bg-background"
            :style="{ height: props.height }"
        >
            <div class="text-sm text-muted-foreground">Loading advanced editor...</div>
        </div>

        <!-- Editor container -->
        <div
            ref="editorContainer"
            :class="cn(
        'advanced-quill-editor border border-input rounded-md bg-background focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] transition-[color,box-shadow]',
        props.readOnly && 'opacity-60 cursor-not-allowed',
        props.class
      )"
            :style="{ minHeight: props.height }"
            v-show="!loading"
        />
    </div>
</template>

<style>
/* Advanced editor styles */
.advanced-quill-editor .ql-toolbar {
    border: none;
    border-bottom: 1px solid hsl(var(--border));
    padding: 0.5rem;
    background-color: hsl(var(--background));
}

.advanced-quill-editor .ql-container {
    border: none;
    font-family: inherit;
}

.advanced-quill-editor .ql-editor {
    padding: 0.75rem;
    min-height: 150px;
    font-size: 0.875rem;
    line-height: 1.6;
}

.advanced-quill-editor .ql-editor.ql-blank::before {
    color: hsl(var(--muted-foreground));
    font-style: normal;
}

/* Image styling */
.advanced-quill-editor .ql-editor img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 0.5rem 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.advanced-quill-editor .ql-editor img:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease;
}

/* Video styling */
.advanced-quill-editor .ql-editor .ql-video {
    width: 100%;
    height: 400px;
    border-radius: 0.5rem;
    margin: 0.5rem 0;
}

/* Dark mode support */
.dark .advanced-quill-editor .ql-toolbar {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    border-bottom-color: hsl(var(--border));
}

.dark .advanced-quill-editor .ql-stroke {
    stroke: hsl(var(--foreground));
}

.dark .advanced-quill-editor .ql-fill {
    fill: hsl(var(--foreground));
}

.dark .advanced-quill-editor .ql-picker-label {
    color: hsl(var(--foreground));
}

.dark .advanced-quill-editor .ql-picker-options {
    background-color: hsl(var(--background));
    border-color: hsl(var(--border));
}

/* Toolbar button hover effects */
.advanced-quill-editor .ql-toolbar button:hover {
    background-color: hsl(var(--accent));
    border-radius: 0.25rem;
}

.advanced-quill-editor .ql-toolbar button.ql-active {
    background-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
    border-radius: 0.25rem;
}

/* Focus styles */
.advanced-quill-editor:focus-within {
    outline: none;
}

/* Scrollbar styling */
.advanced-quill-editor .ql-editor::-webkit-scrollbar {
    width: 8px;
}

.advanced-quill-editor .ql-editor::-webkit-scrollbar-track {
    background: hsl(var(--muted));
    border-radius: 4px;
}

.advanced-quill-editor .ql-editor::-webkit-scrollbar-thumb {
    background: hsl(var(--muted-foreground));
    border-radius: 4px;
}

.advanced-quill-editor .ql-editor::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--foreground));
}
</style>
