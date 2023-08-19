import { TYPE } from "vue-toastification";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { loggedParticipant, getParticipantByUser } = useParticipantStore();
    const { loggedUser } = useAuthStore();
    const eventId = useCookie<string>("eventId");
    const event_id = to.params.id as string;

    if (loggedUser.value && (!loggedParticipant.value || eventId.value != event_id)) {
        const res = await getParticipantByUser(event_id, loggedUser.value._id);
        if (res) {
            loggedParticipant.value = res.data;
            eventId.value = event_id;
        }
    }

    if (!loggedParticipant.value) {
        return navigateTo("/");
    }
    if (loggedParticipant.value.is_banned) {
        createToast("you have been banned!", TYPE.ERROR);
        return navigateTo("/");
    }
    if (to.meta.owner && loggedParticipant.value.type !== "owner") {
        return navigateTo("/");
    }
});
