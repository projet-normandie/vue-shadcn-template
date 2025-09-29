/**
 * Number formatting utilities
 */

/**
 * Options for number formatting
 */
export interface NumberFormatOptions {
    locale?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
    useGrouping?: boolean
    style?: 'decimal' | 'currency' | 'percent'
    currency?: string
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact'
}

/**
 * Formats a number according to the specified locale and options
 * @param num - The number to format
 * @param locale - The locale to use (default: 'fr-FR')
 * @param options - Custom formatting options
 * @returns The formatted number as string
 */
export const formatNumber = (
    num: number,
    locale: string = 'fr-FR',
    options?: NumberFormatOptions
): string => {
    if (num === null || num === undefined || isNaN(num)) {
        return '0'
    }

    try {
        const defaultOptions: Intl.NumberFormatOptions = {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            useGrouping: true
        }

        const formatOptions = { ...defaultOptions, ...options }
        return new Intl.NumberFormat(locale, formatOptions).format(num)
    } catch (error) {
        console.error('Error formatting number:', error)
        return num.toString()
    }
}

/**
 * Formats a number as currency
 * @param num - The number to format
 * @param currency - Currency code (default: 'EUR')
 * @param locale - The locale to use (default: 'fr-FR')
 * @returns The formatted currency string
 */
export const formatCurrency = (
    num: number,
    currency: string = 'EUR',
    locale: string = 'fr-FR'
): string => {
    return formatNumber(num, locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

/**
 * Formats a number as percentage
 * @param num - The number to format (0.5 = 50%)
 * @param locale - The locale to use (default: 'fr-FR')
 * @param decimals - Number of decimal places (default: 1)
 * @returns The formatted percentage string
 */
export const formatPercentage = (
    num: number,
    locale: string = 'fr-FR',
    decimals: number = 1
): string => {
    return formatNumber(num, locale, {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    })
}

/**
 * Formats a number in compact notation (e.g., 1.2K, 3.4M)
 * @param num - The number to format
 * @param locale - The locale to use (default: 'fr-FR')
 * @returns The formatted compact number string
 */
export const formatNumberCompact = (
    num: number,
    locale: string = 'fr-FR'
): string => {
    return formatNumber(num, locale, {
        notation: 'compact',
        maximumFractionDigits: 1
    })
}

/**
 * Formats a number with custom decimal places
 * @param num - The number to format
 * @param decimals - Number of decimal places
 * @param locale - The locale to use (default: 'fr-FR')
 * @returns The formatted number string
 */
export const formatNumberWithDecimals = (
    num: number,
    decimals: number,
    locale: string = 'fr-FR'
): string => {
    return formatNumber(num, locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    })
}
