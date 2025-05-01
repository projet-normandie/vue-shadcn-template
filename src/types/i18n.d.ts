// src/types/i18n.d.ts
import { Translations } from '@/i18n'

// Extend Vue with i18n types
declare module 'vue' {
    interface ComponentCustomProperties {
        $t: (key: string) => string
    }
}

// Extend Vue directives
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        vT: typeof import('@/plugins/i18n')['default']
    }
}

// Extend Window interface for debug access
declare global {
    interface Window {
        i18n?: {
            locale: string
            translations: Record<string, Translations>
        }
    }
}