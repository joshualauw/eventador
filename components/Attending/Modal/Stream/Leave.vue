<template>
    <UIModal v-slot="{ setOpen }" modal-id="leave-stream-modal">
        <div class="flex flex-col text-center gap-2">
            <div class="flex-box rounded-full w-14 h-14 p-4 btn btn-solid-error btn-no-animation self-center mb-4">
                <Icon name="material-symbols:call-end" class="w-7 h-7" />
            </div>
            <h2 class="text-center text-lg font-semibold text-content1">Confirm Leave</h2>
            <p class="mx-auto max-w-xs text-sm text-content2">{{ host_label || "Leave stream now?" }}</p>
            <button @click="doLeaveStream(setOpen)" class="btn btn-error mt-4">Yes, Leave</button>
        </div>
    </UIModal>
</template>

<script setup lang="ts">
const props = defineProps<{ host_label?: string }>();
const emits = defineEmits<{ (e: "leave"): void }>();

function doLeaveStream(setOpen: (state: boolean) => void) {
    emits("leave");
    setOpen(false);
}
</script>
