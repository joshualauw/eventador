<template>
    <LineChart :chartData="testData" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
    name: "Home",
    components: { LineChart },
    setup() {
        const testData = {
            labels: getWeekDays(),
            datasets: [
                {
                    label: "Report Timeline",
                    data: [30, 40, 60, 70, 5, 12, 5],
                    borderColor: "#77CEFF",
                    backgroundColor: "#77CEFF",
                    color: "#d1d5db",
                },
            ],
        };

        return { testData };
    },
});
</script>
