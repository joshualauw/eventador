<template>
    <div class="card max-h-fit w-full hover:scale-100">
        <div class="card-body p-6 relative space-y-2">
            <div class="form-group">
                <label class="form-label text-content2">Question:</label>
                <p class="w-full ml-1.5 font-semibold">{{ name }}</p>
            </div>
            <div class="form-group">
                <label class="form-label text-content2">Answer:</label>
                <input
                    v-if="type == 'text'"
                    v-model="answer"
                    type="text"
                    class="input max-w-full"
                    placeholder="answer.."
                />
                <textarea
                    v-else-if="type == 'textarea'"
                    v-model="answer"
                    class="textarea max-w-full h-32"
                    placeholder="answer.."
                ></textarea>
            </div>
            <template v-if="isOptionsField">
                <div v-if="type == 'checkbox'" class="space-y-2">
                    <div v-for="option in options" class="flex space-x-2">
                        <input type="checkbox" @change="checkOption(option.name)" class="checkbox checkbox-primary" />
                        <span>{{ option.name }}</span>
                    </div>
                </div>
                <div v-if="type == 'radio'" class="space-y-2">
                    <div v-for="option in options" class="flex space-x-2">
                        <input type="radio" v-model="answer" :value="option.name" class="radio radio-primary" />
                        <span>{{ option.name }}</span>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ id: string; name?: string; type?: string; options?: string[] }>();
const emits = defineEmits<{ (e: "updated", val: any): void }>();

const name = ref(props.name || "");
const type = ref(props.type || "text");
const options = ref<{ name: string }[]>(props.options?.map((o) => ({ name: o })) || []);
const isOptionsField = ref(["radio", "checkbox"].includes(props.type ?? "text") || false);

const answer = ref();

watch(answer, (val) => emits("updated", JSON.parse(JSON.stringify(val))), { deep: true });

function checkOption(name: string) {
    if (!answer.value) answer.value = [];

    if (!answer.value.includes(name)) {
        answer.value.push(name);
    } else {
        answer.value = answer.value.filter((ans: string) => ans !== name);
    }
}
</script>
