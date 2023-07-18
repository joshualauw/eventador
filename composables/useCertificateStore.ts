export default function useCertificateStore() {
    const isPreview = useState(() => false);

    async function getCertificate(event_id: string) {
        const res = await executeRequest<IGetCertificate.Data>(`/certificate/${event_id}`, { method: "GET" });
        return res.data;
    }

    async function saveCertificate(event_id: string, body: ISaveCertificate.Body) {
        const res = await executeRequest<ISaveCertificate.Data>(`/certificate/${event_id}`, { method: "PUT", body });
        return res;
    }

    return { saveCertificate, getCertificate, isPreview };
}
