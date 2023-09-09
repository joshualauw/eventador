<template>
    <Draggable @sort="emits('dragged', myItems)" v-model="myItems" item-key="key" handle=".handle">
        <template #item="{ element }">
            <div>
                <slot :item="(element as T)"></slot>
            </div>
        </template>
    </Draggable>
</template>

<script setup lang="ts" generic="T">
import Draggable from "vuedraggable";

const emits = defineEmits<{ (e: "dragged", items: T[]): void }>();
const props = defineProps<{ items: T[] }>();
const myItems = ref<T[]>(props.items) as Ref<T[]>;

watchEffect(() => (myItems.value = props.items));
</script>
