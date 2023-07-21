<template>
    <UIModal v-slot="{ setOpen }" modal-id="edit-discussion-modal">
        <h2 class="text-center text-xl font-semibold text-content1">Edit Budget</h2>
        <form class="space-y-2 mt-4">
            <textarea
                v-model="discusssionState.content"
                class="textarea h-28 resize-none"
                placeholder="what do you want to write?"
            ></textarea>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-6" />
            <div class="form-group pt-6">
                <button
                    @click="saveDiscussion(setOpen)"
                    type="button"
                    class="btn btn-primary w-full"
                    :class="{ 'btn-loading': pending }"
                >
                    Save
                </button>
            </div>
        </form>
    </UIModal>
</template>

<script setup lang="ts">
const props = defineProps<{ updateId: string }>();
const emits = defineEmits<{ (e: "saved"): void }>();

const route = useRoute();
const { loggedParticipant } = useParticipantStore();
const { updateDiscussion, getOneDiscussion } = useDiscussionStore();
const { mutate, error, errors, pending } = useMutate(updateDiscussion);

const discusssionState = reactive({
    content: "",
    is_announcement: false,
});

watch(
    () => props.updateId,
    async (val) => {
        error.value = null;
        errors.value = [];
        const res = await getOneDiscussion(route.params.id as string, val);
        if (res && res.data) {
            discusssionState.content = res.data.content;
            discusssionState.is_announcement = res.data.is_announcement;
        }
    }
);

async function saveDiscussion(setOpen: (open: boolean) => void) {
    const res = await mutate(route.params.id as string, props.updateId, { ...discusssionState });
    if (res.status) {
        emits("saved");
        setOpen(false);
    }
}
</script>
