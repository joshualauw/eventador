<template>
    <div>
        <div class="flex-between mb-5 md:mb-8">
            <h2 class="font-bold text-lg md:text-xl">All Notifications</h2>
            <div class="flex-center space-x-4">
                <select v-model="type" class="select hidden md:block w-36">
                    <option value="">All</option>
                    <option value="info">info</option>
                    <option value="success">success</option>
                    <option value="warning">warning</option>
                </select>
                <label for="delete-notification-modal" class="btn btn-solid-error">
                    Clear All <Icon name="heroicons:x-mark" class="ml-1 w-4 h-4" />
                </label>
            </div>
        </div>
        <select v-model="type" class="select block md:hidden w-full mb-8">
            <option value="">All</option>
            <option value="info">info</option>
            <option value="success">success</option>
            <option value="warning">warning</option>
        </select>
        <div class="space-y-5">
            <UINotification
                v-for="notf in notificationsData"
                :message="notf.message"
                :time="notf.time"
                :type="notf.type"
                :callback-url="notf.callbackUrl"
            />
        </div>
        <UIModal v-slot="{ setOpen }" modal-id="delete-notification-modal">
            <div class="flex flex-col text-center gap-2">
                <div class="flex-box rounded-full w-14 h-14 p-4 btn btn-solid-error btn-no-animation self-center mb-4">
                    <Icon name="fa:trash" class="w-7 h-7" />
                </div>
                <h2 class="text-center text-lg font-semibold text-content1">Confirm Clear</h2>
                <p class="mx-auto max-w-xs text-sm text-content2">Are you sure you want to clear notifications?</p>
                <button
                    @click="clearNotifications(setOpen)"
                    class="btn btn-error mt-4"
                    :class="{ 'btn-loading': pending }"
                >
                    Yes, Clear
                </button>
            </div>
        </UIModal>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
    middleware: "auth",
});

const { getUserNotifications, readAllNotifications, loggedUser } = useAuthStore();
const { mutate, pending } = useMutate(readAllNotifications);

const { data: notifications, refresh } = await useAsyncData("getUserNotifications", () =>
    getUserNotifications(loggedUser.value?._id ?? "")
);

const type = ref("");
const notificationsData = computed(() =>
    type.value ? notifications.value?.data.filter((notf) => notf.type == type.value) : notifications.value?.data
);

async function clearNotifications(setOpen: (state: boolean) => void) {
    const res = await mutate(loggedUser.value?._id || "");
    if (res.status) {
        setOpen(false);
        refresh();
    }
}
</script>
