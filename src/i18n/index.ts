// src/i18n/index.ts - Configuration Vue I18n
import { createI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'
import { updateApiLocale } from '@/lib/axios'
import { computed } from 'vue'

// Import your existing translations
import en from './locales/en'
import fr from './locales/fr'

// Define supported locales
export type SupportedLocale = 'en' | 'fr'

// Available locales with display names
export const availableLocales: Record<SupportedLocale, string> = {
    en: 'English',
    fr: 'Français'
}

// Get browser language or fallback
const getBrowserLanguage = (): SupportedLocale => {
    const browserLang = navigator.language.split('-')[0]
    return (browserLang as SupportedLocale) in availableLocales ? (browserLang as SupportedLocale) : 'en'
}

// Create the i18n instance
const i18n = createI18n({
    legacy: false, // Use Composition API mode
    locale: getBrowserLanguage(),
    fallbackLocale: 'en',
    messages: {
        en,
        fr
    },
    // Enable missing message warnings in development
    missingWarn: import.meta.env.DEV,
    fallbackWarn: import.meta.env.DEV,
    // Date/time formats
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
        }
    },
    // Number formats
    numberFormats: {
        en: {
            currency: {
                style: 'currency',
                currency: 'USD'
            },
            decimal: {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        },
        fr: {
            currency: {
                style: 'currency',
                currency: 'EUR'
            },
            decimal: {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        }
    }
})

// Composable for reactive i18n with persistence
export function useI18n() {
    const { locale, t, d, n, tm } = i18n.global

    // Persistent locale storage
    const persistentLocale = useStorage<SupportedLocale>('app-locale', getBrowserLanguage())

    // Set initial locale from storage
    locale.value = persistentLocale.value

    // Update document language and API locale
    const updateLocale = (newLocale: SupportedLocale) => {
        if (newLocale in availableLocales) {
            locale.value = newLocale
            persistentLocale.value = newLocale
            document.documentElement.setAttribute('lang', newLocale)
            updateApiLocale(newLocale)
        }
    }

    // Initialize
    updateLocale(persistentLocale.value)

    return {
        locale: computed(() => locale.value),
        t,
        d, // Date formatter
        n, // Number formatter
        tm, // Translation messages getter
        setLocale: updateLocale,
        availableLocales
    }
}

export default i18n
