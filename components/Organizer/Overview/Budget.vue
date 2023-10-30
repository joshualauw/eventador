<template>
    <div>
        <p class="font-semibold mb-4 text-lg">Budget & Expense Report</p>
        <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Limit</th>
                    <th>Spent</th>
                    <th>Remaining</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(budget, i) in report.budget_details">
                    <th>{{ i + 1 }}</th>
                    <td>{{ budget.name }}</td>
                    <td>Rp. {{ formatNumber(budget.limit) }}</td>
                    <td>- Rp. {{ formatNumber(budget.spent) }}</td>
                    <td>Rp. {{ formatNumber(budget.remaining) }}</td>
                </tr>
            </tbody>
        </table>
        <div class="mt-4 font-semibold flex items-center justify-between w-full">
            <p>
                Total Expense: <span class="md:text-lg">Rp. {{ formatNumber(report.total_spent) }}</span>
            </p>
            <p>
                Profit before Expense:
                <span class="md:text-lg">Rp. {{ formatNumber(report.gross_profit) }}</span>
            </p>
            <p>
                Profit after Expense:
                <span class="md:text-lg text-primary">Rp. {{ formatNumber(report.net_profit) }}</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    report: IBudgetTransaction;
}>();
</script>
