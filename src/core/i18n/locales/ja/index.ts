import common from './common.ts'
import app from './app.ts'
import layout from './layout.ts'
import error from './error.ts'
import pwaTranslations from '@/features/pwa/i18n/locales/ja/index.ts'
import articleTranslations from '@/features/article/i18n/locales/ja/index.ts'
import authTranslations from '@/features/auth/i18n/locales/ja/index.ts'
import themeTranslations from '@/features/theme/i18n/locales/ja/index.ts'
import languageTranslations from '@/features/language/i18n/ja/index.ts'

export default {
    app,
    common,
    layout,
    error,
    ...pwaTranslations,
    ...articleTranslations,
    ...authTranslations,
    ...themeTranslations,
    ...languageTranslations,
    breadcrumb: {
        home: 'ホーム',
        games: 'ゲーム'
    },
    settings: {
        subtitle: 'あなたの体験と設定をカスタマイズ',
        tabs: {
            appearance: '外観'
        }
    }
}