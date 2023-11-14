<template>
    <div>
        <div class="flex-between mb-8 gap-4">
            <div class="flex-center space-x-2">
                <h1 class="font-semibold text-lg">Transaction</h1>
            </div>
        </div>
        <OrganizerReportParticipant :transactions="groupedTransactions" :net_income="revenue.net_income" />
        <OrganizerReportBudget
            v-if="report"
            class="mx-0 md:mx-20 border-4 p-5"
            :budget_details="report.data.budget_transactions.budget_details"
            :sponsor_details="report.data.sponsor_transactions.sponsor_details"
            :net_income="revenue.net_income"
            :gross_profit="revenue.gross_profit"
            :net_profit="revenue.net_profit"
            :total_expense="revenue.total_expense"
            :total_funds="revenue.total_funds"
        />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "participant"],
});

const route = useRoute();
const { getTransactionReport, getAllTransaction } = useTransactionStore();

const { data: report } = await useAsyncData("getTransactionReport", () =>
    getTransactionReport(route.params.id as string)
);
const { data: transactions } = await useAsyncData("getAllTransaction", () =>
    getAllTransaction(route.params.id as string)
);

const groupedTransactions = computed(() => {
    return transactions.value?.data
        .sort((a, b) => dateSort(new Date(a.trans_date), new Date(b.trans_date)))
        .reduce((groups: Record<string, (ITransaction & { user_id: IUser })[]>, transaction) => {
            const date = transaction.trans_date;
            if (!groups[date]) groups[date] = [];

            groups[date].push(transaction);
            return groups;
        }, {});
});

const revenue = computed(() => {
    const net_income = report.value?.data.revenue || 0;
    const total_expense = report.value?.data.budget_transactions.total_spent || 0;
    const total_funds = report.value?.data.sponsor_transactions.total_funds || 0;
    const gross_profit = net_income + total_funds;

    return {
        net_income,
        total_expense,
        total_funds,
        gross_profit,
        net_profit: gross_profit - total_expense,
    };
});
</script>
