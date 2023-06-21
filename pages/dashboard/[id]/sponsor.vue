<template>
    <div class="flex-between mb-8">
        <h1 class="font-semibold text-lg">Sponsors</h1>
        <label @click="handleCreating" for="edit-sponsor-modal" class="btn btn-primary">+ Create Sponsor</label>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">
        <OrganizerSponsorItem
            v-for="sponsor in sponsors"
            @editing="handleUpdating"
            @deleting="handleDeleting"
            :id="sponsor.name"
            :name="sponsor.name"
            :logo="sponsor.logo"
        />
    </div>
    <OrganizerModalSponsorEdit :context="actionContext" :update-id="actionId" />
    <OrganizerModalSponsorDelete :label="actionLabel" :id="actionId" />
    <OrganizerModalSponsorDetail :detail-id="actionId" />
</template>

<script setup lang="ts">
import sponsors from "@/assets/json/sponsors.json";

definePageMeta({
    layout: "dashboard",
});

const { actionContext, actionId, actionLabel, handleCreating, handleDeleting, handleUpdating } = useCrudManager();
</script>
