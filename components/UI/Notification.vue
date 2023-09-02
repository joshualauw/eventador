<template>
    <div class="alert flex-col items-start p-4" :class="alertType">
        <div class="flex-center space-x-2">
            <Icon :name="notifyIcon" class="w-6 h-6" :class="notifyColor" />
            <p class="text-sm">{{ message }}</p>
        </div>
        <p class="text-content2 text-sm">
            received at: <span class="font-semibold">{{ dayjs(time).format("DD MMM YY, HH:mm") }}</span>
        </p>
        <button v-if="callbackUrl" @click="toUrl" class="btn btn-sm btn-solid-primary w-full">view</button>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{
    message: string;
    time: string;
    callbackUrl?: string;
    type: IUserNotifyType;
}>();

function toUrl() {
    if (props.callbackUrl) navigateTo(props.callbackUrl);
}

const alertType = computed(() => {
    if (props.type == "success") return "alert-success";
    if (props.type == "warning") return "alert-warning";
    if (props.type == "error") return "alert-error";
    else return "alert-info";
});

const notifyIcon = computed(() => {
    if (props.type == "success") return "material-symbols:check-circle";
    if (props.type == "warning") return "material-symbols:warning";
    if (props.type == "error") return "material-symbols:dangerous";
    else return "material-symbols:error";
});

const notifyColor = computed(() => {
    if (props.type == "success") return "text-green-500";
    if (props.type == "warning") return "text-yellow-500";
    if (props.type == "error") return "text-red-500";
    else return "text-blue-500";
});
</script>
