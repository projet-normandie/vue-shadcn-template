// src/i18n/locales/pt-br/auth.ts

export default {
    login: {
        title: 'Entrar',
        subtitle: 'Conecte-se para acessar o painel',
        username: 'Nome de usuário',
        password: 'Senha',
        enterUsername: 'Digite seu nome de usuário',
        enterPassword: 'Digite sua senha',
        loginButton: 'Entrar',
        loginInProgress: 'Entrando...',
        forgotPassword: 'Esqueceu a senha?',
        noAccount: 'Não tem uma conta?',
        registerLink: 'Registre-se agora'
    },
    register: {
        title: 'Criar Conta',
        subtitle: 'Registre-se para se juntar à nossa comunidade',
        email: 'E-mail',
        username: 'Nome de usuário',
        password: 'Senha',
        confirmPassword: 'Confirmar Senha',
        enterEmail: 'Digite seu endereço de e-mail',
        enterUsername: 'Escolha um nome de usuário',
        enterPassword: 'Escolha uma senha',
        enterConfirmPassword: 'Confirme sua senha',
        registerButton: 'Criar Conta',
        registerInProgress: 'Criando conta...',
        alreadyHaveAccount: 'Já tem uma conta?',
        loginLink: 'Entrar',
        validation: {
            email: 'Por favor, digite um endereço de e-mail válido',
            username: 'Nome de usuário deve ter 3-20 caracteres (letras, números, sublinhados)',
            password: 'Senha deve ter pelo menos 8 caracteres com letras e números',
            passwordMatch: 'Senhas não coincidem'
        },
        success: {
            title: 'Conta Criada',
            description: 'Sua conta foi criada com sucesso. Agora você pode fazer login.'
        },
        error: {
            title: 'Falha no Registro',
            default: 'Ocorreu um erro durante o registro. Por favor, tente novamente.',
            usernameTaken: 'Este nome de usuário já está em uso',
            emailTaken: 'Este e-mail já está registrado'
        }
    },
    forgotPassword: {
        title: 'Esqueci a Senha',
        subtitle: 'Digite seu e-mail para receber um link de redefinição de senha',
        email: 'E-mail',
        enterEmail: 'Digite seu endereço de e-mail',
        sendResetLink: 'Enviar Link de Redefinição',
        sendingLink: 'Enviando...',
        backToLogin: 'Voltar ao login',
        success: {
            title: 'Link de Redefinição Enviado',
            description: 'Verifique seu e-mail para instruções sobre como redefinir sua senha'
        },
        error: {
            title: 'Erro',
            default: 'Não foi possível enviar o link de redefinição. Por favor, tente novamente.',
            noEmail: 'Por favor, digite seu endereço de e-mail'
        }
    },
    resetPassword: {
        title: 'Redefinir Senha',
        subtitle: 'Digite sua nova senha',
        newPassword: 'Nova Senha',
        confirmPassword: 'Confirmar Senha',
        enterNewPassword: 'Digite sua nova senha',
        enterConfirmPassword: 'Confirme sua nova senha',
        resetButton: 'Redefinir Senha',
        resetting: 'Redefinindo...',
        validation: {
            passwordRequired: 'Senha é obrigatória',
            passwordLength: 'Senha deve ter pelo menos 8 caracteres',
            passwordMatch: 'Senhas não coincidem'
        },
        success: {
            title: 'Senha Redefinida',
            description: 'Sua senha foi redefinida com sucesso. Agora você pode fazer login com sua nova senha.'
        },
        error: {
            title: 'Falha na Redefinição',
            default: 'Não foi possível redefinir a senha. Por favor, tente novamente.',
            invalidToken: 'Token de redefinição inválido ou expirado',
            tokenRequired: 'Token de redefinição é obrigatório'
        }
    },
    token: {
        status: {
            notConnected: 'Não conectado',
            expired: 'Expirado',
            unknown: 'Desconhecido',
            expiringSoon: 'Expirando em breve',
            valid: 'Válido',
            unavailable: 'Não disponível',
            refreshButton: 'Atualizar token',
            refreshing: 'Atualizando...'
        }
    },
    profile: {
        title: 'Perfil do Usuário',
        subtitle: 'Suas informações pessoais',
        sections: {
            authentication: 'Informações de Autenticação',
            account: 'Informações da Conta',
            player: 'Informações do Jogador',
            roles: 'Funções e Permissões'
        },
        fields: {
            tokenStatus: 'Status do Token',
            tokenExpiration: 'Expiração do Token',
            id: 'ID',
            username: 'Nome de usuário',
            slug: 'Slug',
            mainRoles: 'Funções Principais',
            allRoles: 'Todas as Funções'
        },
        links: {
            quickLinks: 'Links Rápidos',
            dashboard: 'Painel',
            editProfile: 'Editar Perfil',
            changePassword: 'Alterar Senha',
            deleteAccount: 'Excluir Conta'
        },
        roles: {
            categories: {
                title: 'Categorias de Permissão',
                admin: 'Administração',
                sonata: 'Sonata',
                vgr: 'VGR',
                other: 'Outros'
            },
            adminActions: 'Ações de Administrador',
            superAdminActions: 'Ações de Super Administrador',
            manageUsers: 'Gerenciar Usuários',
            viewStatistics: 'Ver Estatísticas',
            systemConfig: 'Configuração do Sistema',
            roleManagement: 'Gerenciamento de Funções'
        },
        status: {
            title: 'Status do Usuário',
            guest: 'Conecte-se para ver seu status'
        }
    }
}