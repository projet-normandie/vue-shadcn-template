# Vue.js Authentication System

A comprehensive authentication system built with Vue.js 3, featuring JWT authentication with refresh token capabilities, role-based access control, and a modern UI.

## Tech Stack

- **Vue.js 3.5+** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast development environment
- **Pinia** - State management
- **Vue Router** - Navigation and routing
- **Axios** - API requests
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn-vue** - Reusable UI components
- **Lucide Vue** - Beautiful icons
- **Sonner** - Toast notifications

## Features

### Authentication
- JWT-based authentication
- Automatic token refresh
- Persistent sessions with localStorage
- Secure login/logout flows
- Error handling with clear user feedback

### User Management
- Role-based access control (RBAC)
- User profile management
- Customizable avatar with user initials
- Session status monitoring

### UI Components
- Modern, responsive layout
- Header with user profile dropdown
- Sidebar navigation
- Toast notifications
- Role-aware content display

### Security
- Token expiration handling
- Automatic session renewal
- Secure API request handling
- Protection against unauthenticated access

## Project Structure

```
src/
├── assets/            # Styles and static assets
├── components/        # Vue components
│   ├── auth/          # Authentication components
│   ├── layout/        # Layout components
│   └── ui/            # Reusable UI components
├── directives/        # Custom Vue directives
│   └── auth.directive.ts  # Role-based access directive
├── lib/               # Utility libraries
│   └── axios.ts       # Axios configuration with interceptors
├── plugins/           # Vue plugins
│   ├── auth.ts        # Authentication plugin
│   └── axios-interceptor.ts  # API request interceptors
├── router/            # Vue Router configuration
├── services/          # API services
│   ├── auth.service.ts        # Authentication service
│   ├── toast.service.ts       # Notification service
│   └── token-manager.ts       # Token refresh management
├── stores/            # Pinia stores
│   └── auth.ts        # Authentication state management
├── utils/             # Utility functions
│   └── auth.utils.ts  # Authentication helpers
└── views/             # Application pages
    ├── Home.vue       # Dashboard
    ├── Login.vue      # Login page
    └── Profile.vue    # User profile page
```

## Authentication Flow

1. **Login**: User enters credentials on the login page
2. **JWT Validation**: Server validates credentials and returns JWT and refresh tokens
3. **Session Management**: Tokens are stored and used for authenticating subsequent requests
4. **Token Refresh**: When the JWT expires, the system automatically refreshes it using the refresh token
5. **Access Control**: UI components and routes are conditionally rendered based on user roles

## Role-Based Access Control

The system supports fine-grained access control:

- **v-auth directive**: Conditionally renders UI elements based on user roles
- **Route guards**: Protects routes requiring authentication
- **API request authorization**: Automatically adds authorization headers to API requests

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

```
# .env file
VITE_API_URL=your_api_url
```

### Building for Production

```bash
npm run build
```

## Usage Examples

### Authentication

```typescript
// Login a user
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
await authStore.login(username, password)
```

### Role-Based Content

```vue
<!-- Show content only for admins -->
<div v-auth="'ROLE_ADMIN'">
  Admin content here
</div>

<!-- Show content for users with multiple roles -->
<div v-auth.all="['ROLE_ADMIN', 'ROLE_USER']">
  Special content here
</div>
```

### Notifications

```typescript
import toastService from '@/services/toast.service'

// Success notification
toastService.success('Operation completed', 'Your changes have been saved')

// Error notification
toastService.error('Error', 'Something went wrong')
```

## Configuration

### API Endpoints

The authentication system is configured to work with the following API endpoints:

- **Login**: POST `/api/login_check`
- **Refresh Token**: POST `/api/token/refresh`

You can modify these endpoints in the `auth.service.ts` file.

## Credits

Built with [Vue.js](https://vuejs.org/), [Shadcn-vue](https://www.shadcn-vue.com/), and other open-source technologies.