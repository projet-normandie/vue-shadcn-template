// src/i18n/locales/fr.ts

import common from './common.ts'
import app from './app.ts'
import layout from './layout.ts'
import error from './error.ts'
import articleTranslations from '@/features/article/i18n/locales/fr/index.ts'
import authTranslations from '@/features/auth/i18n/locales/fr/index.ts'
import pwaTranslations from '@/features/pwa/i18n/locales/fr/index.ts'
import themeTranslations from '@/features/theme/i18n/locales/fr/index.ts'
import languageTranslations from '@/features/language/i18n/fr/index.ts'

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
        home: 'Accueil',
        inbox: 'Boîte de réception',
        calendar: 'Calendrier',
        search: 'Recherche',
        settings: 'Paramètres'
    },
    settings: {
        subtitle: 'Personnalisez votre expérience et vos préférences',
        tabs: {
            appearance: 'Apparence',
        },
    },
}