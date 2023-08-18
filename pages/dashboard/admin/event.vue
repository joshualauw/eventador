<template>
    <div>
        <UILoader v-if="pending" />
        <div class="flex-center space-x-4 mb-8">
            <h1 class="font-semibold text-lg">All Events</h1>
            <p class="text-mute">*disable: event hidden in explore</p>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Event Banner</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Report Count</th>
                    <th>Joined At</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(evt, i) in events?.data">
                    <td>{{ i + 1 }}</td>
                    <td class="flex-center w-full">
                        <img
                            @click="navigateTo(`/event/${evt._id}`)"
                            :src="evt.banner ?? '/images/default-event.jpg'"
                            class="rounded-md w-32 h-16 cursor-pointer"
                        />
                    </td>
                    <td>{{ evt.name }}</td>
                    <td>
                        <span :class="evt.is_deleted ? 'text-error' : 'text-success'">
                            {{ evt.is_deleted ? "disabled" : "active" }}
                        </span>
                    </td>
                    <td>
                        {{ evt.reports.length }}
                        <label for="report-list-modal" @click="selectReport(i)" class="btn btn-xs ml-2">view</label>
                    </td>
                    <td>{{ dayjs(evt.createdAt).format("DD-MM-YYYY") }}</td>
                    <td>
                        <button
                            @click="doDisableEvent(evt._id)"
                            class="btn btn-sm"
                            :class="evt.is_deleted ? 'btn-warning' : 'btn-error'"
                        >
                            {{ evt.is_deleted ? "Enable" : "Disable" }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <AdminModalReportList :reports="reports" />
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

definePageMeta({
    layout: "admin",
    middleware: ["auth", "admin"],
});

const { getAllEvents, disableEvent } = useAdminStore();
const { mutate, pending } = useMutate(disableEvent);
const { data: events, refresh } = await useAsyncData("getAllEvents", () => getAllEvents());

const reports = ref<IReportDetail[]>([]);

function selectReport(idx: number) {
    if (events.value?.data) {
        reports.value = [];
        reports.value.push(...events.value.data[idx].reports);
    }
}

async function doDisableEvent(id: string) {
    const res = await mutate(id);
    if (res.status) {
        refresh();
    }
}
</script>
