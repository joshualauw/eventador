<template>
    <div>
        <div class="flex-between mb-8">
            <h2 class="font-bold text-xl">All Notifications</h2>
            <label for="create-event-modal" class="btn btn-primary">Read All</label>
        </div>
        <div class="space-y-5 text-sm">
            <UINotification
                v-for="notf in notifications?.data"
                :message="notf.message"
                :time="notf.time"
                :type="notf.type"
                :callback-url="notf.callbackUrl"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
    middleware: "auth",
});

const { getUserNotifications, loggedUser } = useAuthStore();

const { data: notifications } = await useAsyncData("getUserNotifications", () =>
    getUserNotifications(loggedUser.value?._id ?? "")
);
</script>
