export default defineNuxtPlugin(async () => {
    const { getMe } = useAuthStore();
    const token = useCookie("token");

    if (token.value) {
        await getMe();
    }
});
