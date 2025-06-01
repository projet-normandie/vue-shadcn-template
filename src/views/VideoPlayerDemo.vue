<!-- src/views/VideoPlayerDemo.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { VideoPlayer, YouTubePlayer, TwitchPlayer } from '@/components/media'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Play, Copy, Video } from 'lucide-vue-next'
import toastService from '@/services/toast.service'

// Demo URLs and IDs
const demoSources = {
  youtube: {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    id: 'dQw4w9WgXcQ',
    title: 'Never Gonna Give You Up - Rick Astley'
  },
  twitchStream: {
    url: 'https://www.twitch.tv/shroud',
    id: 'shroud',
    title: 'Shroud Live Stream'
  },
  twitchVideo: {
    url: 'https://www.twitch.tv/videos/123456789',
    id: '123456789',
    title: 'Gaming Highlights VOD'
  }
}

// Interactive demo
const customVideoSource = ref('')
const customVideoTitle = ref('')

/**
 * Copy text to clipboard
 */
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    toastService.success('Copied!', 'URL copied to clipboard')
  } catch {
    toastService.error('Copy Failed', 'Could not copy to clipboard')
  }
}

/**
 * Load custom video
 */
const loadCustomVideo = () => {
  if (!customVideoSource.value.trim()) {
    toastService.error('No URL', 'Please enter a video URL')
    return
  }

  if (!customVideoTitle.value.trim()) {
    customVideoTitle.value = 'Custom Video'
  }
}
</script>

