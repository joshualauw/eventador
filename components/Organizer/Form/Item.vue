<template>
    <div class="card max-h-fit hover:scale-100">
        <div class="card-body p-6 relative">
            <p class="font-semibold text-base md:text-lg">{{ name }}</p>
            <p class="text-mute">
                <Icon name="material-symbols:dynamic-form" class="mr-1" /> {{ fields_length }} fields
            </p>
            <p class="text-mute"><Icon name="ph:users-three-bold" class="mr-1" /> {{ response_length }} responses</p>
            <div v-if="accessible" class="flex-end space-x-1.5">
                <label for="edit-form-modal" @click="emits('editing', id)" class="btn btn-sm btn-solid-secondary">
                    Edit
                </label>
                <label for="delete-form-modal" @click="emits('deleting', id, name)" class="btn btn-sm btn-solid-error">
                    Delete
                </label>
            </div>
            <div
                v-if="accessible"
                @click="navigateTo(`/dashboard/${route.params.id}/form/${id}`)"
                class="btn btn-sm btn-ghost absolute top-3 right-3"
            >
                <Icon name="fa:external-link" class="text-content2 font-semibold" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    id: string;
    name: string;
    fields_length: number;
    response_length: number;
}>();

const route = useRoute();
const { loggedParticipant } = useParticipantStore();
const accessible = computed(
    () => loggedParticipant.value?.access.includes("form") || loggedParticipant.value?.type == "owner"
);

const emits = defineEmits<{
    (e: "editing", id: string): void;
    (e: "deleting", id: string, label: string): void;
}>();
</script>
