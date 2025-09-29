<!-- src/components/media/VideoPlayer.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { AlertCircle } from 'lucide-vue-next'
import YouTubePlayer from './YouTubePlayer.vue'
import TwitchPlayer from './TwitchPlayer.vue'
import { extractYouTubeId, extractTwitchInfo, isValidYouTubeId, isValidTwitchVideoId, isValidTwitchChannelName } from './index.ts'
import { useTwitchDomain } from '@/shared/composables/useTwitchDomain.ts'

/**
 * Universal Video Player Component
 *
 * Automatically detects the video platform (YouTube, Twitch) and renders
 * the appropriate player component based on the provided URL or platform-specific ID
 */

interface VideoPlayerProps {
  /** Video URL or platform-specific ID */
  source: string
  /** Force a specific platform (optional) */
  platform?: 'youtube' | 'twitch-stream' | 'twitch-video'
  /** Video title for accessibility */
  title?: string
  /** Whether to autoplay the video */
  autoplay?: boolean
  /** Whether to start muted */
  muted?: boolean
  /** Start time in seconds */
  startTime?: number
  /** End time in seconds (YouTube only) */
  endTime?: number
  /** Custom aspect ratio */
  aspectRatio?: 'video' | 'square' | 'wide'
  /** Custom CSS classes */
  class?: string
  /** Whether to load immediately or show preview */
  loadImmediately?: boolean
  /** Twitch-specific: show chat for live streams */
  showChat?: boolean
  /** Twitch-specific: parent domain (auto-detected if not provided) */
  parent?: string
  /** YouTube-specific: privacy enhanced mode */
  privacyEnhanced?: boolean
  /** YouTube-specific: show related videos */
  showRelated?: boolean
}

const props = withDefaults(defineProps<VideoPlayerProps>(), {
  title: 'Video Player',
  autoplay: false,
  muted: false,
  aspectRatio: 'video',
  loadImmediately: false,
  showChat: false,
  privacyEnhanced: true,
  showRelated: false
})

// Get the correct Twitch domain automatically
const { twitchParent } = useTwitchDomain()

// Component state - removed detectionError as it's now handled in computed
const isDev = import.meta.env.DEV

/**
 * Get the parent domain for Twitch
 */
const finalTwitchParent = computed(() => {
  return props.parent || twitchParent.value
})

/**
 * Detect video platform and extract necessary information
 */
const videoInfo = computed(() => {
  const source = props.source.trim()

  if (!source) {
    return { error: 'No video source provided', platform: null, id: null }
  }

  // If platform is forced, try to validate the source accordingly
  if (props.platform) {
    switch (props.platform) {
      case 'youtube':
        if (isValidYouTubeId(source)) {
          return { error: null, platform: 'youtube', id: source }
        }
        return { error: 'Invalid YouTube video ID', platform: null, id: null }

      case 'twitch-video':
        if (isValidTwitchVideoId(source)) {
          return { error: null, platform: 'twitch-video', id: source }
        }
        return { error: 'Invalid Twitch video ID', platform: null, id: null }

      case 'twitch-stream':
        if (isValidTwitchChannelName(source)) {
          return { error: null, platform: 'twitch-stream', id: source }
        }
        return { error: 'Invalid Twitch channel name', platform: null, id: null }
    }
  }

  // Auto-detect from URL
  if (source.includes('youtube.com') || source.includes('youtu.be')) {
    const youtubeId = extractYouTubeId(source)
    if (youtubeId) {
      return { error: null, platform: 'youtube', id: youtubeId }
    }
    return { error: 'Could not extract YouTube video ID from URL', platform: null, id: null }
  }

  if (source.includes('twitch.tv')) {
    const twitchInfo = extractTwitchInfo(source)
    if (twitchInfo) {
      const platform = twitchInfo.type === 'video' ? 'twitch-video' : 'twitch-stream'
      return { error: null, platform, id: twitchInfo.contentId }
    }
    return { error: 'Could not extract Twitch information from URL', platform: null, id: null }
  }

  // Try to detect if it's a direct ID
  if (isValidYouTubeId(source)) {
    return { error: null, platform: 'youtube', id: source }
  }

  if (isValidTwitchVideoId(source)) {
    return { error: null, platform: 'twitch-video', id: source }
  }

  if (isValidTwitchChannelName(source)) {
    return { error: null, platform: 'twitch-stream', id: source }
  }

  return {
    error: 'Could not detect video platform. Please provide a valid YouTube or Twitch URL/ID',
    platform: null,
    id: null
  }
})

/**
 * Get the current error message
 */
const currentError = computed(() => {
  return videoInfo.value.error
})

/**
 * Check if there's a valid video detected
 */
const hasValidVideo = computed(() => {
  return videoInfo.value.platform && videoInfo.value.id && !videoInfo.value.error
})

/**
 * Check if the detected platform is YouTube
 */
const isYouTube = computed(() => {
  return videoInfo.value.platform === 'youtube'
})

/**
 * Check if the detected platform is Twitch
 */
const isTwitch = computed(() => {
  return videoInfo.value.platform?.startsWith('twitch')
})

/**
 * Get Twitch type (video or stream)
 */
const twitchType = computed(() => {
  if (!isTwitch.value || !videoInfo.value.platform) return null
  return videoInfo.value.platform === 'twitch-video' ? 'video' : 'stream'
})
</script>

<template>
  <div :class="props.class">
    <!-- Debug Info (only in development) -->
    <div v-if="isDev" class="mb-4 p-2 bg-gray-100 rounded text-xs">
      <strong>Debug:</strong>
      Source: "{{ props.source }}" |
      Platform: {{ videoInfo.platform }} |
      ID: {{ videoInfo.id }} |
      Error: {{ videoInfo.error }} |
      hasValidVideo: {{ hasValidVideo }} |
      isYouTube: {{ isYouTube }} |
      isTwitch: {{ isTwitch }} |
      twitchType: {{ twitchType }}
    </div>

    <!-- Error State -->
    <div
        v-if="currentError || !hasValidVideo"
        class="flex flex-col items-center justify-center p-8 bg-muted rounded-lg border border-border"
    >
      <AlertCircle class="h-12 w-12 mb-4 text-destructive" />
      <h3 class="text-lg font-semibold mb-2">Video Detection Error</h3>
      <p class="text-sm text-muted-foreground text-center max-w-md">
        {{ currentError }}
      </p>
      <p class="text-xs text-muted-foreground mt-4 text-center">
        Supported formats: YouTube URLs/IDs, Twitch stream/video URLs/IDs
      </p>
    </div>

    <!-- YouTube Player -->
    <YouTubePlayer
        v-if="isYouTube && hasValidVideo && videoInfo.id"
        :video-id="videoInfo.id"
        :title="props.title"
        :autoplay="props.autoplay"
        :muted="props.muted"
        :start-time="props.startTime"
        :end-time="props.endTime"
        :aspect-ratio="props.aspectRatio"
        :load-immediately="props.loadImmediately"
        :privacy-enhanced="props.privacyEnhanced"
        :show-related="props.showRelated"
    />

    <!-- Twitch Player -->
    <TwitchPlayer
        v-else-if="isTwitch && hasValidVideo && twitchType && videoInfo.id"
        :type="twitchType"
        :content-id="videoInfo.id"
        :title="props.title"
        :autoplay="props.autoplay"
        :muted="props.muted"
        :start-time="props.startTime"
        :aspect-ratio="props.aspectRatio"
        :load-immediately="props.loadImmediately"
        :show-chat="props.showChat"
        :parent="finalTwitchParent"
    />
  </div>
</template>
