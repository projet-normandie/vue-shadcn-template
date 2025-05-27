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
            register: 'Register',
            profile: 'Profile',
            settings: 'Settings',
            logout: 'Log out'
        },
        footer: {
            copyright: '© 2025 My Application. All rights reserved.',
            legal: 'Legal Notice',
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
            contact: 'Contact',
            rules: 'Rules',
            about: 'About'
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
    articles: {
        latest: 'Latest Articles',
        viewAll: 'View all',
        noArticles: 'No articles available',
        backToHome: 'Back to home',
        returnToHome: 'Return to home',
        error: {
            title: 'Error',
            loadFailed: 'Failed to load articles',
            invalidId: 'Invalid article ID'
        },
        notFound: {
            title: 'Article not found',
            description: 'The article you\'re looking for doesn\'t exist or has been removed.'
        }
    },
    comments: {
        title: 'Comments',
        show: 'Show comments',
        hide: 'Hide comments',
        empty: 'No comments yet. Be the first to share your thoughts!',
        loadMore: 'Load more comments',
        edited: 'edited',
        loginRequired: 'You need to be logged in to post a comment.',
        loginLink: 'Log in',
        form: {
            title: 'Add a Comment',
            content: 'Your comment',
            placeholder: 'Share your thoughts about this article...',
            submit: 'Post comment',
            submitting: 'Posting...',
            clear: 'Clear',
            minCharacters: 'Minimum 3 characters required',
            characters: 'characters',
            helpText: 'You can use basic formatting: bold, italic, lists, and links.'
        },
        actions: {
            edit: 'Edit',
            save: 'Save changes',
            cancel: 'Cancel'
        },
        success: {
            title: 'Success',
            added: 'Your comment has been posted.',
            updated: 'Your comment has been updated.'
        },
        error: {
            title: 'Error',
            default: 'An error occurred. Please try again.',
            loadFailed: 'Failed to load comments.',
            updateFailed: 'Failed to update comment.',
            notAuthorized: 'You are not authorized to edit this comment.'
        }
    },
    auth: {
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
    },
    profile: {
        title: 'Profile Settings',
        subtitle: 'Manage your account settings and preferences',
        tabs: {
            info: 'Personal Information',
            avatar: 'Profile Picture',
            password: 'Password'
        },
        fields: {
            username: 'Username',
            email: 'Email Address',
            language: 'Language Preference'
        },
        placeholders: {
            username: 'Enter your username',
            email: 'Enter your email address',
            language: 'Select your preferred language'
        },
        descriptions: {
            username: 'Your username will be visible to other users',
            email: 'We\'ll never share your email with anyone else',
            language: 'Choose the language for the interface'
        },
        validation: {
            required: 'This field is required',
            usernameLength: 'Username must be at least 3 characters',
            usernameMax: 'Username must be at most 20 characters',
            usernameFormat: 'Username can only contain letters, numbers, and underscores',
            emailFormat: 'Please enter a valid email address',
            passwordLength: 'Password must be at least 8 characters'
        },
        buttons: {
            save: 'Save Changes',
            saving: 'Saving...',
            cancel: 'Cancel'
        },
        password: {
            fields: {
                current: 'Current Password',
                new: 'New Password',
                confirm: 'Confirm New Password'
            },
            placeholders: {
                current: 'Enter your current password',
                new: 'Enter your new password',
                confirm: 'Confirm your new password'
            },
            descriptions: {
                requirements: 'Password must be at least 8 characters with letters and numbers'
            },
            validation: {
                currentRequired: 'Current password is required',
                newLength: 'New password must be at least 8 characters',
                newLetters: 'New password must contain at least one letter',
                newNumbers: 'New password must contain at least one number',
                passwordMatch: 'Passwords do not match'
            },
            buttons: {
                change: 'Change Password',
                changing: 'Changing Password...'
            },
            success: {
                title: 'Password Changed',
                changed: 'Your password has been changed successfully'
            },
            error: {
                title: 'Error',
                changeFailed: 'Failed to change password. Please check your current password and try again.',
                validationFailed: 'Password validation failed'
            }
        },
        avatar: {
            currentAvatar: 'Current Profile Picture',
            description: 'This will be displayed on your profile and comments',
            sizeInfo: 'Avatar will be resized to 100x100 pixels',
            dragDrop: 'Drag and drop an image here, or click to browse',
            fileTypes: 'PNG, JPG, or GIF up to 2MB',
            browse: 'Browse Files',
            selectFile: 'Select a file',
            upload: 'Upload Picture',
            uploading: 'Uploading...',
            success: {
                title: 'Success',
                uploaded: 'Your profile picture has been updated'
            },
            error: {
                title: 'Error',
                invalidType: 'Invalid file type. Please upload a PNG, JPG, or GIF',
                tooLarge: 'File is too large. Maximum size is 2MB',
                uploadFailed: 'Failed to upload profile picture'
            }
        },
        authentication: {
            title: 'Authentication Status'
        },
        success: {
            title: 'Success',
            updated: 'Your profile has been updated'
        },
        error: {
            title: 'Error',
            loadFailed: 'Failed to load profile data',
            updateFailed: 'Failed to update profile'
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
    },
    error: {
        notFound: {
            title: 'Page Not Found',
            subtitle: 'Oops! This page does not exist.',
            description: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
            back: 'Go Back',
            home: 'Back to Home'
        }
    }
}
