<template>
    <UIModal modal-id="post-comments-modal">
        <PostComment :post-id="id" />
    </UIModal>
</template>

<script setup lang="ts">
defineProps<{ id: string }>();
</script>