<template>
  <div class="container mx-auto max-w-6xl px-4 py-8 space-y-8">
    <!-- Header -->
    <div class="text-center space-y-4">
      <div class="flex justify-center">
        <div class="bg-primary/10 rounded-full p-3">
          <Video class="h-8 w-8 text-primary" />
        </div>
      </div>
      <h1 class="text-4xl font-bold">Video Player Components</h1>
      <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
        Universal video players for YouTube and Twitch with automatic platform detection,
        privacy-focused loading, and extensive customization options.
      </p>
    </div>

    <!-- Interactive Demo Section -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Play class="h-5 w-5" />
          Try Your Own Video
        </CardTitle>
        <CardDescription>
          Paste any YouTube or Twitch URL to see the universal player in action
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex gap-4">
          <Input
              v-model="customVideoSource"
              placeholder="Paste YouTube or Twitch URL here..."
              class="flex-1"
          />
          <Input
              v-model="customVideoTitle"
              placeholder="Custom title (optional)"
              class="w-64"
          />
          <Button @click="loadCustomVideo" :disabled="!customVideoSource.trim()">
            Load Video
          </Button>
        </div>

        <!-- Custom Video Player -->
        <div v-if="customVideoSource.trim()" class="mt-6">
          <VideoPlayer
              :source="customVideoSource"
              :title="customVideoTitle || 'Custom Video'"
              :show-chat="true"
          />
        </div>
      </CardContent>
    </Card>

    <!-- Demo Players -->
    <Tabs default-value="universal" class="w-full">
      <TabsList class="grid w-full grid-cols-4">
        <TabsTrigger value="universal">Universal Player</TabsTrigger>
        <TabsTrigger value="youtube">YouTube Player</TabsTrigger>
        <TabsTrigger value="twitch">Twitch Player</TabsTrigger>
        <TabsTrigger value="comparison">Comparison</TabsTrigger>
      </TabsList>

      <!-- Universal Player Demo -->
      <TabsContent value="universal" class="space-y-6">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold mb-2">Universal Video Player</h2>
          <p class="text-muted-foreground">
            Automatically detects platform and renders the appropriate player
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- YouTube Auto-Detection -->
          <Card>
            <CardHeader>
              <div class="flex items-center justify-between">
                <div>
                  <CardTitle class="text-lg">YouTube Auto-Detection</CardTitle>
                  <CardDescription>{{ demoSources.youtube.url }}</CardDescription>
                </div>
                <div class="flex gap-2">
                  <Badge variant="secondary">YouTube</Badge>
                  <Button
                      variant="ghost"
                      size="sm"
                      @click="copyToClipboard(demoSources.youtube.url)"
                  >
                    <Copy class="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <VideoPlayer
                  :source="demoSources.youtube.url"
                  :title="demoSources.youtube.title"
                  :privacy-enhanced="true"
              />
            </CardContent>
          </Card>

          <!-- Twitch Stream Auto-Detection -->
          <Card>
            <CardHeader>
              <div class="flex items-center justify-between">
                <div>
                  <CardTitle class="text-lg">Twitch Stream Auto-Detection</CardTitle>
                  <CardDescription>{{ demoSources.twitchStream.url }}</CardDescription>
                </div>
                <div class="flex gap-2">
                  <Badge variant="destructive">Twitch Live</Badge>
                  <Button
                      variant="ghost"
                      size="sm"
                      @click="copyToClipboard(demoSources.twitchStream.url)"
                  >
                    <Copy class="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <VideoPlayer
                  :source="demoSources.twitchStream.url"
                  :title="demoSources.twitchStream.title"
              />
            </CardContent>
          </Card>
        </div>

        <!-- Direct ID Usage -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle class="text-base">YouTube ID</CardTitle>
              <CardDescription>{{ demoSources.youtube.id }}</CardDescription>
            </CardHeader>
            <CardContent>
              <VideoPlayer
                  :source="demoSources.youtube.id"
                  title="YouTube by ID"
                  aspect-ratio="square"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="text-base">Twitch Channel</CardTitle>
              <CardDescription>{{ demoSources.twitchStream.id }}</CardDescription>
            </CardHeader>
            <CardContent>
              <VideoPlayer
                  :source="demoSources.twitchStream.id"
                  title="Twitch by Channel"
                  platform="twitch-stream"
                  aspect-ratio="square"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="text-base">Twitch VOD ID</CardTitle>
              <CardDescription>{{ demoSources.twitchVideo.id }}</CardDescription>
            </CardHeader>
            <CardContent>
              <VideoPlayer
                  :source="demoSources.twitchVideo.id"
                  title="Twitch VOD by ID"
                  platform="twitch-video"
                  aspect-ratio="square"
              />
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <!-- YouTube Player Demo -->
      <TabsContent value="youtube" class="space-y-6">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold mb-2">YouTube Player</h2>
          <p class="text-muted-foreground">
            Dedicated YouTube player with privacy features and extensive customization
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Enhanced</CardTitle>
              <CardDescription>Uses youtube-nocookie.com for better privacy</CardDescription>
            </CardHeader>
            <CardContent>
              <YouTubePlayer
                  :video-id="demoSources.youtube.id"
                  :title="demoSources.youtube.title"
                  :privacy-enhanced="true"
                  :show-related="false"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Auto-loaded with Start Time</CardTitle>
              <CardDescription>Loads immediately, starts at 30 seconds, muted</CardDescription>
            </CardHeader>
            <CardContent>
              <YouTubePlayer
                  :video-id="demoSources.youtube.id"
                  :title="demoSources.youtube.title"
                  :load-immediately="true"
                  :start-time="30"
                  :muted="true"
              />
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <!-- Twitch Player Demo -->
      <TabsContent value="twitch" class="space-y-6">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold mb-2">Twitch Player</h2>
          <p class="text-muted-foreground">
            Supports both live streams and VODs with optional chat integration
          </p>
        </div>

        <div class="space-y-6">
          <!-- Live Stream with Chat -->
          <Card>
            <CardHeader>
              <CardTitle>Live Stream with Chat</CardTitle>
              <CardDescription>Full Twitch experience with integrated chat</CardDescription>
            </CardHeader>
            <CardContent>
              <TwitchPlayer
                  type="stream"
                  :content-id="demoSources.twitchStream.id"
                  :title="demoSources.twitchStream.title"
                  :show-chat="true"
                  theme="dark"
              />
            </CardContent>
          </Card>

          <!-- VOD Player -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Video on Demand</CardTitle>
                <CardDescription>Past broadcast with start time</CardDescription>
              </CardHeader>
              <CardContent>
                <TwitchPlayer
                    type="video"
                    :content-id="demoSources.twitchVideo.id"
                    :title="demoSources.twitchVideo.title"
                    :start-time="300"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Auto-loaded Stream</CardTitle>
                <CardDescription>Loads immediately, muted</CardDescription>
              </CardHeader>
              <CardContent>
                <TwitchPlayer
                    type="stream"
                    :content-id="demoSources.twitchStream.id"
                    :title="demoSources.twitchStream.title"
                    :load-immediately="true"
                    :muted="true"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <!-- Comparison -->
      <TabsContent value="comparison" class="space-y-6">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold mb-2">Platform Comparison</h2>
          <p class="text-muted-foreground">
            Side-by-side comparison of YouTube and Twitch players
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div class="flex items-center justify-between">
                <CardTitle>YouTube</CardTitle>
                <Badge variant="secondary">Video Platform</Badge>
              </div>
              <CardDescription>Privacy-focused, extensive controls</CardDescription>
            </CardHeader>
            <CardContent>
              <VideoPlayer
                  :source="demoSources.youtube.url"
                  :title="demoSources.youtube.title"
                  :privacy-enhanced="true"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div class="flex items-center justify-between">
                <CardTitle>Twitch</CardTitle>
                <Badge variant="destructive">Live Streaming</Badge>
              </div>
              <CardDescription>Live streams and VODs, chat integration</CardDescription>
            </CardHeader>
            <CardContent>
              <VideoPlayer
                  :source="demoSources.twitchStream.url"
                  :title="demoSources.twitchStream.title"
                  parent="localhost"
              />
            </CardContent>
          </Card>
        </div>

        <!-- Features Comparison Table -->
        <Card>
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                <tr class="border-b">
                  <th class="text-left p-3">Feature</th>
                  <th class="text-center p-3">YouTube</th>
                  <th class="text-center p-3">Twitch</th>
                </tr>
                </thead>
                <tbody class="divide-y">
                <tr>
                  <td class="p-3 font-medium">Auto-detection</td>
                  <td class="p-3 text-center">✅</td>
                  <td class="p-3 text-center">✅</td>
                </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>

    <!-- Usage Examples -->
    <Card>
      <CardHeader>
        <CardTitle>Usage Examples</CardTitle>
        <CardDescription>Copy these code snippets to use in your project</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h4 class="font-medium mb-2">Universal Player (Recommended)</h4>
            <pre class="text-xs bg-muted p-3 rounded-md overflow-x-auto"><code>&lt;VideoPlayer
  source="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  title="My Video"
  :autoplay="false"
  :privacy-enhanced="true"
