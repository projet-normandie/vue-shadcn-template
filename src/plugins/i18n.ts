// src/plugins/i18n.ts
import type { App } from 'vue'
import { useI18n } from '@/i18n'

// Plugin to make i18n globally available
export default {
    install: (app: App) => {
        const { t } = useI18n()

        // Make translation function accessible via $t
        app.config.globalProperties.$t = t

        // Add global directive v-t for translation
        app.directive('t', {
            beforeMount(el, binding) {
                el.textContent = t(binding.value)
            },
            updated(el, binding) {
                el.textContent = t(binding.value)
            }
        })
    }
}