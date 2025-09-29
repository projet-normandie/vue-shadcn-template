// src/i18n/locales/en.ts
import common from './common.ts'
import app from './app.ts'
import layout from './layout.ts'
import article from '@/features/article/i18n/locales/en/article.ts'
import auth from '@/features/auth/i18n/locales/en/auth.ts'
import pwa from '@/features/pwa/i18n/locales/en/pwa.ts'

export default {
    common,
    layout,
    app,
    article,
    auth,
    pwa,
    menu: {
        home: 'Home',
        inbox: 'Inbox',
        calendar: 'Calendar',
        search: 'Search',
        settings: 'Settings'
    },
    language: {
        selector: 'Language'
    },
    error: {
        notFound: {
            title: 'Page Not Found',
            subtitle: 'Oops! This page does not exist.',
            description: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
            back: 'Go Back',
            home: 'Back to Home'
        }
    }
}
