<template>
    <Vue3DraggableResizable
        :initW="image.state.width"
        :initH="image.state.height"
        v-model:x="image.state.x"
        v-model:y="image.state.y"
        v-model:w="image.state.width"
        v-model:h="image.state.height"
        :draggable="true"
        :resizable="true"
        @activated="emits('selected', image)"
        @click="emits('selected', image)"
        class="absolute group select-none flex-box z-30"
        :style="styles"
    >
        <img :src="image.preview" class="w-full h-full" />
    </Vue3DraggableResizable>
</template>

<script setup lang="ts">
import Vue3DraggableResizable from "vue3-draggable-resizable";

const props = defineProps<{ image: ICertificateImageExtra }>();
const emits = defineEmits<{ (e: "selected", image: ICertificateImageExtra): void }>();

const { isPreview } = useCertificateStore();

const styles = computed(() => {
    let styleString = isPreview.value ? "" : "border: 1px solid gray;";
    //position
    styleString += `top: ${props.image.state.y}px; left: ${props.image.state.x}px;`;
    //size
    styleString += `width: ${props.image.state.width}px; height: ${props.image.state.height}px;`;

    return styleString;
});
</script>
