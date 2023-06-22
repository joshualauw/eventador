<template>
    <div class="flex space-x-3 relative mb-9">
        <div @click="navigateTo(`/profile/${commenter.id}`)" class="cursor-pointer">
            <div class="avatar avatar-ring">
                <img :src="commenter.avatar ?? '/images/default-user.png'" alt="avatar" />
            </div>
        </div>
        <div class="space-y-3 w-full">
            <div class="w-full flex-between">
                <p class="font-semibold">{{ commenter.name }}</p>
                <p class="text-mute">{{ createdAt }}</p>
            </div>
            <p class="text-content2 text-sm">
                {{ content }}
            </p>
            <div class="flex-center space-x-3">
                <Icon name="prime:thumbs-up-fill" class="w-5 h-5 text-content2 mr-1 cursor-pointer" />{{ likes }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    commenter: { id: string; name: string; avatar: string | null };
    likes: number;
    content: string;
    createdAt: string;
}>();
</script>
