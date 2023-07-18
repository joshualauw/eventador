<template>
    <div @click="emits('selected', image)" class="absolute group select-none flex-box z-30" :style="styles">
        <img :src="image.preview" class="w-full h-full" />
        <div
            @mousedown="dragMouseDown"
            class="hidden group-hover:flex absolute -top-2 -left-2 h-6 w-6 cursor-move items-center justify-center rounded-full btn-solid-primary text-sm"
        >
            <Icon name="material-symbols:drag-pan" />
        </div>
    </div>
</template>

<script setup lang="ts">
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

function dragMouseDown(e: MouseEvent) {
    e.preventDefault();
    document.onmousemove = dragMouseMove;
    document.onmouseup = dragMouseUp;
}

function dragMouseMove(e: MouseEvent) {
    e.preventDefault();
    props.image.state.x = e.x;
    props.image.state.y = e.y;
}

function dragMouseUp(e: MouseEvent) {
    e.preventDefault();
    document.onmousemove = null;
    document.onmouseup = null;
}
</script>
