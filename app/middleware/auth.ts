import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  // pas de vérification sur la page login pour éviter une boucle de redirection
  if (to.path === "/login") return;

  // le refresh token est un cookie httpOnly du navigateur — inaccessible côté serveur.
  // on laisse le client gérer entièrement la vérification d'auth.
  if (import.meta.server) return;

  const { isAuthenticated, refresh } = useAuth();

  if (!isAuthenticated.value) {
    try {
      await refresh();
    } catch {
      return navigateTo("/login");
    }
  }
});
