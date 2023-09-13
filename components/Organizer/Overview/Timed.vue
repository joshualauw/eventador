<template>
    <div>
        <p class="font-semibold mb-4 text-lg">Time Period Report</p>
        <UIChart :labels="days" name="total transactions" :datasets="timesData" />
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{ trans: ITransaction[]; days: string[] }>();

const timesData = computed(() => {
    const data = [];
    for (let i = 0; i < props.days.length; i++) {
        let ctr = 0;
        props.trans.forEach((tr) => {
            const day = props.days[i];
            const trans_date = dayjs(tr.trans_date).format("DD-MMM");
            if (day == trans_date) {
                ctr++;
            }
        });
        data.push(ctr);
    }

    return data;
});
</script>
