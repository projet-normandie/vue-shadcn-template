// src/i18n/locales/it/auth.ts

export default {
    login: {
        title: 'Accedi',
        subtitle: 'Collegati per accedere alla dashboard',
        username: 'Nome Utente',
        password: 'Password',
        enterUsername: 'Inserisci il tuo nome utente',
        enterPassword: 'Inserisci la tua password',
        loginButton: 'Accedi',
        loginInProgress: 'Accesso in corso...',
        forgotPassword: 'Password dimenticata?',
        noAccount: 'Non hai un account?',
        registerLink: 'Registrati ora'
    },
    register: {
        title: 'Crea Account',
        subtitle: 'Iscriviti per unirti alla nostra comunità',
        email: 'Email',
        username: 'Nome Utente',
        password: 'Password',
        confirmPassword: 'Conferma Password',
        enterEmail: 'Inserisci il tuo indirizzo email',
        enterUsername: 'Scegli un nome utente',
        enterPassword: 'Scegli una password',
        enterConfirmPassword: 'Conferma la tua password',
        registerButton: 'Crea Account',
        registerInProgress: 'Creazione account...',
        alreadyHaveAccount: 'Hai già un account?',
        loginLink: 'Accedi',
        validation: {
            email: 'Inserisci un indirizzo email valido',
            username: 'Il nome utente deve essere di 3-20 caratteri (lettere, numeri, underscore)',
            password: 'La password deve essere di almeno 8 caratteri con lettere e numeri',
            passwordMatch: 'Le password non corrispondono'
        },
        success: {
            title: 'Account Creato',
            description: 'Il tuo account è stato creato con successo. Ora puoi accedere.'
        },
        error: {
            title: 'Registrazione Fallita',
            default: 'Si è verificato un errore durante la registrazione. Riprova.',
            usernameTaken: 'Questo nome utente è già in uso',
            emailTaken: 'Questa email è già registrata'
        }
    },
    forgotPassword: {
        title: 'Password Dimenticata',
        subtitle: 'Inserisci la tua email per ricevere un link di reset della password',
        email: 'Email',
        enterEmail: 'Inserisci il tuo indirizzo email',
        sendResetLink: 'Invia Link di Reset',
        sendingLink: 'Invio...',
        backToLogin: 'Torna al login',
        success: {
            title: 'Link di Reset Inviato',
            description: 'Controlla la tua email per le istruzioni per resettare la tua password'
        },
        error: {
            title: 'Errore',
            default: 'Impossibile inviare il link di reset. Riprova.',
            noEmail: 'Inserisci il tuo indirizzo email'
        }
    },
    resetPassword: {
        title: 'Reimposta Password',
        subtitle: 'Inserisci la tua nuova password',
        newPassword: 'Nuova Password',
        confirmPassword: 'Conferma Password',
        enterNewPassword: 'Inserisci la tua nuova password',
        enterConfirmPassword: 'Conferma la tua nuova password',
        resetButton: 'Reimposta Password',
        resetting: 'Reimpostazione...',
        validation: {
            passwordRequired: 'La password è obbligatoria',
            passwordLength: 'La password deve essere di almeno 8 caratteri',
            passwordMatch: 'Le password non corrispondono'
        },
        success: {
            title: 'Password Reimpostata',
            description: 'La tua password è stata reimpostata con successo. Ora puoi accedere con la tua nuova password.'
        },
        error: {
            title: 'Reset Fallito',
            default: 'Impossibile reimpostare la password. Riprova.',
            invalidToken: 'Token di reset non valido o scaduto',
            tokenRequired: 'Il token di reset è obbligatorio'
        }
    },
    token: {
        status: {
            notConnected: 'Non connesso',
            expired: 'Scaduto',
            unknown: 'Sconosciuto',
            expiringSoon: 'In scadenza',
            valid: 'Valido',
            unavailable: 'Non disponibile',
            refreshButton: 'Aggiorna token',
            refreshing: 'Aggiornamento...'
        }
    },
    profile: {
        title: 'Profilo Utente',
        subtitle: 'Le tue informazioni personali',
        sections: {
            authentication: 'Informazioni di Autenticazione',
            account: 'Informazioni Account',
            player: 'Informazioni Giocatore',
            roles: 'Ruoli e Permessi'
        },
        fields: {
            tokenStatus: 'Stato Token',
            tokenExpiration: 'Scadenza Token',
            id: 'ID',
            username: 'Nome Utente',
            slug: 'Slug',
            mainRoles: 'Ruoli Principali',
            allRoles: 'Tutti i Ruoli'
        },
        links: {
            quickLinks: 'Link Rapidi',
            dashboard: 'Dashboard',
            editProfile: 'Modifica Profilo',
            changePassword: 'Cambia Password',
            deleteAccount: 'Elimina Account'
        },
        roles: {
            categories: {
                title: 'Categorie Permessi',
                admin: 'Amministrazione',
                sonata: 'Sonata',
                vgr: 'VGR',
                other: 'Altri'
            },
            adminActions: 'Azioni Amministratore',
            superAdminActions: 'Azioni Super Amministratore',
            manageUsers: 'Gestisci Utenti',
            viewStatistics: 'Visualizza Statistiche',
            systemConfig: 'Configurazione Sistema',
            roleManagement: 'Gestione Ruoli'
        },
        status: {
            title: 'Stato Utente',
            guest: 'Collegati per vedere il tuo stato'
        }
    }
}