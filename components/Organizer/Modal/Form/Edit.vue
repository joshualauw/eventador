<template>
    <UIModal v-slot="{ setOpen }" modal-id="edit-form-modal">
        <h2 class="text-center text-xl font-semibold text-content1">
            {{ context == "create" ? "Create" : "Edit" }} Form
        </h2>
        <form class="space-y-2 mt-4">
            <div class="form-group">
                <label class="form-label">Form Name</label>
                <input v-model="formState.name" type="text" placeholder="form name.." class="input max-w-full" />
            </div>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-6" />
            <div class="form-group pt-6">
                <button
                    @click="saveForm(setOpen)"
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
const props = defineProps<{ context: "update" | "create"; updateId: string }>();
const emits = defineEmits<{ (e: "saved"): void }>();

const { eventDashboardId } = useEventStore();
const { getOneForm, createForm, updateForm } = useFormStore();
const { value: formState, reset } = useStateHandler({
    name: "",
});
const { mutate: createMutate, error, errors, pending } = useMutate(createForm);
const { mutate: updateMutate } = useMutate(updateForm);

watch(
    () => props.updateId,
    async (val) => {
        error.value = null;
        errors.value = [];

        if (props.context == "update") {
            const res = await getOneForm(val);
            if (res && res.data) {
                formState.name = res.data.name;
            }
        } else {
            reset();
        }
    }
);

async function saveForm(setOpen: (open: boolean) => void) {
    if (props.context == "create") {
        const res = await createMutate(eventDashboardId.value, formState);
        if (res.status) {
            emits("saved");
            reset();
            setOpen(false);
        }
    }
    if (props.context == "update") {
        pending.value = true;
        const res = await updateMutate(props.updateId, formState);
        pending.value = false;
        if (res.status) {
            emits("saved");
            setOpen(false);
        } else {
            error.value = res.error;
            errors.value = [];
            errors.value.push(...res.errors);
        }
    }
}
</script>
