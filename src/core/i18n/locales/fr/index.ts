// src/i18n/locales/fr.ts

import common from './common.ts'
import app from './app.ts'
import layout from './layout.ts'
import articleTranslations from '@/features/article/i18n/locales/fr/index.ts'
import authTranslations from '@/features/auth/i18n/locales/fr/index.ts'
import pwaTranslations from '@/features/pwa/i18n/locales/fr/index.ts'
import themeTranslations from '@/features/theme/i18n/locales/fr/index.ts'

export default {
    common,
    layout,
    app,
    ...articleTranslations,
    ...authTranslations,
    ...pwaTranslations,
    ...themeTranslations,
    menu: {
        home: 'Accueil',
        inbox: 'Boîte de réception',
        calendar: 'Calendrier',
        search: 'Recherche',
        settings: 'Paramètres'
    },
    language: {
        selector: 'Langue'
    },
    settings: {
        subtitle: 'Personnalisez votre expérience et vos préférences',
        tabs: {
            appearance: 'Apparence',
        },
    },
    error: {
        notFound: {
            title: 'Page Non Trouvée',
            subtitle: 'Oups ! Cette page n\'existe pas.',
            description: 'La page que vous recherchez a peut-être été supprimée, renommée ou est temporairement indisponible.',
            back: 'Retour',
            home: 'Retour à l\'accueil'
        }
    }
}