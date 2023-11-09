<template>
    <div>
        <p class="font-semibold mb-4 text-lg">Page Views Report</p>
        <UIChart name="Page Views" :labels="weekDays" :datasets="data" />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    report: IPageView[];
}>();

const weekDays = getWeekDays();
const data = [0, 0, 0, 0, 2, 3, 5];
</script>
