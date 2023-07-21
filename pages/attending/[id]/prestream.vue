<template>
    <div class="flex-box flex-col h-[500px] space-y-4 bg-backgroundSecondary shadow-md">
        <h2 class="text-center text-xl font-semibold text-content1">Join Stream?</h2>
        <div class="avatar-group">
            <div v-for="i in 4" class="avatar">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" />
            </div>
            <div class="avatar">
                <div>+12</div>
            </div>
        </div>
        <p class="text-content2 text-center">16 people have joined</p>
        <button @click="navigateTo('/attending/123/stream')" class="btn btn-primary w-fit">Join Now</button>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "attending",
    middleware: ["auth", "participant"],
});
</script>
