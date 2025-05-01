// src/i18n/locales/fr.ts
export default {
    app: {
        name: 'Mon Application'
    },
    layout: {
        header: {
            help: 'Aide',
            documentation: 'Documentation',
            login: 'Connexion',
            register: 'Inscription',
            profile: 'Profil',
            settings: 'Paramètres',
            logout: 'Déconnexion'
        },
        footer: {
            copyright: '© 2025 Mon Application. Tous droits réservés.',
            legal: 'Mentions légales',
            privacy: 'Politique de confidentialité',
            contact: 'Contact'
        },
        sidebar: {
            title: 'Application',
            links: {
                title: 'Liens utiles',
                documentation: 'Documentation',
                help: 'Aide',
                support: 'Support'
            }
        }
    },
    menu: {
        home: 'Accueil',
        inbox: 'Boîte de réception',
        calendar: 'Calendrier',
        search: 'Recherche',
        settings: 'Paramètres'
    },
    auth: {
        login: {
            title: 'Connexion',
            subtitle: 'Connectez-vous pour accéder au tableau de bord',
            username: 'Nom d\'utilisateur',
            password: 'Mot de passe',
            enterUsername: 'Entrez votre nom d\'utilisateur',
            enterPassword: 'Entrez votre mot de passe',
            loginButton: 'Se connecter',
            loginInProgress: 'Connexion en cours...',
            forgotPassword: 'Mot de passe oublié?',
            noAccount: 'Vous n\'avez pas de compte?',
            registerLink: 'Inscrivez-vous'
        },
        register: {
            title: 'Créer un compte',
            subtitle: 'Inscrivez-vous pour rejoindre notre communauté',
            email: 'Email',
            username: 'Nom d\'utilisateur',
            password: 'Mot de passe',
            confirmPassword: 'Confirmer le mot de passe',
            enterEmail: 'Entrez votre adresse email',
            enterUsername: 'Choisissez un nom d\'utilisateur',
            enterPassword: 'Choisissez un mot de passe',
            enterConfirmPassword: 'Confirmez votre mot de passe',
            registerButton: 'Créer un compte',
            registerInProgress: 'Création du compte...',
            alreadyHaveAccount: 'Vous avez déjà un compte?',
            loginLink: 'Connexion',
            validation: {
                email: 'Veuillez entrer une adresse email valide',
                username: 'Le nom d\'utilisateur doit contenir 3 à 20 caractères (lettres, chiffres, underscores)',
                password: 'Le mot de passe doit contenir au moins 8 caractères avec des lettres et des chiffres',
                passwordMatch: 'Les mots de passe ne correspondent pas'
            },
            success: {
                title: 'Compte Créé',
                description: 'Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.'
            },
            error: {
                title: 'Échec de l\'inscription',
                default: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.',
                usernameTaken: 'Ce nom d\'utilisateur est déjà pris',
                emailTaken: 'Cette adresse email est déjà enregistrée'
            }
        },
        token: {
            status: {
                notConnected: 'Non connecté',
                expired: 'Expiré',
                unknown: 'Inconnu',
                expiringSoon: 'Expire bientôt',
                valid: 'Valide',
                unavailable: 'Non disponible',
                refreshButton: 'Rafraîchir le token',
                refreshing: 'Rafraîchissement...'
            }
        },
        profile: {
            title: 'Profil utilisateur',
            subtitle: 'Vos informations personnelles',
            sections: {
                authentication: 'Informations d\'authentification',
                account: 'Informations de compte',
                player: 'Informations de joueur',
                roles: 'Rôles et permissions'
            },
            fields: {
                tokenStatus: 'État du token',
                tokenExpiration: 'Expiration du token',
                id: 'ID',
                username: 'Nom d\'utilisateur',
                slug: 'Slug',
                mainRoles: 'Rôles principaux',
                allRoles: 'Tous les rôles'
            },
            links: {
                quickLinks: 'Liens rapides',
                dashboard: 'Tableau de bord',
                editProfile: 'Modifier mon profil',
                changePassword: 'Changer mon mot de passe',
                deleteAccount: 'Supprimer mon compte'
            },
            roles: {
                categories: {
                    title: 'Catégories de permissions',
                    admin: 'Administration',
                    sonata: 'Sonata',
                    vgr: 'VGR',
                    other: 'Autres'
                },
                adminActions: 'Actions administrateur',
                superAdminActions: 'Actions super administrateur',
                manageUsers: 'Gérer les utilisateurs',
                viewStatistics: 'Voir les statistiques',
                systemConfig: 'Configuration système',
                roleManagement: 'Gestion des rôles'
            },
            status: {
                title: 'Statut de l\'utilisateur',
                guest: 'Connectez-vous pour voir votre statut'
            }
        }
    },
    common: {
        loading: 'Chargement...',
        error: 'Une erreur est survenue',
        save: 'Enregistrer',
        cancel: 'Annuler',
        delete: 'Supprimer',
        edit: 'Modifier',
        confirm: 'Confirmer',
        noPermission: 'Vous n\'avez pas les permissions nécessaires pour afficher ce contenu.'
    },
    home: {
        welcome: 'Bienvenue sur votre application',
        description: 'Un layout responsive avec sidebar, header et footer utilisant Shadcn/Vue et Tailwind CSS.',
        features: {
            feature1: {
                title: 'Fonctionnalité 1',
                description: 'Description de la première fonctionnalité de l\'application.'
            },
            feature2: {
                title: 'Fonctionnalité 2',
                description: 'Description de la deuxième fonctionnalité de l\'application.'
            },
            feature3: {
                title: 'Fonctionnalité 3',
                description: 'Description de la troisième fonctionnalité de l\'application.'
            }
        }
    },
    language: {
        selector: 'Langue'
    }
}