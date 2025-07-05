import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useI18n, type SupportedLocale } from '@/i18n'

// Import layouts
import AppLayout from '@/components/layout/AppLayout.vue'
import ViewLayout from '@/components/layout/ViewLayout.vue'

// Import views
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Profile from '@/views/Profile.vue'
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import NotFound from '@/views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '',
                redirect: () => {
                    const savedLocale = localStorage.getItem('app-locale')
                    const browserLang = navigator.language.split('-')[0]
                    const defaultLocale = savedLocale || (browserLang === 'fr' ? 'fr' : 'en')
                    return `/${defaultLocale}`
                }
            },
            {
                path: ':lang(fr|en)',
                component: ViewLayout,
                children: [
                    {
                        path: '',
                        name: 'Home',
                        component: Home
                    },
                    {
                        path: 'pwa-settings',
                        name: 'PwaSettings',
                        component: () => import(/* webpackChunkName: "pwa" */ '@/views/PWASettings.vue'),
                        meta: {
                            title: 'PWA Settings',
                            requiresAuth: false
                        }
                    },
                    {
                        path: 'articles',
                        name: 'ArticleList',
                        component: () => import(/* webpackChunkName: "article" */ '@/views/article/ArticleList.vue'),
                        meta: {
                            title: 'Articles'
                        }
                    },
                    {
                        path: ':slug-article-a:id(\\d+)',
                        name: 'ArticleDetail',
                        component: () => import(/* webpackChunkName: "article" */ '@/views/article/ArticleDetail.vue'),
                        props: true
                    },
                    {
                        path: 'top-week',
                        name: 'TopWeek',
                        component: () => import(/* webpackChunkName: "article" */ '@/views/TopRanking.vue'),
                        props: true
                    },
                    {
                        path: 'login',
                        name: 'Login',
                        component: Login,
                        meta: { guest: true }
                    },
                    {
                        path: 'register',
                        name: 'Register',
                        component: Register,
                        meta: { guest: true }
                    },
                    {
                        path: 'forgot-password',
                        name: 'ForgotPassword',
                        component: ForgotPassword,
                        meta: { guest: true }
                    },
                    {
                        path: 'reset-password',
                        name: 'ResetPassword',
                        component: ResetPassword,
                        meta: { guest: true }
                    },
                    {
                        path: 'profile',
                        name: 'Profile',
                        component: Profile,
                        meta: { requiresAuth: true }
                    },
                    {
                        path: 'quill-test',
                        name: 'QuillTest',
                        component: () => import(/* webpackChunkName: "editor-test" */ '@/views/QuillTest.vue'),
                        meta: {
                            title: 'Quill Test',
                            requiresAuth: false // Accessible à tous pour les tests
                        }
                    },
                    {
                        path: 'video-players',
                        name: 'VideoPlayers',
                        component: () => import(/* webpackChunkName: "video-demo" */ '@/views/VideoPlayerDemo.vue'),
                        meta: {
                            title: 'Video Players Demo',
                            requiresAuth: false
                        }
                    },
                    {
                        path: 'faq',
                        name: 'Faq',
                        component: () => import(/* webpackChunkName: "faq" */ '@/views/FAQ.vue'),
                        meta: {
                            title: 'FAQ'
                        }
                    },
                    {
                        path: 'rules',
                        name: 'Rules',
                        component: () => import(/* webpackChunkName: "rules" */ '@/views/Rules.vue'),
                        meta: {
                            title: 'Community Rules'
                        }
                    },
                    {
                        path: 'privacy',
                        name: 'Privacy',
                        component: () => import(/* webpackChunkName: "privacy" */ '@/views/Privacy.vue'),
                        meta: {
                            title: 'Privacy Policy'
                        }
                    },
                    {
                        path: 'terms',
                        name: 'Terms',
                        component: () => import(/* webpackChunkName: "terms" */ '@/views/Terms.vue'),
                        meta: {
                            title: 'Terms of Service'
                        }
                    },
                    {
                        path: 'contact',
                        name: 'Contact',
                        component: () => import(/* webpackChunkName: "contact" */ '@/views/Contact.vue'),
                        meta: {
                            title: 'Contact Us'
                        }
                    },
                    {
                        path: 'about',
                        name: 'About',
                        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
                        meta: {
                            title: 'About Us'
                        }
                    },
                    {
                        path: 'legal',
                        name: 'Legal',
                        component: () => import(/* webpackChunkName: "legal" */ '@/views/Legal.vue'),
                        meta: {
                            title: 'Legal Notice'
                        }
                    },
                    {
                        path: ':pathMatch(.*)*',
                        name: 'NotFound',
                        component: NotFound
                    }
                ]
            }
        ]
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


// Global navigation guard
router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore()
    const { setLocale } = useI18n()

    // Extract language from route params
    const lang = to.params.lang as SupportedLocale

    // If we have a language in the route, sync it with i18n
    if (lang && ['fr', 'en'].includes(lang)) {
        setLocale(lang)
    }

    // Auth checks
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isGuestOnly = to.matched.some(record => record.meta.guest)

    if (requiresAuth && !authStore.isAuthenticated) {
        next('/login')
    } else if (isGuestOnly && authStore.isAuthenticated) {
        // Redirect authenticated users to default language home
        const currentLocale = localStorage.getItem('app-locale') || 'en'
        next(`/${currentLocale}`)
    } else {
        next()
    }
})


export default router