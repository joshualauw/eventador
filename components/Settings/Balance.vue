<template>
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
                <div class="flex">
                    <button type="button" class="btn btn-primary btn-no-animation rounded-r-none">Rp.</button>
                    <input
                        placeholder="balance.."
                        disabled
                        type="number"
                        value="250000"
                        class="input rounded-l-none max-w-full"
                    />
                </div>
            </div>
            <div class="form-field">
                <label class="form-label">Actions</label>
                <div class="flex space-x-4">
                    <button type="button" class="btn btn-solid-secondary w-fit">Top Up</button>
                    <button type="button" class="btn btn-solid-secondary w-fit">Withdraw</button>
                </div>
            </div>
        </form>
    </div>
</template>
