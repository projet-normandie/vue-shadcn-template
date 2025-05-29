// src/views/EditorTest.vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
    QuillEditor,
    AdvancedQuillEditor,
    toolbarConfigs,
    type QuillEditorInstance,
    type AdvancedQuillEditorInstance
} from '@/components/ui/editor'
import {
    FileText,
    Image as ImageIcon,
    Code,
    Eye,
    Trash2,
    Copy,
    Download,
    Settings,
    TestTube,
    Lightbulb
} from 'lucide-vue-next'
import toastService from '@/services/toast.service'
import { Quill } from 'quill'
import { DeltaOperation } from 'quill'

/**
 * Complete test page for Quill editor components
 * Tests all features and configurations
 */

// Test content samples
const sampleContent = {
    empty: '',
    basic: '<p>Hello World! This is a <strong>basic</strong> test with <em>formatting</em>.</p>',
    rich: `
    <h2>Rich Content Example</h2>
    <p>This is a paragraph with <strong>bold text</strong>, <em>italic text</em>, and <u>underlined text</u>.</p>
    <blockquote>This is a blockquote with some important information.</blockquote>
    <ul>
      <li>First item in unordered list</li>
      <li>Second item with <a href="#">a link</a></li>
      <li>Third item</li>
    </ul>
    <ol>
      <li>First ordered item</li>
      <li>Second ordered item</li>
    </ol>
    <p><code>Code snippet example</code> and normal text.</p>
  `,
    blog: `
    <h1>Welcome to My Blog</h1>
    <p>This is an example blog post with various formatting options.</p>
    <h2>Introduction</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <h3>Key Points</h3>
    <ul>
      <li><strong>Performance:</strong> Fast and responsive</li>
      <li><strong>Usability:</strong> Easy to use interface</li>
      <li><strong>Features:</strong> Rich text editing capabilities</li>
    </ul>
    <blockquote>
      "The best way to predict the future is to create it." - Peter Drucker
    </blockquote>
    <p>Visit our <a href="https://example.com">website</a> for more information.</p>
  `
}

// Editor states
const basicEditor = ref<QuillEditorInstance>()
const advancedEditor = ref<AdvancedQuillEditorInstance>()

// Content for different editors
const contents = reactive({
    basic: sampleContent.basic,
    advanced: sampleContent.rich,
    readonly: sampleContent.blog,
    custom: ''
})

// Configuration states
const configs = reactive({
    theme: 'snow' as 'snow' | 'bubble',
    readOnly: false,
    showToolbar: true,
    customHeight: '300px',
    toolbarType: 'standard' as keyof typeof toolbarConfigs
})

// Statistics
const stats = reactive({
    wordCount: 0,
    charCount: 0,
    readingTime: 0
})

// Image upload configuration
const imageUploadConfig = {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    onUpload: async (file: File): Promise<string> => {
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Convert to base64 for demo (in real app, upload to server)
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                toastService.success('Image uploaded', `${file.name} uploaded successfully`)
                resolve(reader.result as string)
            }
            reader.onerror = () => reject(new Error('Failed to process image'))
            reader.readAsDataURL(file)
        })
    }
}

// Available toolbar configurations
const toolbarOptions = [
    { key: 'minimal', label: 'Minimal' },
    { key: 'basic', label: 'Basic' },
    { key: 'standard', label: 'Standard' },
    { key: 'full', label: 'Full' }
]

