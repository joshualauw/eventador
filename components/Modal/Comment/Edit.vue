<template>
    <UIModal v-slot="{ setOpen }" classes="max-w-[600px]" modal-id="edit-comment-modal">
        <div class="flex flex-col gap-2">
            <h2 class="text-center text-2xl font-semibold text-content1">Edit Comment</h2>
        </div>
        <div class="form-group space-y-4">
            <div class="form-field">
                <label class="form-label">Comment</label>
                <div class="form-control flex-col">
                    <textarea v-model="content" placeholder="comment.." class="textarea h-20 resize-none"></textarea>
                </div>
            </div>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-6" />
            <div class="form-field pt-5">
                <div class="form-control justify-between">
                    <button
                        @click="saveComment(setOpen)"
                        type="button"
                        class="btn btn-primary btn-rounded w-full"
                        :class="{ 'btn-loading': pending }"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </UIModal>
</template>

<script setup lang="ts">
const props = defineProps<{ updateId: string }>();
const emits = defineEmits<{ (e: "saved"): void }>();

const route = useRoute();
const content = ref("");

const { updateComment, getOneComment } = usePostStore();
const { mutate, error, errors, pending } = useMutate(updateComment);

watch(
    () => props.updateId,
    async (val) => {
        error.value = null;
        errors.value = [];

        const res = await getOneComment(route.params.id as string, val);
        if (res) content.value = res.data.content;
    }
);

async function saveComment(setOpen: (state: boolean) => void) {
    const res = await mutate(route.params.id as string, props.updateId, { content: content.value });
    if (res.status) {
        emits("saved");
        setOpen(false);
    }
}
</script>
