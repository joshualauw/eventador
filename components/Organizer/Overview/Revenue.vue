<template>
    <div>
        <p class="font-semibold mb-4 text-lg">Total Revenue Report</p>
        <div class="space-y-1 mb-4">
            <p>
                Gross profit:
                <span class="text-secondary">Rp. {{ formatNumber(total_revenue.gross_profit) }}</span>
            </p>
            <p>
                Total Expense:
                <span class="text-error"> - Rp. {{ formatNumber(total_revenue.total_expense) }} </span>
            </p>
            <p>
                Total Funds:
                <span class="text-success"> + Rp. {{ formatNumber(total_revenue.total_funds) }} </span>
            </p>
        </div>
        <p class="text-lg font-semibold">
            Net Profit: <span class="text-primary">Rp. {{ formatNumber(total_revenue.net_profit) }}</span>
        </p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    total_revenue: {
        gross_profit: number;
        total_expense: number;
        total_funds: number;
        net_profit: number;
    };
}>();
</script>
