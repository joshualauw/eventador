<template>
    <div class="flex space-x-3">
        <div @click="navigateTo(`/profile/${author.id}`)" class="cursor-pointer">
            <div class="avatar avatar-lg hidden md:block">
                <img :src="author.avatar ?? '/images/default-user.png'" alt="avatar" />
            </div>
        </div>
        <div>
            <div class="flex-between w-full">
                <div @click="navigateTo(`/profile/${author.id}`)" class="font-bold hover:underline cursor-pointer">
                    <div class="md:hidden avatar avatar-sm mr-2">
                        <img :src="author.avatar ?? '/images/default-user.png'" alt="avatar" />
                    </div>
                    {{ author.name }} -<span class="text-gray-400 font-medium ml-2">{{ createdAt }}</span>
                </div>
                <div class="dropdown">
                    <label class="btn btn-circle btn-ghost"><Icon name="mdi:dots-horizontal" tabindex="0" /></label>
                    <div class="dropdown-menu mt-1 w-20 border dropdown-menu-bottom-left">
                        <a class="dropdown-item text-sm">Report</a>
                    </div>
                </div>
            </div>
            <p>{{ title }}</p>
            <div @click="navigateTo(`/post/${id}`)" class="my-4 space-y-3 cursor-pointer">
                <img src="/images/default-post.png" class="rounded-xl" />
                <p>{{ content }}</p>
            </div>
            <div v-if="showTags">
                <span
                    v-for="tag in tags"
                    class="badge badge-md lg:badge-lg badge-flat-secondary cursor-pointer inline-flex w-fit m-1.5"
                >
                    #{{ tag }}
                </span>
            </div>
            <div class="mt-5 flex w-full justify-end">
                <button class="btn btn-ghost text-red-400 text-base">
                    <Icon name="fa:heart" class="mr-2" /> {{ likes }}
                </button>
                <label
                    @click="emits('commenting', id)"
                    for="post-comments-modal"
                    class="btn btn-ghost text-green-400 text-base"
                >
                    <Icon name="fa:comment" class="mr-2" /> {{ comments }}
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    id: string;
    author: {
        id: string;
        name: string;
        avatar: string | null;
    };
    likes: number;
    comments: number;
    title: string;
    content: string;
    imageUrl: string | null;
    createdAt: string;
    tags: string[];
    showTags?: boolean;
}>();
const emits = defineEmits<{ (e: "commenting", id: string): void }>();
</script>