// Custom toolbar for testing
const customToolbar = [
    ['bold', 'italic', 'underline'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    ['clean']
]

/**
 * Update statistics based on content
 */
const updateStats = (content: string) => {
    // Simple word count (remove HTML tags)
    const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    const words = plainText ? plainText.split(' ').length : 0

    stats.wordCount = words
    stats.charCount = content.length
    stats.readingTime = Math.ceil(words / 200) // 200 WPM average
}

/**
 * Load sample content
 */
const loadSample = (type: keyof typeof sampleContent) => {
    contents.advanced = sampleContent[type]
    updateStats(contents.advanced)
    toastService.info('Content loaded', `${type} sample loaded`)
}

/**
 * Clear all content
 */
const clearAllContent = () => {
    Object.keys(contents).forEach(key => {
        contents[key as keyof typeof contents] = ''
    })
    updateStats('')
    toastService.info('Content cleared', 'All editors cleared')
}

/**
 * Copy content to clipboard
 */
const copyContent = async (content: string) => {
    try {
        await navigator.clipboard.writeText(content)
        toastService.success('Copied', 'Content copied to clipboard')
    } catch {
        toastService.error('Copy failed', 'Could not copy to clipboard')
    }
}

/**
 * Download content as HTML file
 */
const downloadHTML = (content: string, filename: string = 'editor-content.html') => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editor Content</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        blockquote { border-left: 4px solid #ccc; margin: 1em 0; padding-left: 1em; color: #666; }
        code { background: #f5f5f5; padding: 2px 4px; border-radius: 3px; }
    </style>
</head>
<body>
    ${content}
</body>
</html>`

    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toastService.success('Downloaded', 'HTML file downloaded')
}

/**
 * Focus specific editor
 */
const focusEditor = (editorType: 'basic' | 'advanced') => {
    if (editorType === 'basic') {
        basicEditor.value?.focus()
    } else {
        advancedEditor.value?.focus()
    }
}

/**
 * Insert sample image URL
 */
const insertSampleImage = () => {
    const sampleImageUrl = 'https://picsum.photos/400/300?random=' + Date.now()
    advancedEditor.value?.insertImageFromUrl(sampleImageUrl)
    toastService.info('Image inserted', 'Sample image added to advanced editor')
}

/**
 * Get images from advanced editor
 */
const getEditorImages = () => {
    const images = advancedEditor.value?.getImages() || []
    if (images.length > 0) {
        toastService.info('Images found', `Found ${images.length} images in content`)
        console.log('Editor images:', images)
    } else {
        toastService.info('No images', 'No images found in content')
    }
}

/**
 * Handle editor events
 */
const handleEditorReady = (editor: Quill, type: string) => {
    console.log(`${type} editor ready:`, editor)
    toastService.success('Editor ready', `${type} editor initialized`)
}

const handleTextChange = (delta: DeltaOperation[], source: string, type: string) => {
    console.log(`${type} text change:`, { delta, source })
}

const handleImageUploaded = (url: string, file?: File) => {
    console.log('Image uploaded:', url, file?.name)
    updateStats(contents.advanced)
}

const handleImageUploadError = (error: Error, file?: File) => {
    console.error('Image upload error:', error, file?.name)
    toastService.error('Upload failed', error.message)
}

// Initialize stats
updateStats(contents.advanced)
</script>

<template>
    <div class="container mx-auto max-w-7xl px-4 py-8 space-y-8">
        <!-- Header -->
        <div class="text-center space-y-4">
            <div class="flex justify-center">
                <div class="bg-primary/10 rounded-full p-3">
                    <TestTube class="h-8 w-8 text-primary" />
                </div>
            </div>
            <h1 class="text-4xl font-bold">Quill Editor Test Page</h1>
            <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
                Complete testing environment for both basic and advanced Quill editor components
            </p>
        </div>

        <!-- Quick Actions -->
        <Card>
            <CardHeader>
                <CardTitle class="flex items-center gap-2">
                    <Settings class="h-5 w-5" />
                    Quick Actions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div class="flex flex-wrap gap-3">
                    <Button @click="loadSample('basic')" variant="outline" size="sm">
                        <FileText class="h-4 w-4 mr-2" />
                        Load Basic Sample
                    </Button>
                    <Button @click="loadSample('rich')" variant="outline" size="sm">
                        <FileText class="h-4 w-4 mr-2" />
                        Load Rich Sample
                    </Button>
                    <Button @click="loadSample('blog')" variant="outline" size="sm">
                        <FileText class="h-4 w-4 mr-2" />
                        Load Blog Sample
                    </Button>
                    <Button @click="insertSampleImage" variant="outline" size="sm">
                        <ImageIcon class="h-4 w-4 mr-2" />
                        Insert Sample Image
                    </Button>
                    <Button @click="getEditorImages" variant="outline" size="sm">
                        <Eye class="h-4 w-4 mr-2" />
                        Get Images
                    </Button>
                    <Button @click="clearAllContent" variant="destructive" size="sm">
                        <Trash2 class="h-4 w-4 mr-2" />
                        Clear All
                    </Button>
                </div>
            </CardContent>
        </Card>

        <!-- Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
                <CardContent class="pt-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-muted-foreground">Words</p>
                            <p class="text-2xl font-bold">{{ stats.wordCount }}</p>
                        </div>
                        <FileText class="h-8 w-8 text-muted-foreground" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent class="pt-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-muted-foreground">Characters</p>
                            <p class="text-2xl font-bold">{{ stats.charCount }}</p>
                        </div>
                        <Code class="h-8 w-8 text-muted-foreground" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent class="pt-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-muted-foreground">Reading Time</p>
                            <p class="text-2xl font-bold">{{ stats.readingTime }}m</p>
                        </div>
                        <Eye class="h-8 w-8 text-muted-foreground" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent class="pt-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-muted-foreground">Images</p>
                            <p class="text-2xl font-bold">{{ advancedEditor?.getImages()?.length || 0 }}</p>
                        </div>
                        <ImageIcon class="h-8 w-8 text-muted-foreground" />
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Configuration Panel -->
        <Card>
            <CardHeader>
                <CardTitle class="flex items-center gap-2">
                    <Settings class="h-5 w-5" />
                    Configuration
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Theme Selection -->
                    <div class="space-y-2">
                        <Label>Theme</Label>
                        <div class="flex gap-2">
                            <Button
                                :variant="configs.theme === 'snow' ? 'default' : 'outline'"
                                size="sm"
                                @click="configs.theme = 'snow'"
                            >
                                Snow
                            </Button>
                            <Button
                                :variant="configs.theme === 'bubble' ? 'default' : 'outline'"
                                size="sm"
                                @click="configs.theme = 'bubble'"
                            >
                                Bubble
                            </Button>
                        </div>
                    </div>

                    <!-- Toolbar Selection -->
                    <div class="space-y-2">
                        <Label>Toolbar</Label>
                        <select
                            v-model="configs.toolbarType"
                            class="w-full rounded-md border border-input px-3 py-2 text-sm"
                        >
                            <option v-for="option in toolbarOptions" :key="option.key" :value="option.key">
                                {{ option.label }}
                            </option>
                        </select>
                    </div>

                    <!-- Height Configuration -->
                    <div class="space-y-2">
                        <Label>Height</Label>
                        <Input
                            v-model="configs.customHeight"
                            placeholder="300px"
                            class="text-sm"
                        />
                    </div>

                    <!-- Toggle Options -->
                    <div class="space-y-4">
                        <div class="flex items-center space-x-2">
                            <Switch
                                id="readonly"
                                v-model:checked="configs.readOnly"
                            />
                            <Label for="readonly">Read Only</Label>
                        </div>

                        <div class="flex items-center space-x-2">
                            <Switch
                                id="toolbar"
                                v-model:checked="configs.showToolbar"
                            />
                            <Label for="toolbar">Show Toolbar</Label>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Editors Testing -->
        <Tabs default-value="basic" class="w-full">
            <TabsList class="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Editor</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Editor</TabsTrigger>
                <TabsTrigger value="readonly">Read-Only</TabsTrigger>
                <TabsTrigger value="custom">Custom Config</TabsTrigger>
            </TabsList>

            <!-- Basic Editor -->
            <TabsContent value="basic" class="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center justify-between">
                            <span>Basic Quill Editor</span>
                            <div class="flex gap-2">
                                <Button size="sm" variant="outline" @click="focusEditor('basic')">
                                    Focus
                                </Button>
                                <Button size="sm" variant="outline" @click="copyContent(contents.basic)">
                                    <Copy class="h-4 w-4 mr-2" />
                                    Copy
                                </Button>
                            </div>
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <QuillEditor
                            ref="basicEditor"
                            v-model="contents.basic"
                            placeholder="Type something in the basic editor..."
                            :theme="configs.theme"
                            :toolbar="configs.showToolbar ? toolbarConfigs.basic : false"
                            :read-only="configs.readOnly"
                            :height="configs.customHeight"
                            @editor-ready="(editor) => handleEditorReady(editor, 'Basic')"
                            @text-change="(delta, oldDelta, source) => handleTextChange(delta, oldDelta, source, 'Basic')"
                            @focus="() => toastService.info('Editor focused', 'Basic editor focused')"
                            @blur="() => toastService.info('Editor blurred', 'Basic editor blurred')"
                        />
                    </CardContent>
                </Card>

                <!-- Basic Editor Output -->
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Editor Output</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="space-y-4">
                            <div>
                                <Label class="text-sm font-medium">HTML Content:</Label>
                                <pre class="mt-2 p-3 bg-muted rounded-md text-xs overflow-auto max-h-32">{{ contents.basic || '(empty)' }}</pre>
                            </div>
                            <div>
                                <Label class="text-sm font-medium">Plain Text:</Label>
                                <p class="mt-2 p-3 bg-muted rounded-md text-sm">
                                    {{ basicEditor?.getText() || '(empty)' }}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <!-- Advanced Editor -->
            <TabsContent value="advanced" class="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center justify-between">
                            <span>Advanced Quill Editor</span>
                            <div class="flex gap-2">
                                <Button size="sm" variant="outline" @click="focusEditor('advanced')">
                                    Focus
                                </Button>
                                <Button size="sm" variant="outline" @click="copyContent(contents.advanced)">
                                    <Copy class="h-4 w-4 mr-2" />
                                    Copy
                                </Button>
                                <Button size="sm" variant="outline" @click="downloadHTML(contents.advanced)">
                                    <Download class="h-4 w-4 mr-2" />
                                    Download
                                </Button>
                            </div>
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <AdvancedQuillEditor
                            ref="advancedEditor"
                            v-model="contents.advanced"
                            placeholder="Type something in the advanced editor... You can also drag & drop images!"
                            :theme="configs.theme"
                            :toolbar="configs.showToolbar ? toolbarConfigs[configs.toolbarType] : false"
                            :read-only="configs.readOnly"
                            :height="configs.customHeight"
                            :image-upload="imageUploadConfig"
                            @editor-ready="(editor) => handleEditorReady(editor, 'Advanced')"
                            @text-change="(delta, oldDelta, source) => handleTextChange(delta, oldDelta, source, 'Advanced')"
                            @update:modelValue="updateStats"
                            @image-uploaded="handleImageUploaded"
                            @image-upload-error="handleImageUploadError"
                            @focus="() => toastService.info('Editor focused', 'Advanced editor focused')"
                            @blur="() => toastService.info('Editor blurred', 'Advanced editor blurred')"
                        />
                    </CardContent>
                </Card>

                <!-- Advanced Editor Output -->
                <Card>
                    <CardHeader>
                        <CardTitle>Advanced Editor Output</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="space-y-4">
                            <div>
                                <Label class="text-sm font-medium">HTML Content:</Label>
                                <pre class="mt-2 p-3 bg-muted rounded-md text-xs overflow-auto max-h-32">{{ contents.advanced || '(empty)' }}</pre>
                            </div>
                            <div>
                                <Label class="text-sm font-medium">Live Preview:</Label>
                                <div
                                    class="mt-2 p-4 border border-input rounded-md prose prose-sm max-w-none dark:prose-invert min-h-[100px]"
                                    v-html="contents.advanced || '<p class=\'text-muted-foreground italic\'>No content to preview</p>'"
                                ></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <!-- Read-Only Editor -->
            <TabsContent value="readonly" class="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Read-Only Editor (Bubble Theme)</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <QuillEditor
                            v-model="contents.readonly"
                            :read-only="true"
                            theme="bubble"
                            :toolbar="false"
                            height="400px"
                        />
                    </CardContent>
                </Card>
            </TabsContent>

            <!-- Custom Configuration -->
            <TabsContent value="custom" class="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Custom Toolbar Configuration</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <QuillEditor
                            v-model="contents.custom"
                            placeholder="Editor with custom toolbar configuration..."
                            :toolbar="customToolbar"
                            :theme="configs.theme"
                            height="350px"
                            @editor-ready="(editor) => handleEditorReady(editor, 'Custom')"
                        />
                    </CardContent>
                </Card>

                <!-- Custom Toolbar Code -->
                <Card>
                    <CardHeader>
                        <CardTitle>Custom Toolbar Configuration Code</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre class="p-4 bg-muted rounded-md text-xs overflow-auto">{{ JSON.stringify(customToolbar, null, 2) }}</pre>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>

        <!-- Help Section -->
        <Card>
            <CardHeader>
                <CardTitle class="flex items-center gap-2">
                    <Lightbulb class="h-5 w-5" />
                    Testing Instructions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-semibold mb-2">Basic Editor Features</h4>
                        <ul class="text-sm text-muted-foreground space-y-1">
                            <li>• Basic text formatting (bold, italic, underline)</li>
                            <li>• Lists (ordered and unordered)</li>
                            <li>• Links and basic cleanup</li>
                            <li>• Focus/blur events</li>
                            <li>• Content synchronization</li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-2">Advanced Editor Features</h4>
                        <ul class="text-sm text-muted-foreground space-y-1">
                            <li>• Image upload with drag & drop</li>
                            <li>• Full toolbar with all formatting options</li>
                            <li>• Image management and statistics</li>
                            <li>• Error handling for uploads</li>
                            <li>• Real-time content metrics</li>
                        </ul>
                    </div>
                </div>

                <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md">
                    <p class="text-sm text-blue-700 dark:text-blue-300">
                        <strong>Tip:</strong> Try uploading images by dragging them directly into the advanced editor,
                        or use the image button in the toolbar. The configuration panel allows you to test different
                        themes and toolbar configurations in real-time.
                    </p>
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<style>
/* Custom prose styles for preview */
.prose {
    color: hsl(var(--foreground));
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
    color: hsl(var(--foreground));
    font-weight: 600;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
}

.prose p {
    margin-bottom: 1em;
    line-height: 1.6;
}

.prose a {
    color: hsl(var(--primary));
    text-decoration: underline;
}

.prose a:hover {
    opacity: 0.8;
}

.prose strong {
    font-weight: 600;
}

.prose em {
    font-style: italic;
}

.prose ul,
.prose ol {
    margin-bottom: 1em;
    padding-left: 1.5em;
}

.prose li {
    margin-bottom: 0.25em;
}

.prose blockquote {
    border-left: 4px solid hsl(var(--border));
    padding-left: 1rem;
    color: hsl(var(--muted-foreground));
    font-style: italic;
    margin: 1em 0;
    background: hsl(var(--muted));
    padding: 1rem;
    border-radius: 0.5rem;
}

.prose code {
    background: hsl(var(--muted));
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
}

.prose pre {
    background: hsl(var(--muted));
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1em 0;
}

.prose img {
    border-radius: 0.5rem;
    max-width: 100%;
    height: auto;
    margin: 1em 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
