<template>
    <div>
        <p class="font-semibold mb-4 text-lg">Highest Record</p>
        <div class="card max-h-full">
            <div class="card-body">
                <p class="text-xl text-success">Rp. {{ formatNumber(trans.revenue) }}</p>
                <p class="text-content-2">{{ dayjs(trans._id).format("DD-MM-YYYY") }}</p>
            </div>
        </div>
        <p class="font-semibold my-4 text-lg">Latest Transaction</p>
        <div class="card max-h-full">
            <div class="card-body">
                <p class="text-xl text-success">Rp. {{ formatNumber(trans.revenue) }}</p>
                <p class="text-content-2">{{ dayjs(trans._id).format("DD-MM-YYYY") }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

defineProps<{ trans: IHighestTransaction; latest: ITransaction }>();
</script>
