<!-- src/views/terms/Terms.fr.vue -->
<script setup lang="ts">
import { FileText, Users, Shield, AlertTriangle, Scale, Ban, CheckCircle, Mail } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

// Terms sections data for French
const termsData = {
  acceptance: {
    title: 'Acceptation des Conditions',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    sections: [
      {
        id: 'agreement',
        title: 'Accord contractuel',
        content: `
          <p>En créant un compte ou en utilisant notre plateforme, vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation (CGU).</p>
          <p><strong>Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser nos services.</strong></p>
          <ul>
            <li>Ces CGU constituent un contrat légalement contraignant entre vous et nous</li>
            <li>Votre utilisation continue du service constitue une acceptation de toute modification</li>
            <li>Nous nous réservons le droit de modifier ces conditions à tout moment</li>
            <li>Les modifications importantes vous seront notifiées par email</li>
          </ul>
        `
      },
      {
        id: 'eligibility',
        title: 'Conditions d\'éligibilité',
        content: `
          <p>Pour utiliser notre service, vous devez :</p>
          <ul>
            <li>Avoir au moins <strong>13 ans</strong> (ou l'âge légal dans votre pays)</li>
            <li>Fournir des informations exactes et complètes lors de l'inscription</li>
            <li>Maintenir la sécurité de votre compte et mot de passe</li>
            <li>Accepter d'être responsable de toute activité sous votre compte</li>
            <li>Ne pas être précédemment banni de notre plateforme</li>
          </ul>
        `
      }
    ]
  },
  services: {
    title: 'Description des Services',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    sections: [
      {
        id: 'platform-services',
        title: 'Services proposés',
        content: `
          <p>Notre plateforme vous offre :</p>
          <ul>
            <li><strong>Consultation d'articles :</strong> accès gratuit au contenu publié</li>
            <li><strong>Système de commentaires :</strong> participation aux discussions</li>
            <li><strong>Profil utilisateur :</strong> gestion de vos informations personnelles</li>
            <li><strong>Notifications :</strong> alertes sur l'activité de votre compte</li>
            <li><strong>Interface multilingue :</strong> utilisation en français et anglais</li>
          </ul>
          <p>Nous nous efforçons de maintenir la disponibilité du service 24h/24, 7j/7, mais ne garantissons pas une disponibilité ininterrompue.</p>
        `
      },
      {
        id: 'service-evolution',
        title: 'Évolution du service',
        content: `
          <p>Nous nous réservons le droit de :</p>
          <ul>
            <li>Modifier, suspendre ou interrompre tout ou partie du service</li>
            <li>Ajouter ou supprimer des fonctionnalités</li>
            <li>Effectuer des maintenances programmées ou d'urgence</li>
            <li>Mettre à jour l'interface utilisateur</li>
          </ul>
          <p>Les modifications importantes seront communiquées avec un préavis raisonnable.</p>
        `
      }
    ]
  },
  userObligations: {
    title: 'Obligations des Utilisateurs',
    icon: Shield,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    sections: [
      {
        id: 'prohibited-conduct',
        title: 'Conduites interdites',
        content: `
          <p>Il est strictement interdit de :</p>
          <ul>
            <li><strong>Publier du contenu illégal :</strong> diffamation, harcèlement, contenu haineux</li>
            <li><strong>Violer la propriété intellectuelle :</strong> plagiat, contrefaçon</li>
            <li><strong>Compromettre la sécurité :</strong> hacking, phishing, malware</li>
            <li><strong>Spammer :</strong> messages répétitifs, publicité non sollicitée</li>
            <li><strong>Usurper l'identité :</strong> se faire passer pour autrui</li>
            <li><strong>Contourner les restrictions :</strong> création de comptes multiples après bannissement</li>
          </ul>
        `
      },
      {
        id: 'content-responsibility',
        title: 'Responsabilité du contenu',
        content: `
          <p>Vous êtes entièrement responsable du contenu que vous publiez :</p>
          <ul>
            <li>Vos commentaires doivent respecter nos règles communautaires</li>
            <li>Vous garantissez détenir les droits sur le contenu publié</li>
            <li>Vous acceptez que votre contenu soit modéré</li>
            <li>Vous renoncez à toute réclamation contre nous concernant la modération</li>
          </ul>
          <p><strong>Nous nous réservons le droit de supprimer tout contenu inapproprié sans préavis.</strong></p>
        `
      }
    ]
  },
  intellectualProperty: {
    title: 'Propriété Intellectuelle',
    icon: Scale,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    sections: [
      {
        id: 'our-content',
        title: 'Notre contenu',
        content: `
          <p>Le contenu de la plateforme nous appartient ou est utilisé sous licence :</p>
          <ul>
            <li><strong>Articles :</strong> textes, images, vidéos publiés par nos équipes</li>
            <li><strong>Interface :</strong> design, code, architecture technique</li>
            <li><strong>Marques :</strong> logo, nom, éléments visuels identitaires</li>
            <li><strong>Fonctionnalités :</strong> algorithmes, processus techniques</li>
          </ul>
          <p>Toute reproduction sans autorisation est interdite et constitue une contrefaçon.</p>
        `
      },
      {
        id: 'user-content',
        title: 'Contenu utilisateur',
        content: `
          <p>Concernant le contenu que vous publiez :</p>
          <ul>
            <li>Vous conservez la propriété de votre contenu</li>
            <li>Vous nous accordez une licence pour l'afficher et le traiter</li>
            <li>Cette licence est mondiale, non-exclusive et gratuite</li>
            <li>Elle inclut le droit de modérer et supprimer le contenu</li>
            <li>La licence expire si vous supprimez votre contenu</li>
          </ul>
        `
      }
    ]
  },
  liability: {
    title: 'Responsabilité et Garanties',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    sections: [
      {
        id: 'service-availability',
        title: 'Disponibilité du service',
        content: `
          <p>Concernant la disponibilité de nos services :</p>
          <ul>
            <li>Nous nous efforçons de maintenir le service accessible</li>
            <li>Aucune garantie de disponibilité 100% n'est fournie</li>
            <li>Des interruptions peuvent survenir pour maintenance</li>
            <li>Nous ne sommes pas responsables des pannes techniques</li>
            <li>Les cas de force majeure nous dégagent de toute responsabilité</li>
          </ul>
        `
      },
      {
        id: 'limitation-liability',
        title: 'Limitation de responsabilité',
        content: `
          <p>Notre responsabilité est limitée dans les cas suivants :</p>
          <ul>
            <li><strong>Contenu utilisateur :</strong> nous ne sommes pas responsables des commentaires</li>
            <li><strong>Liens externes :</strong> pas de responsabilité pour les sites tiers</li>
            <li><strong>Perte de données :</strong> sauvegardez vos informations importantes</li>
            <li><strong>Dommages indirects :</strong> pas de responsabilité pour les préjudices indirects</li>
          </ul>
          <p>En cas de dommage prouvé, notre responsabilité est limitée au montant des frais payés (service gratuit = 0€).</p>
        `
      }
    ]
  },
  termination: {
    title: 'Résiliation et Sanctions',
    icon: Ban,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    sections: [
      {
        id: 'account-termination',
        title: 'Résiliation de compte',
        content: `
          <p>Votre compte peut être résilié dans les cas suivants :</p>
          <ul>
            <li><strong>À votre demande :</strong> suppression volontaire de votre compte</li>
            <li><strong>Violation des CGU :</strong> non-respect des règles</li>
            <li><strong>Comportement abusif :</strong> harcèlement, spam persistant</li>
            <li><strong>Inactivité prolongée :</strong> après 2 ans sans connexion</li>
            <li><strong>Fermeture du service :</strong> arrêt de la plateforme</li>
          </ul>
        `
      },
      {
        id: 'consequences',
        title: 'Conséquences de la résiliation',
        content: `
          <p>En cas de résiliation de votre compte :</p>
          <ul>
            <li>Vous perdez l'accès à votre profil et vos données</li>
            <li>Vos commentaires peuvent être conservés (anonymisés)</li>
            <li>Les données personnelles sont supprimées selon notre politique</li>
            <li>Vous ne pouvez pas créer de nouveau compte sans autorisation</li>
            <li>Les obligations légales survivent à la résiliation</li>
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
          <FileText class="h-8 w-8 text-primary" />
        </div>
      </div>
      <h1 class="text-3xl font-bold mb-2">Conditions Générales d'Utilisation</h1>
      <p class="text-muted-foreground text-lg">
        Les règles qui régissent l'utilisation de notre plateforme
      </p>
    </div>

    <!-- Important Notice -->
    <Card class="mb-8 border-amber-200 bg-amber-50">
      <CardContent class="pt-6">
        <div class="flex items-start gap-3">
          <AlertTriangle class="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 class="font-semibold text-amber-800 mb-2">Contrat légalement contraignant</h3>
            <p class="text-amber-700 text-sm">
              Ces Conditions Générales d'Utilisation constituent un contrat légal entre vous et notre plateforme.
              En utilisant nos services, vous acceptez d'être lié par ces conditions.
              Veuillez les lire attentivement avant de continuer.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Terms Sections -->
    <div class="space-y-8">
      <div
          v-for="(section, key) in termsData"
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

    <!-- Legal Information -->
    <div class="grid md:grid-cols-2 gap-6 mt-8">
      <!-- Contact Legal -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Mail class="h-5 w-5 text-primary" />
            Contact Juridique
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground mb-4">
            Pour toute question relative aux présentes CGU :
          </p>
          <div class="space-y-2 text-sm">
            <p><strong>Email :</strong> legal@example.com</p>
            <p><strong>Courrier :</strong></p>
            <address class="ml-4 not-italic text-muted-foreground">
              Service Juridique<br>
              123 Rue des CGU<br>
              75000 Paris, France
            </address>
          </div>
        </CardContent>
      </Card>

      <!-- Governing Law -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Scale class="h-5 w-5 text-primary" />
            Droit Applicable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-3 text-sm">
            <div>
              <p class="font-semibold">Loi applicable :</p>
              <p class="text-muted-foreground">Droit français</p>
            </div>
            <div>
              <p class="font-semibold">Juridiction :</p>
              <p class="text-muted-foreground">Tribunaux de Paris</p>
            </div>
            <div>
              <p class="font-semibold">Langue :</p>
              <p class="text-muted-foreground">Version française fait foi</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Footer -->
    <Card class="mt-8">
      <CardContent class="pt-6">
        <div class="text-center">
          <CheckCircle class="h-8 w-8 text-green-600 mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2">Utilisation Responsable</h3>
          <p class="text-muted-foreground mb-4">
            En respectant ces conditions, vous contribuez à maintenir une communauté saine et respectueuse pour tous.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <span class="text-muted-foreground">
              <strong>Version en vigueur depuis le :</strong> {{ currentDate }}
            </span>
            <span class="hidden sm:inline text-muted-foreground">•</span>
            <a
                href="/rules"
                class="text-primary hover:underline font-medium"
            >
              Consulter le règlement communautaire
            </a>
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
