<template>
    <h1 class="font-semibold text-lg mb-8">Overview</h1>
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        <div v-for="stat in stats" class="card hover:scale-100">
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
    <!-- <OrganizerOverviewTrans :transactions="transactionsData" /> -->
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "participant"],
});

const route = useRoute();
const { getEventReport } = useEventStore();
const { data: report } = await useAsyncData("getEventReport", () => getEventReport(route.params.id as string));

// const transactionsData = computed(
//     () =>
//         report.value?.data.transactions.map((tr) => ({
//             trans_date: tr.trans_date,
//             amount: tr.amount,
//             status: tr.status,
//         })) || []
// );

const stats = [
    {
        name: "Participants",
        data: report.value?.data.participant_count || 0,
        icon: "majesticons:user-group",
        theme: "btn-solid-primary",
    },
    {
        name: "Budgets",
        data: report.value?.data.budget_count || 0,
        icon: "material-symbols:account-balance-wallet",
        theme: "btn-solid-secondary",
    },
    {
        name: "Itinenaries",
        data: report.value?.data.itinenary_count || 0,
        icon: "uis:schedule",
        theme: "btn-solid-warning",
    },
    {
        name: "Revenue",
        data: `Rp, ${formatNumber(report.value?.data.revenue || 0)}`,
        icon: "material-symbols:money",
        theme: "btn-solid-success",
    },
];
</script>
