<template>
    <div>
        <p class="font-semibold mb-4 text-lg">This month Report</p>
        <UIChart :labels="weekDays" name="total transactions" :datasets="monthlyData" />
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{ trans: IMonthlyTransaction[] }>();

const weekDays = computed(() =>
    props.trans.map((tr) => dayjs(tr.week.start).format("DD MMM") + " - " + dayjs(tr.week.end).format("DD MMM"))
);
const monthlyData = computed(() => props.trans.map((tr) => tr.monthly_transactions.length));
</script>
