<template>
    <UIModal v-slot="{ setOpen }" modal-id="payment-modal">
        <div class="flex flex-col text-center gap-2">
            <div class="flex-box rounded-full w-14 h-14 p-4 btn btn-solid-primary btn-no-animation self-center mb-4">
                <Icon name="fa:info" class="w-7 h-7" />
            </div>
            <h2 class="text-center text-xl font-bold text-content1">Payment Confirmation</h2>
            <p class="mx-auto max-w-xs text-sm text-content2">Do you want to purchase this activity?</p>
            <div class="my-2 border-y border-border py-4">
                <slot />
            </div>
            <div v-if="loggedUser" class="text-left text-sm">
                <div class="grid grid-cols-3 gap-2">
                    <div class="col-span-1">Your Balance:</div>
                    <div class="col-span-2">Rp. {{ formatNumber(loggedUser.balance) }}</div>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <div class="col-span-1">Total:</div>
                    <div class="col-span-2">Rp. {{ formatNumber(amount) }}</div>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <div class="col-span-1">After:</div>
                    <div class="col-span-2" :class="afterBalance < 0 ? 'text-error' : 'text-success'">
                        Rp. {{ formatNumber(afterBalance) }}
                        <p v-if="afterBalance < 0" class="text-error text-sm col-span-2">Not enough balance!</p>
                    </div>
                </div>
            </div>
            <button @click="doPay(setOpen)" :disabled="afterBalance < 0" class="btn btn-primary mt-4">
                <Icon name="fa:lock" class="mr-2" /> Pay
            </button>
        </div>
    </UIModal>
</template>

<script setup lang="ts">
const emits = defineEmits<{ (e: "pay"): void }>();
const props = defineProps<{ amount: number }>();

const { loggedUser } = useAuthStore();
const afterBalance = computed(() => (loggedUser.value?.balance || 0) - props.amount);

function doPay(setOpen: (state: boolean) => void) {
    emits("pay");
    setOpen(false);
}
</script>
