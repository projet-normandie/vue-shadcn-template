# Vue Application Template

A fully-featured Vue 3 application template with authentication, internationalization, UI components, and responsive design.

## Features

- 🔐 **Authentication System** - JWT-based auth with auto token refresh
- 🌐 **Internationalization (i18n)** - Multi-language support (English, French)
- 🎨 **UI Components** - Using Shadcn/Vue and Tailwind CSS
- 📱 **Responsive Design** - Optimized for desktop and mobile
- 🔄 **State Management** - With Pinia
- 🚦 **Routing** - Vue Router with protected routes
- 🔔 **Notifications** - Toast notifications with Sonner
- 🔧 **TypeScript** - Type-safe code

## Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── assets/           # Static assets
├── components/       # UI components
│   ├── auth/         # Authentication components
│   ├── common/       # Common components
│   ├── layout/       # Layout components
│   └── ui/           # Shadcn UI components
├── directives/       # Custom Vue directives
├── i18n/             # Internationalization
│   ├── locales/      # Translation files
│   └── index.ts      # i18n configuration
├── lib/              # Utility libraries
├── plugins/          # Vue plugins
├── router/           # Vue Router configuration
├── services/         # API services
├── stores/           # Pinia stores
├── types/            # TypeScript types
├── utils/            # Utility functions
└── views/            # Page components
```

## Authentication System

The application uses a JWT-based authentication system with automatic token refresh:

- Token-based authentication with JWT
- Automatic token refresh
- Role-based access control
- Protected routes
- Token status monitoring

## Internationalization (i18n)

The application includes a robust internationalization system for supporting multiple languages:

### Supported Languages

- English (en)
- French (fr)

### Usage in Components

#### Using the Composition API (recommended)

```vue
<script setup lang="ts">
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <h1>{{ t('app.name') }}</h1>
  <p>{{ t('home.welcome') }}</p>
</template>
```

#### Using the Global Helper

```vue
<template>
  <h1>{{ $t('app.name') }}</h1>
  <p>{{ $t('home.welcome') }}</p>
</template>
```

#### Using the Directive

```vue
<template>
  <h1 v-t="'app.name'"></h1>
</template>
```

### Adding a New Language

1. Create a new file in `src/i18n/locales/`, for example `es.ts` for Spanish
2. Update `src/i18n/index.ts`:
    - Import the new file
    - Update the `SupportedLocale` type
    - Add the new language to `translations` and `availableLocales`

```typescript
// src/i18n/index.ts
import en from './locales/en'
import fr from './locales/fr'
import es from './locales/es'  // Import new language

// Update type
export type SupportedLocale = 'en' | 'fr' | 'es'

// Update available translations
const translations: Record<SupportedLocale, Translations> = {
  en,
  fr,
  es  // Add new language
}

// Add display name
export const availableLocales: Record<SupportedLocale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español'  // Add display name
}
```

### Best Practices

- Use a consistent key structure across all translation files
- Organize translations in logical hierarchies
- Always use translation functions for text, never hardcode strings
- Regularly check all languages for missing translations

## UI Components

The application uses the following UI libraries:

- **Shadcn/Vue** - UI components based on Radix Vue
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Vue** - Icon components

## Role-Based Authorization

The application includes role-based authorization with:

- Role-checking utility functions
- Role-aware components with fallback content
- Vue directive for role-based visibility control

## Toast Notifications

The application uses Vue Sonner for toast notifications with:

- Success, error, warning, and info notifications
- Customizable duration and content
- Global toast service

## Development

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)
- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.