export default function useBudgetStore() {
    async function getAllBudget(event_id: string) {
        const res = await executeRequest<IGetBudget.Data>(`/budget/${event_id}`, { method: "GET" });
        return res.data;
    }

    async function createBudget(event_id: string, body: ICreateBudget.Body) {
        const res = await executeRequest<ICreateBudget.Data>(`/budget/${event_id}`, { method: "POST", body });
        return res;
    }

    async function updateBudget(id: string, body: IUpdateBudget.Body) {
        const res = await executeRequest<IUpdateBudget.Data>(`/budget/${id}`, { method: "PUT", body });
        return res;
    }

    async function getOneBudget(id: string) {
        const res = await executeRequest<IGetOneBudget.Data>(`/budget/${id}/detail`, { method: "GET" });
        return res.data;
    }

    async function deleteBudget(id: string) {
        const res = await executeRequest<IDeleteBudget.Data>(`/budget/${id}`, { method: "DELETE" });
        return res;
    }

    return { getAllBudget, createBudget, updateBudget, getOneBudget, deleteBudget };
}
