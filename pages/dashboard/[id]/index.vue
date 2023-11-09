<template>
    <div>
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
        <div v-if="loggedUser?.is_premium && report" class="space-y-8">
            <OrganizerOverviewPopularity :report="report.data.page_views" />
            <hr />
            <div>
                <div class="flex-center space-x-4 mb-6">
                    <input v-model="timeRange.start_date" type="date" class="input input-sm md:input-md" />
                    <input v-model="timeRange.end_date" type="date" class="input input-sm md:input-md" />
                    <button @click="applyTimeRangedReport" class="btn btn-sm md:btn-md btn-primary">Apply</button>
                </div>
                <OrganizerOverviewTimed :days="timeRange.days" :trans="timeReport?.data || []" />
            </div>
            <hr />
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                <OrganizerOverviewMonthly :trans="report.data.monthly_transactions" />
                <OrganizerOverviewWeekly :trans="report.data.weekly_transactions" />
            </div>
            <hr />
            <OrganizerOverviewBudget :report="report.data.budget_transactions" />
            <hr />
            <OrganizerOverviewSponsor :report="report.data.sponsor_transactions" />
            <hr />
            <OrganizerOverviewRevenue :total_revenue="total_revenue" />
        </div>
        <p v-else @click="navigateTo('/premium')" class="text-xl font-bold mb-4 cursor-pointer">
            <Icon name="material-symbols:lock" class="mr-2" /> Unlock premium to view more statistic and report
        </p>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { TYPE } from "vue-toastification";

definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "participant"],
});

const route = useRoute();
const { loggedUser } = useAuthStore();
const { getTransactionReport, getTimeRangedReport } = useTransactionStore();
const timeRange = reactive({
    start_date: dayjs().startOf("month").format("YYYY-MM-DD"),
    end_date: dayjs().endOf("month").format("YYYY-MM-DD"),
    days: [] as string[],
});

const { data: report } = await useAsyncData("getTransactionReport", () =>
    getTransactionReport(route.params.id as string)
);
const { data: timeReport } = await useAsyncData("getTimeRangedReport", () => applyTimeRangedReport());

const total_revenue = computed(() => {
    const gross_profit = report.value?.data.revenue || 0;
    const total_expense = report.value?.data.budget_transactions.total_spent || 0;
    const total_funds = report.value?.data.sponsor_transactions.total_funds || 0;

    return { gross_profit, total_expense, total_funds, net_profit: gross_profit - total_expense + total_funds };
});

async function applyTimeRangedReport() {
    let start = dayjs(timeRange.start_date);
    const end = dayjs(timeRange.end_date);
    const dayDiff = end.diff(start, "day");

    if (dayDiff > 31) {
        createToast("maximum range cannot exceed 1 month!", TYPE.ERROR);
        return;
    }
    if (!start.isSameOrBefore(end)) {
        createToast("start date cannot be greater than end date!", TYPE.ERROR);
        return;
    }

    const res = await getTimeRangedReport(route.params.id as string, {
        start_date: timeRange.start_date,
        end_date: timeRange.end_date,
    });
    timeRange.days = [];
    while (start.isSameOrBefore(end)) {
        timeRange.days.push(start.format("DD-MMM"));
        start = start.add(1, "day");
    }

    return res;
}

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
        data: `Rp, ${formatNumber(total_revenue.value.net_profit)}`,
        icon: "material-symbols:money",
        theme: "btn-solid-success",
        callback: () => navigateTo(`/dashboard/${route.params.id}/transaction`),
    },
];
</script>
