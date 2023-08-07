export default function useAuthStore() {
    const loggedUser = useState<Omit<IUser, "password"> | null>("loggedUser", () => null);
    const token = useCookie("token", { maxAge: 24 * 60 * 60 });
    const registeredUser = useState<string>("registeredUser", () => "");

    async function register(body: IRegister.Body) {
        const res = await executeRequest<IRegister.Data>("/auth/register", { method: "POST", body });
        return res;
    }

    async function activate(body: IActivate.Body) {
        const res = await executeRequest("/auth/activate", { method: "POST", body });
        return res;
    }

    async function resetPass(body: IResetPass.Body) {
        const res = await executeRequest("/auth/resetpass", { method: "POST", body });
        return res;
    }

    async function getMe() {
        const res = await executeRequest<ILogin.Data>("/auth/myself", { method: "GET" });
        if (res.status && res.data) {
            loggedUser.value = res.data.data;
        }
        return res;
    }

    async function login(body: ILogin.Body) {
        const res = await executeRequest<ILogin.Data>("/auth/login", { method: "POST", body });
        if (res.status && res.data) {
            loggedUser.value = res.data.data;
            token.value = res.data.data.token;
            usePusherSubsribe();
        }
        return res;
    }

    async function savePersonal(body: ISavePersonal.Body) {
        const formData = new FormData();
        if (body.profile) formData.append("profile", body.profile);
        formData.append("username", body.username);
        formData.append("email", body.email);
        formData.append("phone_number", body.phone_number);

        const res = await executeRequest<ISavePersonal.Data>("/auth/save/personal", { method: "PUT", body: formData });
        if (res.status && res.data) {
            loggedUser.value = res.data.data;
        }
        return res;
    }

    async function savePreferences(body: ISavePreferences.Body) {
        const res = await executeRequest<ISavePreferences.Data>("/auth/save/preferences", { method: "PUT", body });
        if (res.status && res.data) {
            loggedUser.value = res.data.data;
        }
        return res;
    }

    async function getUserNotifications(id: string) {
        const res = await executeRequest<IGetNotifications.Data>(`/auth/${id}/notifications`, { method: "GET" });
        return res.data;
    }

    async function readAllNotifications(id: string) {
        const res = await executeRequest<IGetNotifications.Data>(`/auth/${id}/notifications`, { method: "DELETE" });
        return res;
    }

    async function changePassword(body: IChangePassword.Body) {
        const res = await executeRequest<IChangePassword.Data>(`/auth/change`, { method: "PATCH", body });
        return res;
    }

    async function getFollowableUsers(query: IGetFollowableUsers.Query) {
        const res = await executeRequest<IGetFollowableUsers.Data>(`/auth`, { method: "GET", query });
        return res.data;
    }

    async function getOneUser(id: string) {
        const res = await executeRequest<IGetOneUser.Data>(`/auth/${id}/detail`, { method: "GET" });
        return res.data;
    }

    async function becomePremium() {
        const res = await executeRequest<IPremiumUser.Data>(`/auth/premium`, { method: "PATCH" });
        return res;
    }

    async function followUser(id: string) {
        const res = await executeRequest<IFollowUser.Data>(`/auth/${id}/follow`, { method: "PATCH" });
        return res;
    }

    async function topUp(body: ITopUp.Body) {
        const res = await executeRequest<ITopUp.Data>(`/auth/topup`, { method: "PATCH", body });
        return res;
    }

    async function withdraw(body: IWithdraw.Body) {
        const res = await executeRequest<IWithdraw.Data>(`/auth/withdraw`, { method: "PATCH", body });
        return res;
    }

    async function resendVerificationCode(body: IResendVerificationCode.Body) {
        const res = await executeRequest<IResendVerificationCode.Data>(`/auth/resend/verification`, {
            method: "POST",
            body,
        });
        return res;
    }

    async function resendPasswordToken(body: IResendPasswordToken.Body) {
        const res = await executeRequest<IResendPasswordToken.Data>(`/auth/resend/forgotpass`, {
            method: "POST",
            body,
        });
        return res;
    }

    async function reportUser(id: string, body: IReportUser.Body) {
        const res = await executeRequest<IReportUser.Data>(`/auth/${id}/report`, {
            method: "PATCH",
            body,
        });
        return res;
    }

    return {
        loggedUser,
        registeredUser,
        register,
        getMe,
        activate,
        resetPass,
        login,
        savePersonal,
        savePreferences,
        getUserNotifications,
        readAllNotifications,
        changePassword,
        getFollowableUsers,
        getOneUser,
        becomePremium,
        followUser,
        topUp,
        withdraw,
        resendVerificationCode,
        resendPasswordToken,
        reportUser,
    };
}
