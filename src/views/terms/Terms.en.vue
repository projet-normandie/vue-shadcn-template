<!-- src/views/terms/Terms.en.vue -->
<script setup lang="ts">
import { FileText, Users, Shield, AlertTriangle, Scale, Ban, CheckCircle, Mail } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card'

// Terms sections data for English
const termsData = {
  acceptance: {
    title: 'Acceptance of Terms',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    sections: [
      {
        id: 'agreement',
        title: 'Contractual agreement',
        content: `
          <p>By creating an account or using our platform, you agree to be bound by these Terms of Service (ToS).</p>
          <p><strong>If you do not accept these terms, you must not use our services.</strong></p>
          <ul>
            <li>These ToS constitute a legally binding contract between you and us</li>
            <li>Your continued use of the service constitutes acceptance of any modifications</li>
            <li>We reserve the right to modify these terms at any time</li>
            <li>Important changes will be notified to you by email</li>
          </ul>
        `
      },
      {
        id: 'eligibility',
        title: 'Eligibility requirements',
        content: `
          <p>To use our service, you must:</p>
          <ul>
            <li>Be at least <strong>13 years old</strong> (or legal age in your country)</li>
            <li>Provide accurate and complete information during registration</li>
            <li>Maintain the security of your account and password</li>
            <li>Accept responsibility for all activity under your account</li>
            <li>Not have been previously banned from our platform</li>
          </ul>
        `
      }
    ]
  },
  services: {
    title: 'Service Description',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    sections: [
      {
        id: 'platform-services',
        title: 'Services provided',
        content: `
          <p>Our platform offers you:</p>
          <ul>
            <li><strong>Article consultation:</strong> free access to published content</li>
            <li><strong>Comment system:</strong> participation in discussions</li>
            <li><strong>User profile:</strong> management of your personal information</li>
            <li><strong>Notifications:</strong> alerts about your account activity</li>
            <li><strong>Multilingual interface:</strong> use in French and English</li>
          </ul>
          <p>We strive to maintain service availability 24/7, but do not guarantee uninterrupted availability.</p>
        `
      },
      {
        id: 'service-evolution',
        title: 'Service evolution',
        content: `
          <p>We reserve the right to:</p>
          <ul>
            <li>Modify, suspend or discontinue all or part of the service</li>
            <li>Add or remove features</li>
            <li>Perform scheduled or emergency maintenance</li>
            <li>Update the user interface</li>
          </ul>
          <p>Important changes will be communicated with reasonable notice.</p>
        `
      }
    ]
  },
  userObligations: {
    title: 'User Obligations',
    icon: Shield,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    sections: [
      {
        id: 'prohibited-conduct',
        title: 'Prohibited conduct',
        content: `
          <p>It is strictly forbidden to:</p>
          <ul>
            <li><strong>Publish illegal content:</strong> defamation, harassment, hate speech</li>
            <li><strong>Violate intellectual property:</strong> plagiarism, counterfeiting</li>
            <li><strong>Compromise security:</strong> hacking, phishing, malware</li>
            <li><strong>Spam:</strong> repetitive messages, unsolicited advertising</li>
            <li><strong>Impersonate identity:</strong> pretending to be someone else</li>
            <li><strong>Circumvent restrictions:</strong> creating multiple accounts after being banned</li>
          </ul>
        `
      },
      {
        id: 'content-responsibility',
        title: 'Content responsibility',
        content: `
          <p>You are fully responsible for the content you publish:</p>
          <ul>
            <li>Your comments must respect our community guidelines</li>
            <li>You guarantee that you hold the rights to the content published</li>
            <li>You accept that your content will be moderated</li>
            <li>You waive any claims against us regarding moderation</li>
          </ul>
          <p><strong>We reserve the right to remove any inappropriate content without notice.</strong></p>
        `
      }
    ]
  },
  intellectualProperty: {
    title: 'Intellectual Property',
    icon: Scale,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    sections: [
      {
        id: 'our-content',
        title: 'Our content',
        content: `
          <p>The platform content belongs to us or is used under license:</p>
          <ul>
            <li><strong>Articles:</strong> texts, images, videos published by our teams</li>
            <li><strong>Interface:</strong> design, code, technical architecture</li>
            <li><strong>Trademarks:</strong> logo, name, visual identity elements</li>
            <li><strong>Features:</strong> algorithms, technical processes</li>
          </ul>
          <p>Any reproduction without authorization is prohibited and constitutes counterfeiting.</p>
        `
      },
      {
        id: 'user-content',
        title: 'User content',
        content: `
          <p>Regarding the content you publish:</p>
          <ul>
            <li>You retain ownership of your content</li>
            <li>You grant us a license to display and process it</li>
            <li>This license is worldwide, non-exclusive and free</li>
            <li>It includes the right to moderate and delete content</li>
            <li>The license expires if you delete your content</li>
          </ul>
        `
      }
    ]
  },
  liability: {
    title: 'Liability and Warranties',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    sections: [
      {
        id: 'service-availability',
        title: 'Service availability',
        content: `
          <p>Regarding the availability of our services:</p>
          <ul>
            <li>We strive to keep the service accessible</li>
            <li>No guarantee of 100% availability is provided</li>
            <li>Interruptions may occur for maintenance</li>
            <li>We are not responsible for technical failures</li>
            <li>Force majeure cases release us from any liability</li>
          </ul>
        `
      },
      {
        id: 'limitation-liability',
        title: 'Limitation of liability',
        content: `
          <p>Our liability is limited in the following cases:</p>
          <ul>
            <li><strong>User content:</strong> we are not responsible for comments</li>
            <li><strong>External links:</strong> no responsibility for third-party sites</li>
            <li><strong>Data loss:</strong> back up your important information</li>
            <li><strong>Indirect damages:</strong> no liability for indirect harm</li>
          </ul>
          <p>In case of proven damage, our liability is limited to the amount of fees paid (free service = $0).</p>
        `
      }
    ]
  },
  termination: {
    title: 'Termination and Sanctions',
    icon: Ban,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    sections: [
      {
        id: 'account-termination',
        title: 'Account termination',
        content: `
          <p>Your account may be terminated in the following cases:</p>
          <ul>
            <li><strong>At your request:</strong> voluntary deletion of your account</li>
            <li><strong>ToS violation:</strong> non-compliance with rules</li>
            <li><strong>Abusive behavior:</strong> harassment, persistent spam</li>
            <li><strong>Prolonged inactivity:</strong> after 2 years without connection</li>
            <li><strong>Service closure:</strong> platform shutdown</li>
          </ul>
        `
      },
      {
        id: 'consequences',
        title: 'Consequences of termination',
        content: `
          <p>In case of account termination:</p>
          <ul>
            <li>You lose access to your profile and data</li>
            <li>Your comments may be kept (anonymized)</li>
            <li>Personal data is deleted according to our policy</li>
            <li>You cannot create a new account without authorization</li>
            <li>Legal obligations survive termination</li>
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
          <FileText class="h-8 w-8 text-primary" />
        </div>
      </div>
      <h1 class="text-3xl font-bold mb-2">Terms of Service</h1>
      <p class="text-muted-foreground text-lg">
        The rules that govern the use of our platform
      </p>
    </div>

    <!-- Important Notice -->
    <Card class="mb-8 border-amber-200 bg-amber-50">
      <CardContent class="pt-6">
        <div class="flex items-start gap-3">
          <AlertTriangle class="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 class="font-semibold text-amber-800 mb-2">Legally binding contract</h3>
            <p class="text-amber-700 text-sm">
              These Terms of Service constitute a legal contract between you and our platform.
              By using our services, you agree to be bound by these terms.
              Please read them carefully before continuing.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Terms Sections -->
    <div class="space-y-8">
      <div
          v-for="(section, key) in termsData"
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

    <!-- Legal Information -->
    <div class="grid md:grid-cols-2 gap-6 mt-8">
      <!-- Contact Legal -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Mail class="h-5 w-5 text-primary" />
            Legal Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground mb-4">
            For any questions regarding these ToS:
          </p>
          <div class="space-y-2 text-sm">
            <p><strong>Email:</strong> legal@example.com</p>
            <p><strong>Mail:</strong></p>
            <address class="ml-4 not-italic text-muted-foreground">
              Legal Department<br>
              123 ToS Street<br>
              75000 Paris, France
            </address>
          </div>
        </CardContent>
      </Card>

      <!-- Governing Law -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Scale class="h-5 w-5 text-primary" />
            Governing Law
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-3 text-sm">
            <div>
              <p class="font-semibold">Applicable law:</p>
              <p class="text-muted-foreground">French law</p>
            </div>
            <div>
              <p class="font-semibold">Jurisdiction:</p>
              <p class="text-muted-foreground">Paris courts</p>
            </div>
            <div>
              <p class="font-semibold">Language:</p>
              <p class="text-muted-foreground">French version prevails</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Footer -->
    <Card class="mt-8">
      <CardContent class="pt-6">
        <div class="text-center">
          <CheckCircle class="h-8 w-8 text-green-600 mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2">Responsible Usage</h3>
          <p class="text-muted-foreground mb-4">
            By respecting these terms, you help maintain a healthy and respectful community for everyone.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <span class="text-muted-foreground">
              <strong>Version effective since:</strong> {{ currentDate }}
            </span>
            <span class="hidden sm:inline text-muted-foreground">•</span>
            <a
                href="/rules"
                class="text-primary hover:underline font-medium"
            >
              View community guidelines
            </a>
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
