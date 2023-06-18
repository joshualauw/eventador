<template>
    <div class="w-full">
        <div class="flex-between mb-4">
            <h2 class="font-semibold">Recent Transactions</h2>
            <button
                @click="navigateTo('/dashboard/123/transaction')"
                type="button"
                class="btn btn-sm btn-solid-secondary"
            >
                + View More
            </button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Transaction Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in 6">
                    <th>{{ i }}</th>
                    <td>20-07-2023</td>
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
});
</script>
