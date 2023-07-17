<template>
    <div class="flex-between mb-8">
        <h1 class="font-semibold text-lg">Participants</h1>
        <label v-if="loggedParticipant?.type == 'owner'" for="invite-participant-modal" class="btn btn-primary">
            + Invite Participant
        </label>
    </div>
    <div class="flex flex-center flex-col md:flex-row gap-3 mb-8">
        <Icon name="fa:search" />
        <input v-model="searchTerm" type="text" class="input max-w-full md:w-56" placeholder="participant name.." />
        <select v-model="typeTerm" class="select w-full md:w-36">
            <option value="">All</option>
            <option value="reguler">Reguler</option>
            <option value="invited">Invited</option>
            <option value="organizer">Organizer</option>
            <option value="owner">Owner</option>
        </select>
    </div>
    <OrganizerParticipantList
        :participants="
            filteredParticipants.map((par) => ({
                id: par._id,
                email: par.user_id.email,
                name: par.user_id.username,
                joinedAt: par.joinedDate,
                type: par.type,
            }))
        "
    />
    <OrganizerModalParticipantInvite />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "participant"],
});

const route = useRoute();
const { getAllParticipant } = useParticipantStore();
const { loggedParticipant } = useParticipantStore();
const participantData = ref<(IParticipant & { user_id: IUser })[]>([]);
const searchTerm = ref("");
const typeTerm = ref("");

const { data: participants } = await useAsyncData("getAllParticipant", () =>
    getAllParticipant(route.params.id as string)
);
if (participants.value) {
    participantData.value = [...participants.value.data];
}

const filteredParticipants = computed(() => {
    return participantData.value
        .filter((p) => p.user_id.username.toLowerCase().includes(searchTerm.value.toLowerCase()))
        .filter((p) => (typeTerm.value == "" ? true : p.type == typeTerm.value));
});
</script>
