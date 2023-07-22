export default function useItinenaryStore() {
    const loggedParticipant = useState<(IParticipant & { user_id: IUser }) | null>("loggedParticipant", () => null);

    async function getAllParticipant(event_id: string) {
        const res = await executeRequest<IGetAllParticipant.Data>(`/participant/${event_id}`, { method: "GET" });
        return res.data;
    }

    async function getOneParticipant(id: string) {
        const res = await executeRequest<IGetOneParticipant.Data>(`/participant/${id}/detail`, { method: "GET" });
        return res.data;
    }

    async function inviteParticipant(event_id: string, body: IInviteParticipant.Body) {
        const res = await executeRequest<IInviteParticipant.Data>(`/participant/${event_id}/invite`, {
            method: "POST",
            body,
        });
        return res;
    }

    async function applyInvite(event_id: string, body: IApplyInvite.Body) {
        const res = await executeRequest<IApplyInvite.Data>(`/participant/${event_id}/apply`, {
            method: "POST",
            body,
        });
        return res;
    }

    async function registerParticipant(event_id: string) {
        const res = await executeRequest<IRegisterParticipant.Data>(`/participant/${event_id}/register`, {
            method: "POST",
        });
        return res;
    }

    async function applyRole(id: string, body: IApplyRoleParticipant.Body) {
        const res = await executeRequest<IApplyRoleParticipant.Data>(`/participant/${id}/role`, {
            method: "PATCH",
            body,
        });
        return res;
    }

    async function banParticipant(id: string) {
        const res = await executeRequest<IBanParticipant.Data>(`/participant/${id}/ban`, {
            method: "PATCH",
        });
        return res;
    }

    async function grantAccess(id: string, body: IGrantAccessParticipant.Body) {
        const res = await executeRequest<IGrantAccessParticipant.Data>(`/participant/${id}/access`, {
            method: "PUT",
            body,
        });
        return res;
    }

    async function emailCertificate(id: string, body: IEmailCertificate.Body) {
        const formData = new FormData();
        if (body.certificate) formData.append("certificate", body.certificate);

        const res = await executeRequest<IEmailCertificate.Data>(`/participant/${id}/certificate`, {
            method: "POST",
            body: formData,
        });
        return res;
    }

    async function getLivestreamToken(event_id: string, id: string) {
        const res = await executeRequest<IGetLivestreamToken.Data>(`/participant/${event_id}/${id}/stream`, {
            method: "GET",
        });
        return res.data;
    }

    return {
        getAllParticipant,
        getOneParticipant,
        inviteParticipant,
        applyInvite,
        registerParticipant,
        applyRole,
        banParticipant,
        grantAccess,
        emailCertificate,
        getLivestreamToken,
        loggedParticipant,
    };
}
