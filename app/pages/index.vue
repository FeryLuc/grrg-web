<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div
        class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between"
      >
        <h1 class="text-lg font-bold text-gray-800">BES</h1>
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-500">{{ user?.email }}</span>
          <button
            @click="handleLogout"
            :disabled="loading"
            class="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
          >
            {{ loading ? "Déconnexion..." : "Se déconnecter" }}
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-6 py-12">
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Bienvenue 👋</h2>
        <p class="text-gray-500 text-sm">
          Vous êtes connecté en tant que <strong>{{ user?.email }}</strong>
        </p>
      </div>
    </main>
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
</script>
