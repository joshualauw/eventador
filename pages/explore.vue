<template>
    <div class="w-full">
        <div class="flex-between mb-8">
            <h2 class="font-bold text-xl">Explore Events</h2>
            <div class="flex-center space-x-5">
                <span>
                    <input
                        @change="() => refresh()"
                        v-model="query.wishlist"
                        type="checkbox"
                        class="checkbox-primary checkbox-solid checkbox mr-1"
                    />
                    Wishlist
                </span>
                <ExploreFilter @filtered="refresh" />
            </div>
        </div>
        <p v-if="pending" class="text-center font-semibold mt-8 text-xl">Loading...</p>
        <div
            v-if="events && !pending"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
            <ExploreItem
                v-for="event in events.data"
                :key="event._id"
                :id="event._id"
                :name="event.name"
                :price="event.price"
                :category="event.category"
                :slot="event.capacity"
                :location_name="event.location.venue"
                :banner="event.banner"
                :date="event.start_date"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});

const { getExploreEvents, exploreEventQuery: query } = useEventStore();

const { data: events, refresh, pending } = await useAsyncData("getExploreEvent", () => getExploreEvents(query.value));
</script>
