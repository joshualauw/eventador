<template>
    <UILoader v-if="pending" />
    <div class="w-full flex space-x-12 mb-12">
        <div class="w-full">
            <PostItem
                v-if="post"
                @liked="refresh"
                @editing="handleUpdating"
                @deleting="handleDeleting"
                :id="post.data._id"
                :content="post.data.content"
                :image="post.data.image"
                :tags="post.data.tags"
                :author="{
                    id: post.data.user_id._id,
                    name: post.data.user_id.username,
                    avatar: post.data.user_id.profile,
                }"
                :likes="post.data.likes.length"
                :comments="post.data.comments.length"
                :created-at="post.data.createdAt"
                :is_liked="post.data.is_liked"
                class="py-4 border-b-2 border-gray-6"
            />
            <div class="w-full md:w-[calc(100%-3rem)] md:ml-[2rem] mt-8">
                <div v-if="loggedUser" class="relative">
                    <textarea
                        v-model="newComment"
                        class="input max-w-full textarea resize-none h-24"
                        placeholder="Comment here..."
                    ></textarea>
                    <button
                        @click="doCreateComment"
                        :disabled="!newComment"
                        class="btn btn-solid-secondary absolute bottom-4 right-2"
                    >
                        <Icon name="carbon:send-alt-filled" />
                    </button>
                </div>
                <PostComment @changed="refresh" @liked="refresh" :comments="comments" />
            </div>
        </div>
    </div>
    <ModalPostEdit @saved="refresh" :context="actionContext" :update-id="actionId" />
    <ModalPostDelete :label="actionLabel" :id="actionId" />
    <ModalReportPost :id="($route.params.id as string)" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});

const newComment = ref("");

const route = useRoute();
const { loggedUser } = useAuthStore();
const { getOnePost, createComment } = usePostStore();
const { actionId, actionContext, actionLabel, handleUpdating, handleDeleting } = useCrudManager();

const { mutate, pending } = useMutate(createComment);
const { data: post, refresh } = await useAsyncData("getOnePost", () => getOnePost(route.params.id as string));

const comments = computed(() =>
    post.value
        ? post.value.data.comments.map((c) => ({
              id: c._id,
              commenter: {
                  id: c.user_id._id,
                  name: c.user_id.username,
                  avatar: c.user_id.profile,
              },
              content: c.content,
              createdAt: c.createdAt,
              likes: c.likes.length,
              is_liked: c.is_liked,
          }))
        : []
);

async function doCreateComment() {
    const res = await mutate(route.params.id as string, { content: newComment.value });
    if (res.data) {
        newComment.value = "";
        refresh();
    }
}
</script>
