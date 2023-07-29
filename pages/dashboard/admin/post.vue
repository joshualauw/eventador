<template>
    <UILoader v-if="pending" />
    <div class="flex-center space-x-4 mb-8">
        <h1 class="font-semibold text-lg">All Posts</h1>
        <p class="text-mute">*suspend: delete post forever</p>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th>No</th>
                <th>Post Image</th>
                <th>ID</th>
                <th>Report Count</th>
                <th>Created At</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(post, i) in posts?.data">
                <td>{{ i + 1 }}</td>
                <td class="flex-center w-full">
                    <img
                        @click="navigateTo(`/post/${post._id}`)"
                        :src="post.image ?? '/images/default-post.png'"
                        class="rounded-md w-24 h-12 cursor-pointer"
                    />
                </td>
                <td>{{ post._id }}</td>
                <td>
                    {{ post.reports.length }}
                    <label for="report-list-modal" @click="selectReport(i)" class="btn btn-xs ml-2">view</label>
                </td>
                <td>{{ dayjs(post.createdAt).format("DD-MM-YYYY") }}</td>
                <td>
                    <button @click="doSuspendPost(post._id)" class="btn btn-sm btn-error">Suspend</button>
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

const { getAllPosts, suspendPost } = useAdminStore();
const { mutate, pending } = useMutate(suspendPost);
const { data: posts, refresh } = await useAsyncData("getAllPosts", () => getAllPosts());

const reports = ref<IReportDetail[]>([]);

function selectReport(idx: number) {
    if (posts.value?.data) {
        reports.value = [];
        reports.value.push(...posts.value.data[idx].reports);
    }
}

async function doSuspendPost(id: string) {
    const res = await mutate(id);
    if (res.status) {
        refresh();
    }
}
</script>
