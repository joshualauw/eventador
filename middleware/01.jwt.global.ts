export default defineNuxtRouteMiddleware(async (to, from) => {
    const { loggedUser, getMe } = useAuthStore();
    const token = useCookie("token");

    if (token.value && !loggedUser.value) {
        await getMe();
    }
});
