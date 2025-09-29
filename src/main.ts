import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import './assets/main.css'
import App from './App.vue'
import router from './core/router'
import pinia from './core/stores'
import i18n from './core/i18n' // Import Vue I18n instance
import authPlugin from './features/auth/plugins/auth.ts'
import analyticsPlugin from '@/core/plugins/analytics'
import axiosInterceptor from '@/core/plugins/axios-interceptor'
import authDirective from '@/features/auth/directives/auth.directive'
import pwaPlugin from './features/pwa/plugins/pwa.ts'


const head = createHead()

const app = createApp(App)
    .use(head)
    .use(router)
    .use(pinia)
    .use(i18n) // Use Vue I18n instead of custom plugin
    // Initialize authentication plugin after Pinia and router
    .use(authPlugin, { router })
    // Initialize analytics plugin with router for automatic tracking
    .use(analyticsPlugin, { router })
    // Authorization directive
    .use(authDirective)
    .use(pwaPlugin)

// Setup Axios interceptors
axiosInterceptor.setup()



app.mount('#app')