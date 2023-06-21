<template>
    <div class="flex flex-col lg:flex-row flex-between mb-8 gap-3">
        <div @click="$router.go(-1)" class="btn btn-ghost w-fit">
            <Icon name="material-symbols:arrow-back" class="w-5 h-5 mr-1" /> Back
        </div>
        <p class="text-lg font-semibold">Registration Form</p>
        <span class="flex flex-center"
            >Fields<input v-model="isResponse" type="checkbox" class="switch mx-2" />Responses</span
        >
    </div>
    <div v-if="!isResponse">
        <OrganizerFormField
            v-for="(field, i) in fields"
            :key="field.id"
            :id="field.id"
            :name="field.name"
            :type="field.type"
            :options="field.options"
            @deleting="handleDeleting"
            class="mb-12"
        />
    </div>
    <button class="btn btn-success btn-circle w-12 h-12 lg:w-14 lg:h-14 fixed bottom-5 right-0">
        <Icon name="material-symbols:save" class="w-5 h-5 lg:w-7 lg:h-7" />
    </button>
    <button @click="addField" class="btn btn-primary btn-circle w-12 h-12 lg:w-14 lg:h-14 fixed bottom-[85px] right-0">
        <Icon name="material-symbols:add" class="w-5 h-5 lg:w-7 lg:h-7" />
    </button>
    <OrganizerModalFormDeleteField @deleted="deleteField" :id="actionId" :label="actionLabel" />
</template>

<script setup lang="ts">
import _fields from "@/assets/json/form-fields.json";

const fields = toRef(_fields.map((f) => ({ ...f, id: genId() })));

definePageMeta({
    layout: "dashboard",
});

const isResponse = ref(false);
const { handleDeleting, actionId, actionLabel } = useCrudManager();

function addField() {
    fields.value.push({
        id: genId(),
        name: "Field " + (fields.value.length + 1),
        type: "text",
        options: [],
    });
}

function deleteField() {
    const fieldIdx = fields.value.findIndex((f) => f.id == actionId.value);
    if (fieldIdx != -1) {
        fields.value.splice(fieldIdx, 1);
        console.log(fields.value);
    }
}
</script>
