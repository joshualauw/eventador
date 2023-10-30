<template>
    <div>
        <div class="flex-between mb-8">
            <h1 class="font-semibold text-lg">Sponsors</h1>
            <label v-if="accessible" @click="handleCreating" for="edit-sponsor-modal" class="btn btn-primary">
                + Create Sponsor
            </label>
        </div>
        <p v-if="sponsors && sponsors.data.length == 0" class="text-center font-semibold text-lg text-content2 mt-8">
            -no sponsors-
        </p>
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">
            <OrganizerSponsorItem
                v-for="sponsor in sponsors?.data"
                @editing="handleUpdating"
                @deleting="handleDeleting"
                :id="sponsor._id"
                :name="sponsor.name"
                :logo="sponsor.logo"
                :funds="sponsor.funds"
            />
        </div>
        <OrganizerModalSponsorEdit @saved="refresh" :context="actionContext" :update-id="actionId" />
        <OrganizerModalSponsorDelete @deleted="refresh" :label="actionLabel" :id="actionId" />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "participant"],
});

const { actionContext, actionId, actionLabel, handleCreating, handleDeleting, handleUpdating } = useCrudManager();
const { getAllSponsor } = useSponsorStore();
const route = useRoute();

const { loggedParticipant } = useParticipantStore();
const accessible = computed(
    () => loggedParticipant.value?.access.includes("sponsor") || loggedParticipant.value?.type == "owner"
);

const { data: sponsors, refresh } = await useAsyncData("getAllSponsor", () => getAllSponsor(route.params.id as string));
</script>
