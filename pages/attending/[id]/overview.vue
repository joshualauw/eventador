<template>
    <div class="flex h-full space-x-10">
        <AttendingOverviewDetail />
        <div class="card hover:scale-100 h-fit w-[40%]">
            <div class="card-body h-full">
                <h2 class="card-header">Event rundown</h2>
                <div v-for="run in rundown.slice(0, 3)" class="p-4 h-fit bg-backgroundSecondary">
                    <p class="font-bold mb-4">{{ run.day }}</p>
                    <div v-for="schedule in run.schedules" class="py-1.5 px-6 mb-2 rounded-lg bg-backgroundPrimary">
                        <p class="font-semibold">{{ schedule.name }}</p>
                        <p class="text-mute">{{ schedule.time }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AttendingModalOverviewEdit />
</template>

<script setup lang="ts">
import rundown from "@/assets/json/itinenaries.json";

definePageMeta({
    layout: "attending",
});
</script>
