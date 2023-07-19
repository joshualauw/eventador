<template>
    <div class="w-full h-[400px] flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
        <div class="w-full lg:w-1/2 flex-box">
            <UIChart class="w-full h-full" :class="{ 'blur-sm': !loggedUser?.is_premium }" />
            <p
                v-if="!loggedUser?.is_premium"
                @click="navigateTo('/premium')"
                class="text-center absolute flex-center cursor-pointer hover:scale-105"
            >
                <Icon name="material-symbols:lock" class="w-5 h-5 mr-2" />
                -premium only-
            </p>
        </div>
        <div class="w-full lg:w-1/2">
            <div class="flex-between mb-4">
                <h2 class="font-semibold">Recent Transactions</h2>
                <button
                    @click="navigateTo(`/dashboard/${route.params.id}/transaction`)"
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
                    <tr v-for="(trans, i) in transactions">
                        <th>{{ i + 1 }}</th>
                        <td>{{ dayjs(trans.trans_date).format("DD MM YYYY") }}</td>
                        <td>Rp. {{ formatNumber(trans.amount) }}</td>
                        <td>
                            <span :class="trans.status == 'success' ? 'text-success' : 'text-error'">
                                {{ trans.status }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

defineProps<{
    transactions: {
        trans_date: string;
        amount: number;
        status: string;
    }[];
}>();

const { loggedUser } = useAuthStore();
const route = useRoute();
</script>
