// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/icon", "@nuxt/fonts", "@nuxtjs/i18n", "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      apiUrl: "http://localhost:3001",
    },
  },
  i18n: {
    locales: [{ code: "fr", language: "fr-FR" }],
    defaultLocale: "fr",
  },
});
