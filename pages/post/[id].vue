<template>
    <div class="w-full flex space-x-12 mb-12">
        <div class="w-full lg:w-2/3">
            <PostItem show-tags />
            <div class="divider"></div>
            <div class="w-full md:w-[calc(100%-3rem)] md:ml-[2rem] mt-8">
                <div class="relative">
                    <textarea
                        class="input max-w-full textarea resize-none h-24"
                        placeholder="Comment here..."
                    ></textarea>
                    <button class="btn btn-solid-secondary absolute bottom-4 right-2">
                        <Icon name="carbon:send-alt-filled" />
                    </button>
                </div>
                <PostComment />
            </div>
        </div>
        <PostTag class="w-1/3 hidden lg:block" />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});
</script>
