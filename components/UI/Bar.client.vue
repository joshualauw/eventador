<template>
    <BarChart :chartData="chartData" />
</template>

<script setup lang="ts">
import { BarChart } from "vue-chart-3";
const props = defineProps<{ labels: string[]; name: string; datasets: number[] }>();

const chartData = computed(() => ({
    labels: props.labels,
    datasets: [
        {
            label: props.name,
            data: props.datasets,
            borderColor: "#77CEFF",
            backgroundColor: "#77CEFF",
            color: "#d1d5db",
        },
    ],
}));
</script>
