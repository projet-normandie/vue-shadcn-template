// src/components/ui/editor/index.ts
export { default as QuillEditor } from './QuillEditor.vue'
export { default as AdvancedQuillEditor } from './AdvancedQuillEditor.vue'
export { QuillImageHandler, createImageHandler } from './QuillImageHandler.ts'

// Export types for external use
export interface QuillEditorInstance {
    focus(): void
    blur(): void
    getEditor(): any
    getText(): string
    getHTML(): string
    setContent(content: string): void
}

export interface AdvancedQuillEditorInstance extends QuillEditorInstance {
    insertImageFromUrl(url: string): void
    getImages(): Array<{ url: string; index: number }>
}

export interface QuillEditorProps {
    modelValue?: string
    placeholder?: string
    readOnly?: boolean
    theme?: 'snow' | 'bubble'
    toolbar?: string | Array<any> | boolean
    formats?: string[]
    class?: string
    height?: string
    modules?: Record<string, any>
}

export interface ImageUploadOptions {
    maxSize?: number // in bytes
    allowedTypes?: string[]
    uploadUrl?: string
    onUpload?: (file: File) => Promise<string>
}

// Predefined toolbar configurations
export const toolbarConfigs = {
    minimal: [
        ['bold', 'italic'],
        ['link']
    ],

    basic: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link'],
        ['clean']
    ],

    standard: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': [1, 2, 3, false] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
    ],

    full: [
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
        ['link', 'image', 'video']
    ]
}

// Helper functions
export const createQuillEditor = async (container: HTMLElement, options: any) => {
    // Dynamic import for programmatic editor creation
    const { default: Quill } = await import('quill')
    return new Quill(container, options)
}
