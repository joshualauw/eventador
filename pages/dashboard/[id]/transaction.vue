<template>
    <div class="w-full">
        <div class="flex-col lg:flex-row flex-between mb-8 gap-4">
            <div class="flex-center space-x-2">
                <h1 class="font-semibold text-lg w-64">All Transactions</h1>
                <select class="select">
                    <option>Newest</option>
                    <option>Oldest</option>
                </select>
            </div>
            <button class="btn btn-primary"><Icon name="fa:file-pdf-o" class="mr-2" /> Print as PDF</button>
        </div>
        <table class="table table-compact">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Transaction Date</th>
                    <th>Buyer Name</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in 20">
                    <th>{{ i }}</th>
                    <td>20-07-2023</td>
                    <td>Joshualauw</td>
                    <td>Rp. 250.000</td>
                    <td><span class="text-success">Success</span></td>
                    <td><button class="btn btn-sm btn-solid-secondary">Detail</button></td>
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
