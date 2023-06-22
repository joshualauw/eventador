<template>
    <div class="flex">
        <div class="w-full h-full overflow-y-auto">
            <div class="bg-border shadow-md w-full h-[300px] lg:h-[500px] flex-box rounded-xl">
                <p class="text-content">Livestream haven't started yet</p>
            </div>
            <div class="mt-8 w-full flex-between">
                <div class="space-x-3">
                    <button class="btn btn-circle btn-solid-secondary w-12 h-12 p-2">
                        <Icon name="material-symbols:mic-rounded" class="w-6 h-6" />
                    </button>
                    <button class="btn btn-circle btn-solid-secondary w-12 h-12 p-2">
                        <Icon name="material-symbols:android-camera" class="w-6 h-6" />
                    </button>
                    <button @click="$router.go(-1)" class="btn btn-circle btn-solid-error w-12 h-12 p-2">
                        <Icon name="material-symbols:phone-disabled-rounded" class="w-6 h-6" />
                    </button>
                </div>
                <div>
                    <Icon name="material-symbols:person" class="w-6 h-6" />
                    <span>10 watching</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "stream",
});
</script>
