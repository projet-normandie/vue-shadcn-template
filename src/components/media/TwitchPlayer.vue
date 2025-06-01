<!-- src/components/media/TwitchPlayer.vue -->
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { Play, ExternalLink, AlertCircle, Radio } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useTwitchDomain } from '@/composables/useTwitchDomain'

/**
 * Twitch Player Component
 *
 * A responsive Twitch video/stream player with support for both
 * live streams and VODs (Video on Demand)
 */

interface TwitchPlayerProps {
  /** Content type: 'video' for VODs, 'stream' for live streams */
  type: 'video' | 'stream'
  /** Twitch content ID (video ID for VODs, channel name for streams) */
  contentId: string
  /** Video/Stream title for accessibility */
  title?: string
  /** Whether to show chat alongside the player */
  showChat?: boolean
  /** Whether to autoplay the content (requires user interaction) */
  autoplay?: boolean
  /** Whether to start muted */
  muted?: boolean
  /** Start time in seconds (only for VODs) */
  startTime?: number
  /** Custom aspect ratio class */
  aspectRatio?: 'video' | 'square' | 'wide'
  /** Custom CSS classes */
  class?: string
  /** Whether to load immediately or show a preview */
  loadImmediately?: boolean
  /** Twitch parent domain (auto-detected if not provided) */
  parent?: string
  /** Theme for the player */
  theme?: 'light' | 'dark'
}

const props = withDefaults(defineProps<TwitchPlayerProps>(), {
  type: 'video',
  title: 'Twitch Content',
  showChat: false,
  autoplay: false,
  muted: false,
  aspectRatio: 'video',
  loadImmediately: false,
  theme: 'dark'
})

// Get the correct Twitch domain automatically
const { twitchParent } = useTwitchDomain()

// Component state
const isLoaded = ref(props.loadImmediately)
const isError = ref(false)
const thumbnailLoaded = ref(false)

/**
 * Get the parent domain for Twitch
 */
const finalTwitchParent = computed(() => {
  return props.parent || twitchParent.value
})

/**
 * Build the Twitch embed URL with parameters
 */
const embedUrl = computed(() => {
  if (!props.contentId) return ''

  const params = new URLSearchParams()

  if (props.type === 'video') {
    // VOD embed
    params.set('video', props.contentId)

    // Start time for VODs
    if (props.startTime) {
      params.set('time', `${Math.floor(props.startTime / 3600)}h${Math.floor((props.startTime % 3600) / 60)}m${props.startTime % 60}s`)
    }
  } else {
    // Live stream embed
    params.set('channel', props.contentId)
  }

  // Common parameters
  params.set('parent', finalTwitchParent.value)
  params.set('autoplay', props.autoplay ? 'true' : 'false')
  params.set('muted', props.muted ? 'true' : 'false')

  // Theme
  if (props.theme) {
    params.set('theme', props.theme)
  }

  // Build final URL
  const baseUrl = 'https://player.twitch.tv/'
  const url = new URL(baseUrl)
  url.search = params.toString()
  return url.toString()
})

/**
 * Build chat URL if enabled
 */
const chatUrl = computed(() => {
  if (!props.showChat || !props.contentId) return ''

  if (props.type === 'stream') {
    const url = new URL(`https://www.twitch.tv/embed/${props.contentId}/chat`)
    url.searchParams.set('parent', finalTwitchParent.value)
    if (props.theme) {
      url.searchParams.set('darkpopout', props.theme === 'dark' ? 'true' : 'false')
    }
    return url.toString()
  }

  return '' // Chat not available for VODs
})

/**
 * Get Twitch thumbnail URL
 */
