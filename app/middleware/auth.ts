import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  // pas de vérifiaction sur la page login pour éviter une boucle de redirection
  if (to.path === "/login") return;
  const { isAuthenticated, refresh } = useAuth();

  if (!isAuthenticated.value) {
    try {
      await refresh();
    } catch {
      return navigateTo("login");
    }
  }
});
