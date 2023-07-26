<template>
    <UIModal modal-id="post-comments-modal">
        <PostComment hide_edit :comments="_comments" />
    </UIModal>
</template>

<script setup lang="ts">
const props = defineProps<{ comments: DetailComment[] }>();

const _comments = computed(() =>
    props.comments.map((c) => ({
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
);
</script>
