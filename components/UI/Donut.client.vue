<template>
    <DoughnutChart :chartData="chartData" />
</template>

<script setup lang="ts">
import { DoughnutChart } from "vue-chart-3";
const props = defineProps<{ labels: string[]; name: string; datasets: number[] }>();

const chartData = computed(() => ({
    labels: props.labels,
    datasets: [
        {
            label: props.name,
            data: props.datasets,
            backgroundColor: ["#db2f0d", "#e39910", "#f0ec0e", "#12c6de"],
        },
    ],
}));
</script>
