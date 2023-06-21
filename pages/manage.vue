<template>
    <div class="flex-between mb-8">
        <h2 class="font-bold text-xl">Managed Events</h2>
        <label for="create-event-modal" class="btn btn-primary">+ Create Event</label>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <div @click="navigateTo('/dashboard/123')" v-for="i in 5" :key="i" class="card cursor-pointer">
            <div class="card-body flex-center text-center">
                <span class="badge badge-flat-secondary">public</span>
                <h2 class="card-header text-lg font-bold">Maximizing Your Productivity at Work</h2>
                <p class="text-content2">10/29 people attended</p>
                <p class="text-success">Rp. 100.000 Profited</p>
            </div>
        </div>
    </div>
    <div class="flex-between my-8">
        <h2 class="font-bold text-xl">Attended Events</h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <div @click="navigateTo('/attending/123')" v-for="i in 2" :key="i" class="card cursor-pointer">
            <div class="card-body flex-center text-center">
                <span class="badge badge-flat-success">open</span>
                <h2 class="card-header text-lg font-bold">Build A Healthy Habit & Lifestyle</h2>
                <p class="text-content2">15 Participants</p>
            </div>
        </div>
    </div>
    <ModalEventCreate />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});
</script>
