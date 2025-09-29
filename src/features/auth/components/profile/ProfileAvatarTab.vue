// src/components/profile/ProfileAvatarTab.vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/features/auth/stores/auth.ts';
import { useI18n } from '@/core/i18n';
import { Button } from '@/shared/components/ui/button';
import { AlertCircle, Upload, User, X } from 'lucide-vue-next';
import Spinner from '@/shared/components/ui/Spinner.vue';
import toastService from '@/shared/services/toast.service.ts';
import avatarService from '@/features/auth/services/avatar.service.ts';
import type { ApiError } from '@/core/types';

// Initialize stores and i18n
const authStore = useAuthStore();
const { t } = useI18n();

// Component state
const loading = ref(false);
const error = ref<string | null>(null);
const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const avatarUrl = ref<string | null>(null);
const isDragging = ref(false);

// Emit events
const emit = defineEmits<{
  'avatar-updated': []
}>();

// Computed properties
const acceptedFileTypes = computed(() => ['image/jpeg', 'image/png', 'image/gif']);
const showPlaceholder = computed(() => !previewUrl.value && !avatarUrl.value);

/**
 * Load user avatar
 */
const loadUserAvatar = () => {
  if (!authStore.user?.id) return;

  // Just set the direct URL to the avatar
  avatarUrl.value = avatarService.getUserAvatarUrl(authStore.user.id);

  // Optionally add a timestamp query parameter to prevent caching after updates
  avatarUrl.value += `?t=${Date.now()}`;
};

/**
 * Handle file selection
 */
const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    const file = input.files[0];

    // Validate file type
    if (!acceptedFileTypes.value.includes(file.type)) {
      error.value = t('profile.avatar.error.invalidType');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      error.value = t('profile.avatar.error.tooLarge');
      return;
    }

    selectedFile.value = file;
    error.value = null;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

/**
 * Clear selected file
 */
const clearSelectedFile = () => {
  selectedFile.value = null;
  previewUrl.value = null;
  error.value = null;

  // Reset file input
  const fileInput = document.getElementById('avatar-upload') as HTMLInputElement;
  if (fileInput) fileInput.value = '';
};

/**
 * Handle drag events
 */
const handleDragEnter = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = true;
};

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = false;
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = true;
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = false;

  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
    const file = e.dataTransfer.files[0];

    // Validate file type
    if (!acceptedFileTypes.value.includes(file.type)) {
      error.value = t('profile.avatar.error.invalidType');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      error.value = t('profile.avatar.error.tooLarge');
      return;
    }

    selectedFile.value = file;
    error.value = null;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

/**
 * Upload avatar to server
 */
const uploadAvatar = async () => {
  if (!selectedFile.value || !authStore.user?.id) return;

  loading.value = true;
  error.value = null;

  try {
    // Convert file to base64 with full data URL format (e.g., "data:image/jpeg;base64,...")
    // This is required by the backend API
    const base64Data = await fileToBase64(selectedFile.value);

    // Upload to server
    await avatarService.uploadAvatar({
      imageData: base64Data
    });

    // Update avatar URL with cache-busting parameter
    loadUserAvatar();

    // Clear selected file
    clearSelectedFile();

    // Show success notification
    toastService.success(t('profile.avatar.success.title'), t('profile.avatar.success.uploaded'));

    // Emit event to parent if defined
    if (typeof emit === 'function') {
      emit('avatar-updated');
    }
  } catch (err: unknown) {
    const apiError = err as ApiError;
    error.value = apiError.response?.data?.message || t('profile.avatar.error.uploadFailed');
    toastService.error(t('profile.avatar.error.title'), error.value);
  } finally {
    loading.value = false;
  }
};

