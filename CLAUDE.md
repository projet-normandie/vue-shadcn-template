# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format

# Preview production build
npm run preview
```

### PWA Commands
```bash
# Build PWA for production
npm run pwa:build

# Preview PWA build with network access
npm run pwa:preview

# Test PWA functionality
npm run pwa:test

# Generate PWA icons
npm run icons:generate

# Run Lighthouse audit
npm run lighthouse
```

### Environment-Specific Builds
```bash
# Build for staging
npm run build-staging

# Build for production
npm run build-production
```

## Architecture Overview

### Project Structure Pattern
This Vue 3 application follows a feature-based architecture:

- **`src/core/`** - Core application infrastructure (router, stores, i18n, plugins)
- **`src/features/`** - Feature modules (auth, article, pwa) with their own components, services, stores, and i18n
- **`src/shared/`** - Shared components, composables, and utilities used across features
- **`src/views/`** - Page-level components

### Feature Module Structure
Each feature follows a consistent structure:
```
src/features/[feature]/
├── components/          # Feature-specific components
├── composables/         # Feature composables
├── services/           # API services and business logic
├── stores/             # Pinia stores
├── types/              # TypeScript types
├── i18n/locales/       # Feature translations
├── views/              # Feature pages
└── plugins/            # Feature Vue plugins
```

### Key Architectural Patterns

1. **Route-based i18n**: URLs include language prefix (`/en/`, `/fr/`) with automatic locale detection and routing
2. **Feature-based i18n**: Each feature manages its own translations in `features/[name]/i18n/locales/`
3. **JWT Authentication**: Token-based auth with automatic refresh and role-based access control
4. **PWA Integration**: Full PWA capabilities with service worker, offline support, and installability
5. **Shadcn/Vue Components**: UI components located in `src/shared/components/ui/` (excluded from linting)

### Path Aliases
```typescript
@/*           -> src/*
@/features/*  -> src/features/*
@/shared/*    -> src/shared/*
```

## Technology Stack

### Core Stack
- **Vue 3** with Composition API and `<script setup>`
- **TypeScript** for type safety
- **Vite** as build tool
- **Pinia** for state management with persistence
- **Vue Router** with nested routes and guards

### UI & Styling
- **Tailwind CSS 4** for styling
- **Shadcn/Vue** components (Reka UI based)
- **Lucide Vue** for icons
- **Vue Sonner** for toast notifications

### Features
- **Vue I18n** for internationalization
- **Quill.js** rich text editor integration
- **Vite PWA** for Progressive Web App features
- **Axios** with interceptors for API calls
- **Vee-validate + Zod** for form validation

## Development Guidelines

### Component Patterns
- Use `<script setup>` syntax with TypeScript
- Import UI components from `@/shared/components/ui/`
- Follow Shadcn/Vue component patterns for custom components
- Use feature-specific components within their feature directories

### State Management
- Use Pinia stores with composition API syntax
- Store auth state in `features/auth/stores/auth.ts`
- Feature stores should be in their respective feature directories
- Persist important state using `pinia-plugin-persistedstate`

### Internationalization
- Use `useI18n()` composable for translations
- Add feature translations to `features/[name]/i18n/locales/`
- Core translations go in `src/core/i18n/locales/`
- Language routes use pattern `/:lang(fr|en)/path`

### Authentication
- Use `useAuth()` composable from `@/features/auth/composables/useAuth`
- Protect routes with `meta: { requiresAuth: true }`
- Guest-only routes use `meta: { guest: true }`
- Use `v-auth` directive for conditional rendering based on roles

### Styling Conventions
- Use Tailwind CSS classes
- Leverage CSS variables for theming (supports dark mode)
- Component-specific styles should be scoped
- UI components excluded from ESLint (in `.eslintignore`)

### Build Configuration
- Manual chunks: vendor (vue, vue-router, pinia), ui (lucide, vueuse), editor (quill)
- PWA caching strategies: CacheFirst for images/fonts, NetworkFirst for APIs
- Environment-specific builds available for staging and production

### Testing & Quality
- Run `npm run type-check` before commits
- Use `npm run lint` to check code quality
- Prettier formatting with `npm run format`
- ESLint ignores UI components and build outputs