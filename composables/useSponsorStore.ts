export default function useSponsorStore() {
    async function getAllSponsor(event_id: string) {
        const res = await executeRequest<IGetAllSponsor.Data>(`/sponsor/${event_id}`, { method: "GET" });
        return res.data;
    }

    async function createSponsor(event_id: string, body: ICreateSponsor.Body) {
        const formData = new FormData();
        formData.append("name", body.name);
        formData.append("description", body.description);
        formData.append("funds", body.funds.toString());
        if (body.logo) formData.append("logo", body.logo);

        const res = await executeRequest<ICreateSponsor.Data>(`/sponsor/${event_id}`, {
            method: "POST",
            body: formData,
        });
        return res;
    }

    async function updateSponsor(id: string, body: IUpdateSponsor.Body) {
        const formData = new FormData();
        formData.append("name", body.name);
        formData.append("description", body.description);
        formData.append("funds", body.funds.toString());
        if (body.logo) formData.append("logo", body.logo);

        const res = await executeRequest<IUpdateSponsor.Data>(`/sponsor/${id}`, { method: "PUT", body: formData });
        return res;
    }

    async function getOneSponsor(id: string) {
        const res = await executeRequest<IGetOneSponsor.Data>(`/sponsor/${id}/detail`, { method: "GET" });
        return res.data;
    }

    async function deleteSponsor(id: string) {
        const res = await executeRequest<IDeleteSponsor.Data>(`/sponsor/${id}`, { method: "DELETE" });
        return res;
    }

    return { getAllSponsor, getOneSponsor, createSponsor, updateSponsor, deleteSponsor };
}
