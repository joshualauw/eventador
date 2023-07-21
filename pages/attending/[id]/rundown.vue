<template>
    <div class="card hover:scale-100 h-fit w-full lg:w-3/4 mx-auto">
        <div class="card-body h-full">
            <div v-for="run in eventDetail?.data.eventItinenaries" class="p-4 h-fit bg-backgroundSecondary">
                <p class="font-bold mb-4">{{ dayjs(run.day).format("DD MMM YYYY") }}</p>
                <div v-for="schedule in run.schedules" class="py-1.5 px-6 mb-2 rounded-lg bg-backgroundPrimary">
                    <p class="font-semibold">{{ schedule.name }}</p>
                    <p class="text-mute">{{ schedule.start_time }} - {{ schedule.end_time }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

definePageMeta({
    layout: "attending",
    middleware: ["auth", "participant"],
});

const route = useRoute();
const { getEventDetail } = useEventStore();

const { data: eventDetail } = await useAsyncData("getEventDetail", () => getEventDetail(route.params.id as string));
</script>
