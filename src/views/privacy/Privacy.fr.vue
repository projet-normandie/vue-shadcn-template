<!-- src/views/privacy/Privacy.fr.vue -->
<script setup lang="ts">
import { Shield, Eye, Database, Cookie, Mail, Calendar, AlertTriangle, CheckCircle } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'

// Privacy sections data for French
const privacyData = {
  dataCollection: {
    title: 'Collecte des Données',
    icon: Database,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    sections: [
      {
        id: 'personal-data',
        title: 'Données personnelles collectées',
        content: `
          <p>Nous collectons les données suivantes lors de votre inscription et utilisation :</p>
          <ul>
            <li><strong>Données d'identification :</strong> nom d'utilisateur, adresse email</li>
            <li><strong>Données de connexion :</strong> mot de passe (hashé), adresse IP, tokens de session</li>
            <li><strong>Données d'utilisation :</strong> commentaires, articles consultés, préférences de langue</li>
            <li><strong>Données techniques :</strong> type de navigateur, système d'exploitation, résolution d'écran</li>
          </ul>
        `
      },
      {
        id: 'collection-purpose',
        title: 'Finalités de la collecte',
        content: `
          <p>Vos données sont collectées pour :</p>
          <ul>
            <li>Créer et gérer votre compte utilisateur</li>
            <li>Vous permettre de commenter les articles</li>
            <li>Personnaliser votre expérience (langue, préférences)</li>
            <li>Assurer la sécurité de la plateforme</li>
            <li>Améliorer nos services grâce aux statistiques d'usage</li>
          </ul>
        `
      }
    ]
  },
  dataUsage: {
    title: 'Utilisation des Données',
    icon: Eye,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    sections: [
      {
        id: 'data-processing',
        title: 'Traitement des données',
        content: `
          <p>Nous utilisons vos données de manière transparente :</p>
          <ul>
            <li><strong>Authentification :</strong> identification sécurisée via JWT tokens</li>
            <li><strong>Personnalisation :</strong> affichage dans votre langue préférée</li>
            <li><strong>Communication :</strong> notifications importantes sur votre compte</li>
            <li><strong>Modération :</strong> vérification du respect des règles communautaires</li>
          </ul>
        `
      },
      {
        id: 'data-sharing',
        title: 'Partage des données',
        content: `
          <p><strong>Nous ne vendons jamais vos données personnelles.</strong></p>
          <p>Vos données peuvent être partagées uniquement dans les cas suivants :</p>
          <ul>
            <li>Avec votre consentement explicite</li>
            <li>Pour répondre à des obligations légales</li>
            <li>Pour protéger nos droits et ceux des autres utilisateurs</li>
            <li>En cas de fusion ou acquisition d'entreprise (avec notification préalable)</li>
          </ul>
        `
      }
    ]
  },
  cookies: {
    title: 'Cookies et Tracking',
    icon: Cookie,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    sections: [
      {
        id: 'cookies-usage',
        title: 'Utilisation des cookies',
        content: `
          <p>Nous utilisons différents types de cookies :</p>
          <ul>
            <li><strong>Cookies essentiels :</strong> authentification, sécurité, préférences de langue</li>
            <li><strong>Cookies d'analyse :</strong> Google Analytics pour comprendre l'usage (anonymisé)</li>
            <li><strong>Cookies de confort :</strong> mémorisation de vos préférences d'interface</li>
          </ul>
          <p>Vous pouvez désactiver les cookies non-essentiels dans les paramètres de votre navigateur.</p>
        `
      },
      {
        id: 'third-party',
        title: 'Services tiers',
        content: `
          <p>Nous utilisons des services tiers qui peuvent collecter des données :</p>
          <ul>
            <li><strong>Google Analytics :</strong> statistiques d'usage anonymisées</li>
            <li><strong>Hébergement :</strong> serveurs sécurisés en Europe (RGPD compliant)</li>
            <li><strong>CDN :</strong> optimisation du chargement des ressources</li>
          </ul>
        `
      }
    ]
  },
  rights: {
    title: 'Vos Droits RGPD',
    icon: Shield,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    sections: [
      {
        id: 'gdpr-rights',
        title: 'Droits garantis',
        content: `
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d'accès :</strong> consulter toutes les données que nous avons sur vous</li>
            <li><strong>Droit de rectification :</strong> corriger vos données personnelles</li>
            <li><strong>Droit à l'effacement :</strong> supprimer votre compte et vos données</li>
            <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format standard</li>
            <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
            <li><strong>Droit de limitation :</strong> limiter l'utilisation de vos données</li>
          </ul>
        `
      },
      {
        id: 'exercise-rights',
        title: 'Exercer vos droits',
        content: `
          <p>Pour exercer vos droits, plusieurs options :</p>
          <ul>
            <li>Directement dans votre profil pour la modification des données</li>
            <li>En nous contactant à : <strong>privacy@example.com</strong></li>
            <li>Par courrier postal à notre adresse légale</li>
          </ul>
          <p>Nous nous engageons à répondre dans un délai de <strong>30 jours maximum</strong>.</p>
        `
      }
    ]
  },
  security: {
    title: 'Sécurité et Conservation',
    icon: CheckCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    sections: [
      {
        id: 'data-security',
        title: 'Mesures de sécurité',
        content: `
          <p>Vos données sont protégées par :</p>
          <ul>
            <li><strong>Chiffrement :</strong> HTTPS pour toutes les communications</li>
            <li><strong>Authentification :</strong> tokens JWT sécurisés avec expiration</li>
            <li><strong>Mots de passe :</strong> hashage bcrypt, jamais stockés en clair</li>
            <li><strong>Serveurs :</strong> hébergement sécurisé avec sauvegardes chiffrées</li>
            <li><strong>Accès :</strong> strictement limité aux personnes autorisées</li>
          </ul>
        `
      },
      {
        id: 'data-retention',
        title: 'Durée de conservation',
        content: `
          <p>Nous conservons vos données selon les durées suivantes :</p>
          <ul>
            <li><strong>Compte actif :</strong> tant que votre compte existe</li>
            <li><strong>Compte supprimé :</strong> 30 jours (pour permettre la récupération)</li>
            <li><strong>Logs de sécurité :</strong> 12 mois maximum</li>
            <li><strong>Statistiques anonymisées :</strong> sans limite (non personnelles)</li>
          </ul>
        `
      }
    ]
  }
}

