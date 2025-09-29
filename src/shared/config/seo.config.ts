// SEO Configuration
export interface SEOConfig {
  site: {
    name: string
    url: string
    description: string
    author: string
    keywords: string
  }
  social: {
    twitter: {
      site: string
      creator: string
    }
  }
  images: {
    defaultOgImage: string
    ogImageDimensions: {
      width: string
      height: string
      type: string
    }
  }
  theme: {
    color: string
    tileColor: string
  }
}

export const seoConfig: SEOConfig = {
  site: {
    name: 'Vue Shadcn Template',
    url: 'https://localhost:5173',
    description: 'A fully-featured Vue 3 application template with authentication, internationalization, UI components, and responsive design.',
    author: 'Vue Shadcn Template',
    keywords: 'vue, vue3, template, shadcn, tailwind, typescript, pwa, i18n, authentication'
  },
  social: {
    twitter: {
      site: '@YourTwitter',
      creator: '@YourTwitter'
    }
  },
  images: {
    defaultOgImage: '/images/og-default.jpg',
    ogImageDimensions: {
      width: '1200',
      height: '630',
      type: 'image/jpeg'
    }
  },
  theme: {
    color: '#ffffff',
    tileColor: '#ffffff'
  }
}