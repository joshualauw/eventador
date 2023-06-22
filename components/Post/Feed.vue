<template>
    <div>
        <div class="flex-between">
            <div class="flex-center space-x-4">
                <h2 class="text-xl font-semibold">All Posts</h2>
                <label for="edit-post-modal" class="btn btn-sm md:btn-md btn-primary">
                    Create <Icon name="material-symbols:add" class="w-5 h-5 ml-1" />
                </label>
            </div>
            <select class="select select-sm md:select-md w-36">
                <option>Latest</option>
                <option>Trending</option>
                <option>Most Liked</option>
            </select>
        </div>
        <div class="mt-8 space-y-5">
            <div v-for="post in posts">
                <PostItem
                    @commenting="(id) => (actionId = id)"
                    :id="post.id"
                    :title="post.title"
                    :content="post.content"
                    :image-url="post.imageUrl"
                    :tags="post.tags"
                    :author="post.author"
                    :likes="post.likes"
                    :comments="post.comments"
                    :created-at="post.createdAt"
                    class="py-4 border-b-2 border-gray-6"
                />
            </div>
        </div>
        <ModalPostComment :id="actionId" />
        <ModalPostEdit />
    </div>
</template>

<script setup lang="ts">
import posts from "@/assets/json/posts.json";

const { actionId } = useCrudManager();
</script>
