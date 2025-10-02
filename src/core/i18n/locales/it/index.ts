// src/i18n/locales/it.ts
import common from './common.ts'
import app from './app.ts'
import layout from './layout.ts'
import error from './error.ts'
import articleTranslations from '@/features/article/i18n/locales/it/index.ts'
import authTranslations from '@/features/auth/i18n/locales/it/index.ts'
import pwaTranslations from '@/features/pwa/i18n/locales/it/index.ts'
import themeTranslations from '@/features/theme/i18n/locales/it/index.ts'
import languageTranslations from '@/features/language/i18n/it/index.ts'

export default {
    common,
    layout,
    app,
    error,
    ...articleTranslations,
    ...authTranslations,
    ...pwaTranslations,
    ...themeTranslations,
    ...languageTranslations,
    menu: {
        home: 'Home',
        inbox: 'Posta in arrivo',
        calendar: 'Calendario',
        search: 'Cerca',
        settings: 'Impostazioni'
    },
    settings: {
        subtitle: 'Personalizza la tua esperienza e le preferenze',
        tabs: {
            appearance: 'Aspetto',
        },
    },
}