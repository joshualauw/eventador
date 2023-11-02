<template>
    <input class="modal-state" :id="modalId" v-model="isOpen" type="checkbox" />
    <div class="modal z-50">
        <label class="modal-overlay" :for="modalId"></label>
        <div class="modal-content w-full max-w-[475px] max-h-[600px]" :class="classes">
            <label :for="modalId" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            <slot :setOpen="setOpen"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ modalId: string; classes?: string }>();
const emits = defineEmits(["openChanged"]);

const isOpen = ref(false);

function setOpen(val: boolean) {
    isOpen.value = val;
    emits("openChanged", val);
}
</script>
