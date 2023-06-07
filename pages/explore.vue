<template>
    <div class="w-full">
        <div class="flex-between mb-8">
            <h2 class="font-bold text-xl">Explore Events</h2>
            <span class="space-x-5">
                <input type="checkbox" class="checkbox-primary checkbox-solid checkbox mr-1" />
                Wishlist
                <input type="checkbox" class="checkbox-primary checkbox-solid checkbox mr-1" />
                Registered
            </span>
            <ExploreFilter />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <ExploreItem v-for="i in 8" :key="i" />
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});
</script>
