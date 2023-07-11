export default defineNuxtRouteMiddleware((to, from) => {
    const { eventDashboardId } = useEventStore();
    eventDashboardId.value = to.params.id as string;
});
