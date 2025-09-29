<!-- src/views/PWASettings.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { Separator } from '@/shared/components/ui/separator'
import {
    Settings,
    Smartphone,
    Wifi,
    HardDrive,
    Shield,
    Bell,
    Info,
    Download,
    RefreshCw,
    Trash2
} from 'lucide-vue-next'

import PWAStatus from '@/features/pwa/components/PWAStatus.vue'
import OfflineIndicator from '@/features/pwa/components/OfflineIndicator.vue'
import { usePWA } from '@/features/pwa/composables/usePWA.ts'

const {
    isPWA,
    isOnline,
    canInstall,
    offlineReady,
    updateAvailable,
    storageUsed,
    storageQuota,
    storageUsagePercent,
    installApp,
    updateApp,
    clearCaches,
    getStorageInfo
} = usePWA()

// Local state
const isClearing = ref(false)
const isUpdating = ref(false)
const isInstalling = ref(false)

// Handle actions with loading states
const handleClearCaches = async () => {
    isClearing.value = true
    try {
        await clearCaches()
        await getStorageInfo() // Refresh storage info
    } finally {
        isClearing.value = false
    }
}

const handleUpdateApp = async () => {
    isUpdating.value = true
    try {
        await updateApp()
    } finally {
        isUpdating.value = false
    }
}

const handleInstallApp = async () => {
    isInstalling.value = true
    try {
        await installApp()
    } finally {
        isInstalling.value = false
    }
}
</script>

