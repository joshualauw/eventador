<template>
    <UIModal modal-id="detail-sponsor-modal">
        <div class="mt-4 px-6 flex-box flex-col">
            <img src="/images/default-logo.png" class="w-48 h-40 rounded-lg" />
            <p class="text-lg font-semibold mt-6 mb-2">Sponsor Title</p>
            <p class="text-mute">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa libero nobis animi sequi commodi,
                recusandae sit doloribus? Ad vitae expedita soluta, pariatur, aspernatur dolor officiis distinctio
                repellendus officia quam modi?
            </p>
        </div>
    </UIModal>
</template>

<script setup lang="ts">
defineProps<{ detailId: string }>();
</script>
