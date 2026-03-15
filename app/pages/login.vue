<template>
  <div
    class="min-h-screen flex items-center justify-center"
    style="
      background: linear-gradient(
        135deg,
        #1a0029 0%,
        #2d0a4e 50%,
        #4a0a3a 100%
      );
    "
  >
    <!-- Card glassmorphism -->
    <div
      class="w-full max-w-md rounded-2xl p-8"
      style="
        background: rgba(255, 255, 255, 0.07);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
      "
    >
      <!-- Logo -->
      <div class="text-center mb-8">
        <span
          class="text-4xl font-black tracking-widest"
          style="
            background: linear-gradient(90deg, #c084fc, #e879f9, #f472b6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          "
          >Gift Rumble</span
        >
        <p class="text-purple-300 text-sm mt-1 opacity-70">Rise & Glow</p>
      </div>

      <!-- Tabs -->
      <div
        class="flex rounded-xl mb-6 p-1"
        style="background: rgba(0, 0, 0, 0.3)"
      >
        <button
          @click="activeTab = 'login'"
          class="flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          :style="
            activeTab === 'login'
              ? 'background: linear-gradient(90deg, #9333ea, #c2185b); color: white'
              : 'color: rgba(255,255,255,0.5)'
          "
        >
          Se connecter
        </button>
        <button
          @click="activeTab = 'register'"
          class="flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          :style="
            activeTab === 'register'
              ? 'background: linear-gradient(90deg, #9333ea, #c2185b); color: white'
              : 'color: rgba(255,255,255,0.5)'
          "
        >
          Créer un compte
        </button>
      </div>

      <!-- Formulaire login -->
      <form
        v-if="activeTab === 'login'"
        @submit.prevent="handleLogin"
        class="flex flex-col gap-4"
      >
        <div>
          <label class="block text-sm font-medium text-purple-200 mb-1"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            placeholder="vous@exemple.com"
            class="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-purple-400 focus:outline-none transition-all"
            style="
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(192, 132, 252, 0.3);
            "
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-purple-200 mb-1"
            >Mot de passe</label
          >
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-purple-400 focus:outline-none transition-all"
            style="
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(192, 132, 252, 0.3);
            "
          />
        </div>

        <p v-if="error" class="text-pink-400 text-sm text-center">
          {{ error }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 disabled:opacity-50 mt-2"
          style="background: linear-gradient(90deg, #9333ea, #c2185b)"
        >
          {{ loading ? "Connexion..." : "Se connecter" }}
        </button>
      </form>

      <!-- Formulaire register -->
      <form v-else @submit.prevent="handleRegister" class="flex flex-col gap-4">
        <div>
          <label class="block text-sm font-medium text-purple-200 mb-1"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            placeholder="vous@exemple.com"
            class="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-purple-400 focus:outline-none transition-all"
            style="
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(192, 132, 252, 0.3);
            "
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-purple-200 mb-1"
            >Mot de passe</label
          >
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-purple-400 focus:outline-none transition-all"
            style="
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(192, 132, 252, 0.3);
            "
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-purple-200 mb-1"
            >Confirmer le mot de passe</label
          >
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="••••••••"
            class="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-purple-400 focus:outline-none transition-all"
            style="
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(192, 132, 252, 0.3);
            "
          />
        </div>

        <p v-if="error" class="text-pink-400 text-sm text-center">
          {{ error }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 disabled:opacity-50 mt-2"
          style="background: linear-gradient(90deg, #9333ea, #c2185b)"
        >
          {{ loading ? "Création..." : "Créer mon compte" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";

const { login, register } = useAuth();

const activeTab = ref<"login" | "register">("login");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const loading = ref(false);

// réinitialise le formulaire au changement d'onglet
watch(activeTab, () => {
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  error.value = "";
});

const handleLogin = async () => {
  error.value = "";
  loading.value = true;
  try {
    await login(email.value, password.value);
    await navigateTo("/");
  } catch (err: any) {
    const messages = err?.data?.message;
    error.value = Array.isArray(messages)
      ? messages[0]
      : (messages ?? "Email ou mot de passe incorrect");
  } finally {
    loading.value = false;
  }
};

const handleRegister = async () => {
  error.value = "";
  if (password.value !== confirmPassword.value) {
    error.value = "Les mots de passe ne correspondent pas";
    return;
  }
  loading.value = true;
  try {
    await register(email.value, password.value);
    await navigateTo("/");
  } catch (err: any) {
    const messages = err?.data?.message;
    error.value = Array.isArray(messages)
      ? messages[0]
      : (messages ?? "Erreur lors de la création du compte");
  } finally {
    loading.value = false;
  }
};
</script>
