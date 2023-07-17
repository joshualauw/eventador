<template>
    <div class="flex-between mb-8">
        <h1 class="font-semibold text-lg">Itinenaries</h1>
        <label v-if="accessible" @click="handleCreating" for="edit-itinenary-modal" class="btn btn-primary"
            >+ Create Itinenary</label
        >
    </div>
    <p v-if="itinenaries && itinenaries.data.length == 0" class="text-center font-semibold text-lg text-content2 mt-8">
        -no itinenaries-
    </p>
    <div class="flex space-x-5 overflow-x-auto h-[80vh] max-w-[1150px]">
        <OrganizerItinenaryItem
            v-for="itinenary in itinenaries?.data"
            @editing="handleUpdating"
            @deleting="handleDeleting"
            :id="itinenary._id"
            :day="itinenary.day"
            :schedules="itinenary.schedules"
        />
    </div>
    <OrganizerModalItinenaryEdit @saved="refresh" :context="actionContext" :update-id="actionId" />
    <OrganizerModalItinenaryDelete @deleted="refresh" :label="actionLabel" :id="actionId" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "participant"],
});

const { loggedParticipant } = useParticipantStore();
const { getAllItinenary } = useItinenaryStore();
const route = useRoute();
const accessible = computed(
    () => loggedParticipant.value?.access.includes("itinenary") || loggedParticipant.value?.type == "owner"
);

const { data: itinenaries, refresh } = useAsyncData("getAllItinenary", () =>
    getAllItinenary(route.params.id as string)
);

const { actionContext, actionId, actionLabel, handleCreating, handleDeleting, handleUpdating } = useCrudManager();
</script>
