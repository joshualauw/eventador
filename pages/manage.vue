<template>
    <div class="flex-between mb-8">
        <h2 class="font-bold text-xl">Managed Events</h2>
        <label for="create-event-modal" class="btn btn-primary">+ Create Event</label>
    </div>
    <div v-if="events" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <div
            v-for="managed in events.data.managed"
            @click="navigateTo(`/dashboard/${managed._id}`)"
            class="card cursor-pointer"
        >
            <div class="card-body flex-center text-center">
                <span class="badge badge-flat-secondary">{{ managed.publicity }}</span>
                <h2 class="card-header text-lg font-bold">{{ managed.name }}</h2>
                <p class="text-content2">{{ managed.total_participants }}/{{ managed.capacity }} people attended</p>
            </div>
        </div>
    </div>
    <p v-if="events && events.data.managed.length == 0" class="text-content2">-no managed events-</p>
    <div class="flex-between my-8">
        <h2 class="font-bold text-xl">Attended Events</h2>
    </div>
    <div v-if="events" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <div
            v-for="attended in events.data.attended"
            @click="navigateTo(`/attending/${attended._id}`)"
            class="card cursor-pointer"
        >
            <div class="card-body flex-center text-center">
                <span class="badge badge-flat-success">{{ attended.publicity }}</span>
                <h2 class="card-header text-lg font-bold">{{ attended.name }}</h2>
                <p class="text-content2">{{ attended.total_participants }}/{{ attended.capacity }} Participants</p>
            </div>
        </div>
    </div>
    <p v-if="events && events.data.attended.length == 0" class="text-content2">-no attended events-</p>
    <ModalEventCreate />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
    middleware: "auth",
});

const { getUserEvents } = useEventStore();
const { data: events } = await useAsyncData("getUserEvents", getUserEvents);
console.log(events.value);
</script>
