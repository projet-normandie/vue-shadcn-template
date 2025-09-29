<!-- src/views/privacy/Privacy.en.vue -->
<script setup lang="ts">
import { Shield, Eye, Database, Cookie, Mail, Calendar, AlertTriangle, CheckCircle } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'

// Privacy sections data for English
const privacyData = {
  dataCollection: {
    title: 'Data Collection',
    icon: Database,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    sections: [
      {
        id: 'personal-data',
        title: 'Personal data collected',
        content: `
          <p>We collect the following data during your registration and usage:</p>
          <ul>
            <li><strong>Identification data:</strong> username, email address</li>
            <li><strong>Connection data:</strong> password (hashed), IP address, session tokens</li>
            <li><strong>Usage data:</strong> comments, articles viewed, language preferences</li>
            <li><strong>Technical data:</strong> browser type, operating system, screen resolution</li>
          </ul>
        `
      },
      {
        id: 'collection-purpose',
        title: 'Purpose of collection',
        content: `
          <p>Your data is collected to:</p>
          <ul>
            <li>Create and manage your user account</li>
            <li>Allow you to comment on articles</li>
            <li>Personalize your experience (language, preferences)</li>
            <li>Ensure platform security</li>
            <li>Improve our services through usage statistics</li>
          </ul>
        `
      }
    ]
  },
  dataUsage: {
    title: 'Data Usage',
    icon: Eye,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    sections: [
      {
        id: 'data-processing',
        title: 'Data processing',
        content: `
          <p>We use your data transparently:</p>
          <ul>
            <li><strong>Authentication:</strong> secure identification via JWT tokens</li>
            <li><strong>Personalization:</strong> display in your preferred language</li>
            <li><strong>Communication:</strong> important notifications about your account</li>
            <li><strong>Moderation:</strong> verification of community rules compliance</li>
          </ul>
        `
      },
      {
        id: 'data-sharing',
        title: 'Data sharing',
        content: `
          <p><strong>We never sell your personal data.</strong></p>
          <p>Your data may be shared only in the following cases:</p>
          <ul>
            <li>With your explicit consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and those of other users</li>
            <li>In case of company merger or acquisition (with prior notification)</li>
          </ul>
        `
      }
    ]
  },
  cookies: {
    title: 'Cookies and Tracking',
    icon: Cookie,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    sections: [
      {
        id: 'cookies-usage',
        title: 'Cookie usage',
        content: `
          <p>We use different types of cookies:</p>
          <ul>
            <li><strong>Essential cookies:</strong> authentication, security, language preferences</li>
            <li><strong>Analytics cookies:</strong> Google Analytics to understand usage (anonymized)</li>
            <li><strong>Comfort cookies:</strong> remembering your interface preferences</li>
          </ul>
          <p>You can disable non-essential cookies in your browser settings.</p>
        `
      },
      {
        id: 'third-party',
        title: 'Third-party services',
        content: `
          <p>We use third-party services that may collect data:</p>
          <ul>
            <li><strong>Google Analytics:</strong> anonymized usage statistics</li>
            <li><strong>Hosting:</strong> secure servers in Europe (GDPR compliant)</li>
            <li><strong>CDN:</strong> resource loading optimization</li>
          </ul>
        `
      }
    ]
  },
  rights: {
    title: 'Your GDPR Rights',
    icon: Shield,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    sections: [
      {
        id: 'gdpr-rights',
        title: 'Guaranteed rights',
        content: `
          <p>In accordance with GDPR, you have the following rights:</p>
          <ul>
            <li><strong>Right of access:</strong> view all data we have about you</li>
            <li><strong>Right of rectification:</strong> correct your personal data</li>
            <li><strong>Right to erasure:</strong> delete your account and data</li>
            <li><strong>Right to portability:</strong> retrieve your data in a standard format</li>
            <li><strong>Right to object:</strong> object to the processing of your data</li>
            <li><strong>Right to restriction:</strong> limit the use of your data</li>
          </ul>
        `
      },
      {
        id: 'exercise-rights',
        title: 'Exercise your rights',
        content: `
          <p>To exercise your rights, several options:</p>
          <ul>
            <li>Directly in your profile for data modification</li>
            <li>By contacting us at: <strong>privacy@example.com</strong></li>
            <li>By postal mail to our legal address</li>
          </ul>
          <p>We commit to respond within a maximum of <strong>30 days</strong>.</p>
        `
      }
    ]
  },
  security: {
    title: 'Security and Retention',
    icon: CheckCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    sections: [
      {
        id: 'data-security',
        title: 'Security measures',
        content: `
          <p>Your data is protected by:</p>
          <ul>
            <li><strong>Encryption:</strong> HTTPS for all communications</li>
            <li><strong>Authentication:</strong> secure JWT tokens with expiration</li>
            <li><strong>Passwords:</strong> bcrypt hashing, never stored in plain text</li>
            <li><strong>Servers:</strong> secure hosting with encrypted backups</li>
            <li><strong>Access:</strong> strictly limited to authorized personnel</li>
          </ul>
        `
      },
      {
        id: 'data-retention',
        title: 'Retention period',
        content: `
          <p>We retain your data for the following periods:</p>
          <ul>
            <li><strong>Active account:</strong> as long as your account exists</li>
            <li><strong>Deleted account:</strong> 30 days (to allow recovery)</li>
            <li><strong>Security logs:</strong> 12 months maximum</li>
            <li><strong>Anonymized statistics:</strong> unlimited (non-personal)</li>
          </ul>
        `
      }
    ]
  }
}

