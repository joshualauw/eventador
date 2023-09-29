<template>
    <div class="flex relative w-full">
        <div class="w-full lg:w-2/3 lg:mr-16">
            <div class="flex-between">
                <div class="flex-center space-x-4">
                    <h2 class="md:text-xl text-lg font-semibold">All Posts</h2>
                    <label
                        v-if="loggedUser"
                        @click="handleCreating"
                        for="edit-post-modal"
                        class="btn btn-sm md:btn-md btn-primary"
                    >
                        <span class="hidden sm:inline mr-2">Create</span>
                        <Icon name="material-symbols:add" class="w-5 h-5" />
                    </label>
                </div>
                <select v-model="sortBy" class="select select-sm md:select-md w-36">
                    <option value="latest">Latest</option>
                    <option value="most-liked">Most Liked</option>
                </select>
            </div>
            <div class="mt-8 space-y-5">
                <div v-for="post in posts?.data">
                    <PostItem
                        @liked="refresh"
                        @commenting="openComments"
                        :id="post._id"
                        :content="post.content"
                        :image="post.image"
                        :tags="post.tags"
                        :author="{ id: post.user_id._id, name: post.user_id.username, avatar: post.user_id.profile }"
                        :likes="post.likes.length"
                        :comments="post.comments.length"
                        :created-at="post.createdAt"
                        :is_liked="post.is_liked"
                        :link="post.link"
                        hide-edit
                        class="py-4 border-b-2 border-gray-6"
                    />
                </div>
                <p v-if="posts?.data.length == 0" class="text-content2 text-lg text-center">-no posts-</p>
            </div>
            <ModalPostComment :comments="comments" />
            <ModalPostEdit @saved="refresh" :context="actionContext" :update-id="actionId" />
        </div>
        <PostTag class="w-1/3 hidden lg:block sticky h-[350px] top-10" />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});

const sortBy = ref("latest");
const comments = ref<DetailComment[]>([]);

const { loggedUser } = useAuthStore();
const { getAllPosts } = usePostStore();
const { handleCreating, actionContext, actionId } = useCrudManager();

const { data: posts, refresh } = await useAsyncData("getAllPosts", () => getAllPosts({ sortBy: sortBy.value }), {
    watch: [sortBy],
});

function openComments(id: string) {
    comments.value = [];
    const post = posts.value?.data.find((p) => p._id == id);
    if (post) comments.value = post.comments;
}
</script>
