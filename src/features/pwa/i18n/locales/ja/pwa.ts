// src/i18n/locales/ja/pwa.ts

export default {
    install: {
        title: 'アプリをインストール',
        description: '素早くアクセスするためにこのアプリをホーム画面に追加',
        button: 'インストール',
        installing: 'インストール中...',
        benefits: {
            fast: '高速',
            native: 'ネイティブライク',
            secure: 'セキュア'
        }
    },
    update: {
        title: '更新が利用可能',
        description: '新しいバージョンが利用可能です。最新機能を取得するために今すぐ更新してください。',
        button: '更新',
        updating: '更新中...'
    },
    offline: {
        title: 'オフラインです',
        description: 'アプリはキャッシュされたコンテンツで動作し続けます',
        online: 'オンラインです',
        onlineDescription: 'すべての機能が利用可能'
    },
    status: {
        title: 'PWA ステータス',
        appMode: 'アプリモード',
        connection: '接続',
        storageUsed: '使用ストレージ',
        features: '機能',
        offlineReady: 'オフライン対応',
        upToDate: '最新',
        canInstall: 'インストール可能',
        installed: 'インストール済み'
    },
    storage: {
        title: 'ストレージ管理',
        used: '使用済み',
        available: '利用可能',
        usage: '使用状況',
        clearCache: 'キャッシュをクリア',
        clearing: 'クリア中...',
        categories: {
            appResources: 'アプリリソース',
            apiResponses: 'API レスポンス',
            images: '画像',
            fonts: 'フォント'
        }
    },
    settings: {
        title: 'PWA 設定',
        description: 'Progressive Web App の体験を管理',
        tabs: {
            overview: '概要',
            installation: 'インストール',
            storage: 'ストレージ',
            offline: 'オフライン'
        }
    }
}