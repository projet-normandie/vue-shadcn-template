# Quill Editor Integration Guide

This guide shows how to integrate Quill.js directly into your Vue.js project without using the deprecated vue-quill package.

## 📦 Installation

Add Quill to your project:

```bash
npm install quill@^2.0.3
```

The components are already created in `src/components/ui/editor/`.

## 🚀 Quick Start

### Basic Usage

```vue
<template>
  <QuillEditor
    v-model="content"
    placeholder="Start writing..."
    height="300px"
  />
</template>

<script setup>
import { ref } from 'vue'
import { QuillEditor } from '@/components/ui/editor'

const content = ref('<p>Hello World!</p>')
</script>
```

### Advanced Usage with Image Upload

```vue
<template>
  <AdvancedQuillEditor
    v-model="content"
    :image-upload="imageConfig"
    :toolbar="customToolbar"
    @editor-ready="handleEditorReady"
    @image-uploaded="handleImageUploaded"
  />
</template>

<script setup>
import { ref } from 'vue'
import { AdvancedQuillEditor, toolbarConfigs } from '@/components/ui/editor'

const content = ref('')

const imageConfig = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
  onUpload: async (file) => {
    // Your upload logic here
    const formData = new FormData()
    formData.append('image', file)
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    return data.url
  }
}

const customToolbar = toolbarConfigs.standard

const handleEditorReady = (editor) => {
  console.log('Editor ready:', editor)
}

const handleImageUploaded = (url, file) => {
  console.log('Image uploaded:', url, file?.name)
}
</script>
```

## 🎨 Components

### QuillEditor

Basic Quill editor component with essential features.

**Props:**
- `modelValue: string` - Content (v-model)
- `placeholder: string` - Placeholder text
- `readOnly: boolean` - Read-only mode
- `theme: 'snow' | 'bubble'` - Editor theme
- `toolbar: string | Array | boolean` - Toolbar configuration
- `formats: string[]` - Allowed formats
- `height: string` - Editor height
- `modules: object` - Custom Quill modules

**Events:**
- `@update:modelValue` - Content change
- `@editor-ready` - Editor initialized
- `@text-change` - Text changed
- `@selection-change` - Selection changed
- `@focus` - Editor focused
- `@blur` - Editor blurred

**Template Ref Methods:**
- `focus()` - Focus the editor
- `blur()` - Blur the editor
- `getEditor()` - Get Quill instance
- `getText()` - Get plain text
- `getHTML()` - Get HTML content
- `setContent(content)` - Set content

### AdvancedQuillEditor

Enhanced editor with image upload and advanced features.

**Additional Props:**
- `imageUpload: ImageUploadOptions` - Image upload configuration

**Additional Events:**
- `@image-uploaded` - Image successfully uploaded
- `@image-upload-error` - Image upload failed

**Additional Methods:**
- `insertImageFromUrl(url)` - Insert image from URL
- `getImages()` - Get all images in content

## 🛠️ Configuration

### Toolbar Configurations

Use predefined toolbar configurations:

```javascript
import { toolbarConfigs } from '@/components/ui/editor'

// Available configurations:
toolbarConfigs.minimal    // Bold, Italic, Link
toolbarConfigs.basic      // Basic formatting
toolbarConfigs.standard   // Standard blog editor
toolbarConfigs.full       // Full featured toolbar
```

### Custom Toolbar

```javascript
const customToolbar = [
  ['bold', 'italic', 'underline'],
  [{ 'header': [1, 2, 3, false] }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  ['link', 'image'],
  ['clean']
]
```

### Image Upload Configuration

```javascript
const imageUploadConfig = {
  maxSize: 2 * 1024 * 1024, // 2MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
  uploadUrl: '/api/upload/image', // Server endpoint
  onUpload: async (file) => {
    // Custom upload logic
    return 'https://example.com/uploaded-image.jpg'
  }
}
```

## 📋 Examples

### Simple Comment Editor

```vue
<template>
  <div class="space-y-4">
    <QuillEditor
      v-model="comment"
      :toolbar="['bold', 'italic', 'link']"
      placeholder="Write your comment..."
      height="150px"
    />
    <Button @click="submitComment">Post Comment</Button>
  </div>
</template>
```

