<script setup lang="ts">
import { Trophy, TrendingUp, TrendingDown, Minus, Star } from 'lucide-vue-next'

interface GameRanking {
  rank: number
  name: string
  url: string
  posts: number
  image?: string
  change?: {
    type: 'up' | 'down' | 'new' | 'equal'
    value?: number
  }
}

interface PlayerRanking {
  rank: number
  name: string
  url: string
  posts: number
  avatar?: string
  change?: {
    type: 'up' | 'down' | 'new' | 'equal'
    value?: number
  }
}

const gameRankings: GameRanking[] = [
  {
    rank: 1,
    name: "Pokémon Go",
    url: "/en/pokemon-go-game-g4509/index",
    posts: 61,
    image: "https://backoffice.video-games-records.com/game/4509/picture",
    change: { type: 'equal' }
  },
  {
    rank: 2,
    name: "Brain It On!",
    url: "/en/brain-it-on-game-g4630/index",
    posts: 40,
    image: "https://backoffice.video-games-records.com/game/4630/picture",
    change: { type: 'up', value: 1 }
  },
  {
    rank: 3,
    name: "Grand Theft Auto San Andreas",
    url: "/en/grand-theft-auto-san-andreas-game-g74/index",
    posts: 33,
    image: "https://backoffice.video-games-records.com/game/74/picture",
    change: { type: 'new' }
  },
  // ... autres jeux
]

const playerRankings: PlayerRanking[] = [
  {
    rank: 1,
    name: "Anion",
    url: "/en/anion-player-p10488/index",
    posts: 83,
    avatar: "https://backoffice.video-games-records.com/users/10488/avatar",
    change: { type: 'up', value: 5 }
  },
  {
    rank: 2,
    name: "Mike-soad",
    url: "/en/mike-soad-player-p1884/index",
    posts: 40,
    avatar: "https://backoffice.video-games-records.com/users/1884/avatar",
    change: { type: 'new' }
  },
  {
    rank: 2,
    name: "ThePandaEmperor",
    url: "/en/thepandaemperor-player-p8152/index",
    posts: 40,
    avatar: "https://backoffice.video-games-records.com/users/8152/avatar",
    change: { type: 'up', value: 2 }
  },
  // ... autres joueurs
]

const getChangeIcon = (change?: { type: string; value?: number }) => {
  if (!change) return null

  switch (change.type) {
    case 'up': return TrendingUp
    case 'down': return TrendingDown
    case 'equal': return Minus
    case 'new': return Star
    default: return null
  }
}

const getChangeClass = (type?: string) => {
  switch (type) {
    case 'up': return 'text-green-500'
    case 'down': return 'text-red-500'
    case 'equal': return 'text-gray-500'
    case 'new': return 'text-yellow-500'
    default: return 'text-gray-500'
  }
}

