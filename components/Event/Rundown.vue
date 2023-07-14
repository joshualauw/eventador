<template>
    <div class="card hover:scale-100 h-fit w-full">
        <div class="card-body p-4 h-full">
            <div v-for="ite in itinenaries" class="p-2 h-fit bg-backgroundSecondary">
                <p class="font-bold mb-4">{{ dayjs(ite.day).format("DD MMM YYYY") }}</p>
                <div v-for="schedule in ite.schedules" class="py-1 px-4 mb-2 rounded-lg bg-backgroundPrimary">
                    <p class="font-semibold">{{ schedule.name }}</p>
                    <p class="text-mute">{{ schedule.start_time }} - {{ schedule.end_time }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

defineProps<{ itinenaries: IItinenary[] }>();
</script>
