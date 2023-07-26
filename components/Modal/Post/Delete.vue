<template>
    <UIModal v-slot="{ setOpen }" modal-id="delete-post-modal">
        <div class="flex flex-col text-center gap-2">
            <div class="flex-box rounded-full w-14 h-14 p-4 btn btn-solid-error btn-no-animation self-center mb-4">
                <Icon name="fa:trash" class="w-7 h-7" />
            </div>
            <h2 class="text-center text-lg font-semibold text-content1">Confirm Delete</h2>
            <p class="mx-auto max-w-xs text-sm text-content2">
                Are you sure you want to delete <span class="font-bold">{{ label }}?</span> this action cannot be undone
            </p>
            <button @click="doDeletePost(setOpen)" class="btn btn-error mt-4" :class="{ 'btn-loading': pending }">
                Yes, Delete
            </button>
        </div>
    </UIModal>
</template>

<script setup lang="ts">
const props = defineProps<{ id: string; label: string }>();

const { deletePost } = usePostStore();
const { mutate, pending } = useMutate(deletePost);

async function doDeletePost(setOpen: (state: boolean) => void) {
    const res = await mutate(props.id);
    if (res.status) {
        setOpen(false);
        navigateTo("/");
    }
}
</script>
