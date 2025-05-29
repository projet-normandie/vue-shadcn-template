// src/components/ui/editor/QuillImageHandler.ts
import toastService from '@/services/toast.service'

/**
 * Custom image handler for Quill editor
 * Handles image uploads and insertions
 */

export interface ImageUploadOptions {
    maxSize?: number // in bytes
    allowedTypes?: string[]
    uploadUrl?: string
    onUpload?: (file: File) => Promise<string>
}

export class QuillImageHandler {
    private quill: any
    private options: ImageUploadOptions

    constructor(quill: any, options: ImageUploadOptions = {}) {
        this.quill = quill
        this.options = {
            maxSize: 2 * 1024 * 1024, // 2MB default
            allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
            ...options
        }

        this.setupImageHandler()
    }

    /**
     * Setup the image handler for the toolbar
     */
    private setupImageHandler() {
        const toolbar = this.quill.getModule('toolbar')
        if (toolbar) {
            toolbar.addHandler('image', this.handleImageClick.bind(this))
        }
    }

    /**
     * Handle image button click
     */
    private handleImageClick() {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', this.options.allowedTypes?.join(',') || 'image/*')
        input.style.display = 'none'

        input.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement
            const file = target.files?.[0]

            if (file) {
                this.handleImageUpload(file)
            }
        })

        document.body.appendChild(input)
        input.click()
        document.body.removeChild(input)
    }

    /**
     * Handle image file upload
     */
    private async handleImageUpload(file: File) {
        try {
            // Validate file
            if (!this.validateFile(file)) {
                return
            }

            // Show loading state
            const range = this.quill.getSelection(true)
            this.quill.insertText(range.index, 'Uploading image...', { italic: true })
            this.quill.setSelection(range.index + 'Uploading image...'.length)

            let imageUrl: string

            if (this.options.onUpload) {
                // Use custom upload handler
                imageUrl = await this.options.onUpload(file)
            } else if (this.options.uploadUrl) {
                // Use upload URL
                imageUrl = await this.uploadToServer(file)
            } else {
                // Convert to base64 as fallback
                imageUrl = await this.convertToBase64(file)
            }

            // Remove loading text
            this.quill.deleteText(range.index, 'Uploading image...'.length)

            // Insert image
            this.quill.insertEmbed(range.index, 'image', imageUrl)
            this.quill.setSelection(range.index + 1)

            toastService.success('Success', 'Image uploaded successfully')

        } catch (error) {
            console.error('Image upload failed:', error)

            // Remove loading text if it exists
            const text = this.quill.getText()
            if (text.includes('Uploading image...')) {
                const index = text.indexOf('Uploading image...')
                this.quill.deleteText(index, 'Uploading image...'.length)
            }

            toastService.error('Upload Error', 'Failed to upload image')
        }
    }

    /**
     * Validate uploaded file
     */
    private validateFile(file: File): boolean {
        // Check file type
        if (this.options.allowedTypes && !this.options.allowedTypes.includes(file.type)) {
            toastService.error(
                'Invalid File Type',
                `Please upload one of: ${this.options.allowedTypes.join(', ')}`
            )
            return false
        }

        // Check file size
        if (this.options.maxSize && file.size > this.options.maxSize) {
            const maxSizeMB = (this.options.maxSize / (1024 * 1024)).toFixed(1)
            toastService.error(
                'File Too Large',
                `Maximum file size is ${maxSizeMB}MB`
            )
            return false
        }

        return true
    }

    /**
     * Upload file to server
     */
    private async uploadToServer(file: File): Promise<string> {
        const formData = new FormData()
        formData.append('image', file)

        const response = await fetch(this.options.uploadUrl!, {
            method: 'POST',
            body: formData,
            headers: {
                // Add authorization header if needed
                // 'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`)
        }

        const data = await response.json()
        return data.url || data.imageUrl || data.src
    }

    /**
     * Convert file to base64 (fallback method)
     */
    private convertToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = () => {
                resolve(reader.result as string)
            }

            reader.onerror = () => {
                reject(new Error('Failed to convert image to base64'))
            }

            reader.readAsDataURL(file)
        })
    }

    /**
     * Insert image from URL
     */
    public insertImageFromUrl(url: string) {
        const range = this.quill.getSelection(true)
        this.quill.insertEmbed(range.index, 'image', url)
        this.quill.setSelection(range.index + 1)
    }

    /**
     * Get all images in the editor
     */
    public getImages(): Array<{ url: string; index: number }> {
        const delta = this.quill.getContents()
        const images: Array<{ url: string; index: number }> = []
        let index = 0

        delta.ops.forEach((op: any) => {
            if (op.insert && typeof op.insert === 'object' && op.insert.image) {
                images.push({
                    url: op.insert.image,
                    index
                })
            }

            if (op.insert && typeof op.insert === 'string') {
                index += op.insert.length
            } else {
                index += 1
            }
        })

        return images
    }
}

/**
 * Factory function to create image handler
 */
export function createImageHandler(options: ImageUploadOptions = {}) {
    return (quill: any) => new QuillImageHandler(quill, options)
}
