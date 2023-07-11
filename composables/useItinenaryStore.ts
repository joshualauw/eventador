export default function useItinenaryStore() {
    async function getAllItinenary(event_id: string) {
        const res = await executeRequest<IGetAllItinenary.Data>(`/itinenary/${event_id}`, { method: "GET" });
        return res.data;
    }

    async function createItinenary(event_id: string, body: ICreateItinenary.Body) {
        const res = await executeRequest<ICreateItinenary.Data>(`/itinenary/${event_id}`, { method: "POST", body });
        return res;
    }

    async function updateItinenary(id: string, body: IUpdateItinenary.Body) {
        const res = await executeRequest<IUpdateItinenary.Data>(`/itinenary/${id}`, { method: "PUT", body });
        return res;
    }

    async function getOneItinenary(id: string) {
        const res = await executeRequest<IGetOneItinenary.Data>(`/itinenary/${id}/detail`, { method: "GET" });
        return res.data;
    }

    async function deleteItinenary(id: string) {
        const res = await executeRequest<IDeleteItinenary.Data>(`/itinenary/${id}`, { method: "DELETE" });
        return res;
    }

    return { getAllItinenary, getOneItinenary, createItinenary, updateItinenary, deleteItinenary };
}
