<template>
    <div>
        <div class="flex-between mb-8">
            <h2 class="font-bold text-xl">All Notifications</h2>
            <select v-model="type" class="select w-36">
                <option value="">All</option>
                <option value="success">Transaction</option>
                <option value="info">Announcement</option>
            </select>
        </div>
        <div class="space-y-5 text-sm">
            <UINotification
                v-for="notf in notificationsData"
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

const type = ref("");
const notificationsData = computed(() =>
    type.value ? notifications.value?.data.filter((notf) => notf.type == type.value) : notifications.value?.data
);
</script>
