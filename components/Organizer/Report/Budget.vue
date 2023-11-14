<template>
    <div class="mx-28 border-4 p-5">
        <div class="text-center">
            <h1 class="font-semibold">Budget & Funds Report</h1>
            <h1 class="font-semibold">Period: 2023</h1>
        </div>
        <div class="grid grid-cols-6 gap-4">
            <p class="col-span-4"></p>
            <p class="col-span-1"></p>
            <p class="col-span-1 text-center">(Rp.)</p>
        </div>
        <hr class="my-4" />
        <div class="grid grid-cols-6 gap-4">
            <p class="col-span-4">Net Income</p>
            <p class="col-span-1"></p>
            <p class="col-span-1">Rp. {{ formatNumber(net_income || 0) }}</p>
        </div>
        <div class="mt-4">
            <p class="col-span-4 font-bold">Funds</p>
        </div>
        <div v-for="rp in sponsor_details" class="grid grid-cols-6 gap-4">
            <p class="col-span-4">{{ rp.name }}</p>
            <p class="col-span-1">Rp. {{ formatNumber(rp.funds) }}</p>
            <p class="col-span-1"></p>
        </div>
        <div class="grid grid-cols-6 gap-4">
            <p class="col-span-4">Total Funds</p>
            <p class="col-span-1"></p>
            <p class="col-span-1">Rp. {{ formatNumber(total_funds || 0) }}</p>
        </div>
        <div class="grid grid-cols-6 gap-4">
            <p class="col-span-4"></p>
            <p class="col-span-1"></p>
            <p class="col-span-1 text-center">(+)</p>
        </div>
        <hr class="my-4" />
        <div class="grid grid-cols-6 gap-4">
            <p class="col-span-4 font-semibold">Gross Profit</p>
            <p class="col-span-1"></p>
            <p class="col-span-1">Rp.{{ formatNumber(gross_profit) }}</p>
        </div>
        <div class="mt-4">
            <p class="col-span-4 font-bold">Expenses</p>
        </div>
        <div v-for="rp in budget_details" class="grid grid-cols-6 gap-4">
            <p class="col-span-4">{{ rp.name }}</p>
            <p class="col-span-1">Rp. {{ formatNumber(rp.spent) }}</p>
            <p class="col-span-1"></p>
        </div>
        <div class="grid grid-cols-6 gap-4">
            <p class="col-span-4">Total Expense</p>
            <p class="col-span-1"></p>
            <p class="col-span-1">Rp. {{ formatNumber(total_expense || 0) }}</p>
        </div>
        <div class="grid grid-cols-6 gap-4">
            <p class="col-span-4"></p>
            <p class="col-span-1"></p>
            <p class="col-span-1 text-center">(-)</p>
        </div>
        <hr class="my-4" />
        <div class="grid grid-cols-6 gap-4">
            <p class="col-span-4 font-semibold">Net Profit</p>
            <p class="col-span-1"></p>
            <p class="col-span-1">Rp.{{ formatNumber(net_profit) }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    net_income: number;
    total_expense: number;
    total_funds: number;
    gross_profit: number;
    net_profit: number;
    sponsor_details: ISponsorDetail[];
    budget_details: IBudgetDetail[];
}>();
</script>
