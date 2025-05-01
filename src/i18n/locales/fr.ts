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
            rememberMe: 'Se souvenir de moi',
            loginButton: 'Se connecter',
            loginInProgress: 'Connexion en cours...',
            forgotPassword: 'Mot de passe oublié?'
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