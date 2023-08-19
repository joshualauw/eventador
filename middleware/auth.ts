export default defineNuxtRouteMiddleware((to, from) => {
    const { loggedUser } = useAuthStore();
    const token = useCookie("token");

    if (!loggedUser.value) {
        return navigateTo("/");
    }
    if (loggedUser.value && loggedUser.value.is_banned) {
        loggedUser.value = null;
        token.value = null;

        return navigateTo("/");
    }
});