const thumbnailUrl = computed(() => {
  if (!props.contentId) return ''

  if (props.type === 'video') {
    // For VODs, we'll use a placeholder since Twitch API requires authentication
    return `https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-285x380.jpg`
  } else {
    // For streams, we can try to get the stream thumbnail
    return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${props.contentId.toLowerCase()}-640x360.jpg`
  }
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
 * Get grid layout classes for chat
 */
const gridClass = computed(() => {
  if (!props.showChat || props.type === 'video') {
    return ''
  }
  return 'grid grid-cols-1 lg:grid-cols-3 gap-4'
})

/**
 * Get player container classes
 */
const playerContainerClass = computed(() => {
  if (!props.showChat || props.type === 'video') {
    return ''
  }
  return 'lg:col-span-2'
})

/**
 * Load the video player
 */
const loadPlayer = () => {
  if (!props.contentId) {
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
 * Open content in Twitch
 */
const openInTwitch = () => {
  let url = ''
  if (props.type === 'video') {
    url = `https://www.twitch.tv/videos/${props.contentId}`
  } else {
    url = `https://www.twitch.tv/${props.contentId}`
  }
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Validate content ID
 */
const validateContentId = () => {
  if (!props.contentId) {
    isError.value = true
    return false
  }

  if (props.type === 'video') {
    // VOD IDs are typically numeric
    return /^\d+$/.test(props.contentId)
  } else {
    // Channel names follow Twitch username rules
    return /^[a-zA-Z0-9_]{4,25}$/.test(props.contentId)
  }
}

// Validate on mount
onMounted(() => {
  if (!validateContentId()) {
    console.warn(`Invalid Twitch ${props.type} ID:`, props.contentId)
    isError.value = true
  }
})
</script>

<template>
  <div :class="cn(gridClass, props.class)">
    <!-- Player Container -->
    <div :class="playerContainerClass">
      <div
          :class="cn(
          'relative overflow-hidden rounded-lg bg-muted',
          aspectRatioClass
        )"
      >
        <!-- Error State -->
        <div
            v-if="isError || !contentId"
            class="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground"
        >
          <AlertCircle class="h-12 w-12 mb-4 text-destructive" />
          <p class="text-sm font-medium">Invalid {{ type }} ID</p>
          <p class="text-xs text-muted-foreground mt-1">
            Please check the Twitch {{ type === 'video' ? 'video' : 'channel' }} ID
          </p>
        </div>

        <!-- Preview/Thumbnail State -->
        <div v-else-if="!isLoaded" class="absolute inset-0 group cursor-pointer" @click="loadPlayer">
          <!-- Thumbnail Background -->
          <div class="absolute inset-0 bg-purple-900">
            <img
                v-if="type === 'stream'"
                :src="thumbnailUrl"
                :alt="title"
                class="w-full h-full object-cover transition-opacity duration-300"
                :class="{ 'opacity-0': !thumbnailLoaded }"
                @load="handleThumbnailLoad"
                @error="handleThumbnailError"
            />

            <!-- Fallback for VODs or failed thumbnails -->
            <div
                v-if="type === 'video' || !thumbnailLoaded"
                class="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center"
            >
              <div class="text-center text-white">
                <div class="text-6xl font-bold mb-2">twitch</div>
                <div class="text-sm uppercase tracking-wider">
                  {{ type === 'video' ? 'Video on Demand' : 'Live Stream' }}
                </div>
              </div>
            </div>
          </div>

          <!-- Dark overlay -->
          <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

          <!-- Play button and live indicator -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="flex flex-col items-center gap-4">
              <!-- Live indicator for streams -->
              <Badge
                  v-if="type === 'stream'"
                  variant="destructive"
                  class="bg-red-600 hover:bg-red-600 animate-pulse"
              >
                <Radio class="h-3 w-3 mr-1" />
                LIVE
              </Badge>

              <!-- Play button -->
              <Button
                  size="lg"
                  class="rounded-full h-16 w-16 bg-purple-600 hover:bg-purple-700 text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
              >
                <Play class="h-6 w-6 ml-1" fill="currentColor" />
              </Button>
            </div>
          </div>

          <!-- Content info overlay -->
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-white font-medium text-sm md:text-base line-clamp-2">{{ title }}</h3>
                <div class="flex items-center gap-2 mt-2">
                  <span class="text-white/80 text-xs">
                    {{ type === 'video' ? 'Click to watch VOD' : 'Click to watch live' }}
                  </span>
                  <Badge v-if="type === 'video'" variant="secondary" class="text-xs">
                    VOD
                  </Badge>
                </div>
              </div>
              <Button
                  variant="ghost"
                  size="sm"
                  class="text-white/80 hover:text-white h-auto p-1 ml-2"
                  @click.stop="openInTwitch"
              >
                <ExternalLink class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <!-- Twitch Iframe -->
        <iframe
            v-else
            :src="embedUrl"
            :title="title"
            class="absolute inset-0 w-full h-full border-0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>

    <!-- Chat Container (only for live streams) -->
    <div
        v-if="showChat && type === 'stream' && isLoaded"
        class="lg:col-span-1"
    >
      <div class="h-full min-h-[400px] lg:min-h-full">
        <iframe
            :src="chatUrl"
            title="Twitch Chat"
            class="w-full h-full border-0 rounded-lg bg-muted"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
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

/* Live indicator animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
