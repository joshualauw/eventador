<template>
    <div class="flex relative w-full">
        <div class="w-full lg:w-2/3 lg:mr-16">
            <div class="flex-center mb-8">
                <h2 class="text-xl font-semibold">All Posts With</h2>
                <span class="badge badge-md lg:badge-lg badge-flat-secondary inline-flex w-fit ml-2">
                    #{{ route.params.tag }}
                </span>
            </div>
            <div class="w-full space-y-4">
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
                        hide-edit
                        class="py-4 border-b-2 border-gray-6"
                    />
                </div>
            </div>
        </div>
        <PostTag class="w-1/3 hidden lg:block sticky h-[350px] top-10" />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});

const route = useRoute();
const { getAllPosts } = usePostStore();
const { data: posts, refresh } = await useAsyncData("getAllPosts", () =>
    getAllPosts({ tag: route.params.tag as string })
);

const comments = ref<DetailComment[]>([]);

function openComments(id: string) {
    comments.value = [];
    const post = posts.value?.data.find((p) => p._id == id);
    if (post) comments.value = post.comments;
}
</script>
