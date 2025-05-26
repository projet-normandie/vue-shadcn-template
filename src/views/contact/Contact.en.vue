<!-- src/views/contact/Contact.en.vue -->
<script setup lang="ts">
import { Mail, MessageCircle, Clock, User, Shield, Bug, Lightbulb } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Contact methods data for English
const contactMethods = [
  {
    id: 'email-general',
    title: 'General Email',
    subtitle: 'For all your questions',
    icon: Mail,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    contact: 'contact@example.com',
    description: 'General questions, suggestions, feedback',
    responseTime: '24-48h average',
    available: true
  },
  {
    id: 'discord',
    title: 'Discord Server',
    subtitle: 'Community and quick support',
    icon: MessageCircle,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    contact: 'discord.gg/your-server',
    description: 'Real-time chat, community help',
    responseTime: 'Immediate (when available)',
    available: true
  }
]

// Specialized contacts
const specializedContacts = [
  {
    id: 'support',
    title: 'Technical Support',
    icon: Bug,
    email: 'support@example.com',
    description: 'Bugs, technical issues, malfunctions'
  },
  {
    id: 'privacy',
    title: 'Data Protection',
    icon: Shield,
    email: 'dpo@example.com',
    description: 'GDPR, privacy, data deletion'
  },
  {
    id: 'suggestions',
    title: 'Suggestions & Ideas',
    icon: Lightbulb,
    email: 'ideas@example.com',
    description: 'New features, improvements'
  },
  {
    id: 'business',
    title: 'Partnerships',
    icon: User,
    email: 'business@example.com',
    description: 'Collaborations, partnerships, opportunities'
  }
]

// Office hours
const officeHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Weekend', hours: 'Limited support' },
  { day: 'Discord', hours: '24/7 (community)' }
]
</script>

<template>
  <div class="container mx-auto max-w-4xl px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="flex justify-center mb-4">
        <div class="bg-primary/10 rounded-full p-3">
          <Mail class="h-8 w-8 text-primary" />
        </div>
      </div>
      <h1 class="text-3xl font-bold mb-2">Contact Us</h1>
      <p class="text-muted-foreground text-lg">
        Multiple ways to reach us and get help
      </p>
    </div>

    <!-- Main Contact Methods -->
    <div class="grid md:grid-cols-2 gap-6 mb-8">
      <div
          v-for="method in contactMethods"
          :key="method.id"
          class="transform transition-transform hover:scale-105"
      >
        <Card class="h-full">
          <CardHeader>
            <CardTitle class="flex items-center gap-3">
              <div :class="[method.bgColor, 'p-3 rounded-lg']">
                <component :is="method.icon" :class="[method.color, 'h-6 w-6']" />
              </div>
              <div>
                <h3 class="font-semibold">{{ method.title }}</h3>
                <p class="text-sm text-muted-foreground font-normal">{{ method.subtitle }}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <!-- Contact Info -->
            <div class="bg-muted/50 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Contact</Badge>
                <Badge v-if="method.available" variant="outline" class="text-green-600">
                  ● Available
                </Badge>
              </div>
              <p class="font-mono text-sm bg-background px-3 py-2 rounded border">
                {{ method.contact }}
              </p>
            </div>

            <!-- Description -->
            <div>
              <p class="text-sm text-muted-foreground mb-2">{{ method.description }}</p>
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock class="h-3 w-3" />
                <span>{{ method.responseTime }}</span>
              </div>
            </div>

            <!-- Action Button -->
            <div class="pt-2">
              <a
                  v-if="method.id === 'email-general'"
                  :href="`mailto:${method.contact}`"
                  class="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                <Mail class="h-4 w-4" />
                Send email
              </a>
              <a
                  v-else-if="method.id === 'discord'"
                  :href="`https://${method.contact}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                <MessageCircle class="h-4 w-4" />
                Join Discord
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Specialized Contacts -->
    <Card class="mb-8">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <User class="h-5 w-5 text-primary" />
          Specialized Contacts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid sm:grid-cols-2 gap-4">
          <div
              v-for="contact in specializedContacts"
              :key="contact.id"
              class="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
          >
            <div class="flex items-start gap-3">
              <div class="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                <component :is="contact.icon" class="h-4 w-4 text-primary" />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-sm mb-1">{{ contact.title }}</h4>
                <p class="text-xs text-muted-foreground mb-2 leading-relaxed">
                  {{ contact.description }}
                </p>
                <a
                    :href="`mailto:${contact.email}`"
                    class="text-xs text-primary hover:underline font-mono"
                >
                  {{ contact.email }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Additional Info -->
    <div class="grid md:grid-cols-2 gap-6 mb-8">
      <!-- Office Hours -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Clock class="h-5 w-5 text-primary" />
            Support Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-3">
            <div
                v-for="schedule in officeHours"
                :key="schedule.day"
                class="flex justify-between items-center py-2 border-b last:border-b-0"
            >
              <span class="font-medium text-sm">{{ schedule.day }}</span>
              <span class="text-sm text-muted-foreground">{{ schedule.hours }}</span>
            </div>
          </div>
          <div class="mt-4 p-3 bg-amber-50 rounded-lg">
            <p class="text-xs text-amber-700">
              <strong>Note:</strong> Responses may take longer on weekends and holidays.
            </p>
          </div>
        </CardContent>
      </Card>

      <!-- Response Times -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <MessageCircle class="h-5 w-5 text-primary" />
            Response Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div class="flex items-center gap-2">
                <div class="h-2 w-2 rounded-full bg-green-500"></div>
                <span class="text-sm font-medium">Discord</span>
              </div>
              <span class="text-sm text-muted-foreground">Real time</span>
            </div>

            <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div class="flex items-center gap-2">
                <div class="h-2 w-2 rounded-full bg-blue-500"></div>
                <span class="text-sm font-medium">General email</span>
              </div>
              <span class="text-sm text-muted-foreground">24-48h</span>
            </div>

            <div class="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div class="flex items-center gap-2">
                <div class="h-2 w-2 rounded-full bg-orange-500"></div>
                <span class="text-sm font-medium">Technical support</span>
              </div>
              <span class="text-sm text-muted-foreground">2-5 days</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Footer -->
    <Card>
      <CardContent class="pt-6">
        <div class="text-center">
          <MessageCircle class="h-8 w-8 text-primary mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2">We're here to help</h3>
          <p class="text-muted-foreground mb-4">
            Don't hesitate to contact us for any question, suggestion or problem.
            Our team is at your disposal!
          </p>
          <div class="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">English Support</Badge>
            <Badge variant="outline">Active Community</Badge>
            <Badge variant="outline">Quick Response</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.transform {
  transition: transform 0.2s ease-in-out;
}
</style>
