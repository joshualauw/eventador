<template>
    <Vue3DraggableResizable
        :initW="text.state.width"
        :initH="text.state.height"
        v-model:x="text.state.x"
        v-model:y="text.state.y"
        v-model:w="text.state.width"
        v-model:h="text.state.height"
        :draggable="true"
        :resizable="true"
        @activated="emits('selected', text)"
        class="absolute group select-none flex-box z-30"
        :style="styles"
    >
        {{ text.content }}
    </Vue3DraggableResizable>
</template>

<script setup lang="ts">
import Vue3DraggableResizable from "vue3-draggable-resizable";

const props = defineProps<{ text: ICertificateTextExtra }>();
const emits = defineEmits<{ (e: "selected", text: ICertificateTextExtra): void }>();

const { isPreview } = useCertificateStore();

const styles = computed(() => {
    let styleString = isPreview.value ? "" : "border: 1px solid gray;";
    //position
    styleString += `top: ${props.text.state.y}px; left: ${props.text.state.x}px;`;
    //size
    styleString += `width: ${props.text.state.width}px; height: ${props.text.state.height}px;`;
    //color
    styleString += `background-color: ${props.text.color}; color: ${props.text.options.fontColor};`;
    //font size
    styleString += `font-size: ${props.text.options.fontSize}px;`;
    //font style
    if (props.text.options.fontStyle.includes("bold")) {
        styleString += `font-weight: 700;`;
    }
    if (props.text.options.fontStyle.includes("italic")) {
        styleString += `font-style: italic;`;
    }
    if (props.text.options.fontStyle.includes("underline")) {
        styleString += `text-decoration: underline;`;
    }
    return styleString;
});
</script>
