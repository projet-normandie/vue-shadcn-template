// src/i18n/locales/en.ts
import common from './common.ts'
import app from './app.ts'
import layout from './layout.ts'
import articleTranslations from '@/features/article/i18n/locales/en/index.ts'
import authTranslations from '@/features/auth/i18n/locales/en/index.ts'
import pwaTranslations from '@/features/pwa/i18n/locales/fr/index.ts'
import themeTranslations from '@/features/theme/i18n/locales/en/index.ts'

export default {
    common,
    layout,
    app,
    ...articleTranslations,
    ...authTranslations,
    ...pwaTranslations,
    ...themeTranslations,
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
    settings: {
        subtitle: 'Customize your experience and preferences',
        tabs: {
            appearance: 'Appearance',
        },
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
