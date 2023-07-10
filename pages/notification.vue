<template>
    <div>
        <div class="flex-between mb-8">
            <h2 class="font-bold text-xl">All Notifications</h2>
            <label for="create-event-modal" class="btn btn-primary">Read All</label>
        </div>
        <div class="space-y-5 text-sm">
            <div v-for="i in 4" class="alert alert-info p-2 flex-between">
                <div class="flex-center space-x-3">
                    <Icon name="material-symbols:info" class="text-blue-500 w-6 h-6" />
                    <div class="flex flex-col">
                        <span class="font-semibold">Announcement</span>
                        <span class="text-content2 text-xs md:text-sm">
                            A new event has been created by Joshualauw! Join Now
                        </span>
                    </div>
                </div>
                <span class="text-content2">16/06/23 19:24</span>
                <div class="flex flex-col lg:flex-row gap-2">
                    <button class="btn btn-sm btn-solid-primary">view</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
    middleware: "auth",
});
</script>
