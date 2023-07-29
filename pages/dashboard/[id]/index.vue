<template>
    <h1 class="font-semibold text-lg mb-8">Overview</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        <div v-for="stat in stats" @click="stat.callback" class="card cursor-pointer">
            <div class="card-body flex-row flex-box space-x-2">
                <div class="rounded-full p-4 btn-no-animation" :class="stat.theme">
                    <Icon :name="stat.icon" class="w-7 h-7" />
                </div>
                <div>
                    <p class="font-semibold text-base md:text-lg">{{ stat.name }}</p>
                    <p class="text-content2 text-sm md:text-base">{{ stat.data }}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-if="report && loggedUser?.is_premium" class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <OrganizerOverviewMonthly :trans="report.data.monthly_transactions" />
        <OrganizerOverviewWeekly :trans="report.data.weekly_transactions" />
        <OrganizerOverviewDaily :trans="report.data.today_transactions" />
        <div>
            <p class="font-semibold mb-4 text-lg">Highest Record</p>
            <div v-if="report.data.highest_transaction" class="card max-h-full">
                <div class="card-body">
                    <p class="text-xl text-success">Rp. {{ formatNumber(report.data.highest_transaction.revenue) }}</p>
                    <p class="text-content-2">{{ dayjs(report.data.highest_transaction._id).format("DD-MM-YYYY") }}</p>
                </div>
            </div>
            <p v-else>-no transactions recorded-</p>
            <p class="font-semibold my-4 text-lg">Latest Transaction</p>
            <div v-if="report.data.latest_transaction" class="card max-h-full">
                <div class="card-body">
                    <p class="text-xl text-success">Rp. {{ formatNumber(report.data.latest_transaction.amount) }}</p>
                    <p class="text-content-2">
                        {{ dayjs(report.data.latest_transaction.trans_date).format("DD-MM-YYYY") }}
                    </p>
                </div>
            </div>
            <p v-else>-no transactions recorded-</p>
        </div>
    </div>
    <p v-else class="text-xl font-bold mb-4">
        <Icon name="material-symbols:lock" class="mr-2" /> Unlock premium to view more statistic and report
    </p>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "participant"],
});

const route = useRoute();
const { loggedUser } = useAuthStore();
const { getTransactionReport } = useTransactionStore();
const { data: report } = await useAsyncData("getTransactionReport", () =>
    getTransactionReport(route.params.id as string)
);

const stats = [
    {
        name: "Participants",
        data: report.value?.data.participant_count || 0,
        icon: "majesticons:user-group",
        theme: "btn-solid-primary",
        callback: () => navigateTo(`/dashboard/${route.params.id}/participant`),
    },
    {
        name: "Budgets",
        data: report.value?.data.budget_count || 0,
        icon: "material-symbols:account-balance-wallet",
        theme: "btn-solid-secondary",
        callback: () => navigateTo(`/dashboard/${route.params.id}/budget`),
    },
    {
        name: "Itinenaries",
        data: report.value?.data.itinenary_count || 0,
        icon: "uis:schedule",
        theme: "btn-solid-warning",
        callback: () => navigateTo(`/dashboard/${route.params.id}/itinenary`),
    },
    {
        name: "Revenue",
        data: `Rp, ${formatNumber(report.value?.data.revenue || 0)}`,
        icon: "material-symbols:money",
        theme: "btn-solid-success",
        callback: () => navigateTo(`/dashboard/${route.params.id}/transaction`),
    },
];
</script>
