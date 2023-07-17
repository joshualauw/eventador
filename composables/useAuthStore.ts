export default function useAuthStore() {
    const loggedUser = useState("loggedUser", () => null as Omit<IUser, "password"> | null);
    const token = useCookie("token", { maxAge: 24 * 60 * 60 });

    async function register(body: IRegister.Body) {
        const res = await executeRequest<IRegister.Data>("/auth/register", { method: "POST", body });
        return res;
    }

    async function activate(body: IActivate.Body) {
        const res = await executeRequest("/auth/activate", { method: "POST", body });
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

    async function changePassword(body: IChangePassword.Body) {
        const res = await executeRequest<IChangePassword.Data>(`/auth/change`, { method: "PATCH", body });
        return res;
    }

    return {
        loggedUser,
        register,
        getMe,
        activate,
        login,
        savePersonal,
        savePreferences,
        getUserNotifications,
        changePassword,
    };
}
