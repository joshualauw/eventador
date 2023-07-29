<template>
    <UIModal modal-id="report-list-modal">
        <h2 class="font-semibold text-lg mb-6">Reports</h2>
        <div class="space-y-8">
            <div v-for="report in reports" class="flex-center space-x-4">
                <div @click="navigateTo(`/profile/${report.user_id._id}`)" class="avatar avatar-ring cursor-pointer">
                    <img :src="report.user_id.profile || '/images/default-user.png'" />
                </div>
                <div>
                    <p class="font-semibold">{{ report.user_id.username }}</p>
                    <p class="text-mute">{{ report.content }}</p>
                </div>
            </div>
        </div>
        <p v-if="reports.length == 0">-no reports-</p>
    </UIModal>
</template>

<script setup lang="ts">
defineProps<{ reports: IReportDetail[] }>();
</script>
