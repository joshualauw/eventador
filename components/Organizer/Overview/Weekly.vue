<template>
    <div>
        <p class="font-semibold mb-4 text-lg">This week Report</p>
        <UIChart :labels="weekDays" name="total transactions" :datasets="weeklyData" />
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{ trans: ITransaction[] }>();
const weekDays = getWeekDays();

const weeklyData = computed(() => {
    const data = [];

    for (let i = 0; i < weekDays.length; i++) {
        let ctr = 0;
        props.trans.forEach((tr) => {
            const today = dayjs(weekDays[i]).format("DD-MM");
            const trans_date = dayjs(tr.trans_date).format("DD-MM");
            if (today == trans_date) {
                ctr++;
            }
        });
        data.push(ctr);
    }

    return data;
});
</script>
