<template>
    <div>
        <h1 class="font-semibold text-lg mb-8">Overview</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            <div v-for="stat in stats" @click="stat.callback" class="card cursor-pointer">
                <div class="card-body flex-row flex-box space-x-3">
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
        <h1 class="font-semibold text-lg mb-8">Premium Transactions</h1>
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
                <tr v-for="(tr, i) in transactions?.data">
                    <th>{{ i + 1 }}</th>
                    <td>{{ dayjs(tr.trans_date).format("DD-MM-YYYY") }}</td>
                    <td>{{ tr.user_id.username }}</td>
                    <td>Rp. {{ formatNumber(tr.amount) }}</td>
                    <td>
                        <span :class="tr.status == 'success' ? 'text-success' : 'text-error'">{{ tr.status }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

definePageMeta({
    layout: "admin",
    middleware: ["auth", "admin"],
});

const { getStats, getAllTransactions } = useAdminStore();
const { data: _stats } = await useAsyncData("getStats", () => getStats());
const { data: transactions } = await useAsyncData("getAllTransactions", () => getAllTransactions());

const stats = [
    {
        name: "Users",
        data: _stats.value?.data.total_users || 0,
        icon: "majesticons:user-group",
        theme: "btn-solid-primary",
        callback: () => navigateTo(`/dashboard/admin/user`),
    },
    {
        name: "Posts",
        data: _stats.value?.data.total_posts || 0,
        icon: "material-symbols:post-add",
        theme: "btn-solid-secondary",
        callback: () => navigateTo(`/dashboard/admin/post`),
    },
    {
        name: "Events",
        data: _stats.value?.data.total_events || 0,
        icon: "material-symbols:event",
        theme: "btn-solid-warning",
        callback: () => navigateTo(`/dashboard/admin/event`),
    },
    {
        name: "Revenue",
        data: `Rp, ${formatNumber(_stats.value?.data.revenue || 0)}`,
        icon: "material-symbols:money",
        theme: "btn-solid-success",
        callback: () => {},
    },
];
</script>
