<template>
    <div>
        <p class="font-semibold mb-4 text-lg">Budget & Expense Report</p>
        <div class="flex space-x-5 max-w-full">
            <div class="w-1/2 text-center">
                <p class="text-lg font-semibold text-primary mb-4">
                    Rp. {{ formatNumber(report.total_spent) }} / Rp. {{ formatNumber(totalLimit) }}
                </p>
                <UIDonut
                    name="All Budget"
                    :labels="[...labels, 'remaining']"
                    :datasets="[...data, totalLimit - report.total_spent]"
                />
            </div>
            <table class="table table-compact w-1/2">
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
                    <tr>
                        <th>#</th>
                        <td>Sum</td>
                        <td>
                            <span class="text-primary">Rp. {{ formatNumber(totalLimit) }}</span>
                        </td>
                        <td>
                            <span class="text-error">Rp. {{ formatNumber(report.total_spent) }}</span>
                        </td>
                        <td>
                            <span class="text-warning">Rp. {{ formatNumber(totalLimit - report.total_spent) }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    report: IBudgetTransaction;
}>();

const totalLimit = props.report.budget_details.reduce((total, b) => b.limit + total, 0);
const labels = props.report.budget_details.map((b) => b.name);
const data = props.report.budget_details.map((b) => b.spent);
</script>
