<template>
    <div class="card hover:scale-100 rounded-md h-fit shadow-none">
        <div class="card-body bg-backgroundSecondary p-6">
            <p class="font-bold mb-2">Popular Tags</p>
            <div>
                <div
                    v-for="tag in tags?.data"
                    @click="navigateTo(`/tags/${tag.name}`)"
                    class="flex-center w-full hover:bg-border p-4 mb-2 rounded-lg cursor-pointer"
                >
                    <div class="w-full">
                        <p class="font-bold">#{{ tag.name }}</p>
                        <p class="text-sm text-content2">{{ tag.post_count }} Posts</p>
                    </div>
                    <Icon name="fa:external-link" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { getTags } = usePostStore();
const { data: tags } = await useAsyncData("getTags", () => getTags());
</script>
