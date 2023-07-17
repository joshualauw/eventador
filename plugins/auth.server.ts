export default defineNuxtPlugin(async () => {
    const { loggedUser } = useAuthStore();
    const token = useCookie("token");

    if (token.value && !loggedUser.value) {
        //avoid createToast before hydration
        const res = await fetcher<ILogin.Data>("/auth/myself");
        if (res.data) {
            loggedUser.value = res.data;
        }
    }
});
