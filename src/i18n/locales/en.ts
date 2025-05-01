// src/i18n/locales/en.ts
export default {
    app: {
        name: 'My Application'
    },
    layout: {
        header: {
            help: 'Help',
            documentation: 'Documentation',
            login: 'Login',
            profile: 'Profile',
            settings: 'Settings',
            logout: 'Log out'
        },
        footer: {
            copyright: '© 2025 My Application. All rights reserved.',
            legal: 'Legal Notice',
            privacy: 'Privacy Policy',
            contact: 'Contact'
        },
        sidebar: {
            title: 'Application',
            links: {
                title: 'Useful Links',
                documentation: 'Documentation',
                help: 'Help',
                support: 'Support'
            }
        }
    },
    menu: {
        home: 'Home',
        inbox: 'Inbox',
        calendar: 'Calendar',
        search: 'Search',
        settings: 'Settings'
    },
    auth: {
        login: {
            title: 'Login',
            subtitle: 'Connect to access the dashboard',
            username: 'Username',
            password: 'Password',
            enterUsername: 'Enter your username',
            enterPassword: 'Enter your password',
            rememberMe: 'Remember me',
            loginButton: 'Login',
            loginInProgress: 'Logging in...',
            forgotPassword: 'Forgot password?'
        },
        token: {
            status: {
                notConnected: 'Not connected',
                expired: 'Expired',
                unknown: 'Unknown',
                expiringSoon: 'Expiring soon',
                valid: 'Valid',
                unavailable: 'Not available',
                refreshButton: 'Refresh token',
                refreshing: 'Refreshing...'
            }
        },
        profile: {
            title: 'User Profile',
            subtitle: 'Your personal information',
            sections: {
                authentication: 'Authentication Information',
                account: 'Account Information',
                player: 'Player Information',
                roles: 'Roles and Permissions'
            },
            fields: {
                tokenStatus: 'Token Status',
                tokenExpiration: 'Token Expiration',
                id: 'ID',
                username: 'Username',
                slug: 'Slug',
                mainRoles: 'Main Roles',
                allRoles: 'All Roles'
            },
            links: {
                quickLinks: 'Quick Links',
                dashboard: 'Dashboard',
                editProfile: 'Edit Profile',
                changePassword: 'Change Password',
                deleteAccount: 'Delete Account'
            },
            roles: {
                categories: {
                    title: 'Permission Categories',
                    admin: 'Administration',
                    sonata: 'Sonata',
                    vgr: 'VGR',
                    other: 'Others'
                },
                adminActions: 'Administrator Actions',
                superAdminActions: 'Super Administrator Actions',
                manageUsers: 'Manage Users',
                viewStatistics: 'View Statistics',
                systemConfig: 'System Configuration',
                roleManagement: 'Role Management'
            },
            status: {
                title: 'User Status',
                guest: 'Connect to see your status'
            }
        }
    },
    common: {
        loading: 'Loading...',
        error: 'An error occurred',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        confirm: 'Confirm',
        noPermission: 'You don\'t have the necessary permissions to view this content.'
    },
    home: {
        welcome: 'Welcome to your application',
        description: 'A responsive layout with sidebar, header and footer using Shadcn/Vue and Tailwind CSS.',
        features: {
            feature1: {
                title: 'Feature 1',
                description: 'Description of the first feature of the application.'
            },
            feature2: {
                title: 'Feature 2',
                description: 'Description of the second feature of the application.'
            },
            feature3: {
                title: 'Feature 3',
                description: 'Description of the third feature of the application.'
            }
        }
    },
    language: {
        selector: 'Language'
    }
}