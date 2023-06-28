<template>
    <UIModal modal-id="payment-modal">
        <div class="flex flex-col text-center gap-2">
            <div class="flex-box rounded-full w-14 h-14 p-4 btn btn-solid-primary btn-no-animation self-center mb-4">
                <Icon name="fa:info" class="w-7 h-7" />
            </div>
            <h2 class="text-center text-xl font-bold text-content1">Payment Confirmation</h2>
            <p class="mx-auto max-w-xs text-sm text-content2">Do you want to purchase this activity?</p>
            <div class="my-2 border-y border-border py-4">
                <slot />
            </div>
            <div class="text-left text-sm">
                <div class="grid grid-cols-3 gap-2">
                    <div class="col-span-1">Your Balance:</div>
                    <div class="col-span-2">Rp.250.000</div>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <div class="col-span-1">Total:</div>
                    <div class="col-span-2">Rp.25.000</div>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <div class="col-span-1">After:</div>
                    <div class="col-span-2 text-success">Rp.225.000</div>
                </div>
            </div>
            <button @click="emits('pay')" class="btn btn-primary mt-4"><Icon name="fa:lock" class="mr-2" /> Pay</button>
        </div>
    </UIModal>
</template>

<script setup lang="ts">
const emits = defineEmits<{ (e: "pay"): void }>();
</script>
