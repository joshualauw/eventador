<template>
    <div class="space-y-12">
        <SettingsPersonal />
        <div class="divider"></div>
        <SettingsPreference />
        <div class="divider"></div>
        <SettingsBalance />
        <div class="divider"></div>
        <SettingsPassword />
        <div class="divider"></div>
        <div class="flex flex-col md:flex-row md:space-x-5 w-full">
            <div class="block md:hidden mb-8">
                <p class="font-semibold text-xl">Logout</p>
                <p class="text-mute">want to change account?</p>
            </div>
            <div class="hidden md:block md:w-1/3">
                <p class="font-semibold text-lg">Logout</p>
                <p class="text-content3">want to change account?</p>
            </div>
            <div class="w-full flex-center space-x-4 md:w-2/3">
                <button @click="logout" type="button" class="btn btn-error w-fit">
                    <Icon name="material-symbols:logout" class="w-5 h-5 mr-2" /> Logout
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TYPE } from "vue-toastification";

definePageMeta({
    layout: "home",
    middleware: "auth",
});
const { loggedUser } = useAuthStore();
const { loggedParticipant } = useParticipantStore();
const { $pusher } = useNuxtApp();
const { unsubscribe } = usePusher();

function logout() {
    const token = useCookie("token");
    const eventId = useCookie("eventId");
    if (loggedUser.value) unsubscribe($pusher, loggedUser.value._id);

    token.value = null;
    eventId.value = null;
    loggedUser.value = null;
    loggedParticipant.value = null;

    navigateTo("/home");
    createToast("logout successful", TYPE.SUCCESS);
}
</script>
