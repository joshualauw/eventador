<template>
    <UILoader v-if="pending" />
    <div class="flex flex-col md:flex-row md:space-x-5 w-full">
        <div class="block md:hidden mb-8">
            <p class="font-semibold text-xl">Account Balance</p>
            <p class="text-mute">Withdraw or top up balance</p>
        </div>
        <div class="hidden md:block md:w-1/3">
            <p class="font-semibold text-lg">Account Balance</p>
            <p class="text-content3">Withdraw or top up balance</p>
        </div>
        <form class="w-full md:w-2/3 form-group space-y-4">
            <div class="form-field">
                <label class="form-label">Your Balance</label>
                <p class="text-xl mt-2 text-success font-semibold">Rp. {{ formatNumber(loggedUser?.balance || 0) }}</p>
            </div>
            <div class="form-field">
                <label class="form-label">Request Topup / Withdraw amount</label>
                <div class="flex flex-col lg:flex-row gap-3">
                    <input v-model="amount" type="number" class="input max-w-full lg:w-64" placeholder="amount.." />
                    <button @click="doTopup" type="button" class="btn btn-solid-secondary w-full lg:w-fit">
                        Top Up
                    </button>
                    <button @click="doWithdraw" type="button" class="btn btn-solid-secondary w-full lg:w-fit">
                        Withdraw
                    </button>
                </div>
            </div>

            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-8" />
        </form>
    </div>
</template>

<script setup lang="ts">
const { loggedUser, topUp, withdraw } = useAuthStore();
const { mutate: topupMutate, pending, error, errors } = useMutate(topUp);
const { mutate: withdrawMutate } = useMutate(withdraw);

const amount = ref(0);

async function doTopup() {
    const res = await topupMutate({ amount: amount.value });
    if (res.status && res.data) {
        window.open(res.data.data, "_blank");
    }
}

async function doWithdraw() {
    pending.value = true;

    const res = await withdrawMutate({ amount: amount.value });
    if (res.status && res.data) {
        window.open(res.data.data, "_blank");
    } else {
        error.value = res.error;
        errors.value = [];
        errors.value.push(...res.errors);
    }
    pending.value = false;
}
</script>
