export default function useDiscussionStore() {
    async function getAllDiscussion(event_id: string, query?: IGetAllDiscussion.Query) {
        const res = await executeRequest<IGetAllDiscussion.Data>(`/discussion/${event_id}`, { method: "GET", query });
        return res.data;
    }

    async function getOneDiscussion(event_id: string, id: string) {
        const res = await executeRequest<IGetOneDiscussion.Data>(`/discussion/${event_id}/${id}`, { method: "GET" });
        return res.data;
    }

    async function createDiscussion(event_id: string, body: ICreateDiscussion.Body) {
        const res = await executeRequest<ICreateDiscussion.Data>(`/discussion/${event_id}`, { method: "POST", body });
        return res;
    }

    async function updateDiscussion(event_id: string, id: string, body: IUpdateDiscussion.Body) {
        const res = await executeRequest<IUpdateDiscussion.Data>(`/discussion/${event_id}/${id}`, {
            method: "PUT",
            body,
        });
        return res;
    }

    async function deleteDiscussion(event_id: string, id: string) {
        const res = await executeRequest<IDeleteDiscussion.Data>(`/discussion/${event_id}/${id}`, { method: "DELETE" });
        return res;
    }

    return { getAllDiscussion, getOneDiscussion, createDiscussion, updateDiscussion, deleteDiscussion };
}
