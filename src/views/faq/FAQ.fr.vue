<!-- src/views/faq/FAQ.fr.vue -->
<script setup lang="ts">
import { HelpCircle } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

// FAQ data for French
const faqData = [
  {
    id: 'account',
    title: 'Compte et Authentification',
    questions: [
      {
        id: 'create-account',
        question: 'Comment créer un compte ?',
        answer: `
          <p>Pour créer un compte sur notre plateforme :</p>
          <ol>
            <li>Cliquez sur le bouton "Inscription" en haut à droite</li>
            <li>Remplissez le formulaire avec votre email, nom d'utilisateur et mot de passe</li>
            <li>Confirmez votre mot de passe</li>
            <li>Cliquez sur "Créer un compte"</li>
          </ol>
          <p>Vous pourrez ensuite vous connecter immédiatement avec vos identifiants.</p>
        `
      },
      {
        id: 'forgot-password',
        question: 'J\'ai oublié mon mot de passe, que faire ?',
        answer: `
          <p>Si vous avez oublié votre mot de passe :</p>
          <ol>
            <li>Allez sur la page de connexion</li>
            <li>Cliquez sur "Mot de passe oublié ?"</li>
            <li>Entrez votre adresse email</li>
            <li>Vérifiez votre boîte mail pour le lien de réinitialisation</li>
            <li>Suivez les instructions dans l'email reçu</li>
          </ol>
          <p><strong>Note :</strong> Le lien de réinitialisation expire après 24 heures.</p>
        `
      },
      {
        id: 'change-username',
        question: 'Puis-je changer mon nom d\'utilisateur ?',
        answer: `
          <p>Oui, vous pouvez modifier votre nom d'utilisateur :</p>
          <ol>
            <li>Connectez-vous à votre compte</li>
            <li>Allez dans "Profil" → "Paramètres"</li>
            <li>Dans l'onglet "Informations personnelles", modifiez votre nom d'utilisateur</li>
            <li>Cliquez sur "Enregistrer les modifications"</li>
          </ol>
          <p><strong>Important :</strong> Le nom d'utilisateur doit être unique et contenir entre 3 et 20 caractères.</p>
        `
      }
    ]
  },
  {
    id: 'articles',
    title: 'Articles et Contenu',
    questions: [
      {
        id: 'view-articles',
        question: 'Comment consulter les articles ?',
        answer: `
          <p>Pour consulter les articles :</p>
          <ul>
            <li>Les derniers articles apparaissent sur la page d'accueil</li>
            <li>Cliquez sur un article pour le lire en entier</li>
            <li>Utilisez la fonction de recherche pour trouver des articles spécifiques</li>
            <li>Parcourez les catégories disponibles</li>
          </ul>
        `
      },
      {
        id: 'comment-article',
        question: 'Comment commenter un article ?',
        answer: `
          <p>Pour commenter un article :</p>
          <ol>
            <li>Vous devez être connecté à votre compte</li>
            <li>Ouvrez l'article que vous souhaitez commenter</li>
            <li>Faites défiler jusqu'à la section commentaires</li>
            <li>Rédigez votre commentaire dans le champ prévu</li>
            <li>Cliquez sur "Poster le commentaire"</li>
          </ol>
          <p><strong>Note :</strong> Vous pouvez modifier ou supprimer vos propres commentaires.</p>
        `
      }
    ]
  },
  {
    id: 'profile',
    title: 'Profil et Paramètres',
    questions: [
      {
        id: 'edit-profile',
        question: 'Comment modifier mon profil ?',
        answer: `
          <p>Pour modifier votre profil :</p>
          <ol>
            <li>Cliquez sur votre avatar en haut à droite</li>
            <li>Sélectionnez "Profil" dans le menu</li>
            <li>Utilisez les onglets pour modifier différentes sections :
              <ul>
                <li><strong>Informations personnelles :</strong> nom d'utilisateur, email, langue</li>
                <li><strong>Photo de profil :</strong> téléchargez votre avatar</li>
                <li><strong>Mot de passe :</strong> changez votre mot de passe</li>
              </ul>
            </li>
            <li>Cliquez sur "Enregistrer les modifications" pour chaque section</li>
          </ol>
        `
      },
      {
        id: 'upload-avatar',
        question: 'Comment télécharger une photo de profil ?',
        answer: `
          <p>Pour ajouter ou changer votre photo de profil :</p>
          <ol>
            <li>Allez dans votre profil → onglet "Photo de profil"</li>
            <li>Glissez-déposez une image ou cliquez sur "Parcourir les fichiers"</li>
            <li>Sélectionnez une image (PNG, JPG ou GIF, max 2 Mo)</li>
            <li>L'image sera automatiquement redimensionnée à 100x100 pixels</li>
            <li>Cliquez sur "Télécharger la photo"</li>
          </ol>
          <p><strong>Conseil :</strong> Utilisez une image carrée pour un meilleur rendu.</p>
        `
      }
    ]
  },
  {
    id: 'technical',
    title: 'Assistance Technique',
    questions: [
      {
        id: 'browser-support',
        question: 'Quels navigateurs sont supportés ?',
        answer: `
          <p>Notre application est compatible avec :</p>
          <ul>
            <li><strong>Chrome :</strong> version 90 et plus récente</li>
            <li><strong>Firefox :</strong> version 88 et plus récente</li>
            <li><strong>Safari :</strong> version 14 et plus récente</li>
            <li><strong>Edge :</strong> version 90 et plus récente</li>
          </ul>
          <p>Nous recommandons de toujours utiliser la dernière version de votre navigateur pour une expérience optimale.</p>
        `
      },
      {
        id: 'mobile-responsive',
        question: 'L\'application fonctionne-t-elle sur mobile ?',
        answer: `
          <p>Oui, notre application est entièrement responsive et s'adapte à tous les écrans :</p>
          <ul>
            <li>Interface optimisée pour smartphones et tablettes</li>
            <li>Navigation tactile intuitive</li>
            <li>Contenu adaptatif selon la taille d'écran</li>
            <li>Performance optimisée pour les appareils mobiles</li>
          </ul>
        `
      },
      {
        id: 'data-security',
        question: 'Mes données sont-elles sécurisées ?',
        answer: `
          <p>La sécurité de vos données est notre priorité :</p>
          <ul>
            <li><strong>Chiffrement :</strong> Toutes les communications sont chiffrées (HTTPS)</li>
            <li><strong>Authentification :</strong> Tokens JWT sécurisés avec expiration automatique</li>
            <li><strong>Mots de passe :</strong> Hachage sécurisé, jamais stockés en clair</li>
            <li><strong>Sessions :</strong> Gestion automatique des sessions expirées</li>
            <li><strong>Confidentialité :</strong> Vos données ne sont jamais partagées avec des tiers</li>
          </ul>
        `
      }
    ]
  }
]
</script>

