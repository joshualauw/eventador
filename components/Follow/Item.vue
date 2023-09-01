<template>
    <NuxtLink :to="`/profile/${id}`" class="card cursor-pointer">
        <div class="card-body min-h-full p-6 flex-row flex-center space-x-3 hover:bg-slate-3 relative">
            <div class="avatar avatar-lg avatar-ring">
                <img :src="profile || '/images/default-user.png'" alt="avatar" />
            </div>
            <div>
                <p class="font-semibold mb-1">{{ name }}</p>
                <p class="text-content2 text-sm">{{ followers_count }} followers</p>
                <p class="text-content2 text-sm">{{ events_count }} events created</p>
            </div>
            <button v-if="is_followed" class="rounded-full p-2 flex-center btn-solid-secondary absolute top-4 right-4">
                <Icon name="fa:check" class="w-3 h-3" />
            </button>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
    id: string;
    profile?: string;
    name: string;
    followers_count: number;
    events_count: number;
    is_followed?: boolean;
}>();
</script>
