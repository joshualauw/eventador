<template>
    <div>
        <div class="flex-between flex-col md:flex-row mb-8">
            <h1 class="font-semibold text-lg">Participants</h1>
            <div class="mb-8 md:mb-0">
                Share Link:
                <span @click="copyLink" class="text-primary hover:underline cursor-pointer">
                    {{ linkUrl }}
                </span>
            </div>
            <label
                v-if="loggedParticipant?.type == 'owner'"
                for="invite-participant-modal"
                class="btn btn-primary w-full md:w-fit"
            >
                + Invite Participant
            </label>
        </div>
        <div class="flex flex-center flex-col md:flex-row gap-3 mb-8">
            <input v-model="searchTerm" type="text" class="input max-w-full md:w-56" placeholder="Search by name.." />
            <select v-model="typeTerm" class="select w-full md:w-36">
                <option value="">All</option>
                <option value="reguler">Reguler</option>
                <option value="invited">Invited</option>
                <option value="organizer">Organizer</option>
                <option value="owner">Owner</option>
            </select>
        </div>
        <div class="w-full overflow-x-auto">
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
        </div>
        <OrganizerModalParticipantInvite />
    </div>
</template>

<script setup lang="ts">
import { TYPE } from "vue-toastification";

definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "participant"],
});

const route = useRoute();
const config = useRuntimeConfig();
const { getAllParticipant, loggedParticipant } = useParticipantStore();
const participantData = ref<(IParticipant & { user_id: IUser })[]>([]);
const searchTerm = ref("");
const typeTerm = ref("");

const { data: participants } = await useAsyncData("getAllParticipant", () =>
    getAllParticipant(route.params.id as string)
);
if (participants.value) {
    participantData.value = [...participants.value.data];
}
const linkUrl = config.public.baseURL + "/event/" + route.params.id;

const filteredParticipants = computed(() => {
    return participantData.value
        .filter((p) => p.user_id.username.toLowerCase().includes(searchTerm.value.toLowerCase()))
        .filter((p) => (typeTerm.value == "" ? true : p.type == typeTerm.value));
});

function copyLink() {
    navigator.clipboard.writeText(linkUrl);
    createToast("event URL copied", TYPE.SUCCESS);
}
</script>
