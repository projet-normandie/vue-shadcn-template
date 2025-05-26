<!-- src/views/rules/Rules.en.vue -->
<script setup lang="ts">
import { Shield, AlertTriangle, Users, MessageSquare, Ban, CheckCircle } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Rules data for English
const rulesData = {
  general: {
    title: 'General Rules',
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    rules: [
      {
        id: 'respect',
        title: 'Respect and courtesy',
        description: 'Treat all community members with respect and courtesy. Insults, harassment, or any hostile behavior will not be tolerated.',
        severity: 'high'
      },
      {
        id: 'no-spam',
        title: 'No spam or repetitive content',
        description: 'Avoid posting the same content multiple times or spamming. Each contribution should add value to the discussion.',
        severity: 'medium'
      },
      {
        id: 'appropriate-content',
        title: 'Appropriate content only',
        description: 'Content must be appropriate for all ages. No explicit, violent, or offensive content is allowed.',
        severity: 'high'
      },
      {
        id: 'authentic-identity',
        title: 'Authentic identity',
        description: 'Use your real identity or a consistent pseudonym. Fake accounts and identity impersonation are prohibited.',
        severity: 'high'
      }
    ]
  },
  community: {
    title: 'Community Life',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    rules: [
      {
        id: 'constructive-discussions',
        title: 'Constructive discussions',
        description: 'Participate in constructive and respectful discussions. Debates are encouraged but must remain civil.',
        severity: 'low'
      },
      {
        id: 'help-others',
        title: 'Community support',
        description: 'Help new members and share your knowledge. A strong community is built together.',
        severity: 'low'
      },
      {
        id: 'report-issues',
        title: 'Report issues',
        description: 'Report any inappropriate content or behavior to moderators rather than responding aggressively.',
        severity: 'medium'
      },
      {
        id: 'follow-topics',
        title: 'Stay on topic',
        description: 'Keep your contributions relevant to the discussion topic or article category.',
        severity: 'low'
      }
    ]
  },
  comments: {
    title: 'Comments and Posts',
    icon: MessageSquare,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    rules: [
      {
        id: 'quality-comments',
        title: 'Quality comments',
        description: 'Write thoughtful and well-articulated comments. Avoid single-word comments or those without added value.',
        severity: 'low'
      },
      {
        id: 'no-personal-attacks',
        title: 'No personal attacks',
        description: 'Criticize ideas, not people. Personal attacks and insults result in immediate sanctions.',
        severity: 'high'
      },
      {
        id: 'no-hate-speech',
        title: 'No hate speech',
        description: 'No form of discrimination, racism, sexism, or hate speech is tolerated on the platform.',
        severity: 'high'
      },
      {
        id: 'fact-checking',
        title: 'Fact-checking',
        description: 'Verify your sources before sharing information. Deliberate misinformation is sanctioned.',
        severity: 'medium'
      }
    ]
  },
  sanctions: {
    title: 'Sanctions and Moderation',
    icon: Ban,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    rules: [
      {
        id: 'warning-system',
        title: 'Warning system',
        description: 'First offense: warning. Second offense: temporary suspension. Third offense: ban.',
        severity: 'high'
      },
      {
        id: 'immediate-ban',
        title: 'Immediate ban',
        description: 'Certain behaviors (severe harassment, illegal content, mass spam) result in immediate banning.',
        severity: 'high'
      },
      {
        id: 'appeal-process',
        title: 'Appeal process',
        description: 'You can contest a sanction by contacting the moderation team with supporting evidence.',
        severity: 'medium'
      },
      {
        id: 'repeat-offenses',
        title: 'Repeat offenses',
        description: 'Repeat offenders face more severe sanctions. Infraction history is maintained.',
        severity: 'medium'
      }
    ]
  }
}

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case 'high':
      return { variant: 'destructive', text: 'Strict' }
    case 'medium':
      return { variant: 'default', text: 'Important' }
    case 'low':
      return { variant: 'secondary', text: 'Recommended' }
    default:
      return { variant: 'outline', text: 'Info' }
  }
}
</script>

<template>
  <div class="container mx-auto max-w-4xl px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="flex justify-center mb-4">
        <div class="bg-primary/10 rounded-full p-3">
          <Shield class="h-8 w-8 text-primary" />
        </div>
      </div>
      <h1 class="text-3xl font-bold mb-2">Community Rules</h1>
      <p class="text-muted-foreground text-lg">
        Together, let's build a respectful and welcoming community
      </p>
    </div>

    <!-- Important Notice -->
    <Card class="mb-8 border-amber-200 bg-amber-50">
      <CardContent class="pt-6">
        <div class="flex items-start gap-3">
          <AlertTriangle class="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 class="font-semibold text-amber-800 mb-2">Important to know</h3>
            <p class="text-amber-700 text-sm">
              These rules apply to all platform users. By creating an account,
              you agree to follow these rules. Any violation may result in sanctions
              ranging from warnings to permanent bans.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Rules Sections -->
    <div class="space-y-8">
      <div
          v-for="(section, key) in rulesData"
          :key="key"
          class="space-y-4"
      >
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-3">
              <div :class="[section.bgColor, 'p-2 rounded-lg']">
                <component :is="section.icon" :class="[section.color, 'h-6 w-6']" />
              </div>
              {{ section.title }}
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div
                v-for="rule in section.rules"
                :key="rule.id"
                class="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div class="flex items-start justify-between gap-4 mb-2">
                <h4 class="font-semibold">{{ rule.title }}</h4>
                <Badge
                    :variant="getSeverityBadge(rule.severity).variant"
                    class="flex-shrink-0"
                >
                  {{ getSeverityBadge(rule.severity).text }}
                </Badge>
              </div>
              <p class="text-muted-foreground text-sm leading-relaxed">
                {{ rule.description }}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Footer -->
    <Card class="mt-8">
      <CardContent class="pt-6">
        <div class="text-center">
          <div class="flex justify-center mb-4">
            <CheckCircle class="h-8 w-8 text-green-600" />
          </div>
          <h3 class="text-lg font-semibold mb-2">Thank you for being part of our community</h3>
          <p class="text-muted-foreground mb-4">
            By following these rules, you help create a positive environment for everyone.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <span class="text-muted-foreground">
              <strong>Last updated:</strong> {{ new Date().toLocaleDateString('en-US') }}
            </span>
            <span class="hidden sm:inline text-muted-foreground">•</span>
            <a
                href="/contact"
                class="text-primary hover:underline font-medium"
            >
              Have a question? Contact us
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.container {
  scroll-behavior: smooth;
}
</style>
