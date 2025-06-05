import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '@/views/Profile.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import NotFound from '@/views/NotFound.vue'
import { useAuthStore } from '../stores/auth'


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/pwa-settings',
        name: 'PWASettings',
        component: () => import(/* webpackChunkName: "pwa" */ '@/views/PWASettings.vue'),
        meta: {
            title: 'PWA Settings',
            requiresAuth: false
        }
    },
    {
        path: '/articles',
        name: 'ArticleList',
        component: () => import(/* webpackChunkName: "article" */ '@/views/article/ArticleList.vue'),
        meta: {
            title: 'Articles'
        }
    },
    {
        path: '/:slug-article-a:id(\\d+)',
        name: 'ArticleDetail',
        component: () => import(/* webpackChunkName: "article" */ '@/views/article/ArticleDetail.vue'),
        props: true
    },
    {
        path: '/top-week',
        name: 'TopWeek',
        component: () => import(/* webpackChunkName: "article" */ '@/views/TopRanking.vue'),
        props: true
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { guest: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { guest: true }
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword,
        meta: { guest: true }
    },
    {
        path: '/reset-password',
        name: 'ResetPassword',
        component: ResetPassword,
        meta: { guest: true }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true }
    },
    {
        path: '/quill-test',
        name: 'QuillTest',
        component: () => import(/* webpackChunkName: "editor-test" */ '@/views/QuillTest.vue'),
        meta: {
            title: 'Quill Test',
            requiresAuth: false // Accessible à tous pour les tests
        }
    },
    {
        path: '/video-players',
        name: 'VideoPlayers',
        component: () => import(/* webpackChunkName: "video-demo" */ '@/views/VideoPlayerDemo.vue'),
        meta: {
            title: 'Video Players Demo',
            requiresAuth: false
        }
    },
    {
        path: '/faq',
        name: 'FAQ',
        component: () => import(/* webpackChunkName: "faq" */ '@/views/FAQ.vue'),
        meta: {
            title: 'FAQ'
        }
    },
    {
        path: '/rules',
        name: 'Rules',
        component: () => import(/* webpackChunkName: "rules" */ '@/views/Rules.vue'),
        meta: {
            title: 'Community Rules'
        }
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: () => import(/* webpackChunkName: "privacy" */ '@/views/Privacy.vue'),
        meta: {
            title: 'Privacy Policy'
        }
    },
    {
        path: '/terms',
        name: 'Terms',
        component: () => import(/* webpackChunkName: "terms" */ '@/views/Terms.vue'),
        meta: {
            title: 'Terms of Service'
        }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import(/* webpackChunkName: "contact" */ '@/views/Contact.vue'),
        meta: {
            title: 'Contact Us'
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
        meta: {
            title: 'About Us'
        }
    },
    {
        path: '/legal',
        name: 'Legal',
        component: () => import(/* webpackChunkName: "legal" */ '@/views/Legal.vue'),
        meta: {
            title: 'Legal Notice'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isGuestOnly = to.matched.some(record => record.meta.guest)

    if (requiresAuth && !authStore.isAuthenticated) {
        next('/login')
    } else if (isGuestOnly && authStore.isAuthenticated) {
        next('/')
    } else {
        next()
    }
})


export default router