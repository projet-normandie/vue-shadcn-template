<!-- src/views/about/About.en.vue -->
<script setup lang="ts">
import { Heart, Users, Target, Zap, Globe, Code, Shield, Lightbulb, Award, TrendingUp } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// About sections data for English
const aboutData = {
  mission: {
    title: 'Our Mission',
    icon: Target,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    content: `
      <p>We create a community platform where technology, gaming, and innovation enthusiasts can come together to share, learn, and grow together.</p>
      <p>Our goal is to democratize access to quality information and create a kind and constructive space for exchange.</p>
    `
  },
  story: {
    title: 'Our Story',
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    content: `
      <p>Born in 2024 from the passion of a few developers and content creators, this project started as a simple personal blog.</p>
      <p>Faced with community enthusiasm and positive feedback, we decided to transform this personal initiative into a true collaborative platform.</p>
      <p>Today, we are proud to have thousands of active users who contribute daily to enriching our content.</p>
    `
  },
  values: {
    title: 'Our Values',
    icon: Shield,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    content: `
      <p>Our core values guide every decision we make:</p>
      <ul>
        <li><strong>Transparency:</strong> Open communication about our choices and developments</li>
        <li><strong>Respect:</strong> Kindness and tolerance in all our exchanges</li>
        <li><strong>Innovation:</strong> Constant search for improvement and novelty</li>
        <li><strong>Community:</strong> Priority given to user needs and feedback</li>
        <li><strong>Quality:</strong> Excellence in content and user experience</li>
      </ul>
    `
  }
}

// Team members (you can customize these)
const teamMembers = [
  {
    name: 'Alex Martin',
    role: 'Founder & Developer',
    description: 'Passionate about web development and UX design',
    skills: ['Vue.js', 'Symfony', 'UI/UX'],
    avatar: '👨‍💻'
  },
  {
    name: 'Sarah Johnson',
    role: 'Community Manager',
    description: 'Animates the community and moderates content',
    skills: ['Communication', 'Moderation', 'Marketing'],
    avatar: '👩‍💼'
  },
  {
    name: 'Mike Chen',
    role: 'Technical Writer',
    description: 'Creates quality technical content',
    skills: ['Writing', 'Tech', 'Gaming'],
    avatar: '✍️'
  }
]

// Platform statistics
const statistics = [
  { label: 'Active users', value: '5.2K+', icon: Users },
  { label: 'Published articles', value: '850+', icon: Lightbulb },
  { label: 'Comments', value: '12K+', icon: Globe },
  { label: 'Response time', value: '<24h', icon: Zap }
]

// Key features
const features = [
  {
    title: 'Open Source',
    description: 'Open source code and community contributions',
    icon: Code,
    color: 'text-purple-600'
  },
  {
    title: 'Multilingual',
    description: 'Interface available in French and English',
    icon: Globe,
    color: 'text-blue-600'
  },
  {
    title: 'Secure',
    description: 'Data protection and robust authentication',
    icon: Shield,
    color: 'text-green-600'
  },
  {
    title: 'Scalable',
    description: 'New features based on your feedback',
    icon: TrendingUp,
    color: 'text-orange-600'
  }
]
</script>

<template>
  <div class="container mx-auto max-w-4xl px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-12">
      <div class="flex justify-center mb-6">
        <div class="bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full p-4">
          <Heart class="h-10 w-10 text-primary" />
        </div>
      </div>
      <h1 class="text-4xl font-bold mb-4">About Us</h1>
      <p class="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
        Discover the story, mission, and team behind this platform
        that brings together a passionate community of technology and innovation enthusiasts.
      </p>
    </div>

    <!-- Mission, Story, Values -->
    <div class="space-y-8 mb-12">
      <div
          v-for="(section, key) in aboutData"
          :key="key"
      >
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-3">
              <div :class="[section.bgColor, 'p-3 rounded-lg']">
                <component :is="section.icon" :class="[section.color, 'h-6 w-6']" />
              </div>
              {{ section.title }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
                class="prose dark:prose-invert max-w-none"
                v-html="section.content"
            />
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Statistics -->
    <Card class="mb-12">
      <CardHeader>
        <CardTitle class="text-center">Our Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
              v-for="stat in statistics"
              :key="stat.label"
              class="text-center"
          >
            <div class="bg-primary/10 rounded-full p-3 w-fit mx-auto mb-3">
              <component :is="stat.icon" class="h-6 w-6 text-primary" />
            </div>
            <div class="text-2xl font-bold text-primary mb-1">{{ stat.value }}</div>
            <div class="text-sm text-muted-foreground">{{ stat.label }}</div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Team -->
    <Card class="mb-12">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Users class="h-5 w-5 text-primary" />
          Our Team
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid md:grid-cols-3 gap-6">
          <div
              v-for="member in teamMembers"
              :key="member.name"
              class="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div class="text-4xl mb-3">{{ member.avatar }}</div>
            <h3 class="font-semibold mb-1">{{ member.name }}</h3>
            <p class="text-primary text-sm font-medium mb-2">{{ member.role }}</p>
            <p class="text-muted-foreground text-sm mb-3">{{ member.description }}</p>
            <div class="flex flex-wrap justify-center gap-1">
              <Badge
                  v-for="skill in member.skills"
                  :key="skill"
                  variant="outline"
                  class="text-xs"
              >
                {{ skill }}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Features -->
    <Card class="mb-12">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Award class="h-5 w-5 text-primary" />
          What makes us unique
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid md:grid-cols-2 gap-6">
          <div
              v-for="feature in features"
              :key="feature.title"
              class="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div class="bg-muted rounded-lg p-2 flex-shrink-0">
              <component :is="feature.icon" :class="[feature.color, 'h-5 w-5']" />
            </div>
            <div>
              <h4 class="font-semibold mb-1">{{ feature.title }}</h4>
              <p class="text-sm text-muted-foreground">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Call to Action -->
    <Card>
      <CardContent class="pt-6">
        <div class="text-center">
          <Users class="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 class="text-2xl font-bold mb-4">Join our community</h3>
          <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you're a developer, gamer, content creator, or simply passionate about technology,
            there's a place for you in our community. Share your knowledge,
            learn new things, and connect with people who share your passions.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink
                :to="{name: 'Register'}"
                class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              Create account
            </RouterLink>
            <RouterLink
                :to="{name: 'Contact'}"
                class="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Contact us
            </RouterLink>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.prose :deep(ul) {
  list-style-type: disc;
  list-style-position: inside;
  margin-left: 1rem;
}

.prose :deep(li) {
  margin-bottom: 0.5rem;
}

.prose :deep(p) {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.prose :deep(strong) {
  font-weight: 600;
  color: hsl(var(--foreground));
}
</style>
