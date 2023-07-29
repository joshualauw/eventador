export default defineNuxtRouteMiddleware((to, from) => {
    const { loggedUser } = useAuthStore();

    if (loggedUser.value?.role !== "admin") {
        return navigateTo("/");
    }
});
