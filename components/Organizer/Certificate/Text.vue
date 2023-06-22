<template>
    <div @click="emits('selected', text)" class="absolute group select-none flex-box z-30" :style="styles">
        <div
            @mousedown="dragMouseDown"
            class="hidden group-hover:flex absolute -top-2 -left-2 h-6 w-6 cursor-move items-center justify-center rounded-full btn-solid-primary text-sm"
        >
            <Icon name="material-symbols:drag-pan" />
        </div>
        {{ content }}
    </div>
</template>

<script setup lang="ts">
interface TextState {
    id: string;
    color: string;
    content: string;
    options: { fontStyle: string; fontSize: number; fontColor: string };
    state: { x: number; y: number; width: number; height: number };
}

const props = defineProps<TextState>();
const emits = defineEmits<{ (e: "selected", id: TextState): void }>();

const text = reactive(props);

const styles = computed(() => {
    let styleString = "border: 1px solid gray;";
    //position
    styleString += `top: ${text.state.y}px; left: ${text.state.x}px;`;
    //size
    styleString += `width: ${text.state.width}px; height: ${text.state.height}px;`;
    //color
    styleString += `background-color: ${text.color}; color: ${text.options.fontColor};`;
    //text decoration
    styleString += `font-size: ${text.options.fontSize}; ${
        text.options.fontStyle == "bold" ? "font-weight: 500" : "text-decoration: " + text.options.fontStyle
    };`;
    return styleString;
});

function dragMouseDown(e: MouseEvent) {
    e.preventDefault();
    document.onmousemove = dragMouseMove;
    document.onmouseup = dragMouseUp;
}

function dragMouseMove(e: MouseEvent) {
    e.preventDefault();
    text.state.x = e.x;
    text.state.y = e.y;
}

function dragMouseUp(e: MouseEvent) {
    e.preventDefault();
    document.onmousemove = null;
    document.onmouseup = null;
}
</script>
