// src/i18n/locales/zh-cn/auth.ts

export default {
    login: {
        title: '登录',
        subtitle: '连接以访问仪表板',
        username: '用户名',
        password: '密码',
        enterUsername: '请输入您的用户名',
        enterPassword: '请输入您的密码',
        loginButton: '登录',
        loginInProgress: '登录中...',
        forgotPassword: '忘记密码？',
        noAccount: '还没有账户？',
        registerLink: '立即注册'
    },
    register: {
        title: '创建账户',
        subtitle: '注册加入我们的社区',
        email: '邮箱',
        username: '用户名',
        password: '密码',
        confirmPassword: '确认密码',
        enterEmail: '请输入您的邮箱地址',
        enterUsername: '选择一个用户名',
        enterPassword: '选择一个密码',
        enterConfirmPassword: '确认您的密码',
        registerButton: '创建账户',
        registerInProgress: '创建账户中...',
        alreadyHaveAccount: '已经有账户？',
        loginLink: '登录',
        validation: {
            email: '请输入有效的邮箱地址',
            username: '用户名必须是3-20个字符（字母、数字、下划线）',
            password: '密码至少需要8个字符，包含字母和数字',
            passwordMatch: '密码不匹配'
        },
        success: {
            title: '账户已创建',
            description: '您的账户已成功创建。现在您可以登录。'
        },
        error: {
            title: '注册失败',
            default: '注册过程中发生错误。请重试。',
            usernameTaken: '此用户名已被占用',
            emailTaken: '此邮箱已被注册'
        }
    },
    forgotPassword: {
        title: '忘记密码',
        subtitle: '输入您的邮箱以接收密码重置链接',
        email: '邮箱',
        enterEmail: '请输入您的邮箱地址',
        sendResetLink: '发送重置链接',
        sendingLink: '发送中...',
        backToLogin: '返回登录',
        success: {
            title: '重置链接已发送',
            description: '请检查您的邮箱以获取重置密码的说明'
        },
        error: {
            title: '错误',
            default: '无法发送重置链接。请重试。',
            noEmail: '请输入您的邮箱地址'
        }
    },
    resetPassword: {
        title: '重置密码',
        subtitle: '输入您的新密码',
        newPassword: '新密码',
        confirmPassword: '确认密码',
        enterNewPassword: '请输入您的新密码',
        enterConfirmPassword: '请确认您的新密码',
        resetButton: '重置密码',
        resetting: '重置中...',
        validation: {
            passwordRequired: '密码是必需的',
            passwordLength: '密码至少需要8个字符',
            passwordMatch: '密码不匹配'
        },
        success: {
            title: '密码已重置',
            description: '您的密码已成功重置。现在您可以使用新密码登录。'
        },
        error: {
            title: '重置失败',
            default: '无法重置密码。请重试。',
            invalidToken: '无效或已过期的重置令牌',
            tokenRequired: '重置令牌是必需的'
        }
    },
    token: {
        status: {
            notConnected: '未连接',
            expired: '已过期',
            unknown: '未知',
            expiringSoon: '即将过期',
            valid: '有效',
            unavailable: '不可用',
            refreshButton: '刷新令牌',
            refreshing: '刷新中...'
        }
    },
    profile: {
        title: '用户资料',
        subtitle: '您的个人信息',
        sections: {
            authentication: '认证信息',
            account: '账户信息',
            player: '玩家信息',
            roles: '角色和权限'
        },
        fields: {
            tokenStatus: '令牌状态',
            tokenExpiration: '令牌过期时间',
            id: 'ID',
            username: '用户名',
            slug: '别名',
            mainRoles: '主要角色',
            allRoles: '所有角色'
        },
        links: {
            quickLinks: '快速链接',
            dashboard: '仪表板',
            editProfile: '编辑资料',
            changePassword: '更改密码',
            deleteAccount: '删除账户'
        },
        roles: {
            categories: {
                title: '权限类别',
                admin: '管理',
                sonata: 'Sonata',
                vgr: 'VGR',
                other: '其他'
            },
            adminActions: '管理员操作',
            superAdminActions: '超级管理员操作',
            manageUsers: '管理用户',
            viewStatistics: '查看统计',
            systemConfig: '系统配置',
            roleManagement: '角色管理'
        },
        status: {
            title: '用户状态',
            guest: '连接后查看您的状态'
        }
    }
}