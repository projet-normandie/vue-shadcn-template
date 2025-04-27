import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import authPlugin from './plugins/auth'
import axiosInterceptor from './plugins/axios-interceptor'
import authDirective from './directives/auth.directive'

const app = createApp(App)
    .use(router)
    .use(pinia)
    // Initialize authentication plugin after Pinia and router
    .use(authPlugin, { router })
    // Authorization directive
    .use(authDirective)

// Setup Axios interceptors
axiosInterceptor.setup()

app.mount('#app')