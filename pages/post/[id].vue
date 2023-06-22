<template>
    <div class="w-full flex space-x-12 mb-12">
        <div class="w-full lg:w-2/3">
            <PostItem
                :id="post.id"
                :title="post.title"
                :content="post.content"
                :image-url="post.imageUrl"
                :tags="post.tags"
                :author="post.author"
                :likes="post.likes"
                :comments="post.comments"
                :created-at="post.createdAt"
                show-tags
                class="py-4 border-b-2 border-gray-6"
            />
            <div class="divider"></div>
            <div class="w-full md:w-[calc(100%-3rem)] md:ml-[2rem] mt-8">
                <div class="relative">
                    <textarea
                        class="input max-w-full textarea resize-none h-24"
                        placeholder="Comment here..."
                    ></textarea>
                    <button class="btn btn-solid-secondary absolute bottom-4 right-2">
                        <Icon name="carbon:send-alt-filled" />
                    </button>
                </div>
                <PostComment :post-id="post.id" />
            </div>
        </div>
        <PostTag class="w-1/3 hidden lg:block" />
    </div>
</template>

<script setup lang="ts">
import posts from "@/assets/json/posts.json";
const post = posts[0];

definePageMeta({
    layout: "home",
});
</script>
