<template>
    <div class="card hover:scale-100">
        <div class="card-body min-h-full flex-center text-center relative">
            <img :src="banner" class="w-full h-32 rounded-md" />
            <div class="space-x-2">
                <span class="badge" :class="badgeColor">{{ publicity }}</span>
                <span v-if="type == 'owner'" class="badge badge-flat-secondary">owner</span>
                <span v-if="type == 'organizer'" class="badge badge-flat-primary">co-organizer</span>
            </div>
            <h2 class="card-header text-lg font-bold">{{ name }}</h2>
            <p class="text-content2">{{ dayjs(start_date).format("DD-MMM-YYYY") }}</p>
            <div class="flex-center space-x-2 mt-4">
                <button @click="navigateTo(`/attending/${id}`)" class="btn btn-solid-success">Go to Lounge</button>
                <button
                    v-if="type == 'organizer' || type == 'owner'"
                    @click="navigateTo(`/dashboard/${id}`)"
                    class="btn btn-solid-primary"
                >
                    <Icon name="material-symbols:settings-outline" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{
    id: string;
    publicity: string;
    banner?: string;
    name: string;
    start_date: string;
    type?: IParticipantType;
}>();

const badgeColor = computed(() => {
    if (props.publicity == "open") return "badge-flat-success";
    if (props.publicity == "public") return "badge-flat-secondary";
    else return "badge-flat-error";
});
</script>
