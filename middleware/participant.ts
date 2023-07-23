import { TYPE } from "vue-toastification";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { loggedParticipant, getAllParticipant } = useParticipantStore();
    const { loggedUser } = useAuthStore();
    const cached = useCookie("loggedParticipant");

    if (cached.value) {
        const currentParticipant = cached.value as any;
        if (currentParticipant.event_id === to.params.id) {
            loggedParticipant.value = currentParticipant;
        } else {
            const participants = await getAllParticipant(to.params.id as string);
            if (participants) {
                const currentParticipant = participants.data.find((par) => par.user_id._id == loggedUser.value?._id);
                if (currentParticipant) loggedParticipant.value = currentParticipant;
            }
        }
    } else {
        const participants = await getAllParticipant(to.params.id as string);
        if (participants) {
            const currentParticipant = participants.data.find((par) => par.user_id._id == loggedUser.value?._id);
            if (currentParticipant) {
                loggedParticipant.value = currentParticipant;
                cached.value = currentParticipant as any;
            }
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
