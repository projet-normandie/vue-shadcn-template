// src/utils/date.utils.ts

/**
 * Date formatting options
 */
export interface DateFormatOptions {
    locale?: string
    year?: 'numeric' | '2-digit'
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
    day?: 'numeric' | '2-digit'
    hour?: 'numeric' | '2-digit'
    minute?: 'numeric' | '2-digit'
    second?: 'numeric' | '2-digit'
    timeZone?: string
}

/**
 * Formats a date according to the specified locale and options
 * @param dateString - The date as a string (ISO format recommended)
 * @param locale - The locale to use (default: 'fr-FR')
 * @param options - Custom formatting options
 * @returns The formatted date
 */
export const formatDate = (
    dateString: string,
    locale: string = 'fr-FR',
    options?: DateFormatOptions
): string => {
    if (!dateString) {
        return ''
    }

    try {
        const date = new Date(dateString)

        // Check if the date is valid
        if (isNaN(date.getTime())) {
            console.warn(`Invalid date string: ${dateString}`)
            return dateString
        }

        // Default options
        const defaultOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }

        // Merge with custom options
        const formatOptions = { ...defaultOptions, ...options }

        return date.toLocaleDateString(locale, formatOptions)
    } catch (error) {
        console.error('Error formatting date:', error)
        return dateString
    }
}

/**
 * Formats a date in short format (dd/mm or mm/dd depending on locale)
 * @param dateString - The date as a string
 * @param locale - The locale to use
 * @returns The date in short format
 */
export const formatDateShort = (
    dateString: string,
    locale: string = 'fr-FR'
): string => {
    return formatDate(dateString, locale, {
        day: '2-digit',
        month: '2-digit'
    })
}

/**
 * Formats a date in compact format (abbreviated month + year)
 * @param dateString - The date as a string
 * @param locale - The locale to use
 * @returns The date in compact format
 */
export const formatDateCompact = (
    dateString: string,
    locale: string = 'fr-FR'
): string => {
    return formatDate(dateString, locale, {
        year: 'numeric',
        month: 'short'
    })
}

/**
 * Formats a complete date with time
 * @param dateString - The date as a string
 * @param locale - The locale to use
 * @returns The date with time
 */
export const formatDateTime = (
    dateString: string,
    locale: string = 'fr-FR'
): string => {
    return formatDate(dateString, locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

/**
 * Returns a relative date (e.g. "2 days ago")
 * @param dateString - The date as a string
 * @param locale - The locale to use
 * @returns The relative date
 */
export const formatDateRelative = (
    dateString: string,
    locale: string = 'fr-FR'
): string => {
    if (!dateString) {
        return ''
    }

    try {
        const date = new Date(dateString)
        const now = new Date()
        const diffInMs = now.getTime() - date.getTime()
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

        // Use Intl.RelativeTimeFormat if available
        if ('RelativeTimeFormat' in Intl) {
            const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

            if (diffInDays === 0) {
                const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
                if (diffInHours === 0) {
                    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
                    return rtf.format(-diffInMinutes, 'minute')
                }
                return rtf.format(-diffInHours, 'hour')
            } else if (diffInDays < 7) {
                return rtf.format(-diffInDays, 'day')
            } else if (diffInDays < 30) {
                const diffInWeeks = Math.floor(diffInDays / 7)
                return rtf.format(-diffInWeeks, 'week')
            } else if (diffInDays < 365) {
                const diffInMonths = Math.floor(diffInDays / 30)
                return rtf.format(-diffInMonths, 'month')
            } else {
                const diffInYears = Math.floor(diffInDays / 365)
                return rtf.format(-diffInYears, 'year')
            }
        }

        // Fallback without RelativeTimeFormat
        if (diffInDays === 0) {
            return locale === 'fr-FR' ? "Aujourd'hui" : 'Today'
        } else if (diffInDays === 1) {
            return locale === 'fr-FR' ? 'Hier' : 'Yesterday'
        } else if (diffInDays < 7) {
            return locale === 'fr-FR' ? `Il y a ${diffInDays} jours` : `${diffInDays} days ago`
        } else {
            return formatDate(dateString, locale)
        }
    } catch (error) {
        console.error('Error formatting relative date:', error)
        return formatDate(dateString, locale)
    }
}

/**
 * Checks if a date is valid
 * @param dateString - The date as a string
 * @returns true if the date is valid
 */
export const isValidDate = (dateString: string): boolean => {
    if (!dateString) return false

    try {
        const date = new Date(dateString)
        return !isNaN(date.getTime())
    } catch {
        return false
    }
}

/**
 * Converts a date to ISO format
 * @param dateString - The date as a string
 * @returns The date in ISO format or null if invalid
 */
export const toISOString = (dateString: string): string | null => {
    if (!isValidDate(dateString)) return null

    try {
        return new Date(dateString).toISOString()
    } catch {
        return null
    }
}
