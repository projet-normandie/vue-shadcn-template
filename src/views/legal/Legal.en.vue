<!-- src/views/legal/Legal.en.vue -->
<script setup lang="ts">
import { Scale, Building, Phone, Mail, Globe, Calendar, Shield, AlertTriangle } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Legal information data for English
const legalData = {
  company: {
    title: 'Publisher Information',
    icon: Building,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    sections: [
      {
        id: 'company-info',
        title: 'Publishing company',
        content: `
          <div class="space-y-3">
            <div>
              <strong>Company name:</strong> My Application SAS<br>
              <strong>Legal form:</strong> Simplified Joint Stock Company<br>
              <strong>Share capital:</strong> €10,000<br>
              <strong>SIRET:</strong> 123 456 789 00012<br>
              <strong>APE/NAF code:</strong> 6201Z (Computer programming)
            </div>
            <div>
              <strong>Registered office:</strong><br>
              123 Tech Street<br>
              75001 Paris, France
            </div>
            <div>
              <strong>Trade Register:</strong> Paris B 123 456 789<br>
              <strong>EU VAT Number:</strong> FR12345678901
            </div>
          </div>
        `
      },
      {
        id: 'management',
        title: 'Management and legal representation',
        content: `
          <div class="space-y-2">
            <div>
              <strong>President:</strong> Mr. Jean DUPONT<br>
              <strong>Publication Director:</strong> Mr. Jean DUPONT
            </div>
            <div>
              <strong>Editorial Manager:</strong> Mrs. Marie MARTIN<br>
              <strong>Email:</strong> editorial@example.com
            </div>
          </div>
        `
      }
    ]
  },
  contact: {
    title: 'Contact Information',
    icon: Phone,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    sections: [
      {
        id: 'contact-info',
        title: 'Contact us',
        content: `
          <div class="space-y-3">
            <div>
              <strong>Postal address:</strong><br>
              My Application SAS<br>
              123 Tech Street<br>
              75001 Paris, France
            </div>
            <div>
              <strong>Phone:</strong> +33 1 23 45 67 89<br>
              <strong>General email:</strong> contact@example.com<br>
              <strong>Support email:</strong> support@example.com
            </div>
            <div>
              <strong>Business hours:</strong><br>
              Monday to Friday: 9:00 AM - 6:00 PM<br>
              Closed on weekends and public holidays
            </div>
          </div>
        `
      }
    ]
  },
  hosting: {
    title: 'Web Hosting',
    icon: Globe,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    sections: [
      {
        id: 'hosting-info',
        title: 'Hosting provider',
        content: `
          <div class="space-y-3">
            <div>
              <strong>Host:</strong> OVH SAS<br>
              <strong>Head office:</strong> 2 rue Kellermann, 59100 Roubaix, France<br>
              <strong>Phone:</strong> 1007 (non-premium number)
            </div>
            <div>
              <strong>Servers:</strong> European Union (GDPR compliant)<br>
              <strong>Data location:</strong> France and Germany<br>
              <strong>Security:</strong> SSL/TLS encryption, daily backups
            </div>
          </div>
        `
      },
      {
        id: 'technical-info',
        title: 'Technical information',
        content: `
          <div class="space-y-2">
            <div>
              <strong>Technologies used:</strong><br>
              • Frontend: Vue.js 3, TypeScript, Tailwind CSS<br>
              • Backend: Symfony 7, PHP 8.3<br>
              • Database: PostgreSQL<br>
              • CDN: CloudFlare
            </div>
            <div>
              <strong>Security certificates:</strong><br>
              • SSL/TLS Let's Encrypt<br>
              • Mandatory HTTPS compliance<br>
              • Security headers (HSTS, CSP)
            </div>
          </div>
        `
      }
    ]
  },
  legal: {
    title: 'Legal Aspects',
    icon: Scale,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    sections: [
      {
        id: 'applicable-law',
        title: 'Applicable law and jurisdiction',
        content: `
          <div class="space-y-2">
            <div>
              <strong>Applicable law:</strong> French law<br>
              <strong>Competent jurisdiction:</strong> Paris courts<br>
              <strong>Reference language:</strong> French
            </div>
            <div>
              <strong>In case of dispute:</strong><br>
              Any dispute relating to the use of this site will be subject
              to the exclusive jurisdiction of the Paris courts,
              notwithstanding plurality of defendants or third-party proceedings.
            </div>
          </div>
        `
      },
      {
        id: 'intellectual-property',
        title: 'Intellectual property',
        content: `
          <div class="space-y-2">
            <div>
              <strong>Copyright:</strong><br>
              All content on this site (texts, images, videos, logos, etc.)
              is protected by copyright and belongs to My Application SAS
              or its partners.
            </div>
            <div>
              <strong>Authorized use:</strong><br>
              Consultation and use of the site for personal purposes
              are authorized. Any reproduction, representation, modification,
              publication or transmission of all or part of the content,
              by any process whatsoever, is strictly prohibited
              without prior written authorization.
            </div>
          </div>
        `
      }
    ]
  },
  privacy: {
    title: 'Data Protection',
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    sections: [
      {
        id: 'data-protection',
        title: 'GDPR compliance',
        content: `
          <div class="space-y-2">
            <div>
              <strong>Data controller:</strong> My Application SAS<br>
              <strong>DPO (Data Protection Officer):</strong><br>
              Email: dpo@example.com<br>
              Mail: DPO - My Application SAS, 123 Tech Street, 75001 Paris
            </div>
            <div>
              <strong>Processing purposes:</strong><br>
              • User account management<br>
              • Service operation (comments, preferences)<br>
              • Service improvement<br>
              • Communication with users
            </div>
          </div>
        `
      },
      {
        id: 'user-rights',
        title: 'Your rights',
        content: `
          <div class="space-y-2">
            <div>
              In accordance with GDPR, you have the following rights:
            </div>
            <div>
              • <strong>Right of access</strong> to your personal data<br>
              • <strong>Right of rectification</strong> of your data<br>
              • <strong>Right to erasure</strong> (right to be forgotten)<br>
              • <strong>Right to data portability</strong><br>
              • <strong>Right to object</strong> to processing<br>
              • <strong>Right to restriction</strong> of processing
            </div>
            <div>
              <strong>To exercise your rights:</strong> dpo@example.com
            </div>
          </div>
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
          <Scale class="h-8 w-8 text-primary" />
        </div>
      </div>
      <h1 class="text-3xl font-bold mb-2">Legal Notice</h1>
      <p class="text-muted-foreground text-lg">
        Legal information relating to this website
      </p>
    </div>

    <!-- Important Notice -->
    <Card class="mb-8 border-blue-200 bg-blue-50">
      <CardContent class="pt-6">
        <div class="flex items-start gap-3">
          <AlertTriangle class="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 class="font-semibold text-blue-800 mb-2">Legal compliance</h3>
            <p class="text-blue-700 text-sm">
              In accordance with the provisions of law no. 2004-575 of June 21, 2004 for confidence
              in the digital economy, users of the site are informed of the identity of
              the various parties involved in its creation and monitoring.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Legal Sections -->
    <div class="space-y-8">
      <div
          v-for="(section, key) in legalData"
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

    <!-- Contact Information -->
    <div class="grid md:grid-cols-2 gap-6 mt-8">
      <!-- Quick Contact -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Mail class="h-5 w-5 text-primary" />
            Quick Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-3 text-sm">
            <div>
              <p class="font-semibold mb-2">General questions:</p>
              <p class="text-muted-foreground">contact@example.com</p>
            </div>
            <div>
              <p class="font-semibold mb-2">Technical support:</p>
              <p class="text-muted-foreground">support@example.com</p>
            </div>
            <div>
              <p class="font-semibold mb-2">Legal questions:</p>
              <p class="text-muted-foreground">legal@example.com</p>
            </div>
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
          <div class="space-y-3 text-sm">
            <p>
              <strong>Date:</strong> {{ currentDate }}
            </p>
            <p class="text-muted-foreground">
              This legal notice may be modified at any time.
              It is advisable to consult it regularly.
            </p>
            <div class="pt-2">
              <Badge variant="outline">Version 1.0</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Footer -->
    <Card class="mt-8">
      <CardContent class="pt-6">
        <div class="text-center">
          <Scale class="h-8 w-8 text-primary mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2">Transparency and compliance</h3>
          <p class="text-muted-foreground mb-4">
            We are committed to complying with current regulations and keeping
            this information up to date to ensure transparency in our activities.
          </p>
          <div class="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">LCEN Compliant</Badge>
            <Badge variant="outline">GDPR Compliant</Badge>
            <Badge variant="outline">EU Hosting</Badge>
            <Badge variant="outline">French Law</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.prose :deep(div) {
  margin-bottom: 0.75rem;
}

.prose :deep(strong) {
  font-weight: 600;
  color: hsl(var(--foreground));
}

.prose :deep(br) {
  margin-bottom: 0.25rem;
}
</style>
