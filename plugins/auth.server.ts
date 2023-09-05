export default defineNuxtPlugin(async () => {
    const { loggedUser } = useAuthStore();
    const token = useCookie("token");

    if (token.value && !loggedUser.value) {
        const res = await $fetch<ILogin.Data>("/api/me", { method: "POST", body: { token: token.value } });
        if (res.data) {
            loggedUser.value = res.data;
        }
    }
});
