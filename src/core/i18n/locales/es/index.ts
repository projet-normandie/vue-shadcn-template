// src/i18n/locales/es.ts
import common from './common.ts'
import app from './app.ts'
import layout from './layout.ts'
import error from './error.ts'
import articleTranslations from '@/features/article/i18n/locales/es/index.ts'
import authTranslations from '@/features/auth/i18n/locales/es/index.ts'
import pwaTranslations from '@/features/pwa/i18n/locales/es/index.ts'
import themeTranslations from '@/features/theme/i18n/locales/es/index.ts'
import languageTranslations from '@/features/language/i18n/es/index.ts'

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
        home: 'Inicio',
        inbox: 'Bandeja de entrada',
        calendar: 'Calendario',
        search: 'Buscar',
        settings: 'Configuración'
    },
    settings: {
        subtitle: 'Personaliza tu experiencia y preferencias',
        tabs: {
            appearance: 'Apariencia',
        },
    },
}