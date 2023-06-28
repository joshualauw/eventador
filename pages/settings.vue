<template>
    <div class="space-y-12">
        <SettingsPersonal />
        <div class="divider"></div>
        <SettingsPassword />
        <div class="divider"></div>
        <SettingsBalance />
        <div class="divider"></div>
        <div class="flex flex-col md:flex-row md:space-x-5 w-full">
            <div class="block md:hidden mb-8">
                <p class="font-semibold text-xl">Delete Account</p>
                <p class="text-mute">this account and all data related to it will be deleted permanently</p>
            </div>
            <div class="hidden md:block md:w-1/3">
                <p class="font-semibold text-lg">Delete Account</p>
                <p class="text-content3">this account and all data related to it will be deleted permanently</p>
            </div>
            <form class="w-full md:w-2/3 form-group space-y-4">
                <label for="delete-account-modal" type="button" class="btn btn-error w-fit">
                    <Icon name="solar:danger-triangle-bold" class="w-5 h-5 mr-2" /> Delete Account
                </label>
            </form>
        </div>
    </div>
    <ModalAccountDelete id="123" label="account" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});
</script>
