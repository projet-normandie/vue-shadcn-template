// src/i18n/locales/fr.ts

import common from './common.ts'
import app from './app.ts'
import layout from './layout.ts'
import article from '@/features/article/i18n/locales/fr/article.ts'
import auth from '@/features/auth/i18n/locales/fr/auth.ts'
import pwa from '@/features/pwa/i18n/locales/fr/pwa.ts'

export default {
    common,
    layout,
    app,
    article,
    auth,
    pwa,
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