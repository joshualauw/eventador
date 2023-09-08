<template>
    <div>
        <UILoader v-if="pending" />
        <div class="flex flex-col lg:flex-row flex-between mb-8 gap-3">
            <div @click="$router.go(-1)" class="btn btn-ghost w-fit">
                <Icon name="material-symbols:arrow-back" class="w-5 h-5 mr-1" /> Back
            </div>
            <p class="text-lg font-semibold">{{ name }}</p>
            <span class="flex flex-center">
                Fields<input v-model="isResponse" type="checkbox" class="switch mx-2" />Responses
            </span>
        </div>
        <div v-if="!isResponse">
            <p v-if="fields.length == 0" class="text-center font-semibold text-lg text-content2 mt-8">-no fields-</p>
            <UIDraggable @dragged="handleReordered" :items="fields" v-slot="{ item: field }">
                <OrganizerFormField
                    :key="field.key"
                    :id="field.key"
                    :name="field.name"
                    :type="field.type"
                    :options="field.options"
                    @updated="handleUpdating"
                    @deleting="handleDeleting"
                    class="mb-8 md:mb-12"
                />
            </UIDraggable>
        </div>
        <div v-else>
            <p v-if="_fields?.data.responses.length == 0" class="text-center font-semibold text-lg text-content2 mt-8">
                -no responses-
            </p>
            <OrganizerFormResponse
                v-for="response in _fields?.data.responses"
                :email="response.email"
                :answers="response.answers"
                class="mb-12"
            />
        </div>
        <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-6" />
        <button
            v-if="!isResponse"
            @click="doSaveForm"
            class="btn btn-success btn-circle w-12 h-12 lg:w-14 lg:h-14 fixed bottom-5 right-5"
        >
            <Icon name="material-symbols:save" class="w-5 h-5 lg:w-7 lg:h-7" />
        </button>
        <button
            v-if="!isResponse"
            @click="addField"
            class="btn btn-primary btn-circle w-12 h-12 lg:w-14 lg:h-14 fixed bottom-[85px] right-5"
        >
            <Icon name="material-symbols:add" class="w-5 h-5 lg:w-7 lg:h-7" />
        </button>
        <OrganizerModalFormDeleteField @deleted="deleteField" :id="actionId" :label="actionLabel" />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "participant"],
});

const isResponse = ref(false);
const route = useRoute();
const { handleDeleting, actionId, actionLabel } = useCrudManager();
const { getOneForm, saveForm } = useFormStore();
const { mutate, pending, error, errors } = useMutate(saveForm);

const name = ref("");
const fields = ref<IFormFieldExtra[]>([]);

const { data: _fields } = await useAsyncData("getOneForm", () => getOneForm(route.params.fid as string));
if (_fields.value) {
    fields.value = [..._fields.value.data.fields.map((field) => ({ ...field, key: genId(4) }))];
    name.value = _fields.value.data.name;
}

function handleReordered(ordered: IFormFieldExtra[]) {
    fields.value = [];
    fields.value.push(...ordered);
}

function addField() {
    fields.value.push({
        key: genId(),
        name: "Field " + (fields.value.length + 1),
        type: "text",
        options: [],
    });
}

function deleteField() {
    const fieldIdx = fields.value.findIndex((f) => f.key == actionId.value);
    if (fieldIdx != -1) {
        fields.value.splice(fieldIdx, 1);
        console.log(fields.value);
    }
}

function handleUpdating(id: string, val: IFormField) {
    const formField = fields.value.find((f) => f.key == id);
    if (formField) {
        formField.name = val.name;
        formField.type = val.type;
        formField.options = [...val.options];
    }
}

async function doSaveForm() {
    await mutate(route.params.fid as string, { fields: fields.value.map((f) => exclude(f, ["key"])) });
}
</script>
