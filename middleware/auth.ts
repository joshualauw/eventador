export default defineNuxtRouteMiddleware(async (to, from) => {
    const { loggedUser } = useAuthStore();
    const token = useCookie("token");

    if (token.value && !loggedUser.value) {
        const res = await fetcher<ILogin.Data>("/auth/myself");
        if (res.data) {
            loggedUser.value = res.data;
        }
    }

    if (!loggedUser.value) {
        return navigateTo("/");
    }
    if (loggedUser.value && loggedUser.value.is_banned) {
        loggedUser.value = null;
        token.value = null;

        return navigateTo("/");
    }
});
