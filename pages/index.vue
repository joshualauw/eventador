<template>
    <div class="flex relative w-full">
        <PostFeed class="w-full lg:w-2/3 lg:mr-16" />
        <PostTag class="w-1/3 hidden lg:block" />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});
</script>
