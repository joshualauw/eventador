export default defineNuxtRouteMiddleware(async (to, from) => {
    //TODO: fetch only when route params changes
    const { eventDetail, getEventDetail } = useEventStore();
    const { loggedParticipant, getAllParticipant } = useParticipantStore();
    const { loggedUser } = useAuthStore();

    const participants = await getAllParticipant(to.params.id as string);

    if (participants) {
        const currentParticipant = participants.data.find((par) => par.user_id._id == loggedUser.value?._id);
        if (currentParticipant) loggedParticipant.value = currentParticipant;
    }

    const event = await getEventDetail(to.params.id as string);
    if (event) {
        eventDetail.value = event.data.event;
    }

    if (
        !loggedParticipant.value ||
        (loggedParticipant.value.type != "owner" && loggedParticipant.value.type != "organizer")
    ) {
        return navigateTo("/");
    }
    if (to.meta.owner && loggedParticipant.value.type !== "owner") {
        return navigateTo("/");
    }
});
