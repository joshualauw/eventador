<template>
    <div class="flex-shrink-0 p-4 h-fit rounded-sm bg-backgroundSecondary shadow-md">
        <p class="font-bold mb-4">{{ dayjs(day).format("DD MMM YYYY") }}</p>
        <div v-for="schedule in schedules" class="py-1.5 px-6 mb-2 rounded-lg bg-backgroundPrimary">
            <p class="font-semibold">{{ schedule.name }}</p>
            <p class="text-mute">{{ schedule.start_time }} - {{ schedule.end_time }}</p>
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
                @click="emits('deleting', id, dayjs(day).format('DD MMM YYYY'))"
                class="btn btn-xs btn-rounded btn-solid-error"
                >Delete</label
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{
    id: string;
    day: string;
    schedules: ISchedule[];
}>();
const emits = defineEmits<{
    (e: "editing", id: string): void;
    (e: "deleting", id: string, label: string): void;
}>();
</script>
