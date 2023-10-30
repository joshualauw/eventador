<template>
    <div>
        <p class="font-semibold mb-4 text-lg">Sponsor & Funds Report</p>
        <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Funds</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(sponsor, i) in report.sponsor_details">
                    <th>{{ i + 1 }}</th>
                    <td>{{ sponsor.name }}</td>
                    <td>Rp. {{ formatNumber(sponsor.funds) }}</td>
                </tr>
            </tbody>
        </table>
        <div class="mt-4 font-semibold flex items-center justify-between w-full">
            <p>
                Total Funds: <span class="md:text-lg">Rp. {{ formatNumber(report.total_funds) }}</span>
            </p>
            <p>
                Profit before Funds:
                <span class="md:text-lg">Rp. {{ formatNumber(report.gross_profit) }}</span>
            </p>
            <p>
                Profit after Funds:
                <span class="md:text-lg text-primary">Rp. {{ formatNumber(report.net_profit) }}</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    report: ISponsorTransaction;
}>();
</script>
