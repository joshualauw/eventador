export default defineNuxtRouteMiddleware(async (to, from) => {
    //TODO: fetch only when route params changes
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
    if (to.meta.owner && loggedParticipant.value.type !== "owner") {
        return navigateTo("/");
    }
});
