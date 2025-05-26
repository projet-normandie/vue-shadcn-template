<!-- src/views/rules/Rules.fr.vue -->
<script setup lang="ts">
import { Shield, AlertTriangle, Users, MessageSquare, Ban, CheckCircle } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Rules data for French
const rulesData = {
  general: {
    title: 'Règles Générales',
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    rules: [
      {
        id: 'respect',
        title: 'Respect et courtoisie',
        description: 'Traitez tous les membres de la communauté avec respect et courtoisie. Les insultes, le harcèlement ou tout comportement hostile ne sont pas tolérés.',
        severity: 'high'
      },
      {
        id: 'no-spam',
        title: 'Pas de spam ou de contenu répétitif',
        description: 'Évitez de poster le même contenu plusieurs fois ou de faire du spam. Chaque contribution doit apporter de la valeur à la discussion.',
        severity: 'medium'
      },
      {
        id: 'appropriate-content',
        title: 'Contenu approprié uniquement',
        description: 'Le contenu doit être approprié pour tous les âges. Aucun contenu explicite, violent ou offensant n\'est autorisé.',
        severity: 'high'
      },
      {
        id: 'authentic-identity',
        title: 'Identité authentique',
        description: 'Utilisez votre vraie identité ou un pseudonyme constant. Les faux comptes et l\'usurpation d\'identité sont interdits.',
        severity: 'high'
      }
    ]
  },
  community: {
    title: 'Vie Communautaire',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    rules: [
      {
        id: 'constructive-discussions',
        title: 'Discussions constructives',
        description: 'Participez à des discussions constructives et respectueuses. Les débats sont encouragés mais doivent rester civilisés.',
        severity: 'low'
      },
      {
        id: 'help-others',
        title: 'Entraide communautaire',
        description: 'Aidez les nouveaux membres et partagez vos connaissances. Une communauté forte se construit ensemble.',
        severity: 'low'
      },
      {
        id: 'report-issues',
        title: 'Signalement des problèmes',
        description: 'Signalez tout contenu ou comportement inapproprié aux modérateurs plutôt que de répondre de manière agressive.',
        severity: 'medium'
      },
      {
        id: 'follow-topics',
        title: 'Restez dans le sujet',
        description: 'Gardez vos contributions pertinentes par rapport au sujet de discussion ou à la catégorie de l\'article.',
        severity: 'low'
      }
    ]
  },
  comments: {
    title: 'Commentaires et Publications',
    icon: MessageSquare,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    rules: [
      {
        id: 'quality-comments',
        title: 'Commentaires de qualité',
        description: 'Rédigez des commentaires réfléchis et bien articulés. Évitez les commentaires d\'un seul mot ou sans valeur ajoutée.',
        severity: 'low'
      },
      {
        id: 'no-personal-attacks',
        title: 'Pas d\'attaques personnelles',
        description: 'Critiquez les idées, pas les personnes. Les attaques personnelles et les insultes entraînent une sanction immédiate.',
        severity: 'high'
      },
      {
        id: 'no-hate-speech',
        title: 'Pas de discours de haine',
        description: 'Aucune forme de discrimination, racisme, sexisme ou discours de haine n\'est tolérée sur la plateforme.',
        severity: 'high'
      },
      {
        id: 'fact-checking',
        title: 'Vérification des informations',
        description: 'Vérifiez vos sources avant de partager des informations. La désinformation volontaire est sanctionnée.',
        severity: 'medium'
      }
    ]
  },
  sanctions: {
    title: 'Sanctions et Modération',
    icon: Ban,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    rules: [
      {
        id: 'warning-system',
        title: 'Système d\'avertissements',
        description: 'Premier manquement : avertissement. Deuxième manquement : suspension temporaire. Troisième manquement : bannissement.',
        severity: 'high'
      },
      {
        id: 'immediate-ban',
        title: 'Bannissement immédiat',
        description: 'Certains comportements (harcèlement grave, contenu illégal, spam massif) entraînent un bannissement immédiat.',
        severity: 'high'
      },
      {
        id: 'appeal-process',
        title: 'Processus d\'appel',
        description: 'Vous pouvez contester une sanction en contactant l\'équipe de modération avec des éléments justificatifs.',
        severity: 'medium'
      },
      {
        id: 'repeat-offenses',
        title: 'Récidive',
        description: 'Les récidivistes font l\'objet de sanctions plus sévères. L\'historique des infractions est conservé.',
        severity: 'medium'
      }
    ]
  }
}

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case 'high':
      return { variant: 'destructive', text: 'Strict' }
    case 'medium':
      return { variant: 'default', text: 'Important' }
    case 'low':
      return { variant: 'secondary', text: 'Recommandé' }
    default:
      return { variant: 'outline', text: 'Info' }
  }
}
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
      <h1 class="text-3xl font-bold mb-2">Règlement de la Communauté</h1>
      <p class="text-muted-foreground text-lg">
        Ensemble, construisons une communauté respectueuse et bienveillante
      </p>
    </div>

    <!-- Important Notice -->
    <Card class="mb-8 border-amber-200 bg-amber-50">
      <CardContent class="pt-6">
        <div class="flex items-start gap-3">
          <AlertTriangle class="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 class="font-semibold text-amber-800 mb-2">Important à savoir</h3>
            <p class="text-amber-700 text-sm">
              Ce règlement s'applique à tous les utilisateurs de la plateforme. En créant un compte,
              vous acceptez de respecter ces règles. Toute violation peut entraîner des sanctions
              allant de l'avertissement au bannissement définitif.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Rules Sections -->
    <div class="space-y-8">
      <div
          v-for="(section, key) in rulesData"
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
          <CardContent class="space-y-4">
            <div
                v-for="rule in section.rules"
                :key="rule.id"
                class="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div class="flex items-start justify-between gap-4 mb-2">
                <h4 class="font-semibold">{{ rule.title }}</h4>
                <Badge
                    :variant="getSeverityBadge(rule.severity).variant"
                    class="flex-shrink-0"
                >
                  {{ getSeverityBadge(rule.severity).text }}
                </Badge>
              </div>
              <p class="text-muted-foreground text-sm leading-relaxed">
                {{ rule.description }}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Footer -->
    <Card class="mt-8">
      <CardContent class="pt-6">
        <div class="text-center">
          <div class="flex justify-center mb-4">
            <CheckCircle class="h-8 w-8 text-green-600" />
          </div>
          <h3 class="text-lg font-semibold mb-2">Merci de faire partie de notre communauté</h3>
          <p class="text-muted-foreground mb-4">
            En respectant ces règles, vous contribuez à créer un environnement positif pour tous.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <span class="text-muted-foreground">
              <strong>Dernière mise à jour :</strong> {{ new Date().toLocaleDateString('fr-FR') }}
            </span>
            <span class="hidden sm:inline text-muted-foreground">•</span>
            <a
                href="/contact"
                class="text-primary hover:underline font-medium"
            >
              Une question ? Contactez-nous
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.container {
  scroll-behavior: smooth;
}
</style>
