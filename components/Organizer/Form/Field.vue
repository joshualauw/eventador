<template>
    <div class="card max-h-fit w-full lg:w-3/4 mx-auto hover:scale-100">
        <div class="card-body items-center flex-row p-6 relative">
            <div class="cursor-pointer">
                <Icon name="akar-icons:drag-horizontal-fill" class="w-4 h-4 mr-2" />
            </div>
            <div class="w-full space-y-2">
                <div class="form-group">
                    <label class="form-label">Field Name</label>
                    <input v-model="name" @input="emitUpdate" class="input max-w-full" placeholder="field name.." />
                </div>
                <div class="form-group">
                    <label class="form-label">Field Type</label>
                    <select v-model="type" @change="emitUpdate" class="select">
                        <option value="text">Text</option>
                        <option value="textarea">Text Area</option>
                        <option value="radio">Radio Button</option>
                        <option value="checkbox">Checkbox</option>
                    </select>
                </div>
                <template v-if="isOptionsField">
                    <label class="form-label">Options:</label>
                    <ul>
                        <li v-for="(option, i) in options" :key="i" class="space-x-2 flex-center mb-2">
                            <input
                                v-model="option.name"
                                @input="emitUpdate"
                                class="input"
                                placeholder="option name.."
                            />
                            <button type="button" @click="deleteOption(i)" class="btn btn-sm btn-error">
                                <Icon name="fa:trash" />
                            </button>
                        </li>
                    </ul>
                    <button @click="addOption" class="btn btn-solid-secondary btn-sm w-fit">+ Add Option</button>
                </template>
                <label
                    @click="emits('deleting', id, name)"
                    for="delete-field-modal"
                    class="btn btn-circle btn-ghost text-error absolute top-0 right-2"
                >
                    <Icon name="fa:trash" />
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ id: string; name?: string; type?: string; options?: string[] }>();
const emits = defineEmits<{
    (e: "updated", id: string, item: IFormField): void;
    (e: "deleting", id: string, label: string): void;
}>();

const name = ref(props.name || "");
const type = ref(props.type || "text");
const options = ref<{ name: string }[]>(props.options?.map((o) => ({ name: o })) || []);
const isOptionsField = ref(["radio", "checkbox"].includes(props.type ?? "text") || false);

watch(type, (newType) => {
    isOptionsField.value = ["radio", "checkbox"].includes(newType);
});

function emitUpdate() {
    const item = {
        name: name.value,
        type: type.value,
        options: options.value.map((opt) => opt.name),
    };
    emits("updated", props.id, item);
}

function deleteOption(index: number) {
    options.value.splice(index, 1);
    emitUpdate();
}

function addOption() {
    options.value.push({ name: "" });
    emitUpdate();
}
</script>
