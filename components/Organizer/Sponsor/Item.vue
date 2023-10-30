<template>
    <div class="card max-h-fit hover:scale-100">
        <div class="card-body p-6 relative">
            <div class="flex-box flex-col mb-2">
                <img :src="logo ?? '/images/default-logo.png'" class="rounded-lg mb-6 w-28 h-28" />
                <p class="font-semibold text-base md:text-lg">{{ name }}</p>
                <p class="text-success">Rp. {{ funds ?? 0 }}</p>
            </div>
            <div v-if="accessible" class="flex-end space-x-1.5">
                <label for="edit-sponsor-modal" @click="emits('editing', id)" class="btn btn-sm btn-solid-secondary">
                    Edit
                </label>
                <label
                    for="delete-sponsor-modal"
                    @click="emits('deleting', id, name)"
                    class="btn btn-sm btn-solid-error"
                >
                    Delete
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    id: string;
    name: string;
    funds?: number;
    logo?: string;
}>();
const emits = defineEmits<{
    (e: "editing", id: string): void;
    (e: "deleting", id: string, label: string): void;
}>();

const { loggedParticipant } = useParticipantStore();
const accessible = computed(
    () => loggedParticipant.value?.access.includes("sponsor") || loggedParticipant.value?.type == "owner"
);
</script>
