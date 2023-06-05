<template>
    <div class="flex relative w-full">
        <PostFeed class="w-2/3 mr-16" />
        <PostTag class="w-1/3" />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});
</script>
