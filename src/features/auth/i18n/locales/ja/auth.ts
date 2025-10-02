// src/i18n/locales/ja/auth.ts

export default {
    login: {
        title: 'ログイン',
        subtitle: 'ダッシュボードにアクセスするにはログインしてください',
        username: 'ユーザー名',
        password: 'パスワード',
        enterUsername: 'ユーザー名を入力してください',
        enterPassword: 'パスワードを入力してください',
        loginButton: 'ログイン',
        loginInProgress: 'ログイン中...',
        forgotPassword: 'パスワードをお忘れですか？',
        noAccount: 'アカウントをお持ちでないですか？',
        registerLink: '今すぐ登録'
    },
    register: {
        title: 'アカウント作成',
        subtitle: 'コミュニティに参加するためにサインアップ',
        email: 'メールアドレス',
        username: 'ユーザー名',
        password: 'パスワード',
        confirmPassword: 'パスワード確認',
        enterEmail: 'メールアドレスを入力してください',
        enterUsername: 'ユーザー名を選択してください',
        enterPassword: 'パスワードを選択してください',
        enterConfirmPassword: 'パスワードを確認してください',
        registerButton: 'アカウント作成',
        registerInProgress: 'アカウント作成中...',
        alreadyHaveAccount: '既にアカウントをお持ちですか？',
        loginLink: 'ログイン',
        validation: {
            email: '有効なメールアドレスを入力してください',
            username: 'ユーザー名は3〜20文字（英字、数字、アンダースコア）である必要があります',
            password: 'パスワードは英字と数字を含む8文字以上である必要があります',
            passwordMatch: 'パスワードが一致しません'
        },
        success: {
            title: 'アカウント作成完了',
            description: 'アカウントが正常に作成されました。ログインできます。'
        },
        error: {
            title: '登録に失敗しました',
            default: '登録中にエラーが発生しました。もう一度お試しください。',
            usernameTaken: 'このユーザー名は既に使用されています',
            emailTaken: 'このメールアドレスは既に登録されています'
        }
    },
    forgotPassword: {
        title: 'パスワードを忘れた場合',
        subtitle: 'パスワードリセットリンクを受け取るためにメールアドレスを入力してください',
        email: 'メールアドレス',
        enterEmail: 'メールアドレスを入力してください',
        sendResetLink: 'リセットリンクを送信',
        sendingLink: '送信中...',
        backToLogin: 'ログインに戻る',
        success: {
            title: 'リセットリンクを送信しました',
            description: 'パスワードをリセットする手順についてメールを確認してください'
        },
        error: {
            title: 'エラー',
            default: 'リセットリンクを送信できませんでした。もう一度お試しください。',
            noEmail: 'メールアドレスを入力してください'
        }
    },
    resetPassword: {
        title: 'パスワードリセット',
        subtitle: '新しいパスワードを入力してください',
        newPassword: '新しいパスワード',
        confirmPassword: 'パスワード確認',
        enterNewPassword: '新しいパスワードを入力してください',
        enterConfirmPassword: '新しいパスワードを確認してください',
        resetButton: 'パスワードリセット',
        resetting: 'リセット中...',
        validation: {
            passwordRequired: 'パスワードは必須です',
            passwordLength: 'パスワードは8文字以上である必要があります',
            passwordMatch: 'パスワードが一致しません'
        },
        success: {
            title: 'パスワードリセット完了',
            description: 'パスワードが正常にリセットされました。新しいパスワードでログインできます。'
        },
        error: {
            title: 'リセットに失敗しました',
            default: 'パスワードをリセットできませんでした。もう一度お試しください。',
            invalidToken: '無効または期限切れのリセットトークンです',
            tokenRequired: 'リセットトークンが必要です'
        }
    },
    token: {
        status: {
            notConnected: '未接続',
            expired: '期限切れ',
            unknown: '不明',
            expiringSoon: '間もなく期限切れ',
            valid: '有効',
            unavailable: '利用不可',
            refreshButton: 'トークンを更新',
            refreshing: '更新中...'
        }
    },
    profile: {
        title: 'ユーザープロフィール',
        subtitle: 'あなたの個人情報',
        sections: {
            authentication: '認証情報',
            account: 'アカウント情報',
            player: 'プレイヤー情報',
            roles: '役割と権限'
        },
        fields: {
            tokenStatus: 'トークンステータス',
            tokenExpiration: 'トークン有効期限',
            id: 'ID',
            username: 'ユーザー名',
            slug: 'スラッグ',
            mainRoles: 'メイン役割',
            allRoles: '全ての役割'
        },
        links: {
            quickLinks: 'クイックリンク',
            dashboard: 'ダッシュボード',
            editProfile: 'プロフィール編集',
            changePassword: 'パスワード変更',
            deleteAccount: 'アカウント削除'
        },
        roles: {
            categories: {
                title: '権限カテゴリ',
                admin: '管理者',
                sonata: 'ソナタ',
                vgr: 'VGR',
                other: 'その他'
            },
            adminActions: '管理者アクション',
            superAdminActions: 'スーパー管理者アクション',
            manageUsers: 'ユーザー管理',
            viewStatistics: '統計表示',
            systemConfig: 'システム設定',
            roleManagement: '役割管理'
        },
        status: {
            title: 'ユーザーステータス',
            guest: 'ステータスを確認するには接続してください'
        }
    }
}