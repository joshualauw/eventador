<template>
    <UIModal v-slot="{ setOpen }" classes="max-w-[700px]" modal-id="edit-overview-modal">
        <h2 class="text-center text-xl font-semibold text-content1">Edit Overview</h2>
        <form class="space-y-2 mt-4">
            <div class="form-group">
                <label class="form-label">Overview Description</label>
                <textarea
                    @keypress.enter.prevent="triggger"
                    v-model="content"
                    class="textarea w-full h-[300px] p-4"
                    placeholder="description.."
                ></textarea>
            </div>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-6" />
            <div class="form-group pt-6">
                <button
                    @click="doUpdateOverview(setOpen)"
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
const props = defineProps<{ content?: string }>();
const emits = defineEmits<{ (e: "saved"): void }>();

const route = useRoute();
const { updateEventOverview } = useEventStore();
const { mutate, pending, error, errors } = useMutate(updateEventOverview);

const content = ref(props.content?.replaceAll("<br/>", "\n") || "");

function triggger() {
    content.value += "\n";
}

const formattedText = computed(() => content.value.replace(/\n/g, "<br/>"));

async function doUpdateOverview(setOpen: (state: boolean) => void) {
    const res = await mutate(route.params.id as string, { content: formattedText.value });
    if (res.status) {
        emits("saved");
        setOpen(false);
    }
}
</script>
