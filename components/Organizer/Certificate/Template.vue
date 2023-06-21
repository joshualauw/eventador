<template>
    <input type="checkbox" id="certificate-template" class="drawer-toggle" />
    <label class="overlay" for="certificate-template"></label>
    <div class="drawer">
        <div class="drawer-content pt-10 flex flex-col">
            <label for="certificate-template" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            <div class="p-2 space-y-8">
                <h2 class="text-xl font-semibold">Base Template</h2>
                <div
                    v-for="img in baseTemplate"
                    class="w-full relative h-36 rounded-lg border-2 p-1 group hover:brightness-[.80] flex-box"
                >
                    <img :src="img" class="w-full h-full absolute top-0 left-0" />
                    <button
                        @click="emits('applied', img)"
                        class="hidden group-hover:block btn btn-sm btn-solid-secondary"
                    >
                        Apply
                    </button>
                </div>
                <div class="h-full flex flex-row justify-end gap-2">
                    <button class="btn btn-ghost">Cancel</button>
                    <button class="btn btn-primary"><Icon name="fa:upload" class="mr-2" /> Custom Template</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{ (e: "applied", img: string): void }>();

const baseTemplate = [
    "/images/certificate/blue.jpg",
    "/images/certificate/white.jpg",
    "/images/certificate/yellow.jpg",
];
</script>
