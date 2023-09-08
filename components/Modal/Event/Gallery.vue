<template>
    <UIModal modal-id="modal-gallery-preview" classes="max-w-[800px]">
        <img :src="preview" class="w-full h-full" />
    </UIModal>
</template>

<script setup lang="ts">
defineProps<{ preview: string }>();
</script>
