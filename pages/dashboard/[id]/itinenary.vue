<template>
    <div class="flex-between mb-8">
        <h1 class="font-semibold text-lg">Itinenaries</h1>
        <label @click="handleCreating" for="edit-itinenary-modal" class="btn btn-primary">+ Create Itinenary</label>
    </div>
    <div class="flex h-[80vh] overflow-x-auto space-x-5 w-full pb-6">
        <OrganizerItinenaryItem
            v-for="itinenary in itinenaries"
            @editing="handleUpdating"
            @deleting="handleDeleting"
            :id="itinenary.id"
            :day="itinenary.day"
            :schedules="itinenary.schedules"
        />
    </div>
    <OrganizerModalItinenaryEdit :context="actionContext" :update-id="actionId" />
    <OrganizerModalItinenaryDelete :label="actionLabel" :id="actionId" />
</template>

<script setup lang="ts">
import itinenaries from "@/assets/json/itinenaries.json";

definePageMeta({
    layout: "dashboard",
});

const { actionContext, actionId, actionLabel, handleCreating, handleDeleting, handleUpdating } = useCrudManager();
</script>
