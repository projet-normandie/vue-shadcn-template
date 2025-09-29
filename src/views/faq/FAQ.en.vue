<!-- src/views/faq/FAQ.en.vue -->
<script setup lang="ts">
import { HelpCircle } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/shared/components/ui/accordion'

// FAQ data for English
const faqData = [
  {
    id: 'account',
    title: 'Account and Authentication',
    questions: [
      {
        id: 'create-account',
        question: 'How do I create an account?',
        answer: `
          <p>To create an account on our platform:</p>
          <ol>
            <li>Click the "Register" button in the top right corner</li>
            <li>Fill out the form with your email, username, and password</li>
            <li>Confirm your password</li>
            <li>Click "Create Account"</li>
          </ol>
          <p>You can then immediately log in with your credentials.</p>
        `
      },
      {
        id: 'forgot-password',
        question: 'I forgot my password, what should I do?',
        answer: `
          <p>If you forgot your password:</p>
          <ol>
            <li>Go to the login page</li>
            <li>Click "Forgot password?"</li>
            <li>Enter your email address</li>
            <li>Check your email for the reset link</li>
            <li>Follow the instructions in the email you receive</li>
          </ol>
          <p><strong>Note:</strong> The reset link expires after 24 hours.</p>
        `
      },
      {
        id: 'change-username',
        question: 'Can I change my username?',
        answer: `
          <p>Yes, you can modify your username:</p>
          <ol>
            <li>Log into your account</li>
            <li>Go to "Profile" → "Settings"</li>
            <li>In the "Personal Information" tab, modify your username</li>
            <li>Click "Save Changes"</li>
          </ol>
          <p><strong>Important:</strong> The username must be unique and contain between 3 and 20 characters.</p>
        `
      }
    ]
  },
  {
    id: 'articles',
    title: 'Articles and Content',
    questions: [
      {
        id: 'view-articles',
        question: 'How do I view articles?',
        answer: `
          <p>To view articles:</p>
          <ul>
            <li>Latest articles appear on the homepage</li>
            <li>Click on an article to read it in full</li>
            <li>Use the search function to find specific articles</li>
            <li>Browse through available categories</li>
          </ul>
        `
      },
      {
        id: 'comment-article',
        question: 'How do I comment on an article?',
        answer: `
          <p>To comment on an article:</p>
          <ol>
            <li>You must be logged into your account</li>
            <li>Open the article you want to comment on</li>
            <li>Scroll down to the comments section</li>
            <li>Write your comment in the provided field</li>
            <li>Click "Post Comment"</li>
          </ol>
          <p><strong>Note:</strong> You can edit or delete your own comments.</p>
        `
      }
    ]
  },
  {
    id: 'profile',
    title: 'Profile and Settings',
    questions: [
      {
        id: 'edit-profile',
        question: 'How do I edit my profile?',
        answer: `
          <p>To edit your profile:</p>
          <ol>
            <li>Click on your avatar in the top right corner</li>
            <li>Select "Profile" from the menu</li>
            <li>Use the tabs to modify different sections:
              <ul>
                <li><strong>Personal Information:</strong> username, email, language</li>
                <li><strong>Profile Picture:</strong> upload your avatar</li>
                <li><strong>Password:</strong> change your password</li>
              </ul>
            </li>
            <li>Click "Save Changes" for each section</li>
          </ol>
        `
      },
      {
        id: 'upload-avatar',
        question: 'How do I upload a profile picture?',
        answer: `
          <p>To add or change your profile picture:</p>
          <ol>
            <li>Go to your profile → "Profile Picture" tab</li>
            <li>Drag and drop an image or click "Browse Files"</li>
            <li>Select an image (PNG, JPG, or GIF, max 2MB)</li>
            <li>The image will be automatically resized to 100x100 pixels</li>
            <li>Click "Upload Picture"</li>
          </ol>
          <p><strong>Tip:</strong> Use a square image for the best result.</p>
        `
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Support',
    questions: [
      {
        id: 'browser-support',
        question: 'Which browsers are supported?',
        answer: `
          <p>Our application is compatible with:</p>
          <ul>
            <li><strong>Chrome:</strong> version 90 and newer</li>
            <li><strong>Firefox:</strong> version 88 and newer</li>
            <li><strong>Safari:</strong> version 14 and newer</li>
            <li><strong>Edge:</strong> version 90 and newer</li>
          </ul>
          <p>We recommend always using the latest version of your browser for the optimal experience.</p>
        `
      },
      {
        id: 'mobile-responsive',
        question: 'Does the application work on mobile?',
        answer: `
          <p>Yes, our application is fully responsive and adapts to all screen sizes:</p>
          <ul>
            <li>Interface optimized for smartphones and tablets</li>
            <li>Intuitive touch navigation</li>
            <li>Adaptive content based on screen size</li>
            <li>Performance optimized for mobile devices</li>
          </ul>
        `
      },
      {
        id: 'data-security',
        question: 'Is my data secure?',
        answer: `
          <p>The security of your data is our priority:</p>
          <ul>
            <li><strong>Encryption:</strong> All communications are encrypted (HTTPS)</li>
            <li><strong>Authentication:</strong> Secure JWT tokens with automatic expiration</li>
            <li><strong>Passwords:</strong> Secure hashing, never stored in plain text</li>
            <li><strong>Sessions:</strong> Automatic management of expired sessions</li>
            <li><strong>Privacy:</strong> Your data is never shared with third parties</li>
          </ul>
        `
      }
    ]
  }
]
</script>

<template>
  <div class="container mx-auto max-w-4xl px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="flex justify-center mb-4">
        <div class="bg-primary/10 rounded-full p-3">
          <HelpCircle class="h-8 w-8 text-primary" />
        </div>
      </div>
      <h1 class="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
      <p class="text-muted-foreground text-lg">
        Find quick answers to your most common questions
      </p>
    </div>

    <!-- FAQ Sections -->
    <div class="space-y-6">
      <div
          v-for="section in faqData"
          :key="section.id"
          class="space-y-4"
      >
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <HelpCircle class="h-5 w-5 text-primary" />
              {{ section.title }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem
                  v-for="question in section.questions"
                  :key="question.id"
                  :value="question.id"
              >
                <AccordionTrigger class="text-left">
                  {{ question.question }}
                </AccordionTrigger>
                <AccordionContent>
                  <div
                      class="prose dark:prose-invert max-w-none"
                      v-html="question.answer"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Contact section -->
    <Card class="mt-8">
      <CardContent class="pt-6">
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-2">Can't find your answer?</h3>
          <p class="text-muted-foreground mb-4">
            Our support team is here to help you
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
                href="mailto:support@example.com"
                class="text-primary hover:underline font-medium"
            >
              support@example.com
            </a>
            <span class="hidden sm:inline text-muted-foreground">•</span>
            <a
                href="#"
                class="text-primary hover:underline font-medium"
            >
              Contact us
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.prose :deep(ol) {
  list-style-type: decimal;
  list-style-position: inside;
}

.prose :deep(ul) {
  list-style-type: disc;
  list-style-position: inside;
}

.prose :deep(li) {
  margin-left: 1rem;
  margin-bottom: 0.25rem;
}

.prose :deep(p) {
  margin-bottom: 0.75rem;
}

.prose :deep(strong) {
  font-weight: 600;
  color: hsl(var(--foreground));
}

.prose :deep(ol li),
.prose :deep(ul li) {
  margin-bottom: 0.25rem;
}

.prose :deep(ul ul),
.prose :deep(ol ol) {
  margin-top: 0.25rem;
  margin-left: 1rem;
}
</style>
