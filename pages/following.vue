<template>
    <div>
        <div class="flex-between mb-8">
            <h2 class="font-bold text-xl">All Organizers</h2>
            <span> <input type="checkbox" class="checkbox-primary checkbox-solid checkbox mr-1" /> Followed</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <FollowItem v-for="i in 5" :key="i" class="hover:bg-none" />
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});
</script>
