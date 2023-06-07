<template>
    <input class="modal-state" :id="modalId" v-model="isOpen" type="checkbox" />
    <div class="modal text-black">
        <label class="modal-overlay" :for="modalId"></label>
        <div class="modal-content" :class="cn(modalStyle({ size }))">
            <label :for="modalId" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            <slot :setOpen="setOpen"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const modalStyle = cva("flex flex-col w-full gap-5 p-7", {
    variants: {
        size: {
            default: "",
            large: "max-w-[800px]",
            huge: "max-w-[1200px]",
        },
    },
    defaultVariants: {
        size: "default",
    },
});
type ModalStyle = Required<VariantProps<typeof modalStyle>>;

defineProps<{ modalId: string; size?: ModalStyle["size"] }>();
const emits = defineEmits(["openChanged"]);

const isOpen = ref(false);

function setOpen(val: boolean) {
    isOpen.value = val;
    emits("openChanged", val);
}
</script>
