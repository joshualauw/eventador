export default defineNuxtRouteMiddleware(async (to, from) => {
    const { loggedUser } = useAuthStore();
    const token = useCookie("token");

    if (token.value && !loggedUser.value) {
        const res = await $fetch<ILogin.Data>("/api/me", { method: "POST", body: { token: token.value } });
        loggedUser.value = res.data;
    }
});
