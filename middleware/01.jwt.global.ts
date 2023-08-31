export default defineNuxtRouteMiddleware(async (to, from) => {
    const { loggedUser } = useAuthStore();
    const token = useCookie("token");

    if (token.value && !loggedUser.value) {
        const res = await fetcher<ILogin.Data>("/auth/myself");
        if (res.data) {
            loggedUser.value = res.data;
        }
    }
});
