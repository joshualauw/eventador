<template>
    <UIModal v-slot="{ setOpen }" modal-id="invite-participant-modal">
        <h2 class="text-center text-xl font-semibold text-content1">Invite Participant</h2>
        <form class="space-y-4 mt-4">
            <div class="form-group">
                <label class="form-label">User Email</label>
                <input v-model="inviteState.email" type="text" class="input max-w-full" placeholder="user email.." />
                <textarea
                    v-model="inviteState.description"
                    class="h-24 w-full textarea resize-none"
                    placeholder="greetings.."
                ></textarea>
                <p class="text-mute">*participant will be sent invitational code</p>
            </div>
            <p>
                <input v-model="inviteState.is_organizer" type="checkbox" class="checkbox" />
                <span class="text-mute ml-2">Invite as organizer</span>
            </p>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-6" />
            <div class="form-group pt-6">
                <button
                    @click="doInviteParticipant(setOpen)"
                    type="button"
                    class="btn btn-primary w-full"
                    :class="{ 'btn-loading': pending }"
                >
                    Send Invitation
                </button>
            </div>
        </form>
    </UIModal>
</template>
``
<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();

const { value: inviteState, reset } = useStateHandler<IInviteParticipant.Body>({
    link: config.public.baseURL + `/event/${route.params.id}`,
    email: "",
    description: "",
    is_organizer: false,
});

const { inviteParticipant } = useParticipantStore();
const { error, errors, pending, mutate } = useMutate(inviteParticipant);

async function doInviteParticipant(setOpen: (state: boolean) => void) {
    const res = await mutate(route.params.id as string, inviteState);
    if (res.status) {
        reset();
        setOpen(false);
    }
}
</script>
