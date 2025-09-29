<!-- src/views/about/About.fr.vue -->
<script setup lang="ts">
import { Heart, Users, Target, Zap, Globe, Code, Shield, Lightbulb, Award, TrendingUp } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'

// About sections data for French
const aboutData = {
  mission: {
    title: 'Notre Mission',
    icon: Target,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    content: `
      <p>Nous créons une plateforme communautaire où les passionnés de technologie, de gaming et d'innovation peuvent se retrouver pour partager, apprendre et grandir ensemble.</p>
      <p>Notre objectif est de démocratiser l'accès à l'information de qualité et de créer un espace d'échange bienveillant et constructif.</p>
    `
  },
  story: {
    title: 'Notre Histoire',
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    content: `
      <p>Né en 2024 de la passion de quelques développeurs et créateurs de contenu, ce projet a commencé comme un simple blog personnel.</p>
      <p>Face à l'engouement de la communauté et aux retours positifs, nous avons décidé de transformer cette initiative personnelle en véritable plateforme collaborative.</p>
      <p>Aujourd'hui, nous sommes fiers de compter des milliers d'utilisateurs actifs qui contribuent quotidiennement à enrichir notre contenu.</p>
    `
  },
  values: {
    title: 'Nos Valeurs',
    icon: Shield,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    content: `
      <p>Nos valeurs fondamentales guident chaque décision que nous prenons :</p>
      <ul>
        <li><strong>Transparence :</strong> Communication ouverte sur nos choix et évolutions</li>
        <li><strong>Respect :</strong> Bienveillance et tolérance dans tous nos échanges</li>
        <li><strong>Innovation :</strong> Recherche constante d'amélioration et de nouveauté</li>
        <li><strong>Communauté :</strong> Priorité donnée aux besoins et retours des utilisateurs</li>
        <li><strong>Qualité :</strong> Excellence dans le contenu et l'expérience utilisateur</li>
      </ul>
    `
  }
}

// Team members (you can customize these)
const teamMembers = [
  {
    name: 'Alex Martin',
    role: 'Fondateur & Développeur',
    description: 'Passionné de développement web et d\'UX design',
    skills: ['Vue.js', 'Symfony', 'UI/UX'],
    avatar: '👨‍💻'
  },
  {
    name: 'Sarah Johnson',
    role: 'Community Manager',
    description: 'Anime la communauté et modère les contenus',
    skills: ['Communication', 'Modération', 'Marketing'],
    avatar: '👩‍💼'
  },
  {
    name: 'Mike Chen',
    role: 'Rédacteur Technique',
    description: 'Crée du contenu technique de qualité',
    skills: ['Rédaction', 'Tech', 'Gaming'],
    avatar: '✍️'
  }
]

// Platform statistics
const statistics = [
  { label: 'Utilisateurs actifs', value: '5,2K+', icon: Users },
  { label: 'Articles publiés', value: '850+', icon: Lightbulb },
  { label: 'Commentaires', value: '12K+', icon: Globe },
  { label: 'Temps de réponse', value: '<24h', icon: Zap }
]

// Key features
const features = [
  {
    title: 'Open Source',
    description: 'Code source ouvert et contributions communautaires',
    icon: Code,
    color: 'text-purple-600'
  },
  {
    title: 'Multilingue',
    description: 'Interface disponible en français et anglais',
    icon: Globe,
    color: 'text-blue-600'
  },
  {
    title: 'Sécurisé',
    description: 'Protection des données et authentification robuste',
    icon: Shield,
    color: 'text-green-600'
  },
  {
    title: 'Évolutif',
    description: 'Nouvelles fonctionnalités basées sur vos retours',
    icon: TrendingUp,
    color: 'text-orange-600'
  }
]
</script>

<template>
  <div class="container mx-auto max-w-4xl px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-12">
      <div class="flex justify-center mb-6">
        <div class="bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full p-4">
          <Heart class="h-10 w-10 text-primary" />
        </div>
      </div>
      <h1 class="text-4xl font-bold mb-4">À Propos de Nous</h1>
      <p class="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
        Découvrez l'histoire, la mission et l'équipe derrière cette plateforme
        qui réunit une communauté passionnée de technologie et d'innovation.
      </p>
    </div>

    <!-- Mission, Story, Values -->
    <div class="space-y-8 mb-12">
      <div
          v-for="(section, key) in aboutData"
          :key="key"
      >
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-3">
              <div :class="[section.bgColor, 'p-3 rounded-lg']">
                <component :is="section.icon" :class="[section.color, 'h-6 w-6']" />
              </div>
              {{ section.title }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
                class="prose dark:prose-invert max-w-none"
                v-html="section.content"
            />
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Statistics -->
    <Card class="mb-12">
      <CardHeader>
        <CardTitle class="text-center">Notre Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
              v-for="stat in statistics"
              :key="stat.label"
              class="text-center"
          >
            <div class="bg-primary/10 rounded-full p-3 w-fit mx-auto mb-3">
              <component :is="stat.icon" class="h-6 w-6 text-primary" />
            </div>
            <div class="text-2xl font-bold text-primary mb-1">{{ stat.value }}</div>
            <div class="text-sm text-muted-foreground">{{ stat.label }}</div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Team -->
    <Card class="mb-12">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Users class="h-5 w-5 text-primary" />
          Notre Équipe
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid md:grid-cols-3 gap-6">
          <div
              v-for="member in teamMembers"
              :key="member.name"
              class="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div class="text-4xl mb-3">{{ member.avatar }}</div>
            <h3 class="font-semibold mb-1">{{ member.name }}</h3>
            <p class="text-primary text-sm font-medium mb-2">{{ member.role }}</p>
            <p class="text-muted-foreground text-sm mb-3">{{ member.description }}</p>
            <div class="flex flex-wrap justify-center gap-1">
              <Badge
                  v-for="skill in member.skills"
                  :key="skill"
                  variant="outline"
                  class="text-xs"
              >
                {{ skill }}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Features -->
    <Card class="mb-12">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Award class="h-5 w-5 text-primary" />
          Ce qui nous rend uniques
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid md:grid-cols-2 gap-6">
          <div
              v-for="feature in features"
              :key="feature.title"
              class="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div class="bg-muted rounded-lg p-2 flex-shrink-0">
              <component :is="feature.icon" :class="[feature.color, 'h-5 w-5']" />
            </div>
            <div>
              <h4 class="font-semibold mb-1">{{ feature.title }}</h4>
              <p class="text-sm text-muted-foreground">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Call to Action -->
    <Card>
      <CardContent class="pt-6">
        <div class="text-center">
          <Users class="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 class="text-2xl font-bold mb-4">Rejoignez notre communauté</h3>
          <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Que vous soyez développeur, gamer, créateur de contenu ou simplement passionné de technologie,
            il y a une place pour vous dans notre communauté. Partagez vos connaissances,
            apprenez de nouvelles choses et connectez-vous avec des personnes qui partagent vos passions.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink
                :to="{name: 'Register'}"
                class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              Créer un compte
            </RouterLink>
            <RouterLink
                :to="{name: 'Contact'}"
                class="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Nous contacter
            </RouterLink>
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
  line-height: 1.6;
}

.prose :deep(strong) {
  font-weight: 600;
  color: hsl(var(--foreground));
}
</style>
