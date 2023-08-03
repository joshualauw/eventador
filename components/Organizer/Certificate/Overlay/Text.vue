<template>
    <div class="absolute right-2 top-2 max-w-[350px] bg-backgroundPrimary shadow-md rounded-xl p-4 z-30">
        <div class="w-full">
            <div class="form-group gap-1">
                <label class="form-label">Content</label>
                <input
                    v-model="textState.content"
                    type="text"
                    class="input input-sm max-w-full"
                    placeholder="text content.."
                />
            </div>
            <div class="flex mt-4 space-x-3">
                <div class="form-group gap-1">
                    <span class="form-label">x position</span>
                    <input
                        v-model="textState.state.x"
                        type="number"
                        class="input input-sm max-w-full"
                        placeholder="x"
                    />
                </div>
                <div class="form-group gap-1">
                    <span class="form-label">y position</span>
                    <input
                        v-model="textState.state.y"
                        type="number"
                        class="input input-sm max-w-full"
                        placeholder="y"
                    />
                </div>
            </div>
            <div class="flex mt-4 space-x-3">
                <div class="form-group gap-1">
                    <span class="form-label">width</span>
                    <input
                        v-model="textState.state.width"
                        type="number"
                        class="input input-sm max-w-full"
                        placeholder="x"
                    />
                </div>
                <div class="form-group gap-1">
                    <span class="form-label">height</span>
                    <input
                        v-model="textState.state.height"
                        type="number"
                        class="input input-sm max-w-full"
                        placeholder="y"
                    />
                </div>
            </div>
            <div class="flex mt-4 space-x-3">
                <div class="form-group gap-1">
                    <span class="form-label">Font Size</span>
                    <input v-model="textState.options.fontSize" type="number" class="input input-sm max-w-full" />
                </div>
                <div class="form-group gap-1">
                    <span class="form-label">Text Decoration</span>
                    <div class="flex space-x-2">
                        <button
                            @click="applyStyles('bold')"
                            class="btn btn-sm"
                            :class="{ 'bg-border': text.options.fontStyle.includes('bold') }"
                        >
                            B
                        </button>
                        <button
                            @click="applyStyles('italic')"
                            class="btn btn-sm"
                            :class="{ 'bg-border': text.options.fontStyle.includes('italic') }"
                        >
                            I
                        </button>
                        <button
                            @click="applyStyles('underline')"
                            class="btn btn-sm"
                            :class="{ 'bg-border': text.options.fontStyle.includes('underline') }"
                        >
                            U
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex justify-end w-full mt-4 space-x-2">
                <button @click="emits('closed')" class="btn btn-ghost">OK</button>
                <button @click="emits('deleted', text.id)" class="btn btn-error">Delete</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ text: ICertificateTextExtra }>();
const emits = defineEmits<{ (e: "closed"): void; (e: "deleted", id: string): void }>();

const textState = ref();
const fontStyles = ref<string[]>([]);

watchEffect(() => {
    textState.value = props.text;
    fontStyles.value = [...props.text.options.fontStyle.split(" ")];
});
watch(fontStyles, (val) => (textState.value.options.fontStyle = val.join(" ")), { deep: true });

function applyStyles(style: "bold" | "italic" | "underline") {
    if (fontStyles.value.includes(style)) {
        fontStyles.value = fontStyles.value.filter((a) => a !== style);
    } else {
        fontStyles.value.push(style);
    }
}
</script>
