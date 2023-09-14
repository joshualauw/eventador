<template>
    <div>
        <div class="flex-between mb-8">
            <h2 class="font-bold text-lg md:text-xl">
                Your Events <span v-if="!loggedUser?.is_premium">({{ events?.data.events_count }}/{{ 3 }})</span>
            </h2>
            <div class="flex-center space-x-2 md:space-x-4">
                <select v-model="filter" class="select select-sm md:select-md w-28 md:w-36">
                    <option value="all">All</option>
                    <option value="owned">Owned</option>
                    <option value="organized">Organized</option>
                    <option value="attended">Attended</option>
                </select>
                <label for="create-event-modal" class="btn btn-sm md:btn-md btn-primary">
                    + <span class="hidden md:block ml-1.5">Create Event</span>
                </label>
            </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <ManageItem
                v-for="managed in events?.data.userEvents"
                :id="managed._id"
                :name="managed.name"
                :banner="managed.banner"
                :publicity="managed.publicity"
                :start_date="managed.start_date"
                :type="managed.type"
            />
        </div>
        <p v-if="events && events.data.userEvents.length == 0" class="text-content2">-no events-</p>
        <ModalEventCreate />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
    middleware: "auth",
});

const filter = ref("all");
const { loggedUser } = useAuthStore();
const { getUserEvents } = useEventStore();
const { data: events } = await useAsyncData("getUserEvents", () => getUserEvents({ filter: filter.value }), {
    watch: [filter],
});

console.log(events.value?.data);
</script>
