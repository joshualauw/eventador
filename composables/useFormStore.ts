export default function useFormStore() {
    async function getAllForm(event_id: string) {
        const res = await executeRequest<IGetAllForm.Data>(`/form/${event_id}`, { method: "GET" });
        return res.data;
    }

    async function createForm(event_id: string, body: ICreateForm.Body) {
        const res = await executeRequest<ICreateForm.Data>(`/form/${event_id}`, { method: "POST", body });
        return res;
    }

    async function updateForm(id: string, body: IUpdateForm.Body) {
        const res = await executeRequest<IUpdateForm.Data>(`/form/${id}`, { method: "PUT", body });
        return res;
    }

    async function saveForm(id: string, body: ISaveForm.Body) {
        const res = await executeRequest<ISaveForm.Data>(`/form/${id}/save`, { method: "PATCH", body });
        return res;
    }

    async function getOneForm(id: string) {
        const res = await executeRequest<IGetOneForm.Data>(`/form/${id}/detail`, { method: "GET" });
        return res.data;
    }

    async function deleteForm(id: string) {
        const res = await executeRequest<IDeleteForm.Data>(`/form/${id}`, { method: "DELETE" });
        return res;
    }

    return { getAllForm, getOneForm, createForm, updateForm, deleteForm, saveForm };
}
