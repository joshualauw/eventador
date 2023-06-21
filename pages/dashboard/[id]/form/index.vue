<template>
    <div class="flex-between mb-8">
        <h1 class="font-semibold text-lg">Forms</h1>
        <label @click="handleCreating" for="edit-form-modal" class="btn btn-primary">+ Create Form</label>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <OrganizerFormItem
            v-for="form in forms"
            @editing="handleUpdating"
            @deleting="handleDeleting"
            :id="form.id"
            :name="form.name"
            :fields_length="form.field_length"
            :response_length="form.response_length"
        />
    </div>
    <OrganizerModalFormEdit :context="actionContext" :update-id="actionId" />
    <OrganizerModalFormDelete :label="actionLabel" :id="actionId" />
</template>

<script setup lang="ts">
import forms from "@/assets/json/forms.json";

definePageMeta({
    layout: "dashboard",
});

const { actionId, actionContext, actionLabel, handleCreating, handleDeleting, handleUpdating } = useCrudManager();
</script>