### Blog Post Editor

```vue
<template>
  <div class="grid grid-cols-3 gap-6">
    <div class="col-span-2">
      <AdvancedQuillEditor
        v-model="post.content"
        :image-upload="imageConfig"
        :toolbar="toolbarConfigs.full"
        height="500px"
        @image-uploaded="trackImageUpload"
      />
    </div>
    <div class="space-y-4">
      <Input v-model="post.title" placeholder="Post title..." />
      <textarea v-model="post.excerpt" placeholder="Excerpt..."></textarea>
      <Button @click="savePost">Save Post</Button>
    </div>
  </div>
</template>
```

### Read-Only Display

```vue
<template>
  <QuillEditor
    v-model="content"
    :read-only="true"
    theme="bubble"
    :toolbar="false"
  />
</template>
```

### Form Integration with Validation

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-2">Content *</label>
        <QuillEditor
          v-model="formData.content"
          :class="{ 'border-red-500': errors.content }"
          @blur="validateContent"
        />
        <p v-if="errors.content" class="text-red-500 text-sm mt-1">
          {{ errors.content }}
        </p>
      </div>
      <Button type="submit" :disabled="hasErrors">Submit</Button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'

const formData = ref({ content: '' })
const errors = ref({})

const validateContent = () => {
  if (!formData.value.content.trim()) {
    errors.value.content = 'Content is required'
  } else {
    delete errors.value.content
  }
}

const hasErrors = computed(() => Object.keys(errors.value).length > 0)

const handleSubmit = () => {
  validateContent()
  if (!hasErrors.value) {
    // Submit form
    console.log('Form data:', formData.value)
  }
}
</script>
```

## 🎯 Advanced Features

### Custom Modules

Add custom Quill modules:

```javascript
// Custom mention module example
const mentionModule = {
  mention: {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ["@", "#"],
    source: function(searchTerm, renderList, mentionChar) {
      // Your mention logic here
    }
  }
}

// Use in component
<AdvancedQuillEditor
  v-model="content"
  :modules="mentionModule"
/>
```

### Content Sanitization

Sanitize content before saving:

```javascript
import DOMPurify from 'dompurify'

const sanitizeContent = (html) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'blockquote', 'a', 'img'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class']
  })
}

// Before saving
const cleanContent = sanitizeContent(editorContent.value)
```

### Delta Operations

Work with Quill's Delta format:

```javascript
const editorRef = ref()

// Get content as Delta
const getDelta = () => {
  return editorRef.value?.getEditor().getContents()
}

// Set content from Delta
const setDelta = (delta) => {
  editorRef.value?.getEditor().setContents(delta)
}

// Listen to changes
const handleTextChange = (delta, oldDelta, source) => {
  console.log('Delta change:', delta)
  console.log('Source:', source) // 'user' or 'api'
}
```

## 🎨 Styling

### Custom CSS

Override Quill styles:

```css
/* Custom editor styles */
.my-editor .ql-toolbar {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem 0.5rem 0 0;
  background: #f8fafc;
}

.my-editor .ql-container {
  border: 1px solid #e2e8f0;
  border-top: none;
  border-radius: 0 0 0.5rem 0.5rem;
}