const getRankClass = (rank: number) => {
  switch (rank) {
    case 1: return 'bg-yellow-500 text-white'
    case 2: return 'bg-gray-400 text-white'
    case 3: return 'bg-orange-600 text-white'
    default: return 'bg-gray-100 text-gray-800'
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8 space-y-12">
    <!-- Games Section -->
    <section class="space-y-6">
      <div class="flex items-center gap-4 mb-8">
        <Trophy class="h-8 w-8 text-yellow-500" />
        <h2 class="text-3xl font-bold">Top Games</h2>
      </div>

      <!-- Top 3 Games Showcase -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div v-for="game in gameRankings.slice(0, 3)" :key="game.url"
             class="relative group overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-105">
          <RouterLink :to="game.url" class="block">
            <img :src="game.image" :alt="game.name"
                 class="w-full h-48 object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div class="absolute bottom-0 p-4 w-full">
                <div class="flex items-center justify-between mb-2">
                  <span :class="getRankClass(game.rank)"
                        class="px-3 py-1 rounded-full text-sm font-bold">
                    #{{ game.rank }}
                  </span>
                  <div v-if="game.change" class="flex items-center gap-1">
                    <component :is="getChangeIcon(game.change)"
                               :class="getChangeClass(game.change.type)"
                               class="h-5 w-5" />
                    <span v-if="game.change.value"
                          :class="getChangeClass(game.change.type)"
                          class="font-semibold">
                      {{ game.change.value }}
                    </span>
                  </div>
                </div>
                <h3 class="text-white font-bold text-lg mb-1 line-clamp-2">{{ game.name }}</h3>
                <p class="text-white/90 text-sm">{{ game.posts }} posts</p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Games Table -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rank</th>
              <th scope="col" class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Game</th>
              <th scope="col" class="px-6 py-4 text-right text-sm font-semibold text-gray-900">Posts</th>
              <th scope="col" class="px-6 py-4 text-center text-sm font-semibold text-gray-900">Change</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr v-for="game in gameRankings" :key="game.url"
                class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getRankClass(game.rank)"
                        class="inline-flex items-center justify-center h-8 w-8 rounded-full font-bold">
                    {{ game.rank }}
                  </span>
              </td>
              <td class="px-6 py-4">
                <RouterLink :to="game.url"
                            class="text-primary hover:text-primary/80 font-medium transition-colors">
                  {{ game.name }}
                </RouterLink>
              </td>
              <td class="px-6 py-4 text-right whitespace-nowrap text-gray-700">
                {{ game.posts }} posts
              </td>
              <td class="px-6 py-4 text-center">
                <div v-if="game.change" class="flex items-center justify-center gap-1">
                  <component :is="getChangeIcon(game.change)"
                             :class="getChangeClass(game.change.type)"
                             class="h-5 w-5" />
                  <span v-if="game.change.value"
                        :class="getChangeClass(game.change.type)"
                        class="font-semibold">
                      {{ game.change.value }}
                    </span>
                  <span v-else-if="game.change.type === 'new'"
                        class="text-yellow-500 font-semibold">
                      New
                    </span>
                </div>
              </td>
            </tr>
            </tbody>
            <tfoot class="bg-gray-50 border-t-2 border-gray-200">
            <tr>
              <td colspan="2" class="px-6 py-4 font-semibold text-gray-900">Total</td>
              <td colspan="2" class="px-6 py-4 text-right font-semibold text-gray-900">252 posts</td>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>

    <!-- Players Section -->
    <section class="space-y-6">
      <div class="flex items-center gap-4 mb-8">
        <Trophy class="h-8 w-8 text-yellow-500" />
        <h2 class="text-3xl font-bold">Top Players</h2>
      </div>

      <!-- Top 3 Players Showcase -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div v-for="player in playerRankings.slice(0, 3)" :key="player.url"
             class="bg-white rounded-2xl shadow-lg p-6 transition-transform hover:scale-105">
          <RouterLink :to="player.url" class="block text-center">
            <div class="relative inline-block mb-4">
              <img :src="player.avatar" :alt="player.name"
                   class="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md">
              <span :class="getRankClass(player.rank)"
                    class="absolute -bottom-2 -right-2 h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                {{ player.rank }}
              </span>
            </div>
            <h3 class="font-bold text-xl mb-2">{{ player.name }}</h3>
            <p class="text-gray-600 mb-3">{{ player.posts }} posts</p>
            <div v-if="player.change" class="flex items-center justify-center gap-1">
              <component :is="getChangeIcon(player.change)"
                         :class="getChangeClass(player.change.type)"
                         class="h-5 w-5" />
              <span v-if="player.change.value"
                    :class="getChangeClass(player.change.type)"
                    class="font-semibold">
                {{ player.change.value }}
              </span>
              <span v-else-if="player.change.type === 'new'"
                    class="text-yellow-500 font-semibold">
                New
              </span>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Players Table -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rank</th>
              <th scope="col" class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Player</th>
              <th scope="col" class="px-6 py-4 text-right text-sm font-semibold text-gray-900">Posts</th>
              <th scope="col" class="px-6 py-4 text-center text-sm font-semibold text-gray-900">Change</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr v-for="player in playerRankings" :key="player.url"
                class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getRankClass(player.rank)"
                        class="inline-flex items-center justify-center h-8 w-8 rounded-full font-bold">
                    {{ player.rank }}
                  </span>
              </td>
              <td class="px-6 py-4">
                <RouterLink :to="player.url"
                            class="flex items-center gap-3">
                  <img v-if="player.avatar"
                       :src="player.avatar"
                       :alt="player.name"
                       class="h-8 w-8 rounded-full object-cover">
                  <span class="text-primary hover:text-primary/80 font-medium transition-colors">
                      {{ player.name }}
                    </span>
                </RouterLink>
              </td>
              <td class="px-6 py-4 text-right whitespace-nowrap text-gray-700">
                {{ player.posts }} posts
              </td>
              <td class="px-6 py-4 text-center">
                <div v-if="player.change" class="flex items-center justify-center gap-1">
                  <component :is="getChangeIcon(player.change)"
                             :class="getChangeClass(player.change.type)"
                             class="h-5 w-5" />
                  <span v-if="player.change.value"
                        :class="getChangeClass(player.change.type)"
                        class="font-semibold">
                      {{ player.change.value }}
                    </span>
                  <span v-else-if="player.change.type === 'new'"
                        class="text-yellow-500 font-semibold">
                      New
                    </span>
                </div>
              </td>
            </tr>
            </tbody>
            <tfoot class="bg-gray-50 border-t-2 border-gray-200">
            <tr>
              <td colspan="2" class="px-6 py-4 font-semibold text-gray-900">Total</td>
              <td colspan="2" class="px-6 py-4 text-right font-semibold text-gray-900">252 posts</td>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>