// src/composables/useDateFormatter.ts

import { computed } from 'vue'
import { useI18n } from '@/core/i18n'
import {
    formatDate as formatDateUtil,
    formatDateShort as formatDateShortUtil,
    formatDateCompact as formatDateCompactUtil,
    formatDateTime as formatDateTimeUtil,
    formatDateRelative as formatDateRelativeUtil,
    isValidDate,
    toISOString,
    type DateFormatOptions
} from '@/shared/utils/date.utils.ts'

/**
 * Composable for date formatting with automatic locale management
 */
export function useDateFormatter() {
    const { locale } = useI18n()

    // Reactive locale based on i18n
    const currentLocale = computed(() => {
        return locale.value === 'fr' ? 'fr-FR' : 'en-US'
    })

    /**
     * Formats a date according to the current locale
     */
    const formatDate = (dateString: string, options?: DateFormatOptions): string => {
        return formatDateUtil(dateString, currentLocale.value, options)
    }

    /**
     * Formats a date in short format according to the current locale
     */
    const formatDateShort = (dateString: string): string => {
        return formatDateShortUtil(dateString, currentLocale.value)
    }

    /**
     * Formats a date in compact format according to the current locale
     */
    const formatDateCompact = (dateString: string): string => {
        return formatDateCompactUtil(dateString, currentLocale.value)
    }

    /**
     * Formats a complete date with time according to the current locale
     */
    const formatDateTime = (dateString: string): string => {
        return formatDateTimeUtil(dateString, currentLocale.value)
    }

    /**
     * Formats a relative date according to the current locale
     */
    const formatDateRelative = (dateString: string): string => {
        return formatDateRelativeUtil(dateString, currentLocale.value)
    }

    const formatRelativeTime = (dateString: string): string => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

        if (diffInMinutes < 1) {
            return locale.value === 'fr' ? 'À l\'instant' : 'Just now'
        } else if (diffInMinutes < 60) {
            return locale.value === 'fr' ? `Il y a ${diffInMinutes}min` : `${diffInMinutes}min ago`
        } else if (diffInMinutes < 1440) { // Less than 24 hours
            const hours = Math.floor(diffInMinutes / 60)
            return locale.value === 'fr' ? `Il y a ${hours}h` : `${hours}h ago`
        } else if (diffInMinutes < 10080) { // Less than a week
            const days = Math.floor(diffInMinutes / 1440)
            return locale.value === 'fr' ? `Il y a ${days}j` : `${days}d ago`
        } else {
            return date.toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        }
    }


    return {
        // Formatting functions
        formatDate,
        formatDateShort,
        formatDateCompact,
        formatDateTime,
        formatDateRelative,
        formatRelativeTime,

        // Utilities
        isValidDate,
        toISOString,

        // Current locale (reactive)
        currentLocale
    }
}
