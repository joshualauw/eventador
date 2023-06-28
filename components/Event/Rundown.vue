<template>
    <div class="card hover:scale-100 h-fit w-full">
        <div class="card-body p-4 h-full">
            <div v-for="run in rundown.slice(0, 3)" class="p-2 h-fit bg-backgroundSecondary">
                <p class="font-bold mb-4">{{ run.day }}</p>
                <div v-for="schedule in run.schedules" class="py-1 px-4 mb-2 rounded-lg bg-backgroundPrimary">
                    <p class="font-semibold">{{ schedule.name }}</p>
                    <p class="text-mute">{{ schedule.time }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import rundown from "../../assets/json/itinenaries.json";
</script>
