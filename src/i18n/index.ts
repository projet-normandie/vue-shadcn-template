// src/i18n/index.ts
import { computed, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import en from './locales/en'
import fr from './locales/fr'

// Define the supported languages
export type SupportedLocale = 'en' | 'fr'

// Define interface for translations
export interface Translations {
    [key: string]: string | Translations
}

// Available translations
const translations: Record<SupportedLocale, Translations> = {
    en,
    fr
}

// Define available languages with their display names
export const availableLocales: Record<SupportedLocale, string> = {
    en: 'English',
    fr: 'Français'
}

// Get browser language or use fallback
const getBrowserLanguage = (): SupportedLocale => {
    const browserLang = navigator.language.split('-')[0]
    return (browserLang as SupportedLocale) in translations ? (browserLang as SupportedLocale) : 'en'
}

// Create a composable to manage i18n state
export function useI18n() {
    // Use persistent storage for language preference
    const locale = useStorage<SupportedLocale>('app-locale', getBrowserLanguage())

    // Watch for locale changes to update document lang attribute
    watch(locale, (newLocale) => {
        document.documentElement.setAttribute('lang', newLocale)
    }, { immediate: true })

    // Function to get a translated value by key
    const t = (key: string): string => {
        const keys = key.split('.')
        let value: any = translations[locale.value]

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k]
            } else {
                // Fallback to key if translation not found
                return key
            }
        }

        return typeof value === 'string' ? value : key
    }

    // Change the current locale
    const setLocale = (newLocale: SupportedLocale) => {
        if (newLocale in translations) {
            locale.value = newLocale
        }
    }

    return {
        locale: computed(() => locale.value),
        t,
        setLocale,
        availableLocales
    }
}

// Export a global instance for convenience
export const i18n = useI18n()