/&gt;</code></pre>
          </div>

          <div>
            <h4 class="font-medium mb-2">YouTube Player</h4>
            <pre class="text-xs bg-muted p-3 rounded-md overflow-x-auto"><code>&lt;YouTubePlayer
  video-id="dQw4w9WgXcQ"
  title="Never Gonna Give You Up"
  :privacy-enhanced="true"
  :start-time="30"
/&gt;</code></pre>
          </div>

          <div>
            <h4 class="font-medium mb-2">Twitch Stream</h4>
            <pre class="text-xs bg-muted p-3 rounded-md overflow-x-auto"><code>&lt;TwitchPlayer
  type="stream"
  content-id="shroud"
  title="Live Stream"
  :show-chat="true"
  parent="localhost"
/&gt;</code></pre>
          </div>

          <div>
            <h4 class="font-medium mb-2">Twitch VOD</h4>
            <pre class="text-xs bg-muted p-3 rounded-md overflow-x-auto"><code>&lt;TwitchPlayer
  type="video"
  content-id="123456789"
  title="Past Broadcast"
  :start-time="300"
  parent="localhost"
/&gt;</code></pre>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Features Documentation -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">🎯 Universal Detection</CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>• Automatic platform detection from URLs</p>
          <p>• Support for direct IDs and full URLs</p>
          <p>• Fallback error handling</p>
          <p>• Platform override options</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="text-lg">🔒 Privacy & Performance</CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>• YouTube privacy-enhanced mode</p>
          <p>• Lazy loading with thumbnails</p>
          <p>• Minimal data transfer until play</p>
          <p>• Configurable autoplay policies</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="text-lg">🎨 Customization</CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>• Multiple aspect ratios</p>
          <p>• Start/end time controls</p>
          <p>• Theme and styling options</p>
          <p>• Responsive design</p>
        </CardContent>
      </Card>
    </div>

    <!-- Installation Instructions -->
    <Card>
      <CardHeader>
        <CardTitle>Installation & Setup</CardTitle>
        <CardDescription>How to add these components to your project</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div>
          <h4 class="font-medium mb-2">1. Import Components</h4>
          <pre class="text-xs bg-muted p-3 rounded-md overflow-x-auto"><code>import { VideoPlayer, YouTubePlayer, TwitchPlayer } from '@/components/media'</code></pre>
        </div>

        <div>
          <h4 class="font-medium mb-2">2. Basic Usage</h4>
          <pre class="text-xs bg-muted p-3 rounded-md overflow-x-auto"><code>&lt;template&gt;
  &lt;VideoPlayer
    source="your-video-url-here"
    title="Your Video Title"
    parent="your-domain.com"
  /&gt;
&lt;/template&gt;</code></pre>
        </div>

        <div>
          <h4 class="font-medium mb-2">3. Advanced Configuration</h4>
          <pre class="text-xs bg-muted p-3 rounded-md overflow-x-auto"><code>&lt;VideoPlayer
  source="https://www.twitch.tv/shroud"
  title="Live Gaming Stream"
  :show-chat="true"
  :autoplay="false"
  :muted="true"
  aspect-ratio="wide"
  parent="localhost"
  class="max-w-4xl mx-auto"
/&gt;</code></pre>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
/* Demo page specific styles */
pre {
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
}

code {
  font-family: inherit;
}

/* Ensure tables are properly styled */
table {
  border-collapse: collapse;
}

/* Make badges more visible */
.badge {
  font-weight: 600;
}

/* Custom scrollbar for code blocks */
pre::-webkit-scrollbar {
  height: 4px;
}

pre::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

pre::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground));
  border-radius: 2px;
}

pre::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--foreground));
}
</style>
