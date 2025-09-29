// src/components/ui/editor/QuillEditor.vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { cn } from '@/core/lib/utils.ts'
import type { HTMLAttributes } from 'vue'

// Import Quill dynamically to avoid SSR issues
let QuillModule: any = null

// Quill types
interface QuillOptions {
    theme?: string
    modules?: {
        toolbar?: string | Array<any> | boolean
        [key: string]: any
    }
    formats?: string[]
    readOnly?: boolean
    placeholder?: string
}

interface QuillInstance {
    root: HTMLElement
    getContents(): any
    getText(): string
    getHTML(): string
    setContents(delta: any): void
    setText(text: string): void
    insertText(index: number, text: string, formats?: any): void
    deleteText(index: number, length: number): void
    formatText(index: number, length: number, formats: any): void
    getSelection(): { index: number; length: number } | null
    setSelection(index: number, length?: number): void
    focus(): void
    blur(): void
    enable(enabled?: boolean): void
    disable(): void
    on(eventName: string, handler: Function): void
    off(eventName: string, handler?: Function): void
}

// Props interface
interface QuillEditorProps {
    modelValue?: string
    placeholder?: string
    readOnly?: boolean
    theme?: 'snow' | 'bubble'
    toolbar?: string | Array<any> | boolean
    formats?: string[]
    class?: HTMLAttributes['class']
    height?: string
    modules?: Record<string, any>
}

// Define props
const props = withDefaults(defineProps<QuillEditorProps>(), {
    modelValue: '',
    placeholder: 'Write something...',
    readOnly: false,
    theme: 'snow',
    toolbar: true,
    height: '200px'
})

// Define emits
const emit = defineEmits<{
    'update:modelValue': [value: string]
    'textChange': [delta: any, oldDelta: any, source: string]
    'selectionChange': [range: any, oldRange: any, source: string]
    'editorReady': [editor: QuillInstance]
    'focus': [editor: QuillInstance]
    'blur': [editor: QuillInstance]
}>()

// Reactive references
const editorContainer = ref<HTMLElement>()
const quillInstance = ref<QuillInstance | null>(null)
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
 * Default toolbar configuration
 */
const getDefaultToolbar = () => {
    if (props.toolbar === false) return false
    if (props.toolbar === true || !props.toolbar) {
        return [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image']
        ]
    }
    return props.toolbar
}

/**
 * Default formats
 */
const getDefaultFormats = () => {
    return props.formats || [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent',
        'link', 'image',
        'color', 'background',
        'align', 'script',
        'code-block'
    ]
}

/**
 * Initialize Quill editor
 */
const initializeQuill = async () => {
    if (!editorContainer.value) return

    try {
        // Load Quill dynamically
        const Quill = await loadQuill()

        // Create Quill options
        const options: QuillOptions = {
            theme: props.theme,
            readOnly: props.readOnly,
            placeholder: props.placeholder,
            formats: getDefaultFormats(),
            modules: {
                toolbar: getDefaultToolbar(),
                ...props.modules
            }
        }

        // Initialize Quill
        quillInstance.value = new Quill(editorContainer.value, options) as QuillInstance

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
        console.error('Failed to initialize Quill editor:', error)
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
 * Public methods accessible via template ref
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

// Expose methods
defineExpose({
    focus,
    blur,
    getEditor,
    getText,
    getHTML,
    setContent
})

// Lifecycle hooks
onMounted(async () => {
    await nextTick()
    await initializeQuill()
})

onBeforeUnmount(() => {
    if (quillInstance.value) {
        // Clean up events
        quillInstance.value.off('text-change')
        quillInstance.value.off('selection-change')
    }
})
</script>

<template>
    <div class="quill-editor-wrapper">
        <!-- Loading state -->
        <div
            v-if="loading"
            class="flex items-center justify-center border border-input rounded-md bg-background"
            :style="{ height: props.height }"
        >
            <div class="text-sm text-muted-foreground">Loading editor...</div>
        </div>

        <!-- Editor container -->
        <div
            ref="editorContainer"
            :class="cn(
        'quill-editor border border-input rounded-md bg-background focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] transition-[color,box-shadow]',
        props.readOnly && 'opacity-60 cursor-not-allowed',
        props.class
      )"
            :style="{ minHeight: props.height }"
            v-show="!loading"
        />
    </div>
</template>

<style>
/* Quill editor custom styles */
.quill-editor .ql-toolbar {
    border: none;
    border-bottom: 1px solid hsl(var(--border));
    padding: 0.5rem;
}

.quill-editor .ql-container {
    border: none;
    font-family: inherit;
}

.quill-editor .ql-editor {
    padding: 0.75rem;
    min-height: 120px;
    font-size: 0.875rem;
    line-height: 1.5;
}

.quill-editor .ql-editor.ql-blank::before {
    color: hsl(var(--muted-foreground));
    font-style: normal;
}

/* Dark mode support */
.dark .quill-editor .ql-toolbar {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
}

.dark .quill-editor .ql-stroke {
    stroke: hsl(var(--foreground));
}

.dark .quill-editor .ql-fill {
    fill: hsl(var(--foreground));
}

.dark .quill-editor .ql-picker-label {
    color: hsl(var(--foreground));
}

/* Focus styles */
.quill-editor:focus-within {
    outline: none;
}

/* Custom scrollbar for editor */
.quill-editor .ql-editor::-webkit-scrollbar {
    width: 6px;
}

.quill-editor .ql-editor::-webkit-scrollbar-track {
    background: hsl(var(--muted));
    border-radius: 3px;
}

.quill-editor .ql-editor::-webkit-scrollbar-thumb {
    background: hsl(var(--muted-foreground));
    border-radius: 3px;
}

.quill-editor .ql-editor::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--foreground));
}
</style>
