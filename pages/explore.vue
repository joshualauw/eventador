<template>
    <div class="w-full">
        <div class="flex-between mb-8">
            <h2 class="font-bold md:text-xl text-lg">Explore Events</h2>
            <div class="flex-center space-x-5">
                <div v-if="loggedUser" class="flex-center">
                    <input
                        @change="() => refresh()"
                        v-model="query.wishlist"
                        type="checkbox"
                        class="checkbox-primary checkbox-solid checkbox checkbox-sm md:checkbox-md mr-1.5"
                    />
                    <span class="text-sm md:text-base">Wishlisted</span>
                </div>
                <ExploreFilter @cleared="resetFilter" @filtered="refresh" />
            </div>
        </div>
        <p v-if="pending" class="text-center font-semibold mt-8 text-xl">Loading...</p>
        <div
            v-if="events && !pending"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
            <ExploreItem
                v-for="event in events.data"
                @wishlisted="updateWishlist"
                :key="event._id"
                :id="event._id"
                :name="event.name"
                :price="event.price"
                :category="event.category"
                :slot="event.capacity"
                :is_wishlist="event.is_wishlist"
                :location_name="event.location?.venue || '-'"
                :banner="event.banner"
                :date="event.start_date"
            />
        </div>
        <p v-if="events?.data.length == 0" class="text-content2 text-lg text-center">-no events-</p>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});

const { loggedUser } = useAuthStore();
const { getExploreEvents, exploreEventQuery: query } = useEventStore();
const { data: events, refresh, pending } = await useAsyncData("getExploreEvent", () => getExploreEvents(query.value));

function updateWishlist(id: string) {
    if (events.value) {
        const idx = events.value.data.findIndex((ev) => ev._id == id);
        events.value.data[idx].is_wishlist = !events.value.data[idx].is_wishlist;
    }
}

function resetFilter() {
    query.value = {
        keyword: "",
        location: "",
        category: "",
        start_price: 0,
        end_price: 500000,
        start_date: null,
        end_date: null,
        wishlist: false,
    };
    refresh();
}
</script>
