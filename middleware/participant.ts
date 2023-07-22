import { TYPE } from "vue-toastification";

export default defineNuxtRouteMiddleware(async (to, from) => {
    //TODO: store in cookie
    const { loggedParticipant, getAllParticipant } = useParticipantStore();
    const { loggedUser } = useAuthStore();

    const participants = await getAllParticipant(to.params.id as string);

    if (participants) {
        const currentParticipant = participants.data.find((par) => par.user_id._id == loggedUser.value?._id);
        if (currentParticipant) loggedParticipant.value = currentParticipant;
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