const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
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
      <h1 class="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p class="text-muted-foreground text-lg">
        How we collect, use and protect your personal data
      </p>
    </div>

    <!-- Important Notice -->
    <Card class="mb-8 border-blue-200 bg-blue-50">
      <CardContent class="pt-6">
        <div class="flex items-start gap-3">
          <AlertTriangle class="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 class="font-semibold text-blue-800 mb-2">Transparency commitment</h3>
            <p class="text-blue-700 text-sm">
              This privacy policy explains in detail how we process your personal data
              in accordance with the General Data Protection Regulation (GDPR).
              We are committed to protecting your privacy and giving you control over your information.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Privacy Sections -->
    <div class="space-y-8">
      <div
          v-for="(section, key) in privacyData"
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
          <CardContent class="space-y-6">
            <div
                v-for="item in section.sections"
                :key="item.id"
                class="border rounded-lg p-4"
            >
              <h4 class="font-semibold mb-3">{{ item.title }}</h4>
              <div
                  class="prose dark:prose-invert max-w-none text-sm"
                  v-html="item.content"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Contact and Updates -->
    <div class="grid md:grid-cols-2 gap-6 mt-8">
      <!-- Contact DPO -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Mail class="h-5 w-5 text-primary" />
            Contact DPO
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground mb-4">
            For any questions concerning your personal data:
          </p>
          <div class="space-y-2 text-sm">
            <p><strong>Email:</strong> dpo@example.com</p>
            <p><strong>Mail:</strong></p>
            <address class="ml-4 not-italic text-muted-foreground">
              DPO - Data Protection<br>
              123 Privacy Street<br>
              75000 Paris, France
            </address>
          </div>
        </CardContent>
      </Card>

      <!-- Last Update -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Calendar class="h-5 w-5 text-primary" />
            Last Update
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground mb-4">
            This policy was last updated on:
          </p>
          <p class="font-semibold">{{ currentDate }}</p>
          <p class="text-xs text-muted-foreground mt-2">
            We will notify you by email of any significant changes.
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Footer -->
    <Card class="mt-8">
      <CardContent class="pt-6">
        <div class="text-center">
          <CheckCircle class="h-8 w-8 text-green-600 mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2">Your data, your rights</h3>
          <p class="text-muted-foreground mb-4">
            We are committed to respecting your privacy and giving you complete control over your personal data.
          </p>
          <div class="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">GDPR Compliant</Badge>
            <Badge variant="outline">Europe Hosting</Badge>
            <Badge variant="outline">SSL Encryption</Badge>
            <Badge variant="outline">Secure Access</Badge>
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
}

.prose :deep(strong) {
  font-weight: 600;
  color: hsl(var(--foreground));
}
</style>
