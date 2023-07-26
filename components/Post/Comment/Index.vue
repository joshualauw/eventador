<template>
    <div>
        <div class="flex-between w-full my-8">
            <p class="font-semibold text-lg">All Comments ({{ comments.length }})</p>
            <div class="dropdown">
                <button class="btn btn-circle"><Icon name="material-symbols:sort" /></button>
                <div class="dropdown-menu mt-1 w-40 border dropdown-menu-bottom-left">
                    <a class="dropdown-item text-sm">Latest</a>
                    <a class="dropdown-item text-sm">Most Liked</a>
                </div>
            </div>
        </div>
        <p v-if="comments.length == 0">-no comments yet-</p>
        <PostCommentItem
            v-for="comment in comments"
            @liked="emits('liked')"
            @editing="handleUpdating"
            @deleting="handleDeleting"
            :id="comment.id"
            :commenter="comment.commenter"
            :content="comment.content"
            :created-at="comment.createdAt"
            :likes="comment.likes"
            :is_liked="comment.is_liked"
            :hide_edit="hide_edit"
        />
        <ModalCommentEdit @saved="emits('changed')" :update-id="actionId" />
        <ModalCommentDelete @deleted="emits('changed')" :id="actionId" :label="actionLabel" />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    comments: {
        id: string;
        commenter: {
            id: string;
            name: string;
            avatar?: string;
        };
        content: string;
        createdAt: string;
        likes: number;
        is_liked?: boolean;
    }[];
    hide_edit?: boolean;
}>();
const emits = defineEmits<{ (e: "liked"): void; (e: "changed"): void }>();

const { handleUpdating, handleDeleting, actionId, actionLabel } = useCrudManager();
</script>
