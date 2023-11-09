<template>
    <div>
        <p class="font-semibold mb-4 text-lg">Sponsor & Funds Report</p>
        <div class="flex space-x-5 max-w-full">
            <div class="w-1/2 text-center">
                <p class="text-lg font-semibold text-primary mb-4">Rp. {{ formatNumber(report.total_funds) }}</p>
                <UIBar name="All Funds" :labels="labels" :datasets="data" />
            </div>
            <table class="table table-compact w-1/2">
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
                    <tr>
                        <th>#</th>
                        <td>Sum</td>
                        <td>
                            <span class="text-primary">Rp. {{ formatNumber(report.total_funds) }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    report: ISponsorTransaction;
}>();
const labels = props.report.sponsor_details.map((s) => s.name);
const data = props.report.sponsor_details.map((s) => s.funds);
</script>
