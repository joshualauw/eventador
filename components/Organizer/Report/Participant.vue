<template>
    <div class="mx-0 md:mx-20 border-4 p-5 mb-8">
        <div class="text-center mb-5">
            <h1 class="font-semibold">Registration Income Report</h1>
            <h1 class="font-semibold">Period: 2023</h1>
        </div>
        <table class="table table-compact">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Username</th>
                    <th>(Rp.)</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(transactionsForDate, date) in transactions" :key="date">
                    <tr>
                        <td :colspan="3">{{ dayjs(date).format("DD-MM-YYYY") }}</td>
                    </tr>
                    <tr v-for="transaction in transactionsForDate">
                        <td></td>
                        <td>{{ transaction.user_id.username }}</td>
                        <td>Rp. {{ formatNumber(transaction.amount) }}</td>
                    </tr>
                </template>
                <tr>
                    <td class="font-bold" :colspan="2">Total Income:</td>
                    <td class="font-bold">Rp. {{ formatNumber(net_income) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

defineProps<{
    transactions: Record<string, (ITransaction & { user_id: IUser })[]>;
    net_income: number;
}>();
</script>
