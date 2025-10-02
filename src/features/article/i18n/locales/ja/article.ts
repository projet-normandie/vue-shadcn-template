// src/i18n/locales/ja/article.ts

export default {
    latest: '最新記事',
    viewAll: 'すべて表示',
    noArticles: '記事がありません',
    backToHome: 'ホームに戻る',
    returnToHome: 'ホームに戻る',
    info: {
        title: '情報',
        updated: '更新日時',
        views: '閲覧数',
    },
    actions: {
        title: 'アクション',
        share: '共有',
        print: '印刷',
    },
    error: {
        title: 'エラー',
        loadFailed: '記事の読み込みに失敗しました',
        invalidId: '無効な記事ID'
    },
    notFound: {
        title: '記事が見つかりません',
        description: 'お探しの記事は存在しないか、削除されました。'
    },
    list: {
        title: 'すべての記事',
        subtitle: '最新の記事やストーリーをご覧ください',
        searchPlaceholder: '記事を検索...',
        sortBy: '並び順',
        itemsPerPage: '表示件数',
        perPage: '件/ページ',
        search: '検索',
        clearFilters: 'フィルターをクリア',
        retry: '再試行',
        readMore: '続きを読む',
        previous: '前へ',
        next: '次へ',
        noResults: '記事が見つかりません',
        noResultsSearch: '検索条件に一致する記事がありません',
        showing: '{total}件中{start}〜{end}件を表示',
        pageInfo: '{total}ページ中{current}ページ',
        itemCount: '記事なし | 1件の記事 | {count}件の記事'
    },
    sort: {
        newest: '新しい順',
        oldest: '古い順',
        titleAZ: 'タイトル昇順',
        titleZA: 'タイトル降順'
    },
    comments: {
        title: 'コメント',
        show: 'コメントを表示',
        hide: 'コメントを非表示',
        empty: 'まだコメントがありません。最初にコメントしましょう！',
        loadMore: 'もっと読み込む',
        edited: '編集済み',
        loginRequired: 'コメントを投稿するにはログインが必要です。',
        loginLink: 'ログイン',
        form: {
            title: 'コメントを追加',
            content: 'コメント内容',
            placeholder: 'この記事について感想をお聞かせください...',
            submit: 'コメントを投稿',
            submitting: '投稿中...',
            clear: 'クリア',
            minCharacters: '最低3文字以上入力してください',
            characters: '文字',
            helpText: '基本的な書式設定が利用できます：太字、斜体、リスト、リンク。'
        },
        actions: {
            edit: '編集',
            save: '変更を保存',
            cancel: 'キャンセル'
        },
        success: {
            title: '成功',
            added: 'コメントが投稿されました。',
            updated: 'コメントが更新されました。'
        },
        error: {
            title: 'エラー',
            default: 'エラーが発生しました。もう一度お試しください。',
            loadFailed: 'コメントの読み込みに失敗しました。',
            updateFailed: 'コメントの更新に失敗しました。',
            notAuthorized: 'このコメントを編集する権限がありません。'
        }
    },
}