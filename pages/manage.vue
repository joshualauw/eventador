<template>
    <div class="flex-between mb-8">
        <h2 class="font-bold text-xl">
            Managed Events <span v-if="!loggedUser?.is_premium">({{ events?.data.events_count }}/{{ 3 }})</span>
        </h2>
        <label for="create-event-modal" class="btn btn-primary">+ Create Event</label>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <ManageItem
            v-for="managed in events?.data.managed"
            :id="managed._id"
            :name="managed.name"
            :publicity="managed.publicity"
            :total_participants="managed.total_participants"
            :capacity="managed.capacity"
            :is_organizer="managed.is_organizer"
            context="managed"
        />
    </div>
    <p v-if="events && events.data.managed.length == 0" class="text-content2">-no managed events-</p>
    <div class="flex-between my-8">
        <h2 class="font-bold text-xl">Attended Events</h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <ManageItem
            v-for="attended in events?.data.attended"
            :id="attended._id"
            :name="attended.name"
            :publicity="attended.publicity"
            :total_participants="attended.total_participants"
            :capacity="attended.capacity"
            context="attended"
        />
    </div>
    <p v-if="events && events.data.attended.length == 0" class="text-content2">-no attended events-</p>
    <ModalEventCreate />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
    middleware: "auth",
});

const { loggedUser } = useAuthStore();
const { getUserEvents } = useEventStore();
const { data: events } = await useAsyncData("getUserEvents", getUserEvents);
</script>
