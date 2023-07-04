<template>
    <div>
        <div class="flex-between mb-8">
            <h2 class="font-bold text-xl">Find Users</h2>
            <div class="flex-center space-x-5">
                <input type="text" class="input input-sm lg:input-md w-40" placeholder="Username.." />
                <span> <input type="checkbox" class="checkbox-primary checkbox-solid checkbox mr-1" /> Followed</span>
            </div>
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
