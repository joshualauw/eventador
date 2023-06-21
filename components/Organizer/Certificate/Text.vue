<template>
    <div @click="emits('selected', id)" class="absolute group select-none flex-box z-30" :style="styles">
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
const props = defineProps<{
    id: string;
    color: string;
    content: string;
    options: { fontStyle: string; fontSize: number; fontColor: string };
    state: { x: number; y: number; width: number; height: number };
}>();
const emits = defineEmits<{ (e: "selected", id: string): void }>();

const text = reactive({
    color: "#FFFFFF",
    content: "<blank>",
    options: {
        fontStyle: "none",
        fontSize: 16,
        fontColor: "#FFFFFF",
    },
    state: {
        x: 25,
        y: 25,
        width: 50,
        height: 50,
    },
});

onMounted(() => {
    if (props.color) text.color = props.color;
    if (props.content) text.content = props.content;
    if (props.options) text.options = props.options;
    if (props.state) text.state = props.state;
});

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
