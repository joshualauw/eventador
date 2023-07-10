export default defineNuxtPlugin(async () => {
    const { getMe, loggedUser } = useAuthStore();
    const token = useCookie("token");

    if (token.value && !loggedUser.value) await getMe();
});
