import { TYPE } from "vue-toastification";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { loggedParticipant, getAllParticipant } = useParticipantStore();
    const { loggedUser } = useAuthStore();
    const cached = useCookie<IParticipant & { user_id: IUser }>("loggedParticipant");

    if (cached.value) {
        if (cached.value.event_id === to.params.id) {
            loggedParticipant.value = cached.value;
        } else {
            const participants = await getAllParticipant(to.params.id as string);
            if (participants) {
                const currentParticipant = participants.data.find((par) => par.user_id._id == loggedUser.value?._id);
                if (currentParticipant) {
                    loggedParticipant.value = currentParticipant;
                    cached.value = currentParticipant;
                }
            }
        }
    } else {
        const participants = await getAllParticipant(to.params.id as string);
        if (participants) {
            const currentParticipant = participants.data.find((par) => par.user_id._id == loggedUser.value?._id);
            if (currentParticipant) {
                loggedParticipant.value = currentParticipant;
                cached.value = currentParticipant;
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
