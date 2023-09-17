export default defineNuxtPlugin(async () => {
    const { getMe } = useAuthStore();
    const token = useCookie("token");

    if (token.value) {
        try {
            await getMe();
        } catch (error) {
            console.error(error);
        }
    }
});
