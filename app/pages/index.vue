<template>
  <div class="min-h-screen" style="background: #0d0015; color: #F1E9DA;">

    <!-- Header -->
    <header style="background: rgba(84,19,136,0.6); border-bottom: 1px solid rgba(217,3,104,0.3); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 10;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div class="flex items-center gap-2 sm:gap-3">
          <span class="text-lg sm:text-2xl font-black tracking-widest" style="background: linear-gradient(90deg, #FFD400, #D90368); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            GIFT RUMBLE
          </span>
          <span class="text-xs font-bold px-2 py-0.5 rounded-full" style="background: #D90368; color: #F1E9DA;">BETA</span>
        </div>
        <div class="flex items-center gap-2 sm:gap-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style="background: linear-gradient(135deg, #541388, #D90368);">
              {{ user?.email?.[0]?.toUpperCase() }}
            </div>
            <span class="hidden sm:block text-sm" style="color: #F1E9DA; opacity: 0.7;">{{ user?.email }}</span>
          </div>
          <button
            @click="handleLogout"
            :disabled="loading"
            class="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg transition-all disabled:opacity-50"
            style="background: rgba(217,3,104,0.15); border: 1px solid rgba(217,3,104,0.5); color: #D90368;"
          >
            {{ loading ? "..." : "Déconnexion" }}
          </button>
        </div>
      </div>
    </header>

    <!-- Layout global : contenu central + sidebar classement -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8 flex flex-col xl:flex-row gap-6">

      <!-- Contenu principal -->
      <div class="flex-1 flex flex-col gap-4 sm:gap-6 min-w-0">

        <!-- Bannière joueur -->
        <div class="rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style="background: linear-gradient(135deg, #541388 0%, #2a0066 50%, #1a0040 100%); border: 1px solid rgba(255,212,0,0.2);">
          <div>
            <p class="text-xs mb-1" style="color: #FFD400; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700;">Joueur</p>
            <h2 class="text-2xl sm:text-3xl font-black" style="color: #F1E9DA;">{{ user?.email?.split('@')[0] }}</h2>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-xs font-bold px-3 py-1 rounded-full" style="background: rgba(255,212,0,0.15); border: 1px solid rgba(255,212,0,0.4); color: #FFD400;">
                ⚡ Niveau 1
              </span>
              <span class="text-xs font-bold px-3 py-1 rounded-full" style="background: rgba(217,3,104,0.15); border: 1px solid rgba(217,3,104,0.4); color: #D90368;">
                Débutant
              </span>
            </div>
          </div>
          <div class="flex flex-col gap-2 sm:items-end">
            <span class="text-xs" style="color: #F1E9DA; opacity: 0.6;">0 / 1000 XP</span>
            <div class="w-full sm:w-48 h-3 rounded-full overflow-hidden" style="background: rgba(255,255,255,0.1);">
              <div class="h-full rounded-full" style="width: 0%; background: linear-gradient(90deg, #541388, #FFD400);"></div>
            </div>
            <span class="text-xs" style="color: #F1E9DA; opacity: 0.4;">Prochain niveau : 1000 XP</span>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div v-for="stat in stats" :key="stat.label"
            class="rounded-xl p-4 sm:p-5 flex flex-col gap-2"
            :style="`background: rgba(84,19,136,0.25); border: 1px solid ${stat.color}30;`"
          >
            <span class="text-xl sm:text-2xl">{{ stat.icon }}</span>
            <span class="text-xl sm:text-2xl font-black" :style="`color: ${stat.color}`">{{ stat.value }}</span>
            <span class="text-xs" style="color: #F1E9DA; opacity: 0.6;">{{ stat.label }}</span>
          </div>
        </div>

        <!-- Missions actives -->
        <div class="rounded-2xl p-4 sm:p-6" style="background: rgba(84,19,136,0.2); border: 1px solid rgba(84,19,136,0.5);">
          <h3 class="font-bold text-base sm:text-lg mb-4 flex items-center gap-2" style="color: #FFD400;">
            <span>⚔️</span> Missions actives
          </h3>
          <div class="flex flex-col gap-3">
            <div v-for="mission in missions" :key="mission.title"
              class="rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05);"
            >
              <div class="flex items-center gap-3">
                <span class="text-xl shrink-0">{{ mission.icon }}</span>
                <div>
                  <p class="text-sm font-semibold" style="color: #F1E9DA;">{{ mission.title }}</p>
                  <p class="text-xs" style="color: #F1E9DA; opacity: 0.5;">{{ mission.desc }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex-1 sm:w-28 sm:flex-none">
                  <div class="h-2 rounded-full overflow-hidden" style="background: rgba(255,255,255,0.1);">
                    <div class="h-full rounded-full" :style="`width: ${mission.progress}%; background: linear-gradient(90deg, #541388, #D90368);`"></div>
                  </div>
                  <p class="text-xs mt-1 text-right" style="color: #F1E9DA; opacity: 0.4;">{{ mission.progress }}%</p>
                </div>
                <span class="text-xs font-bold px-2 py-1 rounded-lg shrink-0" style="background: rgba(255,212,0,0.15); color: #FFD400;">+{{ mission.xp }} XP</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Succès -->
        <div class="rounded-2xl p-4 sm:p-6" style="background: rgba(84,19,136,0.2); border: 1px solid rgba(84,19,136,0.5);">
          <h3 class="font-bold mb-4 flex items-center gap-2" style="color: #F1E9DA;">
            <span>🎖️</span> Succès
          </h3>
          <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
            <div v-for="badge in badges" :key="badge.label"
              class="flex flex-col items-center gap-1 rounded-xl p-2 sm:p-3"
              :style="`background: ${badge.unlocked ? 'rgba(255,212,0,0.1)' : 'rgba(0,0,0,0.3)'}; border: 1px solid ${badge.unlocked ? 'rgba(255,212,0,0.3)' : 'rgba(255,255,255,0.05)'};`"
            >
              <span class="text-2xl" :style="badge.unlocked ? '' : 'filter: grayscale(1); opacity: 0.3'">{{ badge.icon }}</span>
              <span class="text-xs text-center leading-tight" :style="`color: ${badge.unlocked ? '#FFD400' : '#F1E9DA'}; opacity: ${badge.unlocked ? 1 : 0.3};`">{{ badge.label }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Sidebar Classement -->
      <aside class="w-full xl:w-80 shrink-0">
        <div class="rounded-2xl p-4 sm:p-6 xl:sticky xl:top-24" style="background: rgba(217,3,104,0.08); border: 1px solid rgba(217,3,104,0.3);">
          <h3 class="font-bold text-lg mb-1 flex items-center gap-2" style="color: #D90368;">
            <span>🏆</span> Classement global
          </h3>
          <p class="text-xs mb-5" style="color: #F1E9DA; opacity: 0.4;">Mis à jour en temps réel</p>

          <div class="flex flex-col gap-2">
            <div v-for="(player, i) in leaderboard" :key="player.name"
              class="rounded-xl px-3 sm:px-4 py-3 flex items-center gap-3"
              :style="i === 0
                ? 'background: linear-gradient(90deg, rgba(255,212,0,0.12), rgba(255,212,0,0.04)); border: 1px solid rgba(255,212,0,0.25);'
                : i === 1
                  ? 'background: rgba(241,233,218,0.05); border: 1px solid rgba(241,233,218,0.1);'
                  : i === 2
                    ? 'background: rgba(217,3,104,0.06); border: 1px solid rgba(217,3,104,0.12);'
                    : 'background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.04);'"
            >
              <!-- Rang -->
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0"
                :style="i === 0
                  ? 'background: rgba(255,212,0,0.2); color: #FFD400;'
                  : i === 1
                    ? 'background: rgba(200,200,200,0.15); color: #ccc;'
                    : i === 2
                      ? 'background: rgba(205,127,50,0.15); color: #cd7f32;'
                      : 'background: rgba(255,255,255,0.05); color: rgba(241,233,218,0.3);'"
              >
                {{ i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}` }}
              </div>

              <!-- Avatar + nom -->
              <div class="flex items-center gap-2 flex-1 min-w-0">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  :style="`background: linear-gradient(135deg, ${player.color}66, ${player.color}22); border: 1px solid ${player.color}44; color: ${player.color};`">
                  {{ player.name[0] }}
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-semibold truncate" style="color: #F1E9DA;">{{ player.name }}</p>
                  <p class="text-xs" :style="`color: ${player.rankColor}; opacity: 0.9;`">{{ player.rank }}</p>
                </div>
              </div>

              <!-- Score + badge niveau -->
              <div class="flex flex-col items-end shrink-0">
                <span class="text-sm font-black" :style="i === 0 ? 'color: #FFD400' : 'color: #F1E9DA'">{{ player.score }}</span>
                <span class="text-xs" style="color: #F1E9DA; opacity: 0.4;">{{ player.gifts }} 🎁</span>
              </div>
            </div>
          </div>

          <!-- Ma position -->
          <div class="mt-4 pt-4" style="border-top: 1px solid rgba(217,3,104,0.2);">
            <p class="text-xs mb-2" style="color: #F1E9DA; opacity: 0.4; text-transform: uppercase; letter-spacing: 0.08em;">Ma position</p>
            <div class="rounded-xl px-4 py-3 flex items-center gap-3" style="background: rgba(84,19,136,0.3); border: 1px solid rgba(84,19,136,0.6);">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0" style="background: rgba(84,19,136,0.4); color: rgba(241,233,218,0.4);">
                —
              </div>
              <div class="flex items-center gap-2 flex-1 min-w-0">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style="background: linear-gradient(135deg, #541388, #D90368); color: #F1E9DA;">
                  {{ user?.email?.[0]?.toUpperCase() }}
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-semibold truncate" style="color: #F1E9DA;">{{ user?.email?.split('@')[0] }}</p>
                  <p class="text-xs" style="color: #FFD400;">Débutant</p>
                </div>
              </div>
              <div class="flex flex-col items-end shrink-0">
                <span class="text-sm font-black" style="color: #F1E9DA;">0 pts</span>
                <span class="text-xs" style="color: #F1E9DA; opacity: 0.4;">0 🎁</span>
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

const stats = [
  { icon: "⚡", label: "Points XP", value: "0", color: "#FFD400" },
  { icon: "🎁", label: "Cadeaux gagnés", value: "0", color: "#D90368" },
  { icon: "🔥", label: "Série en cours", value: "0j", color: "#FF6B35" },
  { icon: "🎯", label: "Missions complètes", value: "0", color: "#9b59b6" },
];

const missions = [
  { icon: "🎁", title: "Premier cadeau", desc: "Participez à votre premier tirage", progress: 0, xp: 100 },
  { icon: "👥", title: "Recruteur", desc: "Invitez un ami à rejoindre", progress: 0, xp: 250 },
  { icon: "🔥", title: "Série de 7 jours", desc: "Connectez-vous 7 jours de suite", progress: 0, xp: 500 },
];

const leaderboard = [
  { name: "MagicPlayer99", score: "4 200 pts", gifts: 12, rank: "Champion", rankColor: "#FFD400", color: "#FFD400" },
  { name: "StarHunter",    score: "3 850 pts", gifts: 9,  rank: "Expert",   rankColor: "#c0c0c0", color: "#c0c0c0" },
  { name: "GiftMaster",   score: "2 100 pts", gifts: 6,  rank: "Avancé",   rankColor: "#cd7f32", color: "#cd7f32" },
  { name: "LuckyDraw",    score: "1 750 pts", gifts: 4,  rank: "Confirmé", rankColor: "#D90368", color: "#D90368" },
  { name: "NightOwl",     score: "1 200 pts", gifts: 3,  rank: "Confirmé", rankColor: "#D90368", color: "#D90368" },
  { name: "BlazeFox",     score: "890 pts",   gifts: 2,  rank: "Débutant", rankColor: "#9b59b6", color: "#9b59b6" },
  { name: "CrystalRose",  score: "430 pts",   gifts: 1,  rank: "Débutant", rankColor: "#9b59b6", color: "#9b59b6" },
];

const badges = [
  { icon: "🌟", label: "Bienvenue", unlocked: true },
  { icon: "🎁", label: "1er don",   unlocked: false },
  { icon: "🔥", label: "Série",     unlocked: false },
  { icon: "👑", label: "Top 3",     unlocked: false },
  { icon: "💎", label: "VIP",       unlocked: false },
  { icon: "⚡", label: "Rapide",    unlocked: false },
];
</script>
