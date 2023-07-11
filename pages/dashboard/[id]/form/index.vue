<template>
    <div class="flex-between mb-8">
        <h1 class="font-semibold text-lg">Forms</h1>
        <label @click="handleCreating" for="edit-form-modal" class="btn btn-primary">+ Create Form</label>
    </div>
    <p v-if="forms && forms.data.length == 0" class="text-center font-semibold text-lg text-content2 mt-8">
        -no forms-
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <OrganizerFormItem
            v-for="form in forms?.data"
            @editing="handleUpdating"
            @deleting="handleDeleting"
            :id="form._id"
            :name="form.name"
            :fields_length="form.fields.length"
            :response_length="form.responses.length"
        />
    </div>
    <OrganizerModalFormEdit @saved="refresh" :context="actionContext" :update-id="actionId" />
    <OrganizerModalFormDelete @deleted="refresh" :label="actionLabel" :id="actionId" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: "event-dashboard",
});

const { actionId, actionContext, actionLabel, handleCreating, handleDeleting, handleUpdating } = useCrudManager();
const { getAllForm } = useFormStore();
const { eventDashboardId } = useEventStore();

const { data: forms, refresh } = await useAsyncData("getAllForm", () => getAllForm(eventDashboardId.value));
</script>
