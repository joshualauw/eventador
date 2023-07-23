<template>
    <div class="w-full">
        <div class="flex-between mb-8 gap-4">
            <div class="flex-center space-x-2">
                <h1 class="font-semibold text-lg w-64">All Transactions</h1>
            </div>
            <div class="flex-center space-x-3">
                <select v-model="status" class="select w-28">
                    <option value="">All</option>
                    <option value="success">Success</option>
                    <option value="refunded">Refunded</option>
                </select>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Transaction Date</th>
                    <th>Buyer Name</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tr, i) in filteredTransactions">
                    <th>{{ i }}</th>
                    <td>{{ dayjs(tr.trans_date).format("DD-MM-YYYY") }}</td>
                    <td>{{ tr.user_id.username }}</td>
                    <td>Rp. {{ formatNumber(tr.amount) }}</td>
                    <td>
                        <span :class="tr.status == 'success' ? 'text-success' : 'text-error'">{{ tr.status }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "participant"],
});

const route = useRoute();
const { getAllTransaction } = useTransactionStore();
const { data: transactions } = await useAsyncData("getAllTransaction", () =>
    getAllTransaction(route.params.id as string)
);
const status = ref("");

const filteredTransactions = computed(() => {
    return transactions.value?.data.filter((tr) => (status.value ? tr.status == status.value : true));
});
</script>
