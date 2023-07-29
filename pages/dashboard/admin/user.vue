<template>
    <UILoader v-if="pending" />
    <div class="flex-center space-x-4 mb-8">
        <h1 class="font-semibold text-lg">All Users</h1>
        <p class="text-mute">*ban: user cannot login</p>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th>No</th>
                <th>Profile Picture</th>
                <th>Username</th>
                <th>Status</th>
                <th>Report Count</th>
                <th>Joined At</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user, i) in users?.data">
                <td>{{ i + 1 }}</td>
                <td class="flex-center w-full">
                    <img
                        @click="navigateTo(`/profile/${user._id}`)"
                        :src="user.profile ?? '/images/default-user.png'"
                        alt="avatar"
                        class="rounded-full w-10 h-10 cursor-pointer"
                    />
                </td>
                <td>{{ user.username }}</td>
                <td>
                    <span :class="user.is_banned ? 'text-error' : 'text-success'">
                        {{ user.is_banned ? "banned" : "active" }}
                    </span>
                </td>
                <td>
                    {{ user.reports.length }}
                    <label for="report-list-modal" @click="selectReport(i)" class="btn btn-xs ml-2">view</label>
                </td>
                <td>{{ dayjs(user.createdAt).format("DD-MM-YYYY") }}</td>
                <td>
                    <button
                        @click="doBanUser(user._id)"
                        class="btn btn-sm"
                        :class="user.is_banned ? 'btn-warning' : 'btn-error'"
                    >
                        {{ user.is_banned ? "Unban" : "Ban" }}
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <AdminModalReportList :reports="reports" />
</template>

<script setup lang="ts">
import dayjs from "dayjs";

definePageMeta({
    layout: "admin",
    middleware: ["auth", "admin"],
});

const { getAllUsers, banUser } = useAdminStore();
const { mutate, pending } = useMutate(banUser);
const { data: users, refresh } = await useAsyncData("getAllUsers", () => getAllUsers());

const reports = ref<IReportDetail[]>([]);

function selectReport(idx: number) {
    if (users.value?.data) {
        reports.value = [];
        reports.value.push(...users.value.data[idx].reports);
    }
}

async function doBanUser(id: string) {
    const res = await mutate(id);
    if (res.status) {
        refresh();
    }
}
</script>
