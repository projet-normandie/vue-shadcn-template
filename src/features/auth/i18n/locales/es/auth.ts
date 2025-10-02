// src/i18n/locales/es/auth.ts

export default {
    login: {
        title: 'Iniciar sesión',
        subtitle: 'Conéctate para acceder al panel',
        username: 'Nombre de usuario',
        password: 'Contraseña',
        enterUsername: 'Introduce tu nombre de usuario',
        enterPassword: 'Introduce tu contraseña',
        loginButton: 'Iniciar sesión',
        loginInProgress: 'Iniciando sesión...',
        forgotPassword: '¿Olvidaste tu contraseña?',
        noAccount: '¿No tienes una cuenta?',
        registerLink: 'Regístrate ahora'
    },
    register: {
        title: 'Crear cuenta',
        subtitle: 'Regístrate para unirte a nuestra comunidad',
        email: 'Correo electrónico',
        username: 'Nombre de usuario',
        password: 'Contraseña',
        confirmPassword: 'Confirmar contraseña',
        enterEmail: 'Introduce tu dirección de correo electrónico',
        enterUsername: 'Elige un nombre de usuario',
        enterPassword: 'Elige una contraseña',
        enterConfirmPassword: 'Confirma tu contraseña',
        registerButton: 'Crear cuenta',
        registerInProgress: 'Creando cuenta...',
        alreadyHaveAccount: '¿Ya tienes una cuenta?',
        loginLink: 'Iniciar sesión',
        validation: {
            email: 'Por favor introduce una dirección de correo electrónico válida',
            username: 'El nombre de usuario debe tener 3-20 caracteres (letras, números, guiones bajos)',
            password: 'La contraseña debe tener al menos 8 caracteres con letras y números',
            passwordMatch: 'Las contraseñas no coinciden'
        },
        success: {
            title: 'Cuenta creada',
            description: 'Tu cuenta ha sido creada exitosamente. Ya puedes iniciar sesión.'
        },
        error: {
            title: 'Error en el registro',
            default: 'Ocurrió un error durante el registro. Por favor inténtalo de nuevo.',
            usernameTaken: 'Este nombre de usuario ya está en uso',
            emailTaken: 'Este correo electrónico ya está registrado'
        }
    },
    forgotPassword: {
        title: 'Olvidé mi contraseña',
        subtitle: 'Introduce tu correo para recibir un enlace de restablecimiento',
        email: 'Correo electrónico',
        enterEmail: 'Introduce tu dirección de correo electrónico',
        sendResetLink: 'Enviar enlace de restablecimiento',
        sendingLink: 'Enviando...',
        backToLogin: 'Volver al inicio de sesión',
        success: {
            title: 'Enlace enviado',
            description: 'Revisa tu correo para obtener instrucciones sobre cómo restablecer tu contraseña'
        },
        error: {
            title: 'Error',
            default: 'No se pudo enviar el enlace de restablecimiento. Por favor inténtalo de nuevo.',
            noEmail: 'Por favor introduce tu dirección de correo electrónico'
        }
    },
    resetPassword: {
        title: 'Restablecer contraseña',
        subtitle: 'Introduce tu nueva contraseña',
        newPassword: 'Nueva contraseña',
        confirmPassword: 'Confirmar contraseña',
        enterNewPassword: 'Introduce tu nueva contraseña',
        enterConfirmPassword: 'Confirma tu nueva contraseña',
        resetButton: 'Restablecer contraseña',
        resetting: 'Restableciendo...',
        validation: {
            passwordRequired: 'La contraseña es obligatoria',
            passwordLength: 'La contraseña debe tener al menos 8 caracteres',
            passwordMatch: 'Las contraseñas no coinciden'
        },
        success: {
            title: 'Contraseña restablecida',
            description: 'Tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.'
        },
        error: {
            title: 'Error en el restablecimiento',
            default: 'No se pudo restablecer la contraseña. Por favor inténtalo de nuevo.',
            invalidToken: 'Token de restablecimiento inválido o expirado',
            tokenRequired: 'Se requiere un token de restablecimiento'
        }
    },
    token: {
        status: {
            notConnected: 'No conectado',
            expired: 'Expirado',
            unknown: 'Desconocido',
            expiringSoon: 'Expira pronto',
            valid: 'Válido',
            unavailable: 'No disponible',
            refreshButton: 'Actualizar token',
            refreshing: 'Actualizando...'
        }
    },
    profile: {
        title: 'Perfil de usuario',
        subtitle: 'Tu información personal',
        sections: {
            authentication: 'Información de autenticación',
            account: 'Información de la cuenta',
            player: 'Información del jugador',
            roles: 'Roles y permisos'
        },
        fields: {
            tokenStatus: 'Estado del token',
            tokenExpiration: 'Expiración del token',
            id: 'ID',
            username: 'Nombre de usuario',
            slug: 'Slug',
            mainRoles: 'Roles principales',
            allRoles: 'Todos los roles'
        },
        links: {
            quickLinks: 'Enlaces rápidos',
            dashboard: 'Panel',
            editProfile: 'Editar perfil',
            changePassword: 'Cambiar contraseña',
            deleteAccount: 'Eliminar cuenta'
        },
        roles: {
            categories: {
                title: 'Categorías de permisos',
                admin: 'Administración',
                sonata: 'Sonata',
                vgr: 'VGR',
                other: 'Otros'
            },
            adminActions: 'Acciones de administrador',
            superAdminActions: 'Acciones de super administrador',
            manageUsers: 'Gestionar usuarios',
            viewStatistics: 'Ver estadísticas',
            systemConfig: 'Configuración del sistema',
            roleManagement: 'Gestión de roles'
        },
        status: {
            title: 'Estado del usuario',
            guest: 'Conéctate para ver tu estado'
        }
    }
}