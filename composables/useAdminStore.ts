export default function useAdminStore() {
    async function getAllTransactions() {
        const res = await executeRequest<IGetAdminTransaction.Data>(`/admin/transaction`, { method: "GET" });
        return res.data;
    }

    async function getStats() {
        const res = await executeRequest<IGetAdminStats.Data>(`/admin/stats`, { method: "GET" });
        return res.data;
    }

    async function getAllPosts() {
        const res = await executeRequest<IGetAdminPosts.Data>(`/admin/post`, { method: "GET" });
        return res.data;
    }

    async function getAllUsers() {
        const res = await executeRequest<IGetAdminUsers.Data>(`/admin/user`, { method: "GET" });
        return res.data;
    }

    async function getAllEvents() {
        const res = await executeRequest<IGetAdminEvents.Data>(`/admin/event`, { method: "GET" });
        return res.data;
    }

    async function disableEvent(id: string) {
        const res = await executeRequest<iDisableEvent.Data>(`/admin/event/${id}`, { method: "PATCH" });
        return res;
    }

    async function banUser(id: string) {
        const res = await executeRequest<IBanUser.Data>(`/admin/user/${id}`, { method: "PATCH" });
        return res;
    }

    async function suspendPost(id: string) {
        const res = await executeRequest<ISuspendPost.Data>(`/admin/post/${id}`, { method: "DELETE" });
        return res;
    }

    return { getAllTransactions, getStats, getAllPosts, getAllUsers, getAllEvents, banUser, suspendPost, disableEvent };
}
