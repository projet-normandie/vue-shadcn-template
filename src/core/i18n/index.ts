// src/i18n/index.ts - Configuration i18n pour routes imbriquées
import { createI18n } from 'vue-i18n'
import { updateApiLocale } from '@/core/lib/axios.ts'
import { computed } from 'vue'

// Import your existing translations
import en from './locales/en'
import fr from './locales/fr'
import it from './locales/it'
import es from './locales/es'
import ja from './locales/ja'
import ptBr from './locales/pt-br'
import zhCn from './locales/zh-cn'

// Define supported locales
export type SupportedLocale = 'en' | 'fr' | 'it' | 'es' | 'ja' | 'pt-br' | 'zh-cn'

// Available locales with display names
export const availableLocales: Record<SupportedLocale, string> = {
    en: 'English',
    fr: 'Français',
    it: 'Italiano',
    es: 'Español',
    ja: '日本語',
    'pt-br': 'Português (Brasil)',
    'zh-cn': '简体中文'
}

// Get browser language or fallback
const getBrowserLanguage = (): SupportedLocale => {
    const fullLang = navigator.language.toLowerCase()
    const browserLang = fullLang.split('-')[0]
    
    // Handle special cases for multi-regional languages
    if (fullLang.startsWith('pt-br') || fullLang === 'pt-br') return 'pt-br'
    if (fullLang.startsWith('zh-cn') || fullLang === 'zh-cn' || fullLang === 'zh') return 'zh-cn'
    
    // Check if the base language is supported
    const supportedLangs: SupportedLocale[] = ['en', 'fr', 'it', 'es', 'ja', 'pt-br', 'zh-cn']
    return supportedLangs.includes(browserLang as SupportedLocale) 
        ? (browserLang as SupportedLocale) 
        : 'en'
}

// Get initial locale from URL, storage or browser
const getInitialLocale = (): SupportedLocale => {
    // Try to get from URL path first
    const pathSegments = window.location.pathname.split('/')
    const urlLang = pathSegments[1] as SupportedLocale

    if (['fr', 'en', 'it', 'es', 'ja', 'pt-br', 'zh-cn'].includes(urlLang)) {
        return urlLang
    }

    // Fallback to storage or browser language
    const savedLocale = localStorage.getItem('app-locale') as SupportedLocale
    return savedLocale || getBrowserLanguage()
}

// Create the i18n instance
const i18n = createI18n({
    legacy: false,
    locale: getInitialLocale(),
    fallbackLocale: 'en',
    messages: { en, fr, it, es, ja, 'pt-br': ptBr, 'zh-cn': zhCn },
    missingWarn: import.meta.env.DEV,
    fallbackWarn: import.meta.env.DEV,
    datetimeFormats: {
        en: {
            short: {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            },
            long: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }
        },
        fr: {
            short: {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            },
            long: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }
        },
        it: {
            short: {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            },
            long: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }
        },
        es: {
            short: {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            },
            long: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }
        },
        ja: {
            short: {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            },
            long: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }
        },
        'pt-br': {
            short: {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            },
            long: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }
        },
        'zh-cn': {
            short: {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            },
            long: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }
        }
    },
    numberFormats: {
        en: {
            currency: { style: 'currency', currency: 'USD' },
            decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }
        },
        fr: {
            currency: { style: 'currency', currency: 'EUR' },
            decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }
        },
        it: {
            currency: { style: 'currency', currency: 'EUR' },
            decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }
        },
        es: {
            currency: { style: 'currency', currency: 'EUR' },
            decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }
        },
        ja: {
            currency: { style: 'currency', currency: 'JPY' },
            decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }
        },
        'pt-br': {
            currency: { style: 'currency', currency: 'BRL' },
            decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }
        },
        'zh-cn': {
            currency: { style: 'currency', currency: 'CNY' },
            decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }
        }
    }
})

// Composable for reactive i18n
export function useI18n() {
    const { locale, t, d, n, tm } = i18n.global

    // Update locale and persist
    const updateLocale = (newLocale: SupportedLocale) => {
        if (newLocale in availableLocales) {
            locale.value = newLocale
            localStorage.setItem('app-locale', newLocale)
            document.documentElement.setAttribute('lang', newLocale)
            updateApiLocale(newLocale)
        }
    }

    // Set locale (public API)
    const setLocale = (newLocale: SupportedLocale) => {
        updateLocale(newLocale)
    }

    // Get current locale from URL route if available
    const getCurrentLocaleFromRoute = (): SupportedLocale => {
        const pathSegments = window.location.pathname.split('/')
        const urlLang = pathSegments[1] as SupportedLocale
        return (['fr', 'en', 'it', 'es', 'ja', 'pt-br', 'zh-cn'].includes(urlLang)) ? urlLang : locale.value
    }

    return {
        locale: computed(() => locale.value),
        t,
        d,
        n,
        tm,
        setLocale,
        availableLocales,
        getCurrentLocaleFromRoute
    }
}

export default i18n