.my-editor .ql-editor {
  min-height: 200px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

/* Custom toolbar buttons */
.my-editor .ql-toolbar button:hover {
  background: #e2e8f0;
}

.my-editor .ql-toolbar button.ql-active {
  background: #3b82f6;
  color: white;
}
```

### Dark Mode Support

The components automatically support dark mode through CSS variables:

```css
.dark .quill-editor .ql-toolbar {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border-color: hsl(var(--border));
}

.dark .quill-editor .ql-stroke {
  stroke: hsl(var(--foreground));
}

.dark .quill-editor .ql-fill {
  fill: hsl(var(--foreground));
}
```

## 🔧 Troubleshooting

### Common Issues

**1. Editor not loading**
```javascript
// Make sure Quill is properly imported
import('quill').then(({ default: Quill }) => {
  console.log('Quill loaded:', Quill)
})
```

**2. Images not uploading**
```javascript
// Check your upload handler
const handleImageUpload = async (file) => {
  try {
    console.log('Uploading:', file.name, file.size)
    // Your upload logic
    return imageUrl
  } catch (error) {
    console.error('Upload failed:', error)
    throw error
  }
}
```

**3. Content not syncing**
```javascript
// Watch for external content changes
watch(() => props.modelValue, (newValue) => {
  if (quillInstance.value && newValue !== getCurrentHTML()) {
    quillInstance.value.root.innerHTML = newValue
  }
})
```

**4. Toolbar not showing**
```javascript
// Check toolbar configuration
const toolbar = [
  ['bold', 'italic'], // Basic formats
  [{ 'list': 'ordered' }], // Lists
  ['clean'] // Remove formatting
]
```

### Performance Tips

1. **Lazy Loading**: Import Quill dynamically
2. **Debounce Updates**: Limit update frequency
3. **Content Sanitization**: Clean content on save, not on every change
4. **Image Optimization**: Compress images before upload

```javascript
// Debounced content updates
import { debounce } from 'lodash'

const debouncedUpdate = debounce((content) => {
  emit('update:modelValue', content)
}, 300)
```

## 📱 Mobile Considerations

### Touch Support

Quill works well on mobile, but consider:

```javascript
// Mobile-optimized toolbar
const mobileToolbar = [
  ['bold', 'italic'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  ['clean']
]

// Responsive height
const editorHeight = computed(() => {
  return window.innerWidth < 768 ? '250px' : '400px'
})
```

### iOS Specific

```css
/* Fix iOS keyboard issues */
.ql-editor {
  -webkit-overflow-scrolling: touch;
}

/* Prevent zoom on iOS */
.ql-editor {
  font-size: 16px; /* Minimum to prevent zoom */
}
```

## 🧪 Testing

### Unit Tests

```javascript
import { mount } from '@vue/test-utils'
import { QuillEditor } from '@/components/ui/editor'

describe('QuillEditor', () => {
  it('renders correctly', () => {
    const wrapper = mount(QuillEditor, {
      props: { modelValue: '<p>Test</p>' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('emits content changes', async () => {
    const wrapper = mount(QuillEditor)
    // Simulate text input
    // Check emitted events
  })
})
```

### E2E Tests

```javascript
// Cypress example
describe('Blog Editor', () => {
  it('allows creating a blog post', () => {
    cy.visit('/admin/posts/new')
    cy.get('[data-cy=post-title]').type('My New Post')
    cy.get('.ql-editor').type('This is the content')
    cy.get('[data-cy=save-post]').click()
    cy.contains('Post saved successfully')
  })
})
```

## 🔗 Integration Examples

### With Vue Router

```javascript
// Route guard for unsaved changes
router.beforeEach((to, from, next) => {
  if (hasUnsavedChanges.value) {
    if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
})
```

### With Vuex/Pinia

```javascript
// Pinia store for editor state
export const useEditorStore = defineStore('editor', () => {
  const content = ref('')
  const isDirty = ref(false)
  
  const updateContent = (newContent) => {
    content.value = newContent
    isDirty.value = true
  }
  
  const saveContent = async () => {
    // Save logic
    isDirty.value = false
  }
  
  return { content, isDirty, updateContent, saveContent }
})
```

### With WebSockets (Collaborative Editing)

```javascript
// Basic collaborative editing setup
const setupCollaboration = (editor) => {
  const socket = io('/editor')
  
  editor.on('text-change', (delta, oldDelta, source) => {
    if (source === 'user') {
      socket.emit('text-change', delta)
    }
  })
  
  socket.on('text-change', (delta) => {
    editor.updateContents(delta, 'api')
  })
}
```

## 📚 Resources

- [Quill.js Documentation](https://quilljs.com/docs/)
- [Quill.js API Reference](https://quilljs.com/docs/api/)
- [Delta Format](https://quilljs.com/docs/delta/)
- [Custom Modules](https://quilljs.com/guides/building-a-custom-module/)

## 📄 License

These components are part of your Vue.js project and follow your project's license terms.