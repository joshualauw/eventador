<template>
    <div @click="emits('selected', text)" class="absolute group select-none flex-box z-30" :style="styles">
        <div
            @mousedown="dragMouseDown"
            class="hidden group-hover:flex absolute -top-2 -left-2 h-6 w-6 cursor-move items-center justify-center rounded-full btn-solid-primary text-sm"
        >
            <Icon name="material-symbols:drag-pan" />
        </div>
        {{ text.content }}
    </div>
</template>

<script setup lang="ts">
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

function dragMouseDown(e: MouseEvent) {
    e.preventDefault();
    document.onmousemove = dragMouseMove;
    document.onmouseup = dragMouseUp;
}

function dragMouseMove(e: MouseEvent) {
    e.preventDefault();
    props.text.state.x = e.x;
    props.text.state.y = e.y;
}

function dragMouseUp(e: MouseEvent) {
    e.preventDefault();
    document.onmousemove = null;
    document.onmouseup = null;
}
</script>
