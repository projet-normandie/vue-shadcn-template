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
            terms: 'Conditions d\'utilisation',
            contact: 'Contact',
            rules: 'Règlement',
            about: 'À propos'
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
    articles: {
        latest: 'Derniers Articles',
        viewAll: 'Voir tout',
        noArticles: 'Aucun article disponible',
        backToHome: 'Retour à l\'accueil',
        returnToHome: 'Retourner à l\'accueil',
        error: {
            title: 'Erreur',
            loadFailed: 'Échec du chargement des articles',
            invalidId: 'ID d\'article invalide'
        },
        notFound: {
            title: 'Article non trouvé',
            description: 'L\'article que vous recherchez n\'existe pas ou a été supprimé.'
        }
    },
    comments: {
        title: 'Commentaires',
        show: 'Afficher les commentaires',
        hide: 'Masquer les commentaires',
        empty: 'Aucun commentaire pour le moment. Soyez le premier à partager votre avis !',
        loadMore: 'Charger plus de commentaires',
        edited: 'modifié',
        loginRequired: 'Vous devez être connecté pour poster un commentaire.',
        loginLink: 'Se connecter',
        form: {
            title: 'Ajouter un commentaire',
            content: 'Votre commentaire',
            placeholder: 'Partagez votre avis sur cet article...',
            submit: 'Poster le commentaire',
            submitting: 'Envoi en cours...',
            clear: 'Effacer',
            minCharacters: 'Minimum 3 caractères requis',
            characters: 'caractères',
            helpText: 'Vous pouvez utiliser la mise en forme de base : gras, italique, listes et liens.'
        },
        actions: {
            edit: 'Modifier',
            save: 'Enregistrer les modifications',
            cancel: 'Annuler'
        },
        success: {
            title: 'Succès',
            added: 'Votre commentaire a été publié.',
            updated: 'Votre commentaire a été mis à jour.'
        },
        error: {
            title: 'Erreur',
            default: 'Une erreur est survenue. Veuillez réessayer.',
            loadFailed: 'Échec du chargement des commentaires.',
            updateFailed: 'Échec de la mise à jour du commentaire.',
            notAuthorized: 'Vous n\'êtes pas autorisé à modifier ce commentaire.'
        }
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
        forgotPassword: {
            title: 'Mot de passe oublié',
            subtitle: 'Entrez votre email pour recevoir un lien de réinitialisation',
            email: 'Email',
            enterEmail: 'Entrez votre adresse email',
            sendResetLink: 'Envoyer le lien',
            sendingLink: 'Envoi en cours...',
            backToLogin: 'Retour à la connexion',
            success: {
                title: 'Lien envoyé',
                description: 'Vérifiez votre email pour les instructions de réinitialisation de mot de passe'
            },
            error: {
                title: 'Erreur',
                default: 'Impossible d\'envoyer le lien de réinitialisation. Veuillez réessayer.',
                noEmail: 'Veuillez entrer votre adresse email'
            }
        },
        resetPassword: {
            title: 'Réinitialiser le mot de passe',
            subtitle: 'Entrez votre nouveau mot de passe',
            newPassword: 'Nouveau mot de passe',
            confirmPassword: 'Confirmer le mot de passe',
            enterNewPassword: 'Entrez votre nouveau mot de passe',
            enterConfirmPassword: 'Confirmez votre nouveau mot de passe',
            resetButton: 'Réinitialiser le mot de passe',
            resetting: 'Réinitialisation en cours...',
            validation: {
                passwordRequired: 'Le mot de passe est requis',
                passwordLength: 'Le mot de passe doit contenir au moins 8 caractères',
                passwordMatch: 'Les mots de passe ne correspondent pas'
            },
            success: {
                title: 'Mot de passe réinitialisé',
                description: 'Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.'
            },
            error: {
                title: 'Échec de la réinitialisation',
                default: 'Impossible de réinitialiser le mot de passe. Veuillez réessayer.',
                invalidToken: 'Le lien de réinitialisation est invalide ou a expiré',
                tokenRequired: 'Le token de réinitialisation est requis'
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
    profile: {
        title: 'Paramètres du profil',
        subtitle: 'Gérez vos paramètres de compte et vos préférences',
        tabs: {
            info: 'Informations personnelles',
            avatar: 'Photo de profil',
            password: 'Mot de passe'
        },
        fields: {
            username: 'Nom d\'utilisateur',
            email: 'Adresse email',
            language: 'Langue préférée'
        },
        placeholders: {
            username: 'Entrez votre nom d\'utilisateur',
            email: 'Entrez votre adresse email',
            language: 'Sélectionnez votre langue préférée'
        },
        descriptions: {
            username: 'Votre nom d\'utilisateur sera visible par les autres utilisateurs',
            email: 'Nous ne partagerons jamais votre email avec des tiers',
            language: 'Choisissez la langue de l\'interface'
        },
        validation: {
            required: 'Ce champ est requis',
            usernameLength: 'Le nom d\'utilisateur doit comporter au moins 3 caractères',
            usernameMax: 'Le nom d\'utilisateur doit comporter au plus 20 caractères',
            usernameFormat: 'Le nom d\'utilisateur ne peut contenir que des lettres, des chiffres et des underscores',
            emailFormat: 'Veuillez entrer une adresse email valide',
            passwordLength: 'Le mot de passe doit comporter au moins 8 caractères'
        },
        buttons: {
            save: 'Enregistrer les modifications',
            saving: 'Enregistrement...',
            cancel: 'Annuler'
        },
        password: {
            fields: {
                current: 'Mot de passe actuel',
                new: 'Nouveau mot de passe',
                confirm: 'Confirmer le nouveau mot de passe'
            },
            placeholders: {
                current: 'Entrez votre mot de passe actuel',
                new: 'Entrez votre nouveau mot de passe',
                confirm: 'Confirmez votre nouveau mot de passe'
            },
            descriptions: {
                requirements: 'Le mot de passe doit contenir au moins 8 caractères avec des lettres et des chiffres'
            },
            validation: {
                currentRequired: 'Le mot de passe actuel est requis',
                newLength: 'Le nouveau mot de passe doit contenir au moins 8 caractères',
                newLetters: 'Le nouveau mot de passe doit contenir au moins une lettre',
                newNumbers: 'Le nouveau mot de passe doit contenir au moins un chiffre',
                passwordMatch: 'Les mots de passe ne correspondent pas'
            },
            buttons: {
                change: 'Changer de mot de passe',
                changing: 'Changement en cours...'
            },
            success: {
                title: 'Mot de passe changé',
                changed: 'Votre mot de passe a été changé avec succès'
            },
            error: {
                title: 'Erreur',
                changeFailed: 'Échec du changement de mot de passe. Veuillez vérifier votre mot de passe actuel et réessayer.',
                validationFailed: 'Échec de validation du mot de passe'
            }
        },
        avatar: {
            currentAvatar: 'Photo de profil actuelle',
            description: 'Cette photo sera affichée sur votre profil et vos commentaires',
            sizeInfo: 'L\'avatar sera redimensionné à 100x100 pixels',
            dragDrop: 'Glissez-déposez une image ici, ou cliquez pour parcourir',
            fileTypes: 'PNG, JPG ou GIF jusqu\'à 2 Mo',
            browse: 'Parcourir les fichiers',
            selectFile: 'Sélectionner un fichier',
            upload: 'Télécharger la photo',
            uploading: 'Téléchargement...',
            success: {
                title: 'Succès',
                uploaded: 'Votre photo de profil a été mise à jour'
            },
            error: {
                title: 'Erreur',
                invalidType: 'Type de fichier invalide. Veuillez télécharger un PNG, JPG ou GIF',
                tooLarge: 'Le fichier est trop volumineux. La taille maximale est de 2 Mo',
                uploadFailed: 'Échec du téléchargement de la photo de profil'
            }
        },
        authentication: {
            title: 'Statut d\'authentification'
        },
        success: {
            title: 'Succès',
            updated: 'Votre profil a été mis à jour'
        },
        error: {
            title: 'Erreur',
            loadFailed: 'Échec du chargement des données du profil',
            updateFailed: 'Échec de la mise à jour du profil'
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
    },
    error: {
        notFound: {
            title: 'Page Non Trouvée',
            subtitle: 'Oups ! Cette page n\'existe pas.',
            description: 'La page que vous recherchez a peut-être été supprimée, renommée ou est temporairement indisponible.',
            back: 'Retour',
            home: 'Retour à l\'accueil'
        }
    }
}