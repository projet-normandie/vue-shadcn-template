// src/i18n/locales/en/auth.ts

export default {
    login: {
        title: 'Login',
        subtitle: 'Connect to access the dashboard',
        username: 'Username',
        password: 'Password',
        enterUsername: 'Enter your username',
        enterPassword: 'Enter your password',
        loginButton: 'Login',
        loginInProgress: 'Logging in...',
        forgotPassword: 'Forgot password?',
        noAccount: 'Don\'t have an account?',
        registerLink: 'Register now'
    },
    register: {
        title: 'Create Account',
        subtitle: 'Sign up to join our community',
        email: 'Email',
        username: 'Username',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        enterEmail: 'Enter your email address',
        enterUsername: 'Choose a username',
        enterPassword: 'Choose a password',
        enterConfirmPassword: 'Confirm your password',
        registerButton: 'Create Account',
        registerInProgress: 'Creating account...',
        alreadyHaveAccount: 'Already have an account?',
        loginLink: 'Login',
        validation: {
            email: 'Please enter a valid email address',
            username: 'Username must be 3-20 characters (letters, numbers, underscores)',
            password: 'Password must be at least 8 characters with letters and numbers',
            passwordMatch: 'Passwords do not match'
        },
        success: {
            title: 'Account Created',
            description: 'Your account has been created successfully. You can now log in.'
        },
        error: {
            title: 'Registration Failed',
            default: 'An error occurred during registration. Please try again.',
            usernameTaken: 'This username is already taken',
            emailTaken: 'This email is already registered'
        }
    },
    forgotPassword: {
        title: 'Forgot Password',
        subtitle: 'Enter your email to receive a password reset link',
        email: 'Email',
        enterEmail: 'Enter your email address',
        sendResetLink: 'Send Reset Link',
        sendingLink: 'Sending...',
        backToLogin: 'Back to login',
        success: {
            title: 'Reset Link Sent',
            description: 'Check your email for instructions to reset your password'
        },
        error: {
            title: 'Error',
            default: 'Unable to send reset link. Please try again.',
            noEmail: 'Please enter your email address'
        }
    },
    resetPassword: {
        title: 'Reset Password',
        subtitle: 'Enter your new password',
        newPassword: 'New Password',
        confirmPassword: 'Confirm Password',
        enterNewPassword: 'Enter your new password',
        enterConfirmPassword: 'Confirm your new password',
        resetButton: 'Reset Password',
        resetting: 'Resetting...',
        validation: {
            passwordRequired: 'Password is required',
            passwordLength: 'Password must be at least 8 characters',
            passwordMatch: 'Passwords do not match'
        },
        success: {
            title: 'Password Reset',
            description: 'Your password has been successfully reset. You can now login with your new password.'
        },
        error: {
            title: 'Reset Failed',
            default: 'Unable to reset password. Please try again.',
            invalidToken: 'Invalid or expired reset token',
            tokenRequired: 'Reset token is required'
        }
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
}