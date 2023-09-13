export default function useTransactionStore() {
    async function getAllTransaction(event_id: string) {
        const res = await executeRequest<IGetAllTransaction.Data>(`/transaction/${event_id}`, { method: "GET" });
        return res.data;
    }

    async function getTransactionReport(event_id: string) {
        const res = await executeRequest<IGetTransactionReport.Data>(`/transaction/${event_id}/report`, {
            method: "GET",
        });
        return res.data;
    }

    async function getTimeRangedReport(event_id: string, query: IGetTimeRangedReport.Query) {
        const res = await executeRequest<IGetTimeRangedReport.Data>(`/transaction/${event_id}/time`, {
            method: "GET",
            query,
            toast: true,
        });
        return res.data;
    }

    return { getAllTransaction, getTransactionReport, getTimeRangedReport };
}
