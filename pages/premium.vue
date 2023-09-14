<template>
    <div>
        <UILoader v-if="pending" />
        <div @click="$router.go(-1)" class="btn btn-ghost w-fit mt-8 ml-8">
            <Icon name="material-symbols:arrow-back" class="w-5 h-5 mr-1 font-extrabold" /> Back
        </div>
        <div class="p-8 md:p-20 lg:p-36 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
            <img src="/images/premium.png" class="rounded-lg" />
            <div>
                <h1 class="text-2xl font-bold tracking-wide">Become a Premium Member Now!</h1>
                <p class="text-content2 text-lg mt-2">
                    get all the benefits for only <span class="text-warning font-semibold">Rp. 59.000 / lifetime</span>
                </p>
                <ul class="space-y-3 mt-8">
                    <li v-for="ben in benefits"><Icon name="fa:check" class="w-5 h-5 mx-2 text-success" />{{ ben }}</li>
                </ul>
                <label for="payment-modal" class="btn btn-primary mt-8 w-full lg:w-3/4">Purchase Now</label>
            </div>
        </div>
        <ModalPayment @pay="doBecomePremium" :amount="59000">
            <div class="text-left">
                <p class="font-semibold">Become Premium User</p>
                <p class="text-warning text-lg">Rp. 59.000</p>
                <p class="text-content2">Amount: x1</p>
            </div>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-4" />
        </ModalPayment>
    </div>
</template>

<script setup lang="ts">
const benefits = ["Unlock Certificate Builder", "More intensive Event Report", "Unlimited Events", "Uncensor email"];

const { becomePremium, loggedUser } = useAuthStore();
const { pending, mutate, error, errors } = useMutate(becomePremium);

async function doBecomePremium() {
    const res = await mutate();
    if (res.status) {
        if (loggedUser.value) {
            loggedUser.value.is_premium = true;
            loggedUser.value.balance -= 59000;
        }
        navigateTo("/home");
    }
}
</script>
