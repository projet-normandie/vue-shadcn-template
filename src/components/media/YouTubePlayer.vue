<!-- src/components/media/YouTubePlayer.vue -->
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { Play, ExternalLink, AlertCircle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * YouTube Player Component
 *
 * A responsive YouTube video player with privacy-focused loading
 * and customizable options
 */

interface YouTubePlayerProps {
  /** YouTube video ID (from the URL) */
  videoId: string
  /** Video title for accessibility */
  title?: string
  /** Whether to enable privacy-enhanced mode (uses youtube-nocookie.com) */
  privacyEnhanced?: boolean
  /** Whether to show related videos at the end */
  showRelated?: boolean
  /** Whether to show player controls */
  showControls?: boolean
  /** Whether to autoplay the video (requires user interaction) */
  autoplay?: boolean
  /** Whether to start muted */
  muted?: boolean
  /** Start time in seconds */
  startTime?: number
  /** End time in seconds */
  endTime?: number
  /** Custom aspect ratio class */
  aspectRatio?: 'video' | 'square' | 'wide'
  /** Custom CSS classes */
  class?: string
  /** Whether to load immediately or show a preview */
  loadImmediately?: boolean
}

const props = withDefaults(defineProps<YouTubePlayerProps>(), {
  title: 'YouTube Video',
  privacyEnhanced: true,
  showRelated: false,
  showControls: true,
  autoplay: false,
  muted: false,
  aspectRatio: 'video',
  loadImmediately: false
})

// Component state
const isLoaded = ref(props.loadImmediately)
const isError = ref(false)
const thumbnailLoaded = ref(false)

/**
 * Build the YouTube embed URL with parameters
 */
const embedUrl = computed(() => {
  if (!props.videoId) return ''

  const baseUrl = props.privacyEnhanced
      ? 'https://www.youtube-nocookie.com/embed/'
      : 'https://www.youtube.com/embed/'

  const url = new URL(`${baseUrl}${props.videoId}`)

  // Add parameters
  const params = new URLSearchParams()

  // Related videos
  params.set('rel', props.showRelated ? '1' : '0')

  // Controls
  params.set('controls', props.showControls ? '1' : '0')

  // Autoplay (only works with user interaction)
  if (props.autoplay) {
    params.set('autoplay', '1')
  }

  // Muted
  if (props.muted) {
    params.set('mute', '1')
  }

  // Start time
  if (props.startTime) {
    params.set('start', props.startTime.toString())
  }

  // End time
  if (props.endTime) {
    params.set('end', props.endTime.toString())
  }

  // Enable JS API for better integration
  params.set('enablejsapi', '1')

  // Origin for security
  if (typeof window !== 'undefined') {
    params.set('origin', window.location.origin)
  }

  url.search = params.toString()
  return url.toString()
})

/**
 * Get YouTube thumbnail URL
 */
const thumbnailUrl = computed(() => {
  if (!props.videoId) return ''
  return `https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`
})

/**
 * Get standard quality thumbnail as fallback
 */
const fallbackThumbnailUrl = computed(() => {
  if (!props.videoId) return ''
  return `https://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`
})

/**
 * Get aspect ratio classes
 */
const aspectRatioClass = computed(() => {
  switch (props.aspectRatio) {
    case 'square':
      return 'aspect-square'
    case 'wide':
      return 'aspect-[21/9]'
    case 'video':
    default:
      return 'aspect-video'
  }
})

/**
 * Load the video player
 */
const loadVideo = () => {
  if (!props.videoId) {
    isError.value = true
    return
  }
  isLoaded.value = true
}

/**
 * Handle thumbnail load error
 */
const handleThumbnailError = () => {
  thumbnailLoaded.value = false
}

/**
 * Handle thumbnail load success
 */
const handleThumbnailLoad = () => {
  thumbnailLoaded.value = true
}

/**
 * Open video in new tab
 */
const openInYouTube = () => {
  const url = `https://www.youtube.com/watch?v=${props.videoId}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

// Validate video ID on mount
onMounted(() => {
  if (!props.videoId || !/^[a-zA-Z0-9_-]{11}$/.test(props.videoId)) {
    console.warn('Invalid YouTube video ID:', props.videoId)
    isError.value = true
  }
})
</script>

<template>
  <div
      :class="cn(
      'relative overflow-hidden rounded-lg bg-muted',
      aspectRatioClass,
      props.class
    )"
  >
    <!-- Error State -->
    <div
        v-if="isError || !videoId"
        class="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground"
    >
      <AlertCircle class="h-12 w-12 mb-4 text-destructive" />
      <p class="text-sm font-medium">Invalid video ID</p>
      <p class="text-xs text-muted-foreground mt-1">Please check the YouTube video ID</p>
    </div>

    <!-- Preview/Thumbnail State -->
    <div v-else-if="!isLoaded" class="absolute inset-0 group cursor-pointer" @click="loadVideo">
      <!-- Thumbnail Background -->
      <div class="absolute inset-0 bg-black">
        <img
            :src="thumbnailUrl"
            :alt="title"
            class="w-full h-full object-cover transition-opacity duration-300"
            :class="{ 'opacity-0': !thumbnailLoaded }"
            @load="handleThumbnailLoad"
            @error="handleThumbnailError"
        />

        <!-- Fallback thumbnail -->
        <img
            v-if="!thumbnailLoaded"
            :src="fallbackThumbnailUrl"
            :alt="title"
            class="absolute inset-0 w-full h-full object-cover"
            @load="handleThumbnailLoad"
            @error="handleThumbnailError"
        />
      </div>

      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

      <!-- Play button -->
      <div class="absolute inset-0 flex items-center justify-center">
        <Button
            size="lg"
            class="rounded-full h-16 w-16 bg-red-600 hover:bg-red-700 text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
        >
          <Play class="h-6 w-6 ml-1" fill="currentColor" />
        </Button>
      </div>

      <!-- Video info overlay -->
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <h3 class="text-white font-medium text-sm md:text-base line-clamp-2">{{ title }}</h3>
        <div class="flex items-center justify-between mt-2">
          <span class="text-white/80 text-xs">Click to play</span>
          <Button
              variant="ghost"
              size="sm"
              class="text-white/80 hover:text-white h-auto p-1"
              @click.stop="openInYouTube"
          >
            <ExternalLink class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>

    <!-- YouTube Iframe -->
    <iframe
        v-else
        :src="embedUrl"
        :title="title"
        class="absolute inset-0 w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
    />
  </div>
</template>

<style scoped>
/* Line clamp utility for older browsers */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Ensure iframe is properly contained */
iframe {
  border: none;
  outline: none;
}

/* Smooth loading animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
</style>
