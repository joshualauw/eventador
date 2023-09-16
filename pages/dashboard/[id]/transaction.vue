<template>
    <div>
        <div class="flex-between mb-8 gap-4">
            <div class="flex-center space-x-2">
                <h1 class="font-semibold text-lg">All Transactions</h1>
            </div>
        </div>
        <div class="flex flex-center flex-col md:flex-row gap-3 mb-8">
            <input v-model="searchTerm" type="text" class="input max-w-full md:w-56" placeholder="Search by name.." />
            <select v-model="status" class="select w-full md:w-36">
                <option value="">All</option>
                <option value="success">Success</option>
                <option value="refunded">Refunded</option>
            </select>
        </div>
        <p v-if="filteredTransactions?.length == 0" class="text-center font-semibold text-lg text-content2 mt-8">
            -no transactions-
        </p>
        <div v-else class="w-full overflow-x-auto">
            <table class="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th @click="sortAscending = !sortAscending" class="cursor-pointer">
                            Transaction Date
                            <Icon :name="sortIcon" class="w-5 h-5" />
                        </th>
                        <th>Buyer Name</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(tr, i) in filteredTransactions">
                        <th>{{ i + 1 }}</th>
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
const searchTerm = ref("");
const sortAscending = ref(false);

const sortIcon = computed(() =>
    sortAscending.value ? "material-symbols:arrow-drop-up-rounded" : "material-symbols:arrow-drop-down-rounded"
);

const filteredTransactions = computed(() => {
    return transactions.value?.data
        .filter((p) => p.user_id.username.toLowerCase().includes(searchTerm.value.toLowerCase()))
        .filter((tr) => (status.value ? tr.status == status.value : true))
        .sort((a, b) => {
            if (sortAscending.value) return dateSort(new Date(a.trans_date), new Date(b.trans_date));
            else return dateSort(new Date(b.trans_date), new Date(a.trans_date));
        });
});
</script>