<template>
  <div class="container mx-auto max-w-4xl px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="flex justify-center mb-4">
        <div class="bg-primary/10 rounded-full p-3">
          <HelpCircle class="h-8 w-8 text-primary" />
        </div>
      </div>
      <h1 class="text-3xl font-bold mb-2">Foire Aux Questions</h1>
      <p class="text-muted-foreground text-lg">
        Trouvez rapidement les réponses à vos questions les plus fréquentes
      </p>
    </div>

    <!-- FAQ Sections -->
    <div class="space-y-6">
      <div
          v-for="section in faqData"
          :key="section.id"
          class="space-y-4"
      >
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <HelpCircle class="h-5 w-5 text-primary" />
              {{ section.title }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem
                  v-for="question in section.questions"
                  :key="question.id"
                  :value="question.id"
              >
                <AccordionTrigger class="text-left">
                  {{ question.question }}
                </AccordionTrigger>
                <AccordionContent>
                  <div
                      class="prose dark:prose-invert max-w-none"
                      v-html="question.answer"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Contact section -->
    <Card class="mt-8">
      <CardContent class="pt-6">
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-2">Vous ne trouvez pas votre réponse ?</h3>
          <p class="text-muted-foreground mb-4">
            Notre équipe de support est là pour vous aider
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
                href="mailto:support@example.com"
                class="text-primary hover:underline font-medium"
            >
              support@example.com
            </a>
            <span class="hidden sm:inline text-muted-foreground">•</span>
            <a
                href="#"
                class="text-primary hover:underline font-medium"
            >
              Contactez-nous
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.prose :deep(ol) {
  list-style-type: decimal;
  list-style-position: inside;
}

.prose :deep(ul) {
  list-style-type: disc;
  list-style-position: inside;
}

.prose :deep(li) {
  margin-left: 1rem;
  margin-bottom: 0.25rem;
}

.prose :deep(p) {
  margin-bottom: 0.75rem;
}

.prose :deep(strong) {
  font-weight: 600;
  color: hsl(var(--foreground));
}

.prose :deep(ol li),
.prose :deep(ul li) {
  margin-bottom: 0.25rem;
}

.prose :deep(ul ul),
.prose :deep(ol ol) {
  margin-top: 0.25rem;
  margin-left: 1rem;
}
</style>