<template>
    <div class="container mx-auto max-w-4xl px-4 py-8 space-y-6">
        <!-- Header -->
        <div class="flex items-center gap-4">
            <div class="bg-primary/10 rounded-full p-3">
                <Settings class="h-6 w-6 text-primary" />
            </div>
            <div>
                <h1 class="text-3xl font-bold">PWA Settings</h1>
                <p class="text-muted-foreground">
                    Manage your Progressive Web App experience
                </p>
            </div>
        </div>

        <!-- Quick Status Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
                <CardContent class="pt-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-muted-foreground">App Mode</p>
                            <p class="text-2xl font-bold">{{ isPWA ? 'PWA' : 'Browser' }}</p>
                        </div>
                        <Smartphone :class="isPWA ? 'text-blue-600' : 'text-gray-400'" class="h-8 w-8" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent class="pt-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-muted-foreground">Connection</p>
                            <p class="text-2xl font-bold">{{ isOnline ? 'Online' : 'Offline' }}</p>
                        </div>
                        <Wifi :class="isOnline ? 'text-green-600' : 'text-red-600'" class="h-8 w-8" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent class="pt-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-muted-foreground">Storage Used</p>
                            <p class="text-2xl font-bold">{{ storageUsagePercent() }}%</p>
                        </div>
                        <HardDrive class="h-8 w-8 text-gray-600" />
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Main Content Tabs -->
        <Tabs default-value="overview" class="w-full">
            <TabsList class="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="installation">Installation</TabsTrigger>
                <TabsTrigger value="storage">Storage</TabsTrigger>
                <TabsTrigger value="offline">Offline</TabsTrigger>
            </TabsList>

            <!-- Overview Tab -->
            <TabsContent value="overview" class="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <Info class="h-5 w-5" />
                            App Status
                        </CardTitle>
                        <CardDescription>
                            Current status of your Progressive Web App
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PWAStatus />
                    </CardContent>
                </Card>

                <!-- Features Overview -->
                <Card>
                    <CardHeader>
                        <CardTitle>Available Features</CardTitle>
                        <CardDescription>
                            PWA capabilities currently available
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex items-center justify-between p-3 rounded-lg border">
                                <div class="flex items-center gap-3">
                                    <Smartphone class="h-5 w-5 text-blue-600" />
                                    <span class="font-medium">App Installation</span>
                                </div>
                                <Badge :variant="canInstall || isPWA ? 'default' : 'secondary'">
                                    {{ canInstall ? 'Available' : isPWA ? 'Installed' : 'Not Available' }}
                                </Badge>
                            </div>

                            <div class="flex items-center justify-between p-3 rounded-lg border">
                                <div class="flex items-center gap-3">
                                    <Shield class="h-5 w-5 text-green-600" />
                                    <span class="font-medium">Offline Support</span>
                                </div>
                                <Badge :variant="offlineReady ? 'default' : 'secondary'">
                                    {{ offlineReady ? 'Ready' : 'Loading' }}
                                </Badge>
                            </div>

                            <div class="flex items-center justify-between p-3 rounded-lg border">
                                <div class="flex items-center gap-3">
                                    <RefreshCw class="h-5 w-5 text-orange-600" />
                                    <span class="font-medium">Auto Updates</span>
                                </div>
                                <Badge variant="default">Active</Badge>
                            </div>

                            <div class="flex items-center justify-between p-3 rounded-lg border">
                                <div class="flex items-center gap-3">
                                    <Bell class="h-5 w-5 text-purple-600" />
                                    <span class="font-medium">Notifications</span>
                                </div>
                                <Badge variant="secondary">Future</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <!-- Installation Tab -->
            <TabsContent value="installation" class="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <Download class="h-5 w-5" />
                            App Installation
                        </CardTitle>
                        <CardDescription>
                            Install this app on your device for a native experience
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div v-if="isPWA" class="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="bg-green-100 rounded-full p-2">
                                    <Smartphone class="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 class="font-medium text-green-800">App is Installed</h3>
                                    <p class="text-sm text-green-600">
                                        You're currently using the installed PWA version
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div v-else-if="canInstall" class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="bg-blue-100 rounded-full p-2">
                                        <Download class="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 class="font-medium text-blue-800">Ready to Install</h3>
                                        <p class="text-sm text-blue-600">
                                            Install this app for quick access and better performance
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    @click="handleInstallApp"
                                    :disabled="isInstalling"
                                    class="gap-2"
                                >
                                    <Download class="h-4 w-4" />
                                    {{ isInstalling ? 'Installing...' : 'Install' }}
                                </Button>
                            </div>
                        </div>

                        <div v-else class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="bg-gray-100 rounded-full p-2">
                                    <Info class="h-5 w-5 text-gray-600" />
                                </div>
                                <div>
                                    <h3 class="font-medium text-gray-800">Installation Not Available</h3>
                                    <p class="text-sm text-gray-600">
                                        App installation is not supported on this device/browser
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Installation Benefits -->
                        <Separator />

                        <div>
                            <h4 class="font-medium mb-3">Benefits of Installing</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div class="flex items-center gap-2 text-sm">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Faster loading times</span>
                                </div>
                                <div class="flex items-center gap-2 text-sm">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Works offline</span>
                                </div>
                                <div class="flex items-center gap-2 text-sm">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>App icon on home screen</span>
                                </div>
                                <div class="flex items-center gap-2 text-sm">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Native app experience</span>
                                </div>
                                <div class="flex items-center gap-2 text-sm">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Automatic updates</span>
                                </div>
                                <div class="flex items-center gap-2 text-sm">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Reduced data usage</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <!-- Storage Tab -->
            <TabsContent value="storage" class="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <HardDrive class="h-5 w-5" />
                            Storage Management
                        </CardTitle>
                        <CardDescription>
                            Monitor and manage app storage usage
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                            <div class="text-center">
                                <p class="text-2xl font-bold">{{ storageUsed() }}</p>
                                <p class="text-sm text-muted-foreground">Used</p>
                            </div>
                            <div class="text-center">
                                <p class="text-2xl font-bold">{{ storageQuota() }}</p>
                                <p class="text-sm text-muted-foreground">Available</p>
                            </div>
                            <div class="text-center">
                                <p class="text-2xl font-bold">{{ storageUsagePercent() }}%</p>
                                <p class="text-sm text-muted-foreground">Usage</p>
                            </div>
                        </div>

                        <div class="flex justify-between items-center">
                            <div>
                                <h4 class="font-medium">Cache Management</h4>
                                <p class="text-sm text-muted-foreground">
                                    Clear cached data to free up storage space
                                </p>
                            </div>
                            <Button
                                @click="handleClearCaches"
                                :disabled="isClearing"
                                variant="outline"
                                class="gap-2"
                            >
                                <Trash2 class="h-4 w-4" />
                                {{ isClearing ? 'Clearing...' : 'Clear Cache' }}
                            </Button>
                        </div>

                        <Separator />

                        <div>
                            <h4 class="font-medium mb-3">Storage Categories</h4>
                            <div class="space-y-2">
                                <div class="flex justify-between items-center p-2 rounded">
                                    <span class="text-sm">App Resources</span>
                                    <Badge variant="secondary">Cached</Badge>
                                </div>
                                <div class="flex justify-between items-center p-2 rounded">
                                    <span class="text-sm">API Responses</span>
                                    <Badge variant="secondary">Cached</Badge>
                                </div>
                                <div class="flex justify-between items-center p-2 rounded">
                                    <span class="text-sm">Images</span>
                                    <Badge variant="secondary">Cached</Badge>
                                </div>
                                <div class="flex justify-between items-center p-2 rounded">
                                    <span class="text-sm">Fonts</span>
                                    <Badge variant="secondary">Cached</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <!-- Offline Tab -->
            <TabsContent value="offline" class="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <Shield class="h-5 w-5" />
                            Offline Capabilities
                        </CardTitle>
                        <CardDescription>
                            Manage how the app works when you're offline
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <!-- Current Status -->
                        <OfflineIndicator :show-when-online="true" position="relative" />

                        <Separator />

                        <!-- Offline Features -->
                        <div>
                            <h4 class="font-medium mb-3">Available Offline</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div class="flex items-center gap-2 text-sm">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Browse cached content</span>
                                </div>
                                <div class="flex items-center gap-2 text-sm">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>View profile settings</span>
                                </div>
                                <div class="flex items-center gap-2 text-sm">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Read cached articles</span>
                                </div>
                                <div class="flex items-center gap-2 text-sm">
                                    <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <span>Basic navigation</span>
                                </div>
                                <div class="flex items-center gap-2 text-sm">
                                    <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span>Login/authentication (requires internet)</span>
                                </div>
                                <div class="flex items-center gap-2 text-sm">
                                    <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span>New content (requires internet)</span>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <!-- Update Management -->
                        <div>
                            <h4 class="font-medium mb-3">Updates</h4>

                            <div v-if="updateAvailable" class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <div class="bg-blue-100 rounded-full p-2">
                                            <RefreshCw class="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 class="font-medium text-blue-800">Update Available</h3>
                                            <p class="text-sm text-blue-600">
                                                A new version of the app is ready to install
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        @click="handleUpdateApp"
                                        :disabled="isUpdating"
                                        class="gap-2"
                                    >
                                        <RefreshCw class="h-4 w-4" />
                                        {{ isUpdating ? 'Updating...' : 'Update Now' }}
                                    </Button>
                                </div>
                            </div>

                            <div v-else class="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div class="flex items-center gap-3">
                                    <div class="bg-green-100 rounded-full p-2">
                                        <RefreshCw class="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 class="font-medium text-green-800">Up to Date</h3>
                                        <p class="text-sm text-green-600">
                                            You're running the latest version of the app
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-4 text-sm text-muted-foreground">
                                <p>Updates are downloaded automatically in the background and applied when you reload the app.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
</template>
