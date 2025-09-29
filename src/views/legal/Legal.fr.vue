<!-- src/views/legal/Legal.fr.vue -->
<script setup lang="ts">
import { Scale, Building, Phone, Mail, Globe, Calendar, Shield, AlertTriangle } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'

// Legal information data for French
const legalData = {
  company: {
    title: 'Informations sur l\'éditeur',
    icon: Building,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    sections: [
      {
        id: 'company-info',
        title: 'Société éditrice',
        content: `
          <div class="space-y-3">
            <div>
              <strong>Dénomination sociale :</strong> Mon Application SAS<br>
              <strong>Forme juridique :</strong> Société par Actions Simplifiée<br>
              <strong>Capital social :</strong> 10 000 €<br>
              <strong>SIRET :</strong> 123 456 789 00012<br>
              <strong>Code APE/NAF :</strong> 6201Z (Programmation informatique)
            </div>
            <div>
              <strong>Siège social :</strong><br>
              123 Rue de la Tech<br>
              75001 Paris, France
            </div>
            <div>
              <strong>RCS :</strong> Paris B 123 456 789<br>
              <strong>TVA Intracommunautaire :</strong> FR12345678901
            </div>
          </div>
        `
      },
      {
        id: 'management',
        title: 'Direction et représentation légale',
        content: `
          <div class="space-y-2">
            <div>
              <strong>Président :</strong> M. Jean DUPONT<br>
              <strong>Directeur de la publication :</strong> M. Jean DUPONT
            </div>
            <div>
              <strong>Responsable éditorial :</strong> Mme Marie MARTIN<br>
              <strong>Email :</strong> editorial@example.com
            </div>
          </div>
        `
      }
    ]
  },
  contact: {
    title: 'Coordonnées',
    icon: Phone,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    sections: [
      {
        id: 'contact-info',
        title: 'Nous contacter',
        content: `
          <div class="space-y-3">
            <div>
              <strong>Adresse postale :</strong><br>
              Mon Application SAS<br>
              123 Rue de la Tech<br>
              75001 Paris, France
            </div>
            <div>
              <strong>Téléphone :</strong> +33 1 23 45 67 89<br>
              <strong>Email général :</strong> contact@example.com<br>
              <strong>Email support :</strong> support@example.com
            </div>
            <div>
              <strong>Horaires d'ouverture :</strong><br>
              Du lundi au vendredi : 9h00 - 18h00<br>
              Fermé les week-ends et jours fériés
            </div>
          </div>
        `
      }
    ]
  },
  hosting: {
    title: 'Hébergement',
    icon: Globe,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    sections: [
      {
        id: 'hosting-info',
        title: 'Prestataire d\'hébergement',
        content: `
          <div class="space-y-3">
            <div>
              <strong>Hébergeur :</strong> OVH SAS<br>
              <strong>Siège social :</strong> 2 rue Kellermann, 59100 Roubaix, France<br>
              <strong>Téléphone :</strong> 1007 (numéro non surtaxé)
            </div>
            <div>
              <strong>Serveurs :</strong> Union Européenne (RGPD compliant)<br>
              <strong>Localisation des données :</strong> France et Allemagne<br>
              <strong>Sécurité :</strong> Chiffrement SSL/TLS, sauvegardes quotidiennes
            </div>
          </div>
        `
      },
      {
        id: 'technical-info',
        title: 'Informations techniques',
        content: `
          <div class="space-y-2">
            <div>
              <strong>Technologies utilisées :</strong><br>
              • Frontend: Vue.js 3, TypeScript, Tailwind CSS<br>
              • Backend: Symfony 7, PHP 8.4<br>
              • Base de données: Mysql<br>
              • CDN: CloudFlare
            </div>
            <div>
              <strong>Certificats de sécurité :</strong><br>
              • SSL/TLS Let's Encrypt<br>
              • Conformité HTTPS obligatoire<br>
              • Headers de sécurité (HSTS, CSP)
            </div>
          </div>
        `
      }
    ]
  },
  legal: {
    title: 'Aspects juridiques',
    icon: Scale,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    sections: [
      {
        id: 'applicable-law',
        title: 'Droit applicable et juridiction',
        content: `
          <div class="space-y-2">
            <div>
              <strong>Droit applicable :</strong> Droit français<br>
              <strong>Juridiction compétente :</strong> Tribunaux de Paris<br>
              <strong>Langue de référence :</strong> Français
            </div>
            <div>
              <strong>En cas de litige :</strong><br>
              Tout litige relatif à l'utilisation de ce site sera soumis
              à la compétence exclusive des tribunaux de Paris,
              nonobstant pluralité de défendeurs ou appel en garantie.
            </div>
          </div>
        `
      },
      {
        id: 'intellectual-property',
        title: 'Propriété intellectuelle',
        content: `
          <div class="space-y-2">
            <div>
              <strong>Droits d'auteur :</strong><br>
              L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.)
              est protégé par le droit d'auteur et appartient à Mon Application SAS
              ou à ses partenaires.
            </div>
            <div>
              <strong>Utilisation autorisée :</strong><br>
              La consultation et l'utilisation du site à des fins personnelles
              sont autorisées. Toute reproduction, représentation, modification,
              publication ou transmission de tout ou partie du contenu,
              par quelque procédé que ce soit, est strictement interdite
              sans autorisation écrite préalable.
            </div>
          </div>
        `
      }
    ]
  },
  privacy: {
    title: 'Protection des données',
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    sections: [
      {
        id: 'data-protection',
        title: 'Conformité RGPD',
        content: `
          <div class="space-y-2">
            <div>
              <strong>Responsable de traitement :</strong> Mon Application SAS<br>
              <strong>DPO (Délégué à la Protection des Données) :</strong><br>
              Email: dpo@example.com<br>
              Courrier: DPO - Mon Application SAS, 123 Rue de la Tech, 75001 Paris
            </div>
            <div>
              <strong>Finalités du traitement :</strong><br>
              • Gestion des comptes utilisateurs<br>
              • Fonctionnement du service (commentaires, préférences)<br>
              • Amélioration de nos services<br>
              • Communication avec les utilisateurs
            </div>
          </div>
        `
      },
      {
        id: 'user-rights',
        title: 'Vos droits',
        content: `
          <div class="space-y-2">
            <div>
              Conformément au RGPD, vous disposez des droits suivants :
            </div>
            <div>
              • <strong>Droit d'accès</strong> à vos données personnelles<br>
              • <strong>Droit de rectification</strong> de vos données<br>
              • <strong>Droit à l'effacement</strong> (droit à l'oubli)<br>
              • <strong>Droit à la portabilité</strong> de vos données<br>
              • <strong>Droit d'opposition</strong> au traitement<br>
              • <strong>Droit à la limitation</strong> du traitement
            </div>
            <div>
              <strong>Pour exercer vos droits :</strong> dpo@example.com
            </div>
          </div>
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
          <Scale class="h-8 w-8 text-primary" />
        </div>
      </div>
      <h1 class="text-3xl font-bold mb-2">Mentions Légales</h1>
      <p class="text-muted-foreground text-lg">
        Informations légales relatives à ce site internet
      </p>
    </div>

    <!-- Important Notice -->
    <Card class="mb-8 border-blue-200 bg-blue-50">
      <CardContent class="pt-6">
        <div class="flex items-start gap-3">
          <AlertTriangle class="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 class="font-semibold text-blue-800 mb-2">Conformité légale</h3>
            <p class="text-blue-700 text-sm">
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance
              dans l'économie numérique, il est précisé aux utilisateurs du site l'identité des
              différents intervenants dans le cadre de sa réalisation et de son suivi.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Legal Sections -->
    <div class="space-y-8">
      <div
          v-for="(section, key) in legalData"
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

    <!-- Contact Information -->
    <div class="grid md:grid-cols-2 gap-6 mt-8">
      <!-- Quick Contact -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Mail class="h-5 w-5 text-primary" />
            Contact Rapide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-3 text-sm">
            <div>
              <p class="font-semibold mb-2">Questions générales :</p>
              <p class="text-muted-foreground">contact@example.com</p>
            </div>
            <div>
              <p class="font-semibold mb-2">Support technique :</p>
              <p class="text-muted-foreground">support@example.com</p>
            </div>
            <div>
              <p class="font-semibold mb-2">Questions juridiques :</p>
              <p class="text-muted-foreground">legal@example.com</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Last Update -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Calendar class="h-5 w-5 text-primary" />
            Dernière mise à jour
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-3 text-sm">
            <p>
              <strong>Date :</strong> {{ currentDate }}
            </p>
            <p class="text-muted-foreground">
              Ces mentions légales peuvent être modifiées à tout moment.
              Il est conseillé de les consulter régulièrement.
            </p>
            <div class="pt-2">
              <Badge variant="outline">Version 1.0</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Footer -->
    <Card class="mt-8">
      <CardContent class="pt-6">
        <div class="text-center">
          <Scale class="h-8 w-8 text-primary mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2">Transparence et conformité</h3>
          <p class="text-muted-foreground mb-4">
            Nous nous engageons à respecter la réglementation en vigueur et à maintenir
            ces informations à jour pour garantir la transparence de nos activités.
          </p>
          <div class="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">LCEN Compliant</Badge>
            <Badge variant="outline">RGPD Conforme</Badge>
            <Badge variant="outline">Hébergement EU</Badge>
            <Badge variant="outline">Droit Français</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.prose :deep(div) {
  margin-bottom: 0.75rem;
}

.prose :deep(strong) {
  font-weight: 600;
  color: hsl(var(--foreground));
}

.prose :deep(br) {
  margin-bottom: 0.25rem;
}
</style>