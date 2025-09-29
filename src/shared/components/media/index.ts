// src/components/media/index.ts
export { default as YouTubePlayer } from './YouTubePlayer.vue'
export { default as TwitchPlayer } from './TwitchPlayer.vue'
export { default as VideoPlayer } from './VideoPlayer.vue'

// Types for external use
export interface YouTubePlayerProps {
    videoId: string
    title?: string
    privacyEnhanced?: boolean
    showRelated?: boolean
    showControls?: boolean
    autoplay?: boolean
    muted?: boolean
    startTime?: number
    endTime?: number
    aspectRatio?: 'video' | 'square' | 'wide'
    class?: string
    loadImmediately?: boolean
}

export interface TwitchPlayerProps {
    type: 'video' | 'stream'
    contentId: string
    title?: string
    showChat?: boolean
    autoplay?: boolean
    muted?: boolean
    startTime?: number
    aspectRatio?: 'video' | 'square' | 'wide'
    class?: string
    loadImmediately?: boolean
    parent?: string
    theme?: 'light' | 'dark'
}

export interface VideoPlayerProps {
    source: string
    platform?: 'youtube' | 'twitch-stream' | 'twitch-video'
    title?: string
    autoplay?: boolean
    muted?: boolean
    startTime?: number
    endTime?: number
    aspectRatio?: 'video' | 'square' | 'wide'
    class?: string
    loadImmediately?: boolean
    showChat?: boolean
    parent?: string
    privacyEnhanced?: boolean
    showRelated?: boolean
}

// Utility functions
export const extractYouTubeId = (url: string): string | null => {
    const patterns = [
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
        /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/
    ]

    for (const pattern of patterns) {
        const match = url.match(pattern)
        if (match) {
            return match[1]
        }
    }

    return null
}

export const extractTwitchInfo = (url: string): { type: 'video' | 'stream', contentId: string } | null => {
    // Remove any trailing slash and clean the URL
    const cleanUrl = url.trim().replace(/\/$/, '')

    // VOD patterns - check these first as they're more specific
    const vodPatterns = [
        /(?:https?:\/\/)?(?:www\.)?twitch\.tv\/videos\/(\d+)/,
        /(?:https?:\/\/)?(?:clips\.)?twitch\.tv\/[^\/]+\/clip\/([a-zA-Z0-9_-]+)/
    ]

    // Check for VOD first
    for (const pattern of vodPatterns) {
        const match = cleanUrl.match(pattern)
        if (match) {
            return { type: 'video', contentId: match[1] }
        }
    }

    // Stream patterns - more permissive but check after VOD patterns
    const streamPatterns = [
        // Direct channel URL: twitch.tv/channelname
        /(?:https?:\/\/)?(?:www\.)?twitch\.tv\/([a-zA-Z0-9_]{4,25})(?:\?.*)?$/,
        // Channel with additional path elements but not videos or clips
        /(?:https?:\/\/)?(?:www\.)?twitch\.tv\/([a-zA-Z0-9_]{4,25})(?:\/(?:home|about|schedule|videos|clips))?(?:\?.*)?$/
    ]

    // Check for stream
    for (const pattern of streamPatterns) {
        const match = cleanUrl.match(pattern)
        if (match) {
            const channelName = match[1]
            // Exclude common non-channel paths
            const excludedPaths = ['videos', 'clips', 'directory', 'p', 'user', 'team', 'communities', 'subscribe']
            if (!excludedPaths.includes(channelName.toLowerCase())) {
                return { type: 'stream', contentId: channelName }
            }
        }
    }

    return null
}

export const isValidYouTubeId = (id: string): boolean => {
    return /^[a-zA-Z0-9_-]{11}$/.test(id)
}

export const isValidTwitchVideoId = (id: string): boolean => {
    return /^\d+$/.test(id)
}

export const isValidTwitchChannelName = (name: string): boolean => {
    // Twitch usernames: 4-25 characters, alphanumeric and underscores only
    // Cannot start with underscore, cannot be all numbers
    return /^[a-zA-Z0-9][a-zA-Z0-9_]{3,24}$/.test(name) && !/^\d+$/.test(name)
}

export const getYouTubeThumbnail = (videoId: string, quality: 'default' | 'hq' | 'mq' | 'sd' | 'max' = 'hq'): string => {
    const qualityMap = {
        default: 'default',
        hq: 'hqdefault',
        mq: 'mqdefault',
        sd: 'sddefault',
        max: 'maxresdefault'
    }

    return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`
}

export const getTwitchStreamThumbnail = (channelName: string, width = 640, height = 360): string => {
    return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${channelName.toLowerCase()}-${width}x${height}.jpg`
}

// Additional utility function to test URL parsing
export const testTwitchUrl = (url: string): void => {
    console.log('Testing Twitch URL:', url)
    const result = extractTwitchInfo(url)
    console.log('Result:', result)

    if (result) {
        console.log(`✅ Detected ${result.type}: ${result.contentId}`)
    } else {
        console.log('❌ Could not parse URL')
    }
}
