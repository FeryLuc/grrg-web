export const useAuth = () => {
  const config = useRuntimeConfig();

  // useState partage l'état entre tous les composants qui appellent useAuth()
  const accessToken = useState<string | null>("accessToken", () => null);
  const user = useState<{ id: Number; email: string } | null>(
    "user",
    () => null,
  );

  const baseURL = config.public.apiUrl as string;

  const login = async (email: string, password: string) => {
    const data = await $fetch<{ accessToken: string }>("/auth/login", {
      baseURL,
      method: "POST",
      body: { email, password },
      // nécessaire pour que le navigateur envoie/reçoive le cookie refresh_token
      credentials: "include",
    });
    accessToken.value = data.accessToken;
    // le payload JWT est la 2ème partie (base64) — on en extrait id et email
    const payload = JSON.parse(atob(data.accessToken.split(".")[1]!));
    user.value = { id: payload.sub, email: payload.email };
  };

  const logout = async () => {
    await $fetch("/auth/logout", {
      baseURL,
      method: "POST",
      // le guard JwtAuthGuard du backend requiert le Bearer token
      headers: accessToken.value
        ? { Authorization: `Bearer ${accessToken.value}` }
        : {},
      credentials: "include",
    });
    accessToken.value = null;
    user.value = null;
  };

  const register = async (email: string, password: string) => {
    const data = await $fetch<{ accessToken: string }>("/auth/register", {
      baseURL,
      method: "POST",
      body: { email, password },
      credentials: "include",
    });
    accessToken.value = data.accessToken;
    const payload = JSON.parse(atob(data.accessToken.split(".")[1]!));
    user.value = { id: payload.sub, email: payload.email };
  };

  const refresh = async () => {
    const data = await $fetch<{ accessToken: string }>("/auth/refresh", {
      baseURL,
      method: "POST",
      // le cookie refresh_token est envoyé automatiquement par le navigateur
      credentials: "include",
    });
    accessToken.value = data.accessToken;
    const payload = JSON.parse(atob(data.accessToken.split(".")[1]!));
    user.value = { id: payload.sub, email: payload.email };
  };

  const isAuthenticated = computed(() => !!accessToken.value);

  return {
    accessToken,
    user,
    login,
    logout,
    register,
    refresh,
    isAuthenticated,
  };
};
