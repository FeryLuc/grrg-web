<template>
  <div class="min-h-screen" style="background: #0d0015; color: #F1E9DA;">

    <!-- Header + Nav -->
    <header style="background: rgba(84,19,136,0.6); border-bottom: 1px solid rgba(217,3,104,0.3); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 10;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex items-center justify-between py-3 sm:py-4">

          <!-- Logo -->
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-base sm:text-xl font-black tracking-widest" style="background: linear-gradient(90deg, #FFD400, #D90368); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
              RISE & GLOW
            </span>
          </div>

          <!-- Nav desktop -->
          <nav class="hidden md:flex items-center gap-1">
            <a v-for="link in navLinks" :key="link.label" href="#"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              :style="link.active
                ? 'background: rgba(255,212,0,0.12); color: #FFD400; border: 1px solid rgba(255,212,0,0.25);'
                : 'color: rgba(241,233,218,0.55);'"
            >
              {{ link.icon }} {{ link.label }}
            </a>
          </nav>

          <!-- Profil + déconnexion -->
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                style="background: linear-gradient(135deg, #541388, #D90368);">
                {{ user?.email?.[0]?.toUpperCase() }}
              </div>
              <span class="hidden sm:block text-sm" style="color: #F1E9DA; opacity: 0.6;">{{ user?.email }}</span>
            </div>
            <button @click="handleLogout" :disabled="loading"
              class="text-xs font-semibold px-3 py-2 rounded-lg transition-all disabled:opacity-50"
              style="background: rgba(217,3,104,0.12); border: 1px solid rgba(217,3,104,0.4); color: #D90368;">
              {{ loading ? '...' : 'Déconnexion' }}
            </button>
          </div>
        </div>

        <!-- Nav mobile -->
        <nav class="flex md:hidden gap-1 pb-3 overflow-x-auto">
          <a v-for="link in navLinks" :key="link.label" href="#"
            class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0"
            :style="link.active
              ? 'background: rgba(255,212,0,0.12); color: #FFD400; border: 1px solid rgba(255,212,0,0.25);'
              : 'color: rgba(241,233,218,0.55);'"
          >
            {{ link.icon }} {{ link.label }}
          </a>
        </nav>
      </div>
    </header>

    <!-- Contenu -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8 flex flex-col xl:flex-row gap-6">

      <!-- Colonne principale -->
      <div class="flex-1 flex flex-col gap-5 min-w-0">

        <!-- Bannière profil -->
        <div class="rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-5"
          style="background: linear-gradient(135deg, #541388 0%, #2d0055 60%, #1a0035 100%); border: 1px solid rgba(255,212,0,0.15);">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-black shrink-0"
              style="background: linear-gradient(135deg, rgba(255,212,0,0.2), rgba(217,3,104,0.2)); border: 2px solid rgba(255,212,0,0.3);">
              {{ user?.email?.[0]?.toUpperCase() }}
            </div>
            <div>
              <p class="text-xs font-bold mb-0.5" style="color: #FFD400; letter-spacing: 0.12em; text-transform: uppercase;">Étincelle</p>
              <h2 class="text-xl sm:text-2xl font-black" style="color: #F1E9DA;">{{ user?.email?.split('@')[0] }}</h2>
              <p class="text-xs mt-1" style="color: #F1E9DA; opacity: 0.45;">Membre depuis aujourd'hui</p>
            </div>
          </div>
          <!-- Barre de progression vers grade suivant -->
          <div class="flex-1 sm:max-w-xs">
            <div class="flex justify-between text-xs mb-1.5" style="color: #F1E9DA; opacity: 0.5;">
              <span>Étincelle</span>
              <span>Lumière</span>
            </div>
            <div class="h-2.5 rounded-full overflow-hidden" style="background: rgba(255,255,255,0.08);">
              <div class="h-full rounded-full" style="width: 0%; background: linear-gradient(90deg, #541388, #FFD400);"></div>
            </div>
            <p class="text-xs mt-1.5 text-right" style="color: #FFD400; opacity: 0.7;">0 / 500 points Glow</p>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div v-for="stat in stats" :key="stat.label"
            class="rounded-xl p-4 flex flex-col gap-2"
            :style="`background: rgba(84,19,136,0.2); border: 1px solid ${stat.color}25;`">
            <span class="text-lg">{{ stat.icon }}</span>
            <span class="text-2xl font-black" :style="`color: ${stat.color}`">{{ stat.value }}</span>
            <span class="text-xs leading-tight" style="color: #F1E9DA; opacity: 0.55;">{{ stat.label }}</span>
          </div>
        </div>

        <!-- Récompense du jour -->
        <div class="rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
          style="background: rgba(217,3,104,0.08); border: 1px solid rgba(217,3,104,0.25);">
          <div class="flex items-center gap-4 flex-1">
            <div class="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
              style="background: rgba(217,3,104,0.15); border: 1px solid rgba(217,3,104,0.3);">
              🎁
            </div>
            <div>
              <p class="text-xs font-bold mb-0.5" style="color: #D90368; letter-spacing: 0.1em; text-transform: uppercase;">Récompense du jour</p>
              <p class="text-sm font-semibold" style="color: #F1E9DA;">Connexion quotidienne</p>
              <p class="text-xs mt-0.5" style="color: #F1E9DA; opacity: 0.45;">Reviens chaque jour pour accumuler des points Glow</p>
            </div>
          </div>
          <button class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0"
            style="background: linear-gradient(90deg, #D90368, #541388); color: #F1E9DA;">
            Réclamer
          </button>
        </div>

        <!-- Souhaits en vedette -->
        <div class="rounded-2xl p-5" style="background: rgba(84,19,136,0.15); border: 1px solid rgba(84,19,136,0.4);">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold flex items-center gap-2" style="color: #F1E9DA;">
              ✨ Souhaits à exaucer
            </h3>
            <a href="#" class="text-xs font-semibold" style="color: #D90368;">Voir tout →</a>
          </div>
          <div class="flex flex-col gap-3">
            <div v-for="wish in wishes" :key="wish.title"
              class="rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3"
              style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.04);">
              <div class="flex items-start gap-3 flex-1 min-w-0">
                <span class="text-2xl shrink-0 mt-0.5">{{ wish.icon }}</span>
                <div class="min-w-0">
                  <p class="text-sm font-semibold truncate" style="color: #F1E9DA;">{{ wish.title }}</p>
                  <p class="text-xs mt-0.5" style="color: #F1E9DA; opacity: 0.45;">{{ wish.desc }}</p>
                  <p class="text-xs mt-1" style="color: #F1E9DA; opacity: 0.3;">par {{ wish.author }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 shrink-0">
                <span class="text-xs font-bold px-2 py-1 rounded-lg" style="background: rgba(255,212,0,0.12); color: #FFD400;">
                  +{{ wish.glow }} Glow
                </span>
                <button class="text-xs font-bold px-4 py-2 rounded-lg transition-all"
                  style="background: rgba(217,3,104,0.15); border: 1px solid rgba(217,3,104,0.4); color: #D90368;">
                  Exaucer
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Succès -->
        <div class="rounded-2xl p-5" style="background: rgba(84,19,136,0.15); border: 1px solid rgba(84,19,136,0.4);">
          <h3 class="font-bold mb-4 flex items-center gap-2" style="color: #F1E9DA;">
            🎖️ Succès
          </h3>
          <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
            <div v-for="badge in badges" :key="badge.label"
              class="flex flex-col items-center gap-1.5 rounded-xl p-3"
              :style="`background: ${badge.unlocked ? 'rgba(255,212,0,0.08)' : 'rgba(0,0,0,0.25)'}; border: 1px solid ${badge.unlocked ? 'rgba(255,212,0,0.25)' : 'rgba(255,255,255,0.04)'};`">
              <span class="text-2xl" :style="badge.unlocked ? '' : 'filter: grayscale(1); opacity: 0.25'">{{ badge.icon }}</span>
              <span class="text-xs text-center leading-tight"
                :style="`color: ${badge.unlocked ? '#FFD400' : '#F1E9DA'}; opacity: ${badge.unlocked ? 1 : 0.3};`">
                {{ badge.label }}
              </span>
            </div>
          </div>
        </div>

      </div>

      <!-- Sidebar Leaderboard -->
      <aside class="w-full xl:w-72 shrink-0">
        <div class="rounded-2xl p-5 xl:sticky xl:top-24" style="background: rgba(84,19,136,0.15); border: 1px solid rgba(84,19,136,0.4);">

          <h3 class="font-bold text-base mb-0.5 flex items-center gap-2" style="color: #FFD400;">
            👑 Hall of Glow
          </h3>
          <p class="text-xs mb-5" style="color: #F1E9DA; opacity: 0.35;">Les plus grands bienfaiteurs</p>

          <div class="flex flex-col gap-2">
            <div v-for="(donor, i) in leaderboard" :key="donor.name"
              class="rounded-xl px-3 py-3 flex items-center gap-3"
              :style="i === 0
                ? 'background: linear-gradient(90deg, rgba(255,212,0,0.1), rgba(255,212,0,0.03)); border: 1px solid rgba(255,212,0,0.2);'
                : 'background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.04);'"
            >
              <!-- Rang -->
              <span class="text-base w-6 text-center shrink-0">
                {{ i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.` }}
              </span>

              <!-- Avatar + infos -->
              <div class="flex items-center gap-2 flex-1 min-w-0">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                  :style="`background: linear-gradient(135deg, ${donor.color}44, ${donor.color}11); border: 1px solid ${donor.color}33; color: ${donor.color};`">
                  {{ donor.name[0] }}
                </div>
                <div class="min-w-0">
                  <p class="text-xs font-bold truncate" style="color: #F1E9DA;">{{ donor.name }}</p>
                  <p class="text-xs truncate" :style="`color: ${donor.gradeColor};`">{{ donor.grade }}</p>
                </div>
              </div>

              <!-- Score -->
              <div class="text-right shrink-0">
                <p class="text-xs font-black" :style="i === 0 ? 'color: #FFD400' : 'color: #F1E9DA'">{{ donor.glow }}</p>
                <p class="text-xs" style="color: #F1E9DA; opacity: 0.35;">{{ donor.wishes }} ✨</p>
              </div>
            </div>
          </div>

          <!-- Ma position -->
          <div class="mt-4 pt-4" style="border-top: 1px solid rgba(84,19,136,0.6);">
            <p class="text-xs mb-2" style="color: #F1E9DA; opacity: 0.35; text-transform: uppercase; letter-spacing: 0.08em;">Ma position</p>
            <div class="rounded-xl px-3 py-3 flex items-center gap-3"
              style="background: rgba(84,19,136,0.25); border: 1px solid rgba(84,19,136,0.5);">
              <span class="text-sm w-6 text-center shrink-0" style="color: #F1E9DA; opacity: 0.3;">—</span>
              <div class="flex items-center gap-2 flex-1 min-w-0">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                  style="background: linear-gradient(135deg, #541388, #D90368); color: #F1E9DA;">
                  {{ user?.email?.[0]?.toUpperCase() }}
                </div>
                <div class="min-w-0">
                  <p class="text-xs font-bold truncate" style="color: #F1E9DA;">{{ user?.email?.split('@')[0] }}</p>
                  <p class="text-xs" style="color: #FFD400;">Étincelle</p>
                </div>
              </div>
              <div class="text-right shrink-0">
                <p class="text-xs font-black" style="color: #F1E9DA;">0</p>
                <p class="text-xs" style="color: #F1E9DA; opacity: 0.35;">0 ✨</p>
              </div>
            </div>
          </div>

        </div>
      </aside>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";
definePageMeta({ middleware: "auth" });

const { user, logout } = useAuth();
const loading = ref(false);

const handleLogout = async () => {
  loading.value = true;
  try {
    await logout();
    await navigateTo("/login");
  } finally {
    loading.value = false;
  }
};

const navLinks = [
  { label: "Accueil",     icon: "🏠", active: true  },
  { label: "Souhaits",    icon: "✨", active: false },
  { label: "Mes demandes",icon: "📋", active: false },
  { label: "Classement",  icon: "👑", active: false },
  { label: "Profil",      icon: "👤", active: false },
];

const stats = [
  { icon: "✨", label: "Points Glow",       value: "0",   color: "#FFD400" },
  { icon: "🎁", label: "Souhaits exaucés",  value: "0",   color: "#D90368" },
  { icon: "💫", label: "Demandes réalisées",value: "0",   color: "#c084fc" },
  { icon: "🔥", label: "Jours consécutifs", value: "0",   color: "#fb923c" },
];

const wishes = [
  {
    icon: "📚",
    title: "Des livres pour apprendre la guitare",
    desc: "Je rêve d'apprendre la musique depuis toujours.",
    author: "Marie L.",
    glow: 80,
  },
  {
    icon: "🎨",
    title: "Matériel de dessin pour ma fille",
    desc: "Elle a un vrai talent, j'aimerais l'encourager.",
    author: "Thomas B.",
    glow: 120,
  },
  {
    icon: "🌱",
    title: "Graines et outils pour un petit jardin",
    desc: "Projet de jardinage partagé dans mon quartier.",
    author: "Léa M.",
    glow: 60,
  },
];

const leaderboard = [
  { name: "Élise Fontaine", grade: "Mécène",      gradeColor: "#FFD400", glow: "4 820", wishes: 24, color: "#FFD400"  },
  { name: "Marc Delacroix", grade: "Bienfaiteur",  gradeColor: "#c0c0c0", glow: "3 210", wishes: 17, color: "#c0c0c0"  },
  { name: "Sophie Aubert",  grade: "Bienfaiteur",  gradeColor: "#cd7f32", glow: "2 540", wishes: 13, color: "#cd7f32"  },
  { name: "Julien Renaud",  grade: "Éclat",        gradeColor: "#c084fc", glow: "1 890", wishes: 9,  color: "#c084fc"  },
  { name: "Camille Morel",  grade: "Éclat",        gradeColor: "#c084fc", glow: "1 340", wishes: 7,  color: "#c084fc"  },
  { name: "Antoine Dupuis", grade: "Lumière",      gradeColor: "#D90368", glow: "780",   wishes: 4,  color: "#D90368"  },
  { name: "Nina Girard",    grade: "Lumière",      gradeColor: "#D90368", glow: "430",   wishes: 2,  color: "#D90368"  },
];

const badges = [
  { icon: "🌟", label: "Bienvenue",   unlocked: true  },
  { icon: "🎁", label: "1er souhait", unlocked: false },
  { icon: "🔥", label: "7 jours",     unlocked: false },
  { icon: "👑", label: "Top donateur",unlocked: false },
  { icon: "💎", label: "Mécène",      unlocked: false },
  { icon: "✨", label: "Légende",     unlocked: false },
];
</script>
