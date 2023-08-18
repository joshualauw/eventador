<template>
    <div>
        <div class="p-4 lg:p-12 w-full lg:w-3/5 mx-auto">
            <div class="w-full flex-center mb-2">
                <div @click="$router.go(-1)" class="btn btn-ghost w-fit">
                    <Icon name="material-symbols:arrow-back" class="w-5 h-5 mr-1" /> Back
                </div>
            </div>
            <p class="text-2xl font-bold text-center mb-2">{{ name }}</p>
            <p class="text-content2 text-center mb-8">{{ loggedUser?.email }}</p>
            <div>
                <p v-if="fields.length == 0" class="text-center font-semibold text-lg text-content2 mt-8">
                    -no fields-
                </p>
                <AttendingFormField
                    v-for="(field, i) in fields"
                    @updated="(val) => handleUpdating(i, val)"
                    :key="field.key"
                    :id="field.key"
                    :name="field.name"
                    :type="field.type"
                    :options="field.options"
                    class="mb-12"
                />
                <div class="w-full flex-between">
                    <p class="text-mute">*make sure your all questions is answered</p>
                    <label for="submit-response-modal" class="w-fit btn btn-success">Submit</label>
                </div>
            </div>
        </div>
        <UIModal v-slot="{ setOpen }" modal-id="submit-response-modal">
            <div class="flex flex-col text-center gap-2">
                <div
                    class="flex-box rounded-full w-14 h-14 p-4 btn btn-solid-warning btn-no-animation self-center mb-4"
                >
                    <Icon name="fa:exclamation-triangle" class="w-7 h-7" />
                </div>
                <h2 class="text-center text-lg font-semibold text-content1">Confirm Submit</h2>
                <p class="mx-auto max-w-xs text-sm text-content2">
                    Are you sure you want to submit the form now? you cannot edit it later
                </p>
                <button
                    @click="doSubmitResponse(setOpen)"
                    class="btn btn-warning mt-4"
                    :class="{ 'btn-loading': pending }"
                >
                    Yes, Submit
                </button>
            </div>
        </UIModal>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ["auth", "participant"],
});

const route = useRoute();
const { loggedUser } = useAuthStore();
const { getOneForm, submitResponse } = useFormStore();
const { mutate, pending } = useMutate(submitResponse);

const name = ref("");
const fields = ref<(IFormField & { key: string })[]>([]);
const response = ref<IFormResponse>({ email: loggedUser.value?.email || "", answers: [] as any[] });

const { data: _fields } = await useAsyncData("getOneForm", () => getOneForm(route.params.fid as string));
if (_fields.value) {
    fields.value = [..._fields.value.data.fields.map((field) => ({ ...field, key: genId(4) }))];
    name.value = _fields.value.data.name;
}

function handleUpdating(idx: number, val: any) {
    response.value.answers[idx] = val;
    console.log(response.value.answers);
}

async function doSubmitResponse(setOpen: (state: boolean) => void) {
    const res = await mutate(route.params.fid as string, {
        email: response.value.email,
        answers: response.value.answers,
    });
    if (res.status) {
        setOpen(false);
        navigateTo(`/attending/${route.params.id}/form`);
    }
}
</script>
