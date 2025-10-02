// src/i18n/locales/de/auth.ts

export default {
    login: {
        title: 'Anmelden',
        subtitle: 'Melden Sie sich an, um auf das Dashboard zuzugreifen',
        username: 'Benutzername',
        password: 'Passwort',
        enterUsername: 'Geben Sie Ihren Benutzernamen ein',
        enterPassword: 'Geben Sie Ihr Passwort ein',
        loginButton: 'Anmelden',
        loginInProgress: 'Anmeldung läuft...',
        forgotPassword: 'Passwort vergessen?',
        noAccount: 'Sie haben kein Konto?',
        registerLink: 'Registrieren Sie sich'
    },
    register: {
        title: 'Konto erstellen',
        subtitle: 'Registrieren Sie sich, um unserer Community beizutreten',
        email: 'E-Mail',
        username: 'Benutzername',
        password: 'Passwort',
        confirmPassword: 'Passwort bestätigen',
        enterEmail: 'Geben Sie Ihre E-Mail-Adresse ein',
        enterUsername: 'Wählen Sie einen Benutzernamen',
        enterPassword: 'Wählen Sie ein Passwort',
        enterConfirmPassword: 'Bestätigen Sie Ihr Passwort',
        registerButton: 'Konto erstellen',
        registerInProgress: 'Konto wird erstellt...',
        alreadyHaveAccount: 'Sie haben bereits ein Konto?',
        loginLink: 'Anmelden',
        validation: {
            email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
            username: 'Der Benutzername muss 3 bis 20 Zeichen enthalten (Buchstaben, Zahlen, Unterstriche)',
            password: 'Das Passwort muss mindestens 8 Zeichen mit Buchstaben und Zahlen enthalten',
            passwordMatch: 'Die Passwörter stimmen nicht überein'
        },
        success: {
            title: 'Konto erstellt',
            description: 'Ihr Konto wurde erfolgreich erstellt. Sie können sich jetzt anmelden.'
        },
        error: {
            title: 'Registrierung fehlgeschlagen',
            default: 'Ein Fehler ist bei der Registrierung aufgetreten. Bitte versuchen Sie es erneut.',
            usernameTaken: 'Dieser Benutzername ist bereits vergeben',
            emailTaken: 'Diese E-Mail-Adresse ist bereits registriert'
        }
    },
    forgotPassword: {
        title: 'Passwort vergessen',
        subtitle: 'Geben Sie Ihre E-Mail ein, um einen Zurücksetzungslink zu erhalten',
        email: 'E-Mail',
        enterEmail: 'Geben Sie Ihre E-Mail-Adresse ein',
        sendResetLink: 'Link senden',
        sendingLink: 'Wird gesendet...',
        backToLogin: 'Zurück zur Anmeldung',
        success: {
            title: 'Link gesendet',
            description: 'Überprüfen Sie Ihre E-Mail für Anweisungen zur Passwort-Zurücksetzung'
        },
        error: {
            title: 'Fehler',
            default: 'Zurücksetzungslink konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
            noEmail: 'Bitte geben Sie Ihre E-Mail-Adresse ein'
        }
    },
    resetPassword: {
        title: 'Passwort zurücksetzen',
        subtitle: 'Geben Sie Ihr neues Passwort ein',
        newPassword: 'Neues Passwort',
        confirmPassword: 'Passwort bestätigen',
        enterNewPassword: 'Geben Sie Ihr neues Passwort ein',
        enterConfirmPassword: 'Bestätigen Sie Ihr neues Passwort',
        resetButton: 'Passwort zurücksetzen',
        resetting: 'Zurücksetzen läuft...',
        validation: {
            passwordRequired: 'Das Passwort ist erforderlich',
            passwordLength: 'Das Passwort muss mindestens 8 Zeichen haben',
            passwordMatch: 'Die Passwörter stimmen nicht überein'
        },
        success: {
            title: 'Passwort zurückgesetzt',
            description: 'Ihr Passwort wurde erfolgreich zurückgesetzt. Sie können sich jetzt mit Ihrem neuen Passwort anmelden.'
        },
        error: {
            title: 'Zurücksetzen fehlgeschlagen',
            default: 'Passwort konnte nicht zurückgesetzt werden. Bitte versuchen Sie es erneut.',
            invalidToken: 'Der Zurücksetzungslink ist ungültig oder abgelaufen',
            tokenRequired: 'Das Zurücksetzungstoken ist erforderlich'
        }
    },
    token: {
        status: {
            notConnected: 'Nicht verbunden',
            expired: 'Abgelaufen',
            unknown: 'Unbekannt',
            expiringSoon: 'Läuft bald ab',
            valid: 'Gültig',
            unavailable: 'Nicht verfügbar',
            refreshButton: 'Token aktualisieren',
            refreshing: 'Aktualisierung läuft...'
        }
    },
    profile: {
        title: 'Benutzerprofil',
        subtitle: 'Ihre persönlichen Informationen',
        sections: {
            authentication: 'Authentifizierungsinformationen',
            account: 'Kontoinformationen',
            player: 'Spielerinformationen',
            roles: 'Rollen und Berechtigungen'
        },
        fields: {
            tokenStatus: 'Token-Status',
            tokenExpiration: 'Token-Ablauf',
            id: 'ID',
            username: 'Benutzername',
            slug: 'Slug',
            mainRoles: 'Hauptrollen',
            allRoles: 'Alle Rollen'
        },
        links: {
            quickLinks: 'Schnellzugriffe',
            dashboard: 'Dashboard',
            editProfile: 'Mein Profil bearbeiten',
            changePassword: 'Passwort ändern',
            deleteAccount: 'Konto löschen'
        },
        roles: {
            categories: {
                title: 'Berechtigungskategorien',
                admin: 'Administration',
                sonata: 'Sonata',
                vgr: 'VGR',
                other: 'Andere'
            },
            adminActions: 'Administrator-Aktionen',
            superAdminActions: 'Super-Administrator-Aktionen',
            manageUsers: 'Benutzer verwalten',
            viewStatistics: 'Statistiken anzeigen',
            systemConfig: 'Systemkonfiguration',
            roleManagement: 'Rollenverwaltung'
        },
        status: {
            title: 'Benutzerstatus',
            guest: 'Melden Sie sich an, um Ihren Status zu sehen'
        }
    }
}