const currentDate = new Date().toLocaleDateString('fr-FR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>

<template>
  <div class="container mx-auto max-w-4xl px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="flex justify-center mb-4">
        <div class="bg-primary/10 rounded-full p-3">
          <Shield class="h-8 w-8 text-primary" />
        </div>
      </div>
      <h1 class="text-3xl font-bold mb-2">Politique de Confidentialité</h1>
      <p class="text-muted-foreground text-lg">
        Comment nous collectons, utilisons et protégeons vos données personnelles
      </p>
    </div>

    <!-- Important Notice -->
    <Card class="mb-8 border-blue-200 bg-blue-50">
      <CardContent class="pt-6">
        <div class="flex items-start gap-3">
          <AlertTriangle class="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 class="font-semibold text-blue-800 mb-2">Engagement de transparence</h3>
            <p class="text-blue-700 text-sm">
              Cette politique de confidentialité vous explique en détail comment nous traitons vos données personnelles
              conformément au Règlement Général sur la Protection des Données (RGPD).
              Nous nous engageons à protéger votre vie privée et à vous donner le contrôle sur vos informations.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Privacy Sections -->
    <div class="space-y-8">
      <div
          v-for="(section, key) in privacyData"
          :key="key"
          class="space-y-4"
      >
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-3">
              <div :class="[section.bgColor, 'p-2 rounded-lg']">
                <component :is="section.icon" :class="[section.color, 'h-6 w-6']" />
              </div>
              {{ section.title }}
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-6">
            <div
                v-for="item in section.sections"
                :key="item.id"
                class="border rounded-lg p-4"
            >
              <h4 class="font-semibold mb-3">{{ item.title }}</h4>
              <div
                  class="prose dark:prose-invert max-w-none text-sm"
                  v-html="item.content"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Contact and Updates -->
    <div class="grid md:grid-cols-2 gap-6 mt-8">
      <!-- Contact DPO -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Mail class="h-5 w-5 text-primary" />
            Contact DPO
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground mb-4">
            Pour toute question concernant vos données personnelles :
          </p>
          <div class="space-y-2 text-sm">
            <p><strong>Email :</strong> dpo@example.com</p>
            <p><strong>Courrier :</strong></p>
            <address class="ml-4 not-italic text-muted-foreground">
              DPO - Protection des Données<br>
              123 Rue de la Privacy<br>
              75000 Paris, France
            </address>
          </div>
        </CardContent>
      </Card>

      <!-- Last Update -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Calendar class="h-5 w-5 text-primary" />
            Mise à jour
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground mb-4">
            Cette politique a été mise à jour le :
          </p>
          <p class="font-semibold">{{ currentDate }}</p>
          <p class="text-xs text-muted-foreground mt-2">
            Nous vous notifierons par email en cas de modification importante.
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Footer -->
    <Card class="mt-8">
      <CardContent class="pt-6">
        <div class="text-center">
          <CheckCircle class="h-8 w-8 text-green-600 mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2">Vos données, vos droits</h3>
          <p class="text-muted-foreground mb-4">
            Nous nous engageons à respecter votre vie privée et à vous donner le contrôle total sur vos données personnelles.
          </p>
          <div class="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">RGPD Compliant</Badge>
            <Badge variant="outline">Hébergement Europe</Badge>
            <Badge variant="outline">Chiffrement SSL</Badge>
            <Badge variant="outline">Accès Sécurisé</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.prose :deep(ul) {
  list-style-type: disc;
  list-style-position: inside;
  margin-left: 1rem;
}

.prose :deep(li) {
  margin-bottom: 0.5rem;
}

.prose :deep(p) {
  margin-bottom: 0.75rem;
}

.prose :deep(strong) {
  font-weight: 600;
  color: hsl(var(--foreground));
}
</style>
