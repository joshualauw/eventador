<template>
    <div class="flex-shrink-0 p-4 rounded-sm bg-backgroundSecondary shadow-md">
        <p class="font-bold mb-4">{{ day }}</p>
        <div v-for="schedule in schedules" class="py-1.5 px-6 mb-2 rounded-lg bg-gray-2">
            <p class="font-semibold">{{ schedule.name }}</p>
            <p class="text-mute">{{ schedule.time }}</p>
        </div>
        <div class="flex-box w-full mt-4 space-x-1">
            <label
                for="edit-itinenary-modal"
                @click="emits('editing', id)"
                class="btn btn-xs btn-rounded btn-solid-secondary"
                >Edit</label
            >
            <label
                for="delete-itinenary-modal"
                @click="emits('deleting', id, day)"
                class="btn btn-xs btn-rounded btn-solid-error"
                >Delete</label
            >
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    id: string;
    day: string;
    schedules: {
        name: string;
        time: string;
    }[];
}>();
const emits = defineEmits<{
    (e: "editing", id: string): void;
    (e: "deleting", id: string, label: string): void;
}>();
</script>
