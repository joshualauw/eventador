<template>
    <div class="alert p-4 flex-between" :class="alertType">
        <div class="flex-center space-x-3">
            <Icon :name="notifyIcon" class="w-6 h-6" :class="notifyColor" />
            <span class="text-xs md:text-sm">
                {{ message }}
            </span>
        </div>
        <span class="text-content2">{{ dayjs(time).format("DD-MM-YY HH:mm") }}</span>
        <div v-if="callbackUrl" class="flex flex-col lg:flex-row gap-2">
            <button @click="navigateTo(callbackUrl)" class="btn btn-sm btn-solid-primary">view</button>
        </div>
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
