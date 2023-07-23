<template>
    <div>
        <p class="font-semibold mb-4 text-lg">Today Report</p>
        <table v-if="trans.length > 0" class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Transaction Date</th>
                    <th>Buyer ID</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tr, i) in trans">
                    <th>{{ i }}</th>
                    <td>{{ dayjs(tr.trans_date).format("DD-MM-YYYY") }}</td>
                    <td>{{ tr.user_id }}</td>
                    <td>
                        <span :class="tr.status == 'success' ? 'text-success' : 'text-error'">{{ tr.status }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>-no transactions today-</p>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

defineProps<{ trans: ITransaction[] }>();
</script>
