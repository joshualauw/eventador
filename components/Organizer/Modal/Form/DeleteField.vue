<template>
    <UIModal v-slot="{ setOpen }" modal-id="delete-field-modal">
        <div class="flex flex-col text-center gap-2">
            <div class="flex-box rounded-full w-14 h-14 p-4 btn btn-solid-error btn-no-animation self-center mb-4">
                <Icon name="fa:trash" class="w-7 h-7" />
            </div>
            <h2 class="text-center text-lg font-semibold text-content1">Confirm Delete</h2>
            <p class="mx-auto max-w-xs text-sm text-content2">
                Are you sure you want to delete <span class="font-bold">{{ label }}?</span> this action cannot be undone
            </p>
            <button @click="handleDeleted(setOpen)" class="btn btn-error mt-4">Yes, Delete</button>
        </div>
    </UIModal>
</template>

<script setup lang="ts">
defineProps<{ id: string; label: string }>();
const emits = defineEmits<{ (e: "deleted"): void }>();

function handleDeleted(setOpen: (val: boolean) => void) {
    setOpen(false);
    emits("deleted");
}
</script>
