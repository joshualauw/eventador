<template>
    <UIModal v-slot="{ setOpen }" modal-id="report-event-modal">
        <div class="flex flex-col gap-2">
            <div class="flex-box rounded-full w-14 h-14 p-4 btn btn-solid-error btn-no-animation self-center mb-2">
                <Icon name="fa:exclamation-triangle" class="w-7 h-7" />
            </div>
            <h2 class="text-center text-lg font-semibold text-content1">Report Event</h2>
            <p class="mx-auto max-w-xs text-sm text-content2">
                Do you want to report <span class="font-bold">{{ label }}</span>
                ?
            </p>
            <div class="form-field">
                <label class="form-label">Reason</label>
                <textarea
                    v-model="reason"
                    class="textarea max-w-full h-28 resize-none"
                    placeholder="report reason.."
                ></textarea>
            </div>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-4" />
            <button @click="doReportEvent(setOpen)" class="btn btn-error mt-4" :class="{ 'btn-loading': pending }">
                Submit Report
            </button>
        </div>
    </UIModal>
</template>

<script setup lang="ts">
const props = defineProps<{ id: string; label: string }>();

const { reportEvent } = useEventStore();
const { mutate, pending, error, errors } = useMutate(reportEvent);
const reason = ref("");

async function doReportEvent(setOpen: (state: boolean) => void) {
    const res = await mutate(props.id, { content: reason.value });
    if (res.status) {
        reason.value = "";
        setOpen(false);
    }
}
</script>
