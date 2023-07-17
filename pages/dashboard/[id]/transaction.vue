<template>
    <div class="w-full">
        <div class="flex-col lg:flex-row flex-between mb-8 gap-4">
            <div class="flex-center space-x-2">
                <h1 class="font-semibold text-lg w-64">All Transactions</h1>
            </div>
            <div class="flex-center space-x-3">
                <button class="btn btn-primary"><Icon name="fa:print" class="mr-2" /> Print PDF</button>
                <button class="btn btn-secondary">
                    <Icon name="material-symbols:export-notes" class="mr-2" /> Export to JSON
                </button>
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
                <tr v-for="i in 20">
                    <th>{{ i }}</th>
                    <td>20-07-2023</td>
                    <td>Joshualauw</td>
                    <td>Rp. 250.000</td>
                    <td><span class="text-success">Success</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "participant"],
});
</script>
