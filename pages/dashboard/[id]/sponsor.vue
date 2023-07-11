<template>
    <div class="flex-between mb-8">
        <h1 class="font-semibold text-lg">Sponsors</h1>
        <label @click="handleCreating" for="edit-sponsor-modal" class="btn btn-primary">+ Create Sponsor</label>
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
        />
    </div>
    <OrganizerModalSponsorEdit @saved="refresh" :context="actionContext" :update-id="actionId" />
    <OrganizerModalSponsorDelete @deleted="refresh" :label="actionLabel" :id="actionId" />
</template>

<script setup lang="ts">
// import sponsors from "@/assets/json/sponsors.json";

definePageMeta({
    layout: "dashboard",
    middleware: "event-dashboard",
});

const { actionContext, actionId, actionLabel, handleCreating, handleDeleting, handleUpdating } = useCrudManager();
const { getAllSponsor } = useSponsorStore();
const { eventDashboardId } = useEventStore();

const { data: sponsors, refresh } = await useAsyncData("getAllSponsor", () => getAllSponsor(eventDashboardId.value));
console.log(sponsors.value);
</script>
