<template>
    <Draggable v-model="theItems">
        <template #item="{ item }">
            <slot :item="(item as T)"></slot>
        </template>
    </Draggable>
</template>

<script setup lang="ts" generic="T">
//@ts-ignore
import Draggable from "vue3-draggable";

const emits = defineEmits<{ (e: "dragged", items: T[]): void }>();
const props = defineProps<{ items: T[] }>();
const theItems = ref(props.items);

//@ts-ignore
watch(theItems, (val) => emits("dragged", val));
</script>