/**
 * Convert File to base64 and resize to 100x100 pixels
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Create a FileReader to read the file
    const reader = new FileReader();

    reader.onload = (e) => {
      // Create an image element to load the file
      const img = new Image();

      img.onload = () => {
        // Create a canvas for resizing
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size to 100x100 pixels
        const size = 100;
        canvas.width = size;
        canvas.height = size;

        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Fill canvas with white background to ensure no transparency issues
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, size, size);

        // Calculate dimensions to maintain aspect ratio
        const sourceWidth = img.width;
        const sourceHeight = img.height;

        let destX = 0;
        let destY = 0;
        let destWidth = size;
        let destHeight = size;

        // Calculate the crop area to maintain aspect ratio (center crop)
        if (sourceWidth > sourceHeight) {
          // Landscape image
          const scaleFactor = size / sourceHeight;
          destWidth = sourceWidth * scaleFactor;
          destX = -(destWidth - size) / 2;
        } else {
          // Portrait image
          const scaleFactor = size / sourceWidth;
          destHeight = sourceHeight * scaleFactor;
          destY = -(destHeight - size) / 2;
        }

        // Draw the image resized to 100x100 with center crop
        ctx.drawImage(img, destX, destY, destWidth, destHeight);

        // Get the resized image as data URL
        // Use 0.9 quality for JPEG to balance size and quality
        const resizedDataUrl = canvas.toDataURL(file.type, 0.9);
        resolve(resizedDataUrl);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      // Set the image source to the file data
      if (typeof e.target?.result === 'string') {
        img.src = e.target.result;
      } else {
        reject(new Error('Failed to read file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    // Read the file as data URL
    reader.readAsDataURL(file);
  });
};

// Load avatar on component mount
onMounted(() => {
  loadUserAvatar();
});
</script>

<template>
  <div>
    <div class="space-y-6">
      <!-- Error display -->
      <div v-if="error" class="p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2">
        <AlertCircle class="h-5 w-5 flex-shrink-0" />
        <p>{{ error }}</p>
      </div>

      <div class="flex flex-col items-center justify-center gap-4">
        <div class="text-center">
          <h3 class="text-lg font-medium mb-2">{{ t('profile.avatar.currentAvatar') }}</h3>
          <p class="text-sm text-muted-foreground">{{ t('profile.avatar.description') }}</p>
          <p class="text-xs text-muted-foreground mt-1">{{ t('profile.avatar.sizeInfo') }}</p>
        </div>

        <div class="relative">
          <!-- Current avatar or placeholder -->
          <div
              class="h-24 w-24 rounded-full overflow-hidden border-4 border-background shadow-lg bg-muted flex items-center justify-center"
          >
            <!-- Preview of selected file -->
            <img
                v-if="previewUrl"
                :src="previewUrl"
                alt="Avatar preview"
                class="h-full w-full object-cover"
            />

            <!-- Current avatar from server -->
            <img
                v-else-if="avatarUrl"
                :src="avatarUrl"
                alt="Current avatar"
                class="h-full w-full object-cover"
                @load="hasAvatarLoaded = true"
                @error="hasAvatarLoaded = false"
            />

            <!-- Placeholder if no avatar -->
            <User
                v-if="showPlaceholder"
                class="h-10 w-10 text-muted-foreground/50"
            />
          </div>
        </div>
      </div>

      <!-- Upload section -->
      <div
          class="border-2 border-dashed rounded-lg p-6 transition-colors"
          :class="[
          isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50',
        ]"
          @dragenter="handleDragEnter"
          @dragleave="handleDragLeave"
          @dragover="handleDragOver"
          @drop="handleDrop"
      >
        <div class="flex flex-col items-center justify-center gap-4">
          <div class="bg-primary/10 rounded-full p-3">
            <Upload class="h-6 w-6 text-primary" />
          </div>

          <div class="text-center">
            <p class="font-medium">{{ t('profile.avatar.dragDrop') }}</p>
            <p class="text-sm text-muted-foreground mt-1">{{ t('profile.avatar.fileTypes') }}</p>
          </div>

          <div class="flex items-center gap-2">
            <label
                for="avatar-upload"
                class="cursor-pointer rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {{ t('profile.avatar.browse') }}
            </label>
            <input
                id="avatar-upload"
                type="file"
                class="sr-only"
                accept="image/jpeg,image/png,image/gif"
                @change="handleFileSelect"
            />
          </div>
        </div>
      </div>

      <!-- Selected file preview -->
      <div v-if="selectedFile" class="flex items-center justify-between p-3 bg-muted rounded-md">
        <div class="flex items-center gap-3 overflow-hidden">
          <div class="bg-background rounded-md p-2">
            <img
                v-if="previewUrl"
                :src="previewUrl"
                alt="Preview"
                class="h-8 w-8 object-cover rounded"
            />
          </div>
          <div class="min-w-0">
            <p class="font-medium truncate">{{ selectedFile.name }}</p>
            <p class="text-xs text-muted-foreground">
              {{ (selectedFile.size / 1024).toFixed(1) }} KB
            </p>
          </div>
        </div>

        <button
            type="button"
            @click="clearSelectedFile"
            class="p-1 hover:bg-background rounded-full"
        >
          <X class="h-4 w-4" />
        </button>
      </div>

      <!-- Action buttons -->
      <div class="flex justify-end gap-3">
        <Button
            v-if="selectedFile"
            @click="uploadAvatar"
            :disabled="loading"
        >
          <template v-if="loading">
            <Spinner color="text-white" size="sm" :mr="true" />
            {{ t('profile.avatar.uploading') }}
          </template>
          <template v-else>
            <Upload class="mr-2 h-4 w-4" />
            {{ t('profile.avatar.upload') }}
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